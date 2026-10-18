'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  HeartHandshake, 
  Layers, 
  Music, 
  FileText, 
  CreditCard, 
  Receipt, 
  Bot, 
  BarChart3, 
  Settings,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, role, switchRole } = useApp();

  const adminNav = [
    { href: '/admin', labelZh: '经营仪表盘', labelEn: 'Overview', icon: LayoutDashboard },
    { href: '/admin/users', labelZh: '用户管理', labelEn: 'Users', icon: Users },
    { href: '/admin/mentors', labelZh: '导师审核', labelEn: 'Mentors', icon: HeartHandshake },
    { href: '/admin/card-decks', labelZh: '神谕卡牌组', labelEn: 'Card Decks', icon: Layers },
    { href: '/admin/music', labelZh: '声波乐库', labelEn: 'Music', icon: Music },
    { href: '/admin/content', labelZh: '内容管理', labelEn: 'Content', icon: FileText },
    { href: '/admin/memberships', labelZh: '会籍与定价', labelEn: 'Memberships', icon: CreditCard },
    { href: '/admin/transactions', labelZh: '全站流水', labelEn: 'Transactions', icon: Receipt },
    { href: '/admin/ai-usage', labelZh: 'AI用量监控', labelEn: 'AI Metrics', icon: Bot },
    { href: '/admin/analytics', labelZh: '深度数据大屏', labelEn: 'Analytics', icon: BarChart3 },
    { href: '/admin/settings', labelZh: '系统与API设置', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-charcoal-900 text-ivory-100 border border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5 text-gold-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-sm sm:text-base">
                {locale === 'zh' ? 'Soulscape 首席生态管理中枢' : 'Executive Admin Console'}
              </h2>
              <span className="px-2 py-0.2 rounded-md bg-sage-800 text-sage-200 text-[10px] font-semibold border border-sage-700">
                最高合伙人权限
              </span>
            </div>
            <p className="text-[11px] text-charcoal-400 font-light">
              {locale === 'zh' ? '监控全站核心指标、用户生命周期、AI 调用成本模型与资金流转。' : 'Enterprise monitoring for platform KPIs, unit economics, and moderation.'}
            </p>
          </div>
        </div>

        {role !== 'admin' && (
          <button
            onClick={() => switchRole('admin')}
            className="px-3 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === 'zh' ? '切换为管理员身份' : 'Switch Role to Admin'}</span>
          </button>
        )}
      </div>

      {/* Admin Horizontal Nav Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-ivory-200">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-charcoal-800 text-white shadow-soft'
                  : 'bg-white text-charcoal-700 border border-ivory-200 hover:bg-ivory-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? item.labelZh : item.labelEn}</span>
            </Link>
          );
        })}
      </div>

      {/* Admin Content */}
      <div>{children}</div>
    </div>
  );
}
