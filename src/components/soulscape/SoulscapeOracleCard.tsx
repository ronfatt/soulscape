'use client';

import React from 'react';
import { Sparkles, Sun, Moon, Star } from 'lucide-react';

export interface OracleCardProps {
  id?: number;
  name?: string;
  nameZh?: string;
  theme?: 'sun' | 'star' | 'moon' | 'cosmos';
  positionLabel?: string;
  positionSublabel?: string;
  isRevealed?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SoulscapeOracleCard: React.FC<OracleCardProps> = ({
  id = 1,
  name = 'The Star',
  nameZh = '星星 · 啟示',
  theme = 'star',
  positionLabel = 'Present',
  positionSublabel = 'The Star',
  isRevealed = true,
  isSelected = false,
  onClick,
  className = '',
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'w-[85px] h-[135px]',
    md: 'w-[98px] h-[155px] sm:w-[110px] sm:h-[175px]',
    lg: 'w-[140px] h-[220px]',
  };

  const getThemeArtwork = () => {
    switch (theme) {
      case 'sun':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-b from-[#2A2338] via-[#3F2B48] to-[#1D172A] text-amber-200">
            <div className="w-10 h-10 rounded-full border border-amber-300/40 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <Sun className="w-6 h-6 text-amber-300" />
            </div>
            <span className="font-editorial text-[10px] text-amber-200 tracking-wider mt-2 uppercase font-medium">Radiance</span>
          </div>
        );
      case 'moon':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-b from-[#1C1A2E] via-[#2A2440] to-[#12111E] text-indigo-200">
            <div className="w-10 h-10 rounded-full border border-indigo-300/40 flex items-center justify-center shadow-[0_0_15px_rgba(165,180,252,0.3)]">
              <Moon className="w-6 h-6 text-indigo-200" />
            </div>
            <span className="font-editorial text-[10px] text-indigo-200 tracking-wider mt-2 uppercase font-medium">Intuition</span>
          </div>
        );
      case 'star':
      default:
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 bg-gradient-to-b from-[#1A1829] via-[#2C2140] to-[#161224] text-amber-200">
            {/* Sacred Geometric Stars */}
            <div className="w-11 h-11 rounded-full border border-amber-300/50 flex items-center justify-center shadow-[0_0_18px_rgba(251,191,36,0.35)] relative">
              <Star className="w-6 h-6 text-amber-300 fill-amber-300/20" />
              <div className="absolute inset-0 rounded-full border border-dashed border-amber-200/30 animate-spin-slow" />
            </div>
            <span className="font-serif text-[10px] text-amber-200 tracking-widest mt-2 uppercase font-semibold">The Star</span>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 3D Oracle Card Shell */}
      <div
        onClick={onClick}
        className={`group relative ${sizeStyles[size]} rounded-[14px] p-1 transition-all duration-300 cursor-pointer select-none ${
          isSelected 
            ? 'ring-2 ring-[#B79A63] shadow-[0_8px_25px_rgba(183,154,99,0.35)] scale-105' 
            : 'shadow-[0_4px_16px_rgba(51,45,42,0.15)] hover:scale-102 hover:shadow-[0_6px_20px_rgba(183,154,99,0.25)]'
        }`}
        style={{
          background: 'linear-gradient(135deg, #B79A63 0%, #E8D9BF 50%, #9E814D 100%)',
        }}
      >
        {/* Inner Card Face */}
        <div className="w-full h-full rounded-[10px] overflow-hidden border border-[#B79A63]/60 relative flex flex-col items-center justify-center">
          {isRevealed ? (
            getThemeArtwork()
          ) : (
            // Card Back (Sacred geometry & SOULSCAPE lettering)
            <div className="w-full h-full bg-gradient-to-br from-[#1E1929] via-[#29223A] to-[#120F19] p-2 flex flex-col items-center justify-between border border-[#B79A63]/40">
              <div className="w-full flex justify-between text-[7px] text-amber-300/60 font-mono">
                <span>✦</span>
                <span>✦</span>
              </div>
              <div className="w-9 h-9 rounded-full border border-amber-300/40 flex items-center justify-center text-amber-300/80 shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-[8px] font-serif tracking-[0.2em] text-amber-200/70 uppercase">
                SOULSCAPE
              </span>
            </div>
          )}

          {/* Delicate Gold Inner Border Lines */}
          <div className="absolute inset-1 rounded-[8px] border border-amber-300/20 pointer-events-none" />
        </div>
      </div>

      {/* Position labels matching Screen 04 */}
      {(positionLabel || positionSublabel) && (
        <div className="mt-2 text-center">
          <div className="text-[11px] font-bold text-[#332D2A]">
            {positionLabel}
          </div>
          {positionSublabel && (
            <div className="text-[10px] text-[#736B66] font-light">
              {positionSublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SoulscapeOracleCard;
