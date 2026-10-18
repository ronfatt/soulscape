'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import Link from 'next/link';
import { User, Sparkles, ShieldCheck, HeartHandshake, UserCheck, RotateCcw, Check } from 'lucide-react';

export default function ProfilePage() {
  const { user, role, switchRole, locale, credits, resetDemoState, showToast } = useApp();
  const [displayName, setDisplayName] = useState(user.name);

  const rolesList: { role: UserRole; labelZh: string; labelEn: string; icon: any }[] = [
    { role: 'member', labelZh: '普通会员 (林若尘)', labelEn: 'Member Persona', icon: UserCheck },
    { role: 'mentor', labelZh: '认证导师 (苏念真)', labelEn: 'Mentor Persona', icon: HeartHandshake },
    { role: 'admin', labelZh: '系统合伙人 (Soulscape 合伙人)', labelEn: 'Admin Persona', icon: ShieldCheck }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft-xl flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-3xl object-cover border-2 border-sage-300 shadow-soft flex-shrink-0"
        />
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-semibold uppercase">
              {user.role.toUpperCase()}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 text-[10px] font-semibold uppercase">
              {user.membershipTier.toUpperCase()} TIER
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal-900">{user.name}</h1>
          <p className="text-xs text-charcoal-400 font-mono mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* Role Switcher in Profile */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
        <h3 className="font-serif font-bold text-charcoal-900 text-base">
          {locale === 'zh' ? '演示角色切换器' : 'Demo Role Switcher'}
        </h3>
        <p className="text-xs text-charcoal-500 font-light">
          {locale === 'zh' ? '在演示环境中，你可以随时无缝切换不同视角的权限界面。' : 'Switch between Member, Mentor, and Admin interfaces.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {rolesList.map(r => {
            const Icon = r.icon;
            const isCurrent = role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => switchRole(r.role)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isCurrent ? 'border-sage-500 bg-sage-50 text-sage-900 ring-2 ring-sage-200' : 'border-ivory-200 bg-ivory-50/50 hover:bg-white text-charcoal-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-sage-600" />
                  {isCurrent && <Check className="w-4 h-4 text-sage-600" />}
                </div>
                <span className="text-xs font-semibold">{locale === 'zh' ? r.labelZh : r.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset State & Data Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
        <h3 className="font-serif font-bold text-charcoal-900 text-base">
          {locale === 'zh' ? '演示数据与存储管理' : 'Local Storage & Demo State'}
        </h3>
        <p className="text-xs text-charcoal-500 leading-relaxed font-light">
          {locale === 'zh'
            ? '所有你在抽牌、写日记、预约导师与充值积分时产生的数据均保存在当前浏览器的 localStorage 中。点击下方按钮可一键恢复初始演示环境（100积分初始状态）。'
            : 'All data is stored locally in your browser. You can reset to seed demo state at any time.'}
        </p>

        <div className="pt-2">
          <button
            onClick={resetDemoState}
            className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{locale === 'zh' ? '恢复默认演示数据 (重置为100积分)' : 'Reset Demo State (100 Credits)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
