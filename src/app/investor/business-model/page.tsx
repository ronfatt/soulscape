'use client';

import React from 'react';
import Link from 'next/link';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Layers, 
  RotateCw, 
  CreditCard, 
  Coins, 
  Users, 
  Building2, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export default function InvestorBusinessModelPage() {
  const { locale } = useApp();
  const { metrics, inputs, formatCurrency, formatPercent } = useInvestor();

  const isZh = locale === 'zh';

  const monetizationStreams = [
    {
      titleZh: '1. SaaS 会员订阅服务 (Recurring ARR)',
      titleEn: '1. SaaS Recurring Subscriptions',
      icon: CreditCard,
      badgeZh: '高可预测性',
      badgeEn: 'Predictable ARR',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      descriptionZh: 'RM 39/月 或 RM 299/年。解锁全站无限制双耳调频音轨、深度荣格三牌阵解读、七脉轮专题冥想营与专属个人成长档案。',
      descriptionEn: 'RM 39/mo or RM 299/yr. Unlimited audio tracks, 3-card Jungian spreads, and chakra journeys.',
      revenueShare: '45% - 55%',
      margin: '90%+'
    },
    {
      titleZh: '2. 觉知点卡微交易 (Microtransactions)',
      titleEn: '2. Micro-credits Top-up Packs',
      icon: Coins,
      badgeZh: '现收账款',
      badgeEn: 'Cash Flow Buffer',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      descriptionZh: 'RM 18 / RM 38 / RM 98 充值包。用于单次消耗：深度 AI 对话（10点）、高级限定神谕牌阵（20点）、专属音波导出。',
      descriptionEn: 'Flexible top-ups for non-subscribers consuming specific AI consultations or premium spreads.',
      revenueShare: '20% - 25%',
      margin: '88%+'
    },
    {
      titleZh: '3. 严选导师撮合平台 (Marketplace Take-rate)',
      titleEn: '3. Master Mentor Marketplace',
      icon: Users,
      badgeZh: '高客单 GMV',
      badgeEn: 'High Ticket GMV',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
      descriptionZh: '平台严选身心导师提供 1对1 视频咨询与专属疗愈，每单均价 RM 150 - RM 300，平台严格抽取 20% 撮合服务佣金。',
      descriptionEn: '1-on-1 consultations with 20% commission on average booking value of RM 150-300.',
      revenueShare: '15% - 20%',
      margin: '100% (Pure Margin)'
    },
    {
      titleZh: '4. B2B 企微身心减压与企业工坊 (Enterprise)',
      titleEn: '4. Enterprise Wellness & EAP',
      icon: Building2,
      badgeZh: '高毛利定制',
      badgeEn: 'Corporate Contracts',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      descriptionZh: '面向科技企业与高管团队，输出白领冥想排班系统、正念减压数字工具箱与线下颂钵工作坊定制方案。',
      descriptionEn: 'Corporate digital mindfulness toolkits and offline sound healing workshops.',
      revenueShare: '10% - 15%',
      margin: '75%+'
    },
    {
      titleZh: '5. 觉知周边与实体疗愈衍生品 (Physical IP)',
      titleEn: '5. Physical Sound Tools & Merch',
      icon: ShoppingBag,
      badgeZh: '品牌溢价',
      badgeEn: 'IP Extensions',
      color: 'bg-stone-100 text-stone-800 border-stone-200',
      descriptionZh: '实体版 88 枚烫金典藏神谕卡套盒、手工锻造 432Hz 水晶钵、定制纯天然植物精油香氛。',
      descriptionEn: 'Physical 88-card collector boxed sets, handcrafted crystal bowls, and natural botanicals.',
      revenueShare: '5% - 10%',
      margin: '60%+'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3 border border-teal-200">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>{isZh ? '五维商业模式体系与现金流飞轮' : '5-Pillar Monetization & Flywheels'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            {isZh ? '双轨变现架构与自我强化的身心商业飞轮' : 'Dual-Engine Architecture & Self-Reinforcing Flywheels'}
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {isZh 
              ? 'Soulscape 颠覆了传统心理咨询极高获客成本（CAC > RM120）与纯工具类应用变现天花板低的弊端，通过“每日高频零门槛仪式”转化为“订阅+积分+高客单导师撮合”的三层过滤漏斗。'
              : 'Disrupting traditional mental health app models with high CAC by building a high-retention organic somatic funnel.'}
          </p>
        </div>
      </div>

      {/* 5 Streams Grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600" />
          <span>{isZh ? '五大变现支柱与毛利预期' : '5 Monetization Pillars'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {monetizationStreams.map((stream, idx) => {
            const Icon = stream.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${stream.color}`}>
                      {isZh ? stream.badgeZh : stream.badgeEn}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-base">
                    {isZh ? stream.titleZh : stream.titleEn}
                  </h4>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {isZh ? stream.descriptionZh : stream.descriptionEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">{isZh ? '收入占比预测' : 'Rev Share'}</span>
                    <span className="font-bold text-stone-800">{stream.revenueShare}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">{isZh ? '综合毛利率' : 'Gross Margin'}</span>
                    <span className="font-bold text-emerald-700">{stream.margin}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flywheels Deep Dive */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-500/30">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isZh ? '三大自强化商业飞轮' : '3 Organic Growth Flywheels'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            {isZh ? '无缝闭环：为何 Soulscape 具有强抗周期的自我增长韧性' : 'Defensibility & Compound Organic Growth'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flywheel 1 */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
              F1
            </div>
            <h4 className="font-bold text-stone-100 text-sm">
              {isZh ? '内容仪式裂变飞轮 (Content & Viral)' : 'Content & Viral Flywheel'}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isZh 
                ? '每日 0 门槛免费单牌抽取 → 唯美荣格金句海报一键分享朋友圈与社媒 → 零成本引入高纯度同频新用户 → 扩充免费用户池。'
                : 'Free daily 1-card draw generates aesthetic reflection cards shared to social channels, pulling in organic new users at near-zero CAC.'}
            </p>
          </div>

          {/* Flywheel 2 */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
              F2
            </div>
            <h4 className="font-bold text-stone-100 text-sm">
              {isZh ? '时长沉淀与睡眠飞轮 (Habit & Retention)' : 'Habit & Retention Flywheel'}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isZh 
                ? '432Hz 助眠与德尔塔波冥想定时器 → 形成每晚固定打开的就寝仪式 → 极高 D30 留存率与驻留时长 → 自然转化为月费/年费订阅。'
                : 'Sleep-inducing 432Hz binaural tracks create indispensable evening routines, yielding exceptional 30-day retention.'}
            </p>
          </div>

          {/* Flywheel 3 */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700/80 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              F3
            </div>
            <h4 className="font-bold text-stone-100 text-sm">
              {isZh ? '导师私域互哺飞轮 (Mentor Network)' : 'Mentor Network Flywheel'}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isZh 
                ? '导师入驻自带私域忠实案主入驻预约 → 平台提供 80% 高额结算与专业排班工具 → 案主沉淀在平台日常听声波、抽神谕卡 → 平台反哺海量公域新流量。'
                : 'Mentors onboard their existing private clients for seamless scheduling; clients stay for daily sound therapy and oracle card readings.'}
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Moats Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <h3 className="font-serif font-bold text-xl text-stone-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>{isZh ? '四大竞争壁垒与护城河 (Strategic Moats)' : 'Core Strategic Moats'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="font-bold text-stone-900 text-sm mb-1">{isZh ? '1. 88张原创独立IP' : '1. Proprietary IP'}</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {isZh ? '全套原创神圣几何种子体系，彻底规避第三方版权连带纠纷与高昂版税。' : '100% original sacred archetype decks with clear legal pedigree.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="font-bold text-stone-900 text-sm mb-1">{isZh ? '2. 物理声波零CDN成本' : '2. Zero Audio CDN'}</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {isZh ? 'Web Audio API 浏览器本地端合成正弦波，无海量音频文件流媒体带宽开支。' : 'Native oscillator synthesis eliminating millions in audio storage.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="font-bold text-stone-900 text-sm mb-1">{isZh ? '3. 确定性智库降本' : '3. Deterministic AI Moat'}</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {isZh ? '前置模板意图分支拦截 70% 常见咨询，大幅降低商业大模型 Token 调用消耗。' : 'Deterministic branching shields from uncontrolled LLM cost spikes.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="font-bold text-stone-900 text-sm mb-1">{isZh ? '4. 严苛导师准入认证' : '4. Certified Mentors'}</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {isZh ? '资质证书审核 + 伦理守则筛除伪玄学欺诈，树立健康科技领域权威公信力。' : 'Rigorous vetting establishing brand trust and regulatory safety.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
