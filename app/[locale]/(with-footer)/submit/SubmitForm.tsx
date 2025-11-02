'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { createClient } from '@/db/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FORM_PLACEHOLDER, WEBSITE_EXAMPLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinning from '@/components/Spinning';

const FormSchema = z.object({
  website: z.string(),
  url: z.string().url(),
});

export default function SubmitForm({ className }: { className?: string }) {
  const supabase = createClient();
  const t = useTranslations('Submit');

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website: '',
      url: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    let errMsg: any = t('networkError');
    try {
      setLoading(true);
      const { error } = await supabase.from('submit').insert({
        name: formData.website,
        url: formData.url,
        // email: ''
      });
      if (error) {
        errMsg = error.message;
        throw new Error();
      }
      toast.success(t('success'));
      form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'group relative flex h-auto min-h-[449px] w-full max-w-lg flex-col justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 lg:h-auto lg:min-h-[557px] lg:px-8 lg:py-8',
          className,
        )}
      >
        {/* 背景渐变效果 */}
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

        <div className='relative space-y-4 lg:space-y-6'>
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-white lg:text-base'>{t('website')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Toolsify AI'
                    className='h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 lg:h-14'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='text-sm font-semibold text-white lg:text-base'>{t('url')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={FORM_PLACEHOLDER}
                    className='h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white backdrop-blur-sm transition-all duration-200 placeholder:text-white/50 focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 lg:h-14'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='relative mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-6'>
          <button
            type='submit'
            disabled={loading}
            className={cn(
              'relative mt-auto flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 lg:h-14',
            )}
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
    </Form>
  );
}
