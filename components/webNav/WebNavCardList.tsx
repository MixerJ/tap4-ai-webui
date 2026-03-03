import type { WebNavigation } from '@/db/supabase/types';

import WebNavCard from './WebNavCard';

type WebNavCardItem = Pick<WebNavigation, 'id' | 'name' | 'thumbnail_url' | 'title' | 'url' | 'content'>;

export default function WebNavCardList({ dataList }: { dataList: WebNavCardItem[] }) {
  return (
    <div className='xs:grid-cols-2 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
      {dataList.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WebNavCard key={item.id} {...item} />
      ))}
    </div>
  );
}
