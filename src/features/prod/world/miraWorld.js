import gsap from 'gsap'
import * as THREE from 'three'

// Data
import STEPS from '../data/stepsArray'
import TEXTURES from '../data/texturesArray'
// Shaders
import { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND } from './miraUI'
import backgroundFragment from './shaders/fragShaderBackground'
import typographyFragment from './shaders/fragShaderTypography'
import vert from './shaders/vertexShader'

const { URLS_INIT, URLS } = TEXTURES

async function worldHome() {
  function lerp(start, end, t) {
    return start + (end - start) * t
  }

  const canvas = document.getElementById('mira-canvas')

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x060606)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    100,
    2000
  )
  camera.position.z = 600
  function updateCamera() {
    camera.fov =
      (2 * Math.atan(window.innerHeight / 2 / camera.position.z) * 180) /
      Math.PI
    camera.updateProjectionMatrix()
  }
  updateCamera()

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Function to load textures
  const textures = {}
  const imgLoader = new THREE.TextureLoader()
  function loadTexture(name, url) {
    return new Promise((resolve, reject) => {
      imgLoader.load(
        url,
        (texture) => {
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.generateMipmaps = false

          textures[name] = texture
          resolve(texture)
        },
        undefined,
        reject
      )
    })
  }

  // Wait until every CRITICAL texture is loaded into the textures object
  await Promise.all(
    Object.entries(URLS_INIT).map(([name, url]) => loadTexture(name, url))
  )

  // Load rest of the textures without blocking (they will appear later enough :))
  Object.entries(URLS).forEach(([name, url]) => {
    loadTexture(name, url)
  })

  // Main plane creation
  const planeGeometry = new THREE.PlaneGeometry(600, 600)
  const planeMaterial = new THREE.ShaderMaterial({
    fragmentShader: typographyFragment,
    vertexShader: vert,
    uniforms: {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_offset: { value: 0 },
      u_mouseX: { value: 0.5 },
      u_mouseY: { value: 0.5 },
      u_blocks: { value: 800 },

      u_noiseFrequency: { value: UNIFORMS_TEXTURE.frequency },
      u_displacementCoef: { value: UNIFORMS_TEXTURE.amplitude },

      u_currentTexture: { value: textures.inner_circle },
      u_noiseTexture: { value: textures.perlin },
      u_bg: { value: textures.bg },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(plane)

  // Background plane creation
  const backgroundPlaneGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight
  )
  const res = window.innerWidth / window.innerHeight
  const backgroundPlaneMaterial = new THREE.ShaderMaterial({
    fragmentShader: backgroundFragment,
    vertexShader: vert,
    uniforms: {
      u_time: { value: 0 },
      u_resolution: { value: res },
      u_fMix: { value: UNIFORMS_BACKGROUND.u_fMix },
      u_iMix: { value: UNIFORMS_BACKGROUND.u_iMix },
      u_timeFactor: { value: UNIFORMS_BACKGROUND.u_timeFactor },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const backgroundPlane = new THREE.Mesh(
    backgroundPlaneGeometry,
    backgroundPlaneMaterial
  )
  scene.add(backgroundPlane)
  backgroundPlane.position.z = -1

  // Loop
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let lerpFactor = 0.012

  let seed = Math.random() * 40
  console.log(seed)
  let counter = seed

  function animate() {
    counter = (counter + 0.002) % 5000 // safeguard to not let counter evolve endlessly

    if (plane) {
      currentX = lerp(currentX, targetX, lerpFactor)
      currentY = lerp(currentY, targetY, lerpFactor)

      // Operations in the background plane
      backgroundPlane.material.uniforms.u_time.value = counter
      backgroundPlane.material.uniforms.u_fMix.value =
        UNIFORMS_BACKGROUND.u_fMix
      backgroundPlane.material.uniforms.u_iMix.value =
        UNIFORMS_BACKGROUND.u_iMix
      backgroundPlane.material.uniforms.u_timeFactor.value =
        UNIFORMS_BACKGROUND.u_timeFactor

      // Operations in the main plane
      plane.material.uniforms.u_time.value = counter
      plane.material.uniforms.u_offset.value = UNIFORMS_TEXTURE.offset
      plane.material.uniforms.u_displacementCoef.value =
        UNIFORMS_TEXTURE.amplitude
      plane.material.uniforms.u_noiseFrequency.value =
        UNIFORMS_TEXTURE.frequency
      plane.material.uniforms.u_mouseX.value = currentX
      plane.material.uniforms.u_mouseY.value = currentY
      plane.material.uniforms.u_blocks.value = UNIFORMS_TEXTURE.blocks
      plane.scale.set(
        UNIFORMS_TEXTURE.scale,
        UNIFORMS_TEXTURE.scale,
        UNIFORMS_TEXTURE.scale
      )
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Mousemove
  window.addEventListener('mousemove', (e) => {
    targetX = gsap.utils.mapRange(0, window.innerWidth, 0.0, 1.0, e.clientX)
    targetY = gsap.utils.mapRange(0, window.innerHeight, 0.0, 1.0, e.clientY)
  })

  // Moving a step forward LOGIC
  window.addEventListener('moveStepForward', (e) => {
    const stepIndex = e.detail.step
    console.log(stepIndex)
    const step = STEPS[stepIndex]

    if (!step) return

    plane.material.uniforms.u_currentTexture.value =
      textures[step.currentTexture]

    console.log('Switched to:', step.currentTexture)
  })
}

export default worldHome
