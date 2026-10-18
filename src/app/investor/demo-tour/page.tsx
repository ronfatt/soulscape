'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useInvestor } from '@/context/InvestorContext';
import { useApp } from '@/context/AppContext';
import { 
  Compass, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  ArrowRight,
  Route,
  Layers
} from 'lucide-react';

export default function InvestorDemoTourPage() {
  const router = useRouter();
  const { locale } = useApp();
  const { 
    startTour, 
    goToTourStep, 
    totalTourSteps, 
    tourSteps 
  } = useInvestor();

  const isZh = locale === 'zh';

  const handleLaunchStep = (stepNumber: number, route: string) => {
    goToTourStep(stepNumber);
    router.push(route);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>{isZh ? '12 步实机路演互动演练目录' : '12-Step Guided Product Tour'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {isZh ? '真实产品走查：投资者全流程互动体验' : 'Interactive Product Walkthrough Directory'}
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            {isZh 
              ? '为了让投资人真实感受 Soulscape 的产品成熟度与用户旅程张力，我们精心编排了 12 个关键交互节点。启动导览后，悬浮路演 HUD 将全程伴随，提供讲者脚本与逐页指引。'
              : '12 curated live interaction moments guiding investors through customer onboarding, oracle readings, sound therapy, and mentor bookings.'}
          </p>

          <div className="mt-6">
            <button
              onClick={() => {
                startTour();
                router.push(tourSteps[0]?.route || '/');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-sm shadow-md transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isZh ? '从第 1 步开始完整路演 (Start Full Tour)' : 'Start Full 12-Step Walkthrough'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 12 Steps Grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
          <Route className="w-5 h-5 text-amber-600" />
          <span>{isZh ? '路演步骤逐一速览' : 'Tour Steps Index'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tourSteps.map((step) => (
            <div 
              key={step.step}
              className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 font-bold text-xs flex items-center justify-center border border-amber-200">
                      {String(step.step).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono text-stone-400">{step.route}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {isZh ? `步骤 ${step.step} / ${totalTourSteps}` : `Step ${step.step} of ${totalTourSteps}`}
                  </span>
                </div>

                <h4 className="font-bold font-serif text-base text-stone-900">
                  {isZh ? step.titleZh : step.titleEn}
                </h4>

                <div className="mt-3 space-y-1.5">
                  {(isZh ? step.talkingPointsZh : step.talkingPointsEn).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-end">
                <button
                  onClick={() => handleLaunchStep(step.step, step.route)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold shadow-xs transition-all"
                >
                  <span>{isZh ? '进入此步骤体验' : 'Jump into Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
