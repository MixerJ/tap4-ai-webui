import type { WebNavigation } from '@/db/supabase/types';

import HomeNativeAdCard from '@/components/ads/HomeNativeAdCard';

import WebNavCard from './WebNavCard';

type WebNavCardItem = Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>;

interface WebNavCardListProps {
  dataList: WebNavCardItem[];
  injectedAdSlot?: string;
  adInsertAfter?: number;
}

export default function WebNavCardList({ dataList, injectedAdSlot, adInsertAfter = 3 }: WebNavCardListProps) {
  const adSlot = injectedAdSlot && dataList.length >= 8 ? injectedAdSlot : undefined;

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5'>
      {dataList.map((item, index) => (
        <div key={item.id} className='contents'>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <WebNavCard {...item} />
          {adSlot && index === adInsertAfter - 1 && <HomeNativeAdCard adSlot={adSlot} />}
        </div>
      ))}
    </div>
  );
}
