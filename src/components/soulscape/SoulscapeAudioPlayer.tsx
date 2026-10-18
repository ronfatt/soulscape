'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Shuffle, 
  Repeat, 
  Volume2, 
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface SoulscapeAudioPlayerProps {
  title?: string;
  subtitle?: string;
  artworkUrl?: string;
  frequency?: string;
  duration?: string;
  currentTime?: string;
  variant?: 'featured' | 'mini';
  onPlayPause?: () => void;
  isPlaying?: boolean;
  className?: string;
}

export const SoulscapeAudioPlayer: React.FC<SoulscapeAudioPlayerProps> = ({
  title = 'Moonlight Calm',
  subtitle = 'A journey back to your inner peace',
  artworkUrl = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
  frequency = '432 Hz',
  duration = '20:00',
  currentTime = '08:24',
  variant = 'featured',
  onPlayPause,
  isPlaying = false,
  className = '',
}) => {
  const { audioPlayer, playTrack, togglePlay, locale } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [seekPos, setSeekPos] = useState(42); // 42% progress

  const currentTrackTitle = audioPlayer.currentTrack
    ? (locale === 'zh' ? audioPlayer.currentTrack.titleZh : audioPlayer.currentTrack.titleEn)
    : title;
  const currentTrackArtist = audioPlayer.currentTrack
    ? (locale === 'zh' ? audioPlayer.currentTrack.artistZh : audioPlayer.currentTrack.artistEn)
    : subtitle;
  const isCurrentlyPlaying = audioPlayer.isPlaying ?? isPlaying;

  if (variant === 'mini') {
    return (
      <div className={`p-2.5 rounded-[20px] bg-[#FFFDF9]/95 backdrop-blur-md border border-[#EDE5D9] shadow-[0_8px_30px_rgba(51,45,42,0.08)] flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#EDE5D9] relative">
            <img
              src={artworkUrl}
              alt={currentTrackTitle}
              className="w-full h-full object-cover"
            />
            {isCurrentlyPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#B79A63] animate-ping" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="font-serif font-bold text-xs text-[#332D2A] truncate">
              {currentTrackTitle}
            </h4>
            <p className="text-[10px] text-[#736B66] truncate">
              {currentTrackArtist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => togglePlay()}
            className="w-8 h-8 rounded-full bg-[#B79A63] text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
            aria-label="Play/Pause"
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>
    );
  }

  // Full Featured Player matching Screen 03
  return (
    <div className={`rounded-[26px] overflow-hidden bg-[#FFFDF9] border border-[#EDE5D9] shadow-[0_6px_32px_rgba(51,45,42,0.06)] ${className}`}>
      {/* Cover Artwork Canvas */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
        <img
          src={artworkUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1622] via-[#1A1622]/40 to-transparent" />

        {/* Ambient frequency pill */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium text-amber-200 border border-amber-300/30 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#B79A63]" />
          <span>{frequency}</span>
        </div>

        {/* Title over artwork bottom */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h3 className="font-serif font-bold text-2xl text-white tracking-tight drop-shadow-sm">
            {currentTrackTitle}
          </h3>
          <p className="text-xs text-stone-200/90 font-light mt-0.5 drop-shadow-sm">
            {currentTrackArtist}
          </p>
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Seek Bar */}
        <div className="space-y-1.5">
          <div className="relative w-full h-1.5 bg-[#EDE5D9] rounded-full overflow-hidden cursor-pointer">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#899F8B] to-[#B79A63] rounded-full"
              style={{ width: `${seekPos}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#736B66] font-mono">
            <span>{currentTime}</span>
            <span>-{duration}</span>
          </div>
        </div>

        {/* Playback Button Row matching Screen 03 */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 transition-colors ${isFavorite ? 'text-rose-500' : 'text-[#736B66] hover:text-[#332D2A]'}`}
            aria-label="Favorite"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            className="p-2 text-[#736B66] hover:text-[#332D2A] transition-colors"
            aria-label="Previous"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Central Play/Pause button */}
          <button
            onClick={() => togglePlay()}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#9E814D] to-[#B79A63] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(183,154,99,0.35)] hover:shadow-[0_8px_25px_rgba(183,154,99,0.45)] transition-all active:scale-95"
            aria-label="Play/Pause"
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>

          <button
            className="p-2 text-[#736B66] hover:text-[#332D2A] transition-colors"
            aria-label="Next"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button
            className="p-2 text-[#736B66] hover:text-[#332D2A] transition-colors"
            aria-label="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoulscapeAudioPlayer;
