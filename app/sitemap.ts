import { type MetadataRoute } from 'next';
import { locales } from '@/i18n';

import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';

// Helper function to normalize URL
function normalizeUrl(baseUrl: string, locale: string, path: string): string {
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const routePath = path ? `/${path}` : '';
  // Ensure no double slashes and proper trailing
  return `${baseUrl}${localePath}${routePath}`.replace(/([^:]\/)\/+/g, '$1');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sitemapRoutes: Array<{
    path: string;
    lastModified: Date;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
  }> = [
    {
      path: '',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      path: 'explore',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      path: 'submit',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      path: 'startup',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      path: 'blog',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Add blog post pages
  const blogPostRoutes = BLOG_POSTS.map((post) => ({
    path: `blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Add blog pagination pages
  const totalPages = Math.ceil(BLOG_POSTS.length / BLOG_PAGE_SIZE);
  const blogPaginationRoutes = [];
  for (let i = 2; i <= totalPages; i += 1) {
    blogPaginationRoutes.push({
      path: `blog/page/${i}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    });
  }

  const allRoutes = [...sitemapRoutes, ...blogPostRoutes, ...blogPaginationRoutes];

  // Generate sitemap entries for all locales
  const sitemapData: MetadataRoute.Sitemap = allRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: normalizeUrl(BASE_URL, locale, route.path),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  return sitemapData;
}
