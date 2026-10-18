'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Music, 
  Layers, 
  Bot, 
  Users, 
  BookOpen, 
  Play, 
  Compass, 
  ChevronRight 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeProgressRing from '../SoulscapeProgressRing';
import SoulscapeCreditBadge from '../SoulscapeCreditBadge';
import SoulscapeSectionHeading from '../SoulscapeSectionHeading';
import SoulscapeArtworkCard from '../SoulscapeArtworkCard';

interface SoulscapeHomeScreenProps {
  onSelectAction?: (actionId: string) => void;
}

interface QuickActionItem {
  id: string;
  labelZh: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

export const SoulscapeHomeScreen: React.FC<SoulscapeHomeScreenProps> = ({
  onSelectAction,
}) => {
  const router = useRouter();
  const { user, locale, playTrack } = useApp();
  const isZh = locale === 'zh';

  const quickActions: QuickActionItem[] = [
    {
      id: 'meditation',
      labelZh: '身心冥想',
      labelEn: 'Meditation',
      icon: Music,
      href: '/music',
      color: 'bg-[#F4ECE0] text-[#B79A63]',
    },
    {
      id: 'reading',
      labelZh: 'AI 占讀',
      labelEn: 'AI Reading',
      icon: Layers,
      href: '/card-reading',
      color: 'bg-[#F5EEFB] text-[#7160A1]',
    },
    {
      id: 'chat',
      labelZh: 'AI 向導',
      labelEn: 'AI Chat',
      icon: Bot,
      href: '/ai-guide',
      color: 'bg-[#E8EFEA] text-[#526A54]',
    },
    {
      id: 'mentor',
      labelZh: '預約導師',
      labelEn: 'Mentor',
      icon: Users,
      href: '/mentors',
      color: 'bg-[#FCF7F8] text-[#CD717C]',
    },
    {
      id: 'journal',
      labelZh: '心靈手札',
      labelEn: 'Journal',
      icon: BookOpen,
      href: '/journeys',
      color: 'bg-[#FAF7F2] text-[#736B66]',
    },
  ];

  const recommendedTracks = [
    {
      id: '1',
      title: 'Inner Peace',
      subtitle: isZh ? '8分鐘 · 專注冥想' : '8 min · Meditation',
      duration: '8m',
      theme: 'lake' as const,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      action: () => router.push('/music'),
    },
    {
      id: '2',
      title: 'Self Love',
      subtitle: isZh ? '心輪綻放音頻系列' : 'Audio Series',
      duration: '15m',
      theme: 'floral' as const,
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=80',
      action: () => router.push('/music'),
    },
    {
      id: '3',
      title: 'Sleep Better',
      subtitle: isZh ? '432Hz 晚安深睡之旅' : 'Night Journey',
      duration: '30m',
      theme: 'night' as const,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      action: () => router.push('/music'),
    },
  ];

  return (
    <div className="space-y-6 pt-1 animate-fade-in">
      {/* 01. Personal Header */}
      <SoulscapeHeader mode="home" />

      {/* Main Content Padding Container */}
      <div className="px-4 sm:px-6 space-y-6">
        {/* 02. Your Soul Journey Progress Card */}
        <SoulscapeProgressRing progress={78} />

        {/* 03. Soul Credits Card */}
        <SoulscapeCreditBadge />

        {/* 04. Recommended for You Section */}
        <div>
          <SoulscapeSectionHeading
            title={isZh ? '為你推薦' : 'Recommended for You'}
            seeAllHref="/explore"
          />

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {recommendedTracks.map((item) => (
              <SoulscapeArtworkCard
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                duration={item.duration}
                theme={item.theme}
                imageUrl={item.imageUrl}
                onClick={item.action}
              />
            ))}
          </div>
        </div>

        {/* 05. Quick Action Icons Grid (5 round minimal line icons) */}
        <div className="py-2">
          <div className="grid grid-cols-5 gap-2 text-center">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.id}
                  href={action.href}
                  className="flex flex-col items-center group active:scale-95 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-[#EDE5D9]/80 shadow-xs mb-1.5 transition-colors group-hover:scale-105 ${action.color}`}>
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] font-medium text-[#332D2A] tracking-tight">
                    {isZh ? action.labelZh : action.labelEn}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 06. Continue Your Journey Section */}
        <div>
          <SoulscapeSectionHeading
            title={isZh ? '繼續修習' : 'Continue Your Journey'}
            seeAllHref="/journeys"
          />

          <SoulscapeArtworkCard
            isWide
            title="A Calmer Mind"
            subtitle={isZh ? '第 3 天 / 共 7 天 · 尚餘 5 分鐘' : 'Day 3 of 7 · 5 min left'}
            imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80"
            onClick={() => router.push('/music')}
          />
        </div>
      </div>
    </div>
  );
};

export default SoulscapeHomeScreen;
