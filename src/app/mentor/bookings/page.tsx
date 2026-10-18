'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, CheckCircle2, XCircle, Video, Search } from 'lucide-react';

export default function MentorBookingsPage() {
  const { locale, mentorBookings, showToast, updateBookingStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = mentorBookings.filter(b => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-charcoal-900">
            {locale === 'zh' ? '1对1 个案预约日程与排班' : 'Consultation Appointments'}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {locale === 'zh' ? '管理来访者的深度个案排期，在线发起端到端加密音视频会面。' : 'Manage your upcoming sessions and patient history.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'confirmed', 'completed', 'cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filterStatus === st ? 'bg-sage-600 text-white' : 'bg-white border border-ivory-200 text-charcoal-700'
              }`}
            >
              {st === 'all' 
                ? (locale === 'zh' ? '全部' : 'All')
                : st === 'confirmed' 
                  ? (locale === 'zh' ? '待进行' : 'Confirmed')
                  : st === 'completed'
                    ? (locale === 'zh' ? '已完成' : 'Completed')
                    : (locale === 'zh' ? '已取消' : 'Cancelled')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-ivory-300 shadow-soft overflow-hidden divide-y divide-ivory-200">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400 text-xs">
            {locale === 'zh' ? '暂无匹配的预约记录' : 'No bookings found.'}
          </div>
        ) : (
          filtered.map(bk => (
            <div key={bk.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-charcoal-900">{bk.userName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    {bk.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-charcoal-400 font-mono">ID: {bk.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal-500 font-mono">
                  <Clock className="w-3.5 h-3.5 text-sage-600" />
                  <span>{bk.timeSlot}</span>
                </div>
                {bk.notes && (
                  <p className="text-xs text-charcoal-600 bg-ivory-50 p-2.5 rounded-xl border border-ivory-200 mt-2 font-light italic">
                    来访者留言：“{bk.notes}”
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                <span className="text-xs font-semibold text-charcoal-900 font-serif mr-1">+{bk.creditsPaid} 积分</span>
                
                {bk.status === 'confirmed' && (
                  <>
                    <a
                      href={bk.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft flex items-center gap-1.5 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{locale === 'zh' ? '进入视频室' : 'Join Room'}</span>
                    </a>
                    
                    <button
                      onClick={() => updateBookingStatus(bk.id, 'completed')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                      title={locale === 'zh' ? '标记个案已顺利完成' : 'Mark Completed'}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{locale === 'zh' ? '标记完成' : 'Complete'}</span>
                    </button>

                    <button
                      onClick={() => updateBookingStatus(bk.id, 'cancelled')}
                      className="px-2.5 py-1.5 rounded-xl bg-ivory-100 hover:bg-rose-50 text-charcoal-500 hover:text-rose-700 border border-ivory-200 text-xs font-medium transition-colors"
                      title={locale === 'zh' ? '取消并退回积分' : 'Cancel Session'}
                    >
                      <span>{locale === 'zh' ? '取消' : 'Cancel'}</span>
                    </button>
                  </>
                )}

                {bk.status === 'completed' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{locale === 'zh' ? '个案已圆满交付' : 'Completed'}</span>
                  </span>
                )}

                {bk.status === 'cancelled' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{locale === 'zh' ? '已取消并退款' : 'Cancelled & Refunded'}</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
