import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';

import ExploreList from './ExploreList';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });

  return buildPageMetadata({
    locale,
    path: '/explore',
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <ExploreList locale={locale} />;
}
