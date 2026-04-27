import gsap from 'gsap'

const UNIFORMS_TEXTURE = {
  offset: 0,
  scale: 1,
  amplitude: 0.16,
  frequency: 24,
  blocks: 800,

  mixer1: 0.0,
  mixer2: 0.0,
  mixer3: 0.0,
  mixer4: 0.0,
}

const UNIFORMS_BACKGROUND = {
  u_fMix: 1.2,
  u_iMix: 0.06,
  u_timeFactor: 0.28,
}

function miraUI() {
  // function githubToJsDelivr(permalink) {
  //   return permalink
  //     .replace('github.com', 'cdn.jsdelivr.net/gh')
  //     .replace('/blob/', '@')
  // }
  let fadeOutDur = 2.8
  let easings = ['linear', 'power1.inOut', 'power2.out', 'power2.inOut']
  // let easeIndex = 0

  // mouse events
  // window.addEventListener('mousedown', () => {
  //   console.log('mousedown')
  // })

  // window.addEventListener('mousemove', () => {
  //   console.log('mousemove')
  // })

  // window.addEventListener('mouseup', () => {
  //   console.log('mouseup')
  // })

  let currentStep = 0
  let isStabilized = false
  window.addEventListener('click', () => {
    currentStep++
    gsap.to(UNIFORMS_TEXTURE, {
      offset: 1,
      scale: 1.01,
      duration: fadeOutDur,
      ease: easings[1],
      onComplete: () => {
        window.dispatchEvent(
          new CustomEvent('moveStepForward', {
            detail: { step: currentStep },
          })
        )
        gsap.to(UNIFORMS_TEXTURE, {
          delay: 0.8,
          offset: 0,
          scale: 1.0,
          duration: fadeOutDur,
          ease: easings[1],
        })
      },
    })
    if (!isStabilized) {
      gsap.to(UNIFORMS_BACKGROUND, {
        u_fMix: 0.94,
        u_iMix: 0.08,
        u_timeFactor: 0.12,
        duration: 24,
        ease: easings[1],
      })
      isStabilized = true
    }
  })
}

export default miraUI
export { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND }
