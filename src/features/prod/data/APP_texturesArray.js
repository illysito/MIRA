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
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_other/InnerCirclehd.png'
  ),
  inner_circle_big: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/328abc7bee4ab9e74491ccd3073ab1e1dd9aa208/textures/_other/InnerCircle%20BIG.jpg'
  ),
  line: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/ed2a76bf775a4c90ac703847045f9f3e9a594140/textures/_other/Line.png'
  ),
}

const URLS = {
  none: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/c2cf6c0976d87111f4dd6aec7bd2cabcbad66e90/textures/MIRA_NONE.jpg'
  ),
  app_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f501d881072723e712327df4a500eeab3d45eed9/textures/_docs/_app/app_0.jpg'
  ),
  app_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f501d881072723e712327df4a500eeab3d45eed9/textures/_docs/_app/app_1.jpg'
  ),
  app_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f501d881072723e712327df4a500eeab3d45eed9/textures/_docs/_app/app_2.jpg'
  ),
  app_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f501d881072723e712327df4a500eeab3d45eed9/textures/_docs/_app/app_3.jpg'
  ),
  app_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f501d881072723e712327df4a500eeab3d45eed9/textures/_docs/_app/app_4.jpg'
  ),
}

export default { URLS_INIT, URLS }
