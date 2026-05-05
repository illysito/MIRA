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
  none: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/c2cf6c0976d87111f4dd6aec7bd2cabcbad66e90/textures/MIRA_OpacityTestTexture.jpg'
  ),
  core_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/646dfd43e06aca666a1b7b4cbac6fac98ce16c25/textures/_CORE/MIRA_CORE_01.jpg'
  ),
  core_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3aeac1306954848cd2013a8b48c2f2671683950f/textures/_CORE/MIRA_CORE_02.jpg'
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
  seed_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a56e9b066c92654c57bfdaba4582562b26c03796/textures/_SEED/MIRA_SEED_SEED%200.jpg'
  ),
  seed_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a56e9b066c92654c57bfdaba4582562b26c03796/textures/_SEED/MIRA_SEED_SEED%201.jpg'
  ),
  seed_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a56e9b066c92654c57bfdaba4582562b26c03796/textures/_SEED/MIRA_SEED_SEED%202.jpg'
  ),
  seed_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a56e9b066c92654c57bfdaba4582562b26c03796/textures/_SEED/MIRA_SEED_SEED%203.jpg'
  ),
  seed_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a56e9b066c92654c57bfdaba4582562b26c03796/textures/_SEED/MIRA_SEED_SEED%204.jpg'
  ),
  seed_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a56e9b066c92654c57bfdaba4582562b26c03796/textures/_SEED/MIRA_SEED_SEED%205.jpg'
  ),
  organism_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a93729140ef9acbfc833788d86a60c8d19814892/textures/_ORGANISM/MIRA_ORGANISM_ORGANISM%200.jpg'
  ),
  organism_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a93729140ef9acbfc833788d86a60c8d19814892/textures/_ORGANISM/MIRA_ORGANISM_ORGANISM%201.jpg'
  ),
  organism_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a93729140ef9acbfc833788d86a60c8d19814892/textures/_ORGANISM/MIRA_ORGANISM_ORGANISM%202.jpg'
  ),
  organism_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a93729140ef9acbfc833788d86a60c8d19814892/textures/_ORGANISM/MIRA_ORGANISM_ORGANISM%203.jpg'
  ),
  organism_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a93729140ef9acbfc833788d86a60c8d19814892/textures/_ORGANISM/MIRA_ORGANISM_ORGANISM%204.jpg'
  ),
  organism_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/a93729140ef9acbfc833788d86a60c8d19814892/textures/_ORGANISM/MIRA_ORGANISM_ORGANISM%205.jpg'
  ),
}

export default { URLS_INIT, URLS }
