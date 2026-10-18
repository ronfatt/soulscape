'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_MUSIC_TRACKS, SEED_PLAYLISTS } from '@/data/seedData';
import { Music, Radio, Play, CheckCircle2 } from 'lucide-react';

export default function AdminMusicPage() {
  const { locale, playTrack } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '声波乐库与调频资产编排' : 'Sound Frequency Assets'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '管理全站 12 首索尔菲吉奥调频音频、4 套主题歌单及 Web Audio API 振荡器参数。' : 'Manage frequency tracks and synthesized binaural engines.'}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
          12 首曲目 · 4 套歌单
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-500 font-semibold uppercase tracking-wider border-b border-ivory-200">
              <tr>
                <th className="p-4">音频标题与艺术家</th>
                <th className="p-4">基准载频</th>
                <th className="p-4">双耳节拍差频</th>
                <th className="p-4">脉轮对齐</th>
                <th className="p-4">播放热度</th>
                <th className="p-4 text-right">试听操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {SEED_MUSIC_TRACKS.map(t => (
                <tr key={t.id} className="hover:bg-ivory-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-charcoal-900">{t.titleZh}</p>
                    <span className="text-[10px] text-charcoal-400">{t.artistZh}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-charcoal-800">{t.frequencyHz} Hz</td>
                  <td className="p-4 font-mono text-sage-700">{t.binauralBeatHz || 5.0} Hz</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-ivory-200 text-charcoal-700 text-[10px] uppercase font-semibold">
                      {t.chakra || '全能调和'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-charcoal-500">{t.playsCount.toLocaleString()} 次</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => playTrack(t)}
                      className="px-3 py-1.5 rounded-xl bg-sage-50 hover:bg-sage-100 text-sage-800 text-xs font-semibold"
                    >
                      ▶ 试听
                    </button>
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
