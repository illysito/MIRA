import gsap from 'gsap'

import STEPS from '../data/stepsArray'

const UNIFORMS_TEXTURE = {
  offset: 1,
  scale: 1,
  amplitude: 0.32,
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
  const CURSOR = document.querySelector('.custom-cursor')
  const CURRENT_STEP_TXT = document.querySelector('.effect-title')
  // BRIDGES
  const BRIDGES = [...document.querySelectorAll('.is--bridge')]
  const MENUS = [...document.querySelectorAll('.is--menu')]
  const menuHeadings = document.querySelectorAll('.menu-h')
  const circularMenuContainer = document.querySelector(
    '.stage_3_menu_container'
  )
  const positionMenuContainer = document.querySelector(
    '.stage_4_interaction_container'
  )
  const STAGE_4_REACTION = document.querySelector('.stage_4_reaction-h')

  const maxStep = STEPS.length
  let defaultAmplitude = 0.32
  let currentStepIndex = 0
  // let isTransitioning = false
  // hold & click gates
  let holdTimeDue = false
  let isHoldEnabled = true
  let isClickEnabled = false
  // actions been DONE gates
  let isBackgroundStabilized = false
  let firstMenuHasBeenViewed = 0
  let isSufficientInteraction = false
  // how aligned are you?
  let alignmentIndex = 0

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

  function shutDownField() {
    gsap.to(UNIFORMS_BACKGROUND, {
      u_fMix: 0.0,
      u_iMix: 0.0,
      u_timeFactor: 0.0,
      duration: 8,
      ease: 'power1.inOut',
    })
  }

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

  function bridgeAnimation(toStep, container) {
    const DURATION = toStep.fadeDuration
    const VOID_DELAY = toStep.voidDelay
    const STAGGER_DELAY = toStep.staggerDuration
    const EASE_IN = toStep.easeIn
    const EASE_OUT = toStep.easeOut

    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]

      const tl = gsap.timeline({
        onComplete: () => {
          fadeCursorIn()
          console.log('out of bridge')
          resolve()
        },
      })

      fadeCursorOut()

      // Container fades in
      tl.to(container, {
        opacity: 1,
        duration: DURATION,
      })

      // Lines fade in (at same time as container)
      tl.to(
        linesArray,
        {
          opacity: 0.8,
          scale: 0.99,
          duration: DURATION,
          ease: EASE_IN,
          delay: VOID_DELAY,
          stagger: STAGGER_DELAY,
        },
        '<' // start at same time as previous
      )

      // Lines fade out after delay
      tl.to(linesArray, {
        delay: VOID_DELAY * 1.16,
        opacity: 0,
        scale: 1.0,
        duration: DURATION,
        ease: EASE_OUT,
        stagger: STAGGER_DELAY,
      })

      // Container fades out
      tl.to(container, {
        opacity: 0,
        duration: DURATION / 2,
      })
    })
  }

  async function fadeMenuIn(toStep, container, menuIndex) {
    const DURATION = toStep.fadeInDuration
    const STAGGER_DELAY = toStep.staggerDuration
    const EASE_IN = toStep.easeIn

    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]

      const tl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      if (menuIndex == 0 || menuIndex == 2) {
        // First menu, appearing one by one
        // Container fades in
        tl.to(container, {
          opacity: 1,
          duration: DURATION,
        })

        // Lines fade in (at same time as container)
        linesArray.forEach((l) => {
          if (l.classList.contains('is--inactive')) {
            tl.to(
              l,
              {
                opacity: 0.28,
                scale: 0.99,
                duration: DURATION,
                ease: EASE_IN,
                delay: STAGGER_DELAY,
              },
              '<'
            ) // start at same time as previous)
          } else {
            tl.to(
              l,
              {
                opacity: 0.8,
                scale: 0.99,
                duration: DURATION,
                ease: EASE_IN,
                delay: STAGGER_DELAY,
              },
              '<'
            ) // start at same time as previous)
          }
        })
      } else if (menuIndex == 1) {
        // Second menu, NO hierarchy, meaning NO STAGGER and NO FOR EACH
        tl.to(container, {
          opacity: 1,
          duration: DURATION,
          ease: EASE_IN,
        })
      }

      // Cursor activation
      if (menuIndex == 1) {
        circularMenuContainer.style.pointerEvents = 'auto'
      } else if (menuIndex == 2) {
        positionMenuContainer.style.pointerEvents = 'auto'
      }
    })
  }

  async function fadeMenuOut(fromStep, container, menuIndex) {
    const DURATION = fromStep.fadeInDuration
    const STAGGER_DELAY = fromStep.staggerDuration
    const EASE_OUT = fromStep.easeOut

    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]

      const tl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      if (menuIndex == 0 || menuIndex == 2) {
        // Container fades in
        tl.to(container, {
          opacity: 0,
          duration: DURATION,
        })

        // Lines fade in (at same time as container)
        tl.to(
          linesArray,
          {
            opacity: 0.0,
            scale: 1.0,
            duration: DURATION,
            ease: EASE_OUT,
            stagger: STAGGER_DELAY,
          },
          '<' // start at same time as previous
        )
      } else if (menuIndex == 1) {
        // Second menu, NO hierarchy
        tl.to(container, {
          opacity: 0,
          duration: DURATION,
        })
      }
    })
  }

  function stage1MenuOpacity() {
    if (firstMenuHasBeenViewed == 1) {
      const menuHeadings = MENUS[0].querySelectorAll('h2')
      menuHeadings[0].classList.add('is--inactive')
      menuHeadings[1].classList.remove('is--inactive')
    } else if (firstMenuHasBeenViewed == 2) {
      const menuHeadings = MENUS[0].querySelectorAll('h2')
      menuHeadings[1].classList.add('is--inactive')
      menuHeadings[2].classList.remove('is--inactive')
    } else if (firstMenuHasBeenViewed == 3) {
      circularMenuContainer.style.pointerEvents = 'auto'
    } else {
      return
    }
  }

  function decideBasedOnAlignment() {
    let nextIndex = 0
    if (alignmentIndex == 50) {
      // MIDDLE GROUND
      nextIndex = STEPS.length - 1
    } else if (alignmentIndex > 50) {
      // TOP ALIGNMENT
      nextIndex = 60 // just go to STAGE 5
    } else {
      // OUTSIDE OF IT
      nextIndex = STEPS.length - 1
      shutDownField()
    }
    return nextIndex
  }

  // MAIN BRAIN

  async function exit(fromStep) {
    if (fromStep.type === 'normal') {
      // If current is normal shader animation, just fade it out.
      await fadeShaderOut(fromStep)
    }

    if (fromStep.type === 'menu') {
      await fadeMenuOut(fromStep, MENUS[fromStep.menuIndex], fromStep.menuIndex)
      if (fromStep.menuIndex == 0) {
        firstMenuHasBeenViewed++
      }
      stage1MenuOpacity()
    }
  }

  async function enter(toStep) {
    if (toStep.type === 'normal') {
      // If next step is normal, swap texture and move it in
      window.dispatchEvent(
        new CustomEvent('swapTexture', {
          detail: { step: currentStepIndex },
        })
      )
      await fadeShaderIn(toStep)
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'bridge') {
      // if step is bridge, trigger animation (this will go to next step by itself)
      // usually nothing (it self-resolves)
      await bridgeAnimation(toStep, BRIDGES[toStep.bridgeIndex])
      goToStep(currentStepIndex + 1)
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'menu') {
      isClickEnabled = false
      console.log('click is off')
      await fadeMenuIn(toStep, MENUS[toStep.menuIndex], toStep.menuIndex)
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
      currentStepIndex = decideBasedOnAlignment()
      toStep = STEPS[currentStepIndex]
    } else {
      currentStepIndex = nextStepIndex // update current step to track where we at (NORMALLY MOVE 1 FORWARD)
    }

    if (isSufficientInteraction) {
      positionMenuContainer.style.pointerEvents = 'auto'
      currentStepIndex = 57 // STAGE 4
      toStep = STEPS[currentStepIndex]
    }
    CURRENT_STEP_TXT.textContent = 'Current step: ' + currentStepIndex

    await enter(toStep) // Move into new currentStep

    if (currentStepIndex == 1) {
      stabilizeBackground()
    }

    // isTransitioning = false
  }

  // CLICK

  window.addEventListener('click', () => {
    if (isClickEnabled) {
      goToStep(currentStepIndex + 1) // move forward one step
    } else {
      console.log('click is off')
    }
    isClickEnabled = false
    console.log('click is off')
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
      ease: 'power2.out',

      onComplete: () => {
        holdTimeDue = true
        isHoldEnabled = false
        goToStep(1)
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
      } else {
        gsap.to(heading, {
          opacity: 1,
          duration: 0.4,
        })
      }
    })
    heading.addEventListener('mouseleave', () => {
      if (heading.classList.contains('is--inactive')) {
        return
      } else {
        gsap.to(heading, {
          opacity: 0.8,
          duration: 0.4,
        })
      }
    })
    heading.addEventListener('click', () => {
      if (heading.classList.contains('is--inactive')) {
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
          STAGE_4_REACTION.textContent = 'The direction is already set.'
          goToStep(59)
        } else if (index == 9) {
          // STAGE 4 REACTION - Leaning into it
          alignmentIndex = 80
          STAGE_4_REACTION.textContent = 'You are beginning to move.'
          goToStep(59)
        } else if (index == 10) {
          // STAGE 4 REACTION - Unresolved
          alignmentIndex = 50
          STAGE_4_REACTION.textContent = 'You remain between positions.'
          goToStep(59)
        } else if (index == 11) {
          // STAGE 4 REACTION - Keeping distance
          alignmentIndex = 20
          STAGE_4_REACTION.textContent = 'Distance is being maintained.'
          goToStep(59)
        } else if (index == 12) {
          // STAGE 4 REACTION - Outside of it
          alignmentIndex = 0
          STAGE_4_REACTION.textContent = 'You have not entered.'
          goToStep(59)
        }
      }
    })
  })

  // CURSOR

  window.addEventListener('mousemove', (e) => {
    CURSOR.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
  })

  // FROM CONSOLE

  function go(x) {
    goToStep(x)
  }

  window.go = go
}

export default miraUI
export { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND }
