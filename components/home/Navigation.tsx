'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import BaseImage from '../image/BaseImage';
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
      <header className='sticky left-0 top-0 z-50 flex h-[72px] backdrop-blur-lg bg-slate-900/80 border-b border-white/10 px-5 lg:px-0'>
        {/* 背景装饰效果 */}
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5' />

        <nav className='relative mx-auto flex max-w-pc flex-1 items-center'>
          {/* Logo 区域 */}
          <div className='group'>
            <Link className='flex items-center gap-3 hover:scale-105 transition-transform duration-300' href='/' title={t('title')}>
              <div className='relative'>
                <BaseImage
                  src='/images/toolsify-ai.svg'
                  alt={t('title')}
                  title={t('title')}
                  width={64}
                  height={64}
                  className='size-[58px] lg:size-16'
                />
                {/* Logo 光晕效果 */}
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300' />
              </div>
              <div className='hidden lg:block'>
                <div className='text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
                  Tap4 AI
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
                      'relative flex h-full items-center px-3 py-2 rounded-lg text-white/60 transition-all duration-300 hover:text-white hover:bg-white/5',
                      pathname === item.href && 'text-white bg-gradient-to-r from-indigo-500/10 to-purple-500/10',
                      pathname.includes(item.href) && item.href !== '/' && 'text-white bg-gradient-to-r from-indigo-500/10 to-purple-500/10',
                    )}
                  >
                    {item.label}
                    {/* 激活状态指示器 */}
                    {(pathname === item.href || (pathname.includes(item.href) && item.href !== '/')) && (
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full' />
                    )}
                  </li>
                </Link>
              ))}
            </ul>

            {/* 用户操作区域 */}
            <div className='flex items-center gap-4'>
              {/* 搜索按钮（移动端） */}
              <button className='lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200'>
                <Search className='size-5' />
              </button>

              {/* 语言切换器 */}
              <div className='relative'>
                <LocaleSwitcher />
              </div>

              {/* 主题切换按钮 */}
              <button className='hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200'>
                <div className='w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400' />
                <span className='text-sm'>Dark</span>
              </button>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className='mx-3 flex items-center gap-x-4 lg:hidden'>
            <MenuBtn open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>

        {/* 顶部装饰条 */}
        <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent' />
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
