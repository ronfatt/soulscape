'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SEED_MENTORS, SEED_COURSES } from '@/data/seedData';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Calendar, CheckCircle2, Heart, Sparkles, GraduationCap } from 'lucide-react';

export default function MentorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, credits, deductCredits, addBooking, showToast, favorites, toggleFavorite } = useApp();

  const id = params?.id as string;
  const mentor = SEED_MENTORS.find(m => m.id === id) || SEED_MENTORS[0];
  const isFav = favorites.mentors.includes(mentor.id);
  const featuredCourse = SEED_COURSES.find(c => c.id === mentor.featuredCourseId);

  const [selectedSlot, setSelectedSlot] = useState<string>(mentor.availableSlots[0] || '');
  const [consultNotes, setConsultNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBook = async () => {
    if (!selectedSlot) {
      showToast(locale === 'zh' ? '请选择一个时间段' : 'Please select a slot', undefined, 'error');
      return;
    }
    const ok = deductCredits(
      mentor.hourlyRateCredits,
      `预约 ${mentor.nameZh} 1对1 咨询`,
      `Booked 1-on-1 session with ${mentor.nameEn}`,
      'mentor_booking'
    );
    if (!ok) return;

    setIsSubmitting(true);
    await addBooking({
      mentorId: mentor.id,
      mentorName: locale === 'zh' ? mentor.nameZh : mentor.nameEn,
      userId: 'user-member-demo',
      userName: '林若尘 (演示会员)',
      userEmail: 'seeker@soulscape.app',
      date: selectedSlot.split(' ')[0] || '2026-10-22',
      timeSlot: selectedSlot,
      creditsPaid: mentor.hourlyRateCredits,
      notes: consultNotes
    });
    setIsSubmitting(false);
    showToast(locale === 'zh' ? '预约成功！已收录至您的会员看板日程。' : 'Consultation Confirmed!', undefined, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            { labelZh: '觉知导师名录', labelEn: 'Mentors', href: '/mentors' },
            { labelZh: `${mentor.nameZh} · ${mentor.titleZh}`, labelEn: `${mentor.nameEn}` }
          ]}
        />
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'zh' ? '返回导师列表' : 'Back'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-300 shadow-soft-xl space-y-8">
        {/* Mentor Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-ivory-200">
          <div className="flex items-center gap-5">
            <img
              src={mentor.avatar}
              alt={mentor.nameZh}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-sage-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1 text-xs text-gold-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
                  <span>{mentor.rating}</span>
                </div>
                <span className="text-xs text-charcoal-400">({mentor.reviewCount} 条评价)</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                {locale === 'zh' ? mentor.nameZh : mentor.nameEn}
              </h1>
              <p className="text-xs text-sage-700 font-medium mt-0.5">
                {locale === 'zh' ? mentor.titleZh : mentor.titleEn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite('mentors', mentor.id)}
              className={`p-3 rounded-2xl border transition-colors ${
                isFav ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-ivory-100 border-ivory-200 text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-3 text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
          <h3 className="font-serif font-bold text-charcoal-900 text-base">
            {locale === 'zh' ? '导师履历与觉知背景' : 'Practitioner Background'}
          </h3>
          <p>{locale === 'zh' ? mentor.bioZh : mentor.bioEn}</p>
        </div>

        {/* Expertise tags */}
        <div>
          <h4 className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-2">
            {locale === 'zh' ? '专业擅长领域' : 'Specialized Modalities'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {(locale === 'zh' ? mentor.expertiseZh : mentor.expertiseEn).map((exp, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-xl bg-sage-50 text-sage-800 text-xs font-medium border border-sage-200"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Booking Module */}
        <div className="p-6 rounded-3xl bg-ivory-50/70 border border-ivory-300 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-charcoal-900 text-base">
              {locale === 'zh' ? '预约 1对1 咨询档期' : 'Schedule 1-on-1 Consultation'}
            </h3>
            <span className="font-serif font-bold text-base text-charcoal-900">
              {mentor.hourlyRateCredits} <span className="text-xs text-charcoal-500 font-sans font-normal">{locale === 'zh' ? '积分/时' : 'pts'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mentor.availableSlots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                  selectedSlot === slot
                    ? 'border-sage-500 bg-sage-100 text-sage-900 shadow-xs'
                    : 'border-ivory-200 bg-white text-charcoal-700 hover:bg-ivory-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-sage-600" />
                  <span>{slot}</span>
                </div>
                <span className="text-[10px] text-charcoal-400 font-normal">
                  {selectedSlot === slot ? '已选中' : '可预约'}
                </span>
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            value={consultNotes}
            onChange={(e) => setConsultNotes(e.target.value)}
            placeholder={locale === 'zh' ? '在此填写你想探讨的议题或身心困扰…' : 'Share your inquiry context…'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-sage-400"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-charcoal-500">
              {locale === 'zh' ? `钱包余额：${credits} 积分` : `Balance: ${credits} pts`}
            </span>
            <button
              onClick={handleBook}
              disabled={isSubmitting || credits < mentor.hourlyRateCredits}
              className="px-6 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 disabled:opacity-50 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSubmitting ? (locale === 'zh' ? '预约中…' : 'Processing…') : (locale === 'zh' ? '确认预约 (扣除积分)' : 'Confirm Booking')}</span>
            </button>
          </div>
        </div>

        {/* Featured Course if available */}
        {featuredCourse && (
          <div className="p-5 rounded-2xl bg-white border border-ivory-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-sage-700 uppercase">
                  {locale === 'zh' ? '导师主讲课程' : 'Master Course by Mentor'}
                </span>
                <h4 className="font-serif font-bold text-charcoal-900 text-sm">
                  {locale === 'zh' ? featuredCourse.titleZh : featuredCourse.titleEn}
                </h4>
              </div>
            </div>
            <Link
              href="/courses"
              className="px-4 py-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 text-xs font-medium"
            >
              {locale === 'zh' ? '查看课程' : 'View Course'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
