'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SEED_MUSIC_TRACKS, SEED_CHAKRAS } from '@/data/seedData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Radio, Heart, Sparkles, Route, Volume2 } from 'lucide-react';

export default function MusicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, audioPlayer, playTrack, togglePlay, favorites, toggleFavorite } = useApp();

  const id = params?.id as string;
  const track = SEED_MUSIC_TRACKS.find(t => t.id === id) || SEED_MUSIC_TRACKS[0];
  const isThisPlaying = audioPlayer.currentTrack?.id === track.id && audioPlayer.isPlaying;
  const isFav = favorites.tracks.includes(track.id);

  const chakra = SEED_CHAKRAS.find(c => c.id === track.chakra);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            { labelZh: '全频声波乐库', labelEn: 'Sound Library', href: '/music' },
            { labelZh: `${track.frequencyHz}Hz ${track.titleZh}`, labelEn: `${track.frequencyHz}Hz ${track.titleEn}` }
          ]}
        />
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'zh' ? '返回乐库' : 'Back'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-300 shadow-soft-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-ivory-200">
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-soft-lg flex-shrink-0"
              style={{ backgroundColor: track.coverColor }}
            >
              <Radio className="w-10 h-10 animate-pulse text-gold-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 font-mono text-xs font-semibold">
                  {track.frequencyHz}Hz
                </span>
                <span className="text-xs text-sage-700 font-medium uppercase">
                  {track.category}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                {locale === 'zh' ? track.titleZh : track.titleEn}
              </h1>
              <p className="text-xs text-charcoal-500 mt-1">
                {locale === 'zh' ? track.artistZh : track.artistEn} · {Math.floor(track.durationSeconds / 60)} {locale === 'zh' ? '分钟沉浸' : 'mins'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isThisPlaying) togglePlay();
                else playTrack(track);
              }}
              className="px-6 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              {isThisPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              <span>{isThisPlaying ? (locale === 'zh' ? '暂停播放' : 'Pause') : (locale === 'zh' ? '立即沉浸聆听' : 'Play Track')}</span>
            </button>
            <button
              onClick={() => toggleFavorite('tracks', track.id)}
              className={`p-3 rounded-2xl border transition-colors ${
                isFav ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-ivory-100 border-ivory-200 text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bio-Acoustic Science Explanation */}
        <div className="space-y-4 text-xs text-charcoal-700 leading-relaxed font-light">
          <h3 className="font-serif font-bold text-charcoal-900 text-base">
            {locale === 'zh' ? '声波生物学与神经机制' : 'Psychoacoustic Architecture'}
          </h3>
          <p>
            {locale === 'zh'
              ? `本音频以 ${track.frequencyHz || 432}Hz 作为神圣基准载波，叠加 ${track.binauralBeatHz || 5}Hz 的微弱双耳相位差。当双耳同时接收略微不同的频率信号时，大脑上橄榄核会自发合成第三个差频信号，引导脑电波平缓回落至深度放松状态。`
              : `Tuned with a carrier of ${track.frequencyHz || 432}Hz and a binaural delta/alpha differential pacer.`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">
                {locale === 'zh' ? '基准载波' : 'Carrier Frequency'}
              </span>
              <span className="font-serif font-bold text-lg text-charcoal-900">{track.frequencyHz || 432} Hz</span>
            </div>
            <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">
                {locale === 'zh' ? '双耳差频' : 'Binaural Beat'}
              </span>
              <span className="font-serif font-bold text-lg text-charcoal-900">{track.binauralBeatHz || 5} Hz (Alpha/Theta)</span>
            </div>
            <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
              <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mb-1">
                {locale === 'zh' ? '对应脉轮枢纽' : 'Resonant Chakra'}
              </span>
              <span className="font-serif font-bold text-lg text-sage-800">
                {chakra ? (locale === 'zh' ? chakra.nameZh : chakra.nameEn) : '全息调和'}
              </span>
            </div>
          </div>
        </div>

        {/* Chakra Link if available */}
        {chakra && (
          <div className="p-5 rounded-2xl bg-sage-50/70 border border-sage-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: chakra.hexColor }}
              >
                {chakra.index}
              </div>
              <div>
                <h4 className="font-serif font-bold text-charcoal-900 text-xs sm:text-sm">
                  {locale === 'zh' ? `配合${chakra.nameZh}深度修习` : `Complement with ${chakra.nameEn}`}
                </h4>
                <p className="text-[11px] text-charcoal-500">
                  {locale === 'zh' ? chakra.affirmationZh : chakra.affirmationEn}
                </p>
              </div>
            </div>
            <Link
              href={`/chakras/${chakra.id}`}
              className="px-4 py-2 rounded-xl bg-white hover:bg-ivory-50 text-charcoal-800 text-xs font-medium border border-ivory-300 transition-colors"
            >
              {locale === 'zh' ? '查看脉轮详解' : 'Learn Chakra'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
