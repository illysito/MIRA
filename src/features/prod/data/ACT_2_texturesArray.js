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
  bridge_1_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_0.jpg'
  ),
  bridge_1_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_1.jpg'
  ),
  bridge_1_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_2.jpg'
  ),
  bridge_1_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_3.jpg'
  ),
  bridge_1_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_4.jpg'
  ),
  bridge_1_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_5.jpg'
  ),
  bridge_1_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_6.jpg'
  ),
  sak_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_init.jpg'
  ),
  sak_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_0.jpg'
  ),
  sak_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/4f1ca9a1e271335fbbb694c19d544d848a278676/SAK_1_corrected.jpg'
  ),
  sak_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_2.jpg'
  ),
  sak_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_3.jpg'
  ),
  sak_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_4.jpg'
  ),
  sak_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_5.jpg'
  ),
  sak_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_6.jpg'
  ),
  sak_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_sak/SAK_7.jpg'
  ),
  voi_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_1.jpg'
  ),
  voi_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_2.jpg'
  ),
  voi_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_3.jpg'
  ),
  voi_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_4.jpg'
  ),
  voi_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_5.jpg'
  ),
  voi_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_6.jpg'
  ),
  voi_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_7.jpg'
  ),
  voi_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_8.jpg'
  ),
  voi_9: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_9.jpg'
  ),
  voi_10: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_10.jpg'
  ),
  voi_11: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_11.jpg'
  ),
  voi_12: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_12.jpg'
  ),
  voi_13: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_13.jpg'
  ),
  voi_14: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_14.jpg'
  ),
  voi_15: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_voi/VOI_15.jpg'
  ),
  pe_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_0.jpg'
  ),
  pe_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_1.jpg'
  ),
  pe_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_2.jpg'
  ),
  pe_4: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_3.jpg'
  ),
  pe_5: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_4.jpg'
  ),
  pe_6: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_5.jpg'
  ),
  pe_7: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_6.jpg'
  ),
  pe_8: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/1fc368f4689ae73dad6376b7c743b5e7aee5d9d7/textures/_docs/_pe/PE_7.jpg'
  ),
  bridge_2_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/97b31197a141158e9db020ecd3bd064ade8623db/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_2_0.jpg'
  ),
  bridge_2_2: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/97b31197a141158e9db020ecd3bd064ade8623db/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_2_1.jpg'
  ),
  bridge_2_3: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/97b31197a141158e9db020ecd3bd064ade8623db/textures/_bridges/_bridges%20ACT%20II/bridge_ACT_II_2_2.jpg'
  ),
  menu_1: githubToJsDelivr(
    'https://github.com/illysito/MIRA/blob/97b31197a141158e9db020ecd3bd064ade8623db/textures/_bridges/_bridges%20ACT%20II/MENU_ACT_II_0.jpg'
  ),
}

export default { URLS_INIT, URLS }
