'use client';

import { useEffect, useState } from 'react';
import { Brain, Rocket, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('Home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className='relative flex min-h-[80vh] items-center justify-center overflow-hidden'>
      {/* 动态背景 */}
      <div className='absolute inset-0'>
        {/* 主要背景渐变 */}
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />

        {/* 动态粒子背景 */}
        <div className='absolute inset-0'>
          {[...Array(50)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className='absolute h-1 w-1 animate-float rounded-full bg-indigo-400/20'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* 几何形状装饰 */}
        <div className='absolute left-20 top-20 h-32 w-32 animate-float rounded-full border border-indigo-500/20' />
        <div
          className='absolute bottom-20 right-20 h-24 w-24 rotate-45 animate-float rounded-lg border border-purple-500/20'
          style={{ animationDelay: '2s' }}
        />
        <div className='absolute left-1/4 top-1/2 h-16 w-16 animate-pulse rounded-full bg-cyan-500/10' />
      </div>

      {/* 主要内容 */}
      <div className='relative z-10 mx-auto max-w-4xl px-6 text-center'>
        {/* 标题区域 */}
        <div className='space-y-6'>
          {/* 装饰图标 */}
          <div className='mb-6 flex justify-center gap-4'>
            <div className='rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-3'>
              <Brain className='size-8 animate-pulse text-indigo-400' />
            </div>
            <div className='rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3'>
              <Zap className='size-8 animate-pulse text-purple-400' style={{ animationDelay: '0.2s' }} />
            </div>
            <div className='rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-3'>
              <Rocket className='size-8 animate-pulse text-cyan-400' style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          {/* 主标题 */}
          <h1 className='animate-slide-up text-5xl font-bold lg:text-7xl'>
            <span className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent'>
              {t('heroTitle1')}
            </span>
            <br />
            <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
              {t('heroTitle2')}
            </span>
          </h1>

          {/* 副标题 */}
          <p
            className='mx-auto max-w-2xl animate-slide-up text-xl font-light leading-relaxed text-white/80 lg:text-2xl'
            style={{ animationDelay: '0.2s' }}
          >
            {t('heroSubtitle')}
          </p>
        </div>

        {/* 功能亮点 */}
        <div
          className='mt-16 grid animate-slide-up grid-cols-1 gap-6 md:grid-cols-3'
          style={{ animationDelay: '0.4s' }}
        >
          <div className='group rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 transition-all duration-300 hover:scale-105 hover:border-indigo-500/40'>
            <div className='flex flex-col items-center space-y-3 text-center'>
              <div className='rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3'>
                <Sparkles className='size-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white'>{t('heroFeature1Title')}</h3>
              <p className='text-sm text-white/60'>{t('heroFeature1Desc')}</p>
            </div>
          </div>

          <div className='group rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 transition-all duration-300 hover:scale-105 hover:border-purple-500/40'>
            <div className='flex flex-col items-center space-y-3 text-center'>
              <div className='rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3'>
                <Brain className='size-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white'>{t('heroFeature2Title')}</h3>
              <p className='text-sm text-white/60'>{t('heroFeature2Desc')}</p>
            </div>
          </div>

          <div className='group rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 transition-all duration-300 hover:scale-105 hover:border-cyan-500/40'>
            <div className='flex flex-col items-center space-y-3 text-center'>
              <div className='rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-3'>
                <Rocket className='size-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white'>{t('heroFeature3Title')}</h3>
              <p className='text-sm text-white/60'>{t('heroFeature3Desc')}</p>
            </div>
          </div>
        </div>

        {/* CTA 区域 */}
        <div className='mt-12 animate-slide-up' style={{ animationDelay: '0.6s' }}>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <button
              type='button'
              className='group rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-2xl hover:shadow-indigo-500/25'
            >
              <span className='flex items-center gap-2'>
                {t('heroExploreBtn')}
                <Rocket className='size-5 transition-transform duration-300 group-hover:translate-x-1' />
              </span>
            </button>
            <button
              type='button'
              className='rounded-2xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10'
            >
              {t('heroLearnMoreBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent' />
    </section>
  );
}
