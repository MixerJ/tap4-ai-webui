import type { WebNavigation } from '@/db/supabase/types';

import WebNavCard from './WebNavCard';

export default function WebNavCardList({ dataList }: { dataList: WebNavigation[] }) {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5'>
      {dataList.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WebNavCard key={item.id} {...item} />
      ))}
    </div>
  );
}
