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
  line: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/ed2a76bf775a4c90ac703847045f9f3e9a594140/textures/_other/Line.png'
  ),
}

const URLS = {
  none: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/c2cf6c0976d87111f4dd6aec7bd2cabcbad66e90/textures/MIRA_NONE.jpg'
  ),
  bridge_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/485a2fa3fd98bb21d4abe896165a365797837ec1/textures/_bridges/_bridge%201%20(miraOS)/Bridge%201%20(miraOS).png'
  ),
  menu_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_other/Menu%201.png'
  ),
  core_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_docs/_core/Core_0.png'
  ),
  core_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_docs/_core/Core_1.png'
  ),
  core_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_docs/_core/Core_2.png'
  ),
  core_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_docs/_core/Core_3.png'
  ),
  core_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_docs/_core/Core_4.png'
  ),
  core_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1973bee21a993473b1549d53d58e4c66dd861cf6/textures/_docs/_core/Core_5.png'
  ),
  seed_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_seed/Seed_0.png'
  ),
  seed_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_seed/Seed_1.png'
  ),
  seed_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_seed/Seed_2.png'
  ),
  seed_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_seed/Seed_3.png'
  ),
  seed_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_seed/Seed_4.png'
  ),
  organism_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_organism/Organism_0.png'
  ),
  organism_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_organism/Organism_1.png'
  ),
  organism_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_organism/Organism_2.png'
  ),
  organism_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_organism/Organism_3.png'
  ),
  organism_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_docs/_organism/Organism_4.png'
  ),
  bridge_2_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_bridges/_bridge%202%20(neuroscience)/Bridge%202%20(neuroscience)%201.png'
  ),
  bridge_2_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_bridges/_bridge%202%20(neuroscience)/Bridge%202%20(neuroscience)%202.png'
  ),
  bridge_2_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/d9546506c2aef6f8381b10e974fe3df0282784d5/textures/_bridges/_bridge%202%20(neuroscience)/Bridge%202%20(neuroscience)%203.png'
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
