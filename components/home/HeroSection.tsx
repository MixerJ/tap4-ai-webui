'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, Zap, Brain, Rocket } from 'lucide-react';

export default function HeroSection() {
    const t = useTranslations('Home');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className='relative min-h-[80vh] flex items-center justify-center overflow-hidden'>
            {/* 动态背景 */}
            <div className='absolute inset-0'>
                {/* 主要背景渐变 */}
                <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' />

                {/* 动态粒子背景 */}
                <div className='absolute inset-0'>
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className='absolute w-1 h-1 bg-indigo-400/20 rounded-full animate-float'
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>

                {/* 几何形状装饰 */}
                <div className='absolute top-20 left-20 w-32 h-32 border border-indigo-500/20 rounded-full animate-float' />
                <div className='absolute bottom-20 right-20 w-24 h-24 border border-purple-500/20 rounded-lg rotate-45 animate-float' style={{ animationDelay: '2s' }} />
                <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500/10 rounded-full animate-pulse' />
            </div>

            {/* 主要内容 */}
            <div className='relative z-10 text-center max-w-4xl mx-auto px-6'>
                {/* 标题区域 */}
                <div className='space-y-6'>
                    {/* 装饰图标 */}
                    <div className='flex justify-center gap-4 mb-6'>
                        <div className='p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'>
                            <Brain className='size-8 text-indigo-400 animate-pulse' />
                        </div>
                        <div className='p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20'>
                            <Zap className='size-8 text-purple-400 animate-pulse' style={{ animationDelay: '0.2s' }} />
                        </div>
                        <div className='p-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20'>
                            <Rocket className='size-8 text-cyan-400 animate-pulse' style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>

                    {/* 主标题 */}
                    <h1 className='text-5xl lg:text-7xl font-bold animate-slide-up'>
                        <span className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent'>
                            Discover AI
                        </span>
                        <br />
                        <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                            Excellence
                        </span>
                    </h1>

                    {/* 副标题 */}
                    <p className='text-xl lg:text-2xl text-white/80 font-light animate-slide-up max-w-2xl mx-auto leading-relaxed' style={{ animationDelay: '0.2s' }}>
                        Your gateway to the world's most powerful AI tools and technologies
                    </p>
                </div>

                {/* 功能亮点 */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up' style={{ animationDelay: '0.4s' }}>
                    <div className='group p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105'>
                        <div className='flex flex-col items-center text-center space-y-3'>
                            <div className='p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500'>
                                <Sparkles className='size-6 text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-white'>Curated Collection</h3>
                            <p className='text-sm text-white/60'>Hand-picked AI tools verified for quality and reliability</p>
                        </div>
                    </div>

                    <div className='group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105'>
                        <div className='flex flex-col items-center text-center space-y-3'>
                            <div className='p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500'>
                                <Brain className='size-6 text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-white'>Smart Categories</h3>
                            <p className='text-sm text-white/60'>Organized by function and industry for easy discovery</p>
                        </div>
                    </div>

                    <div className='group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105'>
                        <div className='flex flex-col items-center text-center space-y-3'>
                            <div className='p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500'>
                                <Rocket className='size-6 text-white' />
                            </div>
                            <h3 className='text-lg font-semibold text-white'>Always Updated</h3>
                            <p className='text-sm text-white/60'>Fresh content and new tools added regularly</p>
                        </div>
                    </div>
                </div>

                {/* CTA 区域 */}
                <div className='mt-12 animate-slide-up' style={{ animationDelay: '0.6s' }}>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <button className='group px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25'>
                            <span className='flex items-center gap-2'>
                                Explore Tools
                                <Rocket className='size-5 transition-transform duration-300 group-hover:translate-x-1' />
                            </span>
                        </button>
                        <button className='px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40'>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* 底部渐变 */}
            <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent' />
        </section>
    );
}
