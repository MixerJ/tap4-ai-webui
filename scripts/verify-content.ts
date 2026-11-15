import assert from 'node:assert/strict';

import { BLOG_POSTS } from '../lib/blog';
import { TOOL_CONTENT } from '../lib/tool-content';
import { TOOL_LOCALES } from '../lib/tool-localization';

const base = process.argv[2] || 'http://localhost:3000';
const tags: Record<string, string> = {
  en: 'en-US',
  cn: 'zh-CN',
  tw: 'zh-TW',
  jp: 'ja-JP',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-BR',
  ru: 'ru-RU',
};
const path = (locale: string, route: string) => `${locale === 'en' ? '' : `/${locale}`}${route}`;
const escape = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
async function read(route: string) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(45000) });
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `${route}: indexable`);
  const schemas = Array.from(html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)).map(
    (match) => JSON.parse(match[1]),
  );
  return { html, schemas };
}

async function main() {
  const posts = BLOG_POSTS.filter((post) => post.updatedAt === '2026-11-15');
  // Three requests at a time so this check does not stress the shared database.
  const checks: Array<() => Promise<void>> = [];
  posts.forEach((post) =>
    TOOL_LOCALES.forEach((locale) =>
      checks.push(async () => {
        const route = path(locale, `/blog/${post.slug}`);
        const { html, schemas } = await read(route);
        const article = schemas.find((schema) => schema['@type'] === 'Article');
        assert.equal(article?.headline, post.title[locale], route);
        assert.equal(article.inLanguage, tags[locale], route);
        assert.equal(article.dateModified, post.updatedAt, route);
        assert.equal(article.author['@type'], 'Organization', route);
        const heading = post.content[locale]?.match(/^## (.*)$/m)?.[1];
        assert.ok(heading && html.includes(escape(heading)), `${route}: translated body heading`);
      }),
    ),
  );
  Object.entries(TOOL_CONTENT).forEach(([slug, copies]) =>
    TOOL_LOCALES.forEach((locale) =>
      checks.push(async () => {
        const route = path(locale, `/ai/${slug}`);
        const { html, schemas } = await read(route);
        const software = schemas.find((schema) => schema['@type'] === 'SoftwareApplication');
        assert.equal(software?.name, copies[locale]?.title, route);
        assert.equal(software.description, copies[locale]?.description, route);
        assert.equal(software.inLanguage, tags[locale], route);
        assert.ok(html.includes(`rel="canonical" href="https://toolsify.ai${route}"`), `${route}: self canonical`);
        const heading = copies[locale]?.detail.match(/^## (.*)$/m)?.[1];
        assert.ok(heading && html.includes(escape(heading)), `${route}: translated detail`);
      }),
    ),
  );
  for (let i = 0; i < checks.length; i += 3) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(checks.slice(i, i + 3).map((check) => check()));
  }
  const original = await read('/cn/ai/toolify-ai');
  assert.ok(original.html.includes('该工具介绍目前以原文显示。'));
  assert.ok(original.html.includes('rel="canonical" href="https://toolsify.ai/ai/toolify-ai"'));
  assert.ok(!/hreflang=/i.test(original.html), 'no invented translation alternates');
  assert.equal(original.schemas.find((s) => s['@type'] === 'SoftwareApplication').inLanguage, undefined);
  const sitemapResponse = await fetch(new URL('/sitemap.xml', base));
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.ok(sitemap.includes('https://toolsify.ai/ai/toolify-ai</loc>'));
  assert.ok(!sitemap.includes('https://toolsify.ai/cn/ai/toolify-ai</loc>'));
  assert.ok(sitemap.includes('https://toolsify.ai/cn/ai/img2-ai</loc>'));
  console.log(`PASS: ${checks.length} localized editions, original-language fallback and sitemap coverage`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
