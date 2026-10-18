'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeWelcomeScreen from '@/components/soulscape/screens/SoulscapeWelcomeScreen';
import SoulscapeHomeScreen from '@/components/soulscape/screens/SoulscapeHomeScreen';
import SoulscapeModal from '@/components/soulscape/SoulscapeModal';
import SoulscapeButton from '@/components/soulscape/SoulscapeButton';
import { Sparkles, Check, CheckCircle2 } from 'lucide-react';

export default function MobileFirstLandingPage() {
  const { user, locale, updateInterests } = useApp();
  const [activeScreen, setActiveScreen] = useState<'welcome' | 'home'>('welcome');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user.interests?.length ? user.interests : ['cards', 'chakras', 'music']
  );

  const isZh = locale === 'zh';

  const interestOptions = [
    { id: 'cards', labelZh: '88枚神諭卡探索', labelEn: '88 Oracle Cards', icon: '🎴' },
    { id: 'music', labelZh: '全頻聲波與雙耳節拍', labelEn: 'Binaural Sound Therapy', icon: '🎵' },
    { id: 'chakras', labelZh: '七脈輪身心調理', labelEn: 'Seven Chakras Alignment', icon: '🌈' },
    { id: 'mentors', labelZh: '1對1大師個案諮詢', labelEn: '1-on-1 Mentor Guidance', icon: '🧘' },
    { id: 'ai', labelZh: 'AI 覺知向導伴讀', labelEn: 'AI Consciousness Guide', icon: '✨' },
    { id: 'sleep', labelZh: '深度助眠與減壓', labelEn: 'Deep Sleep & De-Stress', icon: '🌙' },
  ];

  const handleToggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSaveInterests = () => {
    updateInterests(selectedInterests);
    setOnboardingOpen(false);
    setActiveScreen('home');
  };

  const handleBeginJourney = () => {
    // Open interest onboarding or go to home
    setOnboardingOpen(true);
  };

  return (
    <SoulscapeMobileShell activeTab="home">
      {/* Top Prototype Switcher Pill */}
      <div className="sticky top-0 z-30 pt-2 pb-1.5 px-4 flex items-center justify-center bg-[#F9F6F1]/90 backdrop-blur-md border-b border-[#EDE5D9]/50">
        <div className="inline-flex items-center gap-1 p-1 bg-[#FFFDF9] rounded-full border border-[#EDE5D9] shadow-xs text-xs">
          <button
            onClick={() => setActiveScreen('welcome')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeScreen === 'welcome'
                ? 'bg-[#B79A63] text-white shadow-xs font-semibold'
                : 'text-[#736B66] hover:text-[#332D2A]'
            }`}
          >
            {isZh ? '01 品牌迎新' : '01 Welcome'}
          </button>
          <button
            onClick={() => setActiveScreen('home')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeScreen === 'home'
                ? 'bg-[#B79A63] text-white shadow-xs font-semibold'
                : 'text-[#736B66] hover:text-[#332D2A]'
            }`}
          >
            {isZh ? '02 個人化推薦' : '02 Home Dashboard'}
          </button>
        </div>
      </div>

      {/* Screen Render */}
      {activeScreen === 'welcome' ? (
        <SoulscapeWelcomeScreen onBeginJourney={handleBeginJourney} />
      ) : (
        <SoulscapeHomeScreen />
      )}

      {/* Onboarding Interest Selection Modal (Step after Begin Your Journey) */}
      <SoulscapeModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        title={isZh ? '定制您的身心覺知偏好' : 'Personalize Your Journey'}
        subtitle={isZh ? '選擇您感興趣的領域，為您生成專屬看板' : 'Select modalities that resonate with your inner self'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {interestOptions.map((opt) => {
              const selected = selectedInterests.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggleInterest(opt.id)}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-start gap-2.5 ${
                    selected
                      ? 'bg-[#F4ECE0] border-[#B79A63] shadow-xs'
                      : 'bg-[#FFFDF9] border-[#EDE5D9] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="text-xl shrink-0">{opt.icon}</span>
                  <div className="min-w-0">
                    <span className="font-serif font-bold text-xs text-[#332D2A] block truncate">
                      {isZh ? opt.labelZh : opt.labelEn}
                    </span>
                    <span className="text-[10px] text-[#736B66] block">
                      {selected ? (isZh ? '已選擇' : 'Selected') : (isZh ? '點擊加入' : 'Add')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <SoulscapeButton
            variant="gold"
            size="md"
            fullWidth
            onClick={handleSaveInterests}
            className="mt-3"
          >
            {isZh ? '儲存並進入個人主頁 →' : 'Save & Enter Home Dashboard →'}
          </SoulscapeButton>
        </div>
      </SoulscapeModal>
    </SoulscapeMobileShell>
  );
}
