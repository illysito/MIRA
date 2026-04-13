// import gsap from 'gsap'
import * as THREE from 'three'

import { uniforms } from './miraUI'
import disp_frag from './shaders/fragShader'
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

  // Main Image
  const imgLoader = new THREE.TextureLoader()

  const urls = [
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e447280e52403f971e69249c087d8b6143102bc0/textures/miraType.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e00fcd76641ba16a48522cd0704e81bc3b692b72/textures/miraPerlin.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/fb69784ec3ced3a8d90430ac99db012994a6c600/textures/miraSimplex.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/b97e52476a7edf9b508765c992020347786b63b5/textures/miraCustomTexture1.jpg'
    ),
    githubToJsDelivr(
      '    https://github.com/illysito/MIRA/blob/dfcfe6688222a1ccf4b13f9dde0732f0adc449fc/textures/miraFogTexture.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e447280e52403f971e69249c087d8b6143102bc0/textures/miraBackground.png'
    ),
  ]

  function loadTexture(url) {
    return new Promise((resolve, reject) => {
      imgLoader.load(
        url,
        (texture) => {
          // texture.colorSpace = THREE.SRGBColorSpace
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.generateMipmaps = false
          resolve(texture)
        },
        undefined,
        reject
      )
    })
  }
  let imgPlane = null

  let noiseTextures = []
  Promise.all(urls.map(loadTexture)).then((loadedTextures) => {
    noiseTextures = loadedTextures

    console.log(noiseTextures) // 👉 [omy, perlin, simplex, ...]
  })

  Promise.all(urls.map(loadTexture)).then(
    ([omy, perlin, simplex, custom1, fog, bg]) => {
      const planeGeometry = new THREE.PlaneGeometry(600, 600)

      // console.log(perlin)
      console.log(simplex)
      console.log(custom1)
      console.log(fog)

      const planeMaterial = new THREE.ShaderMaterial({
        fragmentShader: disp_frag,
        vertexShader: vert,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_offset: { value: 0 },
          u_mouseX: { value: 0 },
          u_mouseY: { value: 0 },
          u_noiseFrequency: { value: 8 },
          u_displacementCoef: { value: 0.4 },
          u_blocks: { value: 800 },

          u_img: { value: omy },
          u_noiseTexture: { value: perlin },
          u_bg: { value: bg },

          u_mix1: { value: 0.0 },
          u_mix2: { value: 0.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      imgPlane = new THREE.Mesh(planeGeometry, planeMaterial)

      scene.add(imgPlane)
    }
  )

  const backgroundPlaneGeometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight
  )
  const backgroundPlaneMaterial = new THREE.ShaderMaterial({
    fragmentShader: disp_frag_bg,
    vertexShader: vert,
    uniforms: {
      u_time: { value: 0 },
    },
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

    if (imgPlane) {
      imgPlane.material.uniforms.u_time.value = counter
      backgroundPlane.material.uniforms.u_time.value = counter

      imgPlane.material.uniforms.u_offset.value = uniforms.offset
      imgPlane.material.uniforms.u_displacementCoef.value = uniforms.amplitude
      imgPlane.material.uniforms.u_noiseFrequency.value = uniforms.frequency
      imgPlane.material.uniforms.u_blocks.value = uniforms.blocks
      imgPlane.material.uniforms.u_noiseTexture.value =
        noiseTextures[uniforms.textureIndex + 1]
    }

    renderer.render(scene, camera)
    // animationId = requestAnimationFrame(animate)
    requestAnimationFrame(animate)
  }
  animate()
  console.log('logging uniforms from shader hub: ', uniforms)

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

export default worldHome
