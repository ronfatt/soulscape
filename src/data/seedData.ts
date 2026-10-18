import { 
  ChakraInfo, 
  ChakraType, 
  OracleCard, 
  CardDeck, 
  MusicTrack, 
  Playlist, 
  Mentor, 
  KnowledgeArticle, 
  Course, 
  GuidedJourney, 
  TransactionRecord,
  CardReadingRecord
} from '../types';

// ==========================================
// 1. SEVEN CHAKRAS
// ==========================================
export const SEED_CHAKRAS: ChakraInfo[] = [
  {
    id: 'root',
    index: 1,
    nameZh: '海底轮 (根轮)',
    nameEn: 'Root Chakra (Muladhara)',
    sanskrit: 'Muladhara',
    element: 'Earth / 土',
    color: '赤红',
    hexColor: '#D9534F',
    bgGradient: 'from-red-900/10 via-amber-900/10 to-stone-50',
    seedMantra: 'LAM',
    frequency: 396,
    locationZh: '脊椎骨底部、会阴区',
    locationEn: 'Base of spine, perineum',
    balancedZh: '感到安全、扎根大地、经济稳定、生命力充沛、身心踏实。',
    balancedEn: 'Grounded, safe, secure, financially stable, physically anchored.',
    blockedZh: '焦虑恐慌、缺乏安全感、流离失所感、贪婪或身体疲劳脆弱。',
    blockedEn: 'Fearful, restless, insecure, hoarding tendencies, chronic fatigue.',
    affirmationZh: '我深深扎根于大地，我是安全且被宇宙全然滋养的。',
    affirmationEn: 'I am deeply grounded in the earth; I am safe and divinely supported.',
    descriptionZh: '海底轮是人体能量系统的根基，承载着生存本能、物质安全感与身体肉身的生命力。当海底轮平衡时，我们在繁杂的世界中拥有岿然不动的从容。',
    descriptionEn: 'The root chakra represents our foundation. It relates to our basic survival needs, stability, and connection with Mother Earth.',
    recommendedTrackId: 'music-1',
    relatedCardIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 'sacral',
    index: 2,
    nameZh: '本我轮 (生殖轮/脐轮)',
    nameEn: 'Sacral Chakra (Svadhisthana)',
    sanskrit: 'Svadhisthana',
    element: 'Water / 水',
    color: '温橙',
    hexColor: '#F08A4B',
    bgGradient: 'from-orange-900/10 via-amber-800/10 to-stone-50',
    seedMantra: 'VAM',
    frequency: 417,
    locationZh: '肚脐下方约三指处',
    locationEn: 'Lower abdomen, below navel',
    balancedZh: '情绪流畅、创造力迸发、享受愉悦、接纳亲密关系与自发生机。',
    balancedEn: 'Creative flow, healthy emotional expression, passion, joy, sensual harmony.',
    blockedZh: '情绪压抑或失控、灵感枯竭、愧疚感、性冷淡或过度沉溺。',
    blockedEn: 'Emotional numbness or volatility, creative block, guilt, rigidity.',
    affirmationZh: '我拥抱内在的情感之水，允许创造力与喜悦自然流动。',
    affirmationEn: 'I honor my feelings, allowing passion and abundant creativity to flow freely.',
    descriptionZh: '本我轮主掌情感、感官愉悦与无限的艺术灵感。它像清澈温和的河流，教导我们放下僵固的执念，随生命的韵律起舞。',
    descriptionEn: 'Governing passion, intimacy and artistic manifestation, the sacral chakra opens the gateway to sensory joy and emotional fluidity.',
    recommendedTrackId: 'music-2',
    relatedCardIds: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
  },
  {
    id: 'solar_plexus',
    index: 3,
    nameZh: '太阳轮 (胃轮/腹轮)',
    nameEn: 'Solar Plexus (Manipura)',
    sanskrit: 'Manipura',
    element: 'Fire / 火',
    color: '暖金黄',
    hexColor: '#EBB338',
    bgGradient: 'from-amber-800/10 via-yellow-700/10 to-stone-50',
    seedMantra: 'RAM',
    frequency: 528,
    locationZh: '上腹部、胸骨下方至肚脐上方',
    locationEn: 'Upper abdomen, stomach area',
    balancedZh: '坚定的自信、意志力清晰、执行力强、自律且懂得自我肯定。',
    balancedEn: 'Confident, driven, purposeful, strong willpower, healthy boundaries.',
    blockedZh: '自卑软弱、拖延怯懦、控制欲过盛、易怒或消化系统失调。',
    blockedEn: 'Self-doubt, passivity, micro-management, quick to anger, digestive stress.',
    affirmationZh: '我拥有实现心愿的内在力量，我自信而平静地闪耀。',
    affirmationEn: 'I stand in my authentic power with peaceful confidence and purposeful action.',
    descriptionZh: '太阳轮是内在能量的熔炉与自我意识的中心。它将意图淬炼为现实行动，给予我们跨越恐惧、成为自己生命主宰的烈火勇气。',
    descriptionEn: 'The furnace of inner power and personal transformation. Manipura fuels self-worth, courage, and radiant willpower.',
    recommendedTrackId: 'music-3',
    relatedCardIds: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
  },
  {
    id: 'heart',
    index: 4,
    nameZh: '心轮 (慈悲中心)',
    nameEn: 'Heart Chakra (Anahata)',
    sanskrit: 'Anahata',
    element: 'Air / 风',
    color: '翡翠绿',
    hexColor: '#5A8B6F',
    bgGradient: 'from-emerald-900/10 via-teal-800/10 to-stone-50',
    seedMantra: 'YAM',
    frequency: 639,
    locationZh: '胸部中央、心包区',
    locationEn: 'Center of chest',
    balancedZh: '无条件的爱、自我接纳、宽恕包容、同理心与内在深层平静。',
    balancedEn: 'Compassionate, forgiving, loving, emotionally open, living in harmony.',
    blockedZh: '情感创伤封闭、怨恨嫉妒、过度牺牲讨好、孤独或冷漠防备。',
    blockedEn: 'Guarded heart, holding grudges, people-pleasing, emotional isolation.',
    affirmationZh: '我全然接纳并爱护自己，我给予世界无私的温柔与慈悲。',
    affirmationEn: 'My heart is wide open. I give and receive love effortlessly and freely.',
    descriptionZh: '心轮是下三轮（物质世界）与上三轮（灵性世界）的神圣桥梁。在这里，所有二元对立融化为纯粹的仁慈与接纳。',
    descriptionEn: 'The sacred bridge between physical and spiritual planes. Anahata expands unconditional compassion and restorative inner peace.',
    recommendedTrackId: 'music-4',
    relatedCardIds: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
  },
  {
    id: 'throat',
    index: 5,
    nameZh: '喉轮 (真理与表达之轮)',
    nameEn: 'Throat Chakra (Vishuddha)',
    sanskrit: 'Vishuddha',
    element: 'Ether / 空',
    color: '静谧蔚蓝',
    hexColor: '#389A96',
    bgGradient: 'from-teal-900/10 via-cyan-900/10 to-stone-50',
    seedMantra: 'HAM',
    frequency: 741,
    locationZh: '喉部正中、甲状腺区',
    locationEn: 'Throat center',
    balancedZh: '真实清晰地表达自我、敏锐的倾听力、言行一致、真诚沟通。',
    balancedEn: 'Articulate, authentic voice, attentive listener, honest and expressive.',
    blockedZh: '不敢说真话、言不由衷、过度饶舌、喉咙干涩或害怕被评判。',
    blockedEn: 'Fear of speaking out, gossip, silence born of fear, miscommunication.',
    affirmationZh: '我清晰而真诚地说出我的内在真理，我倾听世界的智慧。',
    affirmationEn: 'I express my highest truth with clarity, kindness, and authentic integrity.',
    descriptionZh: '喉轮是真理的共振之器。唯有当我们敢于揭下面具，以真实声音述说灵魂的声音时，内在的世界才与外界达成真正的和谐。',
    descriptionEn: 'The vessel of sacred truth and voice. Vishuddha clarifies our personal boundaries and authentic contribution.',
    recommendedTrackId: 'music-5',
    relatedCardIds: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
  },
  {
    id: 'third_eye',
    index: 6,
    nameZh: '眉心轮 (三眼轮/直觉之轮)',
    nameEn: 'Third Eye Chakra (Ajna)',
    sanskrit: 'Ajna',
    element: 'Light / 光',
    color: '深靛青/薰衣草紫',
    hexColor: '#7160A1',
    bgGradient: 'from-indigo-950/15 via-purple-900/10 to-stone-50',
    seedMantra: 'OM / SHAM',
    frequency: 852,
    locationZh: '两眉之间、印堂深处',
    locationEn: 'Forehead between eyebrows',
    balancedZh: '超然直觉、洞察全局、灵性视野清晰、明晰幻象与潜意识洞悉。',
    balancedEn: 'Intuitive clarity, sharp perception, wisdom, visionary foresight.',
    blockedZh: '思维过度理性僵化、迷茫不知所向、幻象偏执或无法信任直觉。',
    blockedEn: 'Intellectual rigidity, lack of foresight, cynical worldview, foggy mind.',
    affirmationZh: '我信任我内在的寂静向导，我洞见事物表象背后的真实本质。',
    affirmationEn: 'I trust my inner guidance and look beyond worldly illusions with lucid wisdom.',
    descriptionZh: '眉心轮超越肉眼的局限，开启灵视与直觉的大门。它帮助我们在纷扰的信息洪流中，一眼看透因果的脉络与灵魂的方向。',
    descriptionEn: 'Transcending temporal illusion, Ajna unlocks intuitive foresight and inner spiritual contemplation.',
    recommendedTrackId: 'music-6',
    relatedCardIds: [56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66]
  },
  {
    id: 'crown',
    index: 7,
    nameZh: '顶轮 (千瓣莲花/灵性觉醒)',
    nameEn: 'Crown Chakra (Sahasrara)',
    sanskrit: 'Sahasrara',
    element: 'Cosmic Consciousness / 宇',
    color: '纯净紫白与金芒',
    hexColor: '#8B7BBA',
    bgGradient: 'from-violet-950/15 via-lavender-900/10 to-stone-50',
    seedMantra: 'AUM',
    frequency: 963,
    locationZh: '百会穴、头顶上方',
    locationEn: 'Top and crown of head',
    balancedZh: '天人合一、开悟超脱、深刻的宇宙联结感、纯粹喜乐与宁静。',
    balancedEn: 'Spiritual connection, unity consciousness, peace, transcendental awareness.',
    blockedZh: '精神虚无主义、执着世俗物质、灵性傲慢或与肉身严重脱节。',
    blockedEn: 'Spiritual cynicism, materialism, disconnection from the divine purpose.',
    affirmationZh: '我与浩瀚宇宙同频共振，我安住于纯粹的神圣意识与光明之中。',
    affirmationEn: 'I am one with cosmic infinity. Divine light and wisdom flow through every cell.',
    descriptionZh: '顶轮是灵性上升的极致体验。当千瓣莲花在头顶无声绽放，个体的小我与无限的宇宙大我融合为一，唯留纯然的恩典与静穆。',
    descriptionEn: 'The thousand-petaled lotus connecting mortal consciousness to the universal field of unconditional presence.',
    recommendedTrackId: 'music-7',
    relatedCardIds: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88]
  }
];

// ==========================================
// 2. 88-CARD SOULSCAPE ORACLE DECK
// ==========================================
export const SEED_CARD_DECK: CardDeck = {
  id: 'soulscape-88',
  nameZh: 'Soulscape 心灵之境·88枚原初神圣神谕卡',
  nameEn: 'Soulscape · 88 Sacred Realms Oracle Deck',
  descriptionZh: '专为数字时代设计的沉浸式心灵镜映工具。融合八大生命维度与七脉轮智慧，引导深层潜意识觉察与情绪整合。',
  descriptionEn: 'An original 88-card reflective oracle system designed for digital mindfulness, integrating elemental archetypes and chakra wisdom.',
  totalCards: 88,
  authorZh: 'Soulscape 心灵实验室 & 觉知导师委员会',
  authorEn: 'Soulscape Mind-Body-Spirit Lab & Council of Mentors',
  version: '2.4 Seed Demo',
  isOfficial: true,
  coverGradient: ['#4A4063', '#2C3531']
};

const CARD_ELEMENTS: Array<OracleCard['element']> = ['earth', 'water', 'fire', 'air', 'ether', 'light', 'cosmos'];
const GLYPHS = ['✦', '✧', '◈', '◇', '❂', '✺', '🜂', '🜄', '🜁', '🜃', '🜍', '🝁', '🝤', '☸', '🪷', '🪶', '🌊', '🏔️', '🪐', '🌙', '☀️', '🌀'];

// Archetype generator for 88 original sacred cards
const SEED_CARD_DEFINITIONS: Array<{
  id: number;
  nameZh: string;
  nameEn: string;
  realmZh: string;
  realmEn: string;
  chakra: ChakraType;
  keywordsZh: string[];
  keywordsEn: string[];
  symbolismZh: string;
  symbolismEn: string;
  lightMeaningZh: string;
  lightMeaningEn: string;
  shadowMeaningZh: string;
  shadowMeaningEn: string;
  reflectionPromptZh: string;
  reflectionPromptEn: string;
  gradient: [string, string, string];
}> = [
  // Realm 1: 大地之源 (Root 1-11)
  {
    id: 1,
    nameZh: '大地基石',
    nameEn: 'The Prime Bedrock',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['稳固', '安全感', '深层扎根', '物质根基'],
    keywordsEn: ['Steadfast', 'Rootedness', 'Security', 'Physical Foundation'],
    symbolismZh: '古老的花岗岩隐没于静穆的红土之中，万物繁衍的沉默承载者。',
    symbolismEn: 'Ancient granite sinking into crimson soil, the silent anchor of all growth.',
    lightMeaningZh: '现在的你拥有无可撼动的支持系统。信任你的身体与生活根基，一切正在稳步生长。',
    lightMeaningEn: 'You are firmly supported. Trust the ground beneath your feet and proceed calmly.',
    shadowMeaningZh: '因过分担忧生计或未来而不肯迈步，将自我拘束在过度僵化的防御之中。',
    shadowMeaningEn: 'Over-clinging to security, paralysis caused by material scarcity anxiety.',
    reflectionPromptZh: '今天，哪一件具体的小事能让你真正感受到身体的踏实与安全？',
    reflectionPromptEn: 'What tangible action today can ground your physical body into peace?',
    gradient: ['#8C3B32', '#A65B4A', '#D9A08B']
  },
  {
    id: 2,
    nameZh: '古树年轮',
    nameEn: 'Ancient Rings',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['耐心', '生命积淀', '岁月洗礼', '自然节奏'],
    keywordsEn: ['Patience', 'Endurance', 'Time Accumulation', 'Natural Rhythm'],
    symbolismZh: '千年生长的巨杉截面，一圈圈致密的同心圆记录着风雨雷霆。',
    symbolismEn: 'Concentric timber rings of a millennial redwood holding centuries of climate.',
    lightMeaningZh: '不急于看到立竿见影的结果。时间是你最忠诚的朋友，你的每一次沉淀都在生效。',
    lightMeaningEn: 'Do not rush the cycle. Deep maturation requires time and rhythmic persistence.',
    shadowMeaningZh: '急躁求成带来的挫败感，或是以“等待”为借口的被动拖延。',
    shadowMeaningEn: 'Impatience eroding trust, or disguised passivity cloaked as waiting.',
    reflectionPromptZh: '如果允许一件事以大自然的悠长节律发生，你的焦躁会减轻多少？',
    reflectionPromptEn: 'If this situation matured at nature’s pacing, what burden could you release?',
    gradient: ['#6B4423', '#8B5A2B', '#C19A6B']
  },
  {
    id: 3,
    nameZh: '矿脉秘藏',
    nameEn: 'The Vein of Gold',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['潜在丰盛', '内在资源', '自我价值', '静待开采'],
    keywordsEn: ['Latent Wealth', 'Inner Resource', 'True Worth', 'Self-Discovery'],
    symbolismZh: '暗淡岩层深处隐约闪烁的金线与原生晶簇。',
    symbolismEn: 'Glinting gold embedded in unpolished dark slate awaiting gentle extraction.',
    lightMeaningZh: '你所寻求的外部资源，早已以潜能形式存在于你的经验与天赋之中。',
    lightMeaningEn: 'The resource you seek already dwells quietly within your latent gifts.',
    shadowMeaningZh: '低估自身价值，认为自己必须依赖他人的恩赐才能生存。',
    shadowMeaningEn: 'Believing you are impoverished or needing external rescue.',
    reflectionPromptZh: '回忆一个你曾经克服的难关，那证明了你具备何种尚未完全发挥的力量？',
    reflectionPromptEn: 'What past resilience reveals an untapped superpower in you today?',
    gradient: ['#7D6335', '#A38446', '#D6B875']
  },
  {
    id: 4,
    nameZh: '庇护之所',
    nameEn: 'The Sanctuary Grove',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['边界感', '能量防护', '休憩重整', '安全避风港'],
    keywordsEn: ['Boundaries', 'Restoration', 'Sacred Havens', 'Energetic Shelter'],
    symbolismZh: '被苔藓与藤蔓轻柔掩映的石窟，微风不燥，宁静如子宫。',
    symbolismEn: 'A moss-draped grotto offering absolute warmth, shelter and calm.',
    lightMeaningZh: '此刻最需要的是回归属于你的神圣空间，关上外界噪音，让神经系统深度放松。',
    lightMeaningEn: 'Withdraw from external chatter into your sacred shelter to restore nervous calmness.',
    shadowMeaningZh: '将自己关在与世隔绝的孤岛，用冷漠代替健康的界限。',
    shadowMeaningEn: 'Isolation disguised as boundaries, refusing healthy community engagement.',
    reflectionPromptZh: '在生活中，你是否给予了自己一个免受任何评判与打扰的物理或心理角落？',
    reflectionPromptEn: 'Where is your judgment-free harbor where you can be entirely unmasked?',
    gradient: ['#4E5D4E', '#6E816E', '#9DB19D']
  },
  {
    id: 5,
    nameZh: '原野守候',
    nameEn: 'The Wild Sentinel',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['敏锐本能', '身体直觉', '警戒边界', '生存智慧'],
    keywordsEn: ['Instinct', 'Somatic Wisdom', 'Alert Awareness', 'Primal Protection'],
    symbolismZh: '暮色草原上静立的麋鹿，耳廓微动，感知着大地的每一丝震动。',
    symbolismEn: 'A solitary elk on the twilight savannah attuned to the earth’s subtle tremors.',
    lightMeaningZh: '倾听身体的第一反应。肠道与肌肉的紧张或舒展，往往比大脑逻辑更先知道答案。',
    lightMeaningEn: 'Listen to somatic resonance; your gut intuition recognizes truth before logic.',
    shadowMeaningZh: '处于持续的“战斗或逃跑”警觉疲惫状态，草木皆兵。',
    shadowMeaningEn: 'Chronic hypervigilance; mistaking unfamiliarity for acute danger.',
    reflectionPromptZh: '闭上眼睛深呼吸三次，你的肩膀、胃部或下颌此刻在向你传递什么信号？',
    reflectionPromptEn: 'Take three deep breaths. What sensations are your neck, gut or jaw signaling?',
    gradient: ['#6B5344', '#8E7361', '#BCAAA4']
  },
  {
    id: 6,
    nameZh: '深冬沉睡',
    nameEn: 'Winter Dormancy',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['休眠蓄力', '接纳低谷', '静默滋养', '无为的智慧'],
    keywordsEn: ['Dormancy', 'Allowing Lows', 'Silent Incubation', 'Sacred Rest'],
    symbolismZh: '覆盖着皑皑厚雪的林海，地表之下树根与微生物正悄然互通生息。',
    symbolismEn: 'Snowbound winter forest where roots share life under frozen silence.',
    lightMeaningZh: '停顿并不是退步。大自然的冬天正是为了春天的爆发展开的最深沉的滋养。',
    lightMeaningEn: 'Dormancy is not failure; sacred wintering is vital for spring’s explosion.',
    shadowMeaningZh: '因强制打鸡血或恐慌落后，过度消耗元气导致彻底枯竭。',
    shadowMeaningEn: 'Burnout caused by compulsive productivity when your spirit craves hibernation.',
    reflectionPromptZh: '你敢不敢允许自己拥有哪怕一整个下午“什么都不产生”的纯粹存在？',
    reflectionPromptEn: 'Can you grant yourself an afternoon of pure being without producing anything?',
    gradient: ['#4A5568', '#718096', '#CBD5E1']
  },
  {
    id: 7,
    nameZh: '祖脉长河',
    nameEn: 'Ancestral Lineage',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['家族传承', '和解释怀', '血脉力量', '历史疗愈'],
    keywordsEn: ['Ancestral Bond', 'Reconciliation', 'Lineage Strength', 'Epigenetic Healing'],
    symbolismZh: '无数分支汇入浩瀚江河的夜景，每一滴水都闪耀着先祖星火。',
    symbolismEn: 'River tributaries merging in starlight, carrying the wisdom of generations.',
    lightMeaningZh: '你不是独自站在世上。千百代先辈克服无数艰难所沉淀的坚韧基因，在你体内流淌。',
    lightMeaningEn: 'Generations of resilience survive in your veins. You carry forward their triumph.',
    shadowMeaningZh: '盲目背负家族未竟的创伤、债务或负罪感，无法过属于自己的人生。',
    shadowMeaningEn: 'Unconsciously carrying ancestral guilt or family burdens not yours to shoulder.',
    reflectionPromptZh: '你想对自己的家庭血脉说哪句表达感谢与划清界限的话？',
    reflectionPromptEn: 'What statement of gratitude and loving distinction frees you from ancestral weight?',
    gradient: ['#693030', '#8F4B4B', '#C98B8B']
  },
  {
    id: 8,
    nameZh: '春泥破晓',
    nameEn: 'Seedling’s Breakthrough',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['新生力量', '突破阻碍', '初露锋芒', '生命的顽强'],
    keywordsEn: ['Germination', 'Breaking Ground', 'Vitality', 'Unyielding Will'],
    symbolismZh: '顶开坚硬黑土与碎石的嫩绿芽尖，带着露珠的光晕。',
    symbolismEn: 'A fragile pale-green shoot displacing hard earth toward morning light.',
    lightMeaningZh: '艰难的酝酿期已近尾声。即使力量看似微弱，你已经拥有顶破束缚的力量。',
    lightMeaningEn: 'The dark underground gestation is done. You are ready to emerge into view.',
    shadowMeaningZh: '因恐惧外界风雨而退缩回泥土壳中，错失生长的第一道曙光。',
    shadowMeaningEn: 'Shrinking back into self-containment out of fear of vulnerability.',
    reflectionPromptZh: '你最近有什么新想法或愿望，正在渴望破土而出？',
    reflectionPromptEn: 'What nascent aspiration is currently demanding to see the light of day?',
    gradient: ['#3F5E4D', '#5E826E', '#A3C4B0']
  },
  {
    id: 9,
    nameZh: '石间清泉',
    nameEn: 'Spring From Stone',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['绝处逢生', '天然滋润', '恒久流动', '内在生机'],
    keywordsEn: ['Miraculous Source', 'Perseverance', 'Nourishment', 'Hidden Vitality'],
    symbolismZh: '悬崖灰岩裂缝中汩汩涌出的清冽泉水，涓涓不息。',
    symbolismEn: 'Crystal cold water gushing unbidden from the seams of dry mountain rock.',
    lightMeaningZh: '看似绝望或资源匮乏的境地中，有一处隐秘的生机正在为你敞开。',
    lightMeaningEn: 'Even in seemingly barren terrain, an unforeseen reservoir of grace is opening.',
    shadowMeaningZh: '执着于曾经干涸的老路，不肯转头看见眼前的甘泉。',
    shadowMeaningEn: 'Stubbornly digging a dry well while refusing the fresh stream beside you.',
    reflectionPromptZh: '如果暂时放下“必须这样解决”的固执，是否有更省力清澈的方式？',
    reflectionPromptEn: 'If you drop rigid expectations, where is ease already presenting itself?',
    gradient: ['#486581', '#627D98', '#9FB3C8']
  },
  {
    id: 10,
    nameZh: '山岳屹立',
    nameEn: 'Mountain Presence',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['定力', '不被动摇', '宏大格局', '内在静谧'],
    keywordsEn: ['Equanimity', 'Unshakable Stance', 'Grandeur', 'Centering'],
    symbolismZh: '穿透云海的雪峰，不论狂风呼啸还是雷电交加，始终威严独立。',
    symbolismEn: 'Snowcapped peak rising above cloud storms, tranquil and immovable.',
    lightMeaningZh: '风暴只是天空中流动的过客，而你是恒常的山峦。保持中正，观风云变幻。',
    lightMeaningEn: 'Storms pass through the sky; the mountain remains unmoved. Stay centered.',
    shadowMeaningZh: '傲慢冷漠，拒绝与周围世界互动，沦为不可接近的顽石。',
    shadowMeaningEn: 'Emotional petrification, callousness masquerading as detachment.',
    reflectionPromptZh: '当周遭喧闹或冲突发生时，你怎样找回自己那座“不动的山”？',
    reflectionPromptEn: 'How can you embody the mountain when external chaos swirls around you?',
    gradient: ['#334155', '#475569', '#94A3B8']
  },
  {
    id: 11,
    nameZh: '大地归息',
    nameEn: 'The Great Return',
    realmZh: '原初扎根界',
    realmEn: 'Primordial Roots',
    chakra: 'root',
    keywordsZh: ['圆满归结', '身心合一', '终极安全', '尘埃落定'],
    keywordsEn: ['Completion', 'Ground of Being', 'Ultimate Safety', 'Wholeness'],
    symbolismZh: '秋实落地融于沃土，孕育下一次万物复苏的金色轮回。',
    symbolismEn: 'Golden autumn leaves decaying into rich compost, nurturing eternal return.',
    lightMeaningZh: '一个长期的挣扎或课题已经抵达它的尘埃落定点。放心放手，大地接纳一切。',
    lightMeaningEn: 'A prolonged trial has completed its cycle. Surrender it into peaceful soil.',
    shadowMeaningZh: '害怕完结而强求延长无意义的消耗。',
    shadowMeaningEn: 'Dreading closure and unnecessarily prolonging an expired chapter.',
    reflectionPromptZh: '什么事情你已经彻底完成，现在可以向它深深致谢并画上句号？',
    reflectionPromptEn: 'What cycle is genuinely finished, awaiting only your conscious blessing to close?',
    gradient: ['#593D2C', '#78533C', '#B58D70']
  }
];

// Let's generate remaining cards (12 to 88) programmatically with rich curated presets across the 7 chakras
const REALM_THEMES: Array<{
  chakra: ChakraType;
  realmZh: string;
  realmEn: string;
  namesZh: string[];
  namesEn: string[];
  keywordsZh: string[][];
  keywordsEn: string[][];
  colorPalette: [string, string, string];
}> = [
  {
    chakra: 'sacral',
    realmZh: '潮汐流动界',
    realmEn: 'Oceanic Currents',
    colorPalette: ['#9C4119', '#C25E2E', '#F4A261'],
    namesZh: ['潮汐起伏', '情感珊瑚', '甘露之杯', '水镜倒影', '珍珠成形', '涌动激情', '温柔抚触', '漩涡洗涤', '生命之波', '感官盛宴', '融化冰川'],
    namesEn: ['Tidal Rhythm', 'Coral Bloom', 'Chalice of Nectar', 'Water Mirror', 'The Pearl’s Genesis', 'Surging Passion', 'Tender Caress', 'Vortex Cleansing', 'Wave of Genesis', 'Sensory Feast', 'Melting Glacier'],
    keywordsZh: [
      ['周期节奏', '接纳情绪', '潮起潮落', '身心顺应'],
      ['隐秘伤口', '生命转化', '瑰丽结晶', '脆弱之美'],
      ['接纳给予', '感性滋润', '生命丰盛', '自我犒劳'],
      ['真实映照', '潜意识浮现', '澄澈接纳', '心灵清明'],
      ['苦痛淬炼', '内在华彩', '宝贵阅历', '时间的馈赠'],
      ['灵感迸发', '纯真热望', '创造驱动', '敢于表达'],
      ['身心疗愈', '温润关照', '打破防卫', '爱己初心'],
      ['释放沉积', '深层代谢', '情绪净化', '清空杂质'],
      ['原初律动', '舞动生命', '无拘无束', '顺流而下'],
      ['感官觉醒', '细嗅蔷薇', '当下愉悦', '赞叹世界'],
      ['放下冷硬', '心防瓦解', '温热流动', '重获新生']
    ],
    keywordsEn: [
      ['Cyclic Rhythm', 'Emotional Waves', 'Fluidity', 'Grace'],
      ['Vulnerability', 'Beauty in Scar', 'Organic Growth', 'Tenderness'],
      ['Receptivity', 'Inner Sweetness', 'Self-Nourishment', 'Abundance'],
      ['Clear Reflection', 'Honest Mirror', 'Lucid Emotions', 'Subconscious'],
      ['Precious Wisdom', 'Pain Transformed', 'Luster', 'Self-Value'],
      ['Creative Spark', 'Uninhibited Fire', 'Joyous Urge', 'Passion'],
      ['Soothing Care', 'Gentle Embrace', 'Softening Armor', 'Compassion'],
      ['Detoxification', 'Releasing Trauma', 'Vortex Flow', 'Renewal'],
      ['Primal Pulse', 'Dancing with Life', 'Effortless Flow', 'Playfulness'],
      ['Sensory Awakening', 'Savoring Beauty', 'Present Joy', 'Earthly Delight'],
      ['Melting Defenses', 'Warmth Returning', 'Surrendering Ice', 'Open Heart']
    ]
  },
  {
    chakra: 'solar_plexus',
    realmZh: '光辉烈焰界',
    realmEn: 'Solar Forge',
    colorPalette: ['#945D14', '#B87B22', '#E9C46A'],
    namesZh: ['金乌初升', '铸剑之火', '太阳之盾', '意志之缰', '自律甘泉', '雄狮沉静', '炼金熔炉', '雷霆裁决', '光明之约', '无畏向阳', '中天辉耀'],
    namesEn: ['Rising Sun', 'The Sword’s Forge', 'Aegis of Radiance', 'Reins of Will', 'The Well of Discipline', 'Lion’s Serenity', 'Alchemical Furnace', 'Thunderous Stance', 'Pact of Light', 'Sunward Courage', 'Zenith Brilliance'],
    keywordsZh: [
      ['希望新生', '破晓自信', '宏大开端', '驱散阴霾'],
      ['坚毅打磨', '经历淬炼', '锋芒内敛', '真才实学'],
      ['坚定护卫', '健康边界', '不受侵害', '内在威严'],
      ['聚焦主控', '掌控航向', '克制冲动', '精准发力'],
      ['日积月累', '习惯的力量', '持久定力', '甘之如饴'],
      ['深沉自信', '无需喧哗', '王者从容', '静水流深'],
      ['负面转化', '心智重构', '灰烬重生', '精神黄金'],
      ['断舍离', '果断决断', '劈开犹豫', '厘清界限'],
      ['诚信立身', '兑现承诺', '自我尊严', '正义正直'],
      ['向光而行', '战胜怯懦', '敞亮做事', '堂堂正正'],
      ['巅峰掌控', '成熟显化', '普照他人', '德配其位']
    ],
    keywordsEn: [
      ['New Dawn', 'Radiant Confidence', 'Dispelling Fog', 'Initiative'],
      ['Tempering', 'Resilience', 'Sharpened Focus', 'Craftsmanship'],
      ['Sacred Protection', 'Firm Boundaries', 'Sovereignty', 'Dignity'],
      ['Mastery of Focus', 'Direction', 'Self-Command', 'Intentionality'],
      ['Habitual Strength', 'Quiet Dedication', 'Enduring Will', 'Sweet Mastery'],
      ['Silent Authority', 'True Royalty', 'Centered Pride', 'Poise'],
      ['Transmutation', 'Refining Shadow', 'Mental Alchemy', 'Pure Gold'],
      ['Decisive Action', 'Cutting Ties', 'Moral Clarity', 'Bold Choice'],
      ['Integrity', 'Honoring Oaths', 'Self-Respect', 'Right Action'],
      ['Brave Heart', 'Stepping into Sunlight', 'Sincerity', 'Fortitude'],
      ['Peak Manifestation', 'Radiant Influence', 'Generous Power', 'Maturity']
    ]
  },
  {
    chakra: 'heart',
    realmZh: '翡翠慈悲界',
    realmEn: 'Verdant Anahata',
    colorPalette: ['#234E3A', '#3A7D5C', '#84A98C'],
    namesZh: ['无垢莲池', '和解之桥', '同理心语', '翡翠庭院', '无条件接纳', '温柔之索', '灵犀共鸣', '自爱甘露', '愈合结痂', '慈悲守护', '万物共生'],
    namesEn: ['Spotless Lotus Pool', 'Bridge of Truce', 'Empathic Whisper', 'Emerald Courtyard', 'Unconditional Embrace', 'Cord of Tenderness', 'Heartstring Resonance', 'Nectar of Self-Love', 'The Golden Scar', 'Shield of Compassion', 'Web of Interbeing'],
    keywordsZh: [
      ['纯净慈悲', '出淤泥而不染', '包容世间', '澄心见性'],
      ['跨越隔阂', '主动破冰', '释怀前嫌', '双向奔赴'],
      ['倾听心声', '感同身受', '换位体贴', '温暖抚慰'],
      ['宁静栖息', '敞开胸怀', '繁花似锦', '自然疗愈'],
      ['停止苛责', '拥抱阴影', '全然允许', '回归完整'],
      ['不割裂联结', '柔和沟通', '解开死结', '以柔克刚'],
      ['灵魂共振', '深切懂你', '心有灵犀', '真实相遇'],
      ['善待自我', '停止自惩', '自我赞许', '内在丰盛'],
      ['痛楚成勋章', '金缮之美', '不再流血', '重生坚韧'],
      ['爱不是软弱', '护卫纯真', '仁勇合一', '无畏之爱'],
      ['与天地同呼吸', '休戚与共', '感恩生态', '宏大格局']
    ],
    keywordsEn: [
      ['Untainted Grace', 'Lotus Blooming', 'Inclusivity', 'Soul Purity'],
      ['Reconciliation', 'Building Bridges', 'Dropping Grudges', 'Peacemaking'],
      ['Deep Attunement', 'Empathy', 'Gentle Presence', 'Heartfelt Care'],
      ['Inner Garden', 'Open Chest', 'Serene Shelter', 'Restorative Green'],
      ['Radical Acceptance', 'Dropping Shame', 'Whole Self', 'Unconditional Grace'],
      ['Gentle Bonds', 'Soft Power', 'Untying Knots', 'Loving Diplomacy'],
      ['Soul Resonance', 'Mutual Recognition', 'Deep Kinship', 'True Seeing'],
      ['Self-Compassion', 'Ending Inner War', 'Self-Approval', 'Inner Wellspring'],
      ['Kintsugi Healing', 'Golden Scars', 'Restored Wholeness', 'Triumph of Grace'],
      ['Courageous Love', 'Guarding Innocence', 'Fierce Compassion', 'Protective Grace'],
      ['Cosmic Symbiosis', 'Ecological Love', 'Interconnection', 'Unified Breath']
    ]
  },
  {
    chakra: 'throat',
    realmZh: '蔚蓝鸣响界',
    realmEn: 'Azure Harmonics',
    colorPalette: ['#1A4D54', '#2C7A87', '#52B4B0'],
    namesZh: ['真理号角', '空谷回音', '静默琴弦', '蓝晶共鸣', '真诚之言', '风语如织', '解剖面具', '清澈之泉', '誓言铭刻', '松绑咽喉', '天籁之声'],
    namesEn: ['Clarion of Truth', 'Valley Echo', 'Silent String', 'Cyan Crystal Resonance', 'Authentic Voice', 'Woven Wind', 'Dismantling the Mask', 'Crystal Spring', 'Engraved Vow', 'Unbound Throat', 'Celestial Aria'],
    keywordsZh: [
      ['直抒胸臆', '不卑不亢', '真理唤醒', '振聋发聩'],
      ['倾听回响', '因果呼应', '静观其变', '语言的回音'],
      ['无声胜有声', '蓄势待发', '言简意赅', '深层内观'],
      ['高频共振', '清晰指令', '能量对齐', '思维透明'],
      ['卸下虚伪', '敢说真话', '赢得敬重', '表里如一'],
      ['灵巧沟通', '如沐春风', '润物无声', '文思泉涌'],
      ['撕掉人设', '回归本色', '不再讨好', '真实的力量'],
      ['澄清误解', '开诚布公', '消除隔阂', '澄澈透明'],
      ['一诺千金', '生命契约', '恪守使命', '郑重声明'],
      ['释放压抑', '啼哭呐喊', '舒展呼吸', '重获话语权'],
      ['与神共鸣', '歌咏美好', '艺术表达', '灵音抚慰']
    ],
    keywordsEn: [
      ['Unapologetic Truth', 'Awakening Call', 'Moral Clarity', 'Voice of Courage'],
      ['Echoes of Deed', 'Listening Mind', 'Reverberation', 'Wise Silence'],
      ['Eloquence in Stillness', 'Poised Wisdom', 'Sparse Words', 'Inner Tune'],
      ['Pure Frequency', 'Lucid Direction', 'Aligned Expression', 'Mental Glass'],
      ['Radical Honesty', 'Congruence', 'Truthful Bond', 'No Pretending'],
      ['Artful Speech', 'Balmy Words', 'Poetic Thought', 'Fluid Discourse'],
      ['Shedding Persona', 'Raw Authenticity', 'Reclaiming Reality', 'True Identity'],
      ['Clearing Rumors', 'Candor', 'Dissolving Static', 'Crystal Flow'],
      ['Sacred Word', 'Integrity of Promise', 'Vow to Self', 'Solemn Stand'],
      ['Liberating Voice', 'Unchoked Sigh', 'Breathing Freedom', 'Speaking Up'],
      ['Divine Melody', 'Sacred Song', 'Artistic Channelling', 'Harmonic Grace']
    ]
  },
  {
    chakra: 'third_eye',
    realmZh: '星夜灵视界',
    realmEn: 'Indigo Vision',
    colorPalette: ['#282347', '#483D8B', '#7A6AB4'],
    namesZh: ['潜意识渡口', '幻象之镜', '猫头鹰之眼', '织梦罗盘', '直觉闪电', '星图解析', '穿越迷雾', '先知提灯', '时空折痕', '深渊凝视', '灵光乍现'],
    namesEn: ['Subconscious Ferry', 'Mirror of Maya', 'Owl’s Vision', 'Dreamweaver Compass', 'Intuitive Lightning', 'Celestial Cartography', 'Piercing the Fog', 'Prophet’s Lantern', 'Fold of Spacetime', 'Gaze into the Deep', 'Aha! Epiphany'],
    keywordsZh: [
      ['探索梦境', '隐秘冲动', '潜意识浮出', '阴影觉察'],
      ['看破虚相', '不为物惑', '辨伪存真', '澄澈心智'],
      ['夜视黑暗', '洞见暗流', '超强感知', '先人一步'],
      ['梦境指引', '灵感解码', '奇思妙想', '直通神谕'],
      ['电光石火', '突然明朗', '无因之知', '本能确信'],
      ['宏观蓝图', '生命宿命', '知晓因果', '高维视角'],
      ['拨云见日', '不再困惑', '笃定前行', '廓清前路'],
      ['暗夜引路', '导师智慧', '独行不惧', '微光指引'],
      ['因果同步', '共时性奇迹', '巧合背后的必然', '时机成熟'],
      ['直面未知', '转化恐惧', '深水寻珠', '灵魂淬炼'],
      ['顿悟开窍', '答案自现', '思维飞跃', '天赐灵感']
    ],
    keywordsEn: [
      ['Dream Voyage', 'Shadow Awareness', 'Unconscious Realm', 'Submerged Truth'],
      ['Piercing Maya', 'Seeing Beyond Form', 'Dissolving Illusion', 'Sharp Discernment'],
      ['Night Sight', 'Perceiving Subtleties', 'Silent Observer', 'Heightened Sixth Sense'],
      ['Dream Navigation', 'Archetypal Map', 'Visionary Quest', 'Symbolic Code'],
      ['Flash of Intuition', 'Sudden Certainty', 'Immediate Knowing', 'Gut Epiphany'],
      ['Master Blueprint', 'Synchronistic Orbit', 'Higher Perspective', 'Karmic Map'],
      ['Cutting through Mist', 'Dissolving Confusion', 'Direct Path', 'Unwavering Sight'],
      ['Solitary Beacon', 'Guiding Lantern', 'Hermit’s Wisdom', 'Light in Dark'],
      ['Spacetime Fold', 'Sacred Coincidence', 'Kairos Moment', 'Synchronicity'],
      ['Befriending Abyss', 'Conquering the Unknown', 'Pearl in Troughs', 'Courageous Look'],
      ['Eureka Moment', 'Instantaneous Insight', 'Cognitive Leap', 'Divine Spark']
    ]
  },
  {
    chakra: 'crown',
    realmZh: '宇光圆融界',
    realmEn: 'Cosmic Sahasrara',
    colorPalette: ['#3A244E', '#5B377A', '#A37EC5'],
    namesZh: [
      '千瓣莲花', '空性太虚', '天鹅归巢', '极光织锦', '神圣曼陀罗', '万有同频', '永恒寂静', '白光灌顶', 
      '时空归零', '造化之手', '灵魂契约', '超然觉知', '大美无言', '虹化长空', '星际尘埃', '造化无私', 
      '慈悲太极', '涅槃重光', '无限可能', '大道至简', '圆满归一', '无尽光芒'
    ],
    namesEn: [
      'Thousand-Petaled Lotus', 'Boundless Emptiness', 'Swan’s Return', 'Aurora Tapestry', 'Sacred Mandala', 'Unified Frequency', 'Eternal Stillness', 'Descent of White Light',
      'Zero-Point Field', 'Hand of Creation', 'Soul Contract', 'Transcendent Awareness', 'Grand Ineffable Beauty', 'Rainbow Dissolution', 'Stardust Kinship', 'Selfless Tao',
      'Compassionate Taiji', 'Nirvanic Dawn', 'Infinite Potentiality', 'Great Simplicity', 'Supreme Integration', 'Endless Radiance'
    ],
    keywordsZh: [
      ['极致觉醒', '神圣绽放', '万法归一', '超脱解脱'],
      ['色即是空', '放下执相', '心无挂碍', '大自在'],
      ['游子归家', '灵性归宿', '纯洁超拔', '终极宁静'],
      ['宇宙共鸣', '神圣乐章', '浩瀚奇迹', '天人感应'],
      ['秩序神圣', '内在大宇宙', '完美几何', '和谐整全'],
      ['彼此相通', '无二无别', '同一张光网', '宇宙大爱'],
      ['喧嚣止息', '深沉平安', '神圣安息', '无言之语'],
      ['高频清洗', '细胞觉醒', '灵气灌注', '焕然重生'],
      ['放下旧剧本', '重启人生', '纯净可能', '归零重启'],
      ['造物眷顾', '宇宙恩典', '顺应大势', '天命所归'],
      ['今生使命', '灵魂誓约', '清晰方向', '顺天行道'],
      ['见证者之眼', '不被卷入', '清醒观察', '觉者无忧'],
      ['惊叹存在', '无需言喻', '顶礼造化', '虔诚感恩'],
      ['凡胎转化', '升华升维', '轻盈无痕', '大彻大悟'],
      ['来自星辰', '谦卑渺小', '宇宙尘埃', '永恒存在'],
      ['大爱无疆', '雨露均沾', '默默润物', '天地不仁以万物为刍狗'],
      ['阴阳调和', '动静不二', '包容矛盾', '圆通无碍'],
      ['凤凰涅槃', '劫后余生', '至纯金光', '再造新生'],
      ['量子跃迁', '超越限制', '无限丰盛', '奇迹在侧'],
      ['化繁为简', '直指人心', '返璞归真', '简明大道'],
      ['身心合一', '万物毕具', '大圆满', '归于源头'],
      ['照亮四方', '发光发热', '利乐众生', '永恒之光']
    ],
    keywordsEn: [
      ['Supreme Awakening', 'Lotus Bloom', 'Unity of All', 'Liberation'],
      ['Form is Emptiness', 'Releasing Fixation', 'Uncluttered Mind', 'Boundless Liberty'],
      ['Swan Returning', 'Spiritual Haven', 'Untouched Grace', 'Homebound'],
      ['Cosmic Weave', 'Aurora Melody', 'Sublime Wonder', 'Celestial Harmony'],
      ['Sacred Geometry', 'Inner Cosmos', 'Harmonic Blueprint', 'Wholeness'],
      ['All is One', 'Unified Resonance', 'Luminous Matrix', 'Universal Love'],
      ['Cease of Tumult', 'Profound Peace', 'Sacred Rest', 'Wordless Serenity'],
      ['Crown Infusion', 'Cellular Renewal', 'Divine Shower', 'Revitalization'],
      ['Zero Reset', 'Fresh Canvas', 'Quantum Void', 'Beginning Anew'],
      ['Cosmic Providence', 'Divine Grace', 'Riding the Current', 'Destiny Aligned'],
      ['Soul Contract', 'Lifelong Mission', 'Unwavering Path', 'Living the Purpose'],
      ['The Witness', 'Detached Clarity', 'Awakened Watcher', 'Peaceful Observer'],
      ['Ineffable Splendor', 'Silent Reverence', 'Sacred Awe', 'Humility'],
      ['Rainbow Ascension', 'Transcendence', 'Lifting Gravity', 'Spiritual Mastery'],
      ['Stardust Heritage', 'Humility & Wonder', 'Cosmic Atoms', 'Immortal Origin'],
      ['Impartial Grace', 'Universal Bounty', 'Unconditional Support', 'Tao’s Care'],
      ['Yin-Yang Unity', 'Dynamic Balance', 'Embracing Paradox', 'Effortless Flow'],
      ['Resurrection from Ashes', 'Reborn Radiance', 'Pure Essence', 'Triumph of Spirit'],
      ['Quantum Field', 'Unbounded Options', 'Limitless Field', 'Everywhere Miracles'],
      ['Supreme Simplicity', 'Essential Core', 'Uncluttered Tao', 'Childlike Purity'],
      ['Supreme Integration', 'Full Circle', 'The Great One', 'Return to Source'],
      ['Radiant Lamp', 'Beaming Love', 'Blessing All', 'Perpetual Radiance']
    ]
  }
];

// Combine to create the full 88 cards
export const SEED_ORACLE_CARDS: OracleCard[] = (() => {
  const allCards: OracleCard[] = [...(SEED_CARD_DEFINITIONS.map((c, i) => ({
    id: c.id,
    number: c.id,
    nameZh: c.nameZh,
    nameEn: c.nameEn,
    realmZh: c.realmZh,
    realmEn: c.realmEn,
    chakra: c.chakra,
    keywordsZh: c.keywordsZh,
    keywordsEn: c.keywordsEn,
    symbolismZh: c.symbolismZh,
    symbolismEn: c.symbolismEn,
    lightMeaningZh: c.lightMeaningZh,
    lightMeaningEn: c.lightMeaningEn,
    shadowMeaningZh: c.shadowMeaningZh,
    shadowMeaningEn: c.shadowMeaningEn,
    reflectionPromptZh: c.reflectionPromptZh,
    reflectionPromptEn: c.reflectionPromptEn,
    element: CARD_ELEMENTS[i % CARD_ELEMENTS.length],
    gradient: c.gradient,
    glyph: GLYPHS[i % GLYPHS.length],
    relatedMusicTag: 'calm'
  })))];

  let currentId = 12;

  REALM_THEMES.forEach((theme) => {
    theme.namesZh.forEach((nameZh, index) => {
      const nameEn = theme.namesEn[index] || `Card ${currentId}`;
      const kwZh = theme.keywordsZh[index] || ['觉察', '平衡', '启发', '沉思'];
      const kwEn = theme.keywordsEn[index] || ['Awareness', 'Balance', 'Insight', 'Reflection'];
      
      allCards.push({
        id: currentId,
        number: currentId,
        nameZh,
        nameEn,
        realmZh: theme.realmZh,
        realmEn: theme.realmEn,
        chakra: theme.chakra,
        keywordsZh: kwZh,
        keywordsEn: kwEn,
        symbolismZh: `在${theme.realmZh}的神圣空间中，${nameZh}显化为指引内观的能量图腾。`,
        symbolismEn: `Within the realm of ${theme.realmEn}, ${nameEn} manifests as a focal point for deeper intuitive contemplation.`,
        lightMeaningZh: `顺应当前生命阶段的启发，在日常生活中活出${kwZh[0]}与${kwZh[1]}的智慧。`,
        lightMeaningEn: `Embrace this season’s grace by manifesting ${kwEn[0]} and ${kwEn[1]} with calm assurance.`,
        shadowMeaningZh: `警惕陷入${kwZh[2]}的偏执或因缺乏内在信任而导致的抗拒。`,
        shadowMeaningEn: `Beware of over-resisting or clinging to rigid perceptions around ${kwEn[2]}.`,
        reflectionPromptZh: `在当前的情境中，${nameZh}如何能帮助你找到更松弛、更真实的答案？`,
        reflectionPromptEn: `How can the essence of ${nameEn} bring greater clarity and authentic ease into your day?`,
        element: CARD_ELEMENTS[currentId % CARD_ELEMENTS.length],
        gradient: theme.colorPalette,
        glyph: GLYPHS[currentId % GLYPHS.length],
        relatedMusicTag: theme.chakra === 'sacral' ? 'meditation' : theme.chakra === 'solar_plexus' ? 'focus' : theme.chakra === 'heart' ? 'calm' : 'sleep'
      });
      currentId++;
    });
  });

  return allCards;
})();

// ==========================================
// 3. 12 MUSIC TRACKS & 4 PLAYLISTS
// ==========================================
export const SEED_MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'music-1',
    titleZh: '大地的低语·396Hz清障冥想',
    titleEn: 'Earth Whispers · 396Hz Grounding',
    artistZh: 'Soulscape 声波疗愈实验室',
    artistEn: 'Soulscape Sound Therapy Lab',
    chakra: 'root',
    frequencyHz: 396,
    durationSeconds: 480,
    tagsZh: ['扎根', '释放恐惧', '海底轮', '自然音'],
    tagsEn: ['Grounding', 'Release Fear', 'Root Chakra', 'Nature Sounds'],
    category: 'meditation',
    coverColor: '#8C3B32',
    binauralBaseHz: 136.1,
    binauralBeatHz: 4.5,
    playsCount: 14820
  },
  {
    id: 'music-2',
    titleZh: '春水融冰·417Hz情绪流动波',
    titleEn: 'Spring Thaw · 417Hz Sacred Water',
    artistZh: '莲音工坊',
    artistEn: 'Lotus Acoustic Atelier',
    chakra: 'sacral',
    frequencyHz: 417,
    durationSeconds: 540,
    tagsZh: ['情绪流动', '创造力', '生殖轮', '流水声'],
    tagsEn: ['Emotional Flow', 'Creativity', 'Sacral', 'Water Ripple'],
    category: 'calm',
    coverColor: '#C25E2E',
    binauralBaseHz: 210.42,
    binauralBeatHz: 6.0,
    playsCount: 9630
  },
  {
    id: 'music-3',
    titleZh: '黄金意志·528Hz转化之火',
    titleEn: 'Golden Will · 528Hz Transformation',
    artistZh: '太阳之子声音工坊',
    artistEn: 'Helios Sound Forge',
    chakra: 'solar_plexus',
    frequencyHz: 528,
    durationSeconds: 360,
    tagsZh: ['自信心', 'DNA修复', '太阳神经丛', '颂钵'],
    tagsEn: ['Confidence', 'DNA Repair', 'Solar Plexus', 'Tibetan Bowl'],
    category: 'focus',
    coverColor: '#B87B22',
    binauralBaseHz: 528,
    binauralBeatHz: 10.0,
    playsCount: 22400
  },
  {
    id: 'music-4',
    titleZh: '翡翠心泉·639Hz慈悲共振',
    titleEn: 'Emerald Spring · 639Hz Heart Harmony',
    artistZh: '安达曼颂钵心流乐团',
    artistEn: 'Andaman Heartflow Ensemble',
    chakra: 'heart',
    frequencyHz: 639,
    durationSeconds: 620,
    tagsZh: ['自我接纳', '爱与关系', '心轮', '水晶钵'],
    tagsEn: ['Self-Acceptance', 'Love & Unity', 'Heart Chakra', 'Crystal Bowls'],
    category: 'calm',
    coverColor: '#3A7D5C',
    binauralBaseHz: 341.3,
    binauralBeatHz: 5.5,
    playsCount: 31200
  },
  {
    id: 'music-5',
    titleZh: '空灵真理·741Hz觉知表达',
    titleEn: 'Etheric Voice · 741Hz Lucid Truth',
    artistZh: '苍穹之声',
    artistEn: 'Sky Echoes',
    chakra: 'throat',
    frequencyHz: 741,
    durationSeconds: 420,
    tagsZh: ['真实表达', '喉轮排毒', '思维清晰', '羽管风琴'],
    tagsEn: ['Authentic Voice', 'Throat Detox', 'Clarity', 'Wind Organ'],
    category: 'meditation',
    coverColor: '#2C7A87',
    binauralBaseHz: 741,
    binauralBeatHz: 7.83,
    playsCount: 8940
  },
  {
    id: 'music-6',
    titleZh: '星海直觉·852Hz第三眼开悟',
    titleEn: 'Starlight Intuition · 852Hz Ajna Sight',
    artistZh: '阿卡西波段',
    artistEn: 'Akashic Waves',
    chakra: 'third_eye',
    frequencyHz: 852,
    durationSeconds: 600,
    tagsZh: ['潜意识直觉', '灵性觉知', '眉心轮', '双耳节拍'],
    tagsEn: ['Intuition', 'Third Eye', 'Deep Insight', 'Binaural Delta'],
    category: 'meditation',
    coverColor: '#483D8B',
    binauralBaseHz: 852,
    binauralBeatHz: 3.5,
    playsCount: 18700
  },
  {
    id: 'music-7',
    titleZh: '宇宙千瓣莲·963Hz神圣归一',
    titleEn: 'Cosmic Lotus · 963Hz Crown Awakening',
    artistZh: 'Soulscape 觉知总监与天籁弦乐',
    artistEn: 'Soulscape Consciousness Orchestra',
    chakra: 'crown',
    frequencyHz: 963,
    durationSeconds: 720,
    tagsZh: ['天人合一', '顶轮', '灵性超脱', '宇宙和声'],
    tagsEn: ['Unity Consciousness', 'Crown Chakra', 'Transcendence', 'Celestial Pad'],
    category: 'sleep',
    coverColor: '#5B377A',
    binauralBaseHz: 963,
    binauralBeatHz: 2.0,
    playsCount: 42100
  },
  {
    id: 'music-8',
    titleZh: '深林夜雨·微风与白噪音',
    titleEn: 'Nocturnal Rain · Pine Woods & White Noise',
    artistZh: '自然采音师张林',
    artistEn: 'Forest Audio Archival',
    frequencyHz: 432,
    durationSeconds: 900,
    tagsZh: ['安睡助眠', '白噪音', '雨声', '深度放松'],
    tagsEn: ['Deep Sleep', 'White Noise', 'Rainfall', 'Restful Night'],
    category: 'sleep',
    coverColor: '#2D3748',
    binauralBaseHz: 432,
    binauralBeatHz: 1.5,
    playsCount: 56900
  },
  {
    id: 'music-9',
    titleZh: '晨光初照·脑波阿尔法流',
    titleEn: 'Morning Alpha Bloom · 10Hz Focus Flow',
    artistZh: '脑科学音频研创院',
    artistEn: 'NeuroSound Labs',
    frequencyHz: 432,
    durationSeconds: 300,
    tagsZh: ['深度专注', '晨间唤醒', '阿尔法脑波', '高效工作'],
    tagsEn: ['Laser Focus', 'Morning Awakening', 'Alpha Waves', 'Productivity'],
    category: 'focus',
    coverColor: '#7A6237',
    binauralBaseHz: 432,
    binauralBeatHz: 10.5,
    playsCount: 38200
  },
  {
    id: 'music-10',
    titleZh: '极光摇篮曲·德尔塔深度修复',
    titleEn: 'Aurora Lullaby · Delta Cell Rest',
    artistZh: '北欧疗愈音社',
    artistEn: 'Nordic Rest Collective',
    durationSeconds: 840,
    tagsZh: ['褪黑素分泌', '无梦深睡', '德尔塔波', '轻柔钢琴'],
    tagsEn: ['Deep Sleep', 'Dreamless Rest', 'Delta Wave', 'Warm Piano'],
    category: 'sleep',
    coverColor: '#1E293B',
    binauralBaseHz: 108,
    binauralBeatHz: 1.2,
    playsCount: 61000
  },
  {
    id: 'music-11',
    titleZh: '云上行空·432Hz松弛心绪',
    titleEn: 'Walking on Clouds · 432Hz Serenity',
    artistZh: '云端漫步者',
    artistEn: 'Skywalker Melodies',
    frequencyHz: 432,
    durationSeconds: 450,
    tagsZh: ['平息焦虑', '午后小憩', '纯净空灵', '竖琴与大提琴'],
    tagsEn: ['Anxiety Relief', 'Afternoon Slumber', 'Harp & Cello', '432Hz'],
    category: 'calm',
    coverColor: '#4A6B82',
    binauralBaseHz: 432,
    binauralBeatHz: 7.0,
    playsCount: 27500
  },
  {
    id: 'music-12',
    titleZh: '灵息吐纳·4-7-8呼吸律动节拍',
    titleEn: 'Breathwork Sync · 4-7-8 Harmonic Pacer',
    artistZh: 'Soulscape 身心整合工坊',
    artistEn: 'Soulscape Breath & Somatic Works',
    durationSeconds: 480,
    tagsZh: ['呼吸训练', '减压', '心率变异度', '节律共振'],
    tagsEn: ['Breathwork', 'HRV Optimization', 'Pacing Bell', 'De-stress'],
    category: 'calm',
    coverColor: '#436153',
    binauralBaseHz: 216,
    binauralBeatHz: 5.0,
    playsCount: 19800
  }
];

export const SEED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-1',
    titleZh: '全息七脉轮高频平衡之旅',
    titleEn: 'Seven Chakras Holographic Journey',
    descriptionZh: '依照能量层级从海底轮依次升华至顶轮，7段经调频的声音共振。',
    descriptionEn: 'A sequential ascent through all 7 energetic hubs from root grounding to crown ascension.',
    category: 'meditation',
    trackIds: ['music-1', 'music-2', 'music-3', 'music-4', 'music-5', 'music-6', 'music-7'],
    coverGradient: ['#8C3B32', '#5B377A']
  },
  {
    id: 'playlist-2',
    titleZh: '深度无梦安眠·德尔塔波夜间专场',
    titleEn: 'Deep Dreamless Delta Sleep Sanctuary',
    descriptionZh: '专为神经系统过度兴奋、难以入眠者研发的舒眠音波合集。',
    descriptionEn: 'Scientifically tuned frequencies and gentle nature soundscapes to guide restorative sleep.',
    category: 'sleep',
    trackIds: ['music-8', 'music-10', 'music-7'],
    coverGradient: ['#1E293B', '#334155']
  },
  {
    id: 'playlist-3',
    titleZh: '心流深度工作·阿尔法脑波专注',
    titleEn: 'Flow State & Laser Clarity (Alpha Beats)',
    descriptionZh: '屏蔽外界嘈杂干扰，唤醒双侧大脑协同思考的专注音场。',
    descriptionEn: 'Optimal bilateral stimulation for prolonged deep work, writing, and creative breakthroughs.',
    category: 'focus',
    trackIds: ['music-9', 'music-3', 'music-12'],
    coverGradient: ['#7A6237', '#B87B22']
  },
  {
    id: 'playlist-4',
    titleZh: '午后情绪疗愈与静心舒压',
    titleEn: 'Afternoon Respite & Heart Healing',
    descriptionZh: '融化紧张与焦虑，让胸口紧绷的神经重新获得柔和伸展。',
    descriptionEn: 'Soft strings and water harmonics to dissolve chronic tension and open the compassionate heart.',
    category: 'calm',
    trackIds: ['music-4', 'music-11', 'music-2', 'music-12'],
    coverGradient: ['#3A7D5C', '#52B4B0']
  }
];

// ==========================================
// 4. 8 FICTIONAL MENTORS
// ==========================================
export const SEED_MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    nameZh: '苏念真 老师',
    nameEn: 'Master Nianzhen Su',
    titleZh: '藏传颂钵声波疗愈师 · 荣格原型意象咨询师',
    titleEn: 'Tibetan Sound Healer & Jungian Archetypal Consultant',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】拥有12年声波疗愈与荣格心理意象探索经验，专注于帮助高压都市人群释放潜意识焦虑、修复心轮创伤并重建内在安全感。',
    bioEn: '[Demo Profile] 12 years of sound therapy and archetypal imagery counseling, guiding people through inner child integration and autonomic nervous system regulation.',
    expertiseZh: ['颂钵音疗', '神谕卡深层解读', '心轮创伤整合', '压力释放'],
    expertiseEn: ['Sound Therapy', 'Oracle Card Reading', 'Heart Chakra Healing', 'Stress Release'],
    rating: 4.98,
    reviewCount: 342,
    hourlyRateCredits: 80,
    sessionsCompleted: 1280,
    languages: ['中文 (普通话)', 'English'],
    availableSlots: ['明天 10:00 - 11:00', '明天 15:30 - 16:30', '周四 19:00 - 20:00'],
    featuredCourseId: 'course-1'
  },
  {
    id: 'mentor-2',
    nameZh: '陈玄一 导师',
    nameEn: 'Master Xuanyi Chen',
    titleZh: '传统内丹呼吸导引师 · 七脉轮能量调理学者',
    titleEn: 'Daoist Breathwork Master & Chakra Biofield Researcher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】融汇道家吐纳养生与印度传统脉轮学说，擅长以身体体感为切入点，协助学员理顺海底轮与太阳轮之间的气机淤堵。',
    bioEn: '[Demo Profile] Synthesizes Daoist breath alchemy and Indian chakra science to unblock somatic energetic bottlenecks in root and solar plexus hubs.',
    expertiseZh: ['呼吸导引', '下三轮固本', '睡眠障碍改善', '身心精力管理'],
    expertiseEn: ['Breathwork Alchemy', 'Root Grounding', 'Sleep Architecture', 'Vital Energy'],
    rating: 4.95,
    reviewCount: 289,
    hourlyRateCredits: 90,
    sessionsCompleted: 940,
    languages: ['中文 (普通话/粤语)'],
    availableSlots: ['周三 14:00 - 15:00', '周五 10:00 - 11:00', '周日 16:00 - 17:00'],
    featuredCourseId: 'course-2'
  },
  {
    id: 'mentor-3',
    nameZh: '艾琳娜·沃克 (Elena Walker)',
    nameEn: 'Dr. Elena Walker, PhD',
    titleZh: '超个人心理学博士 · 正念冥想高级导师',
    titleEn: 'PhD in Transpersonal Psychology & Senior Mindfulness Facilitator',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】曾任加州身心研究所客座研究员，专注于将现代认知神经科学与正念冥想结合，开创适合现代职场精英的觉知训练法。',
    bioEn: '[Demo Profile] Former researcher bridging cognitive neuroscience with contemplative traditions, designing scientifically grounded mindfulness for modern leaders.',
    expertiseZh: ['正念认知训练', '情绪敏锐度', '灵性觉知', '职业倦怠干预'],
    expertiseEn: ['Mindfulness Based Stress Reduction', 'Emotional Agility', 'Awakened Leadership', 'Burnout Recovery'],
    rating: 4.99,
    reviewCount: 415,
    hourlyRateCredits: 100,
    sessionsCompleted: 1560,
    languages: ['English', '中文 (初级交流)'],
    availableSlots: ['周四 09:00 - 10:00 (EST/北京晚)', '周六 20:00 - 21:00'],
    featuredCourseId: 'course-3'
  },
  {
    id: 'mentor-4',
    nameZh: '林清芷 老师',
    nameEn: 'Qingzhi Lin',
    titleZh: '自然疗法草本芳疗师 · 灵性艺术疗愈导师',
    titleEn: 'Herbal Aromatherapist & Expressive Arts Healer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】倡导“以美育心”，通过自然植物精油香气、曼陀罗彩绘与本我轮冥想，引导个案抚平亲密关系里的伤痛。',
    bioEn: '[Demo Profile] Blends olfactory plant intelligence with mandala drawing to gently soothe relationship trauma and awaken feminine intuition.',
    expertiseZh: ['芳香心疗', '曼陀罗曼绘', '本我轮抚育', '亲密关系梳理'],
    expertiseEn: ['Aromatherapy for the Soul', 'Mandala Art Therapy', 'Sacral Awakening', 'Relationship Harmony'],
    rating: 4.92,
    reviewCount: 210,
    hourlyRateCredits: 70,
    sessionsCompleted: 670,
    languages: ['中文 (普通话)'],
    availableSlots: ['周三 19:30 - 20:30', '周六 15:00 - 16:00']
  },
  {
    id: 'mentor-5',
    nameZh: '大卫·凡·德·伯格 (David van den Berg)',
    nameEn: 'David van den Berg',
    titleZh: '全脑双耳节拍研究员 · 声波共振工程师',
    titleEn: 'Binaural Frequency Researcher & Psychoacoustic Sound Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】阿姆斯特丹声音生态学家，致力于利用特定赫兹音频（432Hz/528Hz/852Hz）改善神经退行性疲劳与深睡重构。',
    bioEn: '[Demo Profile] Acoustic ecologist specializing in custom brainwave entrainment to reset disrupted circadian rhythms and induce deep alpha meditation.',
    expertiseZh: ['脑波共振设计', '失眠重构', '专注场域搭建', '声音环境学'],
    expertiseEn: ['Brainwave Entrainment', 'Insomnia Protocol', 'Sonic Workspace Architecture'],
    rating: 4.89,
    reviewCount: 160,
    hourlyRateCredits: 75,
    sessionsCompleted: 450,
    languages: ['English', 'Dutch', 'German'],
    availableSlots: ['周五 16:00 - 17:00', '周六 18:00 - 19:00']
  },
  {
    id: 'mentor-6',
    nameZh: '姜若愚 老师',
    nameEn: 'Master Ruoyu Jiang',
    titleZh: '禅宗明心见性导师 · 止观禅修引路人',
    titleEn: 'Chan Buddhist Contemplative & Vipassana Retreat Guide',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】历经十年终南山与云南林泉闭关静修，语言平实直击本质，专长于帮助迷失于名利焦虑的都市人斩断虚妄妄念。',
    bioEn: '[Demo Profile] Years of solitary retreat experience in China’s southern peaks; cuts through spiritual materialism with sharp clarity and warm simplicity.',
    expertiseZh: ['止观禅修', '打破思维反刍', '真理喉轮显化', '顿悟解脱'],
    expertiseEn: ['Chan Meditation', 'Stopping Rumination', 'Authentic Living', 'Ego Transmutation'],
    rating: 4.97,
    reviewCount: 318,
    hourlyRateCredits: 95,
    sessionsCompleted: 1100,
    languages: ['中文 (普通话)'],
    availableSlots: ['周一 09:00 - 10:00', '周四 14:00 - 15:00']
  },
  {
    id: 'mentor-7',
    nameZh: '米拉·帕特尔 (Mira Patel)',
    nameEn: 'Mira Patel',
    titleZh: '吠陀阿育吠陀体质调理师 · 脉轮能量测试导师',
    titleEn: 'Vedic Ayurveda Practitioner & Chakra Bio-Typing Guide',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】来自印度瑞诗凯诗传承，专注于根据风、火、水三种体质（Dosha）量身定制脉轮饮食、精油与神谕卡疗愈方案。',
    bioEn: '[Demo Profile] Born in Rishikesh, Mira tailors lifestyle regimens aligning physical Doshas with the subtle endocrine and chakra networks.',
    expertiseZh: ['阿育吠陀体质分析', '脉轮调频食疗', '温和瑜伽导引', '生命能量唤醒'],
    expertiseEn: ['Dosha Analysis', 'Ayurvedic Nutrition', 'Somatic Alignment', 'Prana Cultivation'],
    rating: 4.93,
    reviewCount: 224,
    hourlyRateCredits: 85,
    sessionsCompleted: 780,
    languages: ['English', 'Hindi'],
    availableSlots: ['周二 15:00 - 16:00', '周五 19:00 - 20:00']
  },
  {
    id: 'mentor-8',
    nameZh: '顾知微 老师',
    nameEn: 'Zhiwei Gu',
    titleZh: '叙事疗愈师 · 潜意识释梦与日记觉知导师',
    titleEn: 'Narrative Therapist & Subconscious Dreamwork Coach',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    bioZh: '【虚拟演示档案】文学与心理学跨界导师，擅长通过书写疗愈、夜间梦境隐喻解码和神谕卡联想，引导来访者重写人生限制性叙事。',
    bioEn: '[Demo Profile] Interdisciplinary mentor helping seekers rewrite subconscious limiting scripts through guided journaling and dream symbolism.',
    expertiseZh: ['叙事书写疗愈', '梦境象征解读', '第三眼灵视激活', '重塑人生故事'],
    expertiseEn: ['Narrative Journaling', 'Dream Symbolism', 'Third Eye Awakening', 'Belief Reframing'],
    rating: 4.96,
    reviewCount: 275,
    hourlyRateCredits: 80,
    sessionsCompleted: 890,
    languages: ['中文 (普通话)', 'English'],
    availableSlots: ['周三 20:00 - 21:00', '周日 10:00 - 11:00']
  }
];

// ==========================================
// 5. 8 KNOWLEDGE ARTICLES
// ==========================================
export const SEED_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    titleZh: '432Hz 与 528Hz：声波频率如何影响自律神经与情绪修复',
    titleEn: '432Hz vs 528Hz: How Sacred Sound Frequencies Regulate the Autonomic Nervous System',
    excerptZh: '现代声学研究证实，特定频率的双耳节拍能诱导大脑产生阿尔法波与德尔塔波，让长期紧绷的心脏交感神经重返平衡。',
    excerptEn: 'Modern psychoacoustic research confirms that specific audio frequencies soothe sympathetic hyperarousal and induce calm alpha states.',
    contentZh: `## 为什么声音能够安抚紧绷的神经？

在快节奏的数字生活中，我们的大脑长期处于高频贝塔波（15-30Hz）中，交感神经系统持续报警，导致皮质醇居高不下、睡眠浅且情绪易怒。

### 1. 432Hz：大自然的数学常数
432Hz常被称为“自然的律动”。与现代标准的440Hz相比，432Hz在声波波形上更圆润，能与水分子发生更柔和的同频共振。当收听432Hz音频时，人体的平均心率会微幅下降，呼吸自发变深，诱导脑电波平缓回落至8-12Hz的阿尔法波阶段。

### 2. 528Hz：“奇迹转化”与太阳轮之火
在古老的索尔菲吉奥（Solfeggio）音阶中，528Hz对应太阳神经丛脉轮。声波生物学研究指出，528Hz在细胞层面上能增强水簇的稳定性，促进能量转换。对于常感到拖延、自我怀疑或自信心匮乏的人，528Hz能够提供温暖而坚实的心理支持。

### 建议实践指南
1. **晨间专注**：选择528Hz或10Hz双耳节拍作为背景音，每次工作45分钟；
2. **夜间入眠**：在睡前半小时关闭亮屏，聆听432Hz混合白噪音的雨声；
3. **配合腹式呼吸**：吸气4秒，屏息4秒，吐气6秒，让声波穿透胸腔与横膈膜。`,
    contentEn: `Detailed analysis of frequency medicine and psychoacoustics for mental equilibrium and stress reduction.`,
    categoryZh: '声波疗愈',
    categoryEn: 'Sound Healing',
    readTimeMinutes: 6,
    authorZh: '大卫·凡·德·伯格 & Soulscape实验室',
    authorEn: 'David van den Berg & Soulscape Lab',
    publishDate: '2026-09-12',
    tagsZh: ['声波科学', '双耳节拍', '自律神经', '528Hz'],
    tagsEn: ['Psychoacoustics', 'Binaural Beats', 'Autonomic Nervous System'],
    relatedChakra: 'heart',
    views: 4520
  },
  {
    id: 'art-2',
    titleZh: '七脉轮自测与身心失衡信号指南：从身体疼痛看能量流动',
    titleEn: 'The Seven Chakras Self-Assessment: Somatic Signals of Energetic Imbalance',
    excerptZh: '肩膀紧绷对应心轮防卫，喉咙梗塞源于真实压抑。身体是潜意识最诚实的账簿，教你读懂体感背后的脉轮语言。',
    excerptEn: 'Physical blockages often mirror subtle emotional knots. Learn how somatic signals reveal the state of your seven chakras.',
    contentZh: `## 身体从未对你说谎

很多人以为脉轮是一个虚无缥缈的概念，但实际上，古代印度的七脉轮分布位置与现代医学中的主要**内分泌腺体**以及**自主神经丛**高度重合。

| 脉轮 | 生理对应区 | 失衡的身体信号 | 心理/情绪映射 |
| :--- | :--- | :--- | :--- |
| **海底轮** | 尾骨、双腿、肾上腺 | 慢性腰酸、疲劳、便秘 | 金钱焦虑、缺乏安全感、居无定所 |
| **本我轮** | 骨盆、生殖腺、下腹部 | 泌尿系统敏感、骨盆僵硬 | 缺乏激情、愧疚感、压抑欲望 |
| **太阳轮** | 胃、胰腺、消化道 | 胃灼热、消化不良、溃疡 | 失去控制感、讨好型人格、拖延 |
| **心轮** | 心脏、胸腺、上背部 | 胸闷、呼吸浅短、驼背内扣 | 无法原谅、不敢接受爱、情感隔离 |
| **喉轮** | 甲状腺、颈椎、声带 | 喉咙异物感、频繁咳嗽 | 害怕说真话、讨好迎合他人 |
| **眉心轮** | 垂体、双眼、前额 | 偏头痛、眼压高、失眠梦多 | 逻辑过度紧绷、看不清未来方向 |
| **顶轮** | 松果体、大脑皮层 | 持续性脑雾、精神抽离感 | 虚无主义、与现实肉身彻底脱节 |

### 日常快速自我对齐练习
每天清晨醒来，无需急着拿手机。花3分钟将注意力从脚底沿着脊柱向上扫过这七个区域，问身体一个简单的问题：“亲爱的身体，你今天感觉如何？”`,
    contentEn: `Comprehensive mapping of physical tension patterns to subtle chakra centers and daily alignment tips.`,
    categoryZh: '脉轮能量',
    categoryEn: 'Chakra Biofield',
    readTimeMinutes: 8,
    authorZh: '陈玄一 导师',
    authorEn: 'Master Xuanyi Chen',
    publishDate: '2026-09-18',
    tagsZh: ['脉轮自测', '身心医学', '内分泌', '能量调理'],
    tagsEn: ['Chakra Health', 'Somatic Therapy', 'Holistic Wellness'],
    relatedChakra: 'root',
    views: 8910
  },
  {
    id: 'art-3',
    titleZh: '荣格与神谕卡：卡牌不是宿命预测，而是潜意识投射的一面镜子',
    titleEn: 'Carl Jung and the Oracle: Cards as Mirrors of the Subconscious Mind',
    excerptZh: '你抽到的每一张牌，都是你潜意识早已知晓、却被表层理性暂时遮蔽的心灵真相。用投射认同理解卡牌启示。',
    excerptEn: 'Oracle cards do not predict an unchangeable fate. Instead, they act as symbolic mirrors reflecting inner archetypes.',
    contentZh: `## 共时性：有意义的偶然连接

心理学巨匠卡尔·荣格（Carl G. Jung）在研究易经与塔罗时提出了著名的**共时性原则（Synchronicity）**。他指出，人类心灵并非被局限在大脑皮层内部，在集体潜意识的深层，外部世界的偶然事件与内在的心理状态常常以象征性的方式共振。

### 为什么神谕卡总是“令人吃惊地准确”？
1. **突破理性审查机制**：当我们面临困惑时，大脑的逻辑中枢往往会陷入利弊权衡与既定偏见的死循环。卡牌上的图像与象征原型绕过了逻辑审查，直击情感深处；
2. **投射效应（Projection）**：面对同一张“深冬沉睡”卡，一个疲于奔命的人会看到“允许休养”，一个拖延逃避的人会看到“警惕停滞”。你赋予图像的第一个解释，正是你的潜意识当前最渴望解决的命题；
3. **赋权而非被动顺从**：健康的牌卡体验绝不是“大师告诉我未来会怎样”，而是“我通过这张牌看清了当下的盲点，并因此拥有了更主动的选择权”。`,
    contentEn: `Exploring Jungian archetypes, projective reflection, and synchronicity within contemplative card drawing practices.`,
    categoryZh: '心灵哲学',
    categoryEn: 'Depth Psychology',
    readTimeMinutes: 7,
    authorZh: '苏念真 老师',
    authorEn: 'Master Nianzhen Su',
    publishDate: '2026-09-25',
    tagsZh: ['荣格心理学', '共时性', '神谕卡', '潜意识'],
    tagsEn: ['Jungian Archetypes', 'Synchronicity', 'Subconscious Mind'],
    relatedChakra: 'third_eye',
    views: 6320
  },
  {
    id: 'art-4',
    titleZh: '迷走神经激活法：3个随时可练的身体放松开关',
    titleEn: 'Vagus Nerve Reset: Three Somatic Switches for Instant Down-Regulation',
    excerptZh: '通过眼球运动、轻柔叹气与冷水刺激，直接给第十对脑神经发送“我已经安全了”的生化指令。',
    excerptEn: 'Directly signal safety to your tenth cranial nerve with three clinically supported vagal tone exercises.',
    contentZh: `## 为什么“讲道理”无法真正放松？

很多人在焦虑时习惯在心里对自己说：“别想了，没事的。”然而心跳依然加速，肌肉依然紧绷。这是因为负责威胁感知的**杏仁核与迷走神经背侧支**并不接收抽象的概念语言，它们只服从**生理体感信号**。

### 开关一：生理性深叹气（Physiological Sigh）
这是斯坦福大学神经生物学教授安德鲁·胡伯曼极力推崇的快速降压法：
- 用鼻子连续深吸两次气（第一次吸满，紧接着再短吸一口填满肺泡底部）；
- 缓缓用嘴长呼气，直到肺部排空；
- 重复2-3次。心脏的起搏细胞会立刻收到降速指令。

### 开关二：眼球平滑追踪与耳屏轻揉
迷走神经的迷走支穿过内耳道与眼轮匝肌。用温热的手指轻轻按揉耳廓窝内部，配合双眼缓慢望向极左与极右保持30秒，会自发诱发深哈欠或吞咽，这代表副交感神经已重新掌舵。`,
    contentEn: `Neurobiological grounding exercises targeting the vagus nerve for instant physical ease.`,
    categoryZh: '身心科学',
    categoryEn: 'Neurobiology',
    readTimeMinutes: 5,
    authorZh: '艾琳娜·沃克博士',
    authorEn: 'Dr. Elena Walker, PhD',
    publishDate: '2026-10-02',
    tagsZh: ['迷走神经', '深叹气', '副交感神经', '焦虑缓解'],
    tagsEn: ['Vagus Nerve', 'Somatic Reset', 'Stress Resilience'],
    relatedChakra: 'throat',
    views: 7450
  },
  {
    id: 'art-5',
    titleZh: '晨间觉知日记与暮光反思：重建自我对话的神圣仪式',
    titleEn: 'Morning Pages & Twilight Reflections: Reclaiming Sacred Self-Dialogue',
    excerptZh: '每天清晨给潜意识写3页没有语法的意识流文字，傍晚以三张感谢卡收束。最强大的心灵疗愈者正是你自己。',
    excerptEn: 'Unfiltered morning stream-of-consciousness journaling combined with evening gratitudes opens profound clarity.',
    contentZh: `## 文字是潜意识的渡船

我们每天在微信、邮件与社交媒体上输出成千上万个字，却极少有一句话是真诚地写给自己的灵魂。

### 晨间三页纸（Morning Pages）
在被待办事项与外部要求轰炸之前，准备一本纸质空白笔记本。不追求修辞，不计较工整，想到什么就写什么：“我今天有点累，梦到了旧朋友，窗外的风声挺舒服……”把脑海里积攒的情绪垃圾一股脑倾倒在纸面上。写完合上，大脑会体验到前所未有的轻盈。

### 暮光反思清单
每晚睡前，问自己三个小问题：
1. 今天我勇敢表达了哪一句真话？
2. 哪个时刻让我感受到了身体的温柔？
3. 我想宽恕自己今天的哪一件未尽之事？`,
    contentEn: `Mindful writing frameworks to declutter mental residue and cultivate sovereign inner reflection.`,
    categoryZh: '书写疗愈',
    categoryEn: 'Journaling',
    readTimeMinutes: 6,
    authorZh: '顾知微 老师',
    authorEn: 'Zhiwei Gu',
    publishDate: '2026-10-06',
    tagsZh: ['晨间日记', '书写疗愈', '自我对话', '睡前反思'],
    tagsEn: ['Morning Pages', 'Therapeutic Writing', 'Mindfulness'],
    relatedChakra: 'sacral',
    views: 3890
  },
  {
    id: 'art-6',
    titleZh: '如何打造属于你的居家神圣静修角（Sacred Corner）',
    titleEn: 'Creating Your Home Sacred Sanctuary: Minimalism, Scent and Ambient Qi',
    excerptZh: '不需要豪宅或佛堂。一张木几、一盏暖光灯、一抹檀香与一把坐垫，便能锚定你每日重返中心的心灵磁场。',
    excerptEn: 'A modest corner with honest materials, dim lighting, and curated aromatics anchors daily presence.',
    contentZh: `## 空间对意识的反向塑造

心理学上的“情境依恋”告诉我们：环境的物理属性会潜移默化地触发特定的大脑神经网络。如果你的卧室同时充斥着电脑屏幕、未收纳的外卖和待洗的衣物，神经系统便很难切换至深度休眠状态。

### 营造静修角的四步法
1. **纯粹用途**：在这个角落里，严禁处理工作、打电话或刷短视频。它只服务于冥想、抽牌、静坐和深呼吸；
2. **五感关照**：
   - **触觉**：亚麻或纯棉坐垫，触感温润扎实；
   - **嗅觉**：天然雪松、乳香或佛手柑精油；
   - **听觉**：一台不带屏幕的声波发生器或优质蓝牙音箱；
   - **视觉**：摒弃刺眼的冷白顶灯，使用2700K暖黄泛光灯或天然蜂蜡蜡烛。`,
    contentEn: `Practical interior environmental design for everyday mindfulness and sensory grounding.`,
    categoryZh: '生活禅意',
    categoryEn: 'Zen Living',
    readTimeMinutes: 5,
    authorZh: '林清芷 老师',
    authorEn: 'Qingzhi Lin',
    publishDate: '2026-10-09',
    tagsZh: ['静修角', '空间美学', '芳疗', '生活仪式感'],
    tagsEn: ['Sacred Space', 'Zen Interior', 'Sensory Wellness'],
    relatedChakra: 'crown',
    views: 5120
  },
  {
    id: 'art-7',
    titleZh: '断食数字噪音：现代人的信息多巴胺排毒实验',
    titleEn: 'Digital Dopamine Detox: Unplugging from Algorithmic Overstimulation',
    excerptZh: '每一次红点提醒都在微弱地撕裂你的专注力。如何在一个被算法严密监控的时代，重新夺回注意力的主权？',
    excerptEn: 'Reclaiming sovereign attention and baseline dopamine sensitivity in an era of hyper-optimized algorithmic feeds.',
    contentZh: `## 注意力是这个时代最昂贵的货币

当社交软件的工程师利用可变奖励机制（Variable Reward）精密计算如何吞噬你的每一秒注意力时，人类古老的脑回路正在经历史无前例的超载。

### 多巴胺枯竭的典型症状
- 哪怕只有5秒钟的电梯等待，也会本能地掏出手机；
- 无法读完一篇超过1000字的深度长文；
- 即使非常疲劳，躺在床上依然机械地下滑视频直至凌晨；
- 对自然界的微风、食物的原味感到索然无味。

### 48小时数字断食行动
挑一个周末，提前向家人报备：将手机调成黑白灰度显示，放入抽屉。换上一双舒适的跑鞋，走进最近的森林或公园。让眼睛重新适应非发光物体的漫反射，感受多巴胺基准线的自然回弹。`,
    contentEn: `Strategies for liberating mental bandwidth and recalibrating dopamine reward baselines.`,
    categoryZh: '心智觉醒',
    categoryEn: 'Mental Sovereignty',
    readTimeMinutes: 7,
    authorZh: '姜若愚 老师',
    authorEn: 'Master Ruoyu Jiang',
    publishDate: '2026-10-12',
    tagsZh: ['数字排毒', '多巴胺', '注意力主权', '深度专注'],
    tagsEn: ['Dopamine Detox', 'Digital Wellness', 'Focus'],
    relatedChakra: 'solar_plexus',
    views: 6890
  },
  {
    id: 'art-8',
    titleZh: '慈悲的边界：如何避免在灵修与利他中沦为“情绪垃圾桶”',
    titleEn: 'The Compassionate Boundary: Preventing Empathic Fatigue and Spiritual Bypassing',
    excerptZh: '真正的慈悲带有澄明的剑气。没有边界的善良只是被伪装的讨好，守护好你的心轮能量场。',
    excerptEn: 'True compassion holds clear swords. Unbounded empathy is often people-pleasing in disguise.',
    contentZh: `## 区分同理心（Empathy）与情绪吸收（Absorption）

许多高敏感人群（HSP）和灵性探索者常常陷入一种困境：走进一个充满怨气的房间，自己的胸口就会发闷；听完朋友的哭诉，自己整整三天缓不过神来。

### 灵性逃避（Spiritual Bypassing）的陷阱
“我要无条件爱所有人”、“我不能说‘不’，否则我就不具有灵性”——这类信念实际上是一种隐蔽的自我暴力。

### 守护能量场的金刚法门
1. **观想能量光罩**：在接触负能量密集的环境前，深吸气，观想自己周身被一层温和而坚韧的翡翠色或金白光罩包裹。外界的情绪可以被你看见，但无法穿透光罩侵蚀你的核心；
2. **清晰的言语边界**：“我非常在乎你，但此刻我的能量不足以承载这么沉重的话题，我们明天再聊好吗？”
3. **离开后的净化仪式**：洗手、抖动四肢，将不属于你的能量归还给大地。`,
    contentEn: `Essential boundaries for empaths, highly sensitive persons, and compassionate listeners.`,
    categoryZh: '能量防护',
    categoryEn: 'Energetic Protection',
    readTimeMinutes: 6,
    authorZh: '苏念真 老师 & 米拉·帕特尔',
    authorEn: 'Master Nianzhen Su & Mira Patel',
    publishDate: '2026-10-15',
    tagsZh: ['高敏感人群', '健康边界', '共情疲劳', '能量守护'],
    tagsEn: ['Empath Boundaries', 'Heart Health', 'Spiritual Integrity'],
    relatedChakra: 'heart',
    views: 9420
  }
];

// ==========================================
// 6. 3 SAMPLE COURSES
// ==========================================
export const SEED_COURSES: Course[] = [
  {
    id: 'course-1',
    titleZh: '藏传颂钵与身心声波重塑大师课',
    titleEn: 'Tibetan Sound Bowls & Somatic Frequency Mastery',
    subtitleZh: '8节系统进阶视频与音频实操，掌握用声波调频自愈的完整艺术',
    subtitleEn: '8 structured immersive modules mastering sound healing for modern nervous balance.',
    mentorId: 'mentor-1',
    mentorName: '苏念真 老师',
    levelZh: '零基础至进阶',
    levelEn: 'All Levels',
    creditsRequired: 60,
    totalHours: 4.5,
    lessonsCount: 8,
    rating: 4.96,
    studentsCount: 1420,
    coverGradient: ['#8C3B32', '#3A7D5C'],
    modules: [
      { id: 'c1-m1', titleZh: '第一讲：声波医学基石——声音如何重组细胞水分子', titleEn: 'Lesson 1: Foundations of Sound Medicine & Cellular Resonance', durationMinutes: 28, type: 'video' },
      { id: 'c1-m2', titleZh: '第二讲：认识颂钵形制——满月钵、手工老钵与七脉轮频率对应', titleEn: 'Lesson 2: Anatomy of Himalayan Bowls & Chakra Correspondences', durationMinutes: 35, type: 'video' },
      { id: 'c1-m3', titleZh: '第三讲：击钵与磨钵实操——从生硬摩擦到绵长共振的持锤心法', titleEn: 'Lesson 3: Striking & Friction Mastery: Mindful Mallet Technique', durationMinutes: 42, type: 'practice' },
      { id: 'c1-m4', titleZh: '第四讲：下三轮固本冥想——消除底层物质生存恐惧 (396Hz 实战)', titleEn: 'Lesson 4: Lower Three Chakras Grounding Meditation (396Hz Focus)', durationMinutes: 30, type: 'audio' },
      { id: 'c1-m5', titleZh: '第五讲：心轮创伤溶解——翡翠声波释放压抑情绪', titleEn: 'Lesson 5: Heart Center Dissolution of Suppressed Grief', durationMinutes: 36, type: 'audio' },
      { id: 'c1-m6', titleZh: '第六讲：为亲友做一次完整的居家声疗床铺仪式', titleEn: 'Lesson 6: Conducting a Full Bedside Sound Session for Loved Ones', durationMinutes: 45, type: 'video' },
      { id: 'c1-m7', titleZh: '第七讲：空间声场净化与个人能量防护结界', titleEn: 'Lesson 7: Environmental Sonic Cleansing & Auric Shielding', durationMinutes: 30, type: 'practice' },
      { id: 'c1-m8', titleZh: '第八讲：合钵回响——整合身心，开启每日声波疗愈微习惯', titleEn: 'Lesson 8: Final Resonance: Integrating Daily Sound Rituals', durationMinutes: 24, type: 'reading' }
    ]
  },
  {
    id: 'course-2',
    titleZh: '七脉轮全面觉醒与道家吐纳筑基',
    titleEn: 'Chakra Energetics & Daoist Breathwork Alchemy',
    subtitleZh: '融汇东西方古老智慧，建立气脉通畅、神定气足的充盈生命体',
    subtitleEn: 'Bridging Eastern Daoist cultivation and Indian chakra physiology for vitality.',
    mentorId: 'mentor-2',
    mentorName: '陈玄一 导师',
    levelZh: '中级实修',
    levelEn: 'Intermediate',
    creditsRequired: 75,
    totalHours: 5.2,
    lessonsCount: 7,
    rating: 4.98,
    studentsCount: 980,
    coverGradient: ['#945D14', '#2C7A87'],
    modules: [
      { id: 'c2-m1', titleZh: '第一讲：气与脉轮——经络与能量涡流的互通全景图', titleEn: 'Lesson 1: The Biofield Map: Meridians and Energy Vortices', durationMinutes: 40, type: 'video' },
      { id: 'c2-m2', titleZh: '第二讲：顺腹式呼吸与逆腹式呼吸——激活丹田与海底轮', titleEn: 'Lesson 2: Abdominal Breath Dynamics: Awakening the Dantian', durationMinutes: 38, type: 'practice' },
      { id: 'c2-m3', titleZh: '第三讲：水火既济——降心火、升肾水，平息焦虑失眠', titleEn: 'Lesson 3: Alchemy of Water and Fire: Calming Shen & Restoring Sleep', durationMinutes: 45, type: 'audio' },
      { id: 'c2-m4', titleZh: '第四讲：中脉七轮贯通导引——从会阴到百会的能量流注', titleEn: 'Lesson 4: Central Channel Circulation: Perineum to Crown', durationMinutes: 50, type: 'audio' },
      { id: 'c2-m5', titleZh: '第五讲：日常微站桩——利用重力完成深层骨骼回正', titleEn: 'Lesson 5: Micro-Zhan Zhuang: Aligning Skeletal Posture', durationMinutes: 32, type: 'video' },
      { id: 'c2-m6', titleZh: '第六讲：六字诀发音疗法——以特定气流震荡五脏六腑', titleEn: 'Lesson 6: The Six Healing Sounds for Visceral Detox', durationMinutes: 35, type: 'practice' },
      { id: 'c2-m7', titleZh: '第七讲：功成身退——在现代职场中时刻保持“守中”状态', titleEn: 'Lesson 7: Walking Zen: Remaining Centered in Corporate Chaos', durationMinutes: 30, type: 'reading' }
    ]
  },
  {
    id: 'course-3',
    titleZh: '正念神经科学与高压情绪脱敏',
    titleEn: 'Neuroscience of Mindfulness & Somatic De-Stressing',
    subtitleZh: '6周科学实证方案，重塑大脑前额叶皮层，终结过度思考与情绪内耗',
    subtitleEn: 'Evidence-based 6-week blueprint rewiring the prefrontal cortex and reducing rumination.',
    mentorId: 'mentor-3',
    mentorName: '艾琳娜·沃克博士',
    levelZh: '初级入门',
    levelEn: 'Beginner',
    creditsRequired: 50,
    totalHours: 3.8,
    lessonsCount: 6,
    rating: 4.97,
    studentsCount: 2310,
    coverGradient: ['#282347', '#483D8B'],
    modules: [
      { id: 'c3-m1', titleZh: '第一周：被绑架的注意力——默认网络模式（DMN）与内耗真相', titleEn: 'Week 1: The Hijacked Brain: Default Mode Network & Rumination', durationMinutes: 35, type: 'video' },
      { id: 'c3-m2', titleZh: '第二周：身体扫描实操——从大脑思维切换至纯粹体感感知', titleEn: 'Week 2: Somatic Body Scanning: From Thinking to Feeling', durationMinutes: 30, type: 'audio' },
      { id: 'c3-m3', titleZh: '第三周：与艰难情绪共处——RAIN原则（识别、允许、探究、非认同）', titleEn: 'Week 3: The RAIN Method for Difficult Emotions', durationMinutes: 45, type: 'practice' },
      { id: 'c3-m4', titleZh: '第四周：前额叶重塑——如何将冲动反应转化为觉察回应', titleEn: 'Week 4: Executive Control: Responding vs. Reacting', durationMinutes: 32, type: 'video' },
      { id: 'c3-m5', titleZh: '第五周：职场微正念——开会前、发邮件前的30秒呼吸锚定', titleEn: 'Week 5: Workplace Micro-Practices: 30-Second Pauses', durationMinutes: 25, type: 'reading' },
      { id: 'c3-m6', titleZh: '第六周：自我慈悲——给内在挑剔者一份最温柔的解雇信', titleEn: 'Week 6: Fierce Self-Compassion: Retiring the Inner Critic', durationMinutes: 40, type: 'audio' }
    ]
  }
];

// ==========================================
// 7. 3 GUIDED JOURNEYS
// ==========================================
export const SEED_JOURNEYS: GuidedJourney[] = [
  {
    id: 'journey-morning',
    titleZh: '晨光扎根与意志觉醒·20分钟唤醒旅程',
    titleEn: 'Morning Grounding & Will Awakening · 20 Min Flow',
    descriptionZh: '从沉睡的蒙昧中平稳过渡到充满朝气的清醒状态，包含深呼吸、原初卡牌指引与意图设定。',
    descriptionEn: 'A 5-step ceremonial morning alignment: somatic breath, resonant audio, card reflection, and intention journaling.',
    durationEstimateZh: '约 15-20 分钟',
    durationEstimateEn: 'Approx 15-20 mins',
    theme: '晨间苏醒 / 明确意向 / 注入充沛活力',
    chakra: 'solar_plexus',
    badgeZh: '朝阳先锋',
    badgeEn: 'Sunward Pioneer',
    steps: [
      {
        stepIndex: 1,
        type: 'intro',
        titleZh: '步骤一：放下旧梦，回归当下呼吸',
        titleEn: 'Step 1: Arriving into Conscious Awakening',
        descriptionZh: '请找到舒适的坐姿，脊椎自然延展，闭上眼睛，深深吸气填满整个胸腹，长长吐气将夜间沉淀的浊气呼出。'
      },
      {
        stepIndex: 2,
        type: 'audio',
        titleZh: '步骤二：聆听 10Hz 阿尔法晨光脑波',
        titleEn: 'Step 2: 10Hz Morning Alpha Entrainment',
        descriptionZh: '戴上耳机，让轻快的脑波频率同步双侧大脑，驱散晨起脑雾。',
        audioTrackId: 'music-9',
        durationSeconds: 180
      },
      {
        stepIndex: 3,
        type: 'card',
        titleZh: '步骤三：抽取今日生命意图卡',
        titleEn: 'Step 3: Draw Today’s Intention Oracle Card',
        descriptionZh: '轻触屏幕洗牌，深呼吸，请求潜意识赋予今日最关键的觉知指引。'
      },
      {
        stepIndex: 4,
        type: 'journal',
        titleZh: '步骤四：写下今日核心承诺',
        titleEn: 'Step 4: Journaling Today’s Keystone Affirmation',
        descriptionZh: '基于抽取的卡牌智慧，在下方写下一句今天你愿意恪守的真诚承诺。'
      },
      {
        stepIndex: 5,
        type: 'closing',
        titleZh: '步骤五：带光前行，开启美好一天',
        titleEn: 'Step 5: Sealed with Grace and Vital Purpose',
        descriptionZh: '将双手叠放在胸口，感受心脏有力的跳动。你已全副武装，平静而笃定地走进世界。'
      }
    ]
  },
  {
    id: 'journey-heart',
    titleZh: '心轮慈悲与情绪释放·30分钟自我疗愈之旅',
    titleEn: 'Heart Compassion & Emotional Softening · 30 Min Healing',
    descriptionZh: '融化胸腔紧绷的硬壳，释放积累的情感委屈与疲惫，重拾被世界温柔相待的信心。',
    descriptionEn: 'Melt accumulated emotional friction, release judgment, and bathe in restorative heart frequency.',
    durationEstimateZh: '约 25-30 分钟',
    durationEstimateEn: 'Approx 25-30 mins',
    theme: '自我接纳 / 宽恕释怀 / 修复心防',
    chakra: 'heart',
    badgeZh: '翡翠心泉',
    badgeEn: 'Emerald Healer',
    steps: [
      {
        stepIndex: 1,
        type: 'intro',
        titleZh: '步骤一：营造安全的自我包容空间',
        titleEn: 'Step 1: Opening the Sacred Safe Harbor',
        descriptionZh: '允许自己在这个半小时内脆弱、不设防。在这里，你不需要向任何人证明什么。'
      },
      {
        stepIndex: 2,
        type: 'audio',
        titleZh: '步骤二：沉浸于 639Hz 慈悲共振',
        titleEn: 'Step 2: Immerse in 639Hz Heart Harmonics',
        descriptionZh: '聆听水晶颂钵与空灵弦乐，观想一抹温润的翡翠绿光环绕着心包区。',
        audioTrackId: 'music-4',
        durationSeconds: 300
      },
      {
        stepIndex: 3,
        type: 'card',
        titleZh: '步骤三：抽取心轮镜映神谕卡',
        titleEn: 'Step 3: Oracle Reflection for the Heart',
        descriptionZh: '探索此刻你最需要原谅、接纳或松绑的情感命题。'
      },
      {
        stepIndex: 4,
        type: 'journal',
        titleZh: '步骤四：倾诉给自己的未尽之言',
        titleEn: 'Step 4: The Uncensored Letter to Yourself',
        descriptionZh: '写下那些你一直藏在心里没有对人说过的委屈或渴望，允许眼泪成为天然的洗涤。'
      },
      {
        stepIndex: 5,
        type: 'closing',
        titleZh: '步骤五：合十致谢，心灵归于安宁',
        titleEn: 'Step 5: Closing Blessing & Integration',
        descriptionZh: '轻轻给自己一个温暖的拥抱，对自己说：“谢谢你，我一直在这里陪着你。”'
      }
    ]
  },
  {
    id: 'journey-sleep',
    titleZh: '万念归息·德尔塔波夜间入眠之旅',
    titleEn: 'Twilight Stillness · Deep Delta Sleep Induction',
    descriptionZh: '关闭一整天高速运转的思维处理器，借助深雨声与神谕放下执念，滑入甜美深睡。',
    descriptionEn: 'Gently disconnect the analytical mind and transition peacefully into dreamless restorative rest.',
    durationEstimateZh: '约 20 分钟（随后自发睡去）',
    durationEstimateEn: 'Approx 20 mins (into sleep)',
    theme: '松脱大脑 / 卸下责任 / 深度无梦安眠',
    chakra: 'crown',
    badgeZh: '夜星守望者',
    badgeEn: 'Nightwatcher',
    steps: [
      {
        stepIndex: 1,
        type: 'intro',
        titleZh: '步骤一：完成今日的“能量结账”',
        titleEn: 'Step 1: Daily Energetic Checkout',
        descriptionZh: '将手机调为勿扰模式，灯光调暗。告诉自己：今天的任务已然结束，未完成的事留给明天的晨光。'
      },
      {
        stepIndex: 2,
        type: 'audio',
        titleZh: '步骤二：深林夜雨与 1.5Hz 德尔塔波',
        titleEn: 'Step 2: Nocturnal Rain & 1.5Hz Delta Beats',
        descriptionZh: '伴随着大自然的真实雨声与舒缓波段，神经系统从交感神经彻底切换至副交感神经。',
        audioTrackId: 'music-8',
        durationSeconds: 360
      },
      {
        stepIndex: 3,
        type: 'card',
        titleZh: '步骤三：抽取一张“安眠守护卡”',
        titleEn: 'Step 3: Draw a Night Sanctuary Card',
        descriptionZh: '让一个柔和的梦境意象陪伴你度过黑夜。'
      },
      {
        stepIndex: 4,
        type: 'journal',
        titleZh: '步骤四：三件感恩小事记录',
        titleEn: 'Step 4: Three Micro-Gratitudes',
        descriptionZh: '哪怕只是一杯好喝的咖啡、一阵凉风或一次友善的微笑，把美好作为入梦的最后印记。'
      },
      {
        stepIndex: 5,
        type: 'closing',
        titleZh: '步骤五：沉入大地的摇篮',
        titleEn: 'Step 5: Surrendering into the Great Cradle',
        descriptionZh: '闭上眼睛，感觉身体越来越沉、越来越轻，直到完全融化在安稳的梦乡中……'
      }
    ]
  }
];

// ==========================================
// 8. 30+ FICTIONAL TRANSACTIONS FOR LEDGER
// ==========================================
export const SEED_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-001',
    timestamp: '2026-10-18 14:20:10',
    userId: 'user-demo',
    userName: '演示体验官 (当前用户)',
    type: 'bonus',
    amountCredits: 100,
    status: 'success',
    descriptionZh: '【演示体验】新用户注册赠送 100 觉知能量积分',
    descriptionEn: '[Demo] New user welcome grant of 100 awareness credits'
  },
  {
    id: 'tx-002',
    timestamp: '2026-10-18 11:15:30',
    userId: 'user-02',
    userName: '林清音',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '深度三牌阵占读消耗积分 (过去·现在·未来)',
    descriptionEn: 'Deep 3-card spread reading credit deduction'
  },
  {
    id: 'tx-003',
    timestamp: '2026-10-18 10:45:12',
    userId: 'user-03',
    userName: '李维安',
    type: 'extended_ai',
    amountCredits: -10,
    status: 'success',
    descriptionZh: 'AI 觉知向导多轮深度对话模拟消耗',
    descriptionEn: 'AI Consciousness Guide simulated multi-turn reflection'
  },
  {
    id: 'tx-004',
    timestamp: '2026-10-18 09:30:00',
    userId: 'user-04',
    userName: '张子默',
    type: 'credit_purchase',
    amountCredits: 200,
    cashAmountRmb: 198,
    status: 'success',
    descriptionZh: '购买觉知探索家充值包 (模拟结算)',
    descriptionEn: 'Purchased Explorer Credits Pack (Mock payment)'
  },
  {
    id: 'tx-005',
    timestamp: '2026-10-17 21:18:40',
    userId: 'user-05',
    userName: '宋雅文',
    type: 'mentor_booking',
    amountCredits: -80,
    status: 'success',
    descriptionZh: '预约苏念真老师 1对1 颂钵声疗与神谕个案 (模拟)',
    descriptionEn: 'Booked 1-on-1 sound healing consultation with Master Su'
  },
  {
    id: 'tx-006',
    timestamp: '2026-10-17 19:40:22',
    userId: 'user-06',
    userName: '赵云深',
    type: 'course_enroll',
    amountCredits: -60,
    status: 'success',
    descriptionZh: '订阅《藏传颂钵与身心声波重塑大师课》',
    descriptionEn: 'Enrolled in Tibetan Sound Bowls & Somatic Frequency Mastery'
  },
  {
    id: 'tx-007',
    timestamp: '2026-10-17 16:22:15',
    userId: 'user-07',
    userName: '周安然',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '三牌阵：心轮课题与亲密关系解构',
    descriptionEn: '3-card spread: Heart chakra and relationship blocks'
  },
  {
    id: 'tx-008',
    timestamp: '2026-10-17 14:10:05',
    userId: 'user-08',
    userName: '王若凡',
    type: 'extended_ai',
    amountCredits: -10,
    status: 'success',
    descriptionZh: 'AI 向导：眉心轮梦境隐喻分析模拟',
    descriptionEn: 'AI Guide: Third-eye dream metaphor analysis'
  },
  {
    id: 'tx-009',
    timestamp: '2026-10-17 11:05:49',
    userId: 'user-09',
    userName: '钱书航',
    type: 'credit_purchase',
    amountCredits: 500,
    cashAmountRmb: 468,
    status: 'success',
    descriptionZh: '购买觉醒守护者年享积分包 (模拟)',
    descriptionEn: 'Purchased Guardian Annual Credits Pack (Mock)'
  },
  {
    id: 'tx-010',
    timestamp: '2026-10-16 22:30:11',
    userId: 'user-10',
    userName: '陈语堂',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '深度三牌阵：职场转型与天命意向',
    descriptionEn: 'Deep 3-card spread: Career pivoting and vocation'
  },
  {
    id: 'tx-011',
    timestamp: '2026-10-16 20:15:00',
    userId: 'user-11',
    userName: '徐知意',
    type: 'mentor_booking',
    amountCredits: -90,
    status: 'success',
    descriptionZh: '预约陈玄一导师 道家吐纳与下三轮调理个案',
    descriptionEn: 'Booked Daoist Breathwork & Root Chakra consultation'
  },
  {
    id: 'tx-012',
    timestamp: '2026-10-16 18:44:30',
    userId: 'user-12',
    userName: '何秋水',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '三牌阵：放下执念与身心松绑',
    descriptionEn: '3-card spread: Releasing fixation and somatic ease'
  },
  {
    id: 'tx-013',
    timestamp: '2026-10-16 15:20:18',
    userId: 'user-13',
    userName: '白浅月',
    type: 'course_enroll',
    amountCredits: -50,
    status: 'success',
    descriptionZh: '订阅《正念神经科学与高压情绪脱敏》',
    descriptionEn: 'Enrolled in Neuroscience of Mindfulness'
  },
  {
    id: 'tx-014',
    timestamp: '2026-10-16 12:10:04',
    userId: 'user-14',
    userName: '董天明',
    type: 'credit_purchase',
    amountCredits: 100,
    cashAmountRmb: 98,
    status: 'success',
    descriptionZh: '购买体验积分包 (模拟)',
    descriptionEn: 'Purchased Starter Credits Pack (Mock)'
  },
  {
    id: 'tx-015',
    timestamp: '2026-10-15 23:45:10',
    userId: 'user-15',
    userName: '方思齐',
    type: 'extended_ai',
    amountCredits: -10,
    status: 'success',
    descriptionZh: 'AI 向导：睡前情绪梳理与催眠诱导模拟',
    descriptionEn: 'AI Guide: Bedtime emotional release simulation'
  },
  {
    id: 'tx-016',
    timestamp: '2026-10-15 21:04:33',
    userId: 'user-16',
    userName: '彭佳乐',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '深度三牌阵：财富丰盛与潜能矿脉挖掘',
    descriptionEn: 'Deep 3-card spread: Wealth abundance and inner resources'
  },
  {
    id: 'tx-017',
    timestamp: '2026-10-15 19:12:00',
    userId: 'user-17',
    userName: '陆星辰',
    type: 'mentor_booking',
    amountCredits: -100,
    status: 'success',
    descriptionZh: '预约艾琳娜·沃克博士 领导力正念觉知咨询',
    descriptionEn: 'Booked leadership mindfulness session with Dr. Walker'
  },
  {
    id: 'tx-018',
    timestamp: '2026-10-15 16:30:20',
    userId: 'user-18',
    userName: '崔雪晴',
    type: 'credit_purchase',
    amountCredits: 200,
    cashAmountRmb: 198,
    status: 'success',
    descriptionZh: '购买探索家充值包 (模拟)',
    descriptionEn: 'Purchased Explorer Pack (Mock)'
  },
  {
    id: 'tx-019',
    timestamp: '2026-10-14 22:18:05',
    userId: 'user-19',
    userName: '谢文瀚',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '三牌阵：喉轮真理与沟通瓶颈破局',
    descriptionEn: '3-card spread: Throat chakra and authentic truth'
  },
  {
    id: 'tx-020',
    timestamp: '2026-10-14 20:00:19',
    userId: 'user-20',
    userName: '沈静姝',
    type: 'course_enroll',
    amountCredits: -75,
    status: 'success',
    descriptionZh: '订阅《七脉轮全面觉醒与道家吐纳筑基》',
    descriptionEn: 'Enrolled in Chakra Energetics & Daoist Breathwork'
  },
  {
    id: 'tx-021',
    timestamp: '2026-10-14 17:45:00',
    userId: 'user-21',
    userName: '邓晓峰',
    type: 'bonus',
    amountCredits: 30,
    status: 'success',
    descriptionZh: '完成连续7天晨间冥想打卡奖励',
    descriptionEn: 'Bonus: 7-day continuous morning meditation streak'
  },
  {
    id: 'tx-022',
    timestamp: '2026-10-14 14:12:12',
    userId: 'user-22',
    userName: '梁佩瑶',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '三牌阵：本我轮创造力与亲密关系滋养',
    descriptionEn: '3-card spread: Sacral creativity and intimacy'
  },
  {
    id: 'tx-023',
    timestamp: '2026-10-13 21:55:04',
    userId: 'user-23',
    userName: '任子晴',
    type: 'extended_ai',
    amountCredits: -10,
    status: 'success',
    descriptionZh: 'AI 向导：焦虑情绪解离与身体扫描引导',
    descriptionEn: 'AI Guide: Anxiety grounding and body scan'
  },
  {
    id: 'tx-024',
    timestamp: '2026-10-13 18:20:10',
    userId: 'user-24',
    userName: '高宇恒',
    type: 'credit_purchase',
    amountCredits: 500,
    cashAmountRmb: 468,
    status: 'success',
    descriptionZh: '购买守护者积分包 (模拟)',
    descriptionEn: 'Purchased Guardian Credits Pack (Mock)'
  },
  {
    id: 'tx-025',
    timestamp: '2026-10-13 15:10:00',
    userId: 'user-25',
    userName: '卢映雪',
    type: 'mentor_booking',
    amountCredits: -80,
    status: 'success',
    descriptionZh: '预约顾知微老师 潜意识释梦与叙事疗愈个案',
    descriptionEn: 'Booked narrative dreamwork session with Zhiwei Gu'
  },
  {
    id: 'tx-026',
    timestamp: '2026-10-12 22:30:40',
    userId: 'user-26',
    userName: '钟楚然',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '深度三牌阵：太阳轮意志与行动力激活',
    descriptionEn: '3-card spread: Solar plexus willpower and decisive action'
  },
  {
    id: 'tx-027',
    timestamp: '2026-10-12 19:40:12',
    userId: 'user-27',
    userName: '傅晓棠',
    type: 'card_reading',
    amountCredits: -20,
    status: 'success',
    descriptionZh: '三牌阵：海底轮物质安全感与扎根根基',
    descriptionEn: '3-card spread: Root chakra stability and grounding'
  },
  {
    id: 'tx-028',
    timestamp: '2026-10-12 14:15:33',
    userId: 'user-28',
    userName: '万成浩',
    type: 'credit_purchase',
    amountCredits: 100,
    cashAmountRmb: 98,
    status: 'success',
    descriptionZh: '购买体验积分包 (模拟)',
    descriptionEn: 'Purchased Starter Credits Pack (Mock)'
  },
  {
    id: 'tx-029',
    timestamp: '2026-10-11 20:10:00',
    userId: 'user-29',
    userName: '丁悦宁',
    type: 'mentor_booking',
    amountCredits: -85,
    status: 'success',
    descriptionZh: '预约米拉·帕特尔老师 阿育吠陀体质与脉轮评估',
    descriptionEn: 'Booked Ayurvedic constitution and chakra typing'
  },
  {
    id: 'tx-030',
    timestamp: '2026-10-11 16:04:19',
    userId: 'user-30',
    userName: '常远山',
    type: 'bonus',
    amountCredits: 20,
    status: 'success',
    descriptionZh: '完成《七脉轮知识自测答卷》全对奖励',
    descriptionEn: 'Bonus: Completed Chakra Quiz with full score'
  }
];

// ==========================================
// 9. 4 SEEDED READING HISTORIES
// ==========================================
export const SEED_READING_HISTORIES: CardReadingRecord[] = [
  {
    id: 'rd-001',
    timestamp: '2026-10-17 21:40',
    type: 'one_card',
    questionZh: '在近期的重大职业转型期中，我该如何安顿内心的焦虑？',
    questionEn: 'How can I navigate anxiety during my recent career transition?',
    cards: [
      {
        card: SEED_ORACLE_CARDS[0], // 大地基石
        positionZh: '核心启示',
        positionEn: 'Core Revelation',
        isReversed: false
      }
    ],
    aiSynthesisZh: '【DEMO SIMULATION 演示模拟】「大地基石」提醒你：外界的职业身份不过是风中的外衣，真正托举你的是你早已扎根多年的专业底蕴与生存韧性。此刻无需追逐虚幻的完美保证，深呼吸，踩实脚下的每一步，信任大地的恒常支持。',
    aiSynthesisEn: '[DEMO SIMULATION] "The Prime Bedrock" reminds you that titles are external cloaks; your innate resilience is the real anchor. Trust the solid ground beneath you.',
    recommendedTrackId: 'music-1',
    journalNotes: '读完心里踏实多了，确实把焦虑放大了，今晚听396Hz早点睡觉。',
    savedToFavorites: true
  },
  {
    id: 'rd-002',
    timestamp: '2026-10-16 15:20',
    type: 'three_card',
    questionZh: '我在一段亲密关系中感到疲惫与隔阂，背后的症结究竟是什么？',
    questionEn: 'Why do I feel emotionally exhausted in my relationship?',
    cards: [
      {
        card: SEED_ORACLE_CARDS[11], // 潮汐起伏
        positionZh: '过去根源',
        positionEn: 'Past Roots',
        isReversed: false
      },
      {
        card: SEED_ORACLE_CARDS[33], // 无垢莲池 / 心轮
        positionZh: '当下核心',
        positionEn: 'Current Core',
        isReversed: false
      },
      {
        card: SEED_ORACLE_CARDS[44], // 真理号角 / 喉轮
        positionZh: '未来指引',
        positionEn: 'Future Guidance',
        isReversed: false
      }
    ],
    aiSynthesisZh: '【DEMO SIMULATION 演示模拟】过去的情感起伏耗损了你太多精力，导致心轮为了自保而悄然筑起高墙。当下的破局之钥在于喉轮的「真理号角」——停止用沉默或冷战惩罚彼此，以不攻击、不讨好的方式，诚实说出你内在最真实的渴望与界限。',
    aiSynthesisEn: '[DEMO SIMULATION] Past emotional volatility made your heart defensive. The synthesis calls on Vishuddha’s clarion truth: speak your raw needs clearly without passive aggression.',
    recommendedTrackId: 'music-4',
    journalNotes: '下周找个安静的下午，真诚跟他开诚布公聊一聊自己的真实想法。',
    savedToFavorites: true
  },
  {
    id: 'rd-003',
    timestamp: '2026-10-15 08:30',
    type: 'one_card',
    questionZh: '今日晨间意图：我需要为今天设定怎样的觉知基调？',
    questionEn: 'Morning Intention: What energy should I embody today?',
    cards: [
      {
        card: SEED_ORACLE_CARDS[22], // 金乌初升 / 太阳轮
        positionZh: '今日向导',
        positionEn: 'Daily Guide',
        isReversed: false
      }
    ],
    aiSynthesisZh: '【DEMO SIMULATION 演示模拟】「金乌初升」带来太阳神经丛的蓬勃生机。今天适合主动出击，敲定那件拖延已久的决策。阳光之下没有阴霾，勇敢而从容地展现你的才能，你是被全然赋权的。',
    aiSynthesisEn: '[DEMO SIMULATION] "Rising Sun" infuses vibrant willpower. Tackle overdue decisions boldly and step proudly into the spotlight today.',
    recommendedTrackId: 'music-3',
    journalNotes: '今天上午完成了年度项目规划的最终版并顺利提交！',
    savedToFavorites: false
  },
  {
    id: 'rd-004',
    timestamp: '2026-10-13 22:10',
    type: 'one_card',
    questionZh: '如何放下对某个未完成事情的持续精神内耗？',
    questionEn: 'How can I release persistent rumination over unfinished tasks?',
    cards: [
      {
        card: SEED_ORACLE_CARDS[5], // 深冬沉睡
        positionZh: '安抚之光',
        positionEn: 'Soothing Light',
        isReversed: false
      }
    ],
    aiSynthesisZh: '【DEMO SIMULATION 演示模拟】大自然在深冬从不因万木凋零而感到羞愧。「深冬沉睡」提醒你，停滞正是孕育新生的必经休眠期。允许这件事暂时停留在未完成的状态，把今晚还给安眠。',
    aiSynthesisEn: '[DEMO SIMULATION] Nature never apologizes for winter dormancy. Allow things to rest unfinished; surrender the night to restorative sleep.',
    recommendedTrackId: 'music-8',
    journalNotes: '关机睡觉。大自然都不急，我急什么。',
    savedToFavorites: true
  }
];

// ==========================================
// 10. MEMBERSHIP TIERS (ILLUSTRATIVE DEMO PRICING)
// ==========================================
export const DEMO_MEMBERSHIP_TIERS = [
  {
    id: 'tier-free',
    nameZh: '觉知探索者 (免费版)',
    nameEn: 'Mindful Seeker (Free)',
    priceMonthlyRmb: 0,
    priceAnnualRmb: 0,
    creditsPerMonth: 50,
    featuresZh: [
      '每日 1 次原初神谕单牌占读 (0积分)',
      '全站 12 首基础调频音乐无限畅听',
      '七脉轮身心百科与知识库免费阅读',
      '基础冥想计时器与呼吸引导'
    ],
    featuresEn: [
      '1 Free Single-Card Oracle Reading per day',
      'Unlimited stream of 12 frequency tracks',
      'Full access to Chakra encyclopedia & articles',
      'Basic meditation timer & breath pacer'
    ],
    badgeZh: '新手入门',
    badgeEn: 'Starter',
    isPopular: false
  },
  {
    id: 'tier-premium',
    nameZh: '心境同频者 (尊享会员)',
    nameEn: 'Soulscape Resonance (Premium)',
    priceMonthlyRmb: 48,
    priceAnnualRmb: 398,
    creditsPerMonth: 300,
    featuresZh: [
      '每月赠送 300 觉知能量积分 (价值 288元)',
      '无限制 88 张原初神谕深度三牌阵占读',
      'AI 觉知向导多轮深度对话模拟与梦境解析',
      '高保真 24-bit 无损脉轮音频与双耳节拍全开',
      '3 套大师大师课全模块随心学习',
      '导师预约享受 85 折专属积分优惠'
    ],
    featuresEn: [
      '300 Monthly Credits included (~¥288 value)',
      'Unlimited 3-Card deep spreads & archetypal reports',
      'AI consciousness multi-turn simulated dialogues',
      '24-bit Lossless binaural frequency streaming',
      'Full access to all 3 master courses',
      '15% discount on mentor 1-on-1 consultations'
    ],
    badgeZh: '投资者与深度用户首选',
    badgeEn: 'Most Popular',
    isPopular: true
  },
  {
    id: 'tier-patron',
    nameZh: '觉醒守护者 (年度赞助人)',
    nameEn: 'Awakened Guardian (Annual Patron)',
    priceMonthlyRmb: 128,
    priceAnnualRmb: 998,
    creditsPerMonth: 1000,
    featuresZh: [
      '每月 1000 丰盛积分 + 专属金色导师勋章',
      '包含每年 2 次认证导师 1对1 深度个案咨询 (价值 800元)',
      '专属离线音频下载与私人定制声波波段',
      '优先参与线下颂钵工作坊与全球静修营',
      'Soulscape 创始会员尊荣编号与专属社群席位'
    ],
    featuresEn: [
      '1,000 monthly credits + Golden patron badge',
      '2 complimentary 1-on-1 certified mentor sessions',
      'Offline audio downloads & bespoke frequency synthesis',
      'Priority access to physical sound retreats',
      'Founding member serial ID & VIP mastermind'
    ],
    badgeZh: '尊崇守护',
    badgeEn: 'Patron',
    isPopular: false
  }
];

export const DEMO_CREDIT_PACKS = [
  { id: 'pack-100', credits: 100, priceRmb: 18, labelZh: '轻享充值包 (100积分)', labelEn: 'Light Pack (100 Credits)' },
  { id: 'pack-300', credits: 320, priceRmb: 48, labelZh: '进阶充值包 (300+赠20积分)', labelEn: 'Growth Pack (320 Credits)', bonus: '+20' },
  { id: 'pack-600', credits: 680, priceRmb: 88, labelZh: '超值尊享包 (600+赠80积分)', labelEn: 'Abundance Pack (680 Credits)', bonus: '+80', isBestValue: true }
];
