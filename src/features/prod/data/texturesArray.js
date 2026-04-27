function githubToJsDelivr(permalink) {
  return permalink
    .replace('github.com', 'cdn.jsdelivr.net/gh')
    .replace('/blob/', '@')
}

const URLS_INIT = {
  perlin: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/e00fcd76641ba16a48522cd0704e81bc3b692b72/textures/miraPerlin.png'
  ),
  bg: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/e447280e52403f971e69249c087d8b6143102bc0/textures/miraBackground.png'
  ),
  inner_circle: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/ea439eb6e9981195b6b5f8c9a3c6af53e2119931/textures/miraCircle.png'
  ),
}

const URLS = {
  core_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/646dfd43e06aca666a1b7b4cbac6fac98ce16c25/textures/_CORE/MIRA_CORE_01.jpg'
  ),
  core_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/646dfd43e06aca666a1b7b4cbac6fac98ce16c25/textures/_CORE/MIRA_CORE_02.jpg'
  ),
  core_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/646dfd43e06aca666a1b7b4cbac6fac98ce16c25/textures/_CORE/MIRA_CORE_03.jpg'
  ),
  core_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/646dfd43e06aca666a1b7b4cbac6fac98ce16c25/textures/_CORE/MIRA_CORE_04.jpg'
  ),
  core_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/646dfd43e06aca666a1b7b4cbac6fac98ce16c25/textures/_CORE/MIRA_CORE_05.jpg'
  ),
}

export default { URLS_INIT, URLS }
