'use client';

import React from 'react';
import { useInvestor, FundingScenario } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Coins, 
  DollarSign, 
  ShieldCheck, 
  PieChart as PieIcon, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Scale, 
  AlertCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

export default function InvestorInvestmentPlanPage() {
  const { locale } = useApp();
  const { 
    fundingScenario, 
    setFundingScenario, 
    capitalAllocation, 
    updateCapitalAllocation, 
    resetCapitalAllocation,
    metrics,
    formatCurrency,
    formatPercent
  } = useInvestor();

  const isZh = locale === 'zh';

  const allocationChartData = [
    { name: isZh ? '研发与移动端PWA' : 'Engineering & PWA', value: capitalAllocation.development, color: '#0d9488' },
    { name: isZh ? 'AI算力与云端基建' : 'AI & Cloud Infrastructure', value: capitalAllocation.aiAndCloud, color: '#7c3aed' },
    { name: isZh ? '原创IP、音波录制与视觉' : 'Original IP & Content', value: capitalAllocation.brandingAndContent, color: '#d97706' },
    { name: isZh ? '商标版权、法务与合规' : 'Legal & Compliance', value: capitalAllocation.legalAndCompliance, color: '#2563eb' },
    { name: isZh ? '经营安全储备备用金' : 'Operating Cash Reserve', value: capitalAllocation.operatingReserve, color: '#059669' }
  ];

  // Estimated Runway based on current monthly OPEX
  const netMonthlyBurn = Math.max(1, metrics.totalOperatingExpenses - metrics.platformRecognizedRevenue);
  const estRunwayMonths = (capitalAllocation.totalBudgetMyr / netMonthlyBurn).toFixed(1);

  // Cap table illustrative structure
  const capTableData = [
    { name: isZh ? '创始人与核心技术团队' : 'Founders & Core Tech', percent: 75, shares: '7,500,000', noteZh: '4年标准分期行权 (1年断崖)', noteEn: '4-year vesting, 1-year cliff', color: '#1c1917' },
    { name: isZh ? '种子轮早期战略投资人' : 'Seed Investor Pool', percent: 15, shares: '1,500,000', noteZh: '普通股或标准 SAFE 协议', noteEn: 'Common stock or standard SAFE', color: '#0d9488' },
    { name: isZh ? '未来核心贡献者期权池 (ESOP)' : 'Employee Option Pool', percent: 10, shares: '1,000,000', noteZh: '用于预留关键增长合伙人', noteEn: 'Reserved for growth leads', color: '#d97706' }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>{isZh ? '资本分配推演与融资规划' : 'Capital Allocation & Funding Strategy'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {isZh ? '资本效率、安全跑道与股权架构蓝图' : 'Capital Efficiency, Runway Milestones & Cap Table'}
            </h1>
            <p className="mt-1 text-stone-600 text-sm">
              {isZh 
                ? '以精益自驱、极高资本使用效率为核心原则。测算 RM 50k / RM 80k / RM 100k 种子轮募资方案下的资金去向、安全周转月数与股权治理结构。'
                : 'Evaluating RM 50k, 80k, and 100k seed funding tiers to safeguard engineering delivery and runway.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
              {(['50k', '80k', '100k'] as FundingScenario[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFundingScenario(f)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    fundingScenario === f 
                      ? 'bg-white text-stone-900 shadow-xs' 
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  RM {f.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={resetCapitalAllocation}
              className="p-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50"
              title={isZh ? '重置预算配置' : 'Reset Budget'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Funding Scenarios Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={() => setFundingScenario('50k')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all ${
            fundingScenario === '50k' 
              ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-400/30' 
              : 'bg-white border-stone-200/90 hover:border-stone-300'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-stone-500">{isZh ? '精益验证方案' : 'Lean Tier'}</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">RM 50,000</span>
          </div>
          <h4 className="font-serif font-bold text-lg text-stone-900">{isZh ? '极简启动种子轮' : 'Bootstrap Seed'}</h4>
          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
            {isZh ? '重点保障 PWA 上线、首批 88 张卡牌上线与基础网关打通。' : 'Guarantees core PWA release, 88 card deck completion, and payments.'}
          </p>
          <div className="mt-4 pt-3 border-t border-stone-200/70 text-xs text-stone-500 flex justify-between">
            <span>{isZh ? '预期安全期' : 'Runway'}: ~5-7 {isZh ? '个月' : 'mo'}</span>
            <span className="text-stone-700 font-semibold">{isZh ? '精益造血' : 'High Lean'}</span>
          </div>
        </div>

        <div 
          onClick={() => setFundingScenario('80k')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all ${
            fundingScenario === '80k' 
              ? 'bg-teal-50/60 border-teal-500 ring-2 ring-teal-500/30' 
              : 'bg-white border-stone-200/90 hover:border-stone-300'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-teal-700">{isZh ? '推荐加速方案' : 'Recommended'}</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">RM 80,000</span>
          </div>
          <h4 className="font-serif font-bold text-lg text-stone-900">{isZh ? '稳健增长种子轮' : 'Acceleration Seed'}</h4>
          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
            {isZh ? '充裕的研发与营销预算，完整引入 30 位入驻导师并启动社媒流量测试。' : 'Optimal budget powering mentor onboarding and rapid user growth.'}
          </p>
          <div className="mt-4 pt-3 border-t border-teal-200/70 text-xs text-stone-500 flex justify-between">
            <span>{isZh ? '预期安全期' : 'Runway'}: ~8-12 {isZh ? '个月' : 'mo'}</span>
            <span className="text-teal-700 font-semibold">{isZh ? '黄金平衡' : 'Optimal'}</span>
          </div>
        </div>

        <div 
          onClick={() => setFundingScenario('100k')}
          className={`cursor-pointer rounded-2xl p-5 border transition-all ${
            fundingScenario === '100k' 
              ? 'bg-purple-50/60 border-purple-500 ring-2 ring-purple-500/30' 
              : 'bg-white border-stone-200/90 hover:border-stone-300'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-stone-500">{isZh ? '充沛扩张方案' : 'Expansion Tier'}</span>
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">RM 100,000</span>
          </div>
          <h4 className="font-serif font-bold text-lg text-stone-900">{isZh ? '全速扩张种子轮' : 'Scale Seed'}</h4>
          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
            {isZh ? '快速切入 B2B 企微身心工坊，推出首版实体典藏卡牌并预备跨国多语言版本。' : 'Enables enterprise expansion, physical merchandise, and localization.'}
          </p>
          <div className="mt-4 pt-3 border-t border-stone-200/70 text-xs text-stone-500 flex justify-between">
            <span>{isZh ? '预期安全期' : 'Runway'}: ~12-16 {isZh ? '个月' : 'mo'}</span>
            <span className="text-stone-700 font-semibold">{isZh ? '全速起跑' : 'High Scale'}</span>
          </div>
        </div>
      </div>

      {/* Allocation Breakdown: Donut Chart + Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-amber-600" />
              <span>{isZh ? '资本开支构成分布 (RM)' : 'Allocation Distribution'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {isZh ? `总筹资预算: RM ${capitalAllocation.totalBudgetMyr.toLocaleString()}` : `Total Budget: RM ${capitalAllocation.totalBudgetMyr.toLocaleString()}`}
            </p>

            <div className="mt-4 h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {allocationChartData.map((entry, index) => (
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

          <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
            {allocationChartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-stone-600 truncate max-w-[180px]">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <span>RM {item.value.toLocaleString()}</span>
                  <span className="text-stone-400 font-normal">({((item.value / capitalAllocation.totalBudgetMyr) * 100).toFixed(0)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 7 Cols: Sliders */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <span>{isZh ? '调节各项预算分配金额 (RM)' : 'Fine-Tune Allocation Categories'}</span>
            </h3>
            <span className="text-xs text-stone-400">{isZh ? '自定义测算' : 'Custom edit'}</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? '研发与移动端 PWA 工程' : 'Engineering & Mobile PWA'}</span>
                <span className="font-bold text-stone-900">RM {capitalAllocation.development.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="50000"
                step="1000"
                value={capitalAllocation.development}
                onChange={(e) => updateCapitalAllocation('development', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? 'AI 算力与高可用云端部署' : 'AI Inference & Cloud Infrastructure'}</span>
                <span className="font-bold text-stone-900">RM {capitalAllocation.aiAndCloud.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="25000"
                step="1000"
                value={capitalAllocation.aiAndCloud}
                onChange={(e) => updateCapitalAllocation('aiAndCloud', Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? '原创 IP 绘制、声波录制与视觉制作' : 'Original IP, Sound Production & Branding'}</span>
                <span className="font-bold text-stone-900">RM {capitalAllocation.brandingAndContent.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="25000"
                step="1000"
                value={capitalAllocation.brandingAndContent}
                onChange={(e) => updateCapitalAllocation('brandingAndContent', Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? '商标版权证书、律师协议与金融合规' : 'Legal, Copyright & Compliance'}</span>
                <span className="font-bold text-stone-900">RM {capitalAllocation.legalAndCompliance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="15000"
                step="1000"
                value={capitalAllocation.legalAndCompliance}
                onChange={(e) => updateCapitalAllocation('legalAndCompliance', Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-700 font-medium">{isZh ? '抗风险营运现金储备 (Buffer)' : 'Operating Cash Reserve'}</span>
                <span className="font-bold text-stone-900">RM {capitalAllocation.operatingReserve.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="35000"
                step="1000"
                value={capitalAllocation.operatingReserve}
                onChange={(e) => updateCapitalAllocation('operatingReserve', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cap Table Proposal & Negotiation Disclaimer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5 text-stone-600" />
            <span>{isZh ? '股权结构意向与资本治理 (Cap Table Proposal)' : 'Cap Table Proposal & Governance'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            {isZh ? '种子轮拟定股权结构图与合规声明' : 'Illustrative Equity Distribution & SAFE Proposal'}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            {isZh 
              ? '治理原则：核心创始团队保持绝对控制权与长线执行力，早期投资人享有标准反稀释保护与知情权，预留期权池用于吸引后续关键增长合伙人。'
              : 'Governance philosophy: Founder control with investor minority protection and reserved ESOP pool.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <th className="p-3 font-semibold">{isZh ? '股东类型 / 权益方' : 'Shareholder Type'}</th>
                <th className="p-3 font-semibold">{isZh ? '拟定持股比例' : 'Proposed Equity'}</th>
                <th className="p-3 font-semibold">{isZh ? '折合股数 (基数 10M)' : 'Shares (10M Base)'}</th>
                <th className="p-3 font-semibold">{isZh ? '行权与锁定期条款' : 'Vesting & Terms'}</th>
              </tr>
            </thead>
            <tbody>
              {capTableData.map((row, idx) => (
                <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50">
                  <td className="p-3 font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                    <span>{row.name}</span>
                  </td>
                  <td className="p-3 font-bold text-teal-700 text-sm">
                    {row.percent}%
                  </td>
                  <td className="p-3 font-mono text-stone-700">
                    {row.shares}
                  </td>
                  <td className="p-3 text-stone-600">
                    {isZh ? row.noteZh : row.noteEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clear Negotiable Disclaimer Alert */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-900 text-xs leading-relaxed space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>{isZh ? '投资人条款开放洽谈声明 (Negotiation Statement)' : 'Open Negotiation Statement'}</span>
          </div>
          <p>
            {isZh 
              ? '⚠️ 提示：上述融资金额（RM 50k - RM 100k）、估值上限（Valuation Cap）、出让比例及协议形式（可转债 / SAFE / 普通股）均为初步模拟推演方案。具体投融资条款保持高度开放，欢迎根据战略资源互补性与投资人友好协商定制。'
              : '⚠️ Disclaimer: All numbers, valuation caps, and equity percentages represent illustrative starting models. Final investment structure and terms are negotiable with aligned strategic partners.'}
          </p>
        </div>
      </div>
    </div>
  );
}
