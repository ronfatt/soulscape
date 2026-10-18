'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  SEED_ORACLE_CARDS, 
  SEED_MUSIC_TRACKS, 
  SEED_CHAKRAS, 
  SEED_ARTICLES, 
  SEED_MENTORS 
} from '@/data/seedData';
import Link from 'next/link';
import { 
  Sparkles, 
  Music, 
  Layers, 
  BookOpen, 
  Users, 
  Play, 
  ChevronRight,
  ArrowRight 
} from 'lucide-react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeHeader from '@/components/soulscape/SoulscapeHeader';
import SoulscapeTabs from '@/components/soulscape/SoulscapeTabs';
import SoulscapeInput from '@/components/soulscape/SoulscapeInput';
import SoulscapeSectionHeading from '@/components/soulscape/SoulscapeSectionHeading';
import SoulscapeOracleCard from '@/components/soulscape/SoulscapeOracleCard';

export default function ExplorePage() {
  const { locale, playTrack } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cards' | 'music' | 'mentors'>('all');

  const isZh = locale === 'zh';
  const q = query.toLowerCase().trim();

  const matchingCards = SEED_ORACLE_CARDS.filter(c => 
    !q || c.nameZh.includes(q) || c.nameEn.toLowerCase().includes(q) || c.keywordsZh.some(k => k.includes(q))
  ).slice(0, 6);

  const matchingTracks = SEED_MUSIC_TRACKS.filter(t =>
    !q || t.titleZh.includes(q) || t.titleEn.toLowerCase().includes(q)
  ).slice(0, 4);

  const exploreTabs = [
    { id: 'all', label: isZh ? '全部' : 'All' },
    { id: 'cards', label: isZh ? '神諭卡牌' : 'Cards' },
    { id: 'music', label: isZh ? '調頻音療' : 'Music' },
    { id: 'mentors', label: isZh ? '導師智庫' : 'Mentors' },
  ];

  return (
    <SoulscapeMobileShell activeTab="explore">
      <div className="space-y-4 animate-fade-in">
        {/* Header */}
        <SoulscapeHeader
          mode="subpage"
          title={isZh ? '全息覺知探索' : 'Explore'}
          subtitle={isZh ? '卡牌 · 聲波 · 脈輪 · 導師' : 'Cards, Sound, Chakras & Mentors'}
          showBack={false}
        />

        <div className="px-4 sm:px-6 space-y-4">
          {/* Search Bar */}
          <SoulscapeInput
            variant="search"
            placeholder={isZh ? '搜尋身心關鍵字（如：焦慮、心輪、528Hz、星星）...' : 'Search any topic across Soulscape...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Filter Tabs */}
          <SoulscapeTabs
            tabs={exploreTabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as any)}
          />

          {/* 01. Oracle Cards Section */}
          {(activeTab === 'all' || activeTab === 'cards') && (
            <div className="pt-2">
              <SoulscapeSectionHeading
                title={isZh ? '88枚原初神諭卡' : 'Sacred Oracle Decks'}
                seeAllHref="/cards"
              />

              <div className="grid grid-cols-3 gap-2.5">
                {matchingCards.slice(0, 3).map((c, idx) => (
                  <Link key={c.id} href={`/cards/${c.id}`} className="group flex flex-col items-center">
                    <SoulscapeOracleCard
                      theme={idx === 0 ? 'star' : idx === 1 ? 'sun' : 'moon'}
                      positionLabel={isZh ? c.nameZh.split('·')[0].trim() : c.nameEn}
                      positionSublabel={isZh ? c.realmZh : c.realmEn}
                      size="sm"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 02. Meditation Tracks Section */}
          {(activeTab === 'all' || activeTab === 'music') && (
            <div className="pt-2">
              <SoulscapeSectionHeading
                title={isZh ? '調頻聲波精選' : 'Featured Sound Therapy'}
                seeAllHref="/music"
              />

              <div className="space-y-2.5">
                {matchingTracks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => playTrack(t)}
                    className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#B79A63]/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EDE5D9] flex items-center justify-center text-[#B79A63]">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#332D2A]">
                          {isZh ? t.titleZh : t.titleEn}
                        </h4>
                        <p className="text-[10px] text-[#736B66]">
                          {t.frequencyHz} Hz · {Math.floor(t.durationSeconds / 60)} min
                        </p>
                      </div>
                    </div>

                    <button className="w-7 h-7 rounded-full bg-[#B79A63]/10 text-[#B79A63] flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 03. Mentors Teaser */}
          {(activeTab === 'all' || activeTab === 'mentors') && (
            <div className="pt-2">
              <SoulscapeSectionHeading
                title={isZh ? '認證身心導師' : 'Master Mentors'}
                seeAllHref="/mentors"
              />

              <div className="p-4 rounded-[22px] bg-gradient-to-r from-[#FFFDF9] to-[#FAF7F2] border border-[#EDE5D9]/90 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F4ECE0] flex items-center justify-center text-[#B79A63]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#332D2A]">
                      {isZh ? '8位東方身心導師在線' : '8 Master Mentors Online'}
                    </h4>
                    <p className="text-[11px] text-[#736B66]">
                      {isZh ? '預約 1對1 視訊個案與專屬脈輪調頻' : 'Book 1-on-1 private video consultations'}
                    </p>
                  </div>
                </div>

                <Link
                  href="/mentors"
                  className="px-3 py-1.5 rounded-full bg-[#B79A63] text-white text-xs font-semibold shadow-xs"
                >
                  {isZh ? '查看' : 'View'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </SoulscapeMobileShell>
  );
}
