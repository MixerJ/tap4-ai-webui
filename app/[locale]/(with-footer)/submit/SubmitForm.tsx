'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@/db/supabase/client';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FORM_PLACEHOLDER, WEBSITE_EXAMPLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Spinning from '@/components/Spinning';

export default function SubmitForm({ className }: { className?: string }) {
  const supabase = createClient();
  const t = useTranslations('Submit');

  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState('');
  const [url, setUrl] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const websiteName = website.trim();
    const websiteUrl = url.trim();

    if (!websiteName || !websiteUrl) {
      toast.error(t('networkError'));
      return;
    }

    let errMsg: string = t('networkError');
    try {
      const parsedUrl = new URL(websiteUrl);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('INVALID_URL_PROTOCOL');
      }

      setLoading(true);
      const { error } = await supabase.from('submit').insert({
        name: websiteName,
        url: parsedUrl.toString(),
        // email: ''
      });
      if (error) {
        errMsg = error.message;
        throw new Error();
      }
      toast.success(t('success'));
      setWebsite('');
      setUrl('');
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'group relative flex h-auto min-h-[449px] w-full max-w-lg flex-col justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 lg:h-auto lg:min-h-[557px] lg:px-8 lg:py-8',
        className,
      )}
    >
      {/* 背景渐变效果 */}
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      <div className='relative space-y-4 lg:space-y-6'>
        <div className='space-y-2'>
          <label htmlFor='submit-website' className='text-sm font-semibold text-white lg:text-base'>
            {t('website')}
          </label>
          <input
            id='submit-website'
            type='text'
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            placeholder='Toolsify AI'
            className='h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 lg:h-14'
            autoComplete='organization'
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='submit-url' className='text-sm font-semibold text-white lg:text-base'>
            {t('url')}
          </label>
          <input
            id='submit-url'
            type='url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={FORM_PLACEHOLDER}
            className='h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 lg:h-14'
            autoComplete='url'
            inputMode='url'
            required
          />
        </div>
      </div>

      <div className='relative mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-6'>
        <button
          type='submit'
          disabled={loading}
          className='relative mt-auto flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 lg:h-14'
        >
          {loading ? (
            <>
              <Spinning className='size-5' />
              <span>{t('submit')}</span>
            </>
          ) : (
            t('submit')
          )}
        </button>
        <p className='text-xs leading-relaxed text-white/60 lg:text-sm'>
          {t('add')} <span className='text-white'>{WEBSITE_EXAMPLE}</span> {t('text')}
        </p>
      </div>
    </form>
  );
}
