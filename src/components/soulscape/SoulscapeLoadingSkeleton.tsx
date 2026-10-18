'use client';

import React from 'react';

export const SoulscapeLoadingSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-[22px] bg-[#FFFDF9] border border-[#EDE5D9]/70 animate-pulse flex items-center gap-3.5"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#EDE5D9]/50 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 rounded-md bg-[#EDE5D9]/60" />
            <div className="w-2/3 h-3 rounded-md bg-[#EDE5D9]/40" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoulscapeLoadingSkeleton;
