'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  HeartHandshake, 
  LayoutDashboard, 
  FileText, 
  Layers, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  Share2,
  Sparkles
} from 'lucide-react';

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, role, switchRole } = useApp();

  const mentorNav = [
    { href: '/mentor', labelZh: '工作台概览', labelEn: 'Overview', icon: LayoutDashboard },
    { href: '/mentor/bookings', labelZh: '个案预约管理', labelEn: 'Bookings', icon: Calendar },
    { href: '/mentor/content', labelZh: '内容与文稿', labelEn: 'Articles', icon: FileText },
    { href: '/mentor/cards', labelZh: '神谕卡批注', labelEn: 'Card Notes', icon: Layers },
    { href: '/mentor/courses', labelZh: '课程与学员', labelEn: 'Courses', icon: GraduationCap },
    { href: '/mentor/earnings', labelZh: '收益与结算', labelEn: 'Earnings', icon: DollarSign },
    { href: '/mentor/share-links', labelZh: '推广与分销', labelEn: 'Referrals', icon: Share2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Mentor Top Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-lavender-50 border border-lavender-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lavender-600 text-white flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-charcoal-900 text-sm sm:text-base">
                {locale === 'zh' ? '导师专属协同工作台 · Soulscape Mentor Workspace' : 'Mentor Workspace'}
              </h2>
              <span className="px-2 py-0.2 rounded-md bg-lavender-200 text-lavender-800 text-[10px] font-semibold">
                认证导师认证中
              </span>
            </div>
            <p className="text-[11px] text-charcoal-500 font-light">
              {locale === 'zh' ? '管理您的 1对1 咨询档期、原创课程、神谕卡解构批注与收益分润。' : 'Manage consultations, courses, card commentaries, and earnings.'}
            </p>
          </div>
        </div>

        {role !== 'mentor' && (
          <button
            onClick={() => switchRole('mentor')}
            className="px-3 py-1.5 rounded-xl bg-lavender-600 text-white text-xs font-semibold hover:bg-lavender-700 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'zh' ? '切换为导师视角' : 'Switch Role to Mentor'}</span>
          </button>
        )}
      </div>

      {/* Mentor Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-ivory-200">
        {mentorNav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-sage-600 text-white shadow-soft'
                  : 'bg-white text-charcoal-700 border border-ivory-200 hover:bg-ivory-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? item.labelZh : item.labelEn}</span>
            </Link>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div>{children}</div>
    </div>
  );
}
