'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  const { locale, switchRole, showToast } = useApp();
  const router = useRouter();

  const [name, setName] = useState('新体验官');
  const [email, setEmail] = useState('demo.visitor@soulscape.app');
  const [interests, setInterests] = useState<string[]>(['cards', 'music', 'chakras']);

  const interestList = [
    { id: 'cards', labelZh: '88张原初神谕', labelEn: '88 Cards' },
    { id: 'music', labelZh: '调频声波疗愈', labelEn: 'Sound Therapy' },
    { id: 'chakras', labelZh: '七脉轮身心调理', labelEn: '7 Chakras' },
    { id: 'mentors', labelZh: '导师1对1咨询', labelEn: 'Mentor Sessions' },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole('member');
    showToast(
      locale === 'zh' ? '注册成功！已赠送 100 觉知能量积分！' : 'Welcome! 100 Credits Granted!',
      locale === 'zh' ? '正在为您加载个性化身心看板…' : 'Loading personalized dashboard…',
      'success'
    );
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold">
            🪙 注册即赠 100 觉知能量积分
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal-900 mt-2">
            {locale === 'zh' ? '加入 Soulscape' : 'Create Free Account'}
          </h1>
          <p className="text-xs text-charcoal-500 font-light">
            {locale === 'zh' ? '演示模式无需短信验证码，提交即可生成体验会籍' : 'Investor Demo · Instant registration sandbox'}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
              {locale === 'zh' ? '你的称呼' : 'Display Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs bg-ivory-50/40 focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
              {locale === 'zh' ? '电子邮箱 (演示虚拟)' : 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 text-xs bg-ivory-50/40 focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
              {locale === 'zh' ? '选择你感兴趣的身心领域' : 'Initial Areas of Interest'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestList.map(item => {
                const selected = interests.includes(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      if (selected) setInterests(interests.filter(i => i !== item.id));
                      else setInterests([...interests, item.id]);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-colors ${
                      selected ? 'border-sage-500 bg-sage-50 text-sage-900' : 'border-ivory-200 bg-white text-charcoal-600'
                    }`}
                  >
                    <span>{locale === 'zh' ? item.labelZh : item.labelEn}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-sage-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center justify-center gap-2 mt-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{locale === 'zh' ? '完成注册并领取 100 积分' : 'Register & Claim 100 Credits'}</span>
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-charcoal-500">
          <span>{locale === 'zh' ? '已有演示账号？' : 'Already have access? '}</span>
          <Link href="/login" className="text-sage-700 font-semibold hover:underline">
            {locale === 'zh' ? '直接一键切换登录' : 'Switch demo role'}
          </Link>
        </div>
      </div>
    </div>
  );
}
