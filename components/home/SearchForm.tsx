'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const FormSchema = z.object({
  search: z.string(),
});

export default function SearchForm({ defaultSearch }: { defaultSearch?: string }) {
  const t = useTranslations('Home');
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: defaultSearch || '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!data.search.trim()) return;
    router.push(`/query/${data.search}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center'>
                  {/* 搜索框背景效果 */}
                  <div className='absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30' />

                  <Input
                    placeholder={t('search')}
                    {...field}
                    className='relative h-12 w-full rounded-full border-0 bg-transparent pr-14 pl-6 text-white placeholder:text-white/50 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none lg:h-14 lg:w-[480px] lg:pr-16 lg:pl-8 lg:text-lg'
                  />

                  {/* 分割线 */}
                  <div className='absolute right-12 h-6 w-px bg-white/20 lg:right-14' />

                  {/* 搜索按钮 */}
                  <button
                    type='submit'
                    className='absolute right-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 text-white transition-all duration-300 hover:from-indigo-400 hover:to-purple-400 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/25 lg:right-3 lg:p-3'
                  >
                    <Search className='size-4 lg:size-5' />
                    <span className='sr-only'>search</span>
                  </button>

                  {/* 搜索框聚焦时的装饰效果 */}
                  <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-300 focus-within:opacity-100 -z-10 blur-sm' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
