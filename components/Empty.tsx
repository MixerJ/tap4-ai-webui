import { Search } from 'lucide-react';

export default function Empty({ title }: { title: string }) {
  return (
    <div className='flex flex-col items-center gap-6 py-16 lg:py-24'>
      {/* 装饰背景 */}
      <div className='relative'>
        <div className='flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-white/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm'>
          <Search className='h-16 w-16 text-white/40' />
        </div>
        <div className='absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-2xl' />
      </div>

      {/* 文字内容 */}
      <div className='flex flex-col items-center gap-2 text-center'>
        <p className='max-w-md whitespace-pre-wrap text-base text-white/60 lg:text-lg'>{title}</p>
      </div>
    </div>
  );
}
