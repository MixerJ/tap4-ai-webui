'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * 意见征求管理平台 (CMP) - Consent Management Platform
 *
 * 用于遵守GDPR和《欧盟地区用户意见征求政策》
 * 面向欧洲经济区(EEA)、英国和瑞士的用户必须获取同意
 *
 * 参考: https://support.google.com/adsense/answer/13554020?hl=zh-Hans
 */

interface ConsentPreferences {
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

const CONSENT_COOKIE_NAME = 'user_consent_preferences';
const CONSENT_VERSION = '1.0';

export default function ConsentManager() {
  const t = useTranslations('Consent');
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    advertising: false,
    functional: true, // 功能性Cookie默认启用
  });

  const applyConsent = (prefs: ConsentPreferences) => {
    // 通知Google AdSense用户的同意状态
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.advertising ? 'granted' : 'denied',
        ad_user_data: prefs.advertising ? 'granted' : 'denied',
        ad_personalization: prefs.advertising ? 'granted' : 'denied',
        functionality_storage: prefs.functional ? 'granted' : 'denied',
      });
    }

    // 保存到localStorage
    const consentData = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      preferences: prefs,
    };
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consentData));
  };

  useEffect(() => {
    // 检查是否已有用户同意记录
    const savedConsent = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (!savedConsent) {
      // 检查是否被暂时关闭（24小时内不显示）
      const dismissed = localStorage.getItem('consent_dismissed');
      if (dismissed) {
        try {
          const dismissedData = JSON.parse(dismissed);
          const dismissedTime = new Date(dismissedData.timestamp).getTime();
          const now = new Date().getTime();
          const hours24 = 24 * 60 * 60 * 1000;

          // 如果24小时内，不显示横幅
          if (now - dismissedTime < hours24) {
            return;
          }
          // 超过24小时，清除记录并显示
          localStorage.removeItem('consent_dismissed');
        } catch (error) {
          // 解析错误，清除记录
          localStorage.removeItem('consent_dismissed');
        }
      }

      // 延迟显示，避免影响首屏体验
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // 加载已保存的偏好
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed.preferences);
        applyConsent(parsed.preferences);
      } catch (error) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      analytics: true,
      advertising: true,
      functional: true,
    };
    setPreferences(allAccepted);
    applyConsent(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const allRejected: ConsentPreferences = {
      analytics: false,
      advertising: false,
      functional: true, // 功能性Cookie保持启用
    };
    setPreferences(allRejected);
    applyConsent(allRejected);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    // 暂时隐藏横幅，24小时内不再次显示
    const dismissData = {
      dismissed: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('consent_dismissed', JSON.stringify(dismissData));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    applyConsent(preferences);
    setShowBanner(false);
    setShowDetails(false);
  };

  const handleTogglePreference = (key: keyof ConsentPreferences) => {
    if (key === 'functional') return; // 功能性Cookie不能禁用
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* 同意横幅 - 底部固定，不阻止页面交互 */}
      <div className='pointer-events-none fixed inset-x-0 bottom-0 z-[9999] animate-slide-up p-4 sm:p-6'>
        <div className='pointer-events-auto mx-auto max-w-4xl'>
          <div className='relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-lg transition-transform duration-300 hover:shadow-indigo-500/10 sm:p-8'>
            {/* 装饰背景 */}
            <div className='absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl' />
            <div className='absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-3xl' />

            {/* 关闭按钮 - 暂时隐藏横幅，不保存偏好 */}
            <button
              type='button'
              onClick={handleDismiss}
              className='absolute right-4 top-4 rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white'
              aria-label='Close'
              title={t('dismiss', { defaultValue: '稍后再说' })}
            >
              <X className='size-5' />
            </button>

            <div className='relative'>
              {!showDetails ? (
                <>
                  {/* 简化视图 */}
                  <div className='mb-6 flex items-start gap-4'>
                    <div className='rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3'>
                      <svg className='size-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                        />
                      </svg>
                    </div>
                    <div className='flex-1'>
                      <h2 className='mb-2 text-xl font-bold text-white sm:text-2xl'>
                        {t('title', { defaultValue: '我们重视您的隐私' })}
                      </h2>
                      <p className='text-sm leading-relaxed text-white/80 sm:text-base'>
                        {t('description', {
                          defaultValue:
                            '我们和我们的合作伙伴使用 Cookie 和类似技术来提供、保护和改进我们的服务，以及个性化内容和广告。点击"接受全部"即表示您同意我们使用这些技术。',
                        })}
                      </p>
                      <button
                        type='button'
                        onClick={() => setShowDetails(true)}
                        className='mt-2 text-sm text-indigo-400 underline-offset-2 hover:underline'
                      >
                        {t('learnMore', { defaultValue: '了解更多' })}
                      </button>
                    </div>
                  </div>

                  {/* 按钮组 */}
                  <div className='flex flex-col gap-3 sm:flex-row'>
                    <button
                      type='button'
                      onClick={handleAcceptAll}
                      className='flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25'
                    >
                      {t('acceptAll', { defaultValue: '接受全部' })}
                    </button>
                    <button
                      type='button'
                      onClick={handleRejectAll}
                      className='flex-1 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10'
                    >
                      {t('rejectAll', { defaultValue: '拒绝全部' })}
                    </button>
                    <button
                      type='button'
                      onClick={() => setShowDetails(true)}
                      className='rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10'
                    >
                      {t('customize', { defaultValue: '自定义' })}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* 详细设置视图 */}
                  <h2 className='mb-6 text-xl font-bold text-white sm:text-2xl'>
                    {t('privacySettings', { defaultValue: '隐私设置' })}
                  </h2>

                  <div className='mb-6 space-y-4'>
                    {/* 功能性Cookie（必需，不可禁用） */}
                    <div className='rounded-xl border border-white/10 bg-white/5 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h3 className='mb-1 font-semibold text-white'>
                            {t('functional.title', { defaultValue: '必需的Cookie' })}
                          </h3>
                          <p className='text-sm text-white/70'>
                            {t('functional.description', {
                              defaultValue: '这些Cookie对于网站的基本功能是必需的，无法禁用。',
                            })}
                          </p>
                        </div>
                        <div className='ml-4 rounded-lg bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400'>
                          {t('alwaysActive', { defaultValue: '始终启用' })}
                        </div>
                      </div>
                    </div>

                    {/* 分析Cookie */}
                    <div className='rounded-xl border border-white/10 bg-white/5 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h3 className='mb-1 font-semibold text-white'>
                            {t('analytics.title', { defaultValue: '分析Cookie' })}
                          </h3>
                          <p className='text-sm text-white/70'>
                            {t('analytics.description', {
                              defaultValue: '帮助我们了解网站的使用情况，以改进用户体验。',
                            })}
                          </p>
                        </div>
                        <button
                          type='button'
                          onClick={() => handleTogglePreference('analytics')}
                          aria-label={t('analytics.title', { defaultValue: '分析Cookie' })}
                          className={`relative ml-4 h-7 w-12 rounded-full transition-colors ${
                            preferences.analytics ? 'bg-indigo-600' : 'bg-white/20'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 size-5 rounded-full bg-white transition-transform ${
                              preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* 广告Cookie */}
                    <div className='rounded-xl border border-white/10 bg-white/5 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <h3 className='mb-1 font-semibold text-white'>
                            {t('advertising.title', { defaultValue: '广告Cookie' })}
                          </h3>
                          <p className='text-sm text-white/70'>
                            {t('advertising.description', {
                              defaultValue: '用于向您展示更相关的个性化广告内容。',
                            })}
                          </p>
                        </div>
                        <button
                          type='button'
                          onClick={() => handleTogglePreference('advertising')}
                          aria-label={t('advertising.title', { defaultValue: '广告Cookie' })}
                          className={`relative ml-4 h-7 w-12 rounded-full transition-colors ${
                            preferences.advertising ? 'bg-indigo-600' : 'bg-white/20'
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 size-5 rounded-full bg-white transition-transform ${
                              preferences.advertising ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 按钮组 */}
                  <div className='flex flex-col gap-3 sm:flex-row'>
                    <button
                      type='button'
                      onClick={handleSavePreferences}
                      className='flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25'
                    >
                      {t('savePreferences', { defaultValue: '保存设置' })}
                    </button>
                    <button
                      type='button'
                      onClick={() => setShowDetails(false)}
                      className='rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10'
                    >
                      {t('back', { defaultValue: '返回' })}
                    </button>
                  </div>

                  {/* 隐私政策链接 */}
                  <p className='mt-4 text-center text-xs text-white/60'>
                    {t('policyText', {
                      defaultValue: '了解更多信息，请查看我们的',
                    })}{' '}
                    <a
                      href='/privacy-policy'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-indigo-400 underline-offset-2 hover:underline'
                    >
                      {t('privacyPolicy', { defaultValue: '隐私政策' })}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
