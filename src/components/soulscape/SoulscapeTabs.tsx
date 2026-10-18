'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
}

interface SoulscapeTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'segmented';
  className?: string;
}

export const SoulscapeTabs: React.FC<SoulscapeTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
  className = '',
}) => {
  if (variant === 'segmented') {
    return (
      <div className={`p-1 bg-[#FAF7F2] rounded-full border border-[#EDE5D9] flex items-center gap-1 ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                isActive
                  ? 'bg-[#FFFDF9] text-[#332D2A] shadow-xs'
                  : 'text-[#736B66] hover:text-[#332D2A]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#B79A63]/20 text-[#7B5E32] font-normal">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Pill variant with horizontal scrolling
  return (
    <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none ${
              isActive
                ? 'bg-[#B79A63] text-white shadow-[0_2px_10px_rgba(183,154,99,0.3)] font-semibold'
                : 'bg-[#FFFDF9] text-[#736B66] border border-[#EDE5D9] hover:bg-[#FAF7F2]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SoulscapeTabs;
