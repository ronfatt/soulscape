'use client';

import React from 'react';

interface SoulscapeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'cocoa' | 'secondary' | 'ghost' | 'pill' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const SoulscapeButton: React.FC<SoulscapeButtonProps> = ({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-muted-gold/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[36px] rounded-xl gap-1.5',
    md: 'text-sm px-5 py-3 min-h-[44px] rounded-2xl gap-2',
    lg: 'text-base px-6 py-3.5 min-h-[48px] rounded-2xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#9E814D] to-[#B79A63] hover:from-[#8F7443] hover:to-[#A78A53] text-white shadow-[0_4px_16px_rgba(183,154,99,0.25)] hover:shadow-[0_6px_20px_rgba(183,154,99,0.35)]',
    cocoa: 'bg-[#332D2A] hover:bg-[#26211E] text-[#FFFDF9] shadow-[0_4px_16px_rgba(51,45,42,0.18)]',
    secondary: 'bg-[#FFFDF9] hover:bg-[#F9F6F1] text-[#332D2A] border border-[#EDE5D9] shadow-xs',
    ghost: 'bg-transparent hover:bg-[#EDE5D9]/50 text-[#332D2A]',
    pill: 'bg-[#B79A63] hover:bg-[#9E814D] text-white rounded-full text-xs px-4 py-1.5 min-h-[32px] shadow-xs',
    outline: 'bg-transparent border border-[#B79A63] text-[#7A5E32] hover:bg-[#B79A63]/10',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default SoulscapeButton;
