'use client';

import React from 'react';
import { Search, Send, Mic } from 'lucide-react';

interface SoulscapeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'search' | 'chat' | 'default';
  onSend?: () => void;
  isLoading?: boolean;
}

export const SoulscapeInput: React.FC<SoulscapeInputProps> = ({
  variant = 'default',
  onSend,
  isLoading = false,
  className = '',
  ...props
}) => {
  if (variant === 'search') {
    return (
      <div className={`relative flex items-center ${className}`}>
        <Search className="absolute left-3.5 w-4 h-4 text-[#AFA8A3] pointer-events-none" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE5D9] text-[#332D2A] placeholder-[#AFA8A3] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B79A63]/30 focus:border-[#B79A63] shadow-xs transition-all"
          {...props}
        />
      </div>
    );
  }

  if (variant === 'chat') {
    return (
      <div className={`relative flex items-center bg-[#FFFDF9] rounded-full border border-[#EDE5D9] shadow-[0_4px_20px_rgba(51,45,42,0.06)] p-1.5 ${className}`}>
        <input
          type="text"
          className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-[#332D2A] placeholder-[#AFA8A3] focus:outline-none"
          {...props}
        />
        <button
          type="button"
          onClick={onSend}
          disabled={isLoading || !props.value}
          className="w-9 h-9 rounded-full bg-[#B79A63] hover:bg-[#9E814D] disabled:opacity-40 disabled:hover:bg-[#B79A63] text-white flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-xs"
          aria-label="Send"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    );
  }

  return (
    <input
      type="text"
      className={`w-full px-4 py-2.5 rounded-2xl bg-[#FFFDF9] border border-[#EDE5D9] text-[#332D2A] placeholder-[#AFA8A3] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B79A63]/30 focus:border-[#B79A63] shadow-xs transition-all ${className}`}
      {...props}
    />
  );
};

export default SoulscapeInput;
