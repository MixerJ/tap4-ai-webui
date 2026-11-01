import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import parsePageNumber from '@/lib/pagination';
import { buildPageMetadata, getLocalizedPath } from '@/lib/seo';
import { formatCurrentMonth } from '@/lib/utils/timeUtils';

import ExploreList, { validateExplorePage } from '../../ExploreList';

export const revalidate = RevalidateOneHour * 6;

export async function generateMetadata({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string };
}): Promise<Metadata> {
  const currentPage = parsePageNumber(pageNum);
  if (currentPage === null) {
    notFound();
  }
  if (currentPage === 1) permanentRedirect(getLocalizedPath(locale, '/explore'));
  await validateExplorePage(currentPage);

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

export default async function Page({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string | undefined };
}) {
  const currentPage = parsePageNumber(pageNum);
  if (currentPage === null) {
    notFound();
  }
  if (currentPage === 1) permanentRedirect(getLocalizedPath(locale, '/explore'));
  await validateExplorePage(currentPage);

  return <ExploreList locale={locale} pageNum={pageNum} />;
}
