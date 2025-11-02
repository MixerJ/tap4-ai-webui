'use client';

import { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface FaqItemProps {
  question: string;
  answers: string[];
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answers, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className='group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10'>
      {/* 背景渐变效果 */}
      <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      <button
        type='button'
        onClick={onToggle}
        className='relative flex w-full items-center justify-between p-5 text-left transition-all duration-300 hover:bg-white/5 lg:p-6'
        aria-expanded={isOpen}
      >
        <div className='flex flex-1 items-start gap-4'>
          <div className='mt-1 flex-shrink-0'>
            <CircleHelp className='size-5 text-indigo-400 lg:size-6' />
          </div>
          <h3 className='flex-1 text-base font-semibold text-white lg:text-lg'>{question}</h3>
        </div>
        <div
          className={cn(
            'ml-4 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-2 transition-all duration-300',
            isOpen && 'rotate-180 bg-gradient-to-r from-indigo-500/30 to-purple-500/30',
          )}
        >
          <ChevronDown className='size-4 text-white/80 lg:size-5' />
        </div>
      </button>

      {/* 展开内容 */}
      <div
        className={cn(
          'relative overflow-hidden transition-all duration-500 ease-in-out',
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className='border-t border-white/10 px-5 pb-5 pt-0 lg:px-6 lg:pb-6'>
          <div className='ml-9 space-y-3 lg:ml-12'>
            {answers.map((answer, index) => (
              <p
                key={`${question}-answer-${answer.slice(0, 20)}`}
                className={cn(
                  'text-sm leading-relaxed text-white/70 transition-all duration-300 lg:text-base',
                  isOpen && 'animate-fade-in-up',
                )}
                style={isOpen ? { animationDelay: `${index * 0.1}s` } : undefined}
              >
                {answer}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const t = useTranslations('Faq');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // 默认展开第一个

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    { question: t('1.question'), answers: [t('1.answer')] },
    {
      question: t('2.question'),
      answers: [t('2.answer-1'), t('2.answer-2'), t('2.answer-3')],
    },
    { question: t('3.question'), answers: [t('3.answer-1'), t('3.answer-2')] },
    { question: t('4.question'), answers: [t('4.answer')] },
    { question: t('5.question'), answers: [t('5.answer')] },
    { question: t('6.question'), answers: [t('6.answer')] },
    { question: t('7.question'), answers: [t('7.answer')] },
    { question: t('8.question'), answers: [t('8.answer')] },
    { question: t('9.question'), answers: [t('9.answer')] },
    { question: t('10.question'), answers: [t('10.answer')] },
  ];

  return (
    <section className='relative mb-20 mt-20 lg:mb-32 lg:mt-32'>
      {/* 装饰性背景 */}
      <div className='absolute inset-0 -z-10'>
        <div className='mx-auto h-full w-full max-w-pc bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent' />
      </div>

      <div className='relative mx-auto max-w-pc px-3 lg:px-0'>
        {/* 标题区域 */}
        <div className='mb-10 text-center lg:mb-16'>
          <div className='mb-4 flex items-center justify-center gap-2'>
            <div className='h-px w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-indigo-500/50' />
            <CircleHelp className='size-6 text-indigo-400 lg:size-8' />
            <div className='h-px w-12 bg-gradient-to-r from-indigo-500/50 via-indigo-500/50 to-transparent' />
          </div>
          <h2 className='bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent lg:text-5xl'>
            {t('title')}
          </h2>
          <p className='mt-4 text-sm text-white/60 lg:text-base'>{t('subTitle')}</p>
        </div>

        {/* FAQ 列表 */}
        <div className='space-y-4 pb-5 lg:space-y-5 lg:pb-8'>
          {faqData.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answers={item.answers}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
