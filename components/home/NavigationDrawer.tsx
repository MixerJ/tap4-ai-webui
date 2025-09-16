'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

function NavDrawerItem({ isActive, name }: { isActive: boolean; name: string }) {
  return (
    <li
      className={cn(
        'flex h-12 w-full items-center gap-4 rounded-xl border border-white/5 bg-slate-800/60 pl-4 pr-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-700/60',
        isActive &&
          'border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 shadow-lg shadow-indigo-500/10',
      )}
    >
      <div
        className={cn(
          'size-3 rounded-full bg-slate-600 transition-all duration-300',
          isActive && 'bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg shadow-indigo-400/30',
        )}
      />
      <div
        className={cn(
          'text-sm font-medium text-white/60 transition-all duration-300',
          isActive && 'font-semibold text-white',
        )}
      >
        {name}
      </div>
      {/* 激活状态装饰 */}
      {isActive && (
        <div className='ml-auto h-6 w-1 animate-glow rounded-full bg-gradient-to-b from-indigo-400 to-purple-400' />
      )}
    </li>
  );
}

export default function NavigationDrawer({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));

  const onClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const onRoute = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <>
      <div
        className={cn(
          'fixed z-50 h-screen w-screen overflow-hidden backdrop-blur-sm transition-all duration-300',
          isOpen ? 'bg-black/60 opacity-100' : 'pointer-events-none bg-black/0 opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed right-0 top-16 z-[99999] h-[calc(100%-64px)] w-80 transform border-l border-white/10 bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-500 ease-out',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        )}
      >
        {/* 背景装饰 */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5' />
        <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent' />

        <div className='relative flex size-full flex-col gap-4 px-4 py-6'>
          {NavLinks.map((item) => (
            <button type='button' key={item.code} onClick={() => onRoute(item.href)}>
              <NavDrawerItem
                name={item.label}
                isActive={pathname === item.href || (pathname.includes(item.href) && item.href !== '/')}
              />
              <span className='sr-only'>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
