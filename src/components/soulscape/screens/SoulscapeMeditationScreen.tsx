'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeTabs from '../SoulscapeTabs';
import SoulscapeAudioPlayer from '../SoulscapeAudioPlayer';
import SoulscapeSectionHeading from '../SoulscapeSectionHeading';
import { Play, Sparkles, Volume2, Clock } from 'lucide-react';
import { SEED_MUSIC_TRACKS } from '@/data/seedData';

export const SoulscapeMeditationScreen: React.FC = () => {
  const { locale, playTrack, audioPlayer } = useApp();
  const [activeCategory, setActiveCategory] = useState('for-you');

  const isZh = locale === 'zh';

  const filterTabs = [
    { id: 'for-you', label: isZh ? '為你精選' : 'For You' },
    { id: 'sleep', label: isZh ? '深度助眠' : 'Sleep' },
    { id: 'anxiety', label: isZh ? '釋放焦慮' : 'Anxiety' },
    { id: 'self-love', label: isZh ? '自我慈悲' : 'Self Love' },
  ];

  const playlists = [
    {
      id: 'p1',
      title: 'Morning Energy',
      titleZh: '晨光喚醒',
      tracksCount: 5,
      duration: '28 min',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      title: 'Deep Sleep',
      titleZh: '深層德爾塔波助眠',
      tracksCount: 6,
      duration: '32 min',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      title: 'Self Love',
      titleZh: '心輪自我療癒',
      tracksCount: 5,
      duration: '25 min',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      title: 'Chakra Alignment',
      titleZh: '七脈輪全頻共振',
      tracksCount: 7,
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 01. Top Header */}
      <SoulscapeHeader
        mode="subpage"
        title={isZh ? '身心冥想音療' : 'Meditation'}
        subtitle={isZh ? '雙耳節拍 · 432Hz 舒曼共振' : 'Binaural beats & 432Hz resonance'}
      />

      <div className="px-4 sm:px-6 space-y-5">
        {/* 02. Filter Tabs */}
        <SoulscapeTabs
          tabs={filterTabs}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />

        {/* 03. Featured Featured Player Card (Matching Screen 03) */}
        <SoulscapeAudioPlayer
          title="Moonlight Calm"
          subtitle={isZh ? '重返內心平靜的聲波漫遊' : 'A journey back to your inner peace'}
          frequency="432 Hz"
          duration="20:00"
          currentTime="08:24"
          artworkUrl="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
        />

        {/* 04. Recommended Playlist Section */}
        <div>
          <SoulscapeSectionHeading
            title={isZh ? '推薦歌單' : 'Recommended Playlist'}
            seeAllHref="/music"
          />

          <div className="space-y-2.5">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => playTrack(SEED_MUSIC_TRACKS[0])}
                className="group p-3 rounded-2xl bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EDE5D9]">
                    <img
                      src={playlist.image}
                      alt={playlist.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#332D2A] truncate group-hover:text-[#B79A63] transition-colors">
                      {isZh ? playlist.titleZh : playlist.title}
                    </h4>
                    <p className="text-[11px] text-[#736B66] font-light mt-0.5">
                      {playlist.tracksCount} tracks · {playlist.duration}
                    </p>
                  </div>
                </div>

                <button
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EDE5D9] group-hover:bg-[#B79A63] group-hover:text-white flex items-center justify-center text-[#B79A63] transition-colors shrink-0 shadow-xs"
                  aria-label="Play Playlist"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeMeditationScreen;
