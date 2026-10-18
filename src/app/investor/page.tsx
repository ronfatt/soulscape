'use client';

import React from 'react';
import Link from 'next/link';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Cpu, 
  DollarSign, 
  Compass, 
  Presentation, 
  Layers, 
  Calculator, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PieChart as PieIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function InvestorCommandCenterPage() {
  const { locale } = useApp();
  const { 
    scenario, 
    inputs, 
    metrics, 
    formatCurrency, 
    formatNumber, 
    formatPercent,
    startTour 
  } = useInvestor();

  const isZh = locale === 'zh';

  // Pie chart data for revenue streams
  const revenueDistributionData = [
    { 
      name: isZh ? '订阅会员费' : 'Subscriptions', 
      value: Math.round(metrics.subscriptionRevenue), 
      color: '#0d9488' // teal-600
    },
    { 
      name: isZh ? '积分点卡消耗' : 'Credits (Recognized)', 
      value: Math.round(metrics.creditsRecognizedRevenue), 
      color: '#d97706' // amber-600
    },
    { 
      name: isZh ? '导师佣金 (20%)' : 'Mentor Commission (20%)', 
      value: Math.round(metrics.platformMentorCommission), 
      color: '#7c3aed' // violet-600
    }
  ];

  const totalRev = metrics.platformRecognizedRevenue || 1;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Mission Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isZh ? 'Soulscape 商业智能与投融资决策中枢' : 'Soulscape Executive BI & Investor Suite'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            {isZh ? '数字身心科技 · 商业化全景驾驶舱' : 'Digital Wellness Tech · Executive Command Center'}
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            {isZh 
              ? '构建集 AI 神谕卡占读、432Hz 双耳音频、七脉轮沉浸调频、严选导师服务与积分经济于一体的数字身心健康觉知平台。本中枢实时推演用户留存、订阅转化、导师分润与 AI 边际成本。'
              : 'Unifying AI Oracle readings, 432Hz binaural sound therapy, chakra alignment, certified mentor booking, and micro-credits into a cohesive wellness ecosystem.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={startTour}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-sm shadow-md transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{isZh ? '启动 12 步路演讲解模式' : 'Start 12-Step Guided Pitch'}</span>
            </button>
            <Link
              href="/investor/presentation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 font-semibold text-sm border border-stone-700 transition-all"
            >
              <Presentation className="w-4 h-4" />
              <span>{isZh ? '浏览 12 页路演幻灯片' : 'View 12 Pitch Slides'}</span>
            </Link>
            <Link
              href="/investor/revenue-simulator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-300 font-semibold text-sm border border-stone-700 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>{isZh ? '调参测算引擎' : 'Revenue Simulator'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Users & MAU */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isZh ? '注册用户 / 月活 MAU' : 'Registered / MAU'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            {formatNumber(metrics.mau)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
            <span>{isZh ? '总注册量:' : 'Total Users:'} {formatNumber(inputs.registeredUsers)}</span>
            <span className="text-teal-700 font-semibold">{formatPercent(inputs.mauRate)} MAU</span>
          </div>
        </div>

        {/* Card 2: Subscribers */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isZh ? '付费订阅会员' : 'Subscribers'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            {formatNumber(metrics.premiumSubscribers)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
            <span>{isZh ? '转化率:' : 'Conv. Rate:'} {formatPercent(inputs.premiumConversionRate)}</span>
            <span className="text-stone-700 font-medium">{formatCurrency(inputs.subscriptionPriceMyr)} / {isZh ? '月' : 'mo'}</span>
          </div>
        </div>

        {/* Card 3: Monthly Net Recognized Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isZh ? '月度平台净确认收入' : 'Monthly Net Revenue'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-700">
            {formatCurrency(metrics.platformRecognizedRevenue)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
            <span>{isZh ? '导师GMV:' : 'Mentor GMV:'} {formatCurrency(metrics.mentorGrossBookingValue)}</span>
            <span className="text-emerald-700 font-semibold">{formatPercent(metrics.contributionMarginPercent)} {isZh ? '毛利率' : 'Margin'}</span>
          </div>
        </div>

        {/* Card 4: Net Cash Flow & Runway */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {isZh ? '月度净现金流 / 跑道' : 'Net Cash Flow / Runway'}
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              metrics.netCashFlow >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}>
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold font-serif ${
            metrics.netCashFlow >= 0 ? 'text-emerald-700' : 'text-red-600'
          }`}>
            {formatCurrency(metrics.netCashFlow)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
            <span>{isZh ? '保本订阅者:' : 'Break-Even:'} {formatNumber(metrics.breakEvenSubscribers)}</span>
            <span className={`font-semibold ${metrics.runwayMonths === null ? 'text-emerald-700' : 'text-amber-700'}`}>
              {metrics.runwayMonths === null ? (isZh ? '现金流为正' : 'Positive Cash') : `${metrics.runwayMonths} ${isZh ? '个月跑道' : 'mo Runway'}`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 12-Month Projected Growth */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                <span>{isZh ? '12 个月财务模型演进 (收入 vs 运营成本)' : '12-Month Financial Projection'}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {isZh ? `基于月度用户增长率 ${formatPercent(inputs.monthlyGrowthRate)} 与权责发生制净收入` : 'Based on deterministic monthly growth and GAAP recognized revenue'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                {isZh ? '确认收入 (RM)' : 'Recognized Rev'}
              </span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-3 h-3 rounded-full bg-stone-400 inline-block" />
                {isZh ? '总支出 (RM)' : 'Total Cost'}
              </span>
            </div>
          </div>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.twelveMonthProjection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#78716c" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#78716c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
                <XAxis dataKey="monthLabel" stroke="#a8a29e" fontSize={11} tickLine={false} />
                <YAxis stroke="#a8a29e" fontSize={11} tickLine={false} tickFormatter={(val) => `RM${(val/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(val: number) => [`RM ${val.toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#f5f5f4', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="recognizedRevenue" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" name={isZh ? '确认净收入' : 'Net Rev'} />
                <Area type="monotone" dataKey="totalExpenses" stroke="#78716c" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorCost)" name={isZh ? '总营运支出' : 'Total Expense'} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Revenue Stream Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-amber-600" />
              <span>{isZh ? '多元收入引擎结构' : 'Revenue Composition'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {isZh ? '高粘性订阅 + 微积分扣减 + 导师抽佣' : 'SaaS + Microtransactions + Marketplace Take'}
            </p>

            <div className="mt-4 h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {revenueDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: number) => [`RM ${val.toLocaleString()}`, '']}
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '8px', border: 'none', color: '#f5f5f4', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            {revenueDistributionData.map((stream, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stream.color }} />
                  <span className="text-stone-600 font-medium">{stream.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900">RM {stream.value.toLocaleString()}</span>
                  <span className="text-stone-400">({((stream.value / totalRev) * 100).toFixed(0)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Ecosystem Flowchart Architecture */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-stone-500" />
            <span>{isZh ? '产品全景生态联动闭环' : 'Integrated Product Flywheel'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            {isZh ? '五大身心模块无缝咬合的商业飞轮' : '5 Core Synergy Flywheels'}
          </h3>
          <p className="mt-1 text-stone-600 text-sm">
            {isZh 
              ? '用户并非孤立消费某一个功能，而是沿着觉知链条持续在卡牌、声波、脉轮调频与导师咨询之间流动，创造极高的 LTV 与自发复购。'
              : 'Users transition seamlessly across somatic modalities, creating strong retention and high lifetime value.'}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Node 1: Oracle Cards */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-amber-400 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm mb-3">
              01
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '88枚原创神谕卡' : '88 Oracle Decks'}</h4>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {isZh ? '每日 0 门槛免费单牌抽取，沉浸仪式感锚定每日心智，激发分享传播。' : 'Free daily reading hook driving high daily active retention.'}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-amber-700 font-semibold">
              <span>{isZh ? '用户增长抓手' : 'Acquisition Hook'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Node 2: Sound Therapy */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-teal-400 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              02
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '432Hz 双耳音频' : 'Binaural Sound'}</h4>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {isZh ? '占读后自动推荐对应频率声波，Web Audio API 本地实时合成，极低带宽成本。' : 'Oscillator-synthesized frequencies paired with card readings.'}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-teal-700 font-semibold">
              <span>{isZh ? '时长留存引擎' : 'Engagement Anchor'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Node 3: AI Soul Guide */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-purple-400 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm mb-3">
              03
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? 'AI 智能解惑向导' : 'AI Soul Guide'}</h4>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {isZh ? '基于荣格原型与觉知智库生成个性化洞察，消耗积分点数，高毛利模型。' : 'Deterministic & decoupled LLM adapter consuming micro-credits.'}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-purple-700 font-semibold">
              <span>{isZh ? '微付费闭环' : 'Credits Monetization'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Node 4: Chakras & Courses */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-emerald-400 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
              04
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '七脉轮与心智课程' : 'Chakras & Courses'}</h4>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {isZh ? '系统化七脉轮身心疗愈进阶，会员无限制解锁全库深度专题课程。' : 'Deep thematic journeys driving recurring SaaS subscription conversion.'}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
              <span>{isZh ? 'SaaS 订阅支柱' : 'SaaS ARR Engine'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Node 5: Mentor Marketplace */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-blue-400 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-3">
              05
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '严选真人导师预约' : 'Master Mentors'}</h4>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {isZh ? '从 AI 探索升级为 1对1 资深身心导师咨询，平台收取 20% 撮合佣金。' : 'High-ticket 1-on-1 consultations with 20% platform take rate.'}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-blue-700 font-semibold">
              <span>{isZh ? '高客单 GMV 放大' : 'High-Ticket GMV'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards to Deep Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/investor/business-model"
          className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-stone-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900 group-hover:text-amber-700 transition-colors">
            {isZh ? '商业模式与飞轮机制 →' : 'Business Model & Flywheel →'}
          </h4>
          <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
            {isZh ? '深入了解五维变现模式、SaaS 订阅与积分双轨架构，以及获客飞轮驱动力。' : 'Explore monetization streams, freemium conversion, and viral flywheel design.'}
          </p>
        </Link>

        <Link
          href="/investor/mentor-economy"
          className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-stone-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 group-hover:bg-teal-100 group-hover:text-teal-800 transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900 group-hover:text-teal-700 transition-colors">
            {isZh ? '导师经济与 80/20 分润 →' : 'Mentor Economy & Take Rate →'}
          </h4>
          <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
            {isZh ? '透视导师入驻门槛、GMV 结算流转，以及创始人股权与导师 IP 授权的清晰界限。' : 'Examine mentor marketplace GMV, take rates, and governance clarity.'}
          </p>
        </Link>

        <Link
          href="/investor/investment-plan"
          className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md hover:border-stone-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 group-hover:bg-purple-100 group-hover:text-purple-800 transition-colors">
            <DollarSign className="w-5 h-5" />
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900 group-hover:text-purple-700 transition-colors">
            {isZh ? '资本开支与融资方案 →' : 'Capital Allocation & Funding →'}
          </h4>
          <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
            {isZh ? '测算 RM50k / RM80k / RM100k 种子轮资金分配、烧钱跑道与股权结构意向。' : 'Simulate RM50k-RM100k seed allocation, runway milestones, and cap table.'}
          </p>
        </Link>
      </div>
    </div>
  );
}
