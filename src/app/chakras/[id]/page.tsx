'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SEED_CHAKRAS, SEED_MUSIC_TRACKS, SEED_ORACLE_CARDS } from '@/data/seedData';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';
import { ArrowLeft, Play, Route, Sparkles, CheckCircle2, AlertCircle, Heart } from 'lucide-react';

export default function ChakraDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, playTrack } = useApp();

  const id = params?.id as string;
  const chakra = SEED_CHAKRAS.find(c => c.id === id) || SEED_CHAKRAS[3]; // default heart

  const recommendedTrack = SEED_MUSIC_TRACKS.find(t => t.id === chakra.recommendedTrackId) || SEED_MUSIC_TRACKS[0];
  const relatedCards = SEED_ORACLE_CARDS.filter(c => c.chakra === chakra.id).slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            { labelZh: '七脉轮智慧', labelEn: 'Seven Chakras', href: '/chakras' },
            { labelZh: `${chakra.nameZh} (${chakra.sanskrit})`, labelEn: `${chakra.nameEn} (${chakra.sanskrit})` }
          ]}
        />
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'zh' ? '返回列表' : 'Back'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-300 shadow-soft-xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-ivory-200">
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-soft"
              style={{ backgroundColor: chakra.hexColor }}
            >
              {chakra.index}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 font-semibold">
                  {chakra.frequency} Hz
                </span>
                <span className="text-xs text-charcoal-400 font-mono">
                  {chakra.sanskrit} · {chakra.seedMantra}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-charcoal-900">
                {locale === 'zh' ? chakra.nameZh : chakra.nameEn}
              </h1>
              <p className="text-xs text-charcoal-500 mt-0.5">
                {locale === 'zh' ? `生理对应位置：${chakra.locationZh}` : `Location: ${chakra.locationEn}`} · 元素：{chakra.element}
              </p>
            </div>
          </div>

          <button
            onClick={() => playTrack(recommendedTrack)}
            className="px-6 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-2"
          >
            <Play className="w-4 h-4 ml-0.5" />
            <span>{locale === 'zh' ? `播放 ${chakra.frequency}Hz 调频` : 'Play Frequency'}</span>
          </button>
        </div>

        {/* Narrative Description */}
        <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
          <h3 className="font-serif font-bold text-charcoal-900 text-base">
            {locale === 'zh' ? '脉轮心身图景与生命课题' : 'Energetic Landscape & Life Themes'}
          </h3>
          <p>{locale === 'zh' ? chakra.descriptionZh : chakra.descriptionEn}</p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{locale === 'zh' ? '身心平衡状态' : 'Balanced Expressions'}</span>
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              {locale === 'zh' ? chakra.balancedZh : chakra.balancedEn}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{locale === 'zh' ? '能量受阻失衡征候' : 'Blocked Signals'}</span>
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              {locale === 'zh' ? chakra.blockedZh : chakra.blockedEn}
            </p>
          </div>
        </div>

        {/* Affirmation Quote */}
        <div className="p-5 rounded-2xl bg-ivory-100 border border-ivory-300">
          <span className="text-[10px] text-charcoal-400 font-semibold uppercase tracking-wider block mb-1">
            {locale === 'zh' ? '每日调频真言 (Sacred Affirmation)' : 'Sacred Affirmation'}
          </span>
          <p className="font-serif italic text-sm text-charcoal-800 font-medium">
            “{locale === 'zh' ? chakra.affirmationZh : chakra.affirmationEn}”
          </p>
        </div>

        {/* Related Oracle Cards for this chakra */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-charcoal-900 text-base">
              {locale === 'zh' ? '对应脉轮的原初神谕卡' : 'Corresponding Oracle Cards'}
            </h3>
            <Link href="/cards" className="text-xs text-sage-700 hover:underline">
              {locale === 'zh' ? '查看更多' : 'View more'}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedCards.map(c => (
              <Link key={c.id} href={`/cards/${c.id}`} className="group flex flex-col items-center">
                <OracleCardVisual card={c} size="sm" interactive={false} />
                <span className="text-xs font-medium text-charcoal-800 mt-2 group-hover:text-sage-700">
                  {locale === 'zh' ? c.nameZh : c.nameEn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
