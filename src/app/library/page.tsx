'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  SEED_ORACLE_CARDS, 
  SEED_MUSIC_TRACKS, 
  SEED_MENTORS, 
  SEED_ARTICLES 
} from '@/data/seedData';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import Link from 'next/link';
import { 
  FolderHeart, 
  Layers, 
  Music, 
  Users, 
  BookOpen, 
  Play, 
  Heart, 
  ArrowRight 
} from 'lucide-react';

export default function LibraryPage() {
  const { locale, favorites, toggleFavorite, playTrack } = useApp();
  const [activeTab, setActiveTab] = useState<'cards' | 'tracks' | 'mentors' | 'articles'>('cards');

  const savedCards = SEED_ORACLE_CARDS.filter(c => favorites.cards.includes(c.id));
  const savedTracks = SEED_MUSIC_TRACKS.filter(t => favorites.tracks.includes(t.id));
  const savedMentors = SEED_MENTORS.filter(m => favorites.mentors.includes(m.id));
  const savedArticles = SEED_ARTICLES.filter(a => favorites.articles.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium mb-3 border border-rose-200">
          <FolderHeart className="w-3.5 h-3.5 text-rose-600" />
          <span>{locale === 'zh' ? '我的私人心灵藏珍' : 'My Personal Sanctuary Library'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
          {locale === 'zh' ? '收藏的心灵信物与声波' : 'Favorited Tokens & Soundscapes'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 font-light">
          {locale === 'zh' ? '跨端持久化保存属于你的共鸣卡牌、调频曲目、心仪导师与深度文章。' : 'All saved archetypes, frequencies, and articles preserved in local storage.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 border-b border-ivory-200 pb-4">
        {[
          { id: 'cards', labelZh: `收藏的卡牌 (${savedCards.length})`, labelEn: `Cards (${savedCards.length})`, icon: Layers },
          { id: 'tracks', labelZh: `收藏的声波 (${savedTracks.length})`, labelEn: `Frequencies (${savedTracks.length})`, icon: Music },
          { id: 'mentors', labelZh: `心仪导师 (${savedMentors.length})`, labelEn: `Mentors (${savedMentors.length})`, icon: Users },
          { id: 'articles', labelZh: `收藏文章 (${savedArticles.length})`, labelEn: `Articles (${savedArticles.length})`, icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-sage-600 text-white shadow-soft'
                  : 'text-charcoal-600 hover:bg-ivory-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? tab.labelZh : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'cards' && (
          savedCards.length === 0 ? (
            <div className="text-center py-16 text-charcoal-400 text-xs">
              {locale === 'zh' ? '暂未收藏任何卡牌，可以在卡牌库中点击心形收藏' : 'No saved cards yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
              {savedCards.map(c => (
                <div key={c.id} className="flex flex-col items-center">
                  <OracleCardVisual card={c} size="sm" interactive={false} />
                  <div className="w-full mt-2 flex items-center justify-between px-1">
                    <span className="text-xs font-medium text-charcoal-800 truncate">{c.nameZh}</span>
                    <button onClick={() => toggleFavorite('cards', c.id)} className="text-rose-500">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'tracks' && (
          savedTracks.length === 0 ? (
            <div className="text-center py-16 text-charcoal-400 text-xs">
              {locale === 'zh' ? '暂无收藏的调频声波' : 'No saved tracks.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTracks.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-white border border-ivory-200 shadow-soft flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-sage-700 font-semibold">{t.frequencyHz}Hz</span>
                    <h3 className="font-serif font-bold text-xs truncate mt-0.5">{t.titleZh}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playTrack(t)}
                      className="w-8 h-8 rounded-xl bg-sage-600 text-white flex items-center justify-center hover:bg-sage-700"
                    >
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                    <button onClick={() => toggleFavorite('tracks', t.id)} className="text-rose-500 p-1">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'mentors' && (
          savedMentors.length === 0 ? (
            <div className="text-center py-16 text-charcoal-400 text-xs">
              {locale === 'zh' ? '暂无收藏的导师' : 'No saved mentors.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedMentors.map(m => (
                <div key={m.id} className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.nameZh} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif font-bold text-xs">{m.nameZh}</h4>
                      <p className="text-[10px] text-charcoal-400">{m.titleZh}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleFavorite('mentors', m.id)} className="text-rose-500 p-1">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'articles' && (
          savedArticles.length === 0 ? (
            <div className="text-center py-16 text-charcoal-400 text-xs">
              {locale === 'zh' ? '暂无收藏的文章' : 'No saved articles.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedArticles.map(a => (
                <div key={a.id} className="p-5 rounded-2xl bg-white border border-ivory-200 shadow-soft flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-sage-700 font-semibold uppercase">{a.categoryZh}</span>
                    <h4 className="font-serif font-bold text-sm text-charcoal-900 mt-0.5">{a.titleZh}</h4>
                  </div>
                  <button onClick={() => toggleFavorite('articles', a.id)} className="text-rose-500 p-1">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
