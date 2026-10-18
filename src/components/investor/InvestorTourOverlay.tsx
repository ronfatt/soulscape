'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  ExternalLink, 
  Minimize2, 
  Maximize2,
  Sparkles,
  CheckCircle2,
  Volume2
} from 'lucide-react';

export const InvestorTourOverlay: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useApp();
  const { 
    isTourActive, 
    stopTour, 
    tourStep, 
    nextTourStep, 
    prevTourStep, 
    totalTourSteps, 
    tourSteps 
  } = useInvestor();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!isTourActive) return null;

  const currentStepData = tourSteps[tourStep - 1];
  if (!currentStepData) return null;

  const isZh = locale === 'zh';
  const isCurrentPage = pathname === currentStepData.route;

  const handleNext = () => {
    if (tourStep < totalTourSteps) {
      nextTourStep();
      const nextStepData = tourSteps[tourStep];
      if (nextStepData && nextStepData.route !== pathname) {
        router.push(nextStepData.route);
      }
    } else {
      stopTour();
    }
  };

  const handlePrev = () => {
    if (tourStep > 1) {
      prevTourStep();
      const prevStepData = tourSteps[tourStep - 2];
      if (prevStepData && prevStepData.route !== pathname) {
        router.push(prevStepData.route);
      }
    }
  };

  const handleGoToRoute = () => {
    if (!isCurrentPage) {
      router.push(currentStepData.route);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900/95 text-stone-100 px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/30 backdrop-blur-md animate-fade-in">
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-amber-200">
          {isZh ? '路演导览' : 'Pitch Tour'} {tourStep}/{totalTourSteps}
        </span>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
          title={isZh ? '展开导览' : 'Expand'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-stone-900/95 text-stone-100 rounded-2xl shadow-2xl border border-amber-500/30 backdrop-blur-xl p-5 animate-slide-up">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {isZh ? '投资人实机演练模式' : 'Investor Demo Tour'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                {tourStep} / {totalTourSteps}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
            title={isZh ? '最小化' : 'Minimize'}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={stopTour}
            className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors"
            title={isZh ? '退出导览' : 'Exit Tour'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Title & Target Route */}
      <div className="mt-3">
        <h4 className="text-base font-bold text-stone-100 tracking-tight">
          {isZh ? currentStepData.titleZh : currentStepData.titleEn}
        </h4>
        <div className="mt-1.5 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-stone-500">{isZh ? '对应页面:' : 'Target Route:'}</span>
            <span className="text-amber-300">{currentStepData.route}</span>
          </div>
          {!isCurrentPage && (
            <button
              onClick={handleGoToRoute}
              className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 underline font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              {isZh ? '前往该页面' : 'Go to page'}
            </button>
          )}
        </div>
      </div>

      {/* Presenter Talking Points */}
      <div className="mt-3.5 bg-stone-950/60 rounded-xl p-3 border border-stone-800/80">
        <div className="text-[11px] font-semibold text-amber-400/90 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isZh ? '主讲人阐述要点 (Presenter Pitch Points)' : 'Presenter Pitch Points'}</span>
        </div>
        <ul className="space-y-1.5 text-xs text-stone-300">
          {(isZh ? currentStepData.talkingPointsZh : currentStepData.talkingPointsEn).map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-400/80 font-bold mt-0.5">•</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-300"
          style={{ width: `${(tourStep / totalTourSteps) * 100}%` }}
        />
      </div>

      {/* Footer Controls */}
      <div className="mt-4 flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={tourStep === 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {isZh ? '上一步' : 'Previous'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={stopTour}
            className="px-2.5 py-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            {isZh ? '跳过 / 结束' : 'Exit'}
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all"
          >
            {tourStep === totalTourSteps 
              ? (isZh ? '完成导览' : 'Finish Tour')
              : (isZh ? '下一步' : 'Next Step')}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
