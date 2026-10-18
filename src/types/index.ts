export type UserRole = 'member' | 'mentor' | 'admin' | 'investor';
export type Locale = 'zh' | 'en';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  membershipTier: 'free' | 'premium' | 'patron';
  interests: string[];
  joinedDate: string;
  mentorId?: string;
}

export type ChakraType = 'root' | 'sacral' | 'solar_plexus' | 'heart' | 'throat' | 'third_eye' | 'crown';

export interface ChakraInfo {
  id: ChakraType;
  index: number;
  nameZh: string;
  nameEn: string;
  sanskrit: string;
  element: string;
  color: string;
  hexColor: string;
  bgGradient: string;
  seedMantra: string;
  frequency: number; // Hz
  locationZh: string;
  locationEn: string;
  balancedZh: string;
  balancedEn: string;
  blockedZh: string;
  blockedEn: string;
  affirmationZh: string;
  affirmationEn: string;
  descriptionZh: string;
  descriptionEn: string;
  recommendedTrackId: string;
  relatedCardIds: number[];
}

export interface OracleCard {
  id: number;
  number: number;
  nameZh: string;
  nameEn: string;
  realmZh: string;
  realmEn: string;
  chakra: ChakraType;
  keywordsZh: string[];
  keywordsEn: string[];
  symbolismZh: string;
  symbolismEn: string;
  lightMeaningZh: string;
  lightMeaningEn: string;
  shadowMeaningZh: string;
  shadowMeaningEn: string;
  reflectionPromptZh: string;
  reflectionPromptEn: string;
  element: 'earth' | 'water' | 'fire' | 'air' | 'ether' | 'light' | 'cosmos';
  gradient: [string, string, string]; // 3-stop artistic gradient
  glyph: string; // SVG icon name / unicode symbol
  relatedMusicTag: string;
}

export interface CardDeck {
  id: string;
  nameZh: string;
  nameEn: string;
  descriptionZh: string;
  descriptionEn: string;
  totalCards: number;
  authorZh: string;
  authorEn: string;
  version: string;
  isOfficial: boolean;
  coverGradient: [string, string];
}

export interface CardReadingRecord {
  id: string;
  timestamp: string;
  type: 'one_card' | 'three_card';
  questionZh: string;
  questionEn: string;
  cards: {
    card: OracleCard;
    positionZh: string;
    positionEn: string;
    isReversed?: boolean;
  }[];
  aiSynthesisZh: string;
  aiSynthesisEn: string;
  recommendedTrackId?: string;
  journalNotes?: string;
  savedToFavorites?: boolean;
}

export interface MusicTrack {
  id: string;
  titleZh: string;
  titleEn: string;
  artistZh: string;
  artistEn: string;
  chakra?: ChakraType;
  frequencyHz?: number;
  durationSeconds: number;
  tagsZh: string[];
  tagsEn: string[];
  category: 'calm' | 'focus' | 'meditation' | 'sleep';
  audioUrl?: string; // or simulated synthetic binaural generator
  coverColor: string;
  binauralBaseHz?: number;
  binauralBeatHz?: number;
  playsCount: number;
}

export interface Playlist {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  category: 'calm' | 'focus' | 'meditation' | 'sleep';
  trackIds: string[];
  coverGradient: [string, string];
}

export interface Mentor {
  id: string;
  nameZh: string;
  nameEn: string;
  titleZh: string;
  titleEn: string;
  avatar: string;
  bioZh: string;
  bioEn: string;
  expertiseZh: string[];
  expertiseEn: string[];
  rating: number;
  reviewCount: number;
  hourlyRateCredits: number;
  sessionsCompleted: number;
  languages: string[];
  availableSlots: string[];
  featuredCourseId?: string;
  socialLink?: string;
}

export interface MentorBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  creditsPaid: number;
  notes?: string;
  meetingLink?: string;
}

export interface KnowledgeArticle {
  id: string;
  titleZh: string;
  titleEn: string;
  excerptZh: string;
  excerptEn: string;
  contentZh: string;
  contentEn: string;
  categoryZh: string;
  categoryEn: string;
  readTimeMinutes: number;
  authorZh: string;
  authorEn: string;
  publishDate: string;
  tagsZh: string[];
  tagsEn: string[];
  relatedChakra?: ChakraType;
  views: number;
}

export interface CourseModule {
  id: string;
  titleZh: string;
  titleEn: string;
  durationMinutes: number;
  type: 'video' | 'audio' | 'reading' | 'practice';
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  mentorId: string;
  mentorName: string;
  levelZh: string;
  levelEn: string;
  creditsRequired: number;
  totalHours: number;
  lessonsCount: number;
  rating: number;
  studentsCount: number;
  modules: CourseModule[];
  coverGradient: [string, string];
}

export interface JourneyStep {
  stepIndex: number;
  type: 'intro' | 'audio' | 'card' | 'journal' | 'closing';
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn?: string;
  audioTrackId?: string;
  cardDrawn?: OracleCard;
  userJournalText?: string;
  durationSeconds?: number;
}

export interface GuidedJourney {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  durationEstimateZh: string;
  durationEstimateEn: string;
  theme: string;
  chakra: ChakraType;
  steps: JourneyStep[];
  badgeZh: string;
  badgeEn: string;
}

export interface TransactionRecord {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  type: 'credit_purchase' | 'card_reading' | 'extended_ai' | 'mentor_booking' | 'course_enroll' | 'bonus';
  amountCredits: number; // positive for topup/bonus, negative for spend
  cashAmountRmb?: number;
  status: 'success' | 'pending' | 'refunded';
  descriptionZh: string;
  descriptionEn: string;
  referenceId?: string;
}

export interface AIUsageMetrics {
  totalTokensMonth: number;
  estimatedCostUsd: number;
  totalQueries: number;
  averageResponseTimeMs: number;
  dailyQueries: { date: string; queries: number; cost: number }[];
  categoryBreakdown: { categoryZh: string; categoryEn: string; count: number }[];
}

export interface AdminKPIs {
  totalUsers: number;
  activeToday: number;
  totalMentors: number;
  monthlyRevenueRmb: number;
  creditsCirculating: number;
  readingsGenerated: number;
  totalAudioMinutesPlayed: number;
}
