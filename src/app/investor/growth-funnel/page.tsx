'use client';

import React from 'react';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Filter, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Compass, 
  RotateCw, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';

export default function InvestorGrowthFunnelPage() {
  const { locale } = useApp();
  const { 
    funnelStages, 
    updateFunnelStage, 
    resetFunnel, 
    inputs, 
    formatCurrency, 
    formatNumber, 
    formatPercent 
  } = useInvestor();

  const isZh = locale === 'zh';

  // Calculate funnel step counts
  const visitors = Math.round(funnelStages.impressions * funnelStages.visitorsToLandingRate);
  const registered = Math.round(visitors * funnelStages.visitorToRegRate);
  const engaged = Math.round(registered * funnelStages.regToEngagementRate);
  const aiTried = Math.round(engaged * funnelStages.engagementToAiRate);
  const paid = Math.round(aiTried * funnelStages.aiToPaidRate);
  const mentorBooked = Math.round(paid * funnelStages.paidToMentorRate);
  const retained = Math.round(paid * funnelStages.retentionRate);

  const funnelChartData = [
    { stageZh: '1. 社媒曝光 (Impressions)', stageEn: '1. Impressions', count: funnelStages.impressions, fill: '#78716c' },
    { stageZh: '2. 着陆页访客 (Visitors)', stageEn: '2. Visitors', count: visitors, fill: '#64748b' },
    { stageZh: '3. 注册用户 (Signups)', stageEn: '3. Signups', count: registered, fill: '#0d9488' },
    { stageZh: '4. 核心觉知交互 (Engaged)', stageEn: '4. Engaged', count: engaged, fill: '#059669' },
    { stageZh: '5. AI向导体验 (AI Query)', stageEn: '5. AI Query', count: aiTried, fill: '#d97706' },
    { stageZh: '6. 付费转化 (Paid Subs/Pts)', stageEn: '6. Paid Users', count: paid, fill: '#b45309' },
    { stageZh: '7. 导师咨询 (Mentor Booked)', stageEn: '7. Mentor Consult', count: mentorBooked, fill: '#7c3aed' },
    { stageZh: '8. D30 长期留存 (Retained)', stageEn: '8. Retained', count: retained, fill: '#4338ca' }
  ];

  // CAC & LTV Calculations
  const estCacMyr = inputs.marketingSpendMonthlyMyr / (paid || 1);
  const avgMonthsRetained = 6.5;
  const estLtvMyr = (inputs.subscriptionPriceMyr * avgMonthsRetained) + (inputs.avgCreditsPurchaseMyr * 1.5) + (inputs.avgBookingValueMyr * 0.20 * 0.3);
  const ltvCacRatio = estLtvMyr / (estCacMyr || 1);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-3 border border-blue-200">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>{isZh ? '8阶转化漏斗与全生命周期价值 (LTV/CAC)' : '8-Stage Conversion Funnel & LTV/CAC'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {isZh ? '用户获取漏斗与跨内容互导矩阵' : 'Customer Acquisition Funnel & LTV/CAC Engine'}
            </h1>
            <p className="mt-1 text-stone-600 text-sm">
              {isZh 
                ? '从社媒灵感卡片曝光，到无感注册、每日抽卡试听、AI 深聊触发微充值，直至高端导师撮合。清晰展示每一级转化率与衰减护城河。'
                : 'Mapping user journey from top-of-funnel impressions to retained subscribers and high-ticket mentor bookings.'}
            </p>
          </div>

          <button
            onClick={resetFunnel}
            className="self-start md:self-auto px-3.5 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
          >
            {isZh ? '重置漏斗基准' : 'Reset Funnel'}
          </button>
        </div>
      </div>

      {/* CAC & LTV Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '获客成本 (CAC 测算)' : 'Estimated Blended CAC'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            RM {estCacMyr.toFixed(1)}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isZh ? '含社媒裂变与免费卡牌自传播' : 'Blended with viral organic share'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '用户生命周期价值 (LTV 测算)' : 'Estimated Customer LTV'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-teal-700 mt-1">
            RM {estLtvMyr.toFixed(1)}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isZh ? `基于 ~${avgMonthsRetained} 个月订阅 + 积分 + 导师提成` : `Based on ~${avgMonthsRetained} mo subscription + credits`}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-xs">
          <div className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">
            {isZh ? 'LTV / CAC 比率 (极佳健康度)' : 'LTV / CAC Ratio'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-300 mt-1">
            {ltvCacRatio.toFixed(1)}x
          </div>
          <div className="text-xs text-emerald-400 mt-1">
            {isZh ? '远超风投健康门槛 (3.0x)' : 'Far exceeds the 3.0x VC benchmark'}
          </div>
        </div>
      </div>

      {/* Visual Funnel Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">
          {isZh ? '8 阶转化全景漏斗柱状图 (人次规模)' : '8-Stage Conversion Funnel'}
        </h3>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f5f5f4" />
              <XAxis type="number" stroke="#a8a29e" fontSize={11} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
              <YAxis 
                type="category" 
                dataKey={isZh ? "stageZh" : "stageEn"} 
                stroke="#44403c" 
                fontSize={11} 
                tickLine={false} 
                width={170}
              />
              <Tooltip 
                formatter={(val: number) => [val.toLocaleString(), isZh ? '人次' : 'Users']}
                contentStyle={{ backgroundColor: '#1c1917', borderRadius: '10px', border: 'none', color: '#f5f5f4', fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {funnelChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Conversion Rate Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-5">
        <h3 className="font-serif font-bold text-lg text-stone-900 pb-3 border-b border-stone-100">
          {isZh ? '调节各层级阶段转化率假设' : 'Adjust Funnel Conversion Rates'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '着陆页访问率 (Impressions → Visitors)' : 'Impression to Visitor Rate'}</span>
              <span className="font-bold text-stone-900">{formatPercent(funnelStages.visitorsToLandingRate)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.40"
              step="0.01"
              value={funnelStages.visitorsToLandingRate}
              onChange={(e) => updateFunnelStage('visitorsToLandingRate', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '访客注册转化率 (Visitors → Signups)' : 'Visitor to Signup Rate'}</span>
              <span className="font-bold text-stone-900">{formatPercent(funnelStages.visitorToRegRate)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.45"
              step="0.01"
              value={funnelStages.visitorToRegRate}
              onChange={(e) => updateFunnelStage('visitorToRegRate', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '注册至核心体验率 (Signups → Engaged)' : 'Signup to Engaged Rate'}</span>
              <span className="font-bold text-stone-900">{formatPercent(funnelStages.regToEngagementRate)}</span>
            </div>
            <input
              type="range"
              min="0.30"
              max="0.85"
              step="0.02"
              value={funnelStages.regToEngagementRate}
              onChange={(e) => updateFunnelStage('regToEngagementRate', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? 'AI 体验至付费率 (AI → Paid)' : 'AI to Paid Rate'}</span>
              <span className="font-bold text-stone-900">{formatPercent(funnelStages.aiToPaidRate)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.30"
              step="0.01"
              value={funnelStages.aiToPaidRate}
              onChange={(e) => updateFunnelStage('aiToPaidRate', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Cross-Content Discovery Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
          {isZh ? '跨内容交叉导流矩阵 (Cross-Discovery Matrix)' : 'Cross-Content Discovery Pathways'}
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          {isZh ? '无论用户从哪个入口切入，系统均能通过算法推荐与觉知关联导向更高价值模块。' : 'How entry points naturally guide users toward high-value modalities.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-2">
            <div className="font-bold text-stone-900 text-sm">{isZh ? '入口 A: 神谕卡占读' : 'Entry A: Oracle Reading'}</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '抽中第 42 号「心之引磬」→ 页面推荐 528Hz 绿度母爱之振频 → 引导开启 15 分钟冥想定时器。' 
                : 'Pulls Card #42 Heart Chime -> Recommends 528Hz Love Frequency -> Launches 15-min meditation.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/70 space-y-2">
            <div className="font-bold text-stone-900 text-sm">{isZh ? '入口 B: 432Hz 助眠声波' : 'Entry B: Sound Sleep'}</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '听完 30 分钟深睡音轨 → 次日早晨推送晨间觉察神谕卡 → 引导进入 AI 解惑与全天脉轮调频。' 
                : 'Finishes 30-min deep sleep track -> Morning prompt invites a 1-card dawn reflection.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-2">
            <div className="font-bold text-stone-900 text-sm">{isZh ? '入口 C: 知识库与导师' : 'Entry C: Mentors & Articles'}</div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '阅读《荣格心理学与阴影整合》深度长文 → 体验文末配套测试题 → 一键预约原作者导师 1对1 咨询。' 
                : 'Reads article on Jungian shadow integration -> Takes somatic quiz -> Books author for 1-on-1.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
