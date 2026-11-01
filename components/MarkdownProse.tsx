import { locales } from '@/i18n';
import Markdown, { defaultUrlTransform } from 'react-markdown';

import { getLocalizedPath } from '@/lib/seo';

function H1Component({ children }: { children?: React.ReactNode }) {
  return <h2 className='text-3xl font-bold lg:text-4xl'>{children}</h2>;
}

export default function MarkdownProse({
  markdown,
  className,
  locale,
}: {
  markdown: string;
  className?: string;
  locale?: string;
}) {
  // Remove the first heading (# Title) from markdown if it exists
  // This prevents duplicate titles when the page already has a title
  const processedMarkdown = markdown.replace(/^#\s+.+$/m, '').trim();

  return (
    <article className='prose prose-invert mx-auto max-w-pc'>
      <Markdown
        className={className}
        urlTransform={(url, key) => {
          const safeUrl = defaultUrlTransform(url);
          if (key !== 'href' || !locale || !safeUrl.startsWith('/') || safeUrl.startsWith('//')) return safeUrl;
          const firstSegment = safeUrl.split(/[/?#]/)[1];
          if (locales.includes(firstSegment) || /\.[^/]+$/.test(safeUrl.split(/[?#]/)[0]) || firstSegment === 'api') {
            return safeUrl;
          }
          return getLocalizedPath(locale, safeUrl);
        }}
        components={{
          h1: H1Component,
        }}
      >
        {processedMarkdown}
      </Markdown>
    </article>
  );
}
