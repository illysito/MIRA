import gsap from 'gsap'

import STEPS from '../data/stepsArray'

function lerp(start, end, t) {
  return start + (end - start) * t
}

const UNIFORMS_TEXTURE = {
  offset: 1,
  scale: 1,
  amplitude: 0.28,
  frequency: 24,
  blocks: 800,

  mixer1: 0.0,
  mixer2: 0.0,
  mixer3: 0.0,
  mixer4: 0.0,

  lineFactor: 0.0,
  hoverSwitchAmp: 1.0,
}

const UNIFORMS_BACKGROUND = {
  u_fMix: 1.2,
  u_iMix: 0.06,
  u_timeFactor: 0.28,
}

function miraUI() {
  const CURSOR = document.querySelector('.custom-cursor')
  const CURRENT_STEP_TXT = document.querySelector('.effect-title')

  const maxStep = STEPS.length
  let defaultAmplitude = 0.28
  let currentStepIndex = 0
  // let isTransitioning = false
  // hold & click gates
  let holdTimeDue = false
  let isHoldEnabled = true
  let isClickEnabled = false
  // actions been DONE gates
  let isBackgroundStabilized = false

  // FUNCTIONS

  function fadeSystemIn() {
    gsap.to(UNIFORMS_TEXTURE, {
      delay: STEPS[0].voidDelay,
      offset: 0, // means fade in
      duration: STEPS[0].fadeInDuration,
      ease: STEPS[0].easeIn,
    })
  }
  fadeSystemIn()

  function fadeInitialCursorIn() {
    gsap.to(CURSOR, {
      delay: 1,
      opacity: 0.8,
      duration: STEPS[0].fadeInDuration,
      ease: STEPS[0].easeIn,
    })
  }
  fadeInitialCursorIn()

  // On first interaction!
  function stabilizeBackground() {
    if (!isBackgroundStabilized) {
      gsap.to(UNIFORMS_BACKGROUND, {
        u_fMix: 0.88,
        u_iMix: 0.12,
        u_timeFactor: 0.1,
        duration: 2,
        ease: 'linear',
      })
      isBackgroundStabilized = true
    }
  }

  // function shutDownField() {
  //   gsap.to(UNIFORMS_BACKGROUND, {
  //     u_fMix: 0.0,
  //     u_iMix: 0.0,
  //     u_timeFactor: 0.0,
  //     duration: 8,
  //     ease: 'power1.inOut',
  //   })
  // }

  function fadeCursorOut() {
    gsap.to(CURSOR, {
      opacity: 0,
      duration: 1.2,
      ease: 'power1.inOut',
    })
  }

  function fadeCursorIn() {
    gsap.to(CURSOR, {
      opacity: 0.8,
      duration: 1.2,
      ease: 'power1.inOut',
    })
  }

  function fadeLineIn(toStep) {
    const DURATION = toStep.lineDuration
    const LINE_OPACITY = toStep.lineOpacity
    const EASE_IN = toStep.easeIn
    console.log(DURATION, EASE_IN)
    gsap.to(UNIFORMS_TEXTURE, {
      delay: 1,
      lineFactor: LINE_OPACITY, // means fade in
      duration: DURATION,
      ease: EASE_IN,
    })
  }

  async function fadeLineOut(fromStep) {
    const DURATION = fromStep.lineDuration
    const EASE_IN = fromStep.easeIn
    console.log(DURATION, EASE_IN)
    return new Promise((resolve) => {
      gsap.to(UNIFORMS_TEXTURE, {
        delay: 0,
        lineFactor: 0, // means fade in
        duration: DURATION / 1.5,
        ease: EASE_IN,
        onComplete: () => {
          resolve()
        },
      })
    })
  }

  async function fadeShaderIn(toStep) {
    const DURATION = toStep.fadeInDuration
    const VOID_DELAY = toStep.voidDelay
    const EASE_IN = toStep.easeIn

    return new Promise((resolve) => {
      gsap.to(UNIFORMS_TEXTURE, {
        delay: VOID_DELAY,
        offset: 0, // means fade in
        scale: 1.0,
        duration: DURATION,
        ease: EASE_IN,
        onComplete: () => {
          resolve()
        },
      })
    })
  }

  async function fadeShaderOut(fromStep) {
    const DURATION = fromStep.fadeOutDuration
    const EASE_OUT = fromStep.easeOut

    return new Promise((resolve) => {
      gsap.to(UNIFORMS_TEXTURE, {
        offset: 1, // means fade out
        scale: 1.01,
        duration: DURATION,
        ease: EASE_OUT,
        onComplete: () => {
          // restore amplitude
          gsap.set(UNIFORMS_TEXTURE, {
            amplitude: defaultAmplitude,
          })
          resolve()
        },
      })
    })
  }

  function bridgeAnimation(toStep) {
    const DURATION = toStep.fadeDuration
    const VOID_DELAY = toStep.voidDelay
    const HOLD_DELAY = toStep.holdDelay
    // const STAGGER_IN = toStep.staggerIn
    // const STAGGER_OUT = toStep.staggerOut
    const EASE_IN = toStep.easeIn
    const EASE_OUT = toStep.easeOut

    return new Promise((resolve) => {
      // const linesArray = [...container.querySelectorAll('h2')]

      const tl = gsap.timeline({
        onComplete: () => {
          fadeCursorIn()
          console.log('out of bridge')
          resolve()
        },
      })

      fadeCursorOut()

      tl.to(UNIFORMS_TEXTURE, {
        delay: VOID_DELAY,
        offset: 0, // means fade in
        scale: 1.0,
        duration: DURATION,
        ease: EASE_IN,
      })
      tl.to(UNIFORMS_TEXTURE, {
        delay: HOLD_DELAY,
        offset: 1.0,
        scale: 1.0,
        duration: DURATION,
        ease: EASE_OUT,
      })
    })
  }

  const areas_FirstMenu = [
    {
      name: 'core',
      index: 0,
      limits: { fromX: 45.23, toX: 54.9, fromY: 31.09, toY: 34.19 },
    },
    {
      name: 'seed',
      index: 1,
      limits: { fromX: 45.23, toX: 54.9, fromY: 37.81, toY: 40.92 },
    },
    {
      name: 'organism',
      index: 2,
      limits: { fromX: 41.08, toX: 58.94, fromY: 44.36, toY: 47.64 },
    },
  ]
  const areas_SecondMenu = [
    {
      name: 'habitat',
      index: 0,
      limits: { fromX: 43.65, toX: 56.64, fromY: 31.09, toY: 34.19 },
    },
    {
      name: 'communication',
      index: 1,
      limits: { fromX: 35.39, toX: 64.57, fromY: 37.81, toY: 40.92 },
    },
    {
      name: 'stratosphere',
      index: 2,
      limits: { fromX: 37.98, toX: 62.02, fromY: 44.36, toY: 47.64 },
    },
    {
      name: 'motion',
      index: 2,
      limits: { fromX: 43.65, toX: 56.64, fromY: 52.09, toY: 55.19 },
    },
  ]
  const areas_ThirdMenu = [
    {
      name: 'pulled in',
      index: 0,
      limits: { fromX: 42.69, toX: 57.49, fromY: 32.45, toY: 35.55 },
    },
    {
      name: 'observing',
      index: 1,
      limits: { fromX: 40.68, toX: 59.57, fromY: 40.65, toY: 43.75 },
    },
    {
      name: 'unresolved',
      index: 2,
      limits: { fromX: 39.68, toX: 60.6, fromY: 48.03, toY: 51.72 },
    },
    {
      name: 'distanced',
      index: 2,
      limits: { fromX: 34.0, toX: 65.67, fromY: 56.59, toY: 59.73 },
    },
    {
      name: 'out',
      index: 2,
      limits: { fromX: 42.69, toX: 57.49, fromY: 64.54, toY: 67.68 },
    },
  ]
  const canvasWidth = 600
  const canvasHeight = 600
  let canvasLeftEdge = window.innerWidth / 2 - canvasWidth / 2
  // let canvasRightEdge = window.innerWidth / 2 + canvasWidth / 2
  let canvasTopEdge = window.innerHeight / 2 - canvasHeight / 2
  // let canvasBottomEdge = window.innerHeight / 2 + canvasHeight / 2
  console.log(canvasLeftEdge, canvasTopEdge)

  function evaluateMenuAreas_FirstMenu(areas, mouseX, mouseY) {
    let step = null
    // CORE
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[0].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[0].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[0].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[0].limits.toY) / 100
      ) {
        console.log('CLICKED: CORE!')
        step = 3
      }
    }
    // SEED
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[1].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[1].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[1].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[1].limits.toY) / 100
      ) {
        console.log('CLICKED: SEED!')
        step = 10
      }
    }
    // ORGANISM
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[2].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[2].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[2].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[2].limits.toY) / 100
      ) {
        console.log('CLICKED: ORGANISM!')
        step = 16
      }
    }
    return step
  }

  function evaluateMenuAreas_SecondMenu(areas, mouseX, mouseY) {
    let step = null
    // HABITAT
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[0].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[0].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[0].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[0].limits.toY) / 100
      ) {
        console.log('CLICKED: HABITAT!')
        step = 25
      }
    }
    // COMMUNICATION
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[1].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[1].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[1].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[1].limits.toY) / 100
      ) {
        console.log('CLICKED: COMMUNICATION!')
        step = 34
      }
    }
    // STRATOSPHERE
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[2].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[2].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[2].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[2].limits.toY) / 100
      ) {
        console.log('CLICKED: STRATOSPHERE!')
        step = 45
      }
    }
    // MOTION
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[3].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[3].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[3].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[3].limits.toY) / 100
      ) {
        console.log('CLICKED: MOTION!')
        step = 60
      }
    }
    return step
  }

  function evaluateMenuAreas_ThirdMenu(areas, mouseX, mouseY) {
    let step = null
    // Pulled in
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[0].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[0].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[0].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[0].limits.toY) / 100
      ) {
        console.log('CLICKED: Pulled in!')
        step = 73
      }
    }
    // Observing
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[1].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[1].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[1].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[1].limits.toY) / 100
      ) {
        console.log('CLICKED: Observing!')
        step = 74
      }
    }
    // Unresolved
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[2].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[2].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[2].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[2].limits.toY) / 100
      ) {
        console.log('CLICKED: Unresolved!')
        step = 75
      }
    }
    // Keeping distance
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[3].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[3].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[3].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[3].limits.toY) / 100
      ) {
        console.log('CLICKED: Keeping distance!')
        step = 76
      }
    }
    // Outside
    if (
      mouseX > canvasLeftEdge + (canvasWidth * areas[4].limits.fromX) / 100 &&
      mouseX < canvasLeftEdge + (canvasWidth * areas[4].limits.toX) / 100
    ) {
      if (
        mouseY > canvasTopEdge + (canvasHeight * areas[4].limits.fromY) / 100 &&
        mouseY < canvasTopEdge + (canvasHeight * areas[4].limits.toY) / 100
      ) {
        console.log('CLICKED: Outside!')
        step = 77
      }
    }
    return step
  }

  // MAIN BRAIN

  async function exit(fromStep) {
    if (fromStep.needsLine && !fromStep.shouldRetainLine) {
      await fadeLineOut(fromStep)
    }

    if (fromStep.type === 'normal') {
      await fadeShaderOut(fromStep)
    }

    if (fromStep.type === 'menu') {
      await fadeShaderOut(fromStep)
      gsap.to(UNIFORMS_TEXTURE, {
        delay: 0,
        hoverSwitchAmp: 1.0, // QUIT HOVER EFFECT
        duration: 0.2,
        ease: 'none',
      })
    }
  }

  async function enter(toStep) {
    window.dispatchEvent(
      new CustomEvent('swapTexture', {
        detail: { step: currentStepIndex },
      })
    )

    if (toStep.needsLine) {
      fadeLineIn(toStep)
    }

    if (toStep.type === 'normal') {
      await fadeShaderIn(toStep)
      if (!toStep.isClickLocked) {
        isClickEnabled = true
      }
      console.log('click is on')
    }

    if (toStep.type === 'bridge') {
      await bridgeAnimation(toStep)
      goToStep(currentStepIndex + 1)
      if (!toStep.isClickLocked) {
        isClickEnabled = true
      }
      console.log('click is on')
    }

    if (toStep.type === 'menu') {
      gsap.to(UNIFORMS_TEXTURE, {
        delay: 0,
        hoverSwitchAmp: 0.0, // ACTIVATE HOVER EFFECT
        duration: 0.2,
        ease: 'none',
      })
      await fadeShaderIn(toStep)
      if (!toStep.isClickLocked) {
        isClickEnabled = true
      }
      console.log('click is on')
    }
  }

  async function goToStep(nextStepIndex) {
    // if (isTransitioning) return
    // isTransitioning = true

    if (nextStepIndex >= maxStep) {
      return
    }

    // Alignment menu always resolving in texture 78
    if (
      currentStepIndex === 73 ||
      currentStepIndex === 74 ||
      currentStepIndex === 75 ||
      currentStepIndex === 76 ||
      currentStepIndex === 77
    ) {
      nextStepIndex = 78
    }

    let toStep = STEPS[nextStepIndex]
    let fromStep = STEPS[currentStepIndex] // to check if needs fade in

    await exit(fromStep) // Exit from current step

    currentStepIndex = nextStepIndex // update current step to track where we at (NORMALLY MOVE 1 FORWARD)

    CURRENT_STEP_TXT.textContent = 'Current step: ' + currentStepIndex

    await enter(toStep) // Move into new currentStep

    if (currentStepIndex == 1) {
      stabilizeBackground()
    }

    // isTransitioning = false
  }

  // CLICK

  window.addEventListener('click', (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    // AREAS MENUS FLOW
    const currentStep = STEPS[currentStepIndex]
    if (currentStep.isClickLocked) {
      isClickEnabled = false
    } else {
      isClickEnabled = true
    }
    console.log(isClickEnabled)
    let destinationFromMenu = null

    // MENU FLOW
    if (currentStep.type === 'menu') {
      switch (currentStep.currentTexture) {
        case 'menu_1':
          destinationFromMenu = evaluateMenuAreas_FirstMenu(
            areas_FirstMenu,
            mouseX,
            mouseY
          )
          break

        case 'menu_2':
          destinationFromMenu = evaluateMenuAreas_SecondMenu(
            areas_SecondMenu,
            mouseX,
            mouseY
          )
          break

        case 'menu_3':
          destinationFromMenu = evaluateMenuAreas_ThirdMenu(
            areas_ThirdMenu,
            mouseX,
            mouseY
          )
          break
      }

      if (isClickEnabled && destinationFromMenu) {
        goToStep(destinationFromMenu) // move forward one step
      }
    } else {
      // NORMAL FLOW
      if (isClickEnabled) {
        goToStep(currentStepIndex + 1) // move forward one step
      } else {
        console.log('click is off')
      }
      isClickEnabled = false
      console.log('click is off')
    }
  })

  // HOLD

  let holdTween
  let releaseTween
  let holdDuration = 4
  window.addEventListener('pointerdown', () => {
    if (!isHoldEnabled) return

    holdTimeDue = false
    releaseTween?.kill()

    holdTween = gsap.to(UNIFORMS_TEXTURE, {
      offset: 0.2,
      amplitude: 3,
      duration: holdDuration,
      ease: 'linear',

      onComplete: () => {
        holdTimeDue = true
        isHoldEnabled = false
        goToStep(currentStepIndex + 1)
      },
    })
  })

  window.addEventListener('pointerup', () => {
    if (!holdTween) return

    if (!holdTimeDue) {
      // stop the hold wherever it currently is
      holdTween.kill()

      // smoothly go back from the current values
      releaseTween = gsap.to(UNIFORMS_TEXTURE, {
        offset: 0,
        amplitude: defaultAmplitude,
        duration: 2.8,
        ease: 'power2.out',
      })
    }

    holdTween = null
  })

  // CURSOR

  const side = 28 / 2
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let lerpFactor = 0.4
  function animateCursor() {
    currentX = lerp(currentX, targetX, lerpFactor)
    currentY = lerp(currentY, targetY, lerpFactor)
    CURSOR.style.transform = `translate3d(${currentX - side}px, ${
      currentY - side
    }px, 0)`
    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX
    targetY = e.clientY
  })

  // FROM CONSOLE

  function go(x) {
    goToStep(x)
  }

  window.go = go
}

export default miraUI
export { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND }
