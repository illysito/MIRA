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
    'https://github.com/illysito/MIRA/blob/c2cf6c0976d87111f4dd6aec7bd2cabcbad66e90/textures/MIRA_NONE.jpg'
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
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_SEED/MIRA_SEED%200.jpg'
  ),
  seed_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_SEED/MIRA_SEED%201.jpg'
  ),
  seed_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_SEED/MIRA_SEED%202.jpg'
  ),
  seed_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_SEED/MIRA_SEED%203.jpg'
  ),
  seed_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_SEED/MIRA_SEED%204.jpg'
  ),
  seed_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_SEED/MIRA_SEED%205.jpg'
  ),
  organism_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_ORGANISM/MIRA_ORGANISM%200.jpg'
  ),
  organism_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_ORGANISM/MIRA_ORGANISM%201.jpg'
  ),
  organism_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_ORGANISM/MIRA_ORGANISM%202.jpg'
  ),
  organism_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_ORGANISM/MIRA_ORGANISM%203.jpg'
  ),
  organism_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/67b5db9e6e5212deb128f40e03324027fb5fb85d/textures/_ORGANISM/MIRA_ORGANISM%204.jpg'
  ),
  conditions_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1f2d7790200cb29f4981b36a5fe0e2e5f9bf5830/textures/_CONDITIONS/MIRA_CONDITIONS%200.jpg'
  ),
  conditions_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1f2d7790200cb29f4981b36a5fe0e2e5f9bf5830/textures/_CONDITIONS/MIRA_CONDITIONS%201.jpg'
  ),
  conditions_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1f2d7790200cb29f4981b36a5fe0e2e5f9bf5830/textures/_CONDITIONS/MIRA_CONDITIONS%202.jpg'
  ),
  conditions_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1f2d7790200cb29f4981b36a5fe0e2e5f9bf5830/textures/_CONDITIONS/MIRA_CONDITIONS%203.jpg'
  ),
  conditions_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1f2d7790200cb29f4981b36a5fe0e2e5f9bf5830/textures/_CONDITIONS/MIRA_CONDITIONS%204.jpg'
  ),
  conditions_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1f2d7790200cb29f4981b36a5fe0e2e5f9bf5830/textures/_CONDITIONS/MIRA_CONDITIONS%205.jpg'
  ),
  communication_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/0293f6a6ee96a6f32f0026f98889ee1630aa3b55/textures/_COMMUNICATION/MIRA_COMMUNIC%200.jpg'
  ),
  communication_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/0293f6a6ee96a6f32f0026f98889ee1630aa3b55/textures/_COMMUNICATION/MIRA_COMMUNIC%201.jpg'
  ),
  communication_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/0293f6a6ee96a6f32f0026f98889ee1630aa3b55/textures/_COMMUNICATION/MIRA_COMMUNIC%202.jpg'
  ),
  communication_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/0293f6a6ee96a6f32f0026f98889ee1630aa3b55/textures/_COMMUNICATION/MIRA_COMMUNIC%203.jpg'
  ),
  communication_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/0293f6a6ee96a6f32f0026f98889ee1630aa3b55/textures/_COMMUNICATION/MIRA_COMMUNIC%204.jpg'
  ),
  habitat_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/70a6df0d9e6990f69098670f2a4dc7cf80fd7c76/textures/_HABITAT/MIRA_HABITAT%200.jpg'
  ),
  habitat_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/70a6df0d9e6990f69098670f2a4dc7cf80fd7c76/textures/_HABITAT/MIRA_HABITAT%201.jpg'
  ),
  habitat_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/70a6df0d9e6990f69098670f2a4dc7cf80fd7c76/textures/_HABITAT/MIRA_HABITAT%202.jpg'
  ),
  habitat_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/70a6df0d9e6990f69098670f2a4dc7cf80fd7c76/textures/_HABITAT/MIRA_HABITAT%203.jpg'
  ),
  habitat_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/75a0a84af9a79f54b3ec9d19656b1927fc7cbc01/textures/_HABITAT/MIRA_HABITAT%204.jpg'
  ),
  stratosphere_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%200.jpg'
  ),
  stratosphere_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%201.jpg'
  ),
  stratosphere_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%202.jpg'
  ),
  stratosphere_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%203.jpg'
  ),
  stratosphere_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%204.jpg'
  ),
  stratosphere_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%205.jpg'
  ),
  stratosphere_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%206.jpg'
  ),
  stratosphere_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%207.jpg'
  ),
  stratosphere_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%208.jpg'
  ),
  stratosphere_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%209.jpg'
  ),
  stratosphere_11: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/b7216904cb749cc7fb59f5b29774ae1be4a20106/textures/_STRATOSPHERE/MIRA_STRAT%2010.jpg'
  ),
  alignment_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%200.jpg'
  ),
  alignment_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%201.jpg'
  ),
  alignment_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%202.jpg'
  ),
  alignment_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%203.jpg'
  ),
  alignment_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%204.jpg'
  ),
  alignment_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%205.jpg'
  ),
  alignment_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/fa04ef27586b6ecef3677b377bf7a776d5c2d684/textures/_ALIGNMENT/MIRA_ALIGNMENT%205%20copia.jpg'
  ),
}

export default { URLS_INIT, URLS }
