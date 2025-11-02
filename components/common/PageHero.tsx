'use client';

import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  children?: ReactNode;
}

export default function PageHero({
  title,
  description,
  actions,
  variant = 'default',
  className,
  children,
}: PageHeroProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <div className={cn('relative w-full overflow-hidden', isCompact ? 'py-8 lg:py-12' : 'py-12 lg:py-20', className)}>
      {/* 背景装饰 */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
        {!isCompact && (
          <>
            <div
              className='absolute left-1/4 top-1/4 h-64 w-64 animate-float rounded-full bg-indigo-500/10 blur-3xl'
              style={{ animationDelay: '0s' }}
            />
            <div
              className='absolute bottom-1/4 right-1/4 h-64 w-64 animate-float rounded-full bg-purple-500/10 blur-3xl'
              style={{ animationDelay: '2s' }}
            />
          </>
        )}
      </div>

      {/* 顶部装饰条 */}
      <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent' />

      {/* 内容区域 */}
      <div className='relative z-10 mx-auto max-w-pc px-6 lg:px-0'>
        <div
          className={cn('flex flex-col', isDetailed ? 'gap-6 lg:gap-8' : 'gap-4 lg:gap-6', !isCompact && 'text-center')}
        >
          {/* 标题 */}
          <h1
            className={cn(
              'animate-slide-up font-bold',
              (() => {
                if (isCompact) return 'text-2xl lg:text-4xl';
                if (isDetailed) return 'text-3xl lg:text-5xl';
                return 'text-4xl lg:text-6xl';
              })(),
            )}
          >
            <span className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent'>
              {title}
            </span>
          </h1>

          {/* 描述 */}
          {description && (
            <p
              className={cn(
                'animate-slide-up text-white/70',
                isCompact ? 'text-sm lg:text-base' : 'text-base lg:text-xl',
                !isCompact && 'mx-auto max-w-3xl',
              )}
              style={{ animationDelay: '0.1s' }}
            >
              {description}
            </p>
          )}

          {/* 操作按钮 */}
          {actions && (
            <div
              className={cn('animate-slide-up', !isCompact && 'mx-auto flex flex-col items-center gap-4 sm:flex-row')}
              style={{ animationDelay: '0.2s' }}
            >
              {actions}
            </div>
          )}

          {/* 自定义内容 */}
          {children && (
            <div className='animate-slide-up' style={{ animationDelay: '0.3s' }}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* 底部渐变 */}
      <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent' />
    </div>
  );
}
