const STEPS = [
  // STAGE 1 ************************
  {
    type: 'normal',
    id: 'step-0',
    currentTexture: 'inner_circle',
  },
  // STAGE 2 ************************
  {
    type: 'bridge',
    bridgeIndex: 0,
    id: 'step-1',
    currentTexture: 'none',
  },
  // FIRST MENU ( CORE )
  {
    type: 'menu',
    menuIndex: 0,
    id: 'step-2',
    currentTexture: 'none',
  },
  // CORE STARTS
  {
    type: 'normal',
    id: 'step-3',
    currentTexture: 'core_1',
  },
  {
    type: 'normal',
    id: 'step-4',
    currentTexture: 'core_2',
  },
  {
    type: 'normal',
    id: 'step-5',
    currentTexture: 'core_3',
  },
  {
    type: 'normal',
    id: 'step-6',
    currentTexture: 'core_4',
  },
  {
    type: 'normal',
    id: 'step-7',
    currentTexture: 'core_5',
  },
  // SECOND MENU ( SEED )
  {
    type: 'menu',
    menuIndex: 0,
    id: 'step-8',
    currentTexture: 'none',
  },
  // SEED STARTS
  {
    type: 'normal',
    id: 'step-9',
    currentTexture: 'seed_1',
  },
  {
    type: 'normal',
    id: 'step-10',
    currentTexture: 'seed_2',
  },
  {
    type: 'normal',
    id: 'step-11',
    currentTexture: 'seed_3',
  },
  {
    type: 'normal',
    id: 'step-12',
    currentTexture: 'seed_4',
  },
  {
    type: 'normal',
    id: 'step-13',
    currentTexture: 'seed_5',
  },
  {
    type: 'normal',
    id: 'step-14',
    currentTexture: 'seed_6',
  },
  // THIRD MENU ( ORGANISM )
  {
    type: 'menu',
    menuIndex: 0,
    id: 'step-15',
    currentTexture: 'none',
  },
  // ORGANISM STARTS
  {
    type: 'normal',
    id: 'step-16',
    currentTexture: 'organism_1',
  },
  {
    type: 'normal',
    id: 'step-17',
    currentTexture: 'organism_2',
  },
  {
    type: 'normal',
    id: 'step-18',
    currentTexture: 'organism_3',
  },
  {
    type: 'normal',
    id: 'step-19',
    currentTexture: 'organism_4',
  },
  {
    type: 'normal',
    id: 'step-20',
    currentTexture: 'organism_5',
  },
  {
    type: 'normal',
    id: 'step-21',
    currentTexture: 'organism_6',
  },
  // STAGE 3 ************************
  {
    type: 'bridge',
    bridgeIndex: 1,
    id: 'step-22',
    currentTexture: 'none',
  },
  // CIRCULAR MENU ( STAGE 3 ) **************** SUPER IMPORTANT THIS IS STEP 23
  {
    type: 'menu',
    menuIndex: 1,
    id: 'step-23',
    currentTexture: 'none',
  },
  // CONDITIONS
  {
    type: 'normal',
    id: 'step-24',
    currentTexture: 'conditions_1',
  },
  {
    type: 'normal',
    id: 'step-25',
    currentTexture: 'conditions_2',
  },
  {
    type: 'normal',
    id: 'step-26',
    currentTexture: 'conditions_3',
  },
  {
    type: 'normal',
    id: 'step-27',
    currentTexture: 'conditions_4',
  },
  {
    type: 'normal',
    id: 'step-28',
    currentTexture: 'conditions_5',
  },
  {
    type: 'normal',
    id: 'step-29',
    currentTexture: 'conditions_6',
  },
  {
    type: 'normal',
    id: 'step-30',
    currentTexture: 'conditions_7',
  },
  // HABITAT
  {
    type: 'normal',
    id: 'step-31',
    currentTexture: 'habitat_1',
  },
  {
    type: 'normal',
    id: 'step-32',
    currentTexture: 'habitat_2',
  },
  {
    type: 'normal',
    id: 'step-33',
    currentTexture: 'habitat_3',
  },
  {
    type: 'normal',
    id: 'step-34',
    currentTexture: 'habitat_4',
  },
  {
    type: 'normal',
    id: 'step-35',
    currentTexture: 'habitat_5',
  },
  {
    type: 'normal',
    id: 'step-36',
    currentTexture: 'habitat_6',
  },
  // COMMUNICATION
  {
    type: 'normal',
    id: 'step-37',
    currentTexture: 'communication_1',
  },
  {
    type: 'normal',
    id: 'step-38',
    currentTexture: 'communication_2',
  },
  {
    type: 'normal',
    id: 'step-39',
    currentTexture: 'communication_3',
  },
  {
    type: 'normal',
    id: 'step-40',
    currentTexture: 'communication_4',
  },
  {
    type: 'normal',
    id: 'step-41',
    currentTexture: 'communication_5',
  },
  {
    type: 'normal',
    id: 'step-42',
    currentTexture: 'communication_6',
  },
  {
    type: 'normal',
    id: 'step-43',
    currentTexture: 'communication_7',
  },
  // STRATOSPHERE
  {
    type: 'normal',
    id: 'step-44',
    currentTexture: 'stratosphere_1',
  },
  {
    type: 'normal',
    id: 'step-45',
    currentTexture: 'stratosphere_2',
  },
  {
    type: 'normal',
    id: 'step-46',
    currentTexture: 'stratosphere_3',
  },
  {
    type: 'normal',
    id: 'step-47',
    currentTexture: 'stratosphere_4',
  },
  {
    type: 'normal',
    id: 'step-48',
    currentTexture: 'stratosphere_5',
  },
  {
    type: 'normal',
    id: 'step-49',
    currentTexture: 'stratosphere_6',
  },
  {
    type: 'normal',
    id: 'step-50',
    currentTexture: 'stratosphere_7',
  },
  {
    type: 'normal',
    id: 'step-51',
    currentTexture: 'stratosphere_8',
  },
  {
    type: 'normal',
    id: 'step-52',
    currentTexture: 'stratosphere_9',
  },
  {
    type: 'normal',
    id: 'step-53',
    currentTexture: 'stratosphere_10',
  },
  {
    type: 'normal',
    id: 'step-54',
    currentTexture: 'stratosphere_11',
  },
  // ALIGNMENT
  {
    type: 'normal',
    id: 'step-55',
    currentTexture: 'alignment_1',
  },
  {
    type: 'normal',
    id: 'step-56',
    currentTexture: 'alignment_2',
  },
  {
    type: 'normal',
    id: 'step-57',
    currentTexture: 'alignment_3',
  },
  {
    type: 'normal',
    id: 'step-58',
    currentTexture: 'alignment_4',
  },
  {
    type: 'normal',
    id: 'step-59',
    currentTexture: 'alignment_5',
  },
  {
    type: 'normal',
    id: 'step-60',
    currentTexture: 'alignment_6',
  },
]

export default STEPS
