'use client';

import React, { useState } from 'react';
import { OracleCard } from '@/types';
import { useApp } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';

interface OracleCardVisualProps {
  card: OracleCard;
  isFlipped?: boolean;
  onFlip?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDetails?: boolean;
  interactive?: boolean;
}

export default function OracleCardVisual({
  card,
  isFlipped = true,
  onFlip,
  size = 'md',
  showDetails = false,
  interactive = true,
}: OracleCardVisualProps) {
  const { locale } = useApp();
  const [internalFlipped, setInternalFlipped] = useState(isFlipped);

  const currentlyFlipped = onFlip ? isFlipped : internalFlipped;

  const handleCardClick = () => {
    if (!interactive) return;
    if (onFlip) {
      onFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  const sizeClasses = {
    sm: 'w-32 h-48 text-[10px]',
    md: 'w-44 h-64 text-xs',
    lg: 'w-60 h-88 text-sm',
    hero: 'w-72 h-[410px] text-base'
  }[size];

  const [c1, c2, c3] = card.gradient || ['#3A244E', '#5B377A', '#A37EC5'];

  return (
    <div
      onClick={handleCardClick}
      className={`group relative ${sizeClasses} cursor-pointer select-none perspective-1000 transition-transform duration-300 ${
        interactive ? 'hover:scale-[1.03] active:scale-[0.98]' : ''
      }`}
      style={{ perspective: '1200px' }}
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 rounded-3xl shadow-soft-lg transform-style-3d ${
          currentlyFlipped ? 'rotate-y-0' : 'rotate-y-180'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: currentlyFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* ================= CARD FRONT ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden border-2 border-gold-300/60 p-3 sm:p-4 flex flex-col justify-between text-white shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            background: `linear-gradient(145deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`
          }}
        >
          {/* Subtle Sacred Geometry Overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.4]">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="18" />
              <polygon points="50,5 90,75 10,75" />
              <polygon points="50,95 90,25 10,25" />
            </svg>
          </div>

          {/* Top Header: Number & Realm */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono font-bold tracking-widest text-gold-200 text-xs px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-sm border border-gold-400/30">
              #{card.number < 10 ? `0${card.number}` : card.number}
            </span>
            <span className="text-[10px] tracking-wider text-ivory-100 font-medium px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
              {locale === 'zh' ? card.realmZh : card.realmEn}
            </span>
          </div>

          {/* Center Art Symbol */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-2 text-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
              <span className="text-3xl sm:text-4xl filter drop-shadow">{card.glyph || '✦'}</span>
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-ivory-50 tracking-tight leading-tight filter drop-shadow">
              {locale === 'zh' ? card.nameZh : card.nameEn}
            </h3>
            <p className="text-[10px] sm:text-xs text-gold-200/90 tracking-widest font-mono uppercase mt-0.5">
              {locale === 'zh' ? card.nameEn : card.nameZh}
            </p>
          </div>

          {/* Bottom Keywords & Chakra Indicator */}
          <div className="relative z-10 pt-2 border-t border-white/20">
            <div className="flex flex-wrap gap-1 justify-center mb-1.5">
              {(locale === 'zh' ? card.keywordsZh : card.keywordsEn).slice(0, 3).map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] bg-black/30 backdrop-blur-sm text-ivory-100 border border-white/10"
                >
                  {kw}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] text-ivory-200 opacity-80 px-1">
              <span>{card.element?.toUpperCase()}</span>
              <span>{card.chakra.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden backface-hidden border-2 border-gold-300/40 p-4 flex flex-col items-center justify-between shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1C2421 0%, #2E3834 60%, #151A18 100%)'
          }}
        >
          {/* Sacred Back Mandala */}
          <div className="w-full h-full flex flex-col items-center justify-between border border-gold-400/30 rounded-2xl p-4">
            <div className="text-gold-300/70 text-xs font-serif tracking-widest uppercase">
              SOULSCAPE
            </div>

            <div className="w-20 h-20 rounded-full border border-gold-400/40 flex items-center justify-center p-2">
              <div className="w-14 h-14 rounded-full border border-gold-400/60 border-dashed flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold-300 animate-pulse" />
              </div>
            </div>

            <div className="text-center">
              <div className="text-[10px] text-ivory-300/70 tracking-widest font-mono">
                SACRED REALMS ORACLE
              </div>
              <div className="text-[9px] text-gold-400/60 mt-0.5">88 SACRED SEED DECK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
