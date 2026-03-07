import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { formatCurrentMonth } from '@/lib/utils/timeUtils';
import { buildPageMetadata } from '@/lib/seo';

import ExploreList from '../../ExploreList';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string };
}): Promise<Metadata> {
  const currentPage = Number(pageNum);
  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });
  const currentYear = new Date().getFullYear();
  const currentMonth = formatCurrentMonth(locale);

  return buildPageMetadata({
    locale,
    path: `/explore/page/${currentPage}`,
    title: `${t('title', { year: currentYear, month: currentMonth })} - Page ${currentPage}`,
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default function Page({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string | undefined };
}) {
  const currentPage = Number(pageNum);
  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return <ExploreList locale={locale} pageNum={pageNum} />;
}
