'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export interface BreadcrumbItem {
  labelZh: string;
  labelEn: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const { locale } = useApp();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-charcoal-400 mb-6 font-medium">
      <Link href="/" className="hover:text-charcoal-700 flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{locale === 'zh' ? '首页' : 'Home'}</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-charcoal-700 transition-colors">
                {locale === 'zh' ? item.labelZh : item.labelEn}
              </Link>
            ) : (
              <span className="text-charcoal-800 font-semibold truncate max-w-[200px]">
                {locale === 'zh' ? item.labelZh : item.labelEn}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
