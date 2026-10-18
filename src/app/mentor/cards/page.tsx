'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_ORACLE_CARDS } from '@/data/seedData';
import OracleCardVisual from '@/components/cards/OracleCardVisual';
import { Layers, Sparkles, Edit3, CheckCircle2 } from 'lucide-react';

export default function MentorCardsPage() {
  const { locale, showToast } = useApp();
  const [commentaries, setCommentaries] = useState<Record<number, string>>({
    1: '苏念真导师心传：抽到大地基石时，请注意来访者是否有过度悬浮于精神世界的防御机制。引导其双脚重踩大地。',
    4: '苏念真导师心传：庇护之所代表心智对外界刺激的过载反弹。此时不宜强行推进重大决断，宜静修三天。',
    22: '苏念真导师心传：金乌初升代表太阳轮生命原力已蓄势待发。鼓励来访者果断表达边界，向阳前行。'
  });
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [tempNote, setTempNote] = useState<string>('');

  const handleSave = (id: number) => {
    setCommentaries({ ...commentaries, [id]: tempNote });
    setEditingCardId(null);
    showToast(locale === 'zh' ? '导师批注已更新并同步至学员占读解读！' : 'Commentary saved!', undefined, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '88枚原初神谕卡 · 导师独门批注' : 'Card Commentaries by Mentor'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '为你所专长的原型卡牌撰写独门经验批注。学员抽中对应卡牌时将能优先阅读你的指引。' : 'Attach clinical & intuitive annotations to archetypal cards.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEED_ORACLE_CARDS.slice(0, 6).map((card) => {
          const note = commentaries[card.id];
          const isEditing = editingCardId === card.id;

          return (
            <div key={card.id} className="bg-white rounded-3xl p-5 border border-ivory-200 shadow-soft flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <OracleCardVisual card={card} size="sm" interactive={false} />
                  <div>
                    <span className="text-[10px] text-sage-700 font-mono font-bold">#{card.number}</span>
                    <h3 className="font-serif font-bold text-charcoal-900 text-sm">{card.nameZh}</h3>
                    <p className="text-[10px] text-charcoal-400">{card.realmZh}</p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-ivory-300 text-xs bg-ivory-50/50 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingCardId(null)} className="px-3 py-1 text-xs text-charcoal-500">取消</button>
                      <button onClick={() => handleSave(card.id)} className="px-3 py-1 bg-sage-600 text-white rounded-lg text-xs font-semibold">保存</button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-700 leading-relaxed font-light">
                    {note ? (
                      <p>{note}</p>
                    ) : (
                      <p className="text-charcoal-400 italic">暂无独门批注，点击下方按钮添加</p>
                    )}
                  </div>
                )}
              </div>

              {!isEditing && (
                <div className="pt-2 border-t border-ivory-200 flex justify-end">
                  <button
                    onClick={() => {
                      setEditingCardId(card.id);
                      setTempNote(note || '');
                    }}
                    className="text-xs text-sage-700 hover:text-sage-800 font-semibold flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{note ? '修改导师批注' : '添加独家解构'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
