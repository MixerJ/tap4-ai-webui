import { RevalidateOneHour } from '@/lib/constants';

import ExploreList from '../../ExploreList';

export const revalidate = RevalidateOneHour * 6;

export default function page({
  params: { locale, pageNum },
}: {
  params: { locale: string; pageNum: string | undefined };
}) {
  return <ExploreList locale={locale} pageNum={pageNum} />;
}
