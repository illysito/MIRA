// import gsap from 'gsap'
import * as THREE from 'three'

import { uniforms, offsets } from './miraUITest'
import disp_frag from './shaders/fragShader'
import disp_frag_bg from './shaders/fragShaderBackground'
import disp_frag_lifecycle from './shaders/fragShaderLifecycle'
import vert from './shaders/vertexShader'

function worldHomeTest() {
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

  // URLS for test Plane
  const testUrls = [
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e447280e52403f971e69249c087d8b6143102bc0/textures/miraType.png'
    ),
    // githubToJsDelivr(
    //   'https://github.com/illysito/MIRA/blob/ea439eb6e9981195b6b5f8c9a3c6af53e2119931/textures/miraCircle.png'
    // ),
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

  // URLS for lifecycle Plane
  const lifecycleUrls = [
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/ea439eb6e9981195b6b5f8c9a3c6af53e2119931/textures/miraCircle.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/ea439eb6e9981195b6b5f8c9a3c6af53e2119931/textures/miraTestType1.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/ea439eb6e9981195b6b5f8c9a3c6af53e2119931/textures/miraTestType2.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/ea439eb6e9981195b6b5f8c9a3c6af53e2119931/textures/miraTestType3.png'
    ),
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/e00fcd76641ba16a48522cd0704e81bc3b692b72/textures/miraPerlin.png'
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
  let testPlane = null
  let lifecyclePlane = null

  // Noise textures to swap them later
  let noiseTextures = []
  Promise.all(testUrls.map(loadTexture)).then((loadedTextures) => {
    noiseTextures = loadedTextures

    console.log(noiseTextures) // 👉 [omy, perlin, simplex, ...]
  })

  // Test plane
  Promise.all(testUrls.map(loadTexture)).then(
    ([type, perlin, simplex, custom1, fog, bg]) => {
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

          u_img: { value: type },
          u_noiseTexture: { value: perlin },
          u_bg: { value: bg },

          u_mix1: { value: 0.0 },
          u_mix2: { value: 0.0 },

          u_ciao: { value: 1.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      testPlane = new THREE.Mesh(planeGeometry, planeMaterial)

      scene.add(testPlane)
    }
  )

  // Lifecycle plane
  Promise.all(lifecycleUrls.map(loadTexture)).then(
    ([circle, type1, type2, type3, perlin, bg]) => {
      const planeGeometry = new THREE.PlaneGeometry(600, 600)

      const planeMaterial = new THREE.ShaderMaterial({
        fragmentShader: disp_frag_lifecycle,
        vertexShader: vert,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_offset: { value: 0 },
          u_noiseFrequency: { value: 6 },
          u_displacementCoef: { value: 0.14 },
          u_blocks: { value: 800 },

          u_m1: { value: 0.0 },
          u_m2: { value: 0.0 },
          u_m3: { value: 0.0 },

          u_img1: { value: circle },
          u_img2: { value: type1 },
          u_img3: { value: type2 },
          u_img4: { value: type3 },
          u_noiseTexture: { value: perlin },
          u_bg: { value: bg },

          u_mix1: { value: 0.0 },
          u_mix2: { value: 0.0 },

          u_ciao: { value: 0.0 },
          u_reveal: { value: 0.0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      lifecyclePlane = new THREE.Mesh(planeGeometry, planeMaterial)

      scene.add(lifecyclePlane)
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

    if (testPlane && lifecyclePlane) {
      testPlane.material.uniforms.u_time.value = counter
      lifecyclePlane.material.uniforms.u_time.value = counter
      backgroundPlane.material.uniforms.u_time.value = counter

      testPlane.material.uniforms.u_offset.value = uniforms.offset
      testPlane.material.uniforms.u_displacementCoef.value = uniforms.amplitude
      testPlane.material.uniforms.u_noiseFrequency.value = uniforms.frequency
      testPlane.material.uniforms.u_blocks.value = uniforms.blocks
      testPlane.material.uniforms.u_noiseTexture.value =
        noiseTextures[uniforms.textureIndex + 1]
      testPlane.scale.set(uniforms.scale, uniforms.scale, uniforms.scale)
      testPlane.material.uniforms.u_ciao.value = uniforms.ciao

      lifecyclePlane.material.uniforms.u_offset.value = offsets.offset
      lifecyclePlane.material.uniforms.u_m1.value = offsets.m1
      lifecyclePlane.material.uniforms.u_m2.value = offsets.m2
      lifecyclePlane.material.uniforms.u_m3.value = offsets.m3
      lifecyclePlane.material.uniforms.u_ciao.value = offsets.ciao
      lifecyclePlane.material.uniforms.u_reveal.value = offsets.reveal
      lifecyclePlane.scale.set(offsets.scale, offsets.scale, offsets.scale)
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

export default worldHomeTest
