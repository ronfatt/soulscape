'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Music, 
  HeartHandshake, 
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export default function AdminDashboardPage() {
  const { locale, transactions } = useApp();

  const revenueData = [
    { month: '5月', revenue: 42000, users: 1800, readings: 4500 },
    { month: '6月', revenue: 58000, users: 2400, readings: 6800 },
    { month: '7月', revenue: 64000, users: 3100, readings: 8900 },
    { month: '8月', revenue: 76000, users: 3800, readings: 11200 },
    { month: '9月', revenue: 89000, users: 4400, readings: 12800 },
    { month: '10月 (预测)', revenue: 98400, users: 4820, readings: 14200 },
  ];

  const categoryDistribution = [
    { category: '神谕占读', usage: 42 },
    { category: '调频声疗', usage: 28 },
    { category: '七脉轮修习', usage: 16 },
    { category: '导师1对1', usage: 14 },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            全站注册用户
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">4,820</span>
          <span className="text-[10px] text-emerald-700 font-semibold block mt-1">↑ +18.4% 月环比</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            今日活跃觉知者
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-sage-800">342</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">实时在线中</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            月度 GMV 预测
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-600">¥98,400</span>
          <span className="text-[10px] text-emerald-700 font-semibold block mt-1">毛利率 ~82%</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            累计神谕占读
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">14,200</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">次生成记录</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            声波播放时长
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">28.4k</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">分钟累计</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            认证入驻导师
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-lavender-700">8</span>
          <span className="text-[10px] text-charcoal-400 block mt-1">100% 好评率</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Growth Trend Area Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
            <div>
              <h3 className="font-serif font-bold text-charcoal-900 text-base">
                月度商业创收与订阅成长曲线 (GMV)
              </h3>
              <p className="text-xs text-charcoal-400">会员订阅费 + 积分加购包 + 导师抽成</p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              SaaS LTV/CAC ~ 4.2x
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A8B6F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5A8B6F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EEF7" />
                <XAxis dataKey="month" stroke="#7B837E" fontSize={11} />
                <YAxis stroke="#7B837E" fontSize={11} tickFormatter={(val) => `¥${val/1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`¥${val.toLocaleString()}`, '营业流水']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #E2DCCF', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#5A8B6F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Engagement Distribution Bar Chart */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
              <h3 className="font-serif font-bold text-charcoal-900 text-base">
                生态模块使用占比
              </h3>
              <span className="text-xs text-charcoal-400 font-mono">Engagement</span>
            </div>
            <p className="text-xs text-charcoal-500 mt-2 font-light">
              神谕卡占读与调频声疗构成高频入口，直接驱动导师高单价咨询转化。
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {categoryDistribution.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs text-charcoal-700">
                  <span className="font-medium">{cat.category}</span>
                  <span className="font-mono font-semibold">{cat.usage}%</span>
                </div>
                <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sage-600 h-full rounded-full transition-all duration-700"
                    style={{ width: `${cat.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-600">
            💡 <strong>商业洞察：</strong>卡牌推荐音乐的转化率高达 64%，形成天然的产品交叉留存护城河。
          </div>
        </div>
      </div>

      {/* Live Transaction Feed Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-serif font-bold text-charcoal-900 text-base">
              全站实时交易与行为流水 (最新 5 笔)
            </h3>
          </div>
          <span className="text-xs text-charcoal-400 font-mono">Realtime Stream</span>
        </div>

        <div className="divide-y divide-ivory-200 text-xs">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="font-bold text-charcoal-900 mr-2">{tx.userName}</span>
                <span className="text-charcoal-600">{tx.descriptionZh}</span>
                <span className="text-[10px] text-charcoal-400 font-mono block sm:inline sm:ml-2">{tx.timestamp}</span>
              </div>
              <span className={`font-mono font-semibold ${tx.amountCredits > 0 ? 'text-emerald-700' : 'text-charcoal-800'}`}>
                {tx.amountCredits > 0 ? `+${tx.amountCredits}` : tx.amountCredits} 积分
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
