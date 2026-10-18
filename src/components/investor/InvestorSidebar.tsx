'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useInvestor, ScenarioPreset } from '@/context/InvestorContext';
import { 
  BarChart3, 
  Presentation, 
  Layers, 
  Calculator, 
  Users, 
  Cpu, 
  Filter, 
  Milestone, 
  Coins, 
  Compass, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  TrendingUp,
  Check
} from 'lucide-react';

export default function InvestorSidebar() {
  const pathname = usePathname();
  const { locale, setLocale } = useApp();
  const { 
    scenario, 
    setScenario, 
    resetScenario, 
    isFullscreen, 
    toggleFullscreen,
    startTour 
  } = useInvestor();

  const navItems = [
    {
      href: '/investor',
      exact: true,
      labelZh: '投资人驾驶舱',
      labelEn: 'Command Center',
      icon: BarChart3,
      badge: 'BI'
    },
    {
      href: '/investor/presentation',
      labelZh: '12页商业路演幻灯',
      labelEn: 'Pitch Presentation',
      icon: Presentation,
      badge: 'Pitch'
    },
    {
      href: '/investor/business-model',
      labelZh: '商业模式与飞轮',
      labelEn: 'Business Model',
      icon: Layers
    },
    {
      href: '/investor/revenue-simulator',
      labelZh: '实时财务测算引擎',
      labelEn: 'Revenue Simulator',
      icon: Calculator,
      badge: 'RM'
    },
    {
      href: '/investor/mentor-economy',
      labelZh: '导师生态与分润',
      labelEn: 'Mentor Economy',
      icon: Users
    },
    {
      href: '/investor/ai-costs',
      labelZh: 'AI 单元经济学',
      labelEn: 'AI Unit Economics',
      icon: Cpu
    },
    {
      href: '/investor/growth-funnel',
      labelZh: '用户增长转化漏斗',
      labelEn: 'Growth Funnel',
      icon: Filter
    },
    {
      href: '/investor/roadmap',
      labelZh: '战略研发路线图',
      labelEn: 'Product Roadmap',
      icon: Milestone
    },
    {
      href: '/investor/investment-plan',
      labelZh: '资本分配与跑道',
      labelEn: 'Capital Allocation',
      icon: Coins,
      badge: 'Seed'
    },
    {
      href: '/investor/demo-tour',
      labelZh: '12步引导路演导览',
      labelEn: '12-Step Guided Tour',
      icon: Compass,
      badge: 'Live'
    }
  ];

  const presets: { id: ScenarioPreset; labelZh: string; labelEn: string; color: string }[] = [
    { id: 'conservative', labelZh: '保守型', labelEn: 'Conservative', color: 'bg-charcoal-700' },
    { id: 'base', labelZh: '基准型', labelEn: 'Base Case', color: 'bg-sage-600' },
    { id: 'growth', labelZh: '激进型', labelEn: 'Growth Case', color: 'bg-emerald-600' },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white/95 backdrop-blur-md border-r border-ivory-300 flex flex-col justify-between shrink-0 shadow-soft lg:min-h-[calc(100vh-4rem)]">
      <div className="p-4 sm:p-5 space-y-6">
        {/* Brand / Title Header */}
        <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
          <div>
            <div className="flex items-center gap-1.5 text-sage-800 text-[11px] font-semibold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-sage-600" />
              <span>Soulscape · Investor Mode</span>
            </div>
            <h1 className="font-serif text-lg font-bold text-charcoal-900 mt-0.5">
              {locale === 'zh' ? '商业智能与创投中心' : 'Venture & BI Console'}
            </h1>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-ivory-300 hover:bg-ivory-100 text-charcoal-500 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Pitch Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Scenario Switcher Box */}
        <div className="p-3.5 rounded-2xl bg-ivory-100/70 border border-ivory-300/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-700">
            <span>{locale === 'zh' ? '测算场景预设：' : 'Scenario Model:'}</span>
            <button
              onClick={resetScenario}
              className="text-[11px] text-sage-700 hover:text-sage-900 flex items-center gap-1 hover:underline"
              title="Reset to Base Case"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{locale === 'zh' ? '重置' : 'Reset'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {presets.map(p => {
              const active = scenario === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setScenario(p.id)}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all text-center ${
                    active
                      ? `${p.color} text-white shadow-xs font-semibold`
                      : 'bg-white text-charcoal-600 hover:bg-ivory-200 border border-ivory-200'
                  }`}
                >
                  {locale === 'zh' ? p.labelZh : p.labelEn}
                </button>
              );
            })}
          </div>

          {scenario === 'custom' && (
            <div className="px-2 py-1 rounded-lg bg-amber-50 text-amber-900 text-[10px] font-medium border border-amber-200 text-center animate-pulse">
              {locale === 'zh' ? '⚙️ 自定义参数调整中 (实时生效)' : '⚙️ Custom Parameters Active'}
            </div>
          )}
        </div>

        {/* Quick Launch: One-Click Guided Demo Button */}
        <button
          onClick={startTour}
          className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white text-xs font-semibold shadow-soft flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-gold-300 animate-spin-slow" />
            <span>{locale === 'zh' ? '启动 12步路演导览' : 'Launch 12-Step Tour'}</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">LIVE</span>
        </button>

        {/* Navigation Routes */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sage-100 text-sage-900 font-semibold shadow-xs border border-sage-200'
                    : 'text-charcoal-600 hover:bg-ivory-100 hover:text-charcoal-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sage-700' : 'text-charcoal-400'}`} />
                  <span>{locale === 'zh' ? item.labelZh : item.labelEn}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-sage-600 text-white' : 'bg-ivory-200 text-charcoal-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Disclaimers */}
      <div className="p-4 sm:p-5 border-t border-ivory-200 space-y-3 bg-ivory-50/50">
        <div className="flex items-center justify-between text-xs">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-charcoal-500 hover:text-charcoal-900 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === 'zh' ? '返回学员看板' : 'To Member App'}</span>
          </Link>
          <button
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            className="text-[11px] font-mono text-sage-700 hover:underline"
          >
            {locale === 'zh' ? 'EN' : '中文'}
          </button>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[10px] text-amber-900 leading-relaxed font-light">
          <span className="font-semibold block mb-0.5">⚠️ 创投沙盒声明：</span>
          {locale === 'zh'
            ? '所有财务数字、转化率与估值方案均为演示测算模型，非历史真实经审计数据。'
            : 'All financial numbers and CAC/LTV are assumption-driven demo models.'}
        </div>
      </div>
    </aside>
  );
}
