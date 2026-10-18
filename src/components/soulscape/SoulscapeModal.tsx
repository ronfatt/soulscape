'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SoulscapeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'bottom-sheet' | 'center';
}

export const SoulscapeModal: React.FC<SoulscapeModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  variant = 'bottom-sheet',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#332D2A]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative z-10 w-full bg-[#FFFDF9] border border-[#EDE5D9] shadow-[0_12px_48px_rgba(51,45,42,0.18)] max-h-[90vh] overflow-y-auto ${
        variant === 'bottom-sheet' 
          ? 'rounded-t-[28px] sm:rounded-[26px] sm:max-w-md p-6' 
          : 'rounded-[26px] max-w-lg p-6'
      }`}>
        {/* Pull handle for bottom-sheet on mobile */}
        {variant === 'bottom-sheet' && (
          <div className="w-12 h-1 bg-[#EDE5D9] rounded-full mx-auto mb-4 sm:hidden" />
        )}

        <div className="flex items-center justify-between pb-3 border-b border-[#EDE5D9]/60">
          <div>
            {title && (
              <h3 className="font-serif font-bold text-lg text-[#332D2A]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#736B66] font-light mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#736B66] hover:bg-[#FAF7F2] hover:text-[#332D2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SoulscapeModal;
