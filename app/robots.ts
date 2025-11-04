import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: ['/', '/ads.txt'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: ['/', '/ads.txt'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    // host: BASE_URL,
  };
}
