// import gsap from 'gsap'
import * as THREE from 'three'

import disp_frag from './shaders/fragShader'
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
      'https://github.com/illysito/MIRA/blob/1fb90453b4269d6a504d7597d43ac02a2e0c70c3/textures/initTypeExample2.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/17cec003107d6d13a4556ed21aec386397d058b9/imgs/PerlinOmy.jpg'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/teoriadelkaos/blob/17cec003107d6d13a4556ed21aec386397d058b9/imgs/OmyBlackBG.jpg'
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

  Promise.all(urls.map(loadTexture)).then(([omy, perlin, bg]) => {
    const planeGeometry = new THREE.PlaneGeometry(600, 600)

    const planeMaterial = new THREE.ShaderMaterial({
      fragmentShader: disp_frag,
      vertexShader: vert,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_offset: { value: 0 },
        u_mouseX: { value: 0 },
        u_mouseY: { value: 0 },

        u_img: { value: omy },
        u_perlin: { value: perlin },
        u_bg: { value: bg },

        u_mix1: { value: 0.0 },
        u_mix2: { value: 0.0 },
      },
    })

    imgPlane = new THREE.Mesh(planeGeometry, planeMaterial)

    const planeScale = 1
    imgPlane.scale.set(planeScale, planeScale, planeScale)

    scene.add(imgPlane)
  })

  // Loop
  let counter = 0

  function animate() {
    counter += 0.002

    if (imgPlane) {
      imgPlane.material.uniforms.u_time.value = counter
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
}

export default worldHome
