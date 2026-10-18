'use client';

import React from 'react';
import { useInvestor, ScenarioPreset } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Calculator, 
  RotateCcw, 
  TrendingUp, 
  DollarSign, 
  Sliders, 
  ShieldAlert, 
  Sparkles,
  PieChart as PieIcon,
  HelpCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export default function InvestorRevenueSimulatorPage() {
  const { locale } = useApp();
  const { 
    scenario, 
    setScenario, 
    inputs, 
    updateInput, 
    resetScenario, 
    metrics, 
    formatCurrency, 
    formatPercent, 
    formatNumber 
  } = useInvestor();

  const isZh = locale === 'zh';

  // Sensitivity matrix variations: conversion rates (row) vs prices (col)
  const convRates = [0.02, 0.035, 0.045, 0.06, 0.08];
  const pricePoints = [29, 39, 49, 59, 79];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>{isZh ? '动态参数推演引擎 (MYR / 马币)' : 'Dynamic Revenue Modeling Engine (MYR)'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {isZh ? '实时财务测算与敏感度分析' : 'Real-time Financial Simulation & Sensitivity'}
            </h1>
            <p className="mt-1 text-stone-600 text-sm">
              {isZh 
                ? '支持自定义调节用户规模、付费转化率、客单价、导师抽佣与各项营运开支。系统实时根据权责发生制计算月度确认收入与保本门槛。'
                : 'Freely adjust user scale, conversions, prices, take rates, and OPEX to evaluate margins and cash burn.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
              {(['conservative', 'base', 'growth'] as ScenarioPreset[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    scenario === s 
                      ? 'bg-white text-stone-900 shadow-xs font-bold' 
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {s === 'conservative' ? (isZh ? '保守情境' : 'Conservative') : s === 'base' ? (isZh ? '基准情境' : 'Base') : (isZh ? '进取情境' : 'Growth')}
                </button>
              ))}
            </div>

            <button
              onClick={resetScenario}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isZh ? '重置参数' : 'Reset'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Output Summary Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-sm">
          <div className="text-xs text-emerald-300 font-medium">
            {isZh ? '月度平台净确认收入' : 'Net Recognized Revenue'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            {formatCurrency(metrics.platformRecognizedRevenue)}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>{isZh ? '毛利率:' : 'Margin:'} {formatPercent(metrics.contributionMarginPercent)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 font-medium">
            {isZh ? '月度营运总支出 (OPEX)' : 'Monthly Total OPEX'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            {formatCurrency(metrics.totalOperatingExpenses)}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            <span>{isZh ? '含营销/云端/AI/运维' : 'Incl. Mktg, Cloud, AI, Ops'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 font-medium">
            {isZh ? '月度净现金流' : 'Monthly Net Cash Flow'}
          </div>
          <div className={`text-2xl sm:text-3xl font-bold font-serif mt-1 ${
            metrics.netCashFlow >= 0 ? 'text-emerald-700' : 'text-red-600'
          }`}>
            {formatCurrency(metrics.netCashFlow)}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            <span>{isZh ? '现金流入:' : 'Cash Inflow:'} {formatCurrency(metrics.totalCashInflow)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 font-medium">
            {isZh ? '保本所需订阅用户数' : 'Break-Even Subscribers'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            {formatNumber(metrics.breakEvenSubscribers)}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            <span>{isZh ? '当前订阅者:' : 'Current Subs:'} {formatNumber(metrics.premiumSubscribers)}</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Scale & Revenue Drivers */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>{isZh ? '用户规模与收入变量' : 'User Scale & Revenue Drivers'}</span>
            </h3>
            <span className="text-xs text-stone-400">{isZh ? '滑动即时计算' : 'Live sliders'}</span>
          </div>

          {/* Slider 1: Registered Users */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '注册用户总数 (Registered Users)' : 'Registered Users'}</span>
              <span className="font-bold text-stone-900">{formatNumber(inputs.registeredUsers)}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="150000"
              step="1000"
              value={inputs.registeredUsers}
              onChange={(e) => updateInput('registeredUsers', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Slider 2: MAU Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '月活比率 (MAU %)' : 'MAU Rate'}</span>
              <span className="font-bold text-stone-900">{formatPercent(inputs.mauRate)} ({formatNumber(metrics.mau)} MAU)</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.65"
              step="0.01"
              value={inputs.mauRate}
              onChange={(e) => updateInput('mauRate', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Slider 3: Premium Conversion Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '订阅会员转化率 (Sub Conversion)' : 'Subscription Conversion'}</span>
              <span className="font-bold text-stone-900">{formatPercent(inputs.premiumConversionRate)} ({formatNumber(metrics.premiumSubscribers)} 人)</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.12"
              step="0.005"
              value={inputs.premiumConversionRate}
              onChange={(e) => updateInput('premiumConversionRate', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Slider 4: Subscription Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '订阅月费 (Subscription Price RM)' : 'Monthly Subscription Price'}</span>
              <span className="font-bold text-stone-900">{formatCurrency(inputs.subscriptionPriceMyr)} / 月</span>
            </div>
            <input
              type="range"
              min="19"
              max="89"
              step="5"
              value={inputs.subscriptionPriceMyr}
              onChange={(e) => updateInput('subscriptionPriceMyr', Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Slider 5: Mentor Booking Rate & Take-rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '导师预约率 & 抽佣比' : 'Mentor Booking Rate & Commission'}</span>
              <span className="font-bold text-stone-900">{formatPercent(inputs.mentorBookingRate)} @ {formatPercent(inputs.platformCommissionRate)} 抽佣</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="range"
                min="0.004"
                max="0.04"
                step="0.002"
                value={inputs.mentorBookingRate}
                onChange={(e) => updateInput('mentorBookingRate', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <input
                type="range"
                min="0.10"
                max="0.30"
                step="0.01"
                value={inputs.platformCommissionRate}
                onChange={(e) => updateInput('platformCommissionRate', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: OPEX, AI, Marketing Drivers */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-teal-600" />
              <span>{isZh ? '成本与营运支出变量 (OPEX)' : 'Cost & Operating Expenses'}</span>
            </h3>
            <span className="text-xs text-stone-400">{isZh ? '马币单位 RM' : 'MYR Units'}</span>
          </div>

          {/* Marketing Spend */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '月度获客与社媒投放预算' : 'Marketing & User Acquisition'}</span>
              <span className="font-bold text-stone-900">{formatCurrency(inputs.marketingSpendMonthlyMyr)} / 月</span>
            </div>
            <input
              type="range"
              min="1000"
              max="40000"
              step="1000"
              value={inputs.marketingSpendMonthlyMyr}
              onChange={(e) => updateInput('marketingSpendMonthlyMyr', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Cloud Server */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '云端基础设施与高可用部署' : 'Cloud Infrastructure'}</span>
              <span className="font-bold text-stone-900">{formatCurrency(inputs.cloudServerMonthlyMyr)} / 月</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={inputs.cloudServerMonthlyMyr}
              onChange={(e) => updateInput('cloudServerMonthlyMyr', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* General OPEX */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '常规行政、法务与兼职社群' : 'General & Administrative'}</span>
              <span className="font-bold text-stone-900">{formatCurrency(inputs.operatingExpensesMonthlyMyr)} / 月</span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="1000"
              value={inputs.operatingExpensesMonthlyMyr}
              onChange={(e) => updateInput('operatingExpensesMonthlyMyr', Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* AI Unit Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '单次 AI 交互 Token 成本' : 'AI Token Cost / Interaction'}</span>
              <span className="font-bold text-stone-900">RM {inputs.aiCostPerInteraction.toFixed(2)} (月总计: {formatCurrency(metrics.aiTotalCost)})</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.10"
              step="0.005"
              value={inputs.aiCostPerInteraction}
              onChange={(e) => updateInput('aiCostPerInteraction', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Monthly Growth Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-700 font-medium">{isZh ? '推演月度复合增长率 (MoM)' : 'Monthly Growth Rate (MoM)'}</span>
              <span className="font-bold text-stone-900">{formatPercent(inputs.monthlyGrowthRate)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.20"
              step="0.01"
              value={inputs.monthlyGrowthRate}
              onChange={(e) => updateInput('monthlyGrowthRate', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="mb-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            {isZh ? '双变量敏感度分析矩阵 (会员费定价 × 转化率)' : 'Two-Way Sensitivity Matrix (Price × Conversion)'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {isZh 
              ? '矩阵数值展示不同客单价与转化率组合下的预计平台月度订阅确认收入 (RM)。黄色高亮为当前参数区间。'
              : 'Projected monthly subscription revenue across varying prices and conversion rates. Amber highlighted cell represents current state.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <th className="p-3 font-semibold">{isZh ? '订阅转化率 ↓ / 月费定价 →' : 'Conversion ↓ / Price →'}</th>
                {pricePoints.map(p => (
                  <th key={p} className="p-3 font-semibold text-center">
                    RM {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {convRates.map((cRate) => (
                <tr key={cRate} className="border-b border-stone-100 hover:bg-stone-50/50">
                  <td className="p-3 font-bold text-stone-700 bg-stone-50/50">
                    {formatPercent(cRate)}
                  </td>
                  {pricePoints.map((price) => {
                    const estSubs = Math.round(inputs.registeredUsers * cRate);
                    const estRev = estSubs * price;
                    const isCurrent = Math.abs(inputs.premiumConversionRate - cRate) < 0.01 && Math.abs(inputs.subscriptionPriceMyr - price) < 6;
                    return (
                      <td 
                        key={price} 
                        className={`p-3 text-center transition-colors ${
                          isCurrent 
                            ? 'bg-amber-100/80 font-bold text-amber-900 border border-amber-300' 
                            : 'text-stone-700'
                        }`}
                      >
                        RM {estRev.toLocaleString()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
