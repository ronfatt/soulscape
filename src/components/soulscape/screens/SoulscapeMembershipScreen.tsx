'use client';

import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeButton from '../SoulscapeButton';
import SoulscapeTabs from '../SoulscapeTabs';

export const SoulscapeMembershipScreen: React.FC = () => {
  const { locale, addCredits, user } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);

  const isZh = locale === 'zh';

  const billingTabs = [
    { id: 'monthly', label: isZh ? '月度訂閱' : 'Monthly' },
    { id: 'yearly', label: isZh ? '年度立省 33%' : 'Yearly', badge: 'Save 33%' },
  ];

  const handleSubscribe = (tierName: string, creditsBonus: number) => {
    addCredits(
      creditsBonus,
      `升級 ${tierName} 會員贈送積分`,
      `Upgraded to ${tierName} bonus credits`,
      billingCycle === 'monthly' ? 39 : 299
    );
    setSubscribedPlan(tierName);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 01. Header matching Screen 07 */}
      <SoulscapeHeader
        mode="subpage"
        title="Soulscape Membership"
        subtitle={isZh ? '開啟更深邃的覺知、連結與靈魂成長之旅' : 'Unlock a deeper journey of clarity, connection and growth.'}
      />

      <div className="px-4 sm:px-6 space-y-5">
        {/* 02. Billing Cycle Segmented Toggle */}
        <SoulscapeTabs
          variant="segmented"
          tabs={billingTabs}
          activeTab={billingCycle}
          onChange={(id) => setBillingCycle(id as 'monthly' | 'yearly')}
          className="max-w-xs mx-auto"
        />

        {/* 03. Plan 1: Essential */}
        <div className="p-5 sm:p-6 rounded-[26px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_24px_rgba(51,45,42,0.04)] space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs text-[#736B66] font-medium uppercase tracking-wider block">
                {isZh ? '基礎入門方案' : 'Essential Plan'}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#332D2A] mt-0.5">
                Essential
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif font-bold text-2xl text-[#332D2A]">
                {billingCycle === 'monthly' ? 'RM 39' : 'RM 299'}
              </span>
              <span className="text-xs text-[#736B66] block">
                {billingCycle === 'monthly' ? (isZh ? '/ 月' : '/ month') : (isZh ? '/ 年' : '/ year')}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-[#4B423D]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#899F8B] shrink-0" />
              <span>100 Soul Credits / {isZh ? '月度發放' : 'month'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#899F8B] shrink-0" />
              <span>{isZh ? '基礎 432Hz 冥想音頻庫無限制暢聽' : 'Access to basic meditations'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#899F8B] shrink-0" />
              <span>{isZh ? 'AI 覺知伴讀向導日常對話' : 'AI chat guidance'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#899F8B] shrink-0" />
              <span>{isZh ? '個人修習手札與歷史占讀檔案庫' : 'Personal journal & history'}</span>
            </li>
          </ul>

          <SoulscapeButton
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => handleSubscribe('Essential', 100)}
          >
            {subscribedPlan === 'Essential' 
              ? (isZh ? '✓ 當前會員方案' : 'Current Plan') 
              : (isZh ? '立即開通 Essential' : 'Get Started')}
          </SoulscapeButton>
        </div>

        {/* 04. Plan 2: Soul Plus (Featured / Most Popular with Gold Rim) */}
        <div className="relative p-5 sm:p-6 rounded-[26px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F4ECE0] border-2 border-[#B79A63] shadow-[0_8px_32px_rgba(183,154,99,0.15)] space-y-4">
          {/* Most Popular Badge */}
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#9E814D] to-[#B79A63] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
            {isZh ? '最受歡迎 · MOST POPULAR' : 'Most Popular'}
          </div>

          <div className="flex items-start justify-between pt-1">
            <div>
              <span className="text-xs text-[#B79A63] font-semibold uppercase tracking-wider block">
                {isZh ? '全息深度成長方案' : 'Premium Growth'}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#332D2A] mt-0.5">
                Soul Plus
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif font-bold text-2xl text-[#7B5E32]">
                {billingCycle === 'monthly' ? 'RM 69' : 'RM 599'}
              </span>
              <span className="text-xs text-[#736B66] block">
                {billingCycle === 'monthly' ? (isZh ? '/ 月' : '/ month') : (isZh ? '/ 年' : '/ year')}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-[#332D2A] font-medium">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B79A63] shrink-0" />
              <span>300 Soul Credits / {isZh ? '月度發放 (可轉移)' : 'month'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B79A63] shrink-0" />
              <span>{isZh ? '全套七脈輪高階冥想與大師專題系列' : 'Premium meditations & series'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B79A63] shrink-0" />
              <span>{isZh ? '無限制 88 枚神諭三牌深度陣占讀' : 'AI card readings (unlimited)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B79A63] shrink-0" />
              <span>{isZh ? '嚴選導師 1對1 個案諮詢專屬 85 折' : 'Discount on mentor sessions'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B79A63] shrink-0" />
              <span>{isZh ? '專屬會員私享沙龍與靜修社群優先權' : 'Exclusive community access'}</span>
            </li>
          </ul>

          <SoulscapeButton
            variant="gold"
            size="lg"
            fullWidth
            onClick={() => handleSubscribe('Soul Plus', 300)}
            className="shadow-[0_6px_20px_rgba(183,154,99,0.35)]"
          >
            {subscribedPlan === 'Soul Plus'
              ? (isZh ? '✓ 已啟動 7 天免費試用' : 'Trial Active')
              : (isZh ? '開啟 7 天免費試用' : 'Start 7-Day Free Trial')}
          </SoulscapeButton>

          <p className="text-[10px] text-center text-[#736B66]">
            {isZh ? '隨時可退訂 · 模擬沙盒支付流程' : 'Cancel anytime · Simulated demo checkout'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeMembershipScreen;
