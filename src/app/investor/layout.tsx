'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InvestorProvider, useInvestor, ScenarioPreset } from '@/context/InvestorContext';
import InvestorSidebar from '@/components/investor/InvestorSidebar';
import { InvestorTourOverlay } from '@/components/investor/InvestorTourOverlay';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Menu, 
  X, 
  ShieldAlert, 
  TrendingUp, 
  Compass, 
  Maximize2, 
  Minimize2,
  RotateCcw,
  Globe
} from 'lucide-react';

function InvestorLayoutInner({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useApp();
  const { 
    scenario, 
    setScenario, 
    resetScenario, 
    isFullscreen, 
    toggleFullscreen, 
    startTour,
    metrics,
    formatCurrency
  } = useInvestor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isZh = locale === 'zh';

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-900 ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-stone-900 text-stone-100 px-4 py-3 border-b border-stone-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-stone-300 hover:text-stone-100 rounded-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-100">Soulscape</span>
            <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              INVESTOR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startTour}
            className="text-xs bg-amber-500 text-stone-900 font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isZh ? '导览' : 'Tour'}</span>
          </button>
          <button
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            className="p-1.5 text-stone-300 hover:text-stone-100 rounded-md text-xs font-medium border border-stone-700"
          >
            {locale === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <InvestorSidebar />
        </aside>

        {/* Mobile Slide-over Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex">
            <div className="w-80 max-w-[85%] bg-stone-900 h-full shadow-2xl overflow-y-auto">
              <div className="p-4 flex items-center justify-between border-b border-stone-800">
                <span className="text-sm font-semibold text-stone-300">
                  {isZh ? '商业智能导航' : 'Investor Navigation'}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                <InvestorSidebar />
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Operational Bar */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left: Disclaimer & Live Scenario Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{isZh ? '演示沙盘模型 · 仅供商业推演' : 'Illustrative Simulation Model'}</span>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200">
                  <span className="text-stone-400">{isZh ? '当前预设:' : 'Scenario:'}</span>
                  <span className="font-semibold text-stone-900 capitalize">{scenario}</span>
                </div>

                <div className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
                  <span>{isZh ? '月度净收入预测:' : 'Est. Monthly Net Rev:'}</span>
                  <span className="font-bold">{formatCurrency(metrics.platformRecognizedRevenue)}</span>
                </div>
              </div>

              {/* Right: Scenario Presets & Tour Launcher */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <div className="inline-flex bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-medium">
                  {(['conservative', 'base', 'growth'] as ScenarioPreset[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScenario(s)}
                      className={`px-2.5 py-1 rounded-md capitalize transition-all ${
                        scenario === s 
                          ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {s === 'conservative' ? (isZh ? '保守' : 'Cons') : s === 'base' ? (isZh ? '基准' : 'Base') : (isZh ? '进取' : 'Growth')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={resetScenario}
                  title={isZh ? '重置当前预设参数' : 'Reset Scenario'}
                  className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={startTour}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-amber-300 hover:bg-stone-800 rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{isZh ? '实机导览 (12步)' : '12-Step Tour'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Floating 12-Step Guided Walkthrough Overlay */}
      <InvestorTourOverlay />
    </div>
  );
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <InvestorProvider>
      <InvestorLayoutInner>{children}</InvestorLayoutInner>
    </InvestorProvider>
  );
}
