import { Metadata } from 'next';
import { languages } from '@/i18n';

import { BASE_URL } from '@/lib/env';

type MetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string | string[];
  robots?: Metadata['robots'];
  type?: 'website' | 'article';
  imagePath?: string;
};

type SocialMetadataInput = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
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

export function buildLocalizedUrl(locale: string, path = ''): string {
  return buildAbsoluteUrl(locale, path);
}

export function buildLocaleAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languagesMap = languages.reduce<Record<string, string>>((acc, item) => {
    acc[item.code] = buildAbsoluteUrl(item.lang, path);
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

export function buildAlternates(locale: string, path = ''): Metadata['alternates'] {
  return buildLocaleAlternates(locale, path);
}

export function buildSocialMetadata({
  locale,
  path = '',
  title,
  description,
  image,
}: SocialMetadataInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const imageUrl = image?.url || `${normalizeBaseUrl(BASE_URL || 'https://toolsify.ai')}/og-image.jpg`;
  const imageAlt = image?.alt || 'Toolsify AI';

  return {
    openGraph: {
      type: 'website',
      title,
      description,
      url: buildAbsoluteUrl(locale, path),
      siteName: 'Toolsify AI',
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          width: image?.width,
          height: image?.height,
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

export function buildRobotsMeta(): NonNullable<Metadata['robots']> {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function buildMetadataBase(): URL {
  return new URL(normalizeBaseUrl(BASE_URL || 'https://toolsify.ai'));
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  robots,
  type = 'website',
  imagePath = '/images/toolsify-ai.png',
}: MetadataInput): Metadata {
  const url = buildAbsoluteUrl(locale, path);
  const imageUrl = imagePath.startsWith('http')
    ? imagePath
    : `${normalizeBaseUrl(BASE_URL || 'https://toolsify.ai')}${normalizePath(imagePath)}`;

  return {
    metadataBase: new URL(normalizeBaseUrl(BASE_URL || 'https://toolsify.ai')),
    title,
    description,
    keywords,
    robots,
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
