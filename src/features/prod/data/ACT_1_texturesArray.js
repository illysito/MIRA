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
    'https://github.com/illysito/MIRA/blob/388ef87c19362dedfd4b711099132719b5fe4ece/textures/_other/MENUS%20INIT%20JULY_1.jpg'
  ),
  core_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_5.jpg'
  ),
  core_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_0.jpg'
  ),
  core_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_1.jpg'
  ),
  core_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/649ed4dcd288e3a218ccbf158035cfce0f3fbcaf/textures/_docs/_core%20july/_core_fixed.jpg'
  ),
  core_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_3.jpg'
  ),
  core_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_4.jpg'
  ),
  core_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_6.jpg'
  ),
  core_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_7.jpg'
  ),
  core_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_8.jpg'
  ),
  core_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_core%20july/_core_9.jpg'
  ),
  seed_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_0.jpg'
  ),
  seed_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_1.jpg'
  ),
  seed_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_2.jpg'
  ),
  seed_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_3.jpg'
  ),
  seed_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_4.jpg'
  ),
  seed_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_5.jpg'
  ),
  seed_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_seed%20july/_seed_6.jpg'
  ),
  organism_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_0.jpg'
  ),
  organism_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_1.jpg'
  ),
  organism_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_2.jpg'
  ),
  organism_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_3.jpg'
  ),
  organism_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_4.jpg'
  ),
  organism_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_5.jpg'
  ),
  organism_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_6.jpg'
  ),
  organism_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_7.jpg'
  ),
  organism_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_organism%20july/_organism_8.jpg'
  ),
  bridge_2_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%202%20july/_bridge_2_1.jpg'
  ),
  bridge_2_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1635f19dc817bd83c5f32104f258924461e2d715/textures/_bridges/_bridge%202%20july/_bridge_2_2_fixed.jpg'
  ),
  bridge_2_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%202%20july/_bridge_2_3.jpg'
  ),
  menu_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/388ef87c19362dedfd4b711099132719b5fe4ece/textures/_other/MENUS%20INIT%20JULY_2.jpg'
  ),
  habitat_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_0.jpg'
  ),
  habitat_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_1.jpg'
  ),
  habitat_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_2.jpg'
  ),
  habitat_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_3.jpg'
  ),
  habitat_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_4.jpg'
  ),
  habitat_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_5.jpg'
  ),
  habitat_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_6.jpg'
  ),
  habitat_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_7.jpg'
  ),
  habitat_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_8.jpg'
  ),
  habitat_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_9.jpg'
  ),
  habitat_11: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_10.jpg'
  ),
  habitat_12: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_11.jpg'
  ),
  habitat_13: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_12.jpg'
  ),
  habitat_14: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_13.jpg'
  ),
  habitat_15: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_14.jpg'
  ),
  habitat_16: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_15.jpg'
  ),
  habitat_17: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_16.jpg'
  ),
  habitat_18: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_17.jpg'
  ),
  habitat_19: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_18.jpg'
  ),
  habitat_20: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_19.jpg'
  ),
  habitat_21: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_20.jpg'
  ),
  habitat_22: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_21.jpg'
  ),
  habitat_23: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_habitat%20july/__habitat_22.jpg'
  ),
  communication_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_1.jpg'
  ),
  communication_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_2.jpg'
  ),
  communication_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_3.jpg'
  ),
  communication_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_4.jpg'
  ),
  communication_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_5.jpg'
  ),
  communication_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_6.jpg'
  ),
  communication_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_7.jpg'
  ),
  communication_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_8.jpg'
  ),
  communication_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_9.jpg'
  ),
  communication_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_communication%20july/__com_10.jpg'
  ),
  stratosphere_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_0.jpg'
  ),
  stratosphere_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_1.jpg'
  ),
  stratosphere_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_2.jpg'
  ),
  stratosphere_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_3.jpg'
  ),
  stratosphere_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_4.jpg'
  ),
  stratosphere_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_5.jpg'
  ),
  stratosphere_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_6.jpg'
  ),
  stratosphere_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_7.jpg'
  ),
  stratosphere_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_8.jpg'
  ),
  stratosphere_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_9.jpg'
  ),
  stratosphere_11: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_docs/_stratosphere%20july/__strat_10.jpg'
  ),
  bridge_3_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%203%20july/bridge_3_0.jpg'
  ),
  bridge_3_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%203%20july/bridge_3_1.jpg'
  ),
  bridge_3_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/82c6f0a5c6c3b50e99a9071f55c5db12758426d7/textures/_bridges/_bridge%203%20july/bridge_3_2_fixed.jpg'
  ),
  bridge_3_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%203%20july/bridge_3_3.jpg'
  ),
  bridge_3_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%203%20july/bridge_3_4.jpg'
  ),
  bridge_3_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/3adce1b8aa9ee5c7d107b1112f8e2695bfa74193/textures/_bridges/_bridge%203%20july/bridge_3_5.jpg'
  ),
  menu_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/f9c5b1a08e39ba79398dd2aaf31e6330b072b6e2/textures/_other/Menu%203.jpg'
  ),
  input_bridge_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/395164fdb255b8bdf513003079a91c0ed0c42076/textures/_bridges/_input%20bridge%20july/_input_bridge_fixed_1.jpg'
  ),
  input_bridge_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/395164fdb255b8bdf513003079a91c0ed0c42076/textures/_bridges/_input%20bridge%20july/_input_bridge_fixed_2.jpg'
  ),
  thankyou_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/9b061690ce1c7c613b610da42571991b7abb6f04/textures/_other/thankYou-1.jpg'
  ),
  reflection: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/568b3c12723b9c722422ce61f06a1132f2e2f27d/textures/_other/Reflection.jpg'
  ),
}

export default { URLS_INIT, URLS }
