'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Bookmark, 
  Music, 
  ArrowRight,
  ShieldAlert,
  Star
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeOracleCard from '../SoulscapeOracleCard';
import SoulscapeButton from '../SoulscapeButton';
import { SEED_ORACLE_CARDS } from '@/data/seedData';

export const SoulscapeCardReadingScreen: React.FC = () => {
  const router = useRouter();
  const { locale, credits, deductCredits } = useApp();
  const [selectedSpreadIndex, setSelectedSpreadIndex] = useState(1); // Present (The Star)
  const [isShuffling, setIsShuffling] = useState(false);

  const isZh = locale === 'zh';

  const cardsInSpread = [
    {
      id: 1,
      positionLabel: isZh ? '過去' : 'Past',
      positionSublabel: isZh ? '釋放與根基' : 'Release',
      theme: 'sun' as const,
      name: 'The Sun',
      nameZh: '初陽 · 溫暖與滋養',
      keywords: 'Warmth · Growth · Foundation',
      reading: isZh
        ? '過去的經歷為你打下了深厚的根基，那些曾給予你滋養的溫暖，依然在你的內心深處閃耀。'
        : 'Your foundational past experiences have provided resilience and radiant strength for your current awakening.',
    },
    {
      id: 2,
      positionLabel: isZh ? '現在' : 'Present',
      positionSublabel: isZh ? '星星' : 'The Star',
      theme: 'star' as const,
      name: 'The Star',
      nameZh: '星星 · 希望與啟示',
      keywords: 'Hope · Renewal · Inspiration',
      reading: isZh
        ? '全新篇章正在徐徐展開。宇宙提醒你全然信任生命的流動與歷程，即使眼前道路稍顯朦朧，你內在的明澈光芒正在指引你通往更高的覺知與使命。'
        : 'A new chapter is unfolding. The Universe is reminding you to trust the process, even when the path feels uncertain. Your inner light is guiding you toward greater clarity and purpose.',
    },
    {
      id: 3,
      positionLabel: isZh ? '未來' : 'Future',
      positionSublabel: isZh ? '綻放與豐盛' : 'Bloom',
      theme: 'moon' as const,
      name: 'The Moon Bloom',
      nameZh: '繁花 · 直覺與綻放',
      keywords: 'Intuition · Manifestation · Grace',
      reading: isZh
        ? '信任你的深層直覺。隨著內在調頻的深化，你的心靈之花將以最優雅從容的姿態在未來的節奏中盛放。'
        : 'Trust your deep somatic intuition. As your alignment solidifies, your potential blossoms into graceful fruition.',
    },
  ];

  const currentActiveCard = cardsInSpread[selectedSpreadIndex];

  const reflectionPrompts = isZh ? [
    '當下有哪一個深藏的夢想，正在輕聲呼喚你的關注？',
    '今天你可以如何將更多內在的光明與溫柔，帶入具體的日常生活中？',
    '為了向內在真實靠近一步，你今天願意採取哪一個微小而篤定的行動？',
  ] : [
    'What dream is calling you now?',
    'How can you bring more light into your daily life?',
    'What small step can you take today?',
  ];

  const handleDrawNew = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
      setSelectedSpreadIndex(1);
    }, 600);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 01. Top Header */}
      <SoulscapeHeader
        mode="subpage"
        title={isZh ? 'AI 塔羅神諭解讀' : 'AI Card Reading'}
        subtitle={isZh ? '過去 · 現在 · 未來 三牌深度陣' : 'Past · Present · Future Spread'}
        rightAction={
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#736B66] hover:text-[#332D2A]">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#736B66] hover:text-[#332D2A]">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        }
      />

      <div className="px-4 sm:px-6 space-y-5">
        {/* 02. Three Card Spread Row (Matching Screen 04) */}
        <div className={`p-4 rounded-[26px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_24px_rgba(51,45,42,0.04)] ${
          isShuffling ? 'opacity-50 scale-95 transition-all' : ''
        }`}>
          <div className="flex items-center justify-around gap-2 py-2">
            {cardsInSpread.map((card, idx) => (
              <SoulscapeOracleCard
                key={card.id}
                theme={card.theme}
                positionLabel={card.positionLabel}
                positionSublabel={card.positionSublabel}
                isSelected={selectedSpreadIndex === idx}
                onClick={() => setSelectedSpreadIndex(idx)}
                size="md"
              />
            ))}
          </div>

          <div className="text-center pt-2 text-[10px] text-[#AFA8A3]">
            {isZh ? '點擊上方任意卡牌查看深度解析' : 'Tap any card to view detailed interpretation'}
          </div>
        </div>

        {/* 03. Card Interpretation Content Card */}
        <div className="p-5 sm:p-6 rounded-[24px] bg-[#FFFDF9] border border-[#EDE5D9] shadow-[0_4px_20px_rgba(51,45,42,0.04)] space-y-3.5">
          {/* Card Title Header with Glowing Icon */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#EDE5D9]/60">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B79A63]/20 via-[#FAF7F2] to-[#B79A63]/30 border border-[#EDE5D9] flex items-center justify-center text-[#B79A63] shadow-xs">
              <Star className="w-5 h-5 fill-[#B79A63]" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-lg text-[#332D2A]">
                {isZh ? currentActiveCard.nameZh : currentActiveCard.name}
              </h3>
              <p className="text-xs text-[#B79A63] font-medium tracking-wide">
                {currentActiveCard.keywords}
              </p>
            </div>
          </div>

          {/* Reading Prose */}
          <p className="text-xs sm:text-sm text-[#4B423D] leading-relaxed font-light">
            {currentActiveCard.reading}
          </p>

          <div className="pt-1 flex items-center gap-1.5 text-[10px] text-[#AFA8A3]">
            <ShieldAlert className="w-3 h-3 text-[#B79A63]" />
            <span>[DEMO SIMULATION] 榮格原型確定性心理占讀映射</span>
          </div>
        </div>

        {/* 04. Reflection Prompts Card (Matching Screen 04) */}
        <div className="p-5 rounded-[24px] bg-[#FAF7F2] border border-[#EDE5D9]/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#332D2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#B79A63]" />
            <span>{isZh ? '深度覺知自省追問' : 'Reflection Prompts'}</span>
          </div>

          <ul className="space-y-2 text-xs text-[#4B423D] leading-relaxed">
            {reflectionPrompts.map((prompt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B79A63] mt-1.5 shrink-0" />
                <span>{prompt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 05. Paired Sound Healing Hook */}
        <div
          onClick={() => router.push('/music')}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F5EEFB] to-[#FFFDF9] border border-[#E8DDF5] flex items-center justify-between cursor-pointer hover:border-[#B79A63]/60 transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2.5 text-xs">
            <div className="w-8 h-8 rounded-xl bg-[#E8DDF5] flex items-center justify-center text-[#7160A1]">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-[#332D2A] block">
                {isZh ? '聆聽對應調頻音波 · 528Hz 星光共振' : 'Listen to 528Hz Star Frequency'}
              </span>
              <span className="text-[10px] text-[#736B66]">
                {isZh ? '心輪調頻 · 沉浸 15 分鐘' : 'Heart Alignment · 15 min'}
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#B79A63]" />
        </div>

        {/* 06. Primary Action: Draw New Reading */}
        <div className="pt-1">
          <SoulscapeButton
            variant="gold"
            size="lg"
            fullWidth
            onClick={handleDrawNew}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            {isZh ? '抽取全新牌陣 (20 積分)' : 'Draw New Reading'}
          </SoulscapeButton>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeCardReadingScreen;
