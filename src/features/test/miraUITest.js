import gsap from 'gsap'

const uniforms = {
  offset: 0,
  scale: 1,
  amplitude: 0.4,
  frequency: 8,
  blocks: 800,
  textureIndex: 0,
  ciao: 0.0,
}

const offsets = {
  offset: 0.0,
  scale: 1,
  m1: 0.0,
  m2: 0.0,
  m3: 0.0,
  ciao: 1.0,
  reveal: 0.0,
}

let isInteractiveSelected = true

function miraUITest() {
  // function githubToJsDelivr(permalink) {
  //   return permalink
  //     .replace('github.com', 'cdn.jsdelivr.net/gh')
  //     .replace('/blob/', '@')
  // }
  let dur = 1.8
  let easings = ['linear', 'power1.inOut', 'power2.out', 'power2.inOut']
  let easeIndex = 0

  const animateButtons = document.querySelectorAll('.animate-button')
  const currentValues = document.querySelectorAll('.is--current')
  const balls = document.querySelectorAll('.slider-ball')
  const lines = document.querySelectorAll('.slider-line')
  const easeCheckBoxes = document.querySelectorAll('.selector-box-ease')
  const textureCheckBoxes = document.querySelectorAll('.selector-box-texture')
  const modeCheckBoxes = document.querySelectorAll('.selector-box-mode')
  const textureImages = document.querySelectorAll('.texture-img')

  let isDragging = false
  let sliderIndex = 0

  // slider interaction
  const updateSlider = (clientX) => {
    const rect = lines[0].getBoundingClientRect()

    // let value = 0

    // position inside the line (0 → width)
    let x = clientX - rect.left

    // clamp
    x = Math.max(0, Math.min(x, rect.width - 8))
    // console.log(x)

    // move ball
    balls[sliderIndex].style.left = `${x}px`

    if (sliderIndex == 0) {
      // amplitude
      const min = 0.1
      const max = 2
      let amplitude = gsap.utils
        .mapRange(0, rect.width - 8, min, max, x)
        .toFixed(2)
      currentValues[0].textContent = `current: ${amplitude}`
      uniforms.amplitude = amplitude
    } else if (sliderIndex == 1) {
      const min = 1
      const max = 12
      let freq = gsap.utils.mapRange(0, rect.width - 8, min, max, x).toFixed(2)
      currentValues[1].textContent = `current: ${freq}`
      uniforms.frequency = freq
      // frequency
    } else if (sliderIndex == 2) {
      const min = 20
      const max = 800
      let blocks = gsap.utils
        .mapRange(0, rect.width - 8, min, max, x)
        .toFixed(2)
      currentValues[2].textContent = `current: ${blocks}`
      uniforms.blocks = blocks
    } else if (sliderIndex == 3) {
      const min = 0.8
      const max = 2.4
      let duration = gsap.utils
        .mapRange(0, rect.width - 8, min, max, x)
        .toFixed(2)
      currentValues[3].textContent = `current: ${duration} s`
      dur = duration
    }

    // // normalize (0 → 1)
    // const value = x / rect.width

    // // update uniform
    // uniforms[uniformName] = value
  }

  // slider initial positions
  function setSlider(ball, value, min = 0, max = 1) {
    const rect = ball.parentElement.getBoundingClientRect()
    const ballWidth = ball.offsetWidth
    const usableWidth = rect.width - ballWidth

    const normalized = (value - min) / (max - min)
    const x = normalized * usableWidth

    ball.style.left = `${x}px`
  }
  setSlider(balls[0], uniforms.amplitude, 0.1, 2)
  setSlider(balls[1], uniforms.frequency, 1, 12)
  setSlider(balls[2], uniforms.blocks, 20, 800)
  setSlider(balls[3], dur, 0.8, 2.4)

  // mouse events
  balls.forEach((ball, index) => {
    ball.addEventListener('mousedown', () => {
      isDragging = true
      sliderIndex = index
    })
  })

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    updateSlider(e.clientX)
  })

  window.addEventListener('mouseup', () => {
    isDragging = false
  })

  // checkboxes
  easeCheckBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      gsap.to(easeCheckBoxes, {
        backgroundColor: '#ffffff00',
        duration: 0.2,
      })
      gsap.to(easeCheckBoxes[index], {
        backgroundColor: '#ece7d8',
        duration: 0.2,
      })
      easeIndex = index
    })
  })
  textureCheckBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      gsap.to(textureCheckBoxes, {
        backgroundColor: '#ffffff00',
        duration: 0.2,
      })
      gsap.to(textureCheckBoxes[index], {
        backgroundColor: '#ece7d8',
        duration: 0.2,
      })
      gsap.to(textureImages, {
        opacity: 0,
        duration: 0.2,
      })
      gsap.to(textureImages[index], {
        opacity: 1,
        duration: 0.2,
      })
      uniforms.textureIndex = index
      console.log(index)
    })
  })
  modeCheckBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      gsap.to(modeCheckBoxes, {
        backgroundColor: '#ffffff00',
        duration: 0.2,
      })
      gsap.to(modeCheckBoxes[index], {
        backgroundColor: '#ece7d8',
        duration: 0.2,
      })

      swipePlanes(index)
      if (index == 0) {
        isInteractiveSelected = true
      } else {
        isInteractiveSelected = false
      }
    })
  })

  // TOGGLE OFFSET CHANGE!
  let isToggled = false
  function toggleText() {
    if (!isToggled) {
      gsap.to(uniforms, {
        offset: 1.0,
        scale: 1.02,
        duration: dur,
        ease: easings[easeIndex],
      })
    } else {
      gsap.to(uniforms, {
        offset: 0.0,
        scale: 1,
        duration: dur,
        ease: easings[easeIndex],
      })
    }
    isToggled = !isToggled
  }

  // LIFECYCLE
  function startLifecycle() {
    const tl = gsap.timeline()
    const duration = 2.4
    const delay = 2.8
    tl.to(offsets, {
      offset: 1.0,
      scale: 1.02,
      duration: duration,
      ease: 'power1.out',
    })
      .to(offsets, {
        m1: 1.0,
        duration: 0.0,
      })
      .to(
        offsets,
        {
          offset: 0.0,
          scale: 1.0,
          duration: duration,
          ease: 'power1.in',
        },
        `+=${delay / 2}`
      )
      .to(
        offsets,
        {
          offset: 1.0,
          scale: 1.02,
          duration: duration,
          ease: 'power1.out',
        },
        `+=${delay}`
      )
      .to(offsets, {
        m2: 1.0,
        duration: 0,
      })
      .to(
        offsets,
        {
          offset: 0.0,
          scale: 1.0,
          duration: duration,
          ease: 'power1.in',
        },
        `+=${delay / 2}`
      )
      .to(
        offsets,
        {
          offset: 1.0,
          scale: 1.02,
          duration: duration,
          ease: 'power1.out',
        },
        `+=${delay}`
      )
      .to(offsets, {
        m3: 1.0,
        duration: 0,
      })
      .to(
        offsets,
        {
          offset: 0.0,
          scale: 1.0,
          duration: duration,
          ease: 'power1.in',
        },
        `+=${delay / 2}`
      )
  }

  // SWIPE PLANES
  function swipePlanes(toSwipe) {
    if (toSwipe == 1) {
      gsap.to(uniforms, {
        ciao: 0.0,
        duration: 1.2,
        ease: 'linear',
      })
      gsap.to(offsets, {
        ciao: 1.0,
        duration: 1.2,
        ease: 'linear',
      })
    } else {
      gsap.to(offsets, {
        ciao: 0.0,
        duration: 1.2,
        ease: 'linear',
      })
      gsap.to(uniforms, {
        ciao: 1.0,
        duration: 1.2,
        ease: 'linear',
      })
    }
  }

  // REVEAL
  window.addEventListener('click', () => {
    gsap.to(offsets, {
      reveal: 1.0,
      duration: 2.4,
      ease: 'linear',
    })
  })

  animateButtons.forEach((b) => {
    b.addEventListener('mouseover', () => {
      gsap.to(b, {
        borderRadius: 8,
        duration: 0.16,
        ease: 'none',
      })
    })
    b.addEventListener('mouseleave', () => {
      gsap.to(b, {
        borderRadius: 12,
        duration: 0.16,
        ease: 'none',
      })
    })
    b.addEventListener('click', () => {
      if (isInteractiveSelected) {
        toggleText()
      } else {
        startLifecycle()
      }
    })
  })
}

export default miraUITest
export { uniforms, offsets }
