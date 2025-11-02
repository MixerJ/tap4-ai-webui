import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STARTUP_LIST } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import PriceItem from './PriceItem';
import TagItem from './TagItem';

export default function DesktopTable() {
  const t = useTranslations('Startup.table');

  return (
    <div className='mb-10 hidden w-full lg:block'>
      <div className='overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm'>
        <Table className='border-separate border-spacing-y-0'>
          <TableHeader>
            <TableRow className='tr-rounded h-16 rounded-t-xl border-none bg-white/5 hover:bg-white/5'>
              <TableHead className='w-[100px] text-base font-semibold text-white lg:text-lg'>{t('da')}</TableHead>
              <TableHead className='w-[200px] text-base font-semibold text-white lg:text-lg'>{t('website')}</TableHead>
              <TableHead className='w-[200px] text-base font-semibold text-white lg:text-lg'>{t('tags')}</TableHead>
              <TableHead className='w-[200px] text-base font-semibold text-white lg:text-lg'>{t('price')}</TableHead>
              <TableHead className='w-16 text-base font-semibold text-white lg:text-lg'>{t('submission')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STARTUP_LIST.map((item, index) => (
              <TableRow
                key={item.DA}
                className={cn(
                  'h-16 border-none bg-transparent transition-all duration-200 hover:bg-white/5',
                  index === STARTUP_LIST.length - 1 && 'rounded-b-xl',
                )}
              >
                <TableCell className='text-sm text-white/80 lg:text-base'>{item.DA}</TableCell>
                <TableCell className='text-base font-medium text-white lg:text-lg'>{item.Website}</TableCell>
                <TableCell className='flex gap-1.5'>
                  {item.Tag ? item.Tag.split(',').map((tag) => <TagItem key={tag} title={tag} />) : null}
                </TableCell>
                <TableCell>
                  <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === 'free'} />
                </TableCell>
                <TableCell>
                  <a
                    href={item.URL}
                    target='_blank'
                    rel='noreferrer'
                    className='flex-center group h-10 w-full rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10'
                  >
                    <SquareArrowOutUpRight className='text-white/60 transition-colors duration-200 group-hover:text-indigo-400' />
                    <span className='sr-only'>{item.Website}</span>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
