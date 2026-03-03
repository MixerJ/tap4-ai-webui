import { notFound } from 'next/navigation';

export default async function Layout({ children, params }: { children: React.ReactNode; params: { code?: string } }) {
  if (!params.code) {
    notFound();
  }

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

      <div className='flex-y-center relative mx-auto w-full max-w-pc px-3'>{children}</div>
    </div>
  );
}
