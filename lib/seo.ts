import type { Metadata } from 'next';
import { languages } from '@/i18n';

import { BASE_URL } from './env';

type BuildMetadataParams = {
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

const DEFAULT_IMAGE = {
  url: `${BASE_URL}/og-image.jpg`,
  alt: 'Toolsify AI – Discover the best AI tools',
  width: 1200,
  height: 630,
};

function normalizePath(path: string): string {
  if (!path) {
    return '/';
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.replace(/\/+/g, '/');
}

function buildLocalizedPath(lang: string, path: string): string {
  if (lang === 'en') {
    return normalizePath(path);
  }

  return normalizePath(`/${lang}${normalizePath(path)}`);
}

export function buildLocalizedUrl(lang: string, path: string): string {
  return `${BASE_URL}${buildLocalizedPath(lang, path)}`.replace(/([^:]\/)\/+/g, '$1');
}

export function buildAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languagesMap = Object.fromEntries(languages.map(({ code, lang }) => [code, buildLocalizedUrl(lang, path)]));

  return {
    canonical: buildLocalizedUrl(locale, path),
    languages: languagesMap,
  };
}

export function buildSocialMetadata({
  locale,
  path = '',
  title,
  description,
  image,
}: BuildMetadataParams): Pick<Metadata, 'openGraph' | 'twitter'> {
  const selectedImage = image ?? DEFAULT_IMAGE;

  return {
    openGraph: {
      type: 'website',
      url: buildLocalizedUrl(locale, path),
      title,
      description,
      siteName: 'Toolsify AI',
      locale: languages.find((item) => item.lang === locale)?.code.replace('-', '_') ?? 'en_US',
      alternateLocale: languages
        .map((item) => item.code.replace('-', '_'))
        .filter((code) => code !== (languages.find((item) => item.lang === locale)?.code.replace('-', '_') ?? 'en_US')),
      images: [selectedImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [selectedImage.url],
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
  return new URL(BASE_URL);
}
