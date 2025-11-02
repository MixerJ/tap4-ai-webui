import Markdown from 'react-markdown';

function H1Component({ children }: { children?: React.ReactNode }) {
  return <h2 className='text-3xl font-bold lg:text-4xl'>{children}</h2>;
}

export default function MarkdownProse({ markdown, className }: { markdown: string; className?: string }) {
  // Remove the first heading (# Title) from markdown if it exists
  // This prevents duplicate titles when the page already has a title
  const processedMarkdown = markdown.replace(/^#\s+.+$/m, '').trim();

  return (
    <article className='prose prose-invert mx-auto max-w-pc'>
      <Markdown
        className={className}
        components={{
          h1: H1Component,
        }}
      >
        {processedMarkdown}
      </Markdown>
    </article>
  );
}
