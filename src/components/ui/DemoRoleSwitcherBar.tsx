'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Sparkles, RotateCcw, ShieldCheck, UserCheck, HeartHandshake, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DemoRoleSwitcherBar() {
  const { role, switchRole, locale, setLocale, credits, resetDemoState } = useApp();

  const roles: { id: UserRole; labelZh: string; labelEn: string; icon: any; portalPath: string }[] = [
    { id: 'member', labelZh: '体验会员', labelEn: 'Member', icon: UserCheck, portalPath: '/dashboard' },
    { id: 'mentor', labelZh: '觉知导师', labelEn: 'Mentor', icon: HeartHandshake, portalPath: '/mentor' },
    { id: 'admin', labelZh: '管理合伙人', labelEn: 'Admin', icon: ShieldCheck, portalPath: '/admin' },
    { id: 'investor', labelZh: '投资人路演', labelEn: 'Investor', icon: TrendingUp, portalPath: '/investor' }
  ];

  return (
    <div className="bg-[#26211E] text-[#EDE5D9] text-[11px] py-1 px-3 sm:px-6 flex items-center justify-between gap-2 border-b border-[#332D2A] relative z-40 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#332D2A] text-[#B79A63] border border-[#B79A63]/30 font-semibold text-[10px]">
          <Sparkles className="w-2.5 h-2.5 text-[#B79A63] animate-pulse" />
          <span>Soulscape</span>
          <span className="opacity-70 text-[9px] uppercase tracking-wider">{locale === 'zh' ? '演示版' : 'Demo'}</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {/* Role Switcher Pills */}
        <div className="flex items-center bg-[#1A1614] p-0.5 rounded-lg border border-[#332D2A]">
          {roles.map(r => {
            const Icon = r.icon;
            const active = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all font-medium ${
                  active
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-charcoal-300 hover:text-ivory-100 hover:bg-charcoal-700/50'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{locale === 'zh' ? r.labelZh : r.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Credits Balance Pill */}
        <Link
          href="/wallet"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-900/30 text-gold-200 border border-gold-800/50 hover:bg-gold-900/50 transition-colors"
          title={locale === 'zh' ? '点击前往积分钱包' : 'Open Credits Wallet'}
        >
          <span className="text-[11px]">🪙</span>
          <span className="font-semibold">{credits}</span>
          <span className="text-[10px] text-gold-400/80">{locale === 'zh' ? '积分' : 'pts'}</span>
        </Link>

        {/* Language Toggle */}
        <button
          onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-charcoal-300 hover:text-white hover:bg-charcoal-800 border border-transparent hover:border-charcoal-700 transition-colors"
          title="Switch Language / 切换语言"
        >
          <Globe className="w-3 h-3" />
          <span className="font-medium uppercase">{locale === 'zh' ? 'EN' : '中文'}</span>
        </button>

        {/* Reset State Button */}
        <button
          onClick={resetDemoState}
          className="p-1 text-charcoal-400 hover:text-rose-300 hover:bg-charcoal-800 rounded-md transition-colors"
          title={locale === 'zh' ? '重置演示数据与积分 (恢复100)' : 'Reset demo state (100 credits)'}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
