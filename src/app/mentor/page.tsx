'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_MENTORS, SEED_COURSES } from '@/data/seedData';
import Link from 'next/link';
import { 
  Users, 
  Star, 
  Calendar, 
  DollarSign, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function MentorDashboardPage() {
  const { locale, mentorBookings } = useApp();
  const mentor = SEED_MENTORS[0]; // Su Nianzhen

  return (
    <div className="space-y-8">
      {/* Mentor Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            {locale === 'zh' ? '累计完成个案咨询' : 'Sessions Completed'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-charcoal-900">{mentor.sessionsCompleted}</span>
            <span className="text-xs text-emerald-700 font-semibold">+18 本月</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            {locale === 'zh' ? '学员综合评分' : 'Average Rating'}
          </span>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-1 font-serif text-3xl font-bold text-charcoal-900">
              <Star className="w-5 h-5 text-gold-500 fill-gold-400" />
              <span>{mentor.rating}</span>
            </div>
            <span className="text-xs text-charcoal-400">{mentor.reviewCount} 条评价</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            {locale === 'zh' ? '本月预估分润积分' : 'Monthly Credits Earned'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-gold-600">3,420</span>
            <span className="text-xs text-charcoal-500">约 ¥2,736</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft">
          <span className="text-[10px] text-charcoal-400 uppercase font-semibold block mb-1">
            {locale === 'zh' ? '课程学员总数' : 'Total Course Students'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-charcoal-900">1,420</span>
            <span className="text-xs text-sage-700 font-semibold">颂钵大师课</span>
          </div>
        </div>
      </div>

      {/* Active Consultations List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sage-600" />
            <h3 className="font-serif font-bold text-charcoal-900 text-base">
              {locale === 'zh' ? '当前待履约个案预约' : 'Upcoming Consultations'}
            </h3>
          </div>
          <Link href="/mentor/bookings" className="text-xs text-sage-700 hover:underline">
            {locale === 'zh' ? '管理全部预约 →' : 'Manage Bookings →'}
          </Link>
        </div>

        <div className="space-y-3">
          {mentorBookings.map((bk) => (
            <div
              key={bk.id}
              className="p-4 rounded-2xl bg-ivory-50/60 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal-900 text-sm">{bk.userName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    {bk.status.toUpperCase()}
                  </span>
                  <span className="text-charcoal-500 font-mono text-[11px]">{bk.timeSlot}</span>
                </div>
                {bk.notes && (
                  <p className="text-charcoal-600 mt-1 italic font-light">
                    “{bk.notes}”
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="font-semibold text-charcoal-900 mr-2">+{bk.creditsPaid} 积分</span>
                <a
                  href={bk.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold transition-colors"
                >
                  {locale === 'zh' ? '进入视频室' : 'Join Room'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/mentor/content"
          className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft hover:shadow-soft-lg transition-all space-y-2 group"
        >
          <FileText className="w-5 h-5 text-sage-600" />
          <h4 className="font-serif font-bold text-charcoal-900 text-sm group-hover:text-sage-700">
            {locale === 'zh' ? '发布觉知专栏文稿' : 'Publish New Article'}
          </h4>
          <p className="text-xs text-charcoal-500 font-light">
            {locale === 'zh' ? '向全平台探索者分享你的身心前沿观察与案例' : 'Share clinical & contemplative insights.'}
          </p>
        </Link>

        <Link
          href="/mentor/cards"
          className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft hover:shadow-soft-lg transition-all space-y-2 group"
        >
          <Sparkles className="w-5 h-5 text-gold-500" />
          <h4 className="font-serif font-bold text-charcoal-900 text-sm group-hover:text-sage-700">
            {locale === 'zh' ? '88张神谕卡导师批注' : 'Card Commentaries'}
          </h4>
          <p className="text-xs text-charcoal-500 font-light">
            {locale === 'zh' ? '为卡牌撰写独门意象解析，增加学员投射指导' : 'Add custom archetypal commentaries.'}
          </p>
        </Link>

        <Link
          href="/mentor/earnings"
          className="p-5 rounded-3xl bg-white border border-ivory-200 shadow-soft hover:shadow-soft-lg transition-all space-y-2 group"
        >
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <h4 className="font-serif font-bold text-charcoal-900 text-sm group-hover:text-sage-700">
            {locale === 'zh' ? '收益对账与分成提现' : 'Earnings & Payouts'}
          </h4>
          <p className="text-xs text-charcoal-500 font-light">
            {locale === 'zh' ? '查看课酬、个案提成及分销推荐收益流水' : 'View session fees and course royalties.'}
          </p>
        </Link>
      </div>
    </div>
  );
}
