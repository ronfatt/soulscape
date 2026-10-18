'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Sparkles, Send, ShieldAlert, ArrowRight, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeInput from '../SoulscapeInput';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: { label: string; href: string };
}

export const SoulscapeAiScreen: React.FC = () => {
  const router = useRouter();
  const { user, locale, credits, deductCredits } = useApp();
  const isZh = locale === 'zh';

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: isZh
        ? `嗨 ${user.name} 👋 今天感覺如何？我在這裡傾聽你、陪伴你的身心覺知旅程。`
        : `Hi ${user.name} 👋 How are you feeling today? I'm here to listen and support you on your journey.`,
      timestamp: '09:41',
    },
    {
      id: '2',
      sender: 'user',
      text: isZh
        ? '我最近感覺有一點焦慮，能給我一些內在的指引嗎？'
        : "I've been feeling a bit anxious lately. Can you give me some guidance?",
      timestamp: '09:42',
    },
    {
      id: '3',
      sender: 'ai',
      text: isZh
        ? '感到焦慮是完全自然的，你並不孤單。🌙 試著把手放在心輪處，做一次深長的呼吸。你現在更希望進行一段 5 分鐘安神冥想、抽取一張指引神諭卡，還是探索引起焦慮的思維根源？'
        : "It's completely normal to feel that way. You're not alone. 🌙 Would you like a calming practice, a card reading, or some perspective on what might be causing this feeling?",
      timestamp: '09:42',
      actionLink: {
        label: isZh ? '前往 432Hz 安神音頻' : 'Listen to 432Hz Calm',
        href: '/music',
      },
    },
  ]);

  const suggestionChips = isZh ? [
    '一段平靜的身心冥想',
    '抽取一張指引神諭卡',
    '幫助我理解焦慮的根源',
    '分享一句溫柔的肯定語',
  ] : [
    'A calming meditation',
    'Draw a card for guidance',
    'Help me understand my anxiety',
    'Share a gentle affirmation',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Simulated deterministic AI response
    setTimeout(() => {
      let reply = isZh
        ? '當你允許感受自然流動時，覺知便開始發揮力量。請將注意力帶回當下這具身體，感受雙腳與大地的穩定連結。'
        : 'When you allow sensations to flow without judgment, somatic healing unfolds naturally. Ground into this gentle breath.';

      if (text.includes('卡') || text.includes('card')) {
        reply = isZh
          ? '我為你感應到了第 17 號「星星」卡牌。它提醒你：當前正是信任生命進程的契機。'
          : 'I sense resonance with Card #17 "The Star". Trust the unfolding path; clarity is aligning.';
      } else if (text.includes('冥想') || text.includes('meditation')) {
        reply = isZh
          ? '為你推薦 432Hz 德爾塔波冥想。閉上雙眼，讓聲波的同頻共振撫平神經系統的緊繃。'
          : 'I recommend 432Hz binaural relaxation. Allow sound frequencies to gently reset your vagus nerve.';
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 700);
  };

  return (
    <div className="flex flex-col h-full min-h-[750px] space-y-4 animate-fade-in">
      {/* 01. Header matching Screen 05 */}
      <SoulscapeHeader
        mode="subpage"
        title="Soulscape AI"
        subtitle={isZh ? '在線 · 隨時陪伴在側' : 'Online · Always here for you'}
        rightAction={
          <div className="w-8 h-8 rounded-full bg-[#E8DDF5] flex items-center justify-center text-[#7160A1]">
            <Bot className="w-4 h-4" />
          </div>
        }
      />

      {/* 02. Messages Flow */}
      <div className="flex-1 px-4 sm:px-6 space-y-4 overflow-y-auto">
        <div className="text-center py-1">
          <span className="px-3 py-1 rounded-full bg-[#EDE5D9]/50 text-[10px] text-[#736B66] font-mono">
            {isZh ? '今天 09:41' : 'Today 09:41'}
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#B79A63]/30 via-[#E8DDF5] to-[#FAF7F2] border border-[#EDE5D9] flex items-center justify-center text-[#7160A1] shrink-0 text-xs shadow-xs">
                  ✦
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-[20px] p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#E8DDF5] text-[#332D2A] rounded-br-xs shadow-xs font-medium'
                    : 'bg-[#FFFDF9] text-[#332D2A] border border-[#EDE5D9]/90 rounded-bl-xs shadow-xs font-light'
                }`}
              >
                <p>{msg.text}</p>
                {msg.actionLink && (
                  <div className="mt-2.5 pt-2 border-t border-[#EDE5D9]/60">
                    <button
                      onClick={() => router.push(msg.actionLink!.href)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#B79A63] hover:underline"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <div className={`text-[9px] mt-1 text-right ${isUser ? 'text-[#7160A1]' : 'text-[#AFA8A3]'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#EDE5D9]"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 03. Suggestion Chips Row (Matching Screen 05) */}
      <div className="px-4 sm:px-6 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#EDE5D9] text-[#332D2A] hover:bg-[#FAF7F2] hover:border-[#B79A63] text-xs font-medium shadow-xs transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* 04. Input Dock */}
      <div className="px-4 sm:px-6 pb-4">
        <SoulscapeInput
          variant="chat"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={isZh ? '向內覺察，寫下你此刻的心緒...' : "Share what's on your mind..."}
          onSend={() => handleSend()}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <div className="mt-2 text-center text-[10px] text-[#AFA8A3] flex items-center justify-center gap-1">
          <ShieldAlert className="w-3 h-3 text-[#B79A63]" />
          <span>[DEMO SIMULATION] 僅供心靈陪伴，不構成任何醫療或心理診斷</span>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeAiScreen;
