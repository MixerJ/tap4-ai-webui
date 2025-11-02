import Link from 'next/link';

export function TagItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='group relative flex h-[38px] items-center justify-center gap-[2px] whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white'>
      {/* 背景渐变效果 */}
      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
      <span className='relative'>{children}</span>
    </div>
  );
}

export function TagLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} title={name}>
      <TagItem>{name}</TagItem>
    </Link>
  );
}

export function TagList({ data }: { data: { name: string; href: string; id: string }[] }) {
  return (
    <ul className='flex max-w-full flex-1 flex-wrap items-center justify-center gap-3'>
      {data.map((item) => (
        <li key={item.href}>
          <TagLink name={item.name} href={item.href} />
        </li>
      ))}
    </ul>
  );
}
