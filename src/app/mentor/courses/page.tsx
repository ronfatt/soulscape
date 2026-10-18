'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_COURSES } from '@/data/seedData';
import { GraduationCap, Users, Star, Clock, BookOpen } from 'lucide-react';

export default function MentorCoursesPage() {
  const { locale } = useApp();
  const mentorCourse = SEED_COURSES[0]; // Tibetan Sound Bowls

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '主讲课程与学员修习动态' : 'Master Courses & Students'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '查看你主讲的体系化声疗课程、讲义完课率及学员评价反馈。' : 'Track course completions, ratings, and active student enrollment.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
          <div>
            <span className="text-xs text-sage-700 font-semibold uppercase">认证主讲课程</span>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-0.5">
              {mentorCourse.titleZh}
            </h3>
            <p className="text-xs text-charcoal-500">{mentorCourse.subtitleZh}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
            正式开课中
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
            <span className="text-charcoal-400 block text-[10px]">累计学员人数</span>
            <strong className="text-xl font-serif text-charcoal-900">{mentorCourse.studentsCount} 人</strong>
          </div>
          <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
            <span className="text-charcoal-400 block text-[10px]">综合学员评分</span>
            <strong className="text-xl font-serif text-gold-600">★ {mentorCourse.rating}</strong>
          </div>
          <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
            <span className="text-charcoal-400 block text-[10px]">全套课时数</span>
            <strong className="text-xl font-serif text-charcoal-900">{mentorCourse.lessonsCount} 节</strong>
          </div>
          <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
            <span className="text-charcoal-400 block text-[10px]">课程定价</span>
            <strong className="text-xl font-serif text-charcoal-900">{mentorCourse.creditsRequired} 积分</strong>
          </div>
        </div>

        {/* Modules breakdown */}
        <div>
          <h4 className="font-semibold text-xs text-charcoal-800 uppercase tracking-wider mb-3">
            讲义模块大纲 ({mentorCourse.modules.length} 讲)
          </h4>
          <div className="space-y-2">
            {mentorCourse.modules.map((m, idx) => (
              <div key={m.id} className="p-3 rounded-xl bg-ivory-50/50 border border-ivory-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-charcoal-400 font-bold">#{idx + 1}</span>
                  <span className="font-medium text-charcoal-900">{m.titleZh}</span>
                </div>
                <span className="text-charcoal-400 font-mono text-[11px]">{m.durationMinutes} 分钟</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
