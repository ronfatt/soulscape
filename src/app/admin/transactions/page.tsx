'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Receipt, Search, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';

export default function AdminTransactionsPage() {
  const { locale, transactions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = transactions.filter(tx => {
    const matchesSearch =
      tx.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.descriptionZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '全站流水台账审计' : 'Transaction Audit Ledger'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '实时追踪充值、占读扣币、导师分成与系统赠送流水。' : 'Full real-time transaction ledger with credit tracking.'}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索用户名、流水号或描述..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-ivory-300 text-xs bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-500 font-semibold uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">流水号 / 时间</th>
                <th className="p-4">用户</th>
                <th className="p-4">交易类型</th>
                <th className="p-4">业务描述</th>
                <th className="p-4 text-right">积分变动</th>
                <th className="p-4 text-right">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filtered.map(tx => {
                const isPositive = tx.amountCredits > 0;
                return (
                  <tr key={tx.id} className="hover:bg-ivory-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-mono font-bold text-charcoal-900">{tx.id}</p>
                      <span className="text-[10px] text-charcoal-400 font-mono">{tx.timestamp}</span>
                    </td>
                    <td className="p-4 font-medium text-charcoal-800">{tx.userName}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-ivory-200 text-charcoal-700 text-[10px] font-mono uppercase font-semibold">
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 text-charcoal-700 max-w-xs truncate">{tx.descriptionZh}</td>
                    <td className="p-4 text-right font-serif font-bold text-sm">
                      <span className={isPositive ? 'text-emerald-700' : 'text-charcoal-900'}>
                        {isPositive ? `+${tx.amountCredits}` : tx.amountCredits}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
