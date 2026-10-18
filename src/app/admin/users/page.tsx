'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Users, Search, Shield, Filter, UserCheck, CheckCircle2 } from 'lucide-react';

export default function AdminUsersPage() {
  const { locale } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const usersList = [
    { id: 'usr-1', name: '林若尘 (当前演示会员)', email: 'seeker@soulscape.app', role: 'member', tier: 'premium', credits: 100, date: '2026-08-15', status: 'active' },
    { id: 'usr-2', name: '林清音', email: 'lin.qingyin@gmail.com', role: 'member', tier: 'free', credits: 80, date: '2026-09-01', status: 'active' },
    { id: 'usr-3', name: '李维安', email: 'weian.li@163.com', role: 'member', tier: 'premium', credits: 240, date: '2026-09-12', status: 'active' },
    { id: 'usr-4', name: '张子默', email: 'zimo.zhang@outlook.com', role: 'member', tier: 'patron', credits: 680, date: '2026-09-20', status: 'active' },
    { id: 'usr-5', name: '宋雅文', email: 'yawen.song@foxmail.com', role: 'member', tier: 'premium', credits: 160, date: '2026-10-01', status: 'active' },
    { id: 'usr-6', name: '赵云深', email: 'yunshen.zhao@qq.com', role: 'member', tier: 'free', credits: 40, date: '2026-10-05', status: 'active' },
    { id: 'usr-7', name: '周安然', email: 'anran.zhou@icloud.com', role: 'member', tier: 'premium', credits: 310, date: '2026-10-10', status: 'active' },
  ];

  const filtered = usersList.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '全站注册用户与会员生命周期' : 'User Lifecycle Management'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '查看用户会员等级、积分余额明细与行为活跃度。' : 'View member tiers, credit balances, and activity.'}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索用户名或邮箱..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-ivory-300 text-xs bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-500 font-semibold uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">用户称呼</th>
                <th className="p-4">会籍等级</th>
                <th className="p-4">积分余额</th>
                <th className="p-4">注册日期</th>
                <th className="p-4">账号状态</th>
                <th className="p-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-ivory-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-charcoal-900">{u.name}</p>
                    <span className="text-[10px] text-charcoal-400 font-mono">{u.email}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.tier === 'patron'
                        ? 'bg-gold-100 text-gold-900'
                        : u.tier === 'premium'
                        ? 'bg-sage-100 text-sage-800'
                        : 'bg-ivory-200 text-charcoal-700'
                    }`}>
                      {u.tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 font-serif font-bold text-sm text-charcoal-900">
                    🪙 {u.credits}
                  </td>
                  <td className="p-4 text-charcoal-500 font-mono text-[11px]">{u.date}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      正常
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-sage-700 hover:underline font-semibold text-xs">调整积分</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
