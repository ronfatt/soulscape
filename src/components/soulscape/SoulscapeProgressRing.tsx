'use client';

import React from 'react';

interface SoulscapeProgressRingProps {
  progress?: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  quote?: string;
  variant?: 'card' | 'standalone' | 'hero';
  className?: string;
}

export const SoulscapeProgressRing: React.FC<SoulscapeProgressRingProps> = ({
  progress = 78,
  size = 64,
  strokeWidth = 6,
  label,
  quote,
  variant = 'card',
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (variant === 'card') {
    return (
      <div className={`p-4 sm:p-5 rounded-[22px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_24px_rgba(51,45,42,0.04)] flex items-center justify-between gap-4 ${className}`}>
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-base text-[#332D2A]">
            Your Soul Journey
          </h3>
          <p className="text-xs text-[#736B66] font-light leading-relaxed">
            Keep going. You&apos;re growing beautifully.
          </p>
        </div>

        {/* Circular Progress Meter */}
        <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#EDE5D9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Gradient Colored Stroke */}
            <defs>
              <linearGradient id="soulscapeProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#899F8B" />
                <stop offset="100%" stopColor="#B79A63" />
              </linearGradient>
            </defs>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#soulscapeProgressGrad)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif font-bold text-sm text-[#332D2A]">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Hero version for Screen 08 (My Journey)
  const heroSize = 130;
  const heroStroke = 9;
  const heroRadius = (heroSize - heroStroke) / 2;
  const heroCircumference = 2 * Math.PI * heroRadius;
  const heroOffset = heroCircumference - (progress / 100) * heroCircumference;

  return (
    <div className={`p-6 rounded-[24px] bg-[#FFFDF9] border border-[#EDE5D9] shadow-[0_4px_24px_rgba(51,45,42,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6 ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: heroSize, height: heroSize }}>
        <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${heroSize} ${heroSize}`}>
          <circle
            cx={heroSize / 2}
            cy={heroSize / 2}
            r={heroRadius}
            stroke="#EDE5D9"
            strokeWidth={heroStroke}
            fill="transparent"
          />
          <defs>
            <linearGradient id="heroSoulscapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#899F8B" />
              <stop offset="60%" stopColor="#B79A63" />
              <stop offset="100%" stopColor="#C7A774" />
            </linearGradient>
          </defs>
          <circle
            cx={heroSize / 2}
            cy={heroSize / 2}
            r={heroRadius}
            stroke="url(#heroSoulscapeGrad)"
            strokeWidth={heroStroke}
            strokeDasharray={heroCircumference}
            strokeDashoffset={heroOffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#736B66] uppercase tracking-wider font-medium">Inner Growth</span>
          <span className="font-serif font-bold text-3xl text-[#332D2A]">
            {progress}%
          </span>
        </div>
      </div>

      <div className="space-y-2 text-center sm:text-left">
        <blockquote className="font-editorial italic text-base sm:text-lg text-[#332D2A] leading-relaxed">
          &ldquo;A calmer mind.<br />
          A brighter me.<br />
          A more meaningful life.&rdquo;
        </blockquote>
        <p className="text-xs text-[#899F8B] font-medium">
          ✦ You have completed 78% of your weekly somatic practices
        </p>
      </div>
    </div>
  );
};

export default SoulscapeProgressRing;
