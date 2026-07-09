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
  hoverSwitch: 1.0,
}

const UNIFORMS_BACKGROUND = {
  u_fMix: 1.2,
  u_iMix: 0.06,
  u_timeFactor: 0.28,
}

function miraUI() {
  const CURSOR = document.querySelector('.custom-cursor')
  const CURRENT_STEP_TXT = document.querySelector('.effect-title')
  // BRIDGES
  // const BRIDGES = [...document.querySelectorAll('.is--bridge')]
  // const MENUS = [...document.querySelectorAll('.is--menu')]
  const menuHeadings = document.querySelectorAll('.menu-h')

  const STAGE_4_REACTION = document.querySelector('.stage_4_reaction-h')

  const maxStep = STEPS.length
  let defaultAmplitude = 0.28
  let currentStepIndex = 0
  // let isTransitioning = false
  // hold & click gates
  let holdTimeDue = false
  let isHoldEnabled = true
  let isClickEnabled = false
  // actions been DONE gates
  let isMenuTransitioning = false
  let isBackgroundStabilized = false
  let isBackgroundReadyForNDA = false
  // let firstMenuHasBeenViewed = 0
  let isSufficientInteraction = false
  // how aligned are you?
  let alignmentIndex = 100

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
        duration: 18,
        ease: 'linear',
      })
      isBackgroundStabilized = true
    }
  }

  function adjustNDABackground() {
    if (!isBackgroundReadyForNDA) {
      gsap.to(UNIFORMS_BACKGROUND, {
        u_fMix: 0.75,
        u_iMix: 0.25,
        u_timeFactor: 0.1,
        duration: 18,
        ease: 'linear',
      })
      isBackgroundReadyForNDA = true
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
      delay: 0,
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
        duration: DURATION,
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

  function decideBasedOnAlignment() {
    let nextIndex = 0
    if (alignmentIndex > 50) {
      // TOP ALIGNMENT
      nextIndex = 61 // just go to STAGE 5
    } else {
      // OUTSIDE OF IT or MIDDLE GROUND
      nextIndex = STEPS.length - 1
    }
    return nextIndex
  }

  const areas = [
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
  const canvasWidth = 600
  const canvasHeight = 600
  let canvasLeftEdge = window.innerWidth / 2 - canvasWidth / 2
  // let canvasRightEdge = window.innerWidth / 2 + canvasWidth / 2
  let canvasTopEdge = window.innerHeight / 2 - canvasHeight / 2
  // let canvasBottomEdge = window.innerHeight / 2 + canvasHeight / 2
  console.log(canvasLeftEdge, canvasTopEdge)

  function evaluateMenuAreas(areas, mouseX, mouseY) {
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

  // MAIN BRAIN

  async function exit(fromStep) {
    if (fromStep.needsLine && !fromStep.shouldRetainLine) {
      await fadeLineOut(fromStep)
    }

    if (fromStep.type === 'normal') {
      // If current is normal shader animation, just fade it out.
      await fadeShaderOut(fromStep)
    }

    if (fromStep.type === 'menu') {
      // const menuIndex = fromStep.menuIndex
      await fadeShaderOut(fromStep)
      gsap.to(UNIFORMS_TEXTURE, {
        delay: 0,
        hoverSwitch: 1.0, // QUIT HOVER EFFECT
        duration: 0.2,
        ease: 'none',
      })
      // await fadeMenuOut(fromStep, MENUS[fromStep.menuIndex], fromStep.menuIndex)
      // if (fromStep.menuIndex == 0) {
      //   firstMenuHasBeenViewed++
      // }
      // stage1MenuOpacity()
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
      // If next step is normal, swap texture and move it in
      // window.dispatchEvent(
      //   new CustomEvent('swapTexture', {
      //     detail: { step: currentStepIndex },
      //   })
      // )
      await fadeShaderIn(toStep)
      if (toStep.id != 'step-60') {
        isClickEnabled = true // Normally we need to put it as TRUE, but not when INNER CIRCLE is entering, this will be handled in the FADE IN of the menu :)
        console.log('click is on')
      }
    }

    if (toStep.type === 'bridge') {
      // if step is bridge, trigger animation (this will go to next step by itself)
      // usually nothing (it self-resolves)
      // window.dispatchEvent(
      //   new CustomEvent('swapTexture', {
      //     detail: { step: currentStepIndex },
      //   })
      // )
      await bridgeAnimation(toStep)
      goToStep(currentStepIndex + 1)
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'menu') {
      gsap.to(UNIFORMS_TEXTURE, {
        delay: 0,
        hoverSwitch: 0.0, // ACTIVATE HOVER EFFECT
        duration: 0.2,
        ease: 'none',
      })
      await fadeShaderIn(toStep)
      isClickEnabled = true
      console.log('click is on')
    }
  }

  async function goToStep(nextStepIndex) {
    // if (isTransitioning) return
    // isTransitioning = true

    if (nextStepIndex >= maxStep) {
      return
    }

    let toStep = STEPS[nextStepIndex]
    let fromStep = STEPS[currentStepIndex] // to check if needs fade in

    await exit(fromStep) // Exit from current step

    if (STEPS[currentStepIndex].nextIsMenu === true) {
      // is the last doc of any of the 5 documents of stage 2
      currentStepIndex = 22 // CIRCULAR 5 DOCUMENTS MENU
      toStep = STEPS[currentStepIndex]
    } else if (currentStepIndex == 59) {
      // Just exited from REFLECTION and need to prepare interaction with CIRCLE!
      // currentStepIndex = decideBasedOnAlignment()
      isClickEnabled = false
      isHoldEnabled = true
      currentStepIndex = nextStepIndex // We will ALWAYS go to next step (Inner Circle)
    } else if (currentStepIndex == 60) {
      // Just exited from INNER CIRCLE and need to decide where to go (REST or NEXT)
      currentStepIndex = decideBasedOnAlignment()
      toStep = STEPS[currentStepIndex]
    } else {
      currentStepIndex = nextStepIndex // update current step to track where we at (NORMALLY MOVE 1 FORWARD)
    }

    if (isSufficientInteraction) {
      // positionMenuContainer.style.pointerEvents = 'auto'
      currentStepIndex = 57 // STAGE 4
      toStep = STEPS[currentStepIndex]
    }
    CURRENT_STEP_TXT.textContent = 'Current step: ' + currentStepIndex

    await enter(toStep) // Move into new currentStep

    if (currentStepIndex == 1) {
      stabilizeBackground()
    } else if (currentStepIndex == 62) {
      adjustNDABackground()
    }

    // isTransitioning = false
  }

  // CLICK

  window.addEventListener('click', (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    // AREAS MENUS FLOW
    const currentStep = STEPS[currentStepIndex]
    let destinationFromMenu = null
    if (currentStep.type === 'menu') {
      destinationFromMenu = evaluateMenuAreas(areas, mouseX, mouseY)
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

  // HEADINGS OF MENU CLICKS

  menuHeadings.forEach((heading, index) => {
    heading.addEventListener('mouseover', () => {
      if (heading.classList.contains('is--inactive')) {
        return
      } else if (isMenuTransitioning) {
        return
      } else {
        gsap.to(heading, {
          opacity: 1,
          duration: 0.4,
          overwrite: 'auto',
        })
      }
    })
    heading.addEventListener('mouseleave', () => {
      if (heading.classList.contains('is--inactive')) {
        return
      } else if (isMenuTransitioning) {
        return
      } else {
        gsap.to(heading, {
          opacity: 0.8,
          duration: 0.4,
          overwrite: 'auto',
        })
      }
    })
    heading.addEventListener('click', () => {
      if (heading.classList.contains('is--inactive')) {
        return
      } else if (isMenuTransitioning) {
        return
      } else {
        if (index == 0) {
          // CORE
          goToStep(3)
        } else if (index == 1) {
          // SEED
          goToStep(9)
        } else if (index == 2) {
          // ORGANISM
          goToStep(16)
        } else if (index == 3) {
          // CONDITIONS
          goToStep(23)
        } else if (index == 4) {
          // STRATOSPHERE
          goToStep(39)
        } else if (index == 5) {
          // COMMUNICATION
          goToStep(34)
        } else if (index == 6) {
          // HABITAT
          goToStep(29)
        } else if (index == 7) {
          // ALIGNMENT
          goToStep(50)
        } else if (index == 8) {
          // STAGE 4 REACTION - Pulled toward it
          alignmentIndex = 100
          STAGE_4_REACTION.textContent = 'Coherence is present within you.'
          goToStep(59)
        } else if (index == 9) {
          // STAGE 4 REACTION - Leaning into it
          alignmentIndex = 80
          STAGE_4_REACTION.textContent = 'Your proximity is increasing.'
          goToStep(59)
        } else if (index == 10) {
          // STAGE 4 REACTION - Unresolved
          alignmentIndex = 50
          STAGE_4_REACTION.textContent = 'Your position has not settled.'
          goToStep(59)
        } else if (index == 11) {
          // STAGE 4 REACTION - Keeping distance
          alignmentIndex = 20
          STAGE_4_REACTION.textContent = 'Your separation is being maintained.'
          goToStep(59)
        } else if (index == 12) {
          // STAGE 4 REACTION - Outside of it
          alignmentIndex = 0
          STAGE_4_REACTION.textContent = 'No relation is forming within you.'
          goToStep(59)
        } else if (index == 13) {
          // Go to DocuSign FOCUS
          goToStep(62)
        }
      }
    })
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
