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
  menu_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_other/Menu%202.png'
  ),
  habitat_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_0.png'
  ),
  habitat_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_1.png'
  ),
  habitat_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_2.png'
  ),
  habitat_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_3.png'
  ),
  habitat_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_4.png'
  ),
  habitat_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_5.png'
  ),
  habitat_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_6.png'
  ),
  habitat_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_habitat/Habitat_7.png'
  ),
  communication_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_0.png'
  ),
  communication_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_1.png'
  ),
  communication_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_2.png'
  ),
  communication_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_3.png'
  ),
  communication_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_4.png'
  ),
  communication_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_5.png'
  ),
  communication_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_6.png'
  ),
  communication_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_7.png'
  ),
  communication_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_8.png'
  ),
  communication_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_communication/Communication_9.png'
  ),
  stratosphere_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_0.png'
  ),
  stratosphere_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_1.png'
  ),
  stratosphere_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_2.png'
  ),
  stratosphere_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_3.png'
  ),
  stratosphere_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_4.png'
  ),
  stratosphere_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_5.png'
  ),
  stratosphere_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_6.png'
  ),
  stratosphere_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_7.png'
  ),
  stratosphere_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_8.png'
  ),
  stratosphere_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_9.png'
  ),
  stratosphere_11: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_10.png'
  ),
  stratosphere_12: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_11.png'
  ),
  stratosphere_13: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_12.png'
  ),
  stratosphere_14: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_stratosphere/Stratosphere_13.png'
  ),
  motion_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_motion/Motion_0.png'
  ),
  motion_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_motion/Motion_1.png'
  ),
  motion_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_motion/Motion_2.png'
  ),
  motion_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_motion/Motion_3.png'
  ),
  motion_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_motion/Motion_4.png'
  ),
  motion_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/084e58073df3344f88ed431a068ef54c55603009/textures/_docs/_motion/Motion_5.png'
  ),
  bridge_3_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f1c1373d1d442376fa3d0c533bfd309addb784ab/textures/_bridges/_bridge%203%20(into%20alignment)/Bridge%203%20(into%20alignment)%200.png'
  ),
  bridge_3_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f1c1373d1d442376fa3d0c533bfd309addb784ab/textures/_bridges/_bridge%203%20(into%20alignment)/Bridge%203%20(into%20alignment)%201.png'
  ),
  bridge_3_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f1c1373d1d442376fa3d0c533bfd309addb784ab/textures/_bridges/_bridge%203%20(into%20alignment)/Bridge%203%20(into%20alignment)%202.png'
  ),
  bridge_3_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f1c1373d1d442376fa3d0c533bfd309addb784ab/textures/_bridges/_bridge%203%20(into%20alignment)/Bridge%203%20(into%20alignment)%203.png'
  ),
  bridge_3_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f1c1373d1d442376fa3d0c533bfd309addb784ab/textures/_bridges/_bridge%203%20(into%20alignment)/Bridge%203%20(into%20alignment)%204.png'
  ),
  bridge_3_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f1c1373d1d442376fa3d0c533bfd309addb784ab/textures/_bridges/_bridge%203%20(into%20alignment)/Bridge%203%20(into%20alignment)5.png'
  ),
  menu_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Menu%203.jpg'
  ),
  alignment_100: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Reaction%201.png'
  ),
  alignment_80: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Reaction%202.png'
  ),
  alignment_60: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Reaction%203.png'
  ),
  alignment_20: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Reaction%204.png'
  ),
  alignment_0: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Reaction%205.png'
  ),
  xxxiii_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_5.png'
  ),
  xxxiii_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_9.png'
  ),
  xxxiii_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_0.png'
  ),
  xxxiii_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_3.png'
  ),
  xxxiii_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_7.png'
  ),
  xxxiii_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_10.png'
  ),
  xxxiii_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_1.png'
  ),
  xxxiii_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_4.png'
  ),
  xxxiii_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_8.png'
  ),
  xxxiii_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_11.png'
  ),
  xxxiii_11: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_bridges/_bridge%207%20(XXXIII)/Bridge%20(finale)_2.png'
  ),
  thankyou_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/9b061690ce1c7c613b610da42571991b7abb6f04/textures/_other/thankYou-1.jpg'
  ),
  reflection: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/568b3c12723b9c722422ce61f06a1132f2e2f27d/textures/_other/Reflection.jpg'
  ),
}

export default { URLS_INIT, URLS }
