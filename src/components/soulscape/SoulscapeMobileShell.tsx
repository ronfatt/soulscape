'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';
import SoulscapeBottomNav from './SoulscapeBottomNav';

interface SoulscapeMobileShellProps {
  children: React.ReactNode;
  activeTab?: string;
  showBottomNav?: boolean;
  className?: string;
}

export const SoulscapeMobileShell: React.FC<SoulscapeMobileShellProps> = ({
  children,
  activeTab = 'home',
  showBottomNav = true,
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<'phone' | 'fluid'>('phone');

  return (
    <div className="min-h-screen bg-[#F9F6F1] text-[#332D2A] flex flex-col justify-between selection:bg-[#B79A63]/20 selection:text-[#332D2A]">
      {/* Desktop Mode Toggle Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2 bg-[#FFFDF9] border-b border-[#EDE5D9] text-xs text-[#736B66]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B79A63]" />
          <span className="font-serif font-bold text-[#332D2A]">Soulscape Mobile-First Preview</span>
          <span className="text-[#AFA8A3]">|</span>
          <span className="text-[11px]">Primary Benchmark: 390px iPhone Viewport</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-0.5 rounded-lg border border-[#EDE5D9]">
          <button
            onClick={() => setViewMode('phone')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              viewMode === 'phone'
                ? 'bg-[#FFFDF9] text-[#332D2A] font-semibold shadow-xs'
                : 'text-[#736B66] hover:text-[#332D2A]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>390px 原型視圖</span>
          </button>
          <button
            onClick={() => setViewMode('fluid')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              viewMode === 'fluid'
                ? 'bg-[#FFFDF9] text-[#332D2A] font-semibold shadow-xs'
                : 'text-[#736B66] hover:text-[#332D2A]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>桌面展開自適應</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 w-full mx-auto ${
        viewMode === 'phone' 
          ? 'lg:py-8 lg:px-4 flex items-center justify-center' 
          : 'max-w-4xl px-4 py-6'
      }`}>
        <div className={`w-full transition-all duration-300 ${
          viewMode === 'phone'
            ? 'max-w-[430px] lg:h-[890px] lg:rounded-[48px] lg:border-[8px] lg:border-[#E8D9BF] lg:shadow-[0_25px_70px_rgba(51,45,42,0.18)] lg:overflow-y-auto lg:overflow-x-hidden relative bg-[#F9F6F1]'
            : 'max-w-4xl'
        } ${className}`}>
          {/* Dynamic Island Notch on Phone preview */}
          {viewMode === 'phone' && (
            <div className="hidden lg:flex sticky top-0 z-50 justify-center pt-2 pb-1 bg-transparent pointer-events-none">
              <div className="w-24 h-4 rounded-full bg-black/90 shadow-sm flex items-center justify-between px-3">
                <span className="w-2 h-2 rounded-full bg-stone-800" />
                <span className="w-2 h-2 rounded-full bg-stone-900 border border-stone-700" />
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div className="pb-24">
            {children}
          </div>

          {/* Mobile Bottom Navigation (Shown inside desktop phone preview frame) */}
          {showBottomNav && (
            <div className={viewMode === 'phone' ? 'hidden lg:block lg:sticky lg:bottom-0 lg:left-0 lg:right-0' : 'hidden'}>
              <SoulscapeBottomNav />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoulscapeMobileShell;
