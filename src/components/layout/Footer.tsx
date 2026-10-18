'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Sparkles, Shield, AlertTriangle, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { locale, switchRole, resetDemoState } = useApp();

  if (pathname.startsWith('/investor') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="hidden md:block bg-[#FAF7F2] border-t border-[#EDE5D9] text-[#4B423D] pt-12 pb-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compliance / Demo Disclaimers Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-white border border-ivory-300 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1.5 leading-relaxed text-charcoal-600">
              <p className="font-semibold text-charcoal-800">
                {locale === 'zh'
                  ? '【Soulscape 投资人与合作伙伴交互演示系统声明】'
                  : '[Soulscape Investor & Partner Interactive Demo Disclaimer]'}
              </p>
              <p>
                {locale === 'zh'
                  ? '1. 本系统为完全交互式高保真 Web App 演示原型。所有展示的 8 位导师档案、学员评论、卡牌解读和交易流水均为演示模拟数据，非真实商业合同或真实履约。'
                  : '1. This is a fully interactive, high-fidelity Web App demo prototype. All 8 mentor profiles, member reviews, card interpretations, and transactions are simulated demo records.'}
              </p>
              <p>
                {locale === 'zh'
                  ? '2. 平台所提供的七脉轮身心知识、声波频率与神谕反思仅供身心自我觉察与正念放松使用，绝不构成任何临床心理治疗或医疗处方建议。'
                  : '2. The chakra concepts, audio frequencies, and oracle reflections are for mindfulness and stress-reduction purposes only, not medical treatment.'}
              </p>
              <p>
                {locale === 'zh'
                  ? '3. AI 觉知向导由本地模板与意图分支引擎驱动并预留标准 LLM 适配器，未连接付费生产级大模型。所有模拟结算均为免费演示币，不发生真实扣款。'
                  : '3. The AI Guide runs on a local template/branch engine with clean LLM adapter interfaces. All credits are virtual demo tokens with no real financial payment.'}
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-sage-600 text-white flex items-center justify-center font-serif font-bold text-sm">
                S
              </div>
              <span className="font-serif text-lg font-semibold text-charcoal-900">Soulscape</span>
            </div>
            <p className="text-xs text-charcoal-500 max-w-sm leading-relaxed mb-4">
              {locale === 'zh'
                ? '联结身心科技与东方静穆美学。以 88 张原初神谕卡、全息七脉轮高频声波、大师导师智库与 AI 觉知向导，重塑现代人的数字内在生态。'
                : 'Connecting wellness technology with contemplative aesthetics. Featuring 88 sacred oracle cards, 7-chakra frequencies, certified mentors, and AI guided awareness.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-charcoal-400">
              <span>Next.js 14 App Router</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>TypeScript</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-3">
              {locale === 'zh' ? '核心探索' : 'Discovery'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cards" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '88枚原初神谕' : '88 Sacred Cards'}</Link></li>
              <li><Link href="/card-reading" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '神谕占读' : 'Card Reading'}</Link></li>
              <li><Link href="/music" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '调频声波乐库' : 'Sound Healing'}</Link></li>
              <li><Link href="/chakras" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '七脉轮百科' : '7 Chakras Map'}</Link></li>
              <li><Link href="/knowledge" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '觉知知识库' : 'Knowledge Base'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-3">
              {locale === 'zh' ? '生态与服务' : 'Ecosystem'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mentors" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '导师智库' : 'Mentor Directory'}</Link></li>
              <li><Link href="/courses" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '大师系统课' : 'Master Courses'}</Link></li>
              <li><Link href="/journeys" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '定制修行之旅' : 'Guided Journeys'}</Link></li>
              <li><Link href="/pricing" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '会员与充值' : 'Membership Plans'}</Link></li>
              <li><Link href="/wallet" className="hover:text-sage-700 transition-colors">{locale === 'zh' ? '积分钱包' : 'Credits Wallet'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-3">
              {locale === 'zh' ? '演示通道' : 'Demo Portals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => switchRole('member')} className="hover:text-sage-700 text-left transition-colors">
                  {locale === 'zh' ? '👤 切换为会员视角' : '👤 Switch to Member'}
                </button>
              </li>
              <li>
                <button onClick={() => switchRole('mentor')} className="hover:text-sage-700 text-left transition-colors">
                  {locale === 'zh' ? '🌿 切换为导师工作台' : '🌿 Switch to Mentor'}
                </button>
              </li>
              <li>
                <button onClick={() => switchRole('admin')} className="hover:text-sage-700 text-left transition-colors">
                  {locale === 'zh' ? '🛡️ 切换为合伙人后台' : '🛡️ Switch to Admin'}
                </button>
              </li>
              <li>
                <button onClick={resetDemoState} className="text-rose-600 hover:text-rose-700 text-left transition-colors">
                  {locale === 'zh' ? '🔄 重置演示状态' : '🔄 Reset Demo State'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-ivory-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-500">
          <p>© 2026 Soulscape Ecosystem. Confidential Investor Demonstration.</p>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hover:text-charcoal-800">{locale === 'zh' ? '商业模型' : 'Business Model'}</Link>
            <Link href="/admin/analytics" className="hover:text-charcoal-800">{locale === 'zh' ? '数据大屏' : 'KPI Analytics'}</Link>
            <Link href="/ai-guide" className="hover:text-charcoal-800">{locale === 'zh' ? 'AI向导演示' : 'AI Simulation'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
