'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_ORACLE_CARDS, SEED_CARD_DECK } from '@/data/seedData';
import { ChakraType, OracleCard } from '@/types';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Info, 
  RotateCcw,
  Check,
  Heart
} from 'lucide-react';

export default function CardsGalleryPage() {
  const { locale, favorites, toggleFavorite } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChakra, setSelectedChakra] = useState<string>('all');
  const [selectedRealm, setSelectedRealm] = useState<string>('all');
  const [activeModalCard, setActiveModalCard] = useState<OracleCard | null>(null);

  const chakras: { id: string; labelZh: string; labelEn: string }[] = [
    { id: 'all', labelZh: '全部脉轮', labelEn: 'All Chakras' },
    { id: 'root', labelZh: '海底轮', labelEn: 'Root' },
    { id: 'sacral', labelZh: '本我轮', labelEn: 'Sacral' },
    { id: 'solar_plexus', labelZh: '太阳轮', labelEn: 'Solar Plexus' },
    { id: 'heart', labelZh: '心轮', labelEn: 'Heart' },
    { id: 'throat', labelZh: '喉轮', labelEn: 'Throat' },
    { id: 'third_eye', labelZh: '眉心轮', labelEn: 'Third Eye' },
    { id: 'crown', labelZh: '顶轮', labelEn: 'Crown' },
  ];

  const realms: { id: string; labelZh: string; labelEn: string }[] = [
    { id: 'all', labelZh: '全部神圣界域', labelEn: 'All Realms' },
    { id: '原初扎根界', labelZh: '原初扎根界', labelEn: 'Primordial Roots' },
    { id: '潮汐流动界', labelZh: '潮汐流动界', labelEn: 'Oceanic Currents' },
    { id: '光辉烈焰界', labelZh: '光辉烈焰界', labelEn: 'Solar Forge' },
    { id: '翡翠慈悲界', labelZh: '翡翠慈悲界', labelEn: 'Verdant Anahata' },
    { id: '蔚蓝鸣响界', labelZh: '蔚蓝鸣响界', labelEn: 'Azure Harmonics' },
    { id: '星夜灵视界', labelZh: '星夜灵视界', labelEn: 'Indigo Vision' },
    { id: '宇光圆融界', labelZh: '宇光圆融界', labelEn: 'Cosmic Sahasrara' },
  ];

  const filteredCards = SEED_ORACLE_CARDS.filter((card) => {
    const matchesSearch =
      card.nameZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.keywordsZh.some(k => k.includes(searchTerm)) ||
      card.keywordsEn.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesChakra = selectedChakra === 'all' || card.chakra === selectedChakra;
    const matchesRealm = selectedRealm === 'all' || card.realmZh === selectedRealm;

    return matchesSearch && matchesChakra && matchesRealm;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header Deck Info Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-300 shadow-soft-lg mb-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>{SEED_CARD_DECK.version} · 官方原创种子牌组</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-semibold tracking-tight">
              {locale === 'zh' ? SEED_CARD_DECK.nameZh : SEED_CARD_DECK.nameEn}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              {locale === 'zh' ? SEED_CARD_DECK.descriptionZh : SEED_CARD_DECK.descriptionEn}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 pt-1">
              <span>🎴 共 88 张原创神谕牌</span>
              <span>•</span>
              <span>🌈 涵盖七大脉轮</span>
              <span>•</span>
              <span>🌿 原创非商用公开原型</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link
              href="/card-reading"
              className="px-6 py-3.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-medium text-xs shadow-soft text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{locale === 'zh' ? '开启即时占读' : 'Start Reading'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-ivory-300 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === 'zh' ? '搜索牌名、关键词（如：稳固、心轮、勇气）...' : 'Search card name or keywords...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-ivory-50/70 border border-ivory-200 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>

          {/* Result counter */}
          <span className="text-xs text-charcoal-500 font-mono self-center">
            {locale === 'zh' ? `展示 ${filteredCards.length} / 88 张卡牌` : `Showing ${filteredCards.length} / 88 cards`}
          </span>
        </div>

        {/* Chakra Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-ivory-200">
          <span className="text-[11px] font-semibold text-charcoal-400 mr-1 uppercase">
            {locale === 'zh' ? '脉轮' : 'Chakra'}:
          </span>
          {chakras.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedChakra(c.id)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                selectedChakra === c.id
                  ? 'bg-sage-600 text-white font-medium shadow-xs'
                  : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
              }`}
            >
              {locale === 'zh' ? c.labelZh : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
        {filteredCards.map((card) => {
          const isFav = favorites.cards.includes(card.id);
          return (
            <div
              key={card.id}
              className="flex flex-col items-center group relative"
            >
              {/* Card visual */}
              <div
                onClick={() => setActiveModalCard(card)}
                className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
              >
                <OracleCardVisual
                  card={card}
                  size="sm"
                  interactive={false}
                />
              </div>

              {/* Card mini metadata label */}
              <div className="w-full mt-2 text-center flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold text-charcoal-800 truncate">
                  {locale === 'zh' ? card.nameZh : card.nameEn}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('cards', card.id);
                  }}
                  className={`p-1 rounded-md transition-colors ${
                    isFav ? 'text-rose-500' : 'text-charcoal-300 hover:text-charcoal-600'
                  }`}
                  title={isFav ? '已收藏' : '收藏'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CARD DETAIL MODAL */}
      {activeModalCard && (
        <div
          onClick={() => setActiveModalCard(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-ivory-300 shadow-soft-xl max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200">
                  #{activeModalCard.number}
                </span>
                <span className="text-xs text-sage-800 font-medium">
                  {locale === 'zh' ? activeModalCard.realmZh : activeModalCard.realmEn} · {activeModalCard.chakra.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setActiveModalCard(null)}
                className="p-1 rounded-lg text-charcoal-400 hover:bg-ivory-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 flex justify-center">
                <OracleCardVisual
                  card={activeModalCard}
                  size="md"
                  interactive={true}
                />
              </div>

              <div className="sm:col-span-7 space-y-4 text-xs text-charcoal-700">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                    {locale === 'zh' ? activeModalCard.nameZh : activeModalCard.nameEn}
                  </h3>
                  <p className="text-[11px] text-charcoal-400 font-mono uppercase">
                    {locale === 'zh' ? activeModalCard.nameEn : activeModalCard.nameZh}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(locale === 'zh' ? activeModalCard.keywordsZh : activeModalCard.keywordsEn).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-sage-50 text-sage-800 font-medium border border-sage-200 text-[11px]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">
                    {locale === 'zh' ? '象征意象与图腾' : 'Symbolism'}
                  </h4>
                  <p className="text-charcoal-600 leading-relaxed font-light">
                    {locale === 'zh' ? activeModalCard.symbolismZh : activeModalCard.symbolismEn}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">
                    {locale === 'zh' ? '正面启示 (Light Meaning)' : 'Light Meaning'}
                  </h4>
                  <p className="text-charcoal-600 leading-relaxed font-light bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                    {locale === 'zh' ? activeModalCard.lightMeaningZh : activeModalCard.lightMeaningEn}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">
                    {locale === 'zh' ? '阴影警示 (Shadow Warning)' : 'Shadow Warning'}
                  </h4>
                  <p className="text-charcoal-600 leading-relaxed font-light bg-rose-50/40 p-2.5 rounded-xl border border-rose-100">
                    {locale === 'zh' ? activeModalCard.shadowMeaningZh : activeModalCard.shadowMeaningEn}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">
                    {locale === 'zh' ? '反思之问 (Reflection Prompt)' : 'Reflection Prompt'}
                  </h4>
                  <p className="text-charcoal-600 italic leading-relaxed">
                    “{locale === 'zh' ? activeModalCard.reflectionPromptZh : activeModalCard.reflectionPromptEn}”
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ivory-200">
              <button
                onClick={() => toggleFavorite('cards', activeModalCard.id)}
                className="flex items-center gap-1.5 text-xs text-charcoal-600 hover:text-rose-600"
              >
                <Heart className={`w-4 h-4 ${favorites.cards.includes(activeModalCard.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>
                  {favorites.cards.includes(activeModalCard.id)
                    ? (locale === 'zh' ? '已收藏在个人库' : 'Favorited')
                    : (locale === 'zh' ? '收藏此卡' : 'Add to Favorites')}
                </span>
              </button>

              <Link
                href="/card-reading"
                className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '以此牌为意图占读' : 'Read with this Card'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
