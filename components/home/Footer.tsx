import { HTMLAttributeAnchorTarget } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { CONTACT_US_EMAIL } from '@/lib/env';
import LocaleSwitcher from '@/components/LocaleSwitcher';

function InfoLink({
  href,
  title,
  target,
  type,
}: {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  type?: string;
}) {
  return (
    <Link
      href={href}
      title={title}
      className='text-xs leading-relaxed text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-white lg:text-sm'
      target={target}
      type={type}
    >
      {title}
    </Link>
  );
}

export default function Footer() {
  const t = useTranslations('Footer');

  const SupportLinks = [
    {
      title: 'Cubesolver AI',
      href: 'https://cubesolver.ai/',
    },
    {
      title: 'Chat o1',
      href: 'https://chat4o.ai/',
    },
    {
      title: 'Grok Image Generator',
      href: 'https://grokimagegenerator.net/',
    },
    {
      title: 'Flux AI Image Generator',
      href: 'https://flux-ai.io/',
    },
    {
      title: 'Photo to Video AI',
      href: 'https://dreammachineai.online/',
    },
    {
      title: 'Flux Pro Image Generator',
      href: 'https://flux-pro.net/',
    },
    {
      title: t('tap4'),
      href: 'https://tap4.ai/',
    },
    {
      title: t('tattoo'),
      href: 'https://tattooai.design/',
    },
  ];

  const INFO_LIST = [
    {
      title: t('privacy'),
      href: '/privacy-policy',
    },
    {
      title: t('termsConditions'),
      href: '/terms-of-service',
    },
  ];

  return (
    <footer className='relative w-full border-t border-white/5'>
      {/* 背景装饰效果 - 更柔和 */}
      <div className='from-indigo-500/3 via-purple-500/3 to-cyan-500/3 absolute inset-0 bg-gradient-to-r' />

      <div className='relative mx-auto max-w-pc px-5 py-10 lg:px-0 lg:py-12'>
        {/* 主要内容区域 */}
        <div className='flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-12'>
          {/* 左侧：品牌信息 */}
          <div className='flex flex-col items-center gap-3 lg:max-w-md lg:items-start'>
            <h3 className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent lg:text-2xl'>
              {t('title')}
            </h3>
            <p className='text-center text-xs leading-relaxed text-white/60 lg:text-left lg:text-sm'>{t('subTitle')}</p>
          </div>

          {/* 右侧：链接区域 */}
          <div className='flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12 lg:gap-16'>
            {/* 支持链接 */}
            <div className='flex flex-col items-center gap-3 lg:items-start'>
              <h4 className='text-sm font-semibold text-white lg:text-base'>{t('support')}</h4>
              <nav className='flex flex-col items-center gap-2 lg:items-start'>
                {SupportLinks.map((item) => (
                  <a
                    href={item.href}
                    key={item.href}
                    target='_blank'
                    rel='noreferrer'
                    className='text-xs leading-relaxed text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-white lg:text-sm'
                    title={item.title}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* 信息和联系 */}
            <div className='flex flex-col items-center gap-3 lg:items-start'>
              <h4 className='text-sm font-semibold text-white lg:text-base'>{t('info')}</h4>
              <nav className='flex flex-col items-center gap-2 lg:items-start'>
                {INFO_LIST.map((item) => (
                  <InfoLink key={item.href} href={item.href} title={item.title} />
                ))}
                <a
                  href={`mailto:${CONTACT_US_EMAIL}`}
                  className='text-xs leading-relaxed text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-white lg:text-sm'
                  title={t('contactUs')}
                  type='email'
                >
                  {t('contactUs')}
                </a>
              </nav>
            </div>
          </div>

          {/* 移动端语言切换器 */}
          <div className='flex justify-center border-t border-white/10 pt-6 lg:hidden'>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
