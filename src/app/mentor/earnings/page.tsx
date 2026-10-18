'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DollarSign, ArrowUpRight, TrendingUp, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function MentorEarningsPage() {
  const { locale, showToast } = useApp();
  const [withdrawn, setWithdrawn] = useState(false);

  const earningsHistory = [
    { date: '2026-10-18', item: '林若尘 1对1 颂钵个案分成', credits: '+64 积分', rmb: '¥51.20', status: '已结算' },
    { date: '2026-10-17', item: '赵云深 课程《藏传颂钵大师课》分成', credits: '+48 积分', rmb: '¥38.40', status: '已结算' },
    { date: '2026-10-17', item: '宋雅文 1对1 咨询服务分成', credits: '+64 积分', rmb: '¥51.20', status: '已结算' },
    { date: '2026-10-15', item: '推荐学员年费会员 20% 分销奖金', credits: '+80 积分', rmb: '¥64.00', status: '已结算' },
    { date: '2026-10-14', item: '学员课后打赏感谢包', credits: '+20 积分', rmb: '¥16.00', status: '已结算' },
  ];

  const handleWithdraw = () => {
    setWithdrawn(true);
    showToast(locale === 'zh' ? '模拟提现申请已提交！' : 'Withdrawal submitted!', locale === 'zh' ? '演示环境不发生实际银行打款。' : 'Mock sandbox payout only.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '收益对账与分润结算' : 'Earnings & Revenue Share'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '【演示收益】所有结算数据均为模拟呈现，标准分成比例为导师 80%，平台技术服务 20%。' : 'Standard 80/20 mentor revenue share model (Illustrative demo).'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">本月可提现积分</span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-3xl font-bold text-gold-600">3,420</span>
            <span className="text-xs text-charcoal-500">积分</span>
          </div>
          <p className="text-xs text-charcoal-400 mt-1">折合人民币约 ¥2,736.00</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">年度累计总创收</span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-3xl font-bold text-charcoal-900">¥42,860</span>
          </div>
          <p className="text-xs text-emerald-700 mt-1 font-semibold">环比增长 +24.5%</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-ivory-200 shadow-soft flex flex-col justify-between">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">结算状态</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-charcoal-800">已绑定对公账户 (演示模拟)</span>
          </div>
          <button
            onClick={handleWithdraw}
            disabled={withdrawn}
            className="w-full mt-3 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 disabled:opacity-50 text-white text-xs font-semibold shadow-soft"
          >
            {withdrawn ? '已发起模拟打款' : '一键模拟提现'}
          </button>
        </div>
      </div>

      {/* Ledger */}
      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden divide-y divide-ivory-200 text-xs">
        <div className="p-4 sm:p-5 font-serif font-bold text-sm text-charcoal-900">
          最近入账明细
        </div>
        {earningsHistory.map((item, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between hover:bg-ivory-50/50">
            <div>
              <p className="font-medium text-charcoal-900">{item.item}</p>
              <span className="text-[10px] text-charcoal-400 font-mono">{item.date}</span>
            </div>
            <div className="text-right">
              <strong className="text-emerald-700 block text-sm font-serif">{item.credits}</strong>
              <span className="text-[10px] text-charcoal-400">{item.rmb}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
