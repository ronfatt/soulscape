'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SEED_ORACLE_CARDS, SEED_MUSIC_TRACKS } from '@/data/seedData';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart, Play, BookOpen } from 'lucide-react';

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, favorites, toggleFavorite, playTrack } = useApp();

  const id = Number(params?.id);
  const card = SEED_ORACLE_CARDS.find((c) => c.id === id) || SEED_ORACLE_CARDS[0];
  const isFav = favorites.cards.includes(card.id);

  const relatedTrack = SEED_MUSIC_TRACKS.find(t => t.chakra === card.chakra) || SEED_MUSIC_TRACKS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            { labelZh: '神谕卡殿堂', labelEn: 'Oracle Cards', href: '/cards' },
            { labelZh: `#${card.number} ${card.nameZh}`, labelEn: `#${card.number} ${card.nameEn}` }
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <OracleCardVisual card={card} size="hero" interactive={true} />
          </div>

          <div className="md:col-span-7 space-y-5 text-charcoal-800">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                #{card.number < 10 ? `0${card.number}` : card.number}
              </span>
              <button
                onClick={() => toggleFavorite('cards', card.id)}
                className="flex items-center gap-1 text-xs text-charcoal-500 hover:text-rose-600 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFav ? (locale === 'zh' ? '已收藏' : 'Saved') : (locale === 'zh' ? '收藏' : 'Save')}</span>
              </button>
            </div>

            <div>
              <span className="text-xs text-sage-700 font-semibold uppercase tracking-wider">
                {locale === 'zh' ? card.realmZh : card.realmEn} · {card.chakra.toUpperCase()}
              </span>
              <h1 className="font-serif text-3xl font-bold text-charcoal-900 mt-1">
                {locale === 'zh' ? card.nameZh : card.nameEn}
              </h1>
              <p className="text-xs text-charcoal-400 font-mono uppercase mt-0.5">
                {locale === 'zh' ? card.nameEn : card.nameZh}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(locale === 'zh' ? card.keywordsZh : card.keywordsEn).map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-sage-50 text-sage-800 font-medium border border-sage-200 text-xs"
                >
                  {kw}
                </span>
              ))}
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-charcoal-700">
              <p>
                <strong className="text-charcoal-900">{locale === 'zh' ? '象征图腾：' : 'Symbolism: '}</strong>
                {locale === 'zh' ? card.symbolismZh : card.symbolismEn}
              </p>
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <strong className="text-emerald-900 block mb-0.5">{locale === 'zh' ? '光明启示 (Light Meaning)：' : 'Light Meaning:'}</strong>
                {locale === 'zh' ? card.lightMeaningZh : card.lightMeaningEn}
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100">
                <strong className="text-rose-900 block mb-0.5">{locale === 'zh' ? '阴影警示 (Shadow Warning)：' : 'Shadow Warning:'}</strong>
                {locale === 'zh' ? card.shadowMeaningZh : card.shadowMeaningEn}
              </div>
              <div className="p-3.5 rounded-2xl bg-ivory-100 border border-ivory-300 italic">
                <strong className="text-charcoal-900 block not-italic mb-0.5">{locale === 'zh' ? '觉知反思之问：' : 'Reflection Prompt:'}</strong>
                “{locale === 'zh' ? card.reflectionPromptZh : card.reflectionPromptEn}”
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/card-reading"
                className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '开启包含此牌的占读' : 'Read with this Card'}</span>
              </Link>
              <button
                onClick={() => playTrack(relatedTrack)}
                className="px-4 py-2.5 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 text-xs font-medium border border-ivory-300 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '播放对应调频音' : 'Play Chakra Track'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
