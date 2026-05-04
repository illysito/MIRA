import gsap from 'gsap'

import STEPS from '../data/stepsArray'
// console.log(STEPS)

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
  const CURRENT_STEP_TXT = document.querySelector('.effect-title')
  // BRIDGES
  const BRIDGES = [...document.querySelectorAll('.is--bridge')]
  const MENUS = [...document.querySelectorAll('.is--menu')]
  const menuHeadings = document.querySelectorAll('.menu-h')
  // const STAGE_2_INIT_CONTAINER = document.querySelector(
  //   '.stage_2_init_container'
  // )
  // const STAGE_2_INIT_LINES = document.querySelectorAll('.stage_2_init-h')
  // function githubToJsDelivr(permalink) {
  //   return permalink
  //     .replace('github.com', 'cdn.jsdelivr.net/gh')
  //     .replace('/blob/', '@')
  // }
  let fadeOutDur = 2.8
  let voidDelay = 1.6
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
  let isClickEnabled = true
  let isBackgroundStabilized = false

  function stabilizeBackground() {
    if (!isBackgroundStabilized) {
      gsap.to(UNIFORMS_BACKGROUND, {
        u_fMix: 0.88,
        u_iMix: 0.12,
        u_timeFactor: 0.1,
        duration: 18,
        ease: easings[1],
      })
      isBackgroundStabilized = true
    }
  }

  async function fadeShaderIn() {
    return new Promise((resolve) => {
      gsap.to(UNIFORMS_TEXTURE, {
        delay: voidDelay,
        offset: 0, // means fade in
        scale: 1.0,
        duration: fadeOutDur,
        ease: easings[1],
        onComplete: () => {
          resolve()
        },
      })
    })
  }

  async function fadeShaderOut() {
    return new Promise((resolve) => {
      gsap.to(UNIFORMS_TEXTURE, {
        offset: 1, // means fade out
        scale: 1.01,
        duration: fadeOutDur,
        ease: easings[1],
        onComplete: resolve,
      })
    })
  }

  function bridgeAnimation(container) {
    // console.log('yeka')

    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]
      // console.log(linesArray)

      const tl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      // Container fades in
      tl.to(container, {
        opacity: 1,
        duration: fadeOutDur,
      })

      // Lines fade in (at same time as container)
      tl.to(
        linesArray,
        {
          opacity: 0.8,
          scale: 0.99,
          duration: fadeOutDur,
          ease: easings[1],
          stagger: fadeOutDur / 6,
        },
        '<' // start at same time as previous
      )

      // Lines fade out after delay
      tl.to(linesArray, {
        delay: voidDelay * 2,
        opacity: 0,
        scale: 1.0,
        duration: fadeOutDur,
        ease: easings[1],
        stagger: fadeOutDur / 6,
      })

      // Container fades out
      tl.to(container, {
        opacity: 0,
        duration: fadeOutDur / 2,
      })
    })
  }

  async function fadeMenuIn(container) {
    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]
      // console.log(linesArray)

      const tl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      // Container fades in
      tl.to(container, {
        opacity: 1,
        duration: fadeOutDur,
      })

      // Lines fade in (at same time as container)
      tl.to(
        linesArray,
        {
          opacity: 0.8,
          scale: 0.99,
          duration: fadeOutDur,
          ease: easings[1],
          stagger: fadeOutDur / 6,
        },
        '<' // start at same time as previous
      )
    })
  }

  async function fadeMenuOut(container) {
    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]
      // console.log(linesArray)

      const tl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      // Container fades in
      tl.to(container, {
        opacity: 0,
        duration: fadeOutDur,
      })

      // Lines fade in (at same time as container)
      tl.to(
        linesArray,
        {
          opacity: 0.8,
          scale: 0.0,
          duration: fadeOutDur,
          ease: easings[1],
          stagger: fadeOutDur / 6,
        },
        '<' // start at same time as previous
      )
    })
  }

  async function exit(fromStep) {
    if (fromStep.type === 'normal') {
      // If current is normal shader animation, just fade it out.
      await fadeShaderOut()
    }

    if (fromStep.type === 'menu') {
      await fadeMenuOut(MENUS[fromStep.menuIndex])
    }
  }

  async function enter(toStep) {
    if (toStep.type === 'normal') {
      // If next step is normal, swap texture and move it in
      window.dispatchEvent(
        new CustomEvent('swapTexture', {
          detail: { step: currentStep },
        })
      )
      await fadeShaderIn()
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'bridge') {
      // if step is bridge, trigger animation (this will go to next step by itself)
      // usually nothing (it self-resolves)
      await bridgeAnimation(BRIDGES[toStep.bridgeIndex])
      goToStep(currentStep + 1)
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'menu') {
      isClickEnabled = false
      console.log('click is off')
      await fadeMenuIn(MENUS[toStep.menuIndex])
    }
  }

  async function goToStep(nextStepIndex) {
    const toStep = STEPS[nextStepIndex]
    const fromStep = STEPS[currentStep] // to check if needs fade in

    await exit(fromStep) // Exit from current step

    currentStep = nextStepIndex // update current step to track where we at
    CURRENT_STEP_TXT.textContent = 'Current step: ' + currentStep

    await enter(toStep) // Move into new currentStep

    if (currentStep == 1) {
      stabilizeBackground()
    }
  }

  window.addEventListener('click', () => {
    if (isClickEnabled) {
      goToStep(currentStep + 1) // move forward one step
    } else {
      console.log('click is off')
    }
    isClickEnabled = false
    console.log('click is off')
  })

  menuHeadings.forEach((heading) => {
    heading.addEventListener('mouseover', () => {
      gsap.to(heading, {
        opacity: 1,
        duration: 0.2,
      })
    })
    heading.addEventListener('mouseleave', () => {
      gsap.to(heading, {
        opacity: 0.8,
        duration: 0.2,
      })
    })
  })
}

export default miraUI
export { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND }
