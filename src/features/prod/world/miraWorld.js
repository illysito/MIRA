import gsap from 'gsap'
import * as THREE from 'three'

// Data
import STEPS from '../data/stepsArray'
import TEXTURES from '../data/texturesArray'
// Shaders
import { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND } from './miraUI'
import coreFrag from './shaders/fragShader_CORE'
import disp_frag_bg from './shaders/fragShaderBackground'
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
  // renderer.outputColorSpace = THREE.SRGBColorSpace

  // Main Image
  const textures = {}
  const imgLoader = new THREE.TextureLoader()

  // Function to load textures
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

  await Promise.all(
    Object.entries(URLS_INIT).map(([name, url]) => loadTexture(name, url))
  )

  Object.entries(URLS).forEach(([name, url]) => {
    loadTexture(name, url)
  })

  console.log(textures)

  // let plane = null

  // Plane
  const planeGeometry = new THREE.PlaneGeometry(600, 600)
  const planeMaterial = new THREE.ShaderMaterial({
    fragmentShader: coreFrag,
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
  let plane = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(plane)

  // Background plane
  const backgroundPlaneGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight
  )
  const res = window.innerWidth / window.innerHeight
  const backgroundPlaneMaterial = new THREE.ShaderMaterial({
    fragmentShader: disp_frag_bg,
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
    // transparent: true,
    // blending: THREE.AdditiveBlending,
    // depthWrite: false,
  })
  const backgroundPlane = new THREE.Mesh(
    backgroundPlaneGeometry,
    backgroundPlaneMaterial
  )
  scene.add(backgroundPlane)
  backgroundPlane.position.z = -1

  // Loop
  let counter = 0
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let lerpFactor = 0.012

  function animate() {
    counter += 0.002
    // console.log(offset)

    if (plane) {
      currentX = lerp(currentX, targetX, lerpFactor)
      currentY = lerp(currentY, targetY, lerpFactor)

      backgroundPlane.material.uniforms.u_time.value = counter
      backgroundPlane.material.uniforms.u_fMix.value =
        UNIFORMS_BACKGROUND.u_fMix
      backgroundPlane.material.uniforms.u_iMix.value =
        UNIFORMS_BACKGROUND.u_iMix
      backgroundPlane.material.uniforms.u_timeFactor.value =
        UNIFORMS_BACKGROUND.u_timeFactor

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
    // animationId = requestAnimationFrame(animate)
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

  // Swap texture
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
