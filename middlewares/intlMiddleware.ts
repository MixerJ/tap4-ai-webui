import createMiddleware from 'next-intl/middleware';

import { localePrefix } from '@/app/navigation';

import { locales } from '../i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix,
  // Page metadata already emits ISO language tags; route IDs like cn/jp are not hreflang codes.
  alternateLinks: false,
});

export default intlMiddleware;
