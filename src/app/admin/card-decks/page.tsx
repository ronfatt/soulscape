'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_CARD_DECK, SEED_ORACLE_CARDS } from '@/data/seedData';
import { Layers, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminCardDecksPage() {
  const { locale } = useApp();

  const realmsStats = [
    { name: '原初扎根界 (海底轮)', count: 11, color: 'text-red-700 bg-red-50' },
    { name: '潮汐流动界 (本我轮)', count: 11, color: 'text-orange-700 bg-orange-50' },
    { name: '光辉烈焰界 (太阳轮)', count: 11, color: 'text-amber-700 bg-amber-50' },
    { name: '翡翠慈悲界 (心轮)', count: 11, color: 'text-emerald-700 bg-emerald-50' },
    { name: '蔚蓝鸣响界 (喉轮)', count: 11, color: 'text-teal-700 bg-teal-50' },
    { name: '星夜灵视界 (眉心轮)', count: 11, color: 'text-indigo-700 bg-indigo-50' },
    { name: '宇光圆融界 (顶轮)', count: 22, color: 'text-purple-700 bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '原初神谕卡牌组资产与版权治理' : 'Sacred Oracle Decks Governance'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '管理官方 88 枚原创神谕卡原型库、脉轮映射与版权归属。' : 'Manage 88 sacred cards archetypal taxonomy and IP protection.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
          <div>
            <span className="text-xs text-sage-700 font-semibold uppercase">{SEED_CARD_DECK.version}</span>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-0.5">
              {SEED_CARD_DECK.nameZh}
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">{SEED_CARD_DECK.descriptionZh}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
            官方原创全套 (88/88)
          </span>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-3">
            七大脉轮神圣界域分布分布图谱
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {realmsStats.map((r, i) => (
              <div key={i} className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-charcoal-900 block">{r.name}</span>
                  <span className="text-[10px] text-charcoal-400 mt-0.5 block">原创神谕卡</span>
                </div>
                <span className="font-serif font-bold text-lg text-sage-800">{r.count} 张</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-sage-50/70 border border-sage-200 text-xs text-sage-900 leading-relaxed font-light">
          🛡️ <strong>版权与原创声明：</strong>
          本牌组为 Soulscape 团队独家原创的 88 枚神圣种子系统，未挪用任何商业塔罗牌或既有版权读物，符合知识产权法规标准。
        </div>
      </div>
    </div>
  );
}
