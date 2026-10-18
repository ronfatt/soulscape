'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { SEED_ARTICLES } from '@/data/seedData';
import { GuidedJourney } from '@/types';
import { 
  FileText, 
  Plus, 
  CheckCircle2, 
  Eye, 
  Clock, 
  Route, 
  Sparkles, 
  Music, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

export default function MentorContentPage() {
  const { locale, showToast, guidedJourneys, addGuidedJourney } = useApp();
  const [activeTab, setActiveTab] = useState<'articles' | 'journeys'>('articles');
  const [articles, setArticles] = useState(SEED_ARTICLES.slice(0, 3));
  
  // Article Editor Modal State
  const [editorOpen, setEditorOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('声波疗愈');
  const [newContent, setNewContent] = useState('');

  // Journey Creator Modal State
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);
  const [journeyTitleZh, setJourneyTitleZh] = useState('');
  const [journeyTitleEn, setJourneyTitleEn] = useState('');
  const [journeySubtitleZh, setJourneySubtitleZh] = useState('');
  const [journeyCategory, setJourneyCategory] = useState<'morning' | 'evening' | 'deep_work' | 'healing'>('healing');

  const handleCreateJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journeyTitleZh.trim()) return;

    const newJourney: GuidedJourney = {
      id: `journey-${Date.now()}`,
      titleZh: journeyTitleZh,
      titleEn: journeyTitleEn || journeyTitleZh,
      descriptionZh: journeySubtitleZh || '融合双耳节拍声波、神谕原型深层共鸣与情绪觉察手记的沉浸式身心修习。',
      descriptionEn: 'An immersive somatic practice fusing binaural frequencies and archetypal reflection.',
      durationEstimateZh: '23 分钟',
      durationEstimateEn: '23 mins',
      theme: '心轮与情绪疗愈',
      chakra: 'heart',
      badgeZh: '导师特制',
      badgeEn: 'Mentor Exclusive',
      steps: [
        {
          stepIndex: 1,
          type: 'intro',
          titleZh: '锚定当下的呼吸觉察',
          titleEn: 'Grounding Breathwork',
          descriptionZh: '放松双肩与下颌，深长呼气3次，感受重力将身体安稳承托。',
          durationSeconds: 180
        },
        {
          stepIndex: 2,
          type: 'audio',
          titleZh: '528Hz 修复共振声波冥想',
          titleEn: '528Hz Restorative Meditation',
          descriptionZh: '佩戴耳机，沉浸于纯净的转化频率中，任由声波涤荡身心微细张力。',
          durationSeconds: 600,
          audioTrackId: 'music-1'
        },
        {
          stepIndex: 3,
          type: 'card',
          titleZh: '静心抽取一张今日原型镜映卡',
          titleEn: 'Draw Archetypal Oracle Card',
          descriptionZh: '在宁静的心湖中揭开神谕之镜，观照浮现的课题与内在指引。',
          durationSeconds: 300
        },
        {
          stepIndex: 4,
          type: 'journal',
          titleZh: '觉知沉淀与整合手记',
          titleEn: 'Integrative Journaling',
          descriptionZh: '记录此刻最触动你的身体感受或直觉领悟，为今日的心灵旅程画上句点。',
          durationSeconds: 300
        }
      ]
    };

    addGuidedJourney(newJourney);
    setJourneyModalOpen(false);
    setJourneyTitleZh('');
    setJourneyTitleEn('');
    setJourneySubtitleZh('');
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArt = {
      id: `art-mentor-${Date.now()}`,
      titleZh: newTitle,
      titleEn: newTitle,
      excerptZh: newContent.slice(0, 80) + '...',
      excerptEn: newContent.slice(0, 80) + '...',
      contentZh: newContent,
      contentEn: newContent,
      categoryZh: newCategory,
      categoryEn: newCategory,
      readTimeMinutes: 5,
      authorZh: '苏念真 老师',
      authorEn: 'Master Nianzhen Su',
      publishDate: new Date().toISOString().substring(0, 10),
      tagsZh: ['导师专栏', newCategory],
      tagsEn: ['Mentor Column'],
      views: 12
    };

    setArticles([newArt, ...articles]);
    setEditorOpen(false);
    setNewTitle('');
    setNewContent('');
    showToast(locale === 'zh' ? '文章已提交审核并即时发布！' : 'Article published!', undefined, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '导师内容与修行流程创作' : 'Mentor Content & Journeys'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '发布你的身心实践心得，或为全平台学员编排多步骤引导修行旅程。' : 'Publish essays or design multi-step guided journeys for seekers.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-ivory-100 border border-ivory-200">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'articles' ? 'bg-white text-charcoal-900 shadow-xs' : 'text-charcoal-600'
              }`}
            >
              {locale === 'zh' ? '专栏文章' : 'Articles'}
            </button>
            <button
              onClick={() => setActiveTab('journeys')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                activeTab === 'journeys' ? 'bg-white text-charcoal-900 shadow-xs' : 'text-charcoal-600'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '修行之旅' : 'Guided Journeys'}</span>
            </button>
          </div>

          {activeTab === 'articles' ? (
            <button
              onClick={() => setEditorOpen(true)}
              className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{locale === 'zh' ? '撰写文章' : 'New Article'}</span>
            </button>
          ) : (
            <button
              onClick={() => setJourneyModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{locale === 'zh' ? '创建修行之旅' : 'Create Journey'}</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'articles' ? (
        <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden divide-y divide-ivory-200">
          {articles.map((art) => (
            <div key={art.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-sage-50 text-sage-800 text-[10px] font-semibold border border-sage-200">
                    {art.categoryZh}
                  </span>
                  <span className="text-[10px] text-charcoal-400 font-mono">{art.publishDate}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">已上线</span>
                </div>
                <h3 className="font-serif font-bold text-charcoal-900 text-sm">{art.titleZh}</h3>
                <p className="text-xs text-charcoal-500 mt-1 line-clamp-1">{art.excerptZh}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-charcoal-500 flex-shrink-0">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{art.views.toLocaleString()}</span>
                </span>
                <span className="text-sage-700 font-semibold cursor-pointer hover:underline">编辑文稿</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guidedJourneys.map((jny) => (
              <div key={jny.id} className="bg-white rounded-3xl p-5 border border-ivory-300 shadow-soft space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-semibold uppercase tracking-wider">
                    {jny.chakra.toUpperCase()} · {jny.steps.length} 步骤
                  </span>
                  <span className="text-[10px] text-charcoal-400 font-mono">ID: {jny.id}</span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-charcoal-900 text-base">
                    {locale === 'zh' ? jny.titleZh : jny.titleEn}
                  </h3>
                  <p className="text-xs text-charcoal-500 font-light mt-1 line-clamp-2">
                    {locale === 'zh' ? jny.descriptionZh : jny.descriptionEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-ivory-200 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-400">
                    {jny.steps.map(s => s.type === 'intro' ? '🧘' : s.type === 'audio' ? '🎵' : s.type === 'card' ? '🎴' : '✍️').join(' → ')}
                  </span>
                  <Link
                    href="/journeys"
                    className="text-xs text-sage-700 hover:text-sage-900 font-semibold flex items-center gap-1"
                  >
                    <span>{locale === 'zh' ? '在前台预览' : 'Preview Live'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {editorOpen && (
        <div
          onClick={() => setEditorOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-ivory-300 shadow-soft-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <h3 className="font-serif font-bold text-charcoal-900 text-base">
                {locale === 'zh' ? '撰写并发布觉知专栏文章' : 'Compose Column Article'}
              </h3>
              <button onClick={() => setEditorOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">✕</button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  文章标题
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例如：声波与迷走神经的自律共振..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  归属主题
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs focus:outline-none"
                >
                  <option value="声波疗愈">声波疗愈 (Sound Healing)</option>
                  <option value="脉轮能量">脉轮能量 (Chakra Biofield)</option>
                  <option value="心灵哲学">心灵哲学 (Depth Psychology)</option>
                  <option value="身心科学">身心科学 (Neurobiology)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  正文内容 (支持 Markdown)
                </label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="在此撰写你的觉知指南正文..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="px-4 py-2 text-charcoal-500 hover:text-charcoal-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold shadow-soft"
                >
                  确认发布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Journey Creator Modal */}
      {journeyModalOpen && (
        <div
          onClick={() => setJourneyModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-ivory-300 shadow-soft-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <div className="flex items-center gap-2">
                <Route className="w-5 h-5 text-sage-600" />
                <h3 className="font-serif font-bold text-charcoal-900 text-base">
                  {locale === 'zh' ? '创建并发布导师引导修行旅程' : 'Create Guided Journey'}
                </h3>
              </div>
              <button onClick={() => setJourneyModalOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">✕</button>
            </div>

            <form onSubmit={handleCreateJourney} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  旅程中文标题
                </label>
                <input
                  type="text"
                  value={journeyTitleZh}
                  onChange={(e) => setJourneyTitleZh(e.target.value)}
                  placeholder="例如：苏念真 · 迷走神经深度松弛与心轮疗愈之旅"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  英文标题 (可选)
                </label>
                <input
                  type="text"
                  value={journeyTitleEn}
                  onChange={(e) => setJourneyTitleEn(e.target.value)}
                  placeholder="e.g. Master Vagus Nerve De-Stress & Heart Alignment"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  副标题 / 引导重点
                </label>
                <input
                  type="text"
                  value={journeySubtitleZh}
                  onChange={(e) => setJourneySubtitleZh(e.target.value)}
                  placeholder="例如：专为长期脑力高压与失眠人群设计的4阶整合身心冥想"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-800 uppercase tracking-wider mb-1">
                  修习分类
                </label>
                <select
                  value={journeyCategory}
                  onChange={(e) => setJourneyCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/40 text-xs focus:outline-none"
                >
                  <option value="healing">情绪疗愈 (Emotional Healing)</option>
                  <option value="morning">晨间唤醒 (Morning Awakening)</option>
                  <option value="evening">晚间释压 (Evening De-Stress)</option>
                  <option value="deep_work">心流专注 (Deep Focus)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-sage-50/60 border border-sage-200 text-charcoal-600 space-y-1.5 font-light">
                <span className="font-semibold text-sage-900 block">系统已自动配置标准 4-Step 黄金引导结构：</span>
                <p>1. 🧘 引言与觉知锚定 (3分钟)</p>
                <p>2. 🎵 528Hz 修复共振声波冥想 (10分钟)</p>
                <p>3. 🎴 静心抽取一张今日原型镜映卡 (5分钟)</p>
                <p>4. ✍️ 觉知沉淀与整合手记 (5分钟)</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setJourneyModalOpen(false)}
                  className="px-4 py-2 text-charcoal-500 hover:text-charcoal-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold shadow-soft"
                >
                  确认创建并上线
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
