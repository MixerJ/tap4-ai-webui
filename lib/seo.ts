import { Metadata } from 'next';

import { languages } from '@/i18n';
import { BASE_URL } from '@/lib/env';

type MetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string | string[];
  type?: 'website' | 'article';
  imagePath?: string;
};

function normalizeBaseUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function normalizePath(path: string): string {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
}

export function getLocalizedPath(locale: string, path = ''): string {
  const cleanPath = normalizePath(path);
  return locale === 'en' ? cleanPath || '/' : `/${locale}${cleanPath}`;
}

function buildAbsoluteUrl(locale: string, path = ''): string {
  const base = normalizeBaseUrl(BASE_URL || 'https://toolsify.ai');
  return `${base}${getLocalizedPath(locale, path)}`;
}

export function buildLocaleAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languagesMap = languages.reduce<Record<string, string>>((acc, item) => {
    acc[item.lang] = buildAbsoluteUrl(item.lang, path);
    return acc;
  }, {});

  return {
    canonical: buildAbsoluteUrl(locale, path),
    languages: {
      ...languagesMap,
      'x-default': buildAbsoluteUrl('en', path),
    },
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  type = 'website',
  imagePath = '/images/toolsify-ai.png',
}: MetadataInput): Metadata {
  const url = buildAbsoluteUrl(locale, path);
  const imageUrl = `${normalizeBaseUrl(BASE_URL || 'https://toolsify.ai')}${normalizePath(imagePath)}`;

  return {
    metadataBase: new URL(normalizeBaseUrl(BASE_URL || 'https://toolsify.ai')),
    title,
    description,
    keywords,
    alternates: buildLocaleAlternates(locale, path),
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: 'Toolsify AI',
      locale,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
