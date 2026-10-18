'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Home, 
  Compass, 
  Sparkles, 
  Users, 
  User, 
  Route, 
  Flame 
} from 'lucide-react';

export const SoulscapeBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { locale, credits } = useApp();

  const isZh = locale === 'zh';

  const tabs = [
    {
      id: 'home',
      href: '/',
      labelZh: '首頁',
      labelEn: 'Home',
      icon: Home,
      exact: true,
    },
    {
      id: 'explore',
      href: '/explore',
      labelZh: '探索',
      labelEn: 'Explore',
      icon: Compass,
    },
    {
      id: 'card-reading',
      href: '/card-reading',
      labelZh: '塔羅占讀',
      labelEn: 'Card Reading',
      icon: Sparkles,
      badge: '✨',
    },
    {
      id: 'mentors',
      href: '/mentors',
      labelZh: '專業導師',
      labelEn: 'Mentors',
      icon: Users,
    },
    {
      id: 'journeys',
      href: '/journeys',
      labelZh: '我的成長',
      labelEn: 'My Journey',
      icon: Route,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-lg border-t border-[#EDE5D9]/90 shadow-[0_-4px_20px_rgba(51,45,42,0.04)] px-2 sm:px-6 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.exact 
            ? pathname === tab.href 
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative select-none ${
                isActive 
                  ? 'text-[#B79A63] font-semibold scale-105' 
                  : 'text-[#736B66] hover:text-[#332D2A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2] text-[#B79A63]' : 'stroke-[1.6]'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 w-2 h-2 rounded-full bg-[#B79A63]" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-tight">
                {isZh ? tab.labelZh : tab.labelEn}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-3 h-0.5 rounded-full bg-[#B79A63]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SoulscapeBottomNav;
