'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_ARTICLES } from '@/data/seedData';
import { KnowledgeArticle } from '@/types';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Heart, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Bookmark
} from 'lucide-react';

export default function KnowledgePage() {
  const { locale, favorites, toggleFavorite } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

  const categories = [
    { id: 'all', labelZh: '全部主题', labelEn: 'All Topics' },
    { id: '声波疗愈', labelZh: '声波疗愈', labelEn: 'Sound Healing' },
    { id: '脉轮能量', labelZh: '脉轮能量', labelEn: 'Chakra Biofield' },
    { id: '心灵哲学', labelZh: '心灵哲学', labelEn: 'Depth Psychology' },
    { id: '身心科学', labelZh: '身心科学', labelEn: 'Neurobiology' },
    { id: '书写疗愈', labelZh: '书写疗愈', labelEn: 'Journaling' },
    { id: '生活禅意', labelZh: '生活禅意', labelEn: 'Zen Living' },
  ];

  const filteredArticles = SEED_ARTICLES.filter(art => {
    const matchesSearch =
      art.titleZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerptZh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.tagsZh.some(t => t.includes(searchTerm));

    const matchesCat = selectedCategory === 'all' || art.categoryZh === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-3">
          <BookOpen className="w-3.5 h-3.5 text-sage-600" />
          <span>{locale === 'zh' ? '觉知百科 · 身心前沿文献' : 'Consciousness Knowledge Base'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
          {locale === 'zh' ? '严谨、通透的心灵科技指南' : 'Evidence-Based Wellness Wisdom'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 font-light">
          {locale === 'zh'
            ? '拒绝虚妄玄学，连接认知神经科学、声波频率生物学与荣格深度心理学。'
            : 'Bridging contemplative wisdom and cognitive neuroscience without pseudoscientific dogmatism.'}
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-2xl p-4 border border-ivory-300 shadow-sm mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === 'zh' ? '搜索文章、关键词（例如：迷走神经、528Hz、荣格）...' : 'Search articles or topics...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-ivory-50/70 border border-ivory-200 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>
          <span className="text-xs text-charcoal-400 font-mono">
            {filteredArticles.length} {locale === 'zh' ? '篇精选文章' : 'articles'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-ivory-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors font-medium ${
                selectedCategory === cat.id
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
              }`}
            >
              {locale === 'zh' ? cat.labelZh : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isFav = favorites.articles.includes(article.id);
          return (
            <article
              key={article.id}
              className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-soft hover:shadow-soft-lg transition-all card-hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-sage-50 text-sage-800 text-[10px] font-semibold border border-sage-200">
                    {locale === 'zh' ? article.categoryZh : article.categoryEn}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-charcoal-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMinutes} {locale === 'zh' ? '分钟阅读' : 'min'}</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-charcoal-900 text-base leading-snug mb-2 line-clamp-2">
                  {locale === 'zh' ? article.titleZh : article.titleEn}
                </h3>

                <p className="text-xs text-charcoal-500 leading-relaxed font-light line-clamp-3 mb-4">
                  {locale === 'zh' ? article.excerptZh : article.excerptEn}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(locale === 'zh' ? article.tagsZh : article.tagsEn).slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-charcoal-500 bg-ivory-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
                <span className="text-[11px] text-charcoal-400">
                  {locale === 'zh' ? article.authorZh : article.authorEn}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite('articles', article.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFav ? 'text-rose-500' : 'text-charcoal-300 hover:text-charcoal-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => setActiveArticle(article)}
                    className="px-3 py-1.5 rounded-xl bg-sage-50 hover:bg-sage-100 text-sage-800 text-xs font-semibold border border-sage-200 transition-colors flex items-center gap-1"
                  >
                    <span>{locale === 'zh' ? '全文阅读' : 'Read Article'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-10 max-w-3xl w-full border border-ivory-300 shadow-soft-xl max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-4">
              <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
                {locale === 'zh' ? activeArticle.categoryZh : activeArticle.categoryEn}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-charcoal-400 hover:bg-ivory-100 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 leading-tight">
                {locale === 'zh' ? activeArticle.titleZh : activeArticle.titleEn}
              </h2>
              <div className="flex items-center gap-4 text-xs text-charcoal-500 mt-2">
                <span>{locale === 'zh' ? activeArticle.authorZh : activeArticle.authorEn}</span>
                <span>•</span>
                <span>{activeArticle.publishDate}</span>
                <span>•</span>
                <span>{activeArticle.readTimeMinutes} {locale === 'zh' ? '分钟' : 'mins'}</span>
              </div>
            </div>

            <div className="prose prose-stone max-w-none text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light whitespace-pre-line bg-ivory-50/50 p-6 rounded-2xl border border-ivory-200">
              {locale === 'zh' ? activeArticle.contentZh : activeArticle.contentZh}
            </div>

            <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
              <button
                onClick={() => toggleFavorite('articles', activeArticle.id)}
                className="flex items-center gap-1.5 text-xs text-charcoal-600 hover:text-rose-600"
              >
                <Heart className={`w-4 h-4 ${favorites.articles.includes(activeArticle.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{favorites.articles.includes(activeArticle.id) ? '已收藏' : '加入心藏'}</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft"
              >
                {locale === 'zh' ? '完成阅读' : 'Close Reader'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
