'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Key, ShieldCheck, RotateCcw, Check, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const { locale, resetDemoState, showToast } = useApp();
  const [llmProvider, setLlmProvider] = useState('mock-simulation');
  const [paymentProvider, setPaymentProvider] = useState('mock-sandbox');
  const [openAiKey, setOpenAiKey] = useState('sk-proj-demo-placeholder-not-real');
  const [stripeKey, setStripeKey] = useState('pk_test_demo_placeholder_not_real');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      locale === 'zh' ? '系统适配器设置已保存！' : 'Settings Saved!',
      locale === 'zh' ? '当前演示环境安全锁生效，未向外网发送真实敏感密钥。' : 'Security lock active in demo mode.',
      'success'
    );
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="font-serif text-xl font-bold text-charcoal-900">
          {locale === 'zh' ? '系统配置、第三方适配器与生产迁移' : 'System Architecture & Production Adapters'}
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {locale === 'zh' ? '配置生产级 LLM 大模型、聚合支付网关与本地沙盒状态重置。' : 'Configure production LLM endpoints, payment gateways, and demo resets.'}
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-soft space-y-6">
        {/* LLM Adapter Config */}
        <div className="space-y-3 pb-6 border-b border-ivory-200">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-lavender-600" />
            <h3 className="font-serif font-bold text-charcoal-900 text-sm">
              LLM 大语言模型适配器驱动
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-charcoal-700 font-medium mb-1">当前驱动模式</label>
              <select
                value={llmProvider}
                onChange={(e) => setLlmProvider(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-ivory-50 text-xs focus:outline-none"
              >
                <option value="mock-simulation">本地确定性意图模板 (当前演示模式)</option>
                <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                <option value="anthropic">Anthropic Claude (Claude 3.5 Sonnet)</option>
                <option value="gemini">Google Gemini (Gemini 1.5 Pro)</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal-700 font-medium mb-1">API Key 预留槽位</label>
              <input
                type="password"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-ivory-50 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>
          <p className="text-[11px] text-charcoal-400">
            * 演示环境已启用本地沙盒模拟引擎，不会扣减任何外网账户费用。
          </p>
        </div>

        {/* Payment Gateway Config */}
        <div className="space-y-3 pb-6 border-b border-ivory-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="font-serif font-bold text-charcoal-900 text-sm">
              支付网关聚合适配器
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-charcoal-700 font-medium mb-1">收银台模式</label>
              <select
                value={paymentProvider}
                onChange={(e) => setPaymentProvider(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-ivory-50 text-xs focus:outline-none"
              >
                <option value="mock-sandbox">模拟收银台 (无需真实银行卡)</option>
                <option value="stripe">Stripe Checkout / Apple Pay</option>
                <option value="wechat">微信支付聚合服务商 (Native)</option>
                <option value="alipay">支付宝当面付 / 手机网站支付</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal-700 font-medium mb-1">Publishable Key 槽位</label>
              <input
                type="password"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-ivory-300 bg-ivory-50 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetDemoState}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置全站演示状态</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold shadow-soft"
          >
            保存配置
          </button>
        </div>
      </form>
    </div>
  );
}
