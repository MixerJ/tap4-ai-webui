import { RevalidateOneHour } from '@/lib/constants';

import ExploreList from './ExploreList';

export const revalidate = RevalidateOneHour * 6;

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <ExploreList locale={locale} />;
}
