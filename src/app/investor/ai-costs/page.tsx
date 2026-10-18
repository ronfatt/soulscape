'use client';

import React from 'react';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Cpu, 
  DollarSign, 
  ShieldCheck, 
  TrendingUp, 
  Server, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  ArrowRight
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

export default function InvestorAiCostsPage() {
  const { locale } = useApp();
  const { metrics, inputs, formatCurrency, formatPercent, formatNumber } = useInvestor();

  const isZh = locale === 'zh';

  // Unit economics comparison: Price charged to user vs actual LLM cost
  const unitEconomicsData = [
    {
      actionZh: '单牌简析 (Free)',
      actionEn: '1-Card Free Draw',
      userCost: 0,
      aiCost: 0.005, // cached template
      marginPercent: 0,
      noteZh: '前置规则库零成本拦截',
      noteEn: 'Client template cache'
    },
    {
      actionZh: '三牌深度阵 (20积分)',
      actionEn: '3-Card Spread (20 pts)',
      userCost: 2.80, // 20 credits ≈ RM2.80
      aiCost: 0.035, // 800 tokens
      marginPercent: 98.7,
      noteZh: '毛利率 98.7%',
      noteEn: '98.7% Gross Margin'
    },
    {
      actionZh: 'AI心语向导单次 (10积分)',
      actionEn: 'AI Soul Chat (10 pts)',
      userCost: 1.40, // 10 credits ≈ RM1.40
      aiCost: 0.025, // 500 tokens
      marginPercent: 98.2,
      noteZh: '毛利率 98.2%',
      noteEn: '98.2% Gross Margin'
    },
    {
      actionZh: '月度会员全包 (RM39)',
      actionEn: 'Pro Subscriber (RM39)',
      userCost: 39.00,
      aiCost: 1.20, // 30 deep queries/mo @ RM0.04
      marginPercent: 96.9,
      noteZh: '毛利率 96.9%',
      noteEn: '96.9% Gross Margin'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold mb-3 border border-purple-200">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>{isZh ? 'AI 单元经济学与边际成本解构' : 'AI Unit Economics & Cost Defense'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            {isZh ? '90%+ 极致毛利：AI 如何赋能商业而非吞噬现金流' : '90%+ Gross Margin: AI Unit Economics & Guardrails'}
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {isZh 
              ? '许多 AI 应用受困于极高 Token 成本与负毛利。Soulscape 采用“荣格知识图谱模板 + 意图缓存层 + 解耦大模型适配器”三层架构，将单次占读综合推理成本压降至 RM 0.035，实现近乎软件级的超高毛利率。'
              : 'Preventing LLM token cash burn with a 3-layer architecture: deterministic templates, prompt caching, and pluggable multi-provider adapters.'}
          </p>
        </div>
      </div>

      {/* Aggregate AI Cost Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '单次交互平均成本' : 'Avg Cost / Interaction'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-purple-700 mt-1">
            RM {inputs.aiCostPerInteraction.toFixed(2)}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isZh ? '约合 ~800 tokens 混合推理' : '~800 hybrid tokens'}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '月度 AI 算力总支出' : 'Monthly Total AI Cost'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            {formatCurrency(metrics.aiTotalCost)}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isZh ? `占总收入 ${(metrics.aiTotalCost / (metrics.platformRecognizedRevenue || 1) * 100).toFixed(1)}%` : `Only ${(metrics.aiTotalCost / (metrics.platformRecognizedRevenue || 1) * 100).toFixed(1)}% of Net Rev`}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
            {isZh ? '人均月交互频次' : 'Avg Interactions / MAU'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            {inputs.avgAiInteractionsPerMau} {isZh ? '次/月' : 'times/mo'}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {isZh ? '健康活跃频次' : 'High engagement'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-xs">
          <div className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">
            {isZh ? 'AI 业务线综合毛利' : 'AI Line Gross Margin'}
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-300 mt-1">
            &gt; 96.5%
          </div>
          <div className="text-xs text-emerald-400 mt-1">
            {isZh ? '软件级极高防守壁垒' : 'Exceptional software-grade margin'}
          </div>
        </div>
      </div>

      {/* Unit Economics Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">
          {isZh ? '核心业务动作：用户付费 vs AI 实际算力开销对照' : 'Unit Economics: User Price vs AI Inference Cost'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <th className="p-3 font-semibold">{isZh ? '交互场景与动作' : 'Interaction Scenario'}</th>
                <th className="p-3 font-semibold">{isZh ? '用户支付等值 (MYR)' : 'User Value (MYR)'}</th>
                <th className="p-3 font-semibold">{isZh ? '实际 AI 推理成本 (MYR)' : 'AI Cost (MYR)'}</th>
                <th className="p-3 font-semibold">{isZh ? '贡献毛利率' : 'Contribution Margin'}</th>
                <th className="p-3 font-semibold">{isZh ? '防刷与架构策略' : 'Strategy'}</th>
              </tr>
            </thead>
            <tbody>
              {unitEconomicsData.map((item, idx) => (
                <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50">
                  <td className="p-3 font-bold text-stone-900">
                    {isZh ? item.actionZh : item.actionEn}
                  </td>
                  <td className="p-3 font-medium text-stone-700">
                    {item.userCost === 0 ? (isZh ? '免费体验' : 'Free') : `RM ${item.userCost.toFixed(2)}`}
                  </td>
                  <td className="p-3 font-medium text-purple-700 font-mono">
                    RM {item.aiCost.toFixed(3)}
                  </td>
                  <td className="p-3 font-bold text-emerald-700">
                    {item.userCost === 0 ? '— (获客成本)' : `${item.marginPercent}%`}
                  </td>
                  <td className="p-3 text-stone-600">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      {isZh ? item.noteZh : item.noteEn}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 Pillars of AI Cost Defense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900">
            {isZh ? '解耦大模型适配器 (Decoupled LLM Adapter)' : 'Decoupled Multi-Provider Routing'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isZh 
              ? '工程实现中采用抽象 `AiGuideAdapter` 接口，已预留 OpenAI、DeepSeek、Claude、智谱 GLM 与本地 Ollama 切换接口。可根据全球 Token 价格波动无缝套利，杜绝单一厂商锁定与价格暴涨风险。'
              : 'Abstract adapter allows dynamic switching between models (DeepSeek, OpenAI, Claude, Local Ollama) to arbitrate pricing and eliminate vendor lock-in.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900">
            {isZh ? '确定性知识库与意图拦截 (Prompt Caching)' : 'Deterministic Semantic Caching'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isZh 
              ? '对于 88 张神谕卡与七脉轮的基础定义与高频心理反思，70% 采用预置荣格专家库进行语义命中间接输出，完全跳过大模型计算，毫秒级响应且 0 算力支出。'
              : '70% of standard archetype reflections are answered by pre-validated Jungian rule bases, completely bypassing LLM inference.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900">
            {isZh ? '风控流控与防刷机制 (Rate Limiting)' : 'Dynamic Rate Limiting & Token Budgeting'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isZh 
              ? '会员每日享有 50 次深度追问软上限（普通人单日均值仅 4 次）；单次输入严格限制 300 字符内，输出强制截断 800 tokens，杜绝恶意爬虫或黑客滥用 Token 烧钱。'
              : 'Strict soft-caps (50 queries/day/user) and input-length limiters prevent runaway prompt injection and scraping.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
            04
          </div>
          <h4 className="font-bold font-serif text-lg text-stone-900">
            {isZh ? '合规标识与透明声明 (Transparency)' : 'Transparent Regulatory Safeguards'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isZh 
              ? '所有 AI 输出均强打标 `[DEMO SIMULATION]` 与身心健康免责声明，明确界定为心理陪伴与灵感启发，不涉及医疗诊断，从根源规避医疗法律纠纷。'
              : 'All AI outputs are explicitly badged with wellness disclaimers, insulating the company from diagnostic liability.'}
          </p>
        </div>
      </div>
    </div>
  );
}
