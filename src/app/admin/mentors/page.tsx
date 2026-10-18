'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_MENTORS } from '@/data/seedData';
import { HeartHandshake, Star, ShieldCheck, Check, Clock } from 'lucide-react';

export default function AdminMentorsPage() {
  const { locale, showToast } = useApp();
  const [mentorsList, setMentorsList] = useState(SEED_MENTORS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '认证导师审核与名录治理' : 'Mentor Verification & Governance'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '审核导师资质背景、调整提成比例（默认80%分成）及履约督导。' : 'Review credentials and commission tiers.'}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
          共 {mentorsList.length} 位在编认证导师
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-500 font-semibold uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">导师信息</th>
                <th className="p-4">擅长流派</th>
                <th className="p-4">评分 / 评价</th>
                <th className="p-4">履约次数</th>
                <th className="p-4">定价标准</th>
                <th className="p-4 text-right">认证状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {mentorsList.map(m => (
                <tr key={m.id} className="hover:bg-ivory-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.nameZh} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-charcoal-900">{m.nameZh}</p>
                        <span className="text-[10px] text-charcoal-400">{m.titleZh}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-charcoal-700">{m.expertiseZh.slice(0, 2).join(' / ')}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 font-semibold text-gold-600">
                      <Star className="w-3.5 h-3.5 fill-gold-400" />
                      <span>{m.rating}</span>
                      <span className="text-[10px] text-charcoal-400 font-normal">({m.reviewCount})</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-charcoal-800">{m.sessionsCompleted} 次</td>
                  <td className="p-4 font-serif font-bold text-charcoal-900">{m.hourlyRateCredits} 积分/时</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <Check className="w-3 h-3" />
                      已认证
                    </span>
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
