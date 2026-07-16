import gsap from 'gsap'

const inputContainer = document.querySelector('.email-input-container')
const reflectionContainer = document.querySelector(
  '.reflection-input-container'
)
const reflectionInput = document.querySelector('#reflection-input')
const emailInput = document.querySelector('#email-input')

inputContainer.style.bottom = `${(window.innerHeight - 600) / 2 + 48}px`
reflectionContainer.style.top = `${(window.innerHeight - 600) / 2 + 320}px`

gsap.set([inputContainer, reflectionContainer], {
  opacity: 0,
  zIndex: -300,
  pointerEvents: 'none',
})

function input() {
  window.addEventListener('activateEmailInput', () => {
    emailInput.focus()
    gsap.to(inputContainer, {
      delay: 1.6,
      opacity: 1,
      zIndex: 100,
      pointerEvents: 'auto',
      duration: 2.8,
    })
  })
  window.addEventListener('deactivateEmailInput', () => {
    gsap.to(inputContainer, {
      // delay: 1.6,
      opacity: 0,
      zIndex: -300,
      pointerEvents: 'auto',
      duration: 2.8,
    })
  })
  window.addEventListener('activateReflectionInput', () => {
    reflectionInput.focus()
    gsap.to(reflectionContainer, {
      delay: 4.4,
      opacity: 1,
      zIndex: 100,
      pointerEvents: 'auto',
      duration: 2.8,
    })
  })
  window.addEventListener('deactivateReflectionInput', () => {
    gsap.to(reflectionContainer, {
      // delay: 1.6,
      opacity: 0,
      zIndex: -300,
      pointerEvents: 'auto',
      duration: 2.8,
    })
  })
}

export default input
