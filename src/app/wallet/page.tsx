'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DEMO_CREDIT_PACKS } from '@/data/seedData';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeHeader from '@/components/soulscape/SoulscapeHeader';
import SoulscapeButton from '@/components/soulscape/SoulscapeButton';
import { 
  Plus, 
  Sparkles, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck 
} from 'lucide-react';

export default function WalletPage() {
  const { locale, credits, transactions, addCredits, resetDemoState } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const isZh = locale === 'zh';

  const filteredTx = transactions.filter(tx => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  const handleQuickAdd = (creditsAmount: number, priceMyr: number, packName: string) => {
    addCredits(
      creditsAmount,
      `快捷購買 ${packName} (模擬充值)`,
      `Quick mock purchase of ${packName}`,
      priceMyr
    );
  };

  return (
    <SoulscapeMobileShell activeTab="home">
      <div className="space-y-4 animate-fade-in">
        {/* Header */}
        <SoulscapeHeader
          mode="subpage"
          title={isZh ? '能量錢包與明細' : 'Soul Credits Wallet'}
          subtitle={isZh ? '點卡充值 · 扣減記錄 · 審計流水' : 'Balance, top-up & ledger'}
        />

        <div className="px-4 sm:px-6 space-y-4">
          {/* Main Balance Card */}
          <div className="p-5 sm:p-6 rounded-[26px] bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5EEFB] border border-[#E8DDF5] shadow-[0_4px_24px_rgba(183,154,99,0.08)]">
            <div className="flex items-center justify-between text-xs text-[#736B66] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#B79A63]">
                Soul Credits Balance
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EDE5D9] text-[10px]">
                {isZh ? '沙盒演示' : 'Sandbox Demo'}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-4xl text-[#332D2A]">
                {credits}
              </span>
              <span className="text-xs text-[#736B66]">
                {isZh ? '可用積分點數' : 'Credits'}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EDE5D9]/70 flex items-center justify-between text-xs text-[#736B66]">
              <span>{isZh ? '單次三牌陣: 20點' : '3-Card Spread: 20 pts'}</span>
              <span>{isZh ? 'AI向導對話: 10點' : 'AI Guide: 10 pts'}</span>
            </div>
          </div>

          {/* Quick Top-Up Packs Row */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#332D2A] mb-2.5">
              {isZh ? '能量點卡加購包' : 'Top-Up Credit Packs'}
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {[
                { name: '輕靈啟程包', nameEn: 'Starter', credits: 50, price: 18 },
                { name: '覺知調頻包', nameEn: 'Growth', credits: 120, price: 38, popular: true },
                { name: '靈魂豐盛包', nameEn: 'Abundance', credits: 350, price: 98 },
              ].map((pack, idx) => (
                <div
                  key={idx}
                  onClick={() => handleQuickAdd(pack.credits, pack.price, pack.name)}
                  className={`relative p-3 rounded-2xl bg-[#FFFDF9] border cursor-pointer hover:border-[#B79A63] transition-all text-center flex flex-col justify-between active:scale-95 shadow-xs ${
                    pack.popular ? 'border-[#B79A63] ring-1 ring-[#B79A63]/30 bg-[#FAF7F2]' : 'border-[#EDE5D9]'
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-[#B79A63] text-white text-[8px] font-bold">
                      HOT
                    </span>
                  )}
                  <div>
                    <span className="font-serif font-bold text-lg text-[#332D2A] block">
                      +{pack.credits}
                    </span>
                    <span className="text-[10px] text-[#736B66] block">
                      {isZh ? pack.name : pack.nameEn}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-[#7B5E32] bg-[#FFFDF9] py-1 rounded-xl border border-[#EDE5D9]">
                    RM {pack.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Ledger */}
          <div className="pt-2">
            <h4 className="font-serif font-bold text-sm text-[#332D2A] mb-2.5 flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#B79A63]" />
              <span>{isZh ? '能量收支流水帳本' : 'Transaction History'}</span>
            </h4>

            <div className="space-y-2">
              {filteredTx.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#EDE5D9]/80 shadow-xs flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                      tx.amountCredits > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-[#FAF7F2] text-[#736B66]'
                    }`}>
                      {tx.amountCredits > 0 ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="font-medium text-[#332D2A] block truncate max-w-[170px]">
                        {isZh ? tx.descriptionZh : tx.descriptionEn}
                      </span>
                      <span className="text-[10px] text-[#AFA8A3] font-mono">
                        {tx.timestamp.split('T')[0]}
                      </span>
                    </div>
                  </div>

                  <span className={`font-serif font-bold ${
                    tx.amountCredits > 0 ? 'text-emerald-700' : 'text-[#332D2A]'
                  }`}>
                    {tx.amountCredits > 0 ? `+${tx.amountCredits}` : tx.amountCredits}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SoulscapeMobileShell>
  );
}
