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
          <div className='group flex-shrink-0'>
            <Link
              className='flex items-center gap-2 transition-transform duration-300 hover:scale-105 sm:gap-3'
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
              <div className='flex flex-col'>
                <div className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-base font-bold text-transparent sm:text-lg lg:text-xl'>
                  Toolsify AI
                </div>
                <div className='hidden text-[10px] text-white/60 sm:block sm:text-xs lg:text-xs'>
                  AI Tools Directory
                </div>
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
            <div className='flex items-center gap-2 sm:gap-3 lg:gap-4'>
              {/* 搜索按钮（移动端） */}
              <button
                type='button'
                className='rounded-xl border border-white/5 p-2 text-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:text-white active:scale-95 sm:p-2.5 lg:hidden'
                aria-label={t('search')}
              >
                <Search className='size-4 sm:size-5' />
              </button>
              <Link
                href='https://ko-fi.com/C0C81N5Y9L'
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-x-1.5 rounded-lg bg-orange-500 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-orange-600 sm:gap-x-2 sm:px-3 sm:py-2 sm:text-sm lg:gap-x-2 lg:px-3 lg:py-2 lg:text-sm'
                title={t('buyMeCoffee')}
              >
                <Coffee className='size-3.5 sm:size-4 lg:size-4' />
                <span className='hidden sm:inline'>{t('buyMeCoffee')}</span>
              </Link>
              {/* 语言切换器 - 仅在桌面端显示 */}
              <div className='relative hidden lg:block'>
                <LocaleSwitcher />
              </div>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className='ml-2 flex items-center gap-x-3 sm:ml-3 sm:gap-x-4 lg:hidden'>
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
