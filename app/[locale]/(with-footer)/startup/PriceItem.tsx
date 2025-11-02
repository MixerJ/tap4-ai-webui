import { cn } from '@/lib/utils';

export default function PriceItem({ title, isFree }: { title: string; isFree: boolean }) {
  return (
    <div
      className={cn(
        'flex-center w-fit gap-1.5 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 text-xs backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10 lg:text-sm',
        isFree
          ? 'border-green-500/50 bg-green-500/10 text-green-400 hover:border-green-500/70 hover:bg-green-500/20'
          : 'text-white/70 hover:text-white',
      )}
    >
      <div
        className={cn('size-1.5 rounded-full transition-colors duration-200', isFree ? 'bg-green-400' : 'bg-white/60')}
      />
      {title}
    </div>
  );
}
