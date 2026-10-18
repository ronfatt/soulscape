'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  Radio, 
  Timer, 
  Sparkles,
  X
} from 'lucide-react';

export default function GlobalAudioPlayer() {
  const { 
    audioPlayer, 
    togglePlay, 
    seekTrack, 
    setVolume, 
    locale, 
    meditationTimer, 
    startMeditationTimer, 
    cancelMeditationTimer 
  } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTimerMenu, setShowTimerMenu] = useState(false);

  if (!audioPlayer.currentTrack) return null;

  const track = audioPlayer.currentTrack;
  const progressPercent = audioPlayer.duration > 0 ? (audioPlayer.progress / audioPlayer.duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-16 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-3 sm:px-4 pointer-events-none transition-all">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-ivory-300 rounded-3xl shadow-soft-xl p-3 sm:p-4 text-charcoal-900 transition-all">
        {isCollapsed ? (
          /* Collapsed Mini Pill */
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-sage-600 text-white flex items-center justify-center hover:bg-sage-700 transition-colors flex-shrink-0"
              >
                {audioPlayer.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate text-charcoal-800">
                  {locale === 'zh' ? track.titleZh : track.titleEn}
                </p>
                <p className="text-[10px] text-charcoal-400 truncate">
                  {track.frequencyHz ? `${track.frequencyHz}Hz` : ''} · {locale === 'zh' ? '正在纯净调频' : 'Binaural active'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {meditationTimer?.active && (
                <span className="px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-mono font-bold animate-pulse">
                  ⏳ {formatTime(meditationTimer.remainingSeconds)}
                </span>
              )}
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1.5 rounded-xl text-charcoal-500 hover:bg-ivory-100 transition-colors"
                title="Expand player"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Full Expanded Player */
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-serif text-sm shadow-sm flex-shrink-0 relative overflow-hidden"
                  style={{ backgroundColor: track.coverColor || '#5A8B6F' }}
                >
                  <Radio className={`w-5 h-5 ${audioPlayer.isPlaying ? 'animate-pulse text-gold-300' : ''}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-semibold text-charcoal-900 truncate">
                      {locale === 'zh' ? track.titleZh : track.titleEn}
                    </h4>
                    {track.frequencyHz && (
                      <span className="px-1.5 py-0.2 rounded-md bg-sage-100 text-sage-800 text-[10px] font-mono font-medium">
                        {track.frequencyHz}Hz
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-charcoal-500 truncate mt-0.5">
                    {locale === 'zh' ? track.artistZh : track.artistEn} · {locale === 'zh' ? 'Web Audio 调频正弦波' : 'Web Audio Synth'}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Meditation Timer Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShowTimerMenu(!showTimerMenu)}
                    className={`p-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-1 ${
                      meditationTimer?.active
                        ? 'bg-sage-100 text-sage-800 border border-sage-300 font-bold'
                        : 'text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-100'
                    }`}
                    title={locale === 'zh' ? '设定冥想倒计时' : 'Meditation Timer'}
                  >
                    <Timer className="w-4 h-4" />
                    {meditationTimer?.active && (
                      <span className="text-[11px]">{formatTime(meditationTimer.remainingSeconds)}</span>
                    )}
                  </button>

                  {/* Timer selection dropdown */}
                  {showTimerMenu && (
                    <div className="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-2xl shadow-soft-xl border border-ivory-300 text-xs w-44 z-50 animate-in fade-in">
                      <span className="text-[10px] text-charcoal-400 uppercase font-semibold block px-2 py-1">
                        {locale === 'zh' ? '静心冥想计时' : 'Meditation Timer'}
                      </span>
                      {[3, 5, 10, 20].map(mins => (
                        <button
                          key={mins}
                          onClick={() => {
                            startMeditationTimer(mins);
                            setShowTimerMenu(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-sage-50 text-charcoal-800 hover:text-sage-900 transition-colors flex justify-between"
                        >
                          <span>{mins} {locale === 'zh' ? '分钟静修' : 'mins'}</span>
                          <span className="text-[10px] text-charcoal-400">钟声归零</span>
                        </button>
                      ))}
                      {meditationTimer?.active && (
                        <button
                          onClick={() => {
                            cancelMeditationTimer();
                            setShowTimerMenu(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors mt-1 border-t border-ivory-200"
                        >
                          {locale === 'zh' ? '取消计时' : 'Cancel Timer'}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-sage-600 text-white flex items-center justify-center hover:bg-sage-700 shadow-soft transition-transform active:scale-95"
                >
                  {audioPlayer.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-1.5 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-100 transition-colors"
                  title="Minimize"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-charcoal-400 font-mono w-8 text-right">
                {formatTime(audioPlayer.progress)}
              </span>
              <div
                className="flex-1 h-1.5 bg-ivory-200 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  seekTrack(ratio * audioPlayer.duration);
                }}
              >
                <div
                  className="h-full bg-sage-600 rounded-full transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-charcoal-400 font-mono w-8">
                {formatTime(audioPlayer.duration)}
              </span>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-ivory-300">
                <button
                  onClick={() => setVolume(audioPlayer.volume > 0 ? 0 : 0.75)}
                  className="text-charcoal-400 hover:text-charcoal-700"
                >
                  {audioPlayer.volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioPlayer.volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 accent-sage-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
