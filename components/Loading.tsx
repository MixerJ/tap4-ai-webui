import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export default function Loading({ className }: { className?: string }) {
  const t = useTranslations('Common');

  return (
    <div role='status' className='flex flex-col items-center gap-4 py-16'>
      {/* 加载动画 */}
      <div className='relative'>
        <div className='h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-indigo-500' />
        <div className='absolute inset-0 h-16 w-16 animate-ping rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20' />
      </div>

      {/* 加载文字 */}
      <div className='flex flex-col items-center gap-2'>
        <span className={cn('text-sm font-medium text-white/70 lg:text-base', className)}>{t('loading')}</span>
        <div className='flex gap-1'>
          <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400' style={{ animationDelay: '0s' }} />
          <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400' style={{ animationDelay: '0.2s' }} />
          <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400' style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
