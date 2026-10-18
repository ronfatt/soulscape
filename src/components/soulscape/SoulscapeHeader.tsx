'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface SoulscapeHeaderProps {
  mode?: 'home' | 'subpage';
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
}

export const SoulscapeHeader: React.FC<SoulscapeHeaderProps> = ({
  mode = 'subpage',
  title,
  subtitle,
  rightAction,
  showBack = true,
  onBack,
  className = '',
}) => {
  const router = useRouter();
  const { user, locale } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (mode === 'home') {
    return (
      <header className={`pt-2 pb-4 px-4 sm:px-6 flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-[0_2px_10px_rgba(51,45,42,0.08)] ring-1 ring-[#EDE5D9]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#332D2A] tracking-tight">
                {locale === 'zh' ? `早安，${user.name}` : `Good Morning, ${user.name}`}
              </h2>
              <Sparkles className="w-3.5 h-3.5 text-[#B79A63] fill-[#B79A63]/30" />
            </div>
            <p className="text-xs text-[#736B66] font-light">
              {locale === 'zh' ? '每一天都是向內探索的起點' : 'Every day is a new step inward.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightAction ? (
            rightAction
          ) : (
            <button
              className="w-10 h-10 rounded-full bg-[#FFFDF9] border border-[#EDE5D9] flex items-center justify-center text-[#332D2A] hover:bg-[#FAF7F2] transition-colors relative shadow-xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4 stroke-[1.8]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#B79A63]" />
            </button>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-30 bg-[#F9F6F1]/90 backdrop-blur-md px-4 py-3 border-b border-[#EDE5D9]/60 flex items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#EDE5D9] flex items-center justify-center text-[#332D2A] hover:bg-[#FAF7F2] transition-colors shrink-0 shadow-xs active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
          </button>
        )}
        <div className="truncate">
          <h1 className="font-serif font-bold text-base sm:text-lg text-[#332D2A] tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-[#736B66] font-light truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightAction}
      </div>
    </header>
  );
};

export default SoulscapeHeader;
