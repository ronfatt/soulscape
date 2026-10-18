'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import Link from 'next/link';
import { History, Sparkles, BookOpen, Clock, Calendar, Search } from 'lucide-react';

export default function HistoryPage() {
  const { locale, readings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReadings = readings.filter(r =>
    r.questionZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.aiSynthesisZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.journalNotes && r.journalNotes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-3">
          <History className="w-3.5 h-3.5 text-sage-600" />
          <span>{locale === 'zh' ? '占读档案 · 潜意识印记' : 'Sacred Reading Archives'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
          {locale === 'zh' ? '回溯你走过的每一次心念沉淀' : 'Your Contemplative Chronicles'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 font-light">
          {locale === 'zh' ? '每一次抽牌与反思手记均在此永久沉淀，见证你的意识蜕变。' : 'Preserved records of your inquiries, draws, and personal journals.'}
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={locale === 'zh' ? '搜索过往提问或手记心得...' : 'Search past inquiries or journals...'}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-ivory-300 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
        />
      </div>

      {/* Readings Feed */}
      <div className="space-y-8">
        {filteredReadings.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400 text-xs">
            {locale === 'zh' ? '未找到匹配的占读档案' : 'No matching readings.'}
          </div>
        ) : (
          filteredReadings.map((reading) => (
            <div
              key={reading.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft hover:shadow-soft-lg transition-all space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ivory-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-semibold">
                    {reading.type === 'one_card' ? (locale === 'zh' ? '今日单牌' : 'Single Card') : (locale === 'zh' ? '深度三牌阵' : '3-Card Spread')}
                  </span>
                  <span className="font-serif font-bold text-charcoal-900 text-base">
                    “{reading.questionZh}”
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{reading.timestamp}</span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="flex flex-wrap items-center justify-center gap-6 py-2">
                {reading.cards.map((c, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2">
                    <span className="text-[10px] font-medium text-charcoal-500 bg-ivory-100 px-2 py-0.5 rounded-md">
                      {c.positionZh}
                    </span>
                    <OracleCardVisual card={c.card} size="sm" interactive={false} />
                    <span className="text-xs font-semibold text-charcoal-800">
                      {locale === 'zh' ? c.card.nameZh : c.card.nameEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* AI Synthesis */}
              <div className="p-4 rounded-2xl bg-ivory-50/70 border border-ivory-200 text-xs text-charcoal-700 leading-relaxed font-light whitespace-pre-line">
                {reading.aiSynthesisZh}
              </div>

              {/* Journal Notes if present */}
              {reading.journalNotes && (
                <div className="p-4 rounded-2xl bg-sage-50/60 border border-sage-200 text-xs text-sage-900 leading-relaxed">
                  <strong className="block mb-1 font-semibold">{locale === 'zh' ? '✍️ 我的体悟手记：' : '✍️ My Reflection Notes:'}</strong>
                  {reading.journalNotes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
