'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ShieldCheck, UserCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { locale, switchRole, showToast } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('seeker@soulscape.app');

  const demoAccounts: { role: UserRole; labelZh: string; labelEn: string; email: string; icon: any; redirect: string }[] = [
    { role: 'member', labelZh: '普通会员 (林若尘)', labelEn: 'Member Persona', email: 'seeker@soulscape.app', icon: UserCheck, redirect: '/dashboard' },
    { role: 'mentor', labelZh: '认证导师 (苏念真)', labelEn: 'Mentor Persona', email: 'su.nianzhen@soulscape.app', icon: HeartHandshake, redirect: '/mentor' },
    { role: 'admin', labelZh: '管理合伙人 (Soulscape 合伙人)', labelEn: 'Admin Persona', email: 'admin@soulscape.app', icon: ShieldCheck, redirect: '/admin' }
  ];

  const handleQuickLogin = (role: UserRole, redirect: string) => {
    switchRole(role);
    showToast(
      locale === 'zh' ? '演示免密登录成功！' : 'Demo Login Successful!',
      locale === 'zh' ? '无需真实凭据，已切换至该角色专属视图。' : 'Switched to role dashboard without password.',
      'success'
    );
    router.push(redirect);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sage-600 text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-soft">
            S
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal-900">
            {locale === 'zh' ? '登录 Soulscape' : 'Log In to Soulscape'}
          </h1>
          <p className="text-xs text-charcoal-500 font-light">
            {locale === 'zh' ? '【演示环境免密体验】点击下方任意角色即可直接进入' : 'Investor Demo · Click any role below for instant access'}
          </p>
        </div>

        {/* 1-Click Role Switcher Quick Logins */}
        <div className="space-y-3">
          <span className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider block">
            {locale === 'zh' ? '一键演示身份登录' : 'Instant Demo Persona Login'}
          </span>
          {demoAccounts.map(acc => {
            const Icon = acc.icon;
            return (
              <button
                key={acc.role}
                onClick={() => handleQuickLogin(acc.role, acc.redirect)}
                className="w-full p-3.5 rounded-2xl border border-ivory-200 hover:border-sage-400 bg-ivory-50/60 hover:bg-sage-50/50 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-sage-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-charcoal-900 group-hover:text-sage-800">
                      {locale === 'zh' ? acc.labelZh : acc.labelEn}
                    </h3>
                    <p className="text-[10px] text-charcoal-400 font-mono mt-0.5">{acc.email}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-sage-600 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-ivory-200 text-center text-xs text-charcoal-500">
          <span>{locale === 'zh' ? '首次体验体验官？' : 'New to Soulscape? '}</span>
          <Link href="/register" className="text-sage-700 font-semibold hover:underline">
            {locale === 'zh' ? '注册并领取100积分' : 'Register for 100 credits'}
          </Link>
        </div>
      </div>
    </div>
  );
}
