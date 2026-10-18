'use client';

import React from 'react';

interface SoulscapeCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'lavender' | 'cream' | 'sand' | 'gold' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
}

export const SoulscapeCard: React.FC<SoulscapeCardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  interactive = false,
  onClick,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  };

  const variantStyles = {
    default: 'bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_24px_rgba(51,45,42,0.04)]',
    lavender: 'bg-gradient-to-br from-[#F5EEFB] via-[#FFFDF9] to-[#F5EEFB] border border-[#E8DDF5] shadow-[0_4px_24px_rgba(139,123,186,0.08)]',
    cream: 'bg-[#FAF7F2] border border-[#EDE5D9]/80 shadow-[0_2px_16px_rgba(51,45,42,0.03)]',
    sand: 'bg-[#EDE5D9]/40 border border-[#EDE5D9] shadow-xs',
    gold: 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F4ECE0] border border-[#D7BE96]/60 shadow-[0_6px_28px_rgba(183,154,99,0.12)]',
    glass: 'bg-[#FFFDF9]/85 backdrop-blur-md border border-[#EDE5D9]/70 shadow-[0_8px_32px_rgba(51,45,42,0.06)]',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer transition-all duration-200 active:scale-[0.99] hover:shadow-[0_8px_30px_rgba(51,45,42,0.08)] hover:border-[#D7BE96]/80'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-[22px] overflow-hidden ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default SoulscapeCard;
