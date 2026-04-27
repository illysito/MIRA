// import gsap from 'gsap'
import * as THREE from 'three'

import { UNIFORMS_CORE } from './miraUI_Core'
import disp_frag from './shaders/fragShader_CORE'
import disp_frag_bg from './shaders/fragShaderBackground'
import vert from './shaders/vertexShader'

function worldHome() {
  function githubToJsDelivr(permalink) {
    return permalink
      .replace('github.com', 'cdn.jsdelivr.net/gh')
      .replace('/blob/', '@')
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
  const imgLoader = new THREE.TextureLoader()

  // URLS for lifecycle Plane
  const URLS_CORE = [
    // TEXTURES_CORE
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/edea2ef78bcad585777feb7e0eeb3da40e832a52/textures/_CORE/MIRA_CORE_01.jpg'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/edea2ef78bcad585777feb7e0eeb3da40e832a52/textures/_CORE/MIRA_CORE_02.jpg'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/edea2ef78bcad585777feb7e0eeb3da40e832a52/textures/_CORE/MIRA_CORE_03.jpg'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/edea2ef78bcad585777feb7e0eeb3da40e832a52/textures/_CORE/MIRA_CORE_04.jpg'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/edea2ef78bcad585777feb7e0eeb3da40e832a52/textures/_CORE/MIRA_CORE_05.jpg'
    ),
    // NOISE
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e00fcd76641ba16a48522cd0704e81bc3b692b72/textures/miraPerlin.png'
    ),
    // BACKGROUND
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e447280e52403f971e69249c087d8b6143102bc0/textures/miraBackground.png'
    ),
  ]

  // Function to load textures
  function loadTexture(url) {
    return new Promise((resolve, reject) => {
      imgLoader.load(
        url,
        (texture) => {
          // texture.colorSpace = THREE.SRGBColorSpace
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.generateMipmaps = false
          // texture.colorSpace = THREE.SRGBColorSpace
          resolve(texture)
        },
        undefined,
        reject
      )
    })
  }

  let plane = null

  // Test plane
  Promise.all(URLS_CORE.map(loadTexture)).then(
    ([core_1, core_2, core_3, core_4, core_5, perlin, bg]) => {
      const planeGeometry = new THREE.PlaneGeometry(600, 600)

      // console.log(perlin)

      const planeMaterial = new THREE.ShaderMaterial({
        fragmentShader: disp_frag,
        vertexShader: vert,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_offset: { value: 0 },
          u_mouseX: { value: 0 },
          u_mouseY: { value: 0 },
          u_blocks: { value: 800 },

          u_noiseFrequency: { value: UNIFORMS_CORE.frequency },
          u_displacementCoef: { value: UNIFORMS_CORE.amplitude },

          u_core_1: { value: core_1 },
          u_core_2: { value: core_2 },
          u_core_3: { value: core_3 },
          u_core_4: { value: core_4 },
          u_core_5: { value: core_5 },
          u_noiseTexture: { value: perlin },
          u_bg: { value: bg },

          u_mixer_1: { value: 0.0 },
          u_mixer_2: { value: 0.0 },
          u_mixer_3: { value: 0.0 },
          u_mixer_4: { value: 0.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      plane = new THREE.Mesh(planeGeometry, planeMaterial)

      scene.add(plane)
    }
  )

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
  // let offset = 0

  function animate() {
    counter += 0.002
    // console.log(offset)

    if (plane) {
      backgroundPlane.material.uniforms.u_time.value = counter

      plane.material.uniforms.u_time.value = counter
      plane.material.uniforms.u_offset.value = UNIFORMS_CORE.offset
      plane.material.uniforms.u_displacementCoef.value = UNIFORMS_CORE.amplitude
      plane.material.uniforms.u_noiseFrequency.value = UNIFORMS_CORE.frequency
      plane.material.uniforms.u_blocks.value = UNIFORMS_CORE.blocks
      plane.material.uniforms.u_mixer_1.value = UNIFORMS_CORE.mixer1
      plane.material.uniforms.u_mixer_2.value = UNIFORMS_CORE.mixer2
      plane.material.uniforms.u_mixer_3.value = UNIFORMS_CORE.mixer3
      plane.material.uniforms.u_mixer_4.value = UNIFORMS_CORE.mixer4
      plane.scale.set(
        UNIFORMS_CORE.scale,
        UNIFORMS_CORE.scale,
        UNIFORMS_CORE.scale
      )
    }

    renderer.render(scene, camera)
    // animationId = requestAnimationFrame(animate)
    requestAnimationFrame(animate)
  }
  animate()
  console.log('logging uniforms from shader hub: ', UNIFORMS_CORE)

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

export default worldHome
