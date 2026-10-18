'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Share2, Copy, Check, QrCode, Sparkles } from 'lucide-react';

export default function MentorShareLinksPage() {
  const { locale, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const referralUrl = 'https://soulscape.app/invite/mentor-su-928';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    showToast(locale === 'zh' ? '专属推广链接已复制到剪贴板！' : 'Referral link copied!', undefined, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '专属推广链接与学员邀请' : 'Referral Links & Mastermind Share'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '通过你的专属链接邀请的学员，首单充值与课程订阅可享有 20% 终身长效分润分成。' : 'Earn 20% commission on any student top-ups or course subscriptions.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-6">
        <div>
          <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
            你的专属导师引流链接
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 px-4 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-xs font-mono text-charcoal-700 select-all"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制' : '复制链接'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 bg-white border border-ivory-300 rounded-2xl p-2 flex items-center justify-center shadow-xs flex-shrink-0">
            <QrCode className="w-20 h-20 text-charcoal-800" />
          </div>
          <div className="space-y-1.5 text-xs text-charcoal-600">
            <h4 className="font-serif font-bold text-charcoal-900 text-sm">
              微信 / 小红书 / 线下扫码立送 100 积分
            </h4>
            <p className="font-light leading-relaxed">
              可直接将此二维码保存并置入导师公众号、线下工作坊海报或名片。扫码进入自动绑定导师终身学员关系。
            </p>
            <button
              onClick={() => showToast(locale === 'zh' ? '二维码海报保存模拟' : 'Poster saved', undefined, 'info')}
              className="text-sage-700 font-semibold hover:underline text-xs inline-block pt-1"
            >
              下载高清打印海报 (PDF/PNG) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
