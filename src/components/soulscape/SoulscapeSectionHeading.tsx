'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface SoulscapeSectionHeadingProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  onSeeAll?: () => void;
  className?: string;
}

export const SoulscapeSectionHeading: React.FC<SoulscapeSectionHeadingProps> = ({
  title,
  subtitle,
  seeAllHref,
  onSeeAll,
  className = '',
}) => {
  const { locale } = useApp();
  const isZh = locale === 'zh';

  return (
    <div className={`flex items-end justify-between mb-3 px-1 ${className}`}>
      <div>
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#332D2A] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#736B66] font-light mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {(seeAllHref || onSeeAll) && (
        seeAllHref ? (
          <Link
            href={seeAllHref}
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#B79A63] hover:text-[#9E814D] transition-colors pb-0.5"
          >
            <span>{isZh ? '查看全部' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <button
            onClick={onSeeAll}
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#B79A63] hover:text-[#9E814D] transition-colors pb-0.5"
          >
            <span>{isZh ? '查看全部' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )
      )}
    </div>
  );
};

export default SoulscapeSectionHeading;
