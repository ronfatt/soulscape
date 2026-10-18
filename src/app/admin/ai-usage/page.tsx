'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bot, DollarSign, Cpu, Clock, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAIUsagePage() {
  const { locale } = useApp();

  const dailyData = [
    { date: '10-12', queries: 280, tokens: 420000, cost: 1.26 },
    { date: '10-13', queries: 340, tokens: 510000, cost: 1.53 },
    { date: '10-14', queries: 410, tokens: 615000, cost: 1.84 },
    { date: '10-15', queries: 390, tokens: 585000, cost: 1.75 },
    { date: '10-16', queries: 520, tokens: 780000, cost: 2.34 },
    { date: '10-17', queries: 610, tokens: 915000, cost: 2.74 },
    { date: '10-18', queries: 680, tokens: 1020000, cost: 3.06 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? 'AI 觉知向导用量监控与模型成本测算' : 'AI Simulation Metrics & Cost Projections'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '【成本模型演示】预先模拟接入生产级大模型（如 gpt-4o-mini 或 claude-3-5-haiku）时的 Token 吞吐量与边际调用成本。' : 'Token metrics and unit cost simulations for future LLM production adapters.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">本月模拟 Token 吞吐</span>
          <span className="font-serif text-2xl font-bold text-charcoal-900">3,840,000</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">Tokens (Prompt + Compl)</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">预估官方 API 成本</span>
          <span className="font-serif text-2xl font-bold text-emerald-700">$18.42</span>
          <span className="text-[10px] text-emerald-700 block mt-1">约 ¥130.80 / 月 (极低边际成本)</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">平均响应延迟</span>
          <span className="font-serif text-2xl font-bold text-sage-800">380 ms</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">本地模板引擎极速返回</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">单次对话积分收入</span>
          <span className="font-serif text-2xl font-bold text-gold-600">10 积分</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">毛利率 ~92%</span>
        </div>
      </div>

      {/* Daily Queries Recharts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
        <h3 className="font-serif font-bold text-charcoal-900 text-base">
          近 7 日 AI 向导对话请求量走势 (Queries / Day)
        </h3>
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EEF7" />
              <XAxis dataKey="date" stroke="#7B837E" fontSize={11} />
              <YAxis stroke="#7B837E" fontSize={11} />
              <Tooltip
                formatter={(val: any) => [`${val} 次请求`, '每日调用']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #E2DCCF', fontSize: '12px' }}
              />
              <Bar dataKey="queries" fill="#7160A1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
