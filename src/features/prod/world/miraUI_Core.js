import gsap from 'gsap'

const UNIFORMS_CORE = {
  offset: 0,
  scale: 1,
  amplitude: 0.12,
  frequency: 24,
  blocks: 800,

  mixer1: 0.0,
  mixer2: 0.0,
  mixer3: 0.0,
  mixer4: 0.0,
}

function miraUI_Core() {
  // function githubToJsDelivr(permalink) {
  //   return permalink
  //     .replace('github.com', 'cdn.jsdelivr.net/gh')
  //     .replace('/blob/', '@')
  // }
  // let dur = 1.8
  // let easings = ['linear', 'power1.inOut', 'power2.out', 'power2.inOut']
  // let easeIndex = 0

  // mouse events
  window.addEventListener('mousedown', () => {
    console.log('mousedown')
  })

  window.addEventListener('mousemove', () => {
    console.log('mousemove')
  })

  window.addEventListener('mouseup', () => {
    console.log('mouseup')
  })

  let state = 0
  window.addEventListener('click', () => {
    console.log('click')
    state++
    if (state == 1) {
      gsap.to(UNIFORMS_CORE, {
        offset: 1,
        scale: 1.01,
        duration: 2.8,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(UNIFORMS_CORE, {
            mixer1: 1,
            duration: 1,
            onComplete: () => {
              gsap.to(UNIFORMS_CORE, {
                offset: 0,
                scale: 1.0,
                duration: 2.8,
                ease: 'power1.inOut',
              })
            },
          })
        },
      })
    } else if (state == 2) {
      gsap.to(UNIFORMS_CORE, {
        offset: 1,
        duration: 2.8,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(UNIFORMS_CORE, {
            mixer2: 1,
            duration: 1,
            onComplete: () => {
              gsap.to(UNIFORMS_CORE, {
                offset: 0,
                duration: 2.8,
                ease: 'power1.inOut',
              })
            },
          })
        },
      })
    } else if (state == 3) {
      gsap.to(UNIFORMS_CORE, {
        offset: 1,
        duration: 2.8,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(UNIFORMS_CORE, {
            mixer3: 1,
            duration: 1,
            onComplete: () => {
              gsap.to(UNIFORMS_CORE, {
                offset: 0,
                duration: 2.8,
                ease: 'power1.inOut',
              })
            },
          })
        },
      })
    } else if (state == 4) {
      gsap.to(UNIFORMS_CORE, {
        offset: 1,
        duration: 2.8,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(UNIFORMS_CORE, {
            mixer4: 1,
            duration: 1,
            onComplete: () => {
              gsap.to(UNIFORMS_CORE, {
                offset: 0,
                duration: 2.8,
                ease: 'power1.inOut',
              })
            },
          })
        },
      })
    }
  })
}

export default miraUI_Core
export { UNIFORMS_CORE }
