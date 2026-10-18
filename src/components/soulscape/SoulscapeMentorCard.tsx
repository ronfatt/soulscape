'use client';

import React from 'react';
import { Star, Heart } from 'lucide-react';
import SoulscapeButton from './SoulscapeButton';
import { useApp } from '@/context/AppContext';

export interface MentorData {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewsCount?: number;
  languages?: string[];
  priceMyr: number;
  durationMinutes?: number;
  isFavorite?: boolean;
}

interface SoulscapeMentorCardProps {
  mentor: MentorData;
  onBook?: (mentor: MentorData) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export const SoulscapeMentorCard: React.FC<SoulscapeMentorCardProps> = ({
  mentor,
  onBook,
  onToggleFavorite,
  className = '',
}) => {
  const { locale } = useApp();
  const isZh = locale === 'zh';

  return (
    <div className={`p-4 rounded-[22px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_20px_rgba(51,45,42,0.04)] hover:shadow-[0_8px_30px_rgba(51,45,42,0.08)] transition-all flex items-center justify-between gap-3 sm:gap-4 ${className}`}>
      {/* Mentor Portrait */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#EDE5D9] shadow-xs">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mentor Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-sm sm:text-base text-[#332D2A] truncate">
            {mentor.name}
          </h4>
          <button
            onClick={() => onToggleFavorite && onToggleFavorite(mentor.id)}
            className="p-1 text-[#C6C2BE] hover:text-red-400 transition-colors"
            aria-label="Favorite"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-[#736B66] truncate mt-0.5">
          {mentor.title}
        </p>

        {/* Rating & Language badges */}
        <div className="mt-1 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-[#B79A63] font-semibold text-[11px]">
            <Star className="w-3.5 h-3.5 fill-[#B79A63] text-[#B79A63]" />
            <span>{mentor.rating.toFixed(1)}</span>
            {mentor.reviewsCount && (
              <span className="text-[#AFA8A3] font-normal">({mentor.reviewsCount})</span>
            )}
          </div>

          {mentor.languages && mentor.languages.length > 0 && (
            <div className="flex items-center gap-1">
              {mentor.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded-md bg-[#FAF7F2] text-[#736B66] text-[10px] border border-[#EDE5D9]"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Book CTA */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-[#332D2A]">
            <span className="font-bold text-sm text-[#332D2A]">RM {mentor.priceMyr}</span>
            <span className="text-[10px] text-[#736B66]"> / {mentor.durationMinutes || 30} min</span>
          </div>

          <SoulscapeButton
            variant="pill"
            size="sm"
            onClick={() => onBook && onBook(mentor)}
            className="px-3.5 py-1 text-xs"
          >
            {isZh ? '預約' : 'Book'}
          </SoulscapeButton>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeMentorCard;
