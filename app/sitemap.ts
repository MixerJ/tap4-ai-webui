import { type MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { locales } from '@/i18n';

import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE, EXPLORE_PAGE_SIZE, InfoPageSize } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';
import type { Database } from '@/db/supabase/types';

type RouteConfig = {
  path: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

function normalizeUrl(baseUrl: string, locale: string, path: string): string {
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const routePath = path ? `/${path}` : '';
  return `${baseUrl}${localePath}${routePath}`.replace(/([^:]\/)\/+/g, '$1');
}

function safeDate(value?: string | null, fallback?: Date): Date {
  if (!value) return fallback || new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback || new Date() : parsed;
}

function buildStaticRoutes(now: Date): RouteConfig[] {
  const latestBlogModified = BLOG_POSTS.length
    ? new Date(
        Math.max(
          ...BLOG_POSTS.map((post) => {
            const parsed = new Date(post.date).getTime();
            return Number.isNaN(parsed) ? 0 : parsed;
          }),
        ),
      )
    : now;

  const baseRoutes: RouteConfig[] = [
    { path: '', lastModified: now, changeFrequency: 'daily', priority: 1 },
    { path: 'explore', lastModified: now, changeFrequency: 'daily', priority: 1 },
    { path: 'submit', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { path: 'startup', lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { path: 'blog', lastModified: latestBlogModified, changeFrequency: 'weekly', priority: 0.9 },
    { path: 'privacy-policy', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { path: 'terms-of-service', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogPostRoutes: RouteConfig[] = BLOG_POSTS.map((post) => ({
    path: `blog/${post.slug}`,
    lastModified: safeDate(post.date, latestBlogModified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const totalBlogPages = Math.ceil(BLOG_POSTS.length / BLOG_PAGE_SIZE);
  const blogPaginationRoutes: RouteConfig[] = [];
  for (let i = 2; i <= totalBlogPages; i += 1) {
    blogPaginationRoutes.push({
      path: `blog/page/${i}`,
      lastModified: latestBlogModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return [...baseRoutes, ...blogPostRoutes, ...blogPaginationRoutes];
}

function toSitemap(routes: RouteConfig[], baseUrl: string): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: normalizeUrl(baseUrl, locale, route.path),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  sitemapData.forEach((entry) => {
    unique.set(entry.url, entry);
  });

  return Array.from(unique.values()).sort((a, b) => a.url.localeCompare(b.url));
}

async function fetchDynamicRoutes(now: Date): Promise<RouteConfig[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const [{ data: webNames }, { data: categories }, { count: totalWebCount }] = await Promise.all([
    supabase.from('web_navigation').select('name,collection_time').neq('name', ''),
    supabase.from('navigation_category').select('name,create_time').neq('name', ''),
    supabase.from('web_navigation').select('*', { count: 'exact', head: true }),
  ]);

  const aiRoutes: RouteConfig[] =
    webNames?.map((item) => ({
      path: `ai/${encodeURIComponent(item.name)}`,
      lastModified: safeDate(item.collection_time, now),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) || [];

  const categoryRoutes: RouteConfig[] =
    categories?.map((item) => ({
      path: `category/${encodeURIComponent(item.name)}`,
      lastModified: safeDate(item.create_time, now),
      changeFrequency: 'daily',
      priority: 0.8,
    })) || [];

  const categoryPaginationBatches = await Promise.all(
    (categories || []).map(async (category) => {
      const { count } = await supabase
        .from('web_navigation')
        .select('*', { count: 'exact', head: true })
        .eq('category_name', category.name);

      const totalPages = Math.ceil((count || 0) / InfoPageSize);
      const pages: RouteConfig[] = [];
      for (let i = 2; i <= totalPages; i += 1) {
        pages.push({
          path: `category/${encodeURIComponent(category.name)}/page/${i}`,
          lastModified: now,
          changeFrequency: 'daily',
          priority: 0.6,
        });
      }
      return pages;
    }),
  );

  const categoryPaginationRoutes = categoryPaginationBatches.flat();

  const explorePaginationRoutes: RouteConfig[] = [];
  const totalExplorePages = Math.ceil((totalWebCount || 0) / EXPLORE_PAGE_SIZE);
  for (let i = 2; i <= totalExplorePages; i += 1) {
    explorePaginationRoutes.push({
      path: `explore/page/${i}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    });
  }

  return [...aiRoutes, ...categoryRoutes, ...categoryPaginationRoutes, ...explorePaginationRoutes];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseUrl = BASE_URL || 'https://toolsify.ai';
  const staticRoutes = buildStaticRoutes(now);

  try {
    const dynamicRoutes = await fetchDynamicRoutes(now);
    return toSitemap([...staticRoutes, ...dynamicRoutes], baseUrl);
  } catch {
    return toSitemap(staticRoutes, baseUrl);
  }
}
