// PARAMETERS FOR SHADERS
const shaderFadeOutDur_1 = 2.8
// const shaderFadeInDur_1 = 2.8
// const shaderVoidDelay_1 = 1

// PARAMETERS FOR BRIDGES
// const bridgeFadeDur_1 = 2.8
const bridgeVoidDelay_1 = 2.8
const bridgeHoldDelay_1 = 3.2
const bridgeStagger_1 = 0.48

// PARAMETERS FOR MENUS
const menuFadeOutDur_1 = 2.8
const menuFadeInDur_1 = 2.8
const menuStagger_1 = 0.48

// LINE OPACITIES
// const lineOpacityDim = 0.6
const lineOpacityLit = 0.72
const lineDuration = 2.8
const STEPS = [
  // INNER CIRCLE
  {
    type: 'menu',
    id: 'step-0',
    currentTexture: 'inner_circle_big',
    // currentTexture: 'none',
    fadeOutDuration: shaderFadeOutDur_1,
    fadeInDuration: 3.2, // Initial fade in of inner circle!
    voidDelay: 2.8,
    easeIn: 'power1.inOut',
    easeOut: 'power1.inOut',
    needsLine: false,
    lineOpacity: 0,
  },
  // VOID
  {
    type: 'bridge',
    bridgeIndex: 0,
    id: 'step-1',
    currentTexture: 'none',
    fadeDuration: 0.4,
    voidDelay: 0.4,
    holdDelay: 1,
    staggerIn: 0,
    staggerOut: 0,
    easeIn: 'power1.inOut',
    easeOut: 'power1.inOut',
    needsLine: false,
    shouldRetainLine: false,
    lineOpacity: lineOpacityLit,
    lineDuration: lineDuration,
  },
  // QUESTION
  {
    type: 'bridge',
    bridgeIndex: 1,
    id: 'step-2',
    currentTexture: 'app_1',
    fadeDuration: shaderFadeOutDur_1,
    voidDelay: bridgeVoidDelay_1 * 1.4,
    holdDelay: bridgeHoldDelay_1,
    staggerIn: bridgeStagger_1,
    staggerOut: 0,
    easeIn: 'power1.inOut',
    easeOut: 'power1.inOut',
    needsLine: false,
    shouldRetainLine: false,
    lineOpacity: lineOpacityLit,
    lineDuration: lineDuration,
  },
  // FIRST MENU & CIAO
  {
    type: 'menu',
    menuIndex: 0,
    id: 'step-3',
    currentTexture: 'app_2',
    fadeOutDuration: menuFadeOutDur_1,
    fadeInDuration: menuFadeInDur_1,
    staggerDuration: menuStagger_1,
    voidDelay: 0.8,
    easeIn: 'power1.inOut',
    easeOut: 'power1.inOut',
    needsToGoDown: true,
  },
  {
    type: 'bridge',
    bridgeIndex: 2,
    id: 'step-4',
    currentTexture: 'app_3',
    fadeDuration: shaderFadeOutDur_1,
    voidDelay: bridgeVoidDelay_1 * 1.4,
    holdDelay: bridgeHoldDelay_1,
    staggerIn: bridgeStagger_1,
    staggerOut: 0,
    easeIn: 'power1.inOut',
    easeOut: 'power1.inOut',
    needsLine: false,
    shouldRetainLine: false,
    lineOpacity: lineOpacityLit,
    lineDuration: lineDuration,
  },
  // INNER CIRCLE
  {
    type: 'menu',
    id: 'step-5',
    currentTexture: 'inner_circle',
    // currentTexture: 'none',
    fadeOutDuration: shaderFadeOutDur_1,
    fadeInDuration: 3.2, // Initial fade in of inner circle!
    voidDelay: 2.8,
    easeIn: 'power1.inOut',
    easeOut: 'power1.inOut',
    needsLine: false,
    lineOpacity: 0,
  },
]

export default STEPS
