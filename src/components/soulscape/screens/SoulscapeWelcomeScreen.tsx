'use client';

import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Music, 
  Layers, 
  Users, 
  Route, 
  Bot, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import SoulscapeButton from '../SoulscapeButton';
import { useApp } from '@/context/AppContext';

interface SoulscapeWelcomeScreenProps {
  onBeginJourney?: () => void;
  onExploreFeatures?: () => void;
}

interface FeaturePillItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  labelZh: string;
  labelEn: string;
}

export const SoulscapeWelcomeScreen: React.FC<SoulscapeWelcomeScreenProps> = ({
  onBeginJourney,
  onExploreFeatures,
}) => {
  const { locale } = useApp();
  const isZh = locale === 'zh';

  const featurePills: FeaturePillItem[] = [
    { id: 'ai', icon: Bot, labelZh: '智能指引', labelEn: 'AI Guidance' },
    { id: 'meditation', icon: Music, labelZh: '身心冥想', labelEn: 'Meditation' },
    { id: 'cards', icon: Layers, labelZh: '塔羅解讀', labelEn: 'Card Reading' },
    { id: 'mentor', icon: Users, labelZh: '專業導師', labelEn: 'Mentor' },
    { id: 'growth', icon: Route, labelZh: '全方位成長', labelEn: 'Holistic Growth' },
  ];

  return (
    <div className="relative min-h-[780px] sm:min-h-[840px] flex flex-col justify-between overflow-hidden bg-[#F9F6F1] text-[#332D2A] pb-8">
      {/* Background Sanctuary Artwork Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85"
          alt="Soulscape Sanctuary Background"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulseGlow"
        />
        {/* Soft morning mist and golden overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/85 via-[#F9F6F1]/50 to-[#F9F6F1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F1] via-[#F9F6F1]/40 to-transparent" />
      </div>

      {/* Top Header & Brand Identity */}
      <div className="relative z-10 pt-10 px-6 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9]/80 backdrop-blur-md border border-[#EDE5D9] text-[#7B5E32] text-[11px] font-semibold tracking-widest uppercase shadow-xs">
          <span>BMS × SOULSCAPE</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#332D2A] pt-1">
          Soulscape
        </h1>

        <div className="space-y-0.5">
          <p className="font-serif font-medium text-lg sm:text-xl text-[#332D2A]">
            Discover Your Inner Path
          </p>
          <p className="text-xs sm:text-sm text-[#736B66] font-light">
            {isZh ? '探索內在 · 遇見更好的自己' : 'A more mindful, meaningful, brighter you.'}
          </p>
        </div>

        <p className="text-[11px] sm:text-xs text-[#736B66] max-w-xs mx-auto font-light leading-relaxed pt-1">
          {isZh 
            ? '融合 AI 智慧、88枚原創神諭卡、432Hz 聲波音療與專業導師的數位身心空間。'
            : 'An AI-powered journey of mindfulness, self-discovery and a more meaningful life.'}
        </p>
      </div>

      {/* Middle Feature Highlights List (Matching Screen 01 reference) */}
      <div className="relative z-10 px-6 py-4 my-auto">
        <div className="max-w-xs mx-auto space-y-2">
          {featurePills.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FFFDF9]/80 backdrop-blur-md border border-[#EDE5D9]/90 shadow-xs hover:border-[#B79A63]/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#EDE5D9] flex items-center justify-center text-[#B79A63]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-xs text-[#332D2A] block">
                      {item.labelEn}
                    </span>
                    <span className="text-[10px] text-[#736B66] block">
                      {item.labelZh}
                    </span>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#EDE5D9]/40 flex items-center justify-center text-[#B79A63]">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA & Tagline */}
      <div className="relative z-10 px-6 space-y-3.5 text-center">
        <div className="max-w-xs mx-auto">
          <SoulscapeButton
            variant="gold"
            size="lg"
            fullWidth
            onClick={onBeginJourney}
            icon={<ArrowRight className="w-4 h-4 ml-1" />}
            className="py-4 rounded-2xl shadow-[0_8px_25px_rgba(183,154,99,0.35)]"
          >
            {isZh ? '開啟你的旅程' : 'Begin Your Journey'}
          </SoulscapeButton>
        </div>

        <div className="pt-2">
          <p className="font-editorial text-xs sm:text-sm text-[#736B66] tracking-widest uppercase">
            A Kinder · Brighter · You
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeWelcomeScreen;
