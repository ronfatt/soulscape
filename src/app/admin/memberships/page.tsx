'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CreditCard, Edit3, Check, Coins, Sparkles, X } from 'lucide-react';

export default function AdminMembershipsPage() {
  const { locale, membershipTiers, creditPacks, updateTierPricing, updateCreditPack } = useApp();

  // Tier Edit State
  const [editingTier, setEditingTier] = useState<any | null>(null);
  const [tierMonthlyPrice, setTierMonthlyPrice] = useState<number>(0);
  const [tierAnnualPrice, setTierAnnualPrice] = useState<number>(0);

  // Credit Pack Edit State
  const [editingPack, setEditingPack] = useState<any | null>(null);
  const [packPrice, setPackPrice] = useState<number>(0);
  const [packCredits, setPackCredits] = useState<number>(0);

  const handleOpenTierEdit = (tier: any) => {
    setEditingTier(tier);
    setTierMonthlyPrice(tier.priceMonthlyRmb);
    setTierAnnualPrice(tier.priceAnnualRmb);
  };

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTier) return;
    updateTierPricing(editingTier.id, tierMonthlyPrice, tierAnnualPrice);
    setEditingTier(null);
  };

  const handleOpenPackEdit = (pack: any) => {
    setEditingPack(pack);
    setPackPrice(pack.priceRmb);
    setPackCredits(pack.credits);
  };

  const handleSavePack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPack) return;
    updateCreditPack(editingPack.id, packPrice, packCredits);
    setEditingPack(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '会籍权益、定价策略与充值包配置' : 'Membership Plans & Pricing Strategy'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh'
            ? '配置各梯队月费、年费折扣率与每月积分配额。修改后将即刻全域同步至前台定购页与钱包。'
            : 'Configure subscription rates and credit packs. Changes update live across the app.'}
        </p>
      </div>

      {/* Subscription Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipTiers.map(tier => (
          <div key={tier.id} className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-base text-charcoal-900">{tier.nameZh}</h3>
                <span className="text-[10px] bg-ivory-200 text-charcoal-700 px-2 py-0.5 rounded-full font-semibold uppercase">
                  {tier.id}
                </span>
              </div>

              <div className="space-y-1 mb-4 text-xs text-charcoal-600">
                <p>月付标价：<strong className="text-charcoal-900 text-sm">¥{tier.priceMonthlyRmb}</strong> / 月</p>
                <p>年付标价：<strong className="text-charcoal-900 text-sm">¥{tier.priceAnnualRmb}</strong> / 年</p>
                <p>月度配额：<strong className="text-sage-800 text-sm">🪙 {tier.creditsPerMonth}</strong> 积分</p>
              </div>

              <div className="pt-3 border-t border-ivory-200 text-xs space-y-1 text-charcoal-500">
                {tier.featuresZh.slice(0, 3).map((f, i) => (
                  <p key={i} className="line-clamp-1">• {f}</p>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-ivory-200 mt-4 flex justify-end">
              <button
                onClick={() => handleOpenTierEdit(tier)}
                className="text-xs font-semibold text-sage-700 hover:text-sage-900 flex items-center gap-1 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{locale === 'zh' ? '调整定价规则' : 'Edit Pricing'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Credit packs config */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-charcoal-900 text-base flex items-center gap-2">
            <Coins className="w-4 h-4 text-gold-500" />
            <span>加购能量包规格配置 (Credit Packs)</span>
          </h3>
          <span className="text-[11px] text-charcoal-400">点击卡片可即时微调标价与积分配额</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {creditPacks.map(pack => (
            <div
              key={pack.id}
              onClick={() => handleOpenPackEdit(pack)}
              className="p-4 rounded-2xl bg-ivory-50/70 hover:bg-white border border-ivory-200 hover:border-sage-300 shadow-2xs hover:shadow-soft transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-charcoal-900 block">{pack.labelZh}</span>
                <span className="text-[11px] text-charcoal-500">定价：¥{pack.priceRmb}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-sage-800 block">+{pack.credits} 积分</span>
                <span className="text-[10px] text-sage-600 hover:underline">编辑 ✎</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Tier Modal */}
      {editingTier && (
        <div
          onClick={() => setEditingTier(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-ivory-300 shadow-soft-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sage-600" />
                <h3 className="font-serif font-bold text-charcoal-900 text-base">
                  调整「{editingTier.nameZh}」标价
                </h3>
              </div>
              <button onClick={() => setEditingTier(null)} className="text-charcoal-400 hover:text-charcoal-700">✕</button>
            </div>

            <form onSubmit={handleSaveTier} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">
                  连续包月价格 (¥ RMB)
                </label>
                <input
                  type="number"
                  min="0"
                  value={tierMonthlyPrice}
                  onChange={(e) => setTierMonthlyPrice(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">
                  年度订阅价格 (¥ RMB)
                </label>
                <input
                  type="number"
                  min="0"
                  value={tierAnnualPrice}
                  onChange={(e) => setTierAnnualPrice(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTier(null)}
                  className="px-4 py-2 text-charcoal-500 hover:text-charcoal-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold shadow-soft"
                >
                  保存并全网同步
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Credit Pack Modal */}
      {editingPack && (
        <div
          onClick={() => setEditingPack(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-ivory-300 shadow-soft-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-gold-500" />
                <h3 className="font-serif font-bold text-charcoal-900 text-base">
                  配置加购包「{editingPack.labelZh}」
                </h3>
              </div>
              <button onClick={() => setEditingPack(null)} className="text-charcoal-400 hover:text-charcoal-700">✕</button>
            </div>

            <form onSubmit={handleSavePack} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">
                  售价 (¥ RMB)
                </label>
                <input
                  type="number"
                  min="1"
                  value={packPrice}
                  onChange={(e) => setPackPrice(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 mb-1">
                  包含能量积分数量
                </label>
                <input
                  type="number"
                  min="10"
                  value={packCredits}
                  onChange={(e) => setPackCredits(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPack(null)}
                  className="px-4 py-2 text-charcoal-500 hover:text-charcoal-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold shadow-soft"
                >
                  保存并生效
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
