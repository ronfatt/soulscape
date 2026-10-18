'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Menu, 
  X, 
  Compass, 
  Music, 
  Layers, 
  BookOpen, 
  Users, 
  GraduationCap, 
  CreditCard, 
  Bot, 
  Route, 
  FolderHeart, 
  History, 
  LayoutDashboard, 
  Wallet,
  ShieldCheck,
  HeartHandshake,
  TrendingUp
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { locale, role, user, credits } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/explore', labelZh: '探索', labelEn: 'Explore', icon: Compass },
    { href: '/cards', labelZh: '原初神谕', labelEn: 'Cards', icon: Layers },
    { href: '/card-reading', labelZh: '神谕占读', labelEn: 'Reading', icon: Sparkles, badge: 'Hot' },
    { href: '/music', labelZh: '调频音疗', labelEn: 'Music', icon: Music },
    { href: '/chakras', labelZh: '七脉轮', labelEn: 'Chakras', icon: Route },
    { href: '/knowledge', labelZh: '觉知百科', labelEn: 'Knowledge', icon: BookOpen },
    { href: '/mentors', labelZh: '导师智库', labelEn: 'Mentors', icon: Users },
    { href: '/courses', labelZh: '修习课程', labelEn: 'Courses', icon: GraduationCap },
    { href: '/pricing', labelZh: '会员方案', labelEn: 'Pricing', icon: CreditCard },
  ];

  const memberLinks = [
    { href: '/dashboard', labelZh: '灵性看板', labelEn: 'Dashboard', icon: LayoutDashboard },
    { href: '/ai-guide', labelZh: 'AI向导', labelEn: 'AI Guide', icon: Bot },
    { href: '/journeys', labelZh: '定制修习', labelEn: 'Journeys', icon: Route },
    { href: '/library', labelZh: '我的心藏', labelEn: 'Library', icon: FolderHeart },
    { href: '/history', labelZh: '占读档案', labelEn: 'History', icon: History },
    { href: '/wallet', labelZh: '积分钱包', labelEn: 'Wallet', icon: Wallet },
  ];

  if (pathname.startsWith('/investor') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="hidden md:block sticky top-0 z-30 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-[#EDE5D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sage-600 via-sage-500 to-lavender-400 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <span className="font-serif text-lg font-bold">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-tight text-charcoal-900 group-hover:text-sage-700 transition-colors">
                Soulscape
              </span>
              <span className="text-[10px] text-charcoal-400 tracking-wider -mt-1">
                {locale === 'zh' ? '数字身心觉知生态' : 'Digital Wellness Ecosystem'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-sage-100 text-sage-800'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100'
                  }`}
                >
                  <span>{locale === 'zh' ? link.labelZh : link.labelEn}</span>
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 px-1 py-0.2 text-[9px] bg-rose-500 text-white rounded-full leading-none font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Role Portals */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Portal Switch Link according to active demo role */}
            {role === 'mentor' && (
              <Link
                href="/mentor"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-lavender-100 text-lavender-700 hover:bg-lavender-200 transition-colors border border-lavender-200"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '导师工作台' : 'Mentor Portal'}</span>
              </Link>
            )}

            {role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-charcoal-800 text-ivory-100 hover:bg-charcoal-900 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sage-400" />
                <span>{locale === 'zh' ? '管理后台' : 'Admin Portal'}</span>
              </Link>
            )}

            {role === 'investor' && (
              <Link
                href="/investor"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-gold-100 text-gold-950 hover:bg-gold-200 transition-colors border border-gold-300"
              >
                <TrendingUp className="w-3.5 h-3.5 text-gold-700" />
                <span>{locale === 'zh' ? '投资人中心' : 'Investor Deck'}</span>
              </Link>
            )}

            {/* Always accessible Investor Quick Link */}
            {role !== 'investor' && (
              <Link
                href="/investor"
                className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs text-gold-800 hover:text-gold-900 bg-gold-50/80 hover:bg-gold-100/90 rounded-full border border-gold-200/80 transition-colors"
                title="Investor Deck & Business Model"
              >
                <TrendingUp className="w-3 h-3 text-gold-600" />
                <span>{locale === 'zh' ? '投资人路演' : 'Investor'}</span>
              </Link>
            )}

            {/* Dashboard / Member Area Button */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-sage-600 text-white hover:bg-sage-700 shadow-soft transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '会员中心' : 'Member App'}</span>
            </Link>

            {/* Quick User Avatar Badge */}
            <Link href="/profile" className="flex items-center gap-2 pl-1 group" title="My Profile">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-sage-300 group-hover:ring-2 group-hover:ring-sage-400 transition-all"
              />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/wallet"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-medium border border-gold-200"
            >
              🪙 <span>{credits}</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal-600 hover:bg-ivory-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ivory-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          {/* Member Area Shortcuts */}
          <div className="mb-4 p-3 rounded-2xl bg-ivory-100 border border-ivory-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                {locale === 'zh' ? '会员专区' : 'Member Portal'}
              </span>
              <span className="text-[11px] text-sage-600 font-medium">🪙 {credits} {locale === 'zh' ? '积分可用' : 'Credits'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {memberLinks.map(ml => (
                <Link
                  key={ml.href}
                  href={ml.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-colors ${
                    pathname === ml.href ? 'bg-sage-600 text-white' : 'bg-white text-charcoal-700 hover:bg-sage-50'
                  }`}
                >
                  <ml.icon className="w-4 h-4" />
                  <span className="text-[11px]">{locale === 'zh' ? ml.labelZh : ml.labelEn}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Portals according to role */}
          <div className="flex gap-2 mb-4">
            <Link
              href="/mentor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-lavender-50 border border-lavender-200 text-lavender-700 text-xs font-medium"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '导师工作台' : 'Mentor Hub'}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-charcoal-800 text-white text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sage-400" />
              <span>{locale === 'zh' ? '管理后台' : 'Admin Hub'}</span>
            </Link>
          </div>

          {/* Public Nav Links */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-charcoal-400 px-3 uppercase tracking-wider mb-1">
              {locale === 'zh' ? '公开探索区' : 'Public Discovery'}
            </div>
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active ? 'bg-sage-100 text-sage-900' : 'text-charcoal-700 hover:bg-ivory-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-charcoal-500" />
                    <span>{locale === 'zh' ? link.labelZh : link.labelEn}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
