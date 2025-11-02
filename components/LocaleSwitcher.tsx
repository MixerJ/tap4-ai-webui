'use client';

import { useState } from 'react';
import { languages } from '@/i18n';
import { useLocale } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { usePathname, useRouter } from '../app/navigation';
import Icon from './image/Icon';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [localeVal, setLocaleVal] = useState(currentLocale);

  const onValueChange = (newLocale: string) => {
    setLocaleVal(newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select value={localeVal} defaultValue={currentLocale} onValueChange={onValueChange}>
      <SelectTrigger className='flex h-10 w-[90px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus:border-indigo-500/50 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/20 lg:h-11 lg:w-[100px]'>
        <Icon src='/icons/global.svg' className='size-4 text-white/60 transition-colors duration-200' />
        <SelectValue placeholder='locale'>{localeVal.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent className='rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg'>
        {languages.map((language) => (
          <SelectItem
            value={language.lang}
            key={language.code}
            className='cursor-pointer rounded-lg text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white'
          >
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
