'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_CHAKRAS, SEED_MUSIC_TRACKS } from '@/data/seedData';
import { ChakraInfo, ChakraType } from '@/types';
import Link from 'next/link';
import { 
  Sparkles, 
  Route, 
  Play, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function ChakrasOverviewPage() {
  const { locale, playTrack } = useApp();
  const [activeChakraId, setActiveChakraId] = useState<ChakraType>('heart');

  const activeChakra = SEED_CHAKRAS.find(c => c.id === activeChakraId) || SEED_CHAKRAS[3];
  const recommendedTrack = SEED_MUSIC_TRACKS.find(t => t.id === activeChakra.recommendedTrackId) || SEED_MUSIC_TRACKS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-3">
          <Route className="w-3.5 h-3.5 text-sage-600" />
          <span>{locale === 'zh' ? '人体微细能量系统 · 七大中枢' : 'The Seven Chakras Subtle Energy System'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
          {locale === 'zh' ? '全息七脉轮身心调和全景' : 'Holographic Seven Chakras Map'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 font-light leading-relaxed">
          {locale === 'zh'
            ? '七脉轮是古印度瑜伽与阿育吠陀智慧对人体能量涡流（Vortices）的精密描摹。由下至上，从物质根基到灵性觉醒，构成了人类意识进化的神圣梯阶。'
            : 'Explore the 7 energetic hubs connecting physical vitality to higher transcendent consciousness.'}
        </p>

        {/* Non-medical Disclaimer */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-800 text-[11px] flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>
            {locale === 'zh'
              ? '【非医疗提示】脉轮调理用于日常正念反思与舒缓压力，不构成任何临床心理治疗或疾病诊断依据。'
              : 'Notice: Chakra alignment is intended for contemplative mindfulness and not medical diagnosis.'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Vertical Column / Nav */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-ivory-300 shadow-soft-lg space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-ivory-200 text-xs font-semibold text-charcoal-400 uppercase tracking-wider">
            <span>{locale === 'zh' ? '从百会到会阴' : 'Crown to Root'}</span>
            <span>{locale === 'zh' ? '共振频率' : 'Frequency'}</span>
          </div>

          <div className="flex flex-col gap-2">
            {[...SEED_CHAKRAS].reverse().map((chakra) => {
              const isSelected = activeChakraId === chakra.id;
              return (
                <button
                  key={chakra.id}
                  onClick={() => setActiveChakraId(chakra.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-sage-500 bg-sage-50 shadow-sm ring-2 ring-sage-200'
                      : 'border-ivory-200 bg-ivory-50/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                      style={{ backgroundColor: chakra.hexColor }}
                    >
                      {chakra.index}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-charcoal-900 leading-tight">
                        {locale === 'zh' ? chakra.nameZh : chakra.nameEn}
                      </h4>
                      <p className="text-[10px] text-charcoal-400 font-mono">
                        {chakra.sanskrit} · {chakra.seedMantra}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-medium text-charcoal-600">
                    {chakra.frequency} Hz
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chakra Detailed Dossier */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md"
                style={{ backgroundColor: activeChakra.hexColor }}
              >
                {activeChakra.index}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-ivory-200 text-charcoal-700 font-semibold">
                    {activeChakra.frequency} Hz
                  </span>
                  <span className="text-xs text-charcoal-500">种子音：{activeChakra.seedMantra}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-0.5">
                  {locale === 'zh' ? activeChakra.nameZh : activeChakra.nameEn}
                </h3>
              </div>
            </div>

            <Link
              href={`/chakras/${activeChakra.id}`}
              className="px-4 py-2 rounded-xl bg-sage-50 hover:bg-sage-100 text-sage-800 text-xs font-semibold border border-sage-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>{locale === 'zh' ? '深入专题页面' : 'In-Depth Guide'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
            {locale === 'zh' ? activeChakra.descriptionZh : activeChakra.descriptionEn}
          </p>

          {/* Balanced vs Blocked Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{locale === 'zh' ? '能量充盈·平衡显现' : 'Balanced Flow'}</span>
              </div>
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                {locale === 'zh' ? activeChakra.balancedZh : activeChakra.balancedEn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
              <div className="flex items-center gap-1.5 text-rose-800 text-xs font-bold mb-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{locale === 'zh' ? '能量淤堵·失衡征兆' : 'Blocked Signs'}</span>
              </div>
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                {locale === 'zh' ? activeChakra.blockedZh : activeChakra.blockedEn}
              </p>
            </div>
          </div>

          {/* Affirmation Banner */}
          <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-300">
            <span className="text-[10px] text-charcoal-400 font-semibold uppercase tracking-wider block mb-1">
              {locale === 'zh' ? '每日调频真言 (Affirmation)' : 'Daily Affirmation'}
            </span>
            <p className="font-serif italic text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed">
              “{locale === 'zh' ? activeChakra.affirmationZh : activeChakra.affirmationEn}”
            </p>
          </div>

          {/* Connected Sound & Card CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ivory-200">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-serif font-bold shadow-sm"
                style={{ backgroundColor: recommendedTrack.coverColor }}
              >
                🎵
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 block font-semibold uppercase">
                  {locale === 'zh' ? '推荐共振调频音' : 'Resonant Track'}
                </span>
                <span className="text-xs font-medium text-charcoal-800 line-clamp-1">
                  {locale === 'zh' ? recommendedTrack.titleZh : recommendedTrack.titleEn}
                </span>
              </div>
            </div>

            <button
              onClick={() => playTrack(recommendedTrack)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center justify-center gap-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5 ml-0.5" />
              <span>{locale === 'zh' ? `聆听 ${activeChakra.frequency}Hz` : `Play ${activeChakra.frequency}Hz`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
