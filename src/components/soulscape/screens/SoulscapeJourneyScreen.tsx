'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  Sparkles, 
  BookOpen, 
  Users, 
  Calendar, 
  Music, 
  Layers, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeTabs from '../SoulscapeTabs';
import SoulscapeProgressRing from '../SoulscapeProgressRing';
import SoulscapeSectionHeading from '../SoulscapeSectionHeading';
import SoulscapeButton from '../SoulscapeButton';

export const SoulscapeJourneyScreen: React.FC = () => {
  const router = useRouter();
  const { user, locale, readings, mentorBookings } = useApp();
  const [activeTab, setActiveTab] = useState('progress');

  const isZh = locale === 'zh';

  const journeyTabs = [
    { id: 'progress', label: isZh ? '成長進度' : 'Progress' },
    { id: 'journal', label: isZh ? '心靈手札' : 'Journal' },
    { id: 'community', label: isZh ? '共修社群' : 'Community' },
  ];

  const stats = [
    { labelZh: '冥想修習天數', labelEn: 'Meditation Days', value: 21, icon: Music },
    { labelZh: '神諭牌卡抽取', labelEn: 'Cards Drawn', value: 12, icon: Layers },
    { labelZh: '大師個案諮詢', labelEn: 'Mentor Sessions', value: 5, icon: Users },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 01. Header matching Screen 08 */}
      <SoulscapeHeader
        mode="subpage"
        title="My Journey"
        subtitle={isZh ? '覺知成長 · 心靈手札 · 溫暖社群' : 'Inner Growth, Reflections & Community'}
        showBack={false}
        rightAction={
          <button
            onClick={() => router.push('/profile')}
            className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#EDE5D9] flex items-center justify-center text-[#332D2A] hover:bg-[#FAF7F2] transition-colors shadow-xs"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 stroke-[1.8]" />
          </button>
        }
      />

      <div className="px-4 sm:px-6 space-y-5">
        {/* 02. Tabs (Progress | Journal | Community) */}
        <SoulscapeTabs
          variant="segmented"
          tabs={journeyTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* 03. Hero Progress Ring matching Screen 08 */}
        <SoulscapeProgressRing variant="hero" progress={78} />

        {/* 04. Three-Column Key Stats Row */}
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-[22px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-xs text-center"
            >
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#332D2A] block">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#736B66] font-medium leading-tight block mt-1">
                {isZh ? stat.labelZh : stat.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* 05. My Reflections Section (Screen 08) */}
        <div>
          <SoulscapeSectionHeading
            title={isZh ? '我的手札日誌' : 'My Reflections'}
            seeAllHref="/journeys"
          />

          <div className="p-4 rounded-[22px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EDE5D9]">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80"
                  alt="Reflection thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <span className="text-[10px] text-[#AFA8A3] font-mono block">
                  Jun 12, 2024
                </span>
                <p className="font-serif font-bold text-xs sm:text-sm text-[#332D2A] truncate mt-0.5">
                  {isZh ? '今天感覺心境更為沉穩、安住。感恩這段旅程 🌿' : 'Today I felt more grounded. Grateful for this journey 🌿'}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-[#AFA8A3] shrink-0" />
          </div>
        </div>

        {/* 06. Community Highlights Section (Screen 08) */}
        <div>
          <SoulscapeSectionHeading
            title={isZh ? '共修社群精選' : 'Community Highlights'}
            seeAllHref="/explore"
          />

          <div className="p-4 rounded-[22px] bg-gradient-to-r from-[#FFFDF9] via-[#FAF7F2] to-[#F5EEFB] border border-[#EDE5D9]/90 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E8DDF5] flex items-center justify-center text-xl shadow-inner">
                🌸
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#332D2A]">
                  A Kinder World
                </h4>
                <p className="text-[11px] text-[#736B66]">
                  126 members · {isZh ? '每日晨間正念打卡' : 'Daily mindful reflections'}
                </p>
              </div>
            </div>

            <SoulscapeButton
              variant="pill"
              size="sm"
              onClick={() => {}}
            >
              {isZh ? '加入' : 'Join'}
            </SoulscapeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeJourneyScreen;
