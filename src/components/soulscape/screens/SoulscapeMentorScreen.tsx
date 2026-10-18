'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import SoulscapeHeader from '../SoulscapeHeader';
import SoulscapeTabs from '../SoulscapeTabs';
import SoulscapeInput from '../SoulscapeInput';
import SoulscapeMentorCard, { MentorData } from '../SoulscapeMentorCard';
import SoulscapeModal from '../SoulscapeModal';
import SoulscapeButton from '../SoulscapeButton';
import { Calendar, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SoulscapeMentorScreen: React.FC = () => {
  const { locale, addBooking, credits } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<MentorData | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const isZh = locale === 'zh';

  const filterTabs = [
    { id: 'all', label: isZh ? '全部導師' : 'All' },
    { id: 'astrology', label: isZh ? '占星靈性' : 'Astrology' },
    { id: 'coaching', label: isZh ? '人生教練' : 'Life Coaching' },
    { id: 'meditation', label: isZh ? '正念冥想' : 'Meditation' },
  ];

  const mentorsList: MentorData[] = [
    {
      id: 'm1',
      name: 'Serena Li',
      title: isZh ? '資深正念教練 · 榮格心理學' : 'Life Coach · Mindfulness',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewsCount: 320,
      languages: ['English', '中文'],
      priceMyr: 180,
      durationMinutes: 30,
    },
    {
      id: 'm2',
      name: 'Daniel Chen',
      title: isZh ? '頌缽音療導師 · 心理健康' : 'Meditation · Mental Health',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviewsCount: 260,
      languages: ['English', 'Français'],
      priceMyr: 150,
      durationMinutes: 30,
    },
    {
      id: 'm3',
      name: 'Amara Vance',
      title: isZh ? '神諭卡指引師 · 靈魂成長' : 'Tarot · Spiritual Growth',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewsCount: 180,
      languages: ['English', '中文'],
      priceMyr: 160,
      durationMinutes: 30,
    },
    {
      id: 'm4',
      name: 'Master Lin (林道長)',
      title: isZh ? '道家吐納內觀 · 脈輪平衡' : 'Daoist Breathwork & Qigong',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 410,
      languages: ['中文'],
      priceMyr: 220,
      durationMinutes: 45,
    },
  ];

  const filteredMentors = mentorsList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleConfirmBooking = () => {
    if (!selectedMentor) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMentor(null);
    }, 1500);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 01. Header */}
      <SoulscapeHeader
        mode="subpage"
        title={isZh ? '嚴選身心導師智庫' : 'Find Your Mentor'}
        subtitle={isZh ? '1對1 私密視訊諮詢 · 80/20 履約保障' : '1-on-1 private video consultations'}
      />

      <div className="px-4 sm:px-6 space-y-4">
        {/* 02. Search Bar */}
        <SoulscapeInput
          variant="search"
          placeholder={isZh ? '搜尋導師姓名、專業領域或語言...' : 'Search by name, specialty, language...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 03. Filter Tabs */}
        <SoulscapeTabs
          tabs={filterTabs}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />

        {/* 04. Mentor Cards List (Matching Screen 06) */}
        <div className="space-y-3 pt-1">
          {filteredMentors.map((mentor) => (
            <SoulscapeMentorCard
              key={mentor.id}
              mentor={mentor}
              onBook={(m) => setSelectedMentor(m)}
            />
          ))}
        </div>
      </div>

      {/* Booking Drawer / Bottom Sheet Modal */}
      <SoulscapeModal
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        title={isZh ? `預約 ${selectedMentor?.name} 導師` : `Book Session with ${selectedMentor?.name}`}
        subtitle={isZh ? '請確認預約時段與諮詢費用' : 'Confirm your consultation slot'}
      >
        {selectedMentor && (
          <div className="space-y-4">
            {bookingSuccess ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#332D2A]">
                  {isZh ? '預約成功！' : 'Booking Confirmed!'}
                </h4>
                <p className="text-xs text-[#736B66]">
                  {isZh ? '加密會議室連結已發送至您的信箱與個人看板' : 'Virtual meeting link has been generated.'}
                </p>
              </div>
            ) : (
              <>
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D9] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#B79A63]" />
                    <span className="font-medium text-[#332D2A]">
                      {isZh ? '明天 下午 03:00 - 03:30' : 'Tomorrow 03:00 PM - 03:30 PM'}
                    </span>
                  </div>
                  <span className="font-bold text-[#B79A63] text-sm">
                    RM {selectedMentor.priceMyr}
                  </span>
                </div>

                <div className="text-xs text-[#736B66] space-y-1 leading-relaxed">
                  <p>✦ 平台資金託管保障：諮詢完成確認後，系統向導師結算 80% 收益。</p>
                  <p>✦ 支持諮詢前 24 小時無條件取消全額退款。</p>
                </div>

                <SoulscapeButton
                  variant="gold"
                  size="md"
                  fullWidth
                  onClick={handleConfirmBooking}
                >
                  {isZh ? `確認預約並支付 RM ${selectedMentor.priceMyr}` : `Confirm & Book (RM ${selectedMentor.priceMyr})`}
                </SoulscapeButton>
              </>
            )}
          </div>
        )}
      </SoulscapeModal>
    </div>
  );
};

export default SoulscapeMentorScreen;
