'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import Link from 'next/link';
import { Sparkles, Play, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import { SEED_MUSIC_TRACKS } from '@/data/seedData';

export default function ReadingResultPage() {
  const { locale, readings, playTrack } = useApp();
  const latestReading = readings[0];

  if (!latestReading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <Sparkles className="w-12 h-12 text-sage-600 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">
          {locale === 'zh' ? '暂未找到占读记录' : 'No Reading Record Found'}
        </h2>
        <p className="text-xs text-charcoal-500">
          {locale === 'zh' ? '请先在占读专区抽取你的第一张原初神谕卡。' : 'Please begin a reading to view results.'}
        </p>
        <Link
          href="/card-reading"
          className="inline-block px-6 py-2.5 rounded-xl bg-sage-600 text-white text-xs font-semibold shadow-soft"
        >
          {locale === 'zh' ? '开启即时抽牌' : 'Start Reading'}
        </Link>
      </div>
    );
  }

  const track = SEED_MUSIC_TRACKS.find(t => t.id === latestReading.recommendedTrackId) || SEED_MUSIC_TRACKS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
          {latestReading.type === 'one_card' ? '今日觉知单牌' : '全息三牌阵'}
        </span>
        <h1 className="font-serif text-3xl font-bold text-charcoal-900">
          “{latestReading.questionZh}”
        </h1>
        <p className="text-xs text-charcoal-400 font-mono">{latestReading.timestamp}</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-300 shadow-soft-xl space-y-8">
        {/* Cards Visuals */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {latestReading.cards.map((c, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <span className="text-[11px] font-semibold text-charcoal-500 bg-ivory-100 px-2.5 py-0.5 rounded-md">
                {c.positionZh}
              </span>
              <OracleCardVisual card={c.card} size="md" interactive={false} />
              <span className="text-xs font-bold text-charcoal-900">{c.card.nameZh}</span>
            </div>
          ))}
        </div>

        {/* AI Synthesis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
            <h3 className="font-serif font-bold text-base text-charcoal-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sage-600" />
              <span>全息潜意识综合解析</span>
            </h3>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono">
              DEMO SIMULATION
            </span>
          </div>

          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light whitespace-pre-line bg-ivory-50/70 p-5 rounded-2xl border border-ivory-200">
            {latestReading.aiSynthesisZh}
          </p>
        </div>

        {/* Music recommendation */}
        <div className="p-5 rounded-2xl bg-sage-50/70 border border-sage-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-sage-800 uppercase font-semibold block">配套调频声波</span>
            <h4 className="font-serif font-bold text-sm text-charcoal-900">{track.titleZh}</h4>
          </div>
          <button
            onClick={() => playTrack(track)}
            className="px-4 py-2 rounded-xl bg-sage-600 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 ml-0.5" />
            <span>播放调频音</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-ivory-200">
          <Link
            href="/card-reading"
            className="px-4 py-2 rounded-xl text-xs font-medium text-charcoal-600 hover:bg-ivory-100 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重新占读</span>
          </Link>
          <Link
            href="/history"
            className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
          >
            <span>查看完整档案</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
