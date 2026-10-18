'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

export type ScenarioPreset = 'conservative' | 'base' | 'growth' | 'custom';
export type FundingScenario = '50k' | '80k' | '100k' | 'custom';

export interface FinancialInputs {
  registeredUsers: number;
  mauRate: number; // e.g. 0.35
  premiumConversionRate: number; // e.g. 0.045
  subscriptionPriceMyr: number; // e.g. 39
  creditsPurchaseRate: number; // e.g. 0.06
  avgCreditsPurchaseMyr: number; // e.g. 28
  mentorBookingRate: number; // e.g. 0.012
  avgBookingValueMyr: number; // e.g. 150
  platformCommissionRate: number; // e.g. 0.20
  paymentProcessingFeeRate: number; // e.g. 0.025
  aiCostPerInteraction: number; // e.g. 0.04
  avgAiInteractionsPerMau: number; // e.g. 6
  cloudServerMonthlyMyr: number; // e.g. 3500
  operatingExpensesMonthlyMyr: number; // e.g. 6000
  marketingSpendMonthlyMyr: number; // e.g. 8000
  creditsRedemptionRate: number; // e.g. 0.85
  monthlyGrowthRate: number; // e.g. 0.08
}

export interface CapitalAllocation {
  totalBudgetMyr: number;
  development: number;
  aiAndCloud: number;
  brandingAndContent: number;
  legalAndCompliance: number;
  operatingReserve: number;
}

export interface FunnelStages {
  impressions: number;
  visitorsToLandingRate: number;
  visitorToRegRate: number;
  regToEngagementRate: number;
  engagementToAiRate: number;
  aiToPaidRate: number;
  paidToMentorRate: number;
  retentionRate: number;
}

export interface CalculatedMetrics {
  mau: number;
  premiumSubscribers: number;
  subscriptionRevenue: number;
  creditsBuyers: number;
  creditsCashReceipts: number;
  creditsRecognizedRevenue: number;
  mentorBookings: number;
  mentorGrossBookingValue: number;
  platformMentorCommission: number;
  mentorPayout: number;
  platformRecognizedRevenue: number;
  totalCashInflow: number;
  paymentFees: number;
  aiTotalCost: number;
  totalOperatingExpenses: number;
  netMonthlyContribution: number;
  netCashFlow: number;
  contributionMarginPercent: number;
  breakEvenSubscribers: number;
  runwayMonths: number | null; // null if net burn <= 0
  twelveMonthProjection: Array<{
    month: number;
    monthLabel: string;
    registeredUsers: number;
    mau: number;
    recognizedRevenue: number;
    totalExpenses: number;
    netContribution: number;
    cumulativeCash: number;
  }>;
}

const PRESETS: Record<'conservative' | 'base' | 'growth', FinancialInputs> = {
  conservative: {
    registeredUsers: 10000,
    mauRate: 0.25,
    premiumConversionRate: 0.03,
    subscriptionPriceMyr: 39,
    creditsPurchaseRate: 0.04,
    avgCreditsPurchaseMyr: 20,
    mentorBookingRate: 0.008,
    avgBookingValueMyr: 120,
    platformCommissionRate: 0.20,
    paymentProcessingFeeRate: 0.025,
    aiCostPerInteraction: 0.05,
    avgAiInteractionsPerMau: 4,
    cloudServerMonthlyMyr: 2500,
    operatingExpensesMonthlyMyr: 5000,
    marketingSpendMonthlyMyr: 4000,
    creditsRedemptionRate: 0.80,
    monthlyGrowthRate: 0.05
  },
  base: {
    registeredUsers: 25000,
    mauRate: 0.35,
    premiumConversionRate: 0.045,
    subscriptionPriceMyr: 39,
    creditsPurchaseRate: 0.06,
    avgCreditsPurchaseMyr: 28,
    mentorBookingRate: 0.012,
    avgBookingValueMyr: 150,
    platformCommissionRate: 0.20,
    paymentProcessingFeeRate: 0.025,
    aiCostPerInteraction: 0.04,
    avgAiInteractionsPerMau: 6,
    cloudServerMonthlyMyr: 3500,
    operatingExpensesMonthlyMyr: 6000,
    marketingSpendMonthlyMyr: 8000,
    creditsRedemptionRate: 0.85,
    monthlyGrowthRate: 0.08
  },
  growth: {
    registeredUsers: 60000,
    mauRate: 0.42,
    premiumConversionRate: 0.065,
    subscriptionPriceMyr: 45,
    creditsPurchaseRate: 0.085,
    avgCreditsPurchaseMyr: 35,
    mentorBookingRate: 0.018,
    avgBookingValueMyr: 180,
    platformCommissionRate: 0.22,
    paymentProcessingFeeRate: 0.022,
    aiCostPerInteraction: 0.03,
    avgAiInteractionsPerMau: 8,
    cloudServerMonthlyMyr: 5500,
    operatingExpensesMonthlyMyr: 8500,
    marketingSpendMonthlyMyr: 15000,
    creditsRedemptionRate: 0.90,
    monthlyGrowthRate: 0.12
  }
};

const FUNDING_PRESETS: Record<'50k' | '80k' | '100k', CapitalAllocation> = {
  '50k': {
    totalBudgetMyr: 50000,
    development: 20000,
    aiAndCloud: 6000,
    brandingAndContent: 8000,
    legalAndCompliance: 6000,
    operatingReserve: 10000
  },
  '80k': {
    totalBudgetMyr: 80000,
    development: 30000,
    aiAndCloud: 10000,
    brandingAndContent: 12000,
    legalAndCompliance: 8000,
    operatingReserve: 20000
  },
  '100k': {
    totalBudgetMyr: 100000,
    development: 38000,
    aiAndCloud: 14000,
    brandingAndContent: 15000,
    legalAndCompliance: 10000,
    operatingReserve: 23000
  }
};

const DEFAULT_FUNNEL: FunnelStages = {
  impressions: 100000,
  visitorsToLandingRate: 0.20,
  visitorToRegRate: 0.20,
  regToEngagementRate: 0.60,
  engagementToAiRate: 0.60,
  aiToPaidRate: 0.15,
  paidToMentorRate: 0.20,
  retentionRate: 0.65
};

export interface GuidedTourStep {
  step: number;
  titleZh: string;
  titleEn: string;
  route: string;
  talkingPointsZh: string[];
  talkingPointsEn: string[];
  highlightSelector?: string;
}

export const GUIDED_TOUR_STEPS: GuidedTourStep[] = [
  {
    step: 1,
    titleZh: '01 · 品牌愿景与数字身心生态定位',
    titleEn: '01 · Brand Vision & Digital Wellness Positioning',
    route: '/',
    talkingPointsZh: [
      '面向 10 亿面临焦虑过载与睡眠障碍的现代人，打造东方静穆美学与身心科技交融的庇护所。',
      '摒弃喧嚣的暗色加密风与单薄的心理测试题，以 88 张原初神谕卡与全频调频声波构建内在秩序。',
      '核心壁垒：自研原创卡牌系统 + 双耳全频发生器 + 严选导师智库 + 生产级 AI 适配器。'
    ],
    talkingPointsEn: [
      'Digital sanctuary tackling modern mental fatigue through contemplative aesthetics.',
      'Integrating 88 archetypal oracle cards with binaural sound healing.',
      'Key moat: Original IP + Sound Engine + Master Mentors + Decoupled AI Adapters.'
    ]
  },
  {
    step: 2,
    titleZh: '02 · 消费级沉浸主页与用户旅程入口',
    titleEn: '02 · Consumer Discovery & Entrance',
    route: '/',
    talkingPointsZh: [
      '极简温暖象牙白底色，搭配鼠尾草绿与香槟淡金，提供令人宁静的留白呼吸感。',
      '一站式展现神谕卡沉浸透视、432Hz 样本试听、导师真人资质与会员方案对比。',
      '转化漏斗入口：提供 0 积分免费单牌占读，零摩擦引导用户进入觉知交互。'
    ],
    talkingPointsEn: [
      'Editorial ivory aesthetics fostering serene somatic focus.',
      'Clear discovery pathways across cards, binaural tracks, mentors, and pricing.',
      'Zero-friction hook: Free 1-card reading onboarding.'
    ]
  },
  {
    step: 3,
    titleZh: '03 · 觉知偏好个性化定制 (Onboarding)',
    titleEn: '03 · Mindful Interest Personalization',
    route: '/dashboard',
    talkingPointsZh: [
      '用户在着陆页选择心仪领域（神谕卡、声波、脉轮、助眠、导师），即刻同步至全局状态。',
      '会员看板自动重组：偏好助眠优先推荐 432Hz 德尔塔波；偏好脉轮调频即刻生成心轮专属卡片。',
      '数据持久留存于本地沙盒，支持随时无感调整，提升首周留存率。'
    ],
    talkingPointsEn: [
      'Custom onboarding preferences instantly tailor dashboard recommendations.',
      'Sleep-seekers receive 432Hz Delta waves; chakra seekers receive somatic alignment tools.',
      'Persisted local profile enhancing day-7 retention.'
    ]
  },
  {
    step: 4,
    titleZh: '04 · 88枚原创神谕卡殿堂与洗牌仪式',
    titleEn: '04 · 88 Sacred Oracle Decks & Shuffling',
    route: '/card-reading',
    talkingPointsZh: [
      '88 张纯原创神圣种子系统，符合独立知识产权标准，无第三方版权纠纷隐患。',
      '三维空间透视 (`perspective: 1200px`) 聚能洗牌动效，带来庄严具象的心理仪式感。',
      '商业化分层：单牌核心镜映 0 积分免费；过去/现在/未来深度三牌阵消耗 20 积分。'
    ],
    talkingPointsEn: [
      '88 original sacred archetypes with clean copyright pedigree.',
      '3D perspective card shuffle creating profound ritual presence.',
      'Freemium tiering: 1-card free, 3-card spread costs 20 credits.'
    ]
  },
  {
    step: 5,
    titleZh: '05 · 颂钵引磬揭牌与 AI 深度综合解析',
    titleEn: '05 · Tibetan Bell Reveal & AI Synthesis',
    route: '/card-reading',
    talkingPointsZh: [
      '感官峰值：揭牌瞬间触发程序化 528Hz 西藏颂钵引磬音效，搭配五彩礼花微交互。',
      '本地确定性意图模板模拟多维荣格原型综合解读，明显标注 `[DEMO SIMULATION]` 合规声明。',
      '解析结果自动写入占读档案，并基于牌卡脉轮归属自动推荐互补频率声波。'
    ],
    talkingPointsEn: [
      'Sensory peak: Programmatic 528Hz Tibetan bell chime on flip.',
      'Deterministic Jungian synthesis clearly badged as compliance simulation.',
      'Auto-saved to history with paired sound therapy recommendation.'
    ]
  },
  {
    step: 6,
    titleZh: '06 · 全频双耳声波乐库与冥想定时器',
    titleEn: '06 · Binaural Sound Therapy & Meditation Timer',
    route: '/music',
    talkingPointsZh: [
      '深度集成 Web Audio API 物理振荡器，浏览器本地实时合成纯净调频正弦波。',
      '无需外部 CDN 音频带宽，彻底避免跨域加载卡顿或离线断音，大幅降低云存储与流量成本。',
      '内置 3/5/10/15 分钟冥想定时器，全站悬浮常驻播放器无缝随行。'
    ],
    talkingPointsEn: [
      'Web Audio API oscillator synthesizing pure frequencies on client-side.',
      'Zero audio CDN bandwidth costs; immune to buffering delays.',
      'Integrated timer and persistent global floating audio player.'
    ]
  },
  {
    step: 7,
    titleZh: '07 · 能量钱包流转与积分扣减闭环',
    titleEn: '07 · Credits Wallet & Microtransaction Ledger',
    route: '/wallet',
    talkingPointsZh: [
      '初始赠送 100 积分，真实模拟单牌免费、三牌阵 20 积分、AI 对话 10 积分的消费扣减。',
      '提供完整审计流水账本：充值加购、消费明细、导师划扣、余额不足即时拦截。',
      '财务合规：明确区分现收账款（Cash Receipts）与权责发生制已消耗确认收入。'
    ],
    talkingPointsEn: [
      '100 initial demo credits demonstrating clear ledger balance updates.',
      'Full audit trail distinguishing cash collection from recognized revenue.',
      'Insufficient balance interception and top-up pathways.'
    ]
  },
  {
    step: 8,
    titleZh: '08 · 认证导师名录与 1对1 咨询排期',
    titleEn: '08 · Master Mentor Directory & Bookings',
    route: '/mentors',
    talkingPointsZh: [
      '汇聚 8 位涵盖声波医学、荣格心理学与道家吐纳的严选认证导师。',
      '完整预约履约闭环：选定时段 → 划扣 80 积分 → 自动生成端到端加密音视频会议模拟链接。',
      '双边网络效应：学员获得专业个案指引，导师沉淀私域学员并获取稳定收益。'
    ],
    talkingPointsEn: [
      '8 pre-screened wellness masters across psychology and sound therapy.',
      'Complete booking flow: select slot -> 80 credits deducted -> virtual room link.',
      'Two-sided network: high-value consultations for seekers, high earnings for mentors.'
    ]
  },
  {
    step: 9,
    titleZh: '09 · 导师协同工作台与 80% 收益分润',
    titleEn: '09 · Mentor Workspace & 80/20 Revenue Split',
    route: '/mentor',
    talkingPointsZh: [
      '切换至导师工作台：查看 1,280 次已履约咨询与 RM 102,400 累计收益。',
      '履约控制：导师可实时变更个案状态为“已完成”或“取消退款”。',
      '内容共创：导师可撰写专栏文章，并自编 4 阶修行之旅，实时上架前台供全站学员实修。'
    ],
    talkingPointsEn: [
      'Mentor portal displaying GMV, ratings, and 80% payout balance.',
      'Lifecycle controls: complete consultation or refund booking.',
      'Content co-creation: publish essays and author 4-step guided journeys.'
    ]
  },
  {
    step: 10,
    titleZh: '10 · 实时商业模型与多变量敏感度测算',
    titleEn: '10 · Financial Model & Scenario Sensitivity',
    route: '/investor/revenue-simulator',
    talkingPointsZh: [
      '全面支持保守、基准、激进三档预设，所有运营参数（注册数、MAU、转化率）均可实时滑动微调。',
      '自动分离导师 GMV（非平台收入）与平台 20% 佣金净额，杜绝虚胖 GMV 误导。',
      '动态测算贡献毛利、损益平衡会员数（Break-even Subscribers）与 12 个月现金流滚动态势。'
    ],
    talkingPointsEn: [
      'Conservative / Base / Growth presets with reactive sliders.',
      'Strict separation of mentor GMV vs recognized 20% platform commission.',
      'Live contribution margin, break-even threshold, and 12-month projections.'
    ]
  },
  {
    step: 11,
    titleZh: '11 · AI 单元经济模型与边际成本可控性',
    titleEn: '11 · AI Unit Economics & Variable Margins',
    route: '/investor/ai-costs',
    talkingPointsZh: [
      '拆解单次占读与单轮问答的 Token 消耗（Prompt + Completion）。',
      '以每 1000 Token 预估成本测算，单次 AI 交互边际成本仅约 RM 0.04，而划扣 10 积分价值约 RM 1.50。',
      'AI 单元毛利率高达 90%+，杜绝“用户越多越亏钱”的算力陷阱，内置防刷流控与预警阈值。'
    ],
    talkingPointsEn: [
      'Token unit breakdown for single-card, three-card, and chat interactions.',
      'Variable cost per query ~RM0.04 vs ~RM1.50 credit value yields 90%+ margin.',
      'Immune to runaway LLM burn with rate-limiting & tier budgets.'
    ]
  },
  {
    step: 12,
    titleZh: '12 · 研发演进路线图与融资金额规划',
    titleEn: '12 · Product Roadmap & Capital Allocation',
    route: '/investor/investment-plan',
    talkingPointsZh: [
      '明确规划 RM50k、RM80k、RM100k 三档融资需求：研发占比 37.5%，预留 25% 运营储备金。',
      '展示清晰可控的月度现金消耗（Net Cash Burn）与预估跑道期（Runway）。',
      '明晰创始人技术贡献、股权协商预案（协商性提案声明）与季度演进目标，静待共创。'
    ],
    talkingPointsEn: [
      'Clear allocations for RM50k / RM80k / RM100k rounds; 25% reserve buffer.',
      'Calculated monthly net cash burn and runway longevity.',
      'Transparent capital table proposal and 4-quarter strategic roadmap.'
    ]
  }
];

export interface PitchSlide {
  id: number;
  titleZh: string;
  titleEn: string;
  categoryZh: string;
  categoryEn: string;
  bulletsZh: string[];
  bulletsEn: string[];
  metricsHighlight?: {
    value: string;
    labelZh: string;
    labelEn: string;
  };
  graphicType?: string;
}

export const PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    titleZh: '01 · 商业痛点与数字身心生态愿景',
    titleEn: '01 · Problem & Digital Wellness Vision',
    categoryZh: '商业机遇',
    categoryEn: 'Opportunity',
    bulletsZh: [
      '全球超 10 亿现代人面临注意力涣散、焦虑过载与睡眠障碍，亟需高粘性数字化精神庇护所。',
      '传统心理咨询门槛极高（CAC > RM120），且单次咨询阻力大；通用冥想应用缺乏互动仪式与文化共鸣。',
      'Soulscape 将东方极简美学、88枚原创神谕卡、432Hz 双耳音频与 AI 深度整合，打造现代人的数字心智空间。'
    ],
    bulletsEn: [
      'Over 1 billion people struggle with mental overload and sleep deprivation worldwide.',
      'Traditional therapy suffers high CAC (>RM120) and friction; generic meditation apps lack cultural resonance.',
      'Soulscape merges Eastern minimalist aesthetics, 88 original oracle cards, 432Hz binaural audio, and AI.'
    ],
    metricsHighlight: {
      value: '10 亿+',
      labelZh: '全球身心健康潜在受众',
      labelEn: 'Global Wellness Addressable Market'
    }
  },
  {
    id: 2,
    titleZh: '02 · 核心产品架构与五大协同飞轮',
    titleEn: '02 · Integrated Somatic Product Architecture',
    categoryZh: '产品矩阵',
    categoryEn: 'Architecture',
    bulletsZh: [
      '神谕卡占读（高频获客切口）+ 双耳声波（日常留存锚点）+ AI 心灵向导（微充值闭环）。',
      '七脉轮系统调频（SaaS 会员订阅支柱）+ 严选导师 1对1 咨询（高客单 GMV 放大器）。',
      '五大功能模块非离散堆砌，而是沿着用户的觉知旅程有机联动，最大化单客生命周期价值（LTV）。'
    ],
    bulletsEn: [
      'Oracle Cards (Acquisition) + Binaural Audio (Retention) + AI Guide (Microtransactions).',
      '7 Chakras Alignment (SaaS Subscriptions) + Certified Mentors (High-Ticket GMV).',
      'Organic multi-modal synergy maximizing Customer Lifetime Value (LTV).'
    ],
    metricsHighlight: {
      value: '5 大引擎',
      labelZh: '深度联动的产品变现飞轮',
      labelEn: 'Synergistic Monetization Engines'
    }
  },
  {
    id: 3,
    titleZh: '03 · 88枚原创神圣种子神谕卡殿堂',
    titleEn: '03 · Proprietary 88-Card Sacred Archetype IP',
    categoryZh: '原创资产',
    categoryEn: 'Proprietary IP',
    bulletsZh: [
      '纯自主知识产权 88 张原创神圣种子体系，符合国际版权标准，彻底规避第三方版权连带纠纷。',
      '支持单牌核心镜映（0 积分每日免费抓手）与过去/现在/未来三牌阵深度占读（20 积分微付费）。',
      '结合三维空间透视 (`perspective: 1200px`) 聚能洗牌动效与颂钵引磬，构建极具庄严感的仪式心智。'
    ],
    bulletsEn: [
      '100% original 88-card sacred archetype system free of third-party IP royalties.',
      'Freemium tiered spreads: 1-card daily free hook vs 3-card deep spreads (20 credits).',
      'Immersive 3D perspective shuffle & Tibetan singing bell audio anchors somatic ritual presence.'
    ],
    metricsHighlight: {
      value: '88 张',
      labelZh: '自主版权神谕卡核心知识资产',
      labelEn: 'Original Copyrighted Archetype Decks'
    }
  },
  {
    id: 4,
    titleZh: '04 · Web Audio 物理振荡器：0 带宽声波引擎',
    titleEn: '04 · Zero-Bandwidth Native Audio Synthesis',
    categoryZh: '技术壁垒',
    categoryEn: 'Technology',
    bulletsZh: [
      '采用 Web Audio API 原生振荡器，浏览器本地动态合成 432Hz、528Hz、Theta 波等纯净正弦波。',
      '彻底消除传统音频流媒体所产生的高昂 CDN 带宽开销，即便百万并发亦无流量成本暴涨隐患。',
      '秒开无延迟、完全免疫离线断流与跨域加载卡顿，集成 3/5/10/15 分钟冥想睡眠定时器。'
    ],
    bulletsEn: [
      'Client-side Web Audio API oscillator synthesizing pure 432Hz, 528Hz, and Theta waves.',
      'Eliminates heavy audio streaming CDN bandwidth costs even under millions of concurrent streams.',
      'Instant zero-latency playback, fully offline-capable with built-in sleep timer.'
    ],
    metricsHighlight: {
      value: '0 带宽',
      labelZh: '本地端物理声波合成架构',
      labelEn: 'Zero Streaming CDN Bandwidth Cost'
    }
  },
  {
    id: 5,
    titleZh: '05 · 确定性智库 + 解耦大模型适配器',
    titleEn: '05 · Deterministic AI & Decoupled Adapters',
    categoryZh: 'AI 架构',
    categoryEn: 'AI Moat',
    bulletsZh: [
      '前置内置荣格心理学结构化意图模板，拦截 70% 基础咨询，毫秒级响应且 0 外部 Token 开销。',
      '解耦 `AiGuideAdapter` 接口，无缝支持 OpenAI、DeepSeek、Claude、GLM 与本地 Ollama 自由套利切换。',
      '单次占读综合推理成本压降至 RM 0.035，实现 90%+ 的极致毛利，拒绝“用户越多越亏钱”的算力陷阱。'
    ],
    bulletsEn: [
      'Deterministic Jungian rule base resolves 70% queries at zero external token cost.',
      'Pluggable `AiGuideAdapter` enables effortless switching between DeepSeek, OpenAI, and Claude.',
      'Inference cost slashed to RM 0.035 per interaction, preserving 90%+ gross margin.'
    ],
    metricsHighlight: {
      value: '> 90%',
      labelZh: 'AI 业务单元贡献毛利率',
      labelEn: 'AI Unit Gross Contribution Margin'
    }
  },
  {
    id: 6,
    titleZh: '06 · 严选导师智库与 80/20 撮合平台',
    titleEn: '06 · Master Mentor Marketplace & 80/20 Split',
    categoryZh: '双边网络',
    categoryEn: 'Marketplace',
    bulletsZh: [
      '严选认证身心疗愈师与荣格心理学导师，提供 1对1 视频咨询与专属疗愈，均价 RM 150-300。',
      '平台收取 20% 撮合服务佣金，导师获得 80% 高额激励，驱动导师主动将自有私域案主导流至平台。',
      '严格区分“导师商业分成”与“公司股权 (Cap Table)”，导师纯属合作服务商，零股权稀释风险。'
    ],
    bulletsEn: [
      'Accredited healers and Jungian mentors offering 1-on-1 consultations priced RM 150-300.',
      'Platform retains 20% commission; 80% payout motivates mentors to onboard private clienteles.',
      'Zero equity dilution: mentors operate strictly as marketplace service partners.'
    ],
    metricsHighlight: {
      value: '20%',
      labelZh: '平台撮合净佣金提成 (100%纯毛利)',
      labelEn: 'Platform Take-Rate (Pure Margin)'
    }
  },
  {
    id: 7,
    titleZh: '07 · 双轨变现体系：SaaS 订阅 + 积分微交易',
    titleEn: '07 · Dual Monetization: Subscriptions & Credits',
    categoryZh: '商业模式',
    categoryEn: 'Monetization',
    bulletsZh: [
      'SaaS 订阅会员（RM 39/月 或 RM 299/年）：提供全站声波无限制畅听与七脉轮深度进阶课程。',
      '觉知点卡充值包（RM 18 / RM 38 / RM 98）：按次扣减深度三牌阵（20点）与专属 AI 向导对话（10点）。',
      '财务合规：严格区分现收账款（Cash Receipts）与权责发生制已消耗确认收入，提供完整审计流水。'
    ],
    bulletsEn: [
      'SaaS recurring tiers (RM 39/mo or RM 299/yr) unlock unlimited tracks and chakra courses.',
      'Credit top-up packs (RM 18-98) monetize single deep spreads and AI consultations.',
      'GAAP compliant revenue recognition separating cash receipts from consumed credits.'
    ],
    metricsHighlight: {
      value: 'RM 39',
      labelZh: '月度订阅基准定价 (健康客单)',
      labelEn: 'Benchmark Monthly Subscription ARR'
    }
  },
  {
    id: 8,
    titleZh: '08 · 获客漏斗与 4.5x+ LTV/CAC 增长飞轮',
    titleEn: '08 · Organic Acquisition Funnel & LTV/CAC',
    categoryZh: '增长引擎',
    categoryEn: 'Growth Funnel',
    bulletsZh: [
      '每日免费单牌抽取生成唯美反思金句海报，自发裂变促成低获客成本（综合 CAC 约 RM 8-15）。',
      '平均订阅生命周期 6.5 个月叠加点卡复购与导师消费，单客生命周期价值（LTV）测算达 RM 280+。',
      'LTV / CAC 比率超过 4.5x，远超早期 SaaS 风险投资 3.0x 的健康基准线。'
    ],
    bulletsEn: [
      'Free daily reading generates aesthetic quote cards shared to social feeds, lowering blended CAC.',
      'Customer lifetime value (LTV) exceeds RM 280+ across subscriptions, credits, and mentor take.',
      'LTV/CAC ratio surpasses 4.5x, well exceeding the 3.0x venture capital gold standard.'
    ],
    metricsHighlight: {
      value: '> 4.5x',
      labelZh: 'LTV / CAC 比率 (极佳投资回报率)',
      labelEn: 'LTV to CAC Ratio (Superior Efficiency)'
    }
  },
  {
    id: 9,
    titleZh: '09 · 实时财务模型与损益平衡演进',
    titleEn: '09 · Financial Simulation & Break-Even',
    categoryZh: '财务推演',
    categoryEn: 'Financial Model',
    bulletsZh: [
      '基准情境下，25,000 注册用户与 4.5% 付费率即可实现月度确认净收入 RM 45,000+。',
      '固定月度营运开支（云端+营销+兼职）约 RM 17,500，保本所需订阅用户数仅约 450 人。',
      '高边际收益结构带来极高经营杠杆，业务规模跨过保本点后现金流呈现指数级滚增。'
    ],
    bulletsEn: [
      'Base scenario (25k users, 4.5% conversion) yields RM 45k+ monthly net recognized revenue.',
      'Fixed OPEX of ~RM 17.5k requires only ~450 active subscribers to reach operational break-even.',
      'High operating leverage drives compounding cash flows once crossing break-even threshold.'
    ],
    metricsHighlight: {
      value: '~450 人',
      labelZh: '平台实现月度损益平衡所需订阅者',
      labelEn: 'Subscribers Needed for Break-Even'
    }
  },
  {
    id: 10,
    titleZh: '10 · 资本分配规划：RM 50k - RM 100k 种子轮',
    titleEn: '10 · Seed Capital Allocation & Runway',
    categoryZh: '融资规划',
    categoryEn: 'Funding Tier',
    bulletsZh: [
      '设定 RM 50k（精益）、RM 80k（推荐）、RM 100k（加速）三档资金规划方案。',
      '预算重点投向：技术研发与 PWA 客户端（37.5%）、运营与抗风险储备金（25%）、版权商标与合规（10%）。',
      '在无外部后续融资前提下，单笔种子轮资金可保障 8 至 14 个月的安全营运跑道。'
    ],
    bulletsEn: [
      'Flexible seed funding scenarios: RM 50k (Lean), RM 80k (Optimal), and RM 100k (Scale).',
      'Allocations prioritize software engineering (37.5%), cash reserve (25%), and legal IP (10%).',
      'Provides 8 to 14 months of cash runway even before accounting for operating cash flows.'
    ],
    metricsHighlight: {
      value: 'RM 80,000',
      labelZh: '推荐种子轮募资金额 (8-12月跑道)',
      labelEn: 'Recommended Acceleration Seed Target'
    }
  },
  {
    id: 11,
    titleZh: '11 · 股权结构提案与透明治理原则',
    titleEn: '11 · Cap Table Proposal & Governance',
    categoryZh: '股权治理',
    categoryEn: 'Cap Table',
    bulletsZh: [
      '拟定股权架构：创始人与核心技术 75%、种子轮战略投资人 15%、未来员工期权池（ESOP）10%。',
      '核心团队股权采取国际通用 4 年按月分期行权与 1 年断崖锁定条款，确保长线坚守与战略定力。',
      '明确声明：所有持股比例与估值均为协商性提案，高度开放与同频战略伙伴深入洽谈定制。'
    ],
    bulletsEn: [
      'Proposed cap table: 75% Founders & Core Tech, 15% Seed Investors, 10% ESOP Pool.',
      'Founder equity subject to standard 4-year vesting with 1-year cliff.',
      'All valuation caps and percentages represent negotiable, investor-aligned initial proposals.'
    ],
    metricsHighlight: {
      value: '15%',
      labelZh: '拟定种子轮战略投资人出让比例',
      labelEn: 'Proposed Seed Investor Pool'
    }
  },
  {
    id: 12,
    titleZh: '12 · 季度演进里程碑与未来愿景',
    titleEn: '12 · Execution Roadmap & Milestones',
    categoryZh: '战略蓝图',
    categoryEn: 'Milestones',
    bulletsZh: [
      'Q1：核心原创卡牌、物理声波引擎、确定性智库与投资人商业智能中枢交付（已完成）。',
      'Q2：移动端 PWA、东南亚本地聚合支付接入与首批 30 位名师入驻排期（进行中）。',
      'Q3-Q4：B2B 企微身心工坊、全球多语言出海、巴厘岛线下静修营与 A 轮机构融资对接。'
    ],
    bulletsEn: [
      'Q1: Core original decks, audio oscillator, deterministic AI, and investor BI suite (Delivered).',
      'Q2: Mobile PWA, local Southeast Asian payment gateways, and 30 master mentors (In Progress).',
      'Q3-Q4: Enterprise EAP, multi-language localization, luxury Bali retreats, and Series A funding.'
    ],
    metricsHighlight: {
      value: 'Q1-Q4',
      labelZh: '清晰严谨的逐季商业造血推进',
      labelEn: 'Disciplined Quarterly Execution'
    }
  }
];

interface InvestorContextValue {
  scenario: ScenarioPreset;
  setScenario: (s: ScenarioPreset) => void;
  inputs: FinancialInputs;
  updateInput: <K extends keyof FinancialInputs>(key: K, value: FinancialInputs[K]) => void;
  resetScenario: () => void;
  metrics: CalculatedMetrics;
  
  // Capital Allocation
  fundingScenario: FundingScenario;
  setFundingScenario: (f: FundingScenario) => void;
  capitalAllocation: CapitalAllocation;
  updateAllocation: <K extends keyof CapitalAllocation>(key: K, value: CapitalAllocation[K]) => void;
  updateCapitalAllocation: <K extends keyof CapitalAllocation>(key: K, value: CapitalAllocation[K]) => void;
  resetCapitalAllocation: () => void;

  // Funnel
  funnelStages: FunnelStages;
  updateFunnelStage: <K extends keyof FunnelStages>(key: K, value: FunnelStages[K]) => void;
  resetFunnel: () => void;

  // Presentation State
  currentSlide: number;
  currentSlideIndex: number;
  setCurrentSlide: (n: number) => void;
  goToSlide: (n: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  totalSlides: number;
  slides: PitchSlide[];
  isFullscreen: boolean;
  toggleFullscreen: () => void;

  // Guided Tour State
  isTourActive: boolean;
  tourStep: number;
  totalTourSteps: number;
  tourSteps: GuidedTourStep[];
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  goToTourStep: (step: number) => void;
  exitTour: () => void;
  stopTour: () => void;
  currentTourData: GuidedTourStep;

  // Formatter helpers
  currencySymbol: string;
  formatCurrency: (amount: number) => string;
  formatNumber: (num: number) => string;
  formatPercent: (rate: number) => string;
}

const InvestorContext = createContext<InvestorContextValue | null>(null);

export function InvestorProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenarioState] = useState<ScenarioPreset>('base');
  const [inputs, setInputs] = useState<FinancialInputs>(PRESETS.base);
  const [fundingScenario, setFundingScenarioState] = useState<FundingScenario>('80k');
  const [capitalAllocation, setCapitalAllocation] = useState<CapitalAllocation>(FUNDING_PRESETS['80k']);
  const [funnelStages, setFunnelStages] = useState<FunnelStages>(DEFAULT_FUNNEL);

  // Presentation slides state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Tour state
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);

  const setScenario = (preset: ScenarioPreset) => {
    setScenarioState(preset);
    if (preset !== 'custom') {
      setInputs(PRESETS[preset]);
    }
  };

  const updateInput = <K extends keyof FinancialInputs>(key: K, value: FinancialInputs[K]) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setScenarioState('custom');
  };

  const resetScenario = () => {
    setScenarioState('base');
    setInputs(PRESETS.base);
    setFundingScenarioState('80k');
    setCapitalAllocation(FUNDING_PRESETS['80k']);
    setFunnelStages(DEFAULT_FUNNEL);
  };

  const setFundingScenario = (f: FundingScenario) => {
    setFundingScenarioState(f);
    if (f !== 'custom') {
      setCapitalAllocation(FUNDING_PRESETS[f]);
    }
  };

  const updateAllocation = <K extends keyof CapitalAllocation>(key: K, value: CapitalAllocation[K]) => {
    setCapitalAllocation(prev => ({ ...prev, [key]: value }));
    setFundingScenarioState('custom');
  };

  const updateFunnelStage = <K extends keyof FunnelStages>(key: K, value: FunnelStages[K]) => {
    setFunnelStages(prev => ({ ...prev, [key]: value }));
  };

  // Presentation controls
  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, 11));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Tour controls
  const startTour = () => {
    setIsTourActive(true);
    setTourStep(1);
  };
  const nextTourStep = () => {
    setTourStep(prev => Math.min(prev + 1, GUIDED_TOUR_STEPS.length));
  };
  const prevTourStep = () => {
    setTourStep(prev => Math.max(prev - 1, 1));
  };
  const exitTour = () => {
    setIsTourActive(false);
  };

  const currentTourData = GUIDED_TOUR_STEPS[tourStep - 1] || GUIDED_TOUR_STEPS[0];

  // Core Financial Modeling Calculations
  const metrics: CalculatedMetrics = useMemo(() => {
    const mau = Math.round(inputs.registeredUsers * inputs.mauRate);
    const premiumSubscribers = Math.round(mau * inputs.premiumConversionRate);
    const subscriptionRevenue = premiumSubscribers * inputs.subscriptionPriceMyr;

    const creditsBuyers = Math.round(mau * inputs.creditsPurchaseRate);
    const creditsCashReceipts = creditsBuyers * inputs.avgCreditsPurchaseMyr;
    const creditsRecognizedRevenue = creditsCashReceipts * inputs.creditsRedemptionRate;

    const mentorBookings = Math.round(mau * inputs.mentorBookingRate);
    const mentorGrossBookingValue = mentorBookings * inputs.avgBookingValueMyr;
    const platformMentorCommission = mentorGrossBookingValue * inputs.platformCommissionRate;
    const mentorPayout = mentorGrossBookingValue - platformMentorCommission;

    const platformRecognizedRevenue = subscriptionRevenue + creditsRecognizedRevenue + platformMentorCommission;
    const totalCashInflow = subscriptionRevenue + creditsCashReceipts + platformMentorCommission;

    const paymentFees = (subscriptionRevenue + creditsCashReceipts + mentorGrossBookingValue) * inputs.paymentProcessingFeeRate;
    const aiTotalCost = mau * inputs.avgAiInteractionsPerMau * inputs.aiCostPerInteraction;
    
    const totalOperatingExpenses = paymentFees + aiTotalCost + inputs.cloudServerMonthlyMyr + inputs.operatingExpensesMonthlyMyr + inputs.marketingSpendMonthlyMyr;
    const netMonthlyContribution = platformRecognizedRevenue - totalOperatingExpenses;
    
    // Net cash flow takes into account cash receipts vs recognized revenue
    const netCashFlow = totalCashInflow - totalOperatingExpenses;

    const contributionMarginPercent = platformRecognizedRevenue > 0
      ? (netMonthlyContribution / platformRecognizedRevenue) * 100
      : 0;

    // Break-even Subscribers calculation
    // Fixed costs = Cloud + Operating + Marketing
    const fixedCosts = inputs.cloudServerMonthlyMyr + inputs.operatingExpensesMonthlyMyr + inputs.marketingSpendMonthlyMyr;
    const grossMarginPerSub = inputs.subscriptionPriceMyr * (1 - inputs.paymentProcessingFeeRate);
    const breakEvenSubscribers = grossMarginPerSub > 0 ? Math.ceil(fixedCosts / grossMarginPerSub) : 0;

    // Runway calculation:
    // Only valid when monthly net burn is positive (i.e. netCashFlow is negative)
    // If netCashFlow >= 0, runway is infinite/Not Applicable (Cash Positive)
    const monthlyNetBurn = netCashFlow < 0 ? Math.abs(netCashFlow) : 0;
    const runwayMonths = monthlyNetBurn > 0
      ? Math.max(0, Number((capitalAllocation.operatingReserve / monthlyNetBurn).toFixed(1)))
      : null;

    // 12-Month Projections with compound growth
    const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
    let runningCumulativeCash = capitalAllocation.operatingReserve;
    let currentReg = inputs.registeredUsers;

    const twelveMonthProjection = months.map((label, idx) => {
      const monthNum = idx + 1;
      if (idx > 0) {
        currentReg = Math.round(currentReg * (1 + inputs.monthlyGrowthRate));
      }
      const m_mau = Math.round(currentReg * inputs.mauRate);
      const m_subs = Math.round(m_mau * inputs.premiumConversionRate);
      const m_subRev = m_subs * inputs.subscriptionPriceMyr;
      const m_credBuyers = Math.round(m_mau * inputs.creditsPurchaseRate);
      const m_credRev = m_credBuyers * inputs.avgCreditsPurchaseMyr * inputs.creditsRedemptionRate;
      const m_mentorBookings = Math.round(m_mau * inputs.mentorBookingRate);
      const m_mentorComm = m_mentorBookings * inputs.avgBookingValueMyr * inputs.platformCommissionRate;
      const m_recRev = m_subRev + m_credRev + m_mentorComm;
      
      const m_payFees = (m_subRev + m_credRev + (m_mentorBookings * inputs.avgBookingValueMyr)) * inputs.paymentProcessingFeeRate;
      const m_aiCost = m_mau * inputs.avgAiInteractionsPerMau * inputs.aiCostPerInteraction;
      const m_exp = m_payFees + m_aiCost + inputs.cloudServerMonthlyMyr + inputs.operatingExpensesMonthlyMyr + inputs.marketingSpendMonthlyMyr;
      const m_net = m_recRev - m_exp;
      runningCumulativeCash += m_net;

      return {
        month: monthNum,
        monthLabel: label,
        registeredUsers: currentReg,
        mau: m_mau,
        recognizedRevenue: Math.round(m_recRev),
        totalExpenses: Math.round(m_exp),
        netContribution: Math.round(m_net),
        cumulativeCash: Math.round(runningCumulativeCash)
      };
    });

    return {
      mau,
      premiumSubscribers,
      subscriptionRevenue,
      creditsBuyers,
      creditsCashReceipts,
      creditsRecognizedRevenue,
      mentorBookings,
      mentorGrossBookingValue,
      platformMentorCommission,
      mentorPayout,
      platformRecognizedRevenue,
      totalCashInflow,
      paymentFees,
      aiTotalCost,
      totalOperatingExpenses,
      netMonthlyContribution,
      netCashFlow,
      contributionMarginPercent,
      breakEvenSubscribers,
      runwayMonths,
      twelveMonthProjection
    };
  }, [inputs, capitalAllocation]);

  const formatCurrency = (amount: number) => `RM ${Math.round(amount).toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();
  const formatPercent = (rate: number) => `${(rate * 100).toFixed(1)}%`;

  const resetCapitalAllocation = () => {
    setFundingScenarioState('80k');
    setCapitalAllocation(FUNDING_PRESETS['80k']);
  };

  const resetFunnel = () => {
    setFunnelStages(DEFAULT_FUNNEL);
  };

  const goToSlide = (n: number) => {
    setCurrentSlide(Math.max(0, Math.min(n, PITCH_SLIDES.length - 1)));
  };

  const goToTourStep = (step: number) => {
    setTourStep(Math.max(1, Math.min(step, GUIDED_TOUR_STEPS.length)));
    setIsTourActive(true);
  };

  return (
    <InvestorContext.Provider
      value={{
        scenario,
        setScenario,
        inputs,
        updateInput,
        resetScenario,
        metrics,
        fundingScenario,
        setFundingScenario,
        capitalAllocation,
        updateAllocation,
        updateCapitalAllocation: updateAllocation,
        resetCapitalAllocation,
        funnelStages,
        updateFunnelStage,
        resetFunnel,
        currentSlide,
        currentSlideIndex: currentSlide,
        setCurrentSlide,
        goToSlide,
        nextSlide,
        prevSlide,
        totalSlides: PITCH_SLIDES.length,
        slides: PITCH_SLIDES,
        isFullscreen,
        toggleFullscreen,
        isTourActive,
        tourStep,
        totalTourSteps: GUIDED_TOUR_STEPS.length,
        tourSteps: GUIDED_TOUR_STEPS,
        startTour,
        nextTourStep,
        prevTourStep,
        goToTourStep,
        exitTour,
        stopTour: exitTour,
        currentTourData,
        currencySymbol: 'RM',
        formatCurrency,
        formatNumber,
        formatPercent
      }}
    >
      {children}
    </InvestorContext.Provider>
  );
}

export function useInvestor() {
  const context = useContext(InvestorContext);
  if (!context) {
    throw new Error('useInvestor must be used within an InvestorProvider');
  }
  return context;
}
