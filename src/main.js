import './styles/style.css'

import miraWorld from './features/prod/world/miraWorld'

console.log('This is t u r n')

let textures

//#region ACT 1
async function runActI() {
  const { default: TEXTURES_ACT_1 } = await import(
    './features/prod/data/ACT_1_texturesArray'
  )
  textures = TEXTURES_ACT_1

  const {
    default: act1_UI,
    UNIFORMS_TEXTURE,
    UNIFORMS_BACKGROUND,
  } = await import('./features/prod/world/ACT_1_UI')

  const { default: input } = await import('./features/prod/functions/input')

  await miraWorld(textures, UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND)
  act1_UI()
  input()
}
//#endregion

//#region APP
async function runApp() {
  const { default: TEXTURES_APP } = await import(
    './features/prod/data/APP_texturesArray'
  )
  textures = TEXTURES_APP

  const {
    default: appFlow_UI,
    UNIFORMS_TEXTURE,
    UNIFORMS_BACKGROUND,
  } = await import('./features/prod/world/APP_Flow_UI')

  await miraWorld(textures, UNIFORMS_TEXTURE, UNIFORMS_BACKGROUND)
  appFlow_UI()
}
//#endregion

const body = document.body
if (body.classList.contains('body__home')) {
  console.log('running ACT I')
  runActI()
}
if (body.classList.contains('body__app')) {
  console.log('running App Mockup')
  runApp()
}

// miraWorld(textures)
