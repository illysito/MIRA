import gsap from 'gsap'

import STEPS from '../data/stepsArray'
// console.log(STEPS)

const UNIFORMS_TEXTURE = {
  offset: 0,
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
  circularMenuContainer.style.pointerEvents = 'auto'
  positionMenuContainer.style.pointerEvents = 'auto'
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
  const maxStep = STEPS.length
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

  let currentStepIndex = 0
  let isClickEnabled = true
  let isBackgroundStabilized = false
  let firstMenuHasBeenViewed = 0
  let isSufficientInteraction = false
  let alignmentIndex = 0

  // FUNCTIONS

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

  function shutDownField() {
    gsap.to(UNIFORMS_BACKGROUND, {
      u_fMix: 0.0,
      u_iMix: 0.0,
      u_timeFactor: 0.0,
      duration: 8,
      ease: easings[1],
    })
  }

  async function fadeShaderIn() {
    return new Promise((resolve) => {
      gsap.to(UNIFORMS_TEXTURE, {
        delay: voidDelay * 1.8,
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
          delay: voidDelay * 1.8,
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

  async function fadeMenuIn(container, menuIndex) {
    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]
      // console.log(linesArray)

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
          duration: fadeOutDur,
        })

        // Lines fade in (at same time as container)
        linesArray.forEach((l) => {
          console.log(l)
          if (l.classList.contains('is--inactive')) {
            tl.to(
              l,
              {
                opacity: 0.28,
                scale: 0.99,
                duration: fadeOutDur,
                ease: easings[1],
                delay: fadeOutDur / 6,
              },
              '<'
            ) // start at same time as previous)
          } else {
            tl.to(
              l,
              {
                opacity: 0.8,
                scale: 0.99,
                duration: fadeOutDur,
                ease: easings[1],
                delay: fadeOutDur / 6,
              },
              '<'
            ) // start at same time as previous)
          }
        })
      } else if (menuIndex == 1) {
        // Second menu, NO hierarchy
        console.log(container)
        tl.to(container, {
          opacity: 1,
          duration: fadeOutDur * 1.8,
        })
        // tl.to(
        //   linesArray,
        //   {
        //     opacity: 0.8,
        //     scale: 0.99,
        //     duration: fadeOutDur,
        //     ease: easings[1],
        //   },
        //   '<'
        // ) // start at same time as previous)
      }
    })
  }

  async function fadeMenuOut(container, menuIndex) {
    return new Promise((resolve) => {
      const linesArray = [...container.querySelectorAll('h2')]
      // console.log(linesArray)

      const tl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      if (menuIndex == 0 || menuIndex == 2) {
        // Container fades in
        tl.to(container, {
          opacity: 0,
          duration: fadeOutDur,
        })

        // Lines fade in (at same time as container)
        tl.to(
          linesArray,
          {
            opacity: 0.0,
            scale: 1.0,
            duration: fadeOutDur,
            ease: easings[1],
            stagger: fadeOutDur / 6,
          },
          '<' // start at same time as previous
        )
      } else if (menuIndex == 1) {
        // Second menu, NO hierarchy
        tl.to(container, {
          opacity: 0,
          duration: fadeOutDur * 1.8,
        })
        // tl.to(
        //   linesArray,
        //   {
        //     opacity: 0,
        //     scale: 0.99,
        //     duration: fadeOutDur,
        //     ease: easings[1],
        //   },
        //   '<'
        // ) // start at same time as previous)
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
    console.log(alignmentIndex)
    let nextIndex = 0
    if (alignmentIndex == 50) {
      // MIDDLE GROUND
      nextIndex = STEPS.length - 1
    } else if (alignmentIndex > 50) {
      // TOP ALIGNMENT
      nextIndex = 64 // just go to STAGE 5
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
      await fadeShaderOut()
    }

    if (fromStep.type === 'menu') {
      await fadeMenuOut(MENUS[fromStep.menuIndex], fromStep.menuIndex)
      if (fromStep.menuIndex == 0) {
        firstMenuHasBeenViewed++
        console.log('first Menu viewed: ', firstMenuHasBeenViewed)
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
      await fadeShaderIn()
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'bridge') {
      // if step is bridge, trigger animation (this will go to next step by itself)
      // usually nothing (it self-resolves)
      await bridgeAnimation(BRIDGES[toStep.bridgeIndex])
      goToStep(currentStepIndex + 1)
      isClickEnabled = true
      console.log('click is on')
    }

    if (toStep.type === 'menu') {
      isClickEnabled = false
      console.log('click is off')
      console.log('menu should be showing')
      await fadeMenuIn(MENUS[toStep.menuIndex], toStep.menuIndex)
    }
  }

  async function goToStep(nextStepIndex) {
    if (nextStepIndex > maxStep) {
      return
    }

    let toStep = STEPS[nextStepIndex]
    let fromStep = STEPS[currentStepIndex] // to check if needs fade in

    await exit(fromStep) // Exit from current step

    if (
      currentStepIndex == 60 || // end of alignment
      currentStepIndex == 54 || // end of stratosphere
      currentStepIndex == 43 || // end of communication
      currentStepIndex == 36 || // end of habitat
      currentStepIndex == 30 // end of conditions
    ) {
      //
      currentStepIndex = 23 // CIRCULAR 5 DOCUMENTS MENU
      toStep = STEPS[currentStepIndex]
    } else if (currentStepIndex == 63) {
      currentStepIndex = decideBasedOnAlignment()
      toStep = STEPS[currentStepIndex]
    } else {
      currentStepIndex = nextStepIndex // update current step to track where we at (NORMALLY MOVE 1 FORWARD)
    }

    if (isSufficientInteraction) {
      positionMenuContainer.style.pointerEvents = 'auto'
      currentStepIndex = 61 // STAGE 4
      toStep = STEPS[currentStepIndex]
    }
    CURRENT_STEP_TXT.textContent = 'Current step: ' + currentStepIndex

    await enter(toStep) // Move into new currentStep

    if (currentStepIndex == 1) {
      stabilizeBackground()
    }
  }

  window.addEventListener('click', () => {
    if (isClickEnabled) {
      goToStep(currentStepIndex + 1) // move forward one step
    } else {
      console.log('click is off')
    }
    isClickEnabled = false
    console.log('click is off')
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
          goToStep(24)
        } else if (index == 4) {
          // STRATOSPHERE
          goToStep(44)
        } else if (index == 5) {
          // COMMUNICATION
          goToStep(37)
        } else if (index == 6) {
          // HABITAT
          goToStep(31)
        } else if (index == 7) {
          // ALIGNMENT
          goToStep(55)
        } else if (index == 8) {
          // STAGE 4 REACTION - Pulled toward it
          alignmentIndex = 100
          STAGE_4_REACTION.textContent = 'The direction is already set.'
          goToStep(63)
        } else if (index == 9) {
          // STAGE 4 REACTION - Leaning into it
          alignmentIndex = 80
          STAGE_4_REACTION.textContent = 'You are beginning to move.'
          goToStep(63)
        } else if (index == 10) {
          // STAGE 4 REACTION - Unresolved
          alignmentIndex = 50
          STAGE_4_REACTION.textContent = 'You remain between positions.'
          goToStep(63)
        } else if (index == 11) {
          // STAGE 4 REACTION - Keeping distance
          alignmentIndex = 20
          STAGE_4_REACTION.textContent = 'Distance is being maintained.'
          goToStep(63)
        } else if (index == 12) {
          // STAGE 4 REACTION - Outside of it
          alignmentIndex = 0
          STAGE_4_REACTION.textContent = 'You have not entered.'
          goToStep(63)
        }
      }
    })
  })

  // FROM CONSOLE
  function go(x) {
    goToStep(x)
  }

  window.go = go
}

export default miraUI
export { UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND }
