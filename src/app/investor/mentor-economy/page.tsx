'use client';

import React, { useState } from 'react';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Scale, 
  HelpCircle, 
  PieChart as PieIcon, 
  Briefcase, 
  FileText, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function InvestorMentorEconomyPage() {
  const { locale } = useApp();
  const { 
    metrics, 
    inputs, 
    formatCurrency, 
    formatNumber, 
    formatPercent 
  } = useInvestor();

  const isZh = locale === 'zh';

  // Interactive Mentor Earning Calculator
  const [calculatorSessions, setCalculatorSessions] = useState(25);
  const [calculatorSessionPrice, setCalculatorSessionPrice] = useState(180);

  const calcGmv = calculatorSessions * calculatorSessionPrice;
  const calcMentorPayout = calcGmv * 0.8;
  const calcPlatformTake = calcGmv * 0.2;

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3 border border-teal-200">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>{isZh ? '导师市场经济模型与治理架构' : 'Mentor Marketplace & Economics'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            {isZh ? '高客单撮合平台：80/20 分润机制与股权边界界定' : 'High-Ticket Marketplace: 80/20 Take-Rate & Equity Boundaries'}
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {isZh 
              ? '通过严选心理咨询师、颂钵疗愈师与荣格原理解读师，Soulscape 构建高客单 1对1 预约撮合平台。平台统一提供日程排期、定金托管、视频通道与履约评价，严谨把控服务质量。'
              : 'Connecting seekers with certified sound healers, counselors, and Jungian mentors via an escrowed 80/20 take-rate marketplace.'}
          </p>
        </div>
      </div>

      {/* Aggregate Economics Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '月度导师总交易额 (GMV)' : 'Monthly Mentor GMV'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            {formatCurrency(metrics.mentorGrossBookingValue)}
          </div>
          <div className="text-xs text-stone-500 mt-1 flex items-center justify-between">
            <span>{formatNumber(metrics.mentorBookings)} {isZh ? '场咨询/月' : 'sessions/mo'}</span>
            <span className="text-stone-700 font-medium">{formatCurrency(inputs.avgBookingValueMyr)} / {isZh ? '单' : 'avg'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '导师分润结算池 (80%)' : 'Mentor Payout (80%)'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-teal-700 mt-1">
            {formatCurrency(metrics.mentorPayout)}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isZh ? '高激励分成，驱动导师主动导入自有私域案主' : 'High take incentivizing mentors to bring private clients'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-stone-100 rounded-2xl p-5 shadow-xs border border-stone-800">
          <div className="text-xs text-amber-400 uppercase tracking-wider font-semibold">
            {isZh ? '平台确认佣金收入 (20%)' : 'Platform Commission (20%)'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-300 mt-1">
            {formatCurrency(metrics.platformMentorCommission)}
          </div>
          <div className="text-xs text-stone-300 mt-1">
            {isZh ? '100% 净贡献毛利，零边际交付边际成本' : 'Zero marginal delivery cost pure marketplace margin'}
          </div>
        </div>
      </div>

      {/* Governance & Dilution Clarity Box (CRITICAL FOR INVESTORS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2 border border-amber-200">
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>{isZh ? '投资人尽调合规说明 · 权属边界' : 'Legal & Corporate Governance Clarity'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            {isZh ? '四大权属清晰界定：入驻导师绝不稀释公司股权' : 'Four Discrete Commercial Spheres: Zero Cap Table Dilution'}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            {isZh 
              ? '针对早期投资人普遍关切的“名师导师是否要求股权分成”的合规问题，Soulscape 严格设立四维隔离墙：'
              : 'Clearly isolating platform cap table equity from commercial marketplace commission contracts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-xs mb-3">
              01
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '公司股权 (Cap Table)' : 'Company Equity'}</h4>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '仅归属于核心创始团队与合规机构投资人。平台入驻导师纯属商业履约合作伙伴，无股权期权赠予。'
                : '100% reserved for founders and equity investors. Mentors hold strictly zero automatic equity rights.'}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-stone-500 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isZh ? '零股权稀释隐患' : 'Zero Dilution Risk'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/80">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mb-3">
              02
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '市场分润 (80/20 Split)' : 'Marketplace Take'}</h4>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '导师基于实际成交的 1对1 咨询服务获得 80% 现金结算，平台抽取 20% 服务费，属于即时结清的经营成本。'
                : 'Performance-based 80% payout on completed sessions; platform retains 20% commission fee.'}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-teal-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>{isZh ? '契约明确，按单结算' : 'Strict Service Agreement'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs mb-3">
              03
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? 'IP授权与课程版税 (Licensing)' : 'IP & Royalty'}</h4>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '针对大师联合录制的专属课程或定制牌卡，采用净销售额 15-25% 的版税阶梯协议，权属永久归平台所有。'
                : 'Exclusive branded courses paid on net sales royalty tiers; IP remains fully assigned to platform.'}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{isZh ? '平台持有核心资产' : 'Platform IP Ownership'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs mb-3">
              04
            </div>
            <h4 className="font-bold text-stone-900 text-sm">{isZh ? '技术订阅 (SaaS ARR)' : 'SaaS Technology'}</h4>
            <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
              {isZh 
                ? '用户支付的 RM 39 月费 100% 归平台所有，导师无权分享会员订阅池，确保 SaaS 核心现金流的高估值倍数。'
                : 'SaaS subscription cash flows belong 100% to platform; mentors have no claim to recurring ARR.'}
            </p>
            <div className="mt-3 text-[11px] font-semibold text-purple-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
              <span>{isZh ? 'ARR 纯度 100%' : '100% Pure ARR'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Single-Mentor Earnings Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {isZh ? '单个入驻导师月度创收与平台贡献测算器' : 'Individual Mentor Earnings Calculator'}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {isZh ? '调节导师月接单场次与平均客单价，观察导师月入与平台提成' : 'Simulate mentor monthly earnings vs platform retained take'}
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-medium">
            80% Mentor / 20% Platform
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            {/* Sessions slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? '导师月度完成咨询场次' : 'Monthly Completed Sessions'}</span>
                <span className="font-bold text-stone-900">{calculatorSessions} {isZh ? '场' : 'sessions'}</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={calculatorSessions}
                onChange={(e) => setCalculatorSessions(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Price slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? '单场咨询客单价 (MYR)' : 'Session Fee (MYR)'}</span>
                <span className="font-bold text-stone-900">RM {calculatorSessionPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                step="20"
                value={calculatorSessionPrice}
                onChange={(e) => setCalculatorSessionPrice(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 space-y-4">
            <div className="flex justify-between items-center text-xs text-stone-500 pb-2 border-b border-stone-200">
              <span>{isZh ? '该导师月度总流水 (GMV)' : 'Total Monthly GMV'}</span>
              <span className="font-bold text-stone-900 text-sm">RM {calcGmv.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                <span className="text-stone-700 font-medium">{isZh ? '导师实收月薪 (80%)' : 'Mentor Take-Home'}</span>
              </div>
              <span className="font-bold text-teal-700 text-base">RM {calcMentorPayout.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span className="text-stone-700 font-medium">{isZh ? '平台抽佣利润 (20%)' : 'Platform Margin'}</span>
              </div>
              <span className="font-bold text-amber-700 text-base">RM {calcPlatformTake.toLocaleString()}</span>
            </div>

            <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-200 leading-relaxed">
              {isZh 
                ? '按平台签约 50 位活跃导师推演，平台仅导师撮合模块月净抽佣即可达 RM 45,000+，形成极其强劲的无风险现金流基石。'
                : 'With 50 active mentors, platform monthly commissions exceed RM 45,000+ with zero capital expenditure.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
