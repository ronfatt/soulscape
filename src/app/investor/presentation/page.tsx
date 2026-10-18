'use client';

import React, { useState, useEffect } from 'react';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Coins, 
  Target,
  ArrowRight
} from 'lucide-react';

export default function InvestorPresentationPage() {
  const { locale } = useApp();
  const { 
    currentSlideIndex, 
    nextSlide, 
    prevSlide, 
    goToSlide, 
    totalSlides, 
    slides,
    metrics,
    formatCurrency,
    formatPercent,
    formatNumber,
    isFullscreen,
    toggleFullscreen
  } = useInvestor();

  const [showPresenterNotes, setShowPresenterNotes] = useState(true);

  const isZh = locale === 'zh';
  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Presentation Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 font-bold flex items-center justify-center text-sm border border-amber-300">
            {String(currentSlideIndex + 1).padStart(2, '0')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {isZh ? currentSlide.categoryZh : currentSlide.categoryEn}
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-stone-500">
                {isZh ? '幻灯片' : 'Slide'} {currentSlideIndex + 1} / {totalSlides}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              {isZh ? currentSlide.titleZh : currentSlide.titleEn}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showPresenterNotes 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isZh ? (showPresenterNotes ? '收起演讲手记' : '讲者手记') : (showPresenterNotes ? 'Hide Notes' : 'Notes')}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 transition-all"
            title={isZh ? '全屏路演模式' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? (isZh ? '退出全屏' : 'Exit Fullscreen') : (isZh ? '全屏放映' : 'Fullscreen')}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-lg min-h-[440px] flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Bullet Points & Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Soulscape Executive Pitch Deck</span>
            </div>

            <div className="space-y-3.5">
              {(isZh ? currentSlide.bulletsZh : currentSlide.bulletsEn).map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50/70 border border-stone-100 hover:border-amber-200 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Graphic & Data Callouts */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-800 text-stone-100 rounded-2xl p-6 shadow-md border border-stone-800 flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-700">
                <span className="font-semibold text-amber-400 uppercase tracking-wider">
                  {isZh ? '核心指标与推演洞察' : 'Key Metrics & Insight'}
                </span>
                <span className="text-stone-500 font-mono">SLIDE #{currentSlideIndex + 1}</span>
              </div>

              {currentSlide.metricsHighlight ? (
                <div className="mt-6 space-y-4">
                  <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700">
                    <div className="text-xs text-stone-400">{isZh ? '核心测算指标' : 'Featured Metric'}</div>
                    <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-300 mt-1">
                      {currentSlide.metricsHighlight.value}
                    </div>
                    <div className="text-xs text-stone-300 mt-1">
                      {isZh ? currentSlide.metricsHighlight.labelZh : currentSlide.metricsHighlight.labelEn}
                    </div>
                  </div>

                  <div className="text-xs text-stone-400 leading-relaxed bg-stone-950/40 p-3 rounded-lg border border-stone-800">
                    {isZh 
                      ? '💡 提示：本页数据联动自实时财务测算引擎，可通过顶部预设（保守/基准/进取）或测算引擎实时调节。'
                      : '💡 Note: Real-time reactive data connected to the financial simulation engine.'}
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Target className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-stone-100">
                    {isZh ? '战略执行与产品闭环' : 'Strategic Execution'}
                  </h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                    {isZh 
                      ? '以自研原创卡牌 IP 与物理级调频声波构建内在秩序，实现高毛利、低获客成本与高用户自发复购。'
                      : 'Proprietary IP and Web Audio synthesis driving high gross margins.'}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-stone-700/80 flex items-center justify-between text-xs text-stone-400">
              <span>Soulscape © 2026</span>
              <span className="text-amber-400 font-medium">Confidential Investor Demo</span>
            </div>
          </div>
        </div>

        {/* Slide Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isZh ? '上一页 (←)' : 'Previous (←)'}</span>
          </button>

          {/* Slide dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all rounded-full ${
                  currentSlideIndex === idx 
                    ? 'w-6 h-2 bg-amber-500' 
                    : 'w-2 h-2 bg-stone-200 hover:bg-stone-400'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
          >
            <span>{isZh ? '下一页 (→)' : 'Next (→)'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Presenter Speaker Notes Drawer */}
      {showPresenterNotes && (
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 border border-stone-800 shadow-md animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>{isZh ? '讲者逐字要点与问答预备 (Speaker Notes & Pitch Script)' : 'Speaker Notes & Pitch Script'}</span>
            </div>
            <span className="text-xs text-stone-400">
              {isZh ? '键盘方向键 [←] [→] 或 [空格键] 换页' : 'Use [←] [→] or [Space] keys to navigate'}
            </span>
          </div>

          <div className="mt-3.5 space-y-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
            <p className="font-semibold text-stone-100">
              {isZh ? `本页路演核心传达目标：` : `Core Pitch Objective for Slide ${currentSlideIndex + 1}:`}
            </p>
            <p>
              {isZh ? currentSlide.bulletsZh.join('；') : currentSlide.bulletsEn.join('; ')}
            </p>
            <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <span>{isZh ? '💡 应对投资人提问：强调自研卡牌与 Web Audio 的成本优势及 80/20 导师分润的健康现金流。' : '💡 Tip: Emphasize zero-audio-CDN cost and sustainable 80/20 take-rate.'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Slide Thumbnails Grid */}
      <div className="pt-2">
        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
          {isZh ? '幻灯片速览目录 (12 Slides Index)' : 'Slide Overview'}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`p-3 rounded-xl text-left border transition-all ${
                currentSlideIndex === idx 
                  ? 'bg-amber-50 border-amber-400 shadow-xs ring-1 ring-amber-400' 
                  : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="text-[10px] font-bold text-stone-400">#{String(idx + 1).padStart(2, '0')}</div>
              <div className="text-xs font-bold text-stone-800 line-clamp-1 mt-0.5">
                {isZh ? s.titleZh : s.titleEn}
              </div>
              <div className="text-[10px] text-stone-500 truncate mt-0.5">
                {isZh ? s.categoryZh : s.categoryEn}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
