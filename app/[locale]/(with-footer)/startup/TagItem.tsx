export default function TagItem({ title }: { title: string }) {
  return (
    <div className='w-fit rounded-lg border border-white/20 bg-white/5 px-2 py-0.5 text-center text-[10px] text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white'>
      {title}
    </div>
  );
}
