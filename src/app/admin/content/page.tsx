'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_ARTICLES } from '@/data/seedData';
import { FileText, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminContentPage() {
  const { locale } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '文献与专栏内容治理' : 'Content Moderation & Publishing'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '审核导师投稿文稿、身心前沿文献与科学合规性。' : 'Review essays, clinical guides, and compliance tags.'}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
          共 {SEED_ARTICLES.length} 篇核心知识库文献
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-500 font-semibold uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">文章标题</th>
                <th className="p-4">专栏流派</th>
                <th className="p-4">撰稿导师</th>
                <th className="p-4">阅读时长</th>
                <th className="p-4">全网阅读量</th>
                <th className="p-4 text-right">合规审核状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {SEED_ARTICLES.map(art => (
                <tr key={art.id} className="hover:bg-ivory-50/50 transition-colors">
                  <td className="p-4 max-w-xs">
                    <p className="font-bold text-charcoal-900 line-clamp-1">{art.titleZh}</p>
                    <span className="text-[10px] text-charcoal-400 font-mono">{art.publishDate}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-sage-50 text-sage-800 text-[10px] font-semibold border border-sage-200">
                      {art.categoryZh}
                    </span>
                  </td>
                  <td className="p-4 text-charcoal-700">{art.authorZh}</td>
                  <td className="p-4 font-mono text-charcoal-500">{art.readTimeMinutes} 分钟</td>
                  <td className="p-4 font-mono font-semibold text-charcoal-800">{art.views.toLocaleString()} 次</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      已过审
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
