import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('FooterNavigation.termsConditions');

  return (
    <div className='relative min-h-screen w-full'>
      {/* 动态背景 */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent' />
        <div className='absolute left-1/4 top-1/4 h-96 w-96 animate-float rounded-full bg-indigo-500/10 blur-3xl' />
        <div
          className='absolute bottom-1/4 right-1/4 h-96 w-96 animate-float rounded-full bg-purple-500/10 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className='relative mx-auto w-full max-w-pc px-3 py-10 lg:px-0 lg:py-16'>
        {/* 标题区域 */}
        <div className='mx-auto mb-10 max-w-4xl text-center lg:mb-16'>
          {/* 装饰性元素 */}
          <div className='mb-6 flex items-center justify-center gap-2 lg:mb-8'>
            <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500/50' />
            <div className='h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
            <div className='h-px w-12 bg-gradient-to-r from-indigo-500/50 via-indigo-500/50 to-transparent' />
          </div>
          <h1 className='mb-2 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-5xl'>
            {t('1-title')}
          </h1>
          <p className='mb-6 text-sm font-medium text-indigo-400 lg:text-base'>{t('1-subtitle')}</p>
          <div className='space-y-3 text-left text-sm leading-relaxed text-white/80 lg:text-base'>
            <p>{t('1-p1')}</p>
            <p>{t('1-p2')}</p>
          </div>
        </div>

        {/* 内容区域 */}
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm lg:p-8'>
            <h2 className='text-xl font-semibold text-white lg:text-2xl'>{t('2-h2')}</h2>
            <p className='leading-relaxed text-white/80'>{t('2-p')}</p>
          </div>

          <div className='space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm lg:p-8'>
            <h2 className='text-xl font-semibold text-white lg:text-2xl'>{t('3-h2')}</h2>
            <p className='leading-relaxed text-white/80'>{t('3-p')}</p>
          </div>

          <div className='space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm lg:p-8'>
            <h2 className='text-xl font-semibold text-white lg:text-2xl'>{t('4-h2')}</h2>
            <p className='leading-relaxed text-white/80'>
              {t('4-p')}{' '}
              <Link
                href='/privacy-policy'
                className='font-semibold text-indigo-400 transition-colors hover:text-indigo-300'
              >
                {t('terms-of-service')}
              </Link>
            </p>
          </div>

          <div className='space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm lg:p-8'>
            <h2 className='text-xl font-semibold text-white lg:text-2xl'>{t('5-h2')}</h2>
            <p className='leading-relaxed text-white/80'>{t('5-p')}</p>
          </div>

          <div className='space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm lg:p-8'>
            <h2 className='text-xl font-semibold text-white lg:text-2xl'>{t('6-h2')}</h2>
            <p className='leading-relaxed text-white/80'>{t('6-p')}</p>
          </div>

          <div className='space-y-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm lg:p-8'>
            <h2 className='text-xl font-semibold text-white lg:text-2xl'>{t('7-h2')}</h2>
            <p className='leading-relaxed text-white/80'>{t('7-p')}</p>
          </div>

          <div className='rounded-2xl bg-indigo-500/10 p-6 backdrop-blur-sm lg:p-8'>
            <p className='text-center leading-relaxed text-white/90'>{t('last-p')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
