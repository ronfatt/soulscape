'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BarChart3, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalyticsPage() {
  const { locale } = useApp();

  const userRetentionData = [
    { day: '次日留存', rate: 68 },
    { day: '3日留存', rate: 54 },
    { day: '7日留存', rate: 46 },
    { day: '14日留存', rate: 39 },
    { day: '30日留存', rate: 32 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '深度身心行为分析与留存大屏' : 'User Retention & Somatic Engagement Analytics'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '分析从单次抽牌向持续调频冥想、大师课订阅与高客单个案预约的转化漏斗。' : 'Conversion funnel metrics from daily free draw to recurring subscriptions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Retention Funnel Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4">
          <h3 className="font-serif font-bold text-charcoal-900 text-base">
            新用户觉知留存曲线 (Cohort Retention)
          </h3>
          <p className="text-xs text-charcoal-500 font-light">
            通过每日 0 积分单牌占读唤醒微习惯，30日留存率高达 32%（远超普通工具类产品 12% 均值）。
          </p>

          <div className="space-y-3 pt-2">
            {userRetentionData.map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs text-charcoal-700">
                  <span>{d.day}</span>
                  <span className="font-mono font-bold text-sage-800">{d.rate}%</span>
                </div>
                <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sage-600 h-full rounded-full"
                    style={{ width: `${d.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Metrics Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-charcoal-900 text-base mb-2">
              核心转化漏斗转化率
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex justify-between">
                <span>访问落地页 → 参与首抽</span>
                <strong className="text-emerald-700">72.4% (极高触达)</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex justify-between">
                <span>抽牌完毕 → 试听推荐调频音</span>
                <strong className="text-emerald-700">64.1% (音牌深度协同)</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex justify-between">
                <span>免费单牌 → 解锁20积分三牌阵</span>
                <strong className="text-charcoal-900">28.5% (充值转化)</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-ivory-200 flex justify-between">
                <span>深度用户 → 预约导师个案</span>
                <strong className="text-gold-700 font-bold">8.2% (高客单爆发)</strong>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sage-50/70 border border-sage-200 text-xs text-sage-900">
            📊 <strong>投资人看点：</strong>形成了极其健康的单用户经济模型 (Unit Economics)，高毛利数字资产有效稀释了导师服务的履约摩擦。
          </div>
        </div>
      </div>
    </div>
  );
}
