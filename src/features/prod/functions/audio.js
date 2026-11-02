import gsap from 'gsap'

function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

function audio() {
  let volumeMultiplier = 1

  let windowHasBeenClicked = false
  const ambient = new Audio(
    githubToJsDelivr(
      'https://github.com/illysito/MIRA/blob/3c599023c8e103348fb0cc9d2b5b4c519f1d9b87/audio/AmbientAudioCompressed.ogg'
    )
  )

  ambient.loop = true
  ambient.volume = 1

  if (ambient) {
    window.addEventListener('click', () => {
      if (!windowHasBeenClicked) {
        gsap.to(ambient, {
          volume: 1 * volumeMultiplier,
          duration: 0.8,
        })
        // localStorage.setItem('audioAccepted', 'true')
        ambient.play()
        console.log('audio played')
      }
      windowHasBeenClicked = true
    })
  }
}

export default audio
