import { type MetadataRoute } from 'next';
import type { Database } from '@/db/supabase/types';
import { locales } from '@/i18n';
import { createClient } from '@supabase/supabase-js';

import { BLOG_POSTS } from '@/lib/blog';
import { BLOG_PAGE_SIZE, EXPLORE_PAGE_SIZE, InfoPageSize } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';
import fetchAllRows from '@/lib/fetch-all-rows';

export const revalidate = 3600;

type RouteConfig = {
  path: string;
  lastModified?: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

function normalizeUrl(baseUrl: string, locale: string, path: string): string {
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const routePath = path ? `/${path}` : '';
  return `${baseUrl}${localePath}${routePath}`.replace(/([^:]\/)\/+/g, '$1');
}

function safeDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function buildStaticRoutes(): RouteConfig[] {
  const latestBlogModified = BLOG_POSTS.length
    ? new Date(
        Math.max(
          ...BLOG_POSTS.map((post) => {
            const parsed = new Date(post.date).getTime();
            return Number.isNaN(parsed) ? 0 : parsed;
          }),
        ),
      )
    : undefined;

  const baseRoutes: RouteConfig[] = [
    { path: '', changeFrequency: 'daily', priority: 1 },
    { path: 'explore', changeFrequency: 'daily', priority: 1 },
    { path: 'submit', changeFrequency: 'monthly', priority: 0.8 },
    { path: 'startup', changeFrequency: 'daily', priority: 0.8 },
    { path: 'blog', lastModified: latestBlogModified, changeFrequency: 'weekly', priority: 0.9 },
    { path: 'privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: 'terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogPostRoutes: RouteConfig[] = BLOG_POSTS.map((post) => ({
    path: `blog/${post.slug}`,
    lastModified: safeDate(post.date),
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

async function fetchDynamicRoutes(): Promise<RouteConfig[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Sitemap requires Supabase configuration');
  }

  // Refresh source data along with the hourly sitemap snapshot.
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 3600 } }) },
  });

  const [tools, categories] = await Promise.all([
    fetchAllRows((from, to) =>
      supabase.from('web_navigation').select('name,category_name', { count: 'exact' }).order('id').range(from, to),
    ),
    fetchAllRows((from, to) =>
      supabase.from('navigation_category').select('name', { count: 'exact' }).order('id').range(from, to),
    ),
  ]);

  const routes: RouteConfig[] = tools
    .filter((tool) => tool.name)
    .map((tool) => ({
      path: `ai/${encodeURIComponent(tool.name)}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  const categoryCounts = new Map<string, number>();
  tools.forEach((tool) => {
    if (tool.category_name) categoryCounts.set(tool.category_name, (categoryCounts.get(tool.category_name) || 0) + 1);
  });

  categories
    .filter((category) => category.name)
    .forEach((category) => {
      const path = `category/${encodeURIComponent(category.name)}`;
      routes.push({ path, changeFrequency: 'daily', priority: 0.8 });
      const totalPages = Math.ceil((categoryCounts.get(category.name) || 0) / InfoPageSize);
      for (let page = 2; page <= totalPages; page += 1) {
        routes.push({ path: `${path}/page/${page}`, changeFrequency: 'daily', priority: 0.6 });
      }
    });

  const totalExplorePages = Math.ceil(tools.length / EXPLORE_PAGE_SIZE);
  for (let page = 2; page <= totalExplorePages; page += 1) {
    routes.push({ path: `explore/page/${page}`, changeFrequency: 'daily', priority: 0.7 });
  }
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Throw on failures so ISR retains its last successful snapshot, never a partial sitemap.
  const dynamicRoutes = await fetchDynamicRoutes();
  return toSitemap([...buildStaticRoutes(), ...dynamicRoutes], BASE_URL);
}
