'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SEED_COURSES } from '@/data/seedData';
import { Course, CourseModule } from '@/types';
import Link from 'next/link';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Star, 
  Users, 
  Play, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function CoursesPage() {
  const { locale, credits, deductCredits, showToast } = useApp();
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['course-1']);
  const [completedModules, setCompletedModules] = useState<string[]>(['c1-m1']);

  const handleEnroll = (course: Course) => {
    if (enrolledCourses.includes(course.id)) return;

    const ok = deductCredits(
      course.creditsRequired,
      `订阅课程《${course.titleZh}》`,
      `Enrolled in ${course.titleEn}`,
      'course_enroll'
    );
    if (!ok) return;

    setEnrolledCourses([...enrolledCourses, course.id]);
    showToast(
      locale === 'zh' ? `成功解锁《${course.titleZh}》！` : `Enrolled in ${course.titleEn}!`,
      locale === 'zh' ? '所有讲义与冥想练习已开放学习。' : 'All modules are now accessible.',
      'success'
    );
  };

  const toggleModuleComplete = (modId: string) => {
    if (completedModules.includes(modId)) {
      setCompletedModules(completedModules.filter(id => id !== modId));
    } else {
      setCompletedModules([...completedModules, modId]);
      showToast(
        locale === 'zh' ? '完成一小节学习！' : 'Module completed!',
        locale === 'zh' ? '保持觉知微习惯，稳步精进。' : 'Great progress on your mindful journey.',
        'info'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-sage-600" />
          <span>{locale === 'zh' ? '大师系统进阶 · 修习课程' : 'Master Courses & Practicums'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
          {locale === 'zh' ? '结构化身心精进 · 从理解到实证' : 'Structured Master Pathways'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 font-light">
          {locale === 'zh'
            ? '融合视频精讲、声波音频导引、体感实操与每日静思，系统掌握觉知自我疗愈之道。'
            : 'Multi-module curriculums combining instructional video, somatic exercises, and audio meditation.'}
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {SEED_COURSES.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id);
          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-ivory-200 shadow-soft hover:shadow-soft-lg transition-all card-hover-lift flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-full h-40 rounded-2xl p-4 flex flex-col justify-between text-white shadow-inner mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${course.coverGradient[0]} 0%, ${course.coverGradient[1]} 100%)`
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-[10px] font-mono">
                      {locale === 'zh' ? course.levelZh : course.levelEn}
                    </span>
                    <span className="text-xs font-bold text-gold-300">★ {course.rating}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-ivory-200">
                      {course.lessonsCount} {locale === 'zh' ? '节系统讲义' : 'Lessons'} · {course.totalHours} {locale === 'zh' ? '课时' : 'Hours'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-sage-700 font-medium mb-1">
                  <span>{course.mentorName}</span>
                </div>

                <h3 className="font-serif font-bold text-charcoal-900 text-lg mb-2 leading-snug">
                  {locale === 'zh' ? course.titleZh : course.titleEn}
                </h3>

                <p className="text-xs text-charcoal-500 font-light leading-relaxed mb-6">
                  {locale === 'zh' ? course.subtitleZh : course.subtitleEn}
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-lg text-charcoal-900">
                    {course.creditsRequired}
                  </span>
                  <span className="text-xs text-charcoal-400"> {locale === 'zh' ? '积分' : 'pts'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCourse(course)}
                    className="px-3.5 py-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 text-xs font-medium border border-ivory-300 transition-colors"
                  >
                    {locale === 'zh' ? '课程大纲' : 'Syllabus'}
                  </button>

                  <button
                    onClick={() => {
                      if (isEnrolled) {
                        setActiveCourse(course);
                      } else {
                        handleEnroll(course);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-soft transition-all ${
                      isEnrolled
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-sage-600 text-white hover:bg-sage-700'
                    }`}
                  >
                    {isEnrolled ? (locale === 'zh' ? '继续修习' : 'Resume') : (locale === 'zh' ? '立即解锁' : 'Enroll')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* COURSE SYLLABUS MODAL */}
      {activeCourse && (
        <div
          onClick={() => setActiveCourse(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-ivory-300 shadow-soft-xl max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <div>
                <span className="text-xs font-semibold text-sage-700">
                  {activeCourse.mentorName}
                </span>
                <h3 className="font-serif font-bold text-charcoal-900 text-lg">
                  {locale === 'zh' ? activeCourse.titleZh : activeCourse.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="p-1 rounded-lg text-charcoal-400 hover:bg-ivory-100 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider">
                {locale === 'zh' ? '课程模块大纲与修习进度' : 'Curriculum Modules'}
              </h4>

              {activeCourse.modules.map((mod, idx) => {
                const isCompleted = completedModules.includes(mod.id);
                const isUnlocked = enrolledCourses.includes(activeCourse.id);

                return (
                  <div
                    key={mod.id}
                    className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between transition-colors ${
                      isCompleted ? 'bg-emerald-50/60 border-emerald-200' : 'bg-ivory-50/50 border-ivory-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-ivory-200 text-charcoal-700 flex items-center justify-center font-mono font-bold text-[11px] flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-charcoal-900 truncate">
                          {locale === 'zh' ? mod.titleZh : mod.titleEn}
                        </p>
                        <p className="text-[10px] text-charcoal-400 mt-0.5">
                          {mod.type.toUpperCase()} · {mod.durationMinutes} {locale === 'zh' ? '分钟' : 'mins'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isUnlocked ? (
                        <button
                          onClick={() => toggleModuleComplete(mod.id)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-ivory-200 text-charcoal-700 hover:bg-sage-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isCompleted ? (locale === 'zh' ? '已完成' : 'Done') : (locale === 'zh' ? '打卡' : 'Mark Done')}</span>
                        </button>
                      ) : (
                        <Lock className="w-4 h-4 text-charcoal-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
              <span className="text-xs text-charcoal-500">
                {enrolledCourses.includes(activeCourse.id)
                  ? (locale === 'zh' ? '✓ 本课程已解锁并永久生效' : 'Unlocked')
                  : (locale === 'zh' ? `解锁需消耗 ${activeCourse.creditsRequired} 积分` : `Requires ${activeCourse.creditsRequired} pts`)}
              </span>

              {!enrolledCourses.includes(activeCourse.id) && (
                <button
                  onClick={() => handleEnroll(activeCourse)}
                  className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft"
                >
                  {locale === 'zh' ? '立即消耗积分并解锁' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
