'use client';

import React from 'react';

interface SoulscapeSanctuaryVisualProps {
  className?: string;
  showOverlay?: boolean;
}

export const SoulscapeSanctuaryVisual: React.FC<SoulscapeSanctuaryVisualProps> = ({
  className = '',
  showOverlay = true,
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Photo artwork base (serene lake mountain at dawn) */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85"
        alt="Soulscape Sanctuary"
        className="w-full h-full object-cover object-center transform scale-105"
      />

      {/* Layered Ethereal Golden Glow & Lavender Mist */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F1] via-[#F9F6F1]/30 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-purple-500/5 to-[#F9F6F1]/90 pointer-events-none" />

      {/* Subtle Floating Sparkles / Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-200/80 animate-ping" />
        <span className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white/70 animate-pulse" />
        <span className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-amber-100/60 blur-xs" />
      </div>
    </div>
  );
};

export default SoulscapeSanctuaryVisual;
