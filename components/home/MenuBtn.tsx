'use client';

import { cn } from '@/lib/utils';

function BarItem({ className }: { className: string }) {
  return (
    <span
      className={cn(
        'absolute block h-[2px] w-[18px] transform bg-current bg-white transition duration-300 ease-in-out',
        className,
      )}
    />
  );
}

export default function MenuBtn({
  open,
  onClick,
}: {
  open: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type='button'
      className='relative ml-3 rounded-xl border border-white/5 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 active:scale-95'
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
    >
      <div className='relative block h-5 w-5'>
        <BarItem className={open ? 'top-2 rotate-45' : 'top-1'} />
        <BarItem className={cn('top-2', open ? 'opacity-0' : '')} />
        <BarItem className={open ? 'top-2 -rotate-45' : 'top-3'} />
      </div>
      <span className='sr-only'>menu</span>
    </button>
  );
}
