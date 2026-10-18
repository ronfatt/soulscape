'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Milestone, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  Layers, 
  Globe, 
  Smartphone, 
  Building2, 
  Compass, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function InvestorRoadmapPage() {
  const { locale } = useApp();
  const isZh = locale === 'zh';

  const roadmapQuarters = [
    {
      quarter: 'Q1 2026',
      status: 'completed',
      titleZh: '核心架构、原创IP与闭环验证',
      titleEn: 'Foundation & Core Ecosystem Loop',
      badgeZh: '已交付完成',
      badgeEn: 'Completed',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      itemsZh: [
        '自研 88 枚原创神圣种子神谕卡殿堂，确立独立知识产权',
        'Web Audio API 物理振荡器声波引擎，实现 0 带宽纯净正弦波',
        '荣格原型确定性心理映射体系与解耦 AI 适配器架构',
        '会员、导师、管理员与投资人四重角色沙盘与演示环境',
        '完整能量积分账本、七脉轮沉浸调频与本地高可用存储'
      ],
      itemsEn: [
        '88 original sacred archetypes with clean copyright pedigree',
        'Web Audio API oscillator synthesizing pure frequencies',
        'Deterministic Jungian synthesis & decoupled AI adapter',
        'Multi-role demo switcher & interactive BI simulation suite',
        'Energy credits ledger, 7 chakras, and local sandbox persistence'
      ]
    },
    {
      quarter: 'Q2 2026',
      status: 'in-progress',
      titleZh: '移动端体验、本地支付接入与商业化起量',
      titleEn: 'Mobile PWA, Payment Gateways & Growth',
      badgeZh: '进行中 (研发已就绪)',
      badgeEn: 'In Progress',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      itemsZh: [
        '上线 iOS / Android 响应式 PWA，支持离线音频缓存与微震触感',
        '接入 Stripe 与东南亚本地 FPX / Touch \'n Go 聚合支付网关',
        '上线七脉轮身心自测雷达图评估与个性化成长轨迹报告',
        '导师入驻工作台 v1.0：日程空闲管理、履约评价与结算提现',
        '启动小红书、TikTok 与社群私域灵感卡片分享裂变实验'
      ],
      itemsEn: [
        'Mobile PWA with offline audio caching & haptic feedback',
        'Stripe & FPX / Touch \'n Go Southeast Asian payment integration',
        '7-Chakra somatic assessment radar & customized growth report',
        'Mentor portal v1: availability scheduling, ratings, and payouts',
        'Viral social sharing loops on Instagram, TikTok, and Xiaohongshu'
      ]
    },
    {
      quarter: 'Q3 2026',
      status: 'planned',
      titleZh: '导师撮合平台、企业端EAP与周边文创',
      titleEn: 'Mentor Marketplace, Enterprise EAP & Merch',
      badgeZh: '规划推进中',
      badgeEn: 'Planned',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      itemsZh: [
        '1对1 视频疗愈咨询室：日程预约、资金担保托管与 80/20 自动清分',
        'B2B 企微身心减压看板 (EAP)，输出白领正念排班与团建工坊',
        '88 枚烫金典藏版实体神谕卡套盒与 432Hz 水晶钵电商发售',
        '微调部署领域专属本地大模型，进一步压降 50% Token 推理成本',
        '引入 30 位东南亚顶级身心导师独家入驻与联名知识库'
      ],
      itemsEn: [
        '1-on-1 video rooms with escrow payment & 80/20 automatic split',
        'Enterprise EAP wellness dashboard & workplace mindfulness',
        'Physical 88-card boxed deck & 432Hz crystal sound bowl e-commerce',
        'Fine-tuned domain-specific LLM slashing token costs by 50%',
        'Onboarding 30 top Southeast Asian accredited holistic mentors'
      ]
    },
    {
      quarter: 'Q4 2026',
      status: 'planned',
      titleZh: '全球化多语言、线下静修营与 A 轮融资',
      titleEn: 'Global Localization, Retreats & Series A',
      badgeZh: '中远期愿景',
      badgeEn: 'Horizon',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      itemsZh: [
        '上线日韩、欧美多语言本地化版本与全球国际信用卡订阅',
        '联合巴厘岛与清迈高端度假村，推出 Soulscape 觉知静修营',
        '建立 Soulscape Academy 身心疗愈师官方认证体系与考证培训',
        '实现月度净确认收入 RM 150k+，全面实现经调整现金流正向',
        '启动 A 轮机构融资（目标 150 万 - 300 万美元，加速全球扩张）'
      ],
      itemsEn: [
        'Full English, Japanese, and international credit card billing',
        'Bali & Chiang Mai luxury sound bath wellness retreats',
        'Soulscape Academy certified sound practitioner accreditation',
        'Achieve RM 150k+ monthly net revenue with strong positive cash flow',
        'Kick off Series A funding ($1.5M - $3M) for global brand expansion'
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3 border border-stone-200">
            <Milestone className="w-3.5 h-3.5 text-stone-600" />
            <span>{isZh ? '产品演进蓝图与里程碑交付规划' : 'Product Roadmap & Deliverables'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            {isZh ? '从核心数字工具迈向全球身心健康觉知生态' : 'Execution Horizons: From Digital Tool to Global Wellness Ecosystem'}
          </h1>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {isZh 
              ? '清晰、稳健、可量化的研发与商业化节奏。我们拒绝不切实际的概念炒作，坚持“每一季度上线一个具备独立造血能力的产品模块”。'
              : 'Disciplined quarterly milestones delivering cash-generative modules at every execution horizon.'}
          </p>
        </div>
      </div>

      {/* 4 Quarters Timeline */}
      <div className="space-y-6">
        {roadmapQuarters.map((q, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  q.status === 'completed' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : q.status === 'in-progress' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-stone-100 text-stone-700'
                }`}>
                  {q.quarter.split(' ')[0]}
                </div>
                <div>
                  <div className="text-xs text-stone-400 font-semibold uppercase">{q.quarter}</div>
                  <h3 className="text-lg font-bold font-serif text-stone-900">
                    {isZh ? q.titleZh : q.titleEn}
                  </h3>
                </div>
              </div>

              <span className={`self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full border ${q.badgeColor}`}>
                {isZh ? q.badgeZh : q.badgeEn}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {(isZh ? q.itemsZh : q.itemsEn).map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50/70 border border-stone-100">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                    q.status === 'completed' ? 'text-emerald-600' : 'text-stone-400'
                  }`} />
                  <span className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
