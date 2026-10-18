'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { 
  UserProfile, 
  UserRole, 
  Locale, 
  CardReadingRecord, 
  TransactionRecord, 
  MusicTrack, 
  MentorBooking, 
  ChakraType,
  GuidedJourney 
} from '@/types';
import { 
  SEED_TRANSACTIONS, 
  SEED_READING_HISTORIES, 
  SEED_MUSIC_TRACKS,
  SEED_JOURNEYS,
  DEMO_MEMBERSHIP_TIERS,
  DEMO_CREDIT_PACKS
} from '@/data/seedData';
import { DEMO_USERS, defaultAuthAdapter } from '@/services/adapters/authAdapter';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}

interface AudioPlayerState {
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isSynthesized: boolean;
}

export interface MeditationTimerState {
  active: boolean;
  minutes: number;
  remainingSeconds: number;
}

interface AppContextValue {
  user: UserProfile;
  role: UserRole;
  locale: Locale;
  setLocale: (l: Locale) => void;
  switchRole: (newRole: UserRole) => void;
  credits: number;
  transactions: TransactionRecord[];
  readings: CardReadingRecord[];
  favorites: {
    cards: number[];
    tracks: string[];
    mentors: string[];
    articles: string[];
  };
  journeyProgress: Record<string, number>;
  journeyCompleted: Record<string, boolean>;
  guidedJourneys: GuidedJourney[];
  mentorBookings: MentorBooking[];
  membershipTiers: typeof DEMO_MEMBERSHIP_TIERS;
  creditPacks: typeof DEMO_CREDIT_PACKS;
  audioPlayer: AudioPlayerState;
  meditationTimer: MeditationTimerState | null;
  toasts: ToastMessage[];
  // Actions
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  deductCredits: (amount: number, descriptionZh: string, descriptionEn: string, type: TransactionRecord['type']) => boolean;
  addCredits: (amount: number, descriptionZh: string, descriptionEn: string, cashRmb?: number) => void;
  addReadingRecord: (record: CardReadingRecord) => void;
  addBooking: (booking: Omit<MentorBooking, 'id' | 'status'>) => Promise<string>;
  updateBookingStatus: (id: string, status: MentorBooking['status']) => void;
  updateJourneyStep: (journeyId: string, stepIndex: number, isComplete?: boolean) => void;
  addGuidedJourney: (journey: GuidedJourney) => void;
  toggleFavorite: (type: 'cards' | 'tracks' | 'mentors' | 'articles', id: string | number) => void;
  updateInterests: (interests: string[]) => void;
  updateTierPricing: (id: string, monthly: number, annual: number) => void;
  updateCreditPack: (id: string, price: number, credits: number) => void;
  resetDemoState: () => void;
  playTrack: (track: MusicTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  seekTrack: (seconds: number) => void;
  setVolume: (volume: number) => void;
  playBellChime: () => void;
  startMeditationTimer: (minutes: number) => void;
  cancelMeditationTimer: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY_PREFIX = 'soulscape_';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [role, setRole] = useState<UserRole>('member');
  const [user, setUser] = useState<UserProfile>(DEMO_USERS.member);
  const [locale, setLocaleState] = useState<Locale>('zh');
  const [credits, setCredits] = useState<number>(100);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(SEED_TRANSACTIONS);
  const [readings, setReadings] = useState<CardReadingRecord[]>(SEED_READING_HISTORIES);
  const [membershipTiers, setMembershipTiers] = useState(DEMO_MEMBERSHIP_TIERS);
  const [creditPacks, setCreditPacks] = useState(DEMO_CREDIT_PACKS);
  const [guidedJourneys, setGuidedJourneys] = useState<GuidedJourney[]>(SEED_JOURNEYS);
  
  const [favorites, setFavorites] = useState<{
    cards: number[];
    tracks: string[];
    mentors: string[];
    articles: string[];
  }>({
    cards: [1, 22, 34],
    tracks: ['music-1', 'music-4'],
    mentors: ['mentor-1', 'mentor-3'],
    articles: ['art-1', 'art-3']
  });
  const [journeyProgress, setJourneyProgress] = useState<Record<string, number>>({
    'journey-morning': 2
  });
  const [journeyCompleted, setJourneyCompleted] = useState<Record<string, boolean>>({});
  const [mentorBookings, setMentorBookings] = useState<MentorBooking[]>([
    {
      id: 'bk-demo-01',
      mentorId: 'mentor-1',
      mentorName: '苏念真 老师',
      userId: 'user-member-demo',
      userName: '林若尘 (演示会员)',
      userEmail: 'seeker@soulscape.app',
      date: '2026-10-22',
      timeSlot: '15:30 - 16:30',
      status: 'confirmed',
      creditsPaid: 80,
      notes: '希望针对近期的心轮沉重与夜间浅眠做一次深入的颂钵与神谕梳理。',
      meetingLink: 'https://meeting.soulscape.app/room/su-demo-928'
    }
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Audio Player State & Web Audio Oscillator Synth
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 300,
    volume: 0.75,
    isSynthesized: false
  });

  const [meditationTimer, setMeditationTimer] = useState<MeditationTimerState | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<any>(null);
  const meditationIntervalRef = useRef<any>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const storedRole = localStorage.getItem(`${STORAGE_KEY_PREFIX}role`) as UserRole;
      if (storedRole && DEMO_USERS[storedRole]) {
        setRole(storedRole);
        setUser(DEMO_USERS[storedRole]);
      }
      const storedLocale = localStorage.getItem(`${STORAGE_KEY_PREFIX}locale`) as Locale;
      if (storedLocale) setLocaleState(storedLocale);

      const storedUser = localStorage.getItem(`${STORAGE_KEY_PREFIX}user`);
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedCredits = localStorage.getItem(`${STORAGE_KEY_PREFIX}credits`);
      if (storedCredits !== null) setCredits(Number(storedCredits));

      const storedTransactions = localStorage.getItem(`${STORAGE_KEY_PREFIX}transactions`);
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));

      const storedReadings = localStorage.getItem(`${STORAGE_KEY_PREFIX}readings`);
      if (storedReadings) setReadings(JSON.parse(storedReadings));

      const storedFavorites = localStorage.getItem(`${STORAGE_KEY_PREFIX}favorites`);
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

      const storedBookings = localStorage.getItem(`${STORAGE_KEY_PREFIX}bookings`);
      if (storedBookings) setMentorBookings(JSON.parse(storedBookings));

      const storedJourneyProg = localStorage.getItem(`${STORAGE_KEY_PREFIX}journey_progress`);
      if (storedJourneyProg) setJourneyProgress(JSON.parse(storedJourneyProg));

      const storedJourneyComp = localStorage.getItem(`${STORAGE_KEY_PREFIX}journey_completed`);
      if (storedJourneyComp) setJourneyCompleted(JSON.parse(storedJourneyComp));

      const storedTiers = localStorage.getItem(`${STORAGE_KEY_PREFIX}membership_tiers`);
      if (storedTiers) setMembershipTiers(JSON.parse(storedTiers));

      const storedPacks = localStorage.getItem(`${STORAGE_KEY_PREFIX}credit_packs`);
      if (storedPacks) setCreditPacks(JSON.parse(storedPacks));

      const storedJourneys = localStorage.getItem(`${STORAGE_KEY_PREFIX}guided_journeys`);
      if (storedJourneys) setGuidedJourneys(JSON.parse(storedJourneys));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Save changes to localStorage
  const saveState = (key: string, val: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, typeof val === 'string' ? val : JSON.stringify(val));
      } catch (e) {
        console.warn('LocalStorage save error', e);
      }
    }
  };

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    saveState('locale', l);
    showToast(
      l === 'zh' ? '界面语言已切换为 简体中文' : 'Language switched to English',
      undefined,
      'info'
    );
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEMO_USERS[newRole]);
    saveState('role', newRole);
    saveState('user', DEMO_USERS[newRole]);
    showToast(
      locale === 'zh' ? `已切换至演示身份：${DEMO_USERS[newRole].name}` : `Switched demo role: ${DEMO_USERS[newRole].name}`,
      locale === 'zh' ? '该角色拥有对应权限视图，无需真实凭据。' : 'This role provides corresponding portal view without real credentials.',
      'success'
    );
  };

  const updateInterests = (interests: string[]) => {
    const updatedUser = { ...user, interests };
    setUser(updatedUser);
    saveState('user', updatedUser);
    showToast(
      locale === 'zh' ? '兴趣偏好已更新，看板已同步推荐内容！' : 'Interests updated! Recommendations refreshed.',
      undefined,
      'success'
    );
  };

  const deductCredits = (amount: number, descriptionZh: string, descriptionEn: string, type: TransactionRecord['type']): boolean => {
    if (credits < amount) {
      showToast(
        locale === 'zh' ? '积分不足，无法完成本次操作' : 'Insufficient balance',
        locale === 'zh' ? `需要 ${amount} 积分，当前余额仅有 ${credits} 积分。可前往钱包充值。` : `Required: ${amount}, Current: ${credits}. You may top up in wallet.`,
        'error'
      );
      return false;
    }

    const newBalance = credits - amount;
    setCredits(newBalance);
    saveState('credits', newBalance);

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: user.id,
      userName: user.name,
      type,
      amountCredits: -amount,
      status: 'success',
      descriptionZh,
      descriptionEn
    };

    const updatedTxList = [newTx, ...transactions];
    setTransactions(updatedTxList);
    saveState('transactions', updatedTxList);

    return true;
  };

  const addCredits = (amount: number, descriptionZh: string, descriptionEn: string, cashRmb?: number) => {
    const newBalance = credits + amount;
    setCredits(newBalance);
    saveState('credits', newBalance);

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: user.id,
      userName: user.name,
      type: 'credit_purchase',
      amountCredits: amount,
      cashAmountRmb: cashRmb,
      status: 'success',
      descriptionZh,
      descriptionEn
    };

    const updatedTxList = [newTx, ...transactions];
    setTransactions(updatedTxList);
    saveState('transactions', updatedTxList);

    showToast(
      locale === 'zh' ? `成功增加 ${amount} 觉知积分！` : `Successfully added ${amount} credits!`,
      locale === 'zh' ? `当前可用余额：${newBalance} 积分` : `Current balance: ${newBalance} credits`,
      'success'
    );
  };

  const addReadingRecord = (record: CardReadingRecord) => {
    const updated = [record, ...readings];
    setReadings(updated);
    saveState('readings', updated);
  };

  const addBooking = async (bookingData: Omit<MentorBooking, 'id' | 'status'>): Promise<string> => {
    const id = `bk-${Date.now()}`;
    const newBooking: MentorBooking = {
      ...bookingData,
      id,
      status: 'confirmed',
      meetingLink: `https://meeting.soulscape.app/room/m-${Math.random().toString(36).substring(2, 8)}`
    };
    const updated = [newBooking, ...mentorBookings];
    setMentorBookings(updated);
    saveState('bookings', updated);
    return id;
  };

  const updateBookingStatus = (id: string, status: MentorBooking['status']) => {
    const updated = mentorBookings.map(b => b.id === id ? { ...b, status } : b);
    setMentorBookings(updated);
    saveState('bookings', updated);
    showToast(
      locale === 'zh' ? `预约状态已更新为：${status.toUpperCase()}` : `Booking status updated: ${status.toUpperCase()}`,
      undefined,
      'info'
    );
  };

  const updateJourneyStep = (journeyId: string, stepIndex: number, isComplete = false) => {
    const newProg = { ...journeyProgress, [journeyId]: stepIndex };
    setJourneyProgress(newProg);
    saveState('journey_progress', newProg);

    if (isComplete) {
      const newComp = { ...journeyCompleted, [journeyId]: true };
      setJourneyCompleted(newComp);
      saveState('journey_completed', newComp);
    }
  };

  const addGuidedJourney = (journey: GuidedJourney) => {
    const updated = [journey, ...guidedJourneys];
    setGuidedJourneys(updated);
    saveState('guided_journeys', updated);
    showToast(
      locale === 'zh' ? `成功创建修行之旅《${journey.titleZh}》！` : `Created Journey: ${journey.titleEn}`,
      locale === 'zh' ? '全平台探索者均可在修行专区浏览此流程。' : 'Now live for seekers in Guided Journeys.',
      'success'
    );
  };

  const updateTierPricing = (id: string, monthly: number, annual: number) => {
    const updated = membershipTiers.map(t => t.id === id ? { ...t, priceMonthlyRmb: monthly, priceAnnualRmb: annual } : t);
    setMembershipTiers(updated);
    saveState('membership_tiers', updated);
    showToast(
      locale === 'zh' ? '会籍定价已实时更新并同步至前台！' : 'Membership pricing updated globally!',
      undefined,
      'success'
    );
  };

  const updateCreditPack = (id: string, price: number, creditsAmount: number) => {
    const updated = creditPacks.map(p => p.id === id ? { ...p, priceRmb: price, credits: creditsAmount } : p);
    setCreditPacks(updated);
    saveState('credit_packs', updated);
    showToast(
      locale === 'zh' ? '能量包定价已实时更新！' : 'Credit pack updated globally!',
      undefined,
      'success'
    );
  };

  const toggleFavorite = (type: 'cards' | 'tracks' | 'mentors' | 'articles', id: string | number) => {
    setFavorites(prev => {
      const list = prev[type] as any[];
      const exists = list.includes(id);
      const updatedList = exists ? list.filter(item => item !== id) : [...list, id];
      const updatedFavorites = { ...prev, [type]: updatedList };
      saveState('favorites', updatedFavorites);
      showToast(
        exists 
          ? (locale === 'zh' ? '已从收藏夹移除' : 'Removed from favorites') 
          : (locale === 'zh' ? '已成功收藏到个人库' : 'Added to favorites'),
        undefined,
        'info'
      );
      return updatedFavorites;
    });
  };

  const resetDemoState = () => {
    localStorage.clear();
    setRole('member');
    setUser(DEMO_USERS.member);
    setCredits(100);
    setTransactions(SEED_TRANSACTIONS);
    setReadings(SEED_READING_HISTORIES);
    setMembershipTiers(DEMO_MEMBERSHIP_TIERS);
    setCreditPacks(DEMO_CREDIT_PACKS);
    setGuidedJourneys(SEED_JOURNEYS);
    setJourneyProgress({ 'journey-morning': 2 });
    setJourneyCompleted({});
    setFavorites({
      cards: [1, 22, 34],
      tracks: ['music-1', 'music-4'],
      mentors: ['mentor-1', 'mentor-3'],
      articles: ['art-1', 'art-3']
    });
    stopSynthAudio();
    cancelMeditationTimer();
    setAudioPlayer({
      currentTrack: null,
      isPlaying: false,
      progress: 0,
      duration: 300,
      volume: 0.75,
      isSynthesized: false
    });
    showToast(
      locale === 'zh' ? '演示数据已重置为初始状态 (100积分)' : 'Demo data reset to initial state (100 Credits)',
      locale === 'zh' ? '所有模拟记录已恢复官方预置。' : 'All state restored to default seeds.',
      'info'
    );
  };

  // Tibetan Bell Chime Sound Generator via Web Audio API
  const playBellChime = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Sacred 528Hz base chime with gentle harmonic overtone (1056Hz)
      const freqs = [528, 1056, 1584];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const peakGain = (0.15 / (idx + 1)) * audioPlayer.volume;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5 + idx);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 4 + idx);
      });
    } catch (e) {
      console.warn('Bell chime synthesis notice', e);
    }
  };

  // Meditation Timer Controller
  const startMeditationTimer = (minutes: number) => {
    if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
    const targetSeconds = minutes * 60;
    setMeditationTimer({
      active: true,
      minutes,
      remainingSeconds: targetSeconds
    });

    playBellChime();
    showToast(
      locale === 'zh' ? `已启动 ${minutes} 分钟静心冥想计时器` : `Started ${minutes}-min meditation timer`,
      locale === 'zh' ? '钟声已敲响，请专注于呼吸…' : 'Focus on your breath…',
      'info'
    );

    meditationIntervalRef.current = setInterval(() => {
      setMeditationTimer(prev => {
        if (!prev) return null;
        if (prev.remainingSeconds <= 1) {
          clearInterval(meditationIntervalRef.current);
          playBellChime();
          showToast(
            locale === 'zh' ? '✨ 静心冥想完成！愿身心保持平静与觉察' : '✨ Meditation Completed!',
            undefined,
            'success'
          );
          return null;
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);
  };

  const cancelMeditationTimer = () => {
    if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
    setMeditationTimer(null);
  };

  // Web Audio Synthetic Soothing Ambient Generator
  const startSynthAudio = (track: MusicTrack) => {
    try {
      if (typeof window === 'undefined') return;
      stopSynthAudio();

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const baseFreq = track.binauralBaseHz || track.frequencyHz || 432;
      const beatFreq = track.binauralBeatHz || 5;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Binaural beat frequencies
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(Math.min(0.12 * audioPlayer.volume, 0.15), ctx.currentTime + 3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn('Web Audio synthesis not started (user gesture required)', e);
    }
  };

  const stopSynthAudio = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          osc1Ref.current?.disconnect();
          osc2Ref.current?.disconnect();
          audioCtxRef.current?.close();
        } catch {}
        osc1Ref.current = null;
        osc2Ref.current = null;
        audioCtxRef.current = null;
        gainNodeRef.current = null;
      }, 600);
    } catch {}
  };

  const playTrack = (track: MusicTrack) => {
    startSynthAudio(track);
    setAudioPlayer({
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      duration: track.durationSeconds || 360,
      volume: audioPlayer.volume,
      isSynthesized: true
    });
    showToast(
      locale === 'zh' ? `正在播放：${track.titleZh}` : `Now Playing: ${track.titleEn}`,
      locale === 'zh' ? `调频至 ${track.frequencyHz || 432}Hz 真实双耳声波` : `Tuned to ${track.frequencyHz || 432}Hz via Web Audio Synth`,
      'info'
    );
  };

  const pauseTrack = () => {
    stopSynthAudio();
    setAudioPlayer(prev => ({ ...prev, isPlaying: false }));
  };

  const togglePlay = () => {
    if (!audioPlayer.currentTrack) {
      playTrack(SEED_MUSIC_TRACKS[0]);
      return;
    }
    if (audioPlayer.isPlaying) {
      pauseTrack();
    } else {
      startSynthAudio(audioPlayer.currentTrack);
      setAudioPlayer(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const seekTrack = (seconds: number) => {
    setAudioPlayer(prev => ({ ...prev, progress: Math.min(seconds, prev.duration) }));
  };

  const setVolume = (volume: number) => {
    setAudioPlayer(prev => ({ ...prev, volume }));
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(Math.min(0.15 * volume, 0.2), audioCtxRef.current.currentTime);
    }
  };

  // Timer loop for audio progress
  useEffect(() => {
    if (audioPlayer.isPlaying) {
      timerRef.current = setInterval(() => {
        setAudioPlayer(prev => {
          if (prev.progress >= prev.duration) {
            stopSynthAudio();
            return { ...prev, isPlaying: false, progress: 0 };
          }
          return { ...prev, progress: prev.progress + 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [audioPlayer.isPlaying]);

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        locale,
        setLocale,
        switchRole,
        credits,
        transactions,
        readings,
        favorites,
        journeyProgress,
        journeyCompleted,
        guidedJourneys,
        mentorBookings,
        membershipTiers,
        creditPacks,
        audioPlayer,
        meditationTimer,
        toasts,
        showToast,
        dismissToast,
        deductCredits,
        addCredits,
        addReadingRecord,
        addBooking,
        updateBookingStatus,
        updateJourneyStep,
        addGuidedJourney,
        toggleFavorite,
        updateInterests,
        updateTierPricing,
        updateCreditPack,
        resetDemoState,
        playTrack,
        pauseTrack,
        togglePlay,
        seekTrack,
        setVolume,
        playBellChime,
        startMeditationTimer,
        cancelMeditationTimer
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
