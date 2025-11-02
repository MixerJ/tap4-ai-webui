import { type MetadataRoute } from 'next';
import { locales } from '@/i18n';

import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: '', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'explore',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'submit',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'startup',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Add blog post pages
  const blogPostRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Add blog pagination pages
  const totalPages = Math.ceil(BLOG_POSTS.length / BLOG_PAGE_SIZE);
  const blogPaginationRoutes: MetadataRoute.Sitemap = [];
  for (let i = 2; i <= totalPages; i += 1) {
    blogPaginationRoutes.push({
      url: `blog/page/${i}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  const allRoutes = [...sitemapRoutes, ...blogPostRoutes, ...blogPaginationRoutes];

  const sitemapData = allRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === 'en' ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    }),
  );

  return sitemapData;
}
