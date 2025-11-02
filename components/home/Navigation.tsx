'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coffee, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// import BaseImage from '../image/BaseImage';
import LocaleSwitcher from '../LocaleSwitcher';
import MenuBtn from './MenuBtn';
import NavigationDrawer from './NavigationDrawer';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));

  return (
    <>
      <header className='sticky left-0 top-0 z-50 flex h-[72px] border-b border-white/10 bg-slate-900/80 px-5 backdrop-blur-lg lg:px-0'>
        {/* 背景装饰效果 */}
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5' />

        <nav className='relative mx-auto flex max-w-pc flex-1 items-center'>
          {/* Logo 区域 */}
          <div className='group'>
            <Link
              className='flex items-center gap-3 transition-transform duration-300 hover:scale-105'
              href='/'
              title={t('title')}
            >
              {/* <div className='relative'>
              <BaseImage
                src='/images/toolsify-ai.svg'
                alt={t('title')}
                title={t('title')}
                width={64}
                height={64}
                className='size-[58px] lg:size-16'
                /> */}
              {/* Logo 光晕效果 */}
              {/* <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-20' />
              </div>  */}
              <div className='hidden lg:block'>
                <div className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent'>
                  Toolsify AI
                </div>
                <div className='text-xs text-white/60'>AI Tools Directory</div>
              </div>
            </Link>
          </div>

          {/* PC 导航菜单 */}
          <div className='ml-auto flex h-full items-center gap-x-8'>
            <ul className='hidden h-full flex-1 lg:flex lg:gap-x-8'>
              {NavLinks.map((item) => (
                <Link key={item.code} href={item.href} title={item.code}>
                  <li
                    className={cn(
                      'relative flex h-full items-center rounded-lg px-3 py-2 text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white',
                      pathname === item.href && 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-white',
                      pathname.includes(item.href) &&
                        item.href !== '/' &&
                        'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-white',
                    )}
                  >
                    {item.label}
                    {/* 激活状态指示器 */}
                    {(pathname === item.href || (pathname.includes(item.href) && item.href !== '/')) && (
                      <div className='absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
                    )}
                  </li>
                </Link>
              ))}
            </ul>

            {/* 用户操作区域 */}
            <div className='flex items-center gap-4'>
              {/* 搜索按钮（移动端） */}
              <button
                type='button'
                className='rounded-xl border border-white/5 p-3 text-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:text-white active:scale-95 lg:hidden'
                aria-label={t('search')}
              >
                <Search className='size-5' />
              </button>
              <Link
                href='https://ko-fi.com/C0C81N5Y9L'
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-x-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600'
                title={t('buyMeCoffee')}
              >
                <Coffee className='size-4' />
                <span className='hidden sm:inline'>{t('buyMeCoffee')}</span>
              </Link>
              {/* 语言切换器 */}
              <div className='relative'>
                <LocaleSwitcher />
              </div>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className='mx-3 flex items-center gap-x-4 lg:hidden'>
            <MenuBtn open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>

        {/* 顶部装饰条 */}
        <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent' />
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
