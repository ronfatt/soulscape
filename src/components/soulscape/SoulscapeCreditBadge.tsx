'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Plus, Sparkles } from 'lucide-react';

interface SoulscapeCreditBadgeProps {
  className?: string;
  variant?: 'card' | 'pill';
  onClick?: () => void;
}

export const SoulscapeCreditBadge: React.FC<SoulscapeCreditBadgeProps> = ({
  className = '',
  variant = 'card',
  onClick,
}) => {
  const { credits, locale } = useApp();
  const isZh = locale === 'zh';

  if (variant === 'pill') {
    return (
      <Link
        href="/wallet"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5EEFB] border border-[#E8DDF5] text-[#332D2A] text-xs font-semibold shadow-xs hover:border-[#B79A63]/60 transition-colors ${className}`}
      >
        <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#B79A63] to-[#E8DDF5] flex items-center justify-center text-[10px] text-white">
          ✦
        </span>
        <span>{credits}</span>
        <span className="text-[10px] text-[#736B66]">{isZh ? '能量' : 'Credits'}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/wallet"
      className={`block p-4 rounded-[22px] bg-gradient-to-r from-[#F5EEFB] via-[#FFFDF9] to-[#F5EEFB] border border-[#E8DDF5] shadow-[0_4px_20px_rgba(183,154,99,0.08)] hover:shadow-[0_6px_24px_rgba(183,154,99,0.15)] transition-all active:scale-[0.99] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Glowing Crystal Gem Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B79A63]/20 via-[#E8DDF5] to-[#F5E6E8] flex items-center justify-center border border-[#EDE5D9] shadow-inner relative overflow-hidden group">
            <span className="text-xl select-none filter drop-shadow">💎</span>
            <div className="absolute inset-0 bg-gradient-to-t from-[#B79A63]/10 to-transparent pointer-events-none" />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-2xl text-[#332D2A] tracking-tight">
                {credits}
              </span>
              <span className="text-xs font-medium text-[#736B66]">
                {isZh ? 'Soul Credits (靈魂能量積分)' : 'Soul Credits'}
              </span>
            </div>
            <p className="text-[11px] text-[#899F8B] font-medium flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-[#B79A63]" />
              <span>{isZh ? '可解鎖深度牌陣與大師諮詢' : 'Unlock deep readings & consultations'}</span>
            </p>
          </div>
        </div>

        {/* Plus Button */}
        <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#D7BE96] flex items-center justify-center text-[#B79A63] hover:bg-[#B79A63] hover:text-white transition-colors shadow-xs shrink-0">
          <Plus className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>
    </Link>
  );
};

export default SoulscapeCreditBadge;
