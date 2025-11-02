import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STARTUP_LIST } from '@/lib/constants';

import PriceItem from './PriceItem';
import TagItem from './TagItem';

export default function MobileTable() {
  const t = useTranslations('Startup.table');

  return (
    <div className='mb-10 space-y-2 lg:hidden'>
      <div className='flex h-10 items-center justify-between rounded-t-xl border border-white/10 bg-white/10 px-3 text-xs font-semibold text-white backdrop-blur-sm'>
        <div>{t('website')}</div>
        <div>{t('submission')}</div>
      </div>
      <div className='flex flex-col gap-2'>
        {STARTUP_LIST.map((item) => (
          <div
            key={item.DA}
            className='flex min-h-[99px] items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10'
          >
            <div className='flex flex-1 flex-col gap-2'>
              <div className='text-sm font-medium text-white'>
                (DA{item.DA}) {item.Website}
              </div>
              <div className='flex flex-wrap gap-1.5'>
                {item.Tag ? item.Tag.split(',').map((tag) => <TagItem key={tag} title={tag} />) : null}
              </div>
              <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === 'free'} />
            </div>
            <a
              href={item.URL}
              target='_blank'
              rel='noreferrer'
              className='flex-center group h-[75px] w-9 rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10'
            >
              <SquareArrowOutUpRight className='text-white/60 transition-colors duration-200 group-hover:text-indigo-400' />
              <span className='sr-only'>{item.Website}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
