'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import SoulscapeButton from './SoulscapeButton';

interface SoulscapeEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const SoulscapeEmptyState: React.FC<SoulscapeEmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = '',
}) => {
  return (
    <div className={`p-8 rounded-[24px] bg-[#FFFDF9] border border-[#EDE5D9]/80 text-center flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D9] flex items-center justify-center text-[#B79A63] shadow-xs">
        {icon || <Sparkles className="w-6 h-6 stroke-[1.8]" />}
      </div>
      <h4 className="font-serif font-bold text-base text-[#332D2A]">
        {title}
      </h4>
      <p className="text-xs text-[#736B66] max-w-xs leading-relaxed font-light">
        {description}
      </p>
      {actionLabel && onAction && (
        <SoulscapeButton variant="gold" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </SoulscapeButton>
      )}
    </div>
  );
};

export default SoulscapeEmptyState;
