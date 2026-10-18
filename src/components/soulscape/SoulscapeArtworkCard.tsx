'use client';

import React from 'react';
import { Play, Sparkles, Heart } from 'lucide-react';

interface SoulscapeArtworkCardProps {
  title: string;
  subtitle: string;
  duration?: string;
  theme?: 'lake' | 'floral' | 'night' | 'dawn' | 'forest';
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
  isWide?: boolean;
}

export const SoulscapeArtworkCard: React.FC<SoulscapeArtworkCardProps> = ({
  title,
  subtitle,
  duration,
  theme = 'lake',
  imageUrl,
  onClick,
  className = '',
  isWide = false,
}) => {
  // Built-in curated high-res serene wellness photography & artwork matching the reference aesthetic
  const themeImages = {
    lake: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', // Tranquil water dawn
    floral: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=80', // Soft pink blossom
    night: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', // Moonlit starry night
    dawn: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80', // Misty golden mountain
    forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80', // Serene sunlit woods
  };

  const bgImage = imageUrl || themeImages[theme];

  if (isWide) {
    return (
      <div
        onClick={onClick}
        className={`group p-3 sm:p-4 rounded-[22px] bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_20px_rgba(51,45,42,0.04)] hover:shadow-[0_8px_30px_rgba(51,45,42,0.08)] transition-all cursor-pointer flex items-center justify-between gap-4 active:scale-[0.99] ${className}`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 shadow-xs">
            <img
              src={bgImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="min-w-0">
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#332D2A] truncate group-hover:text-[#B79A63] transition-colors">
              {title}
            </h4>
            <p className="text-xs text-[#736B66] font-light mt-0.5 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        <button
          className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#EDE5D9] group-hover:bg-[#B79A63] group-hover:border-[#B79A63] group-hover:text-white flex items-center justify-center text-[#B79A63] transition-colors shadow-xs shrink-0"
          aria-label="Play"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group w-[150px] sm:w-[170px] shrink-0 rounded-[22px] overflow-hidden bg-[#FFFDF9] border border-[#EDE5D9]/90 shadow-[0_4px_20px_rgba(51,45,42,0.04)] hover:shadow-[0_8px_30px_rgba(51,45,42,0.08)] transition-all cursor-pointer flex flex-col active:scale-[0.98] ${className}`}
    >
      {/* Artwork Thumbnail */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-stone-100">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {duration && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-medium text-white">
            {duration}
          </span>
        )}

        <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#332D2A] group-hover:bg-[#B79A63] group-hover:text-white transition-colors shadow-xs">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#332D2A] line-clamp-1 group-hover:text-[#B79A63] transition-colors">
            {title}
          </h4>
          <p className="text-[11px] text-[#736B66] font-light mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeArtworkCard;
