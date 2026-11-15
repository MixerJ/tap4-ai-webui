import assert from 'node:assert/strict';
import test from 'node:test';

import { BLOG_POSTS } from '../../lib/blog';
import { TOOL_CONTENT } from '../../lib/tool-content';
import { getAvailableToolLocales, TOOL_LOCALES } from '../../lib/tool-localization';

const editedSlugs = [
  'claude-4-vs-gpt-5-code-benchmarks-2026',
  'gpt-5-developer-migration-playbook',
  'gpt-5-1-codex-max-github-copilot',
  'opencode-the-open-source-ai-coding-agent',
  'gemini-2-5-pro-getting-started-guide',
  'openai-operator',
];

test('edited articles provide complete, distinct localized bodies and dated sources', () => {
  const paragraphs = new Map<string, string>();
  editedSlugs.forEach((slug) => {
    const post = BLOG_POSTS.find((item) => item.slug === slug);
    assert.ok(post, slug);
    assert.equal(post.updatedAt, '2026-11-15', slug);
    const bodies = new Set<string>();
    TOOL_LOCALES.forEach((locale) => {
      const body = post.content[locale];
      assert.ok(post.title[locale]?.trim() && post.excerpt[locale]?.trim(), `${slug}/${locale}: metadata`);
      assert.ok(body && body.length > 600, `${slug}/${locale}: complete body`);
      assert.ok((body.match(/^## /gm) || []).length >= 3, `${slug}/${locale}: useful sections`);
      assert.ok((body.match(/https:\/\//g) || []).length >= 2, `${slug}/${locale}: sources`);
      assert.ok(!bodies.has(body), `${slug}/${locale}: no copied language body`);
      bodies.add(body);
      body
        .split(/\n\s*\n/)
        .filter((p) => p.length > 180 && !p.includes('https://') && !p.includes('```'))
        .forEach((p) => {
          const key = `${locale}:${p.trim()}`;
          assert.ok(
            !paragraphs.has(key) || paragraphs.get(key) === slug,
            `${slug}/${locale}: reused paragraph from ${paragraphs.get(key)}`,
          );
          paragraphs.set(key, slug);
        });
    });
  });
});

test('priority tools have nine actual translations with sources', () => {
  Object.entries(TOOL_CONTENT).forEach(([slug, translations]) => {
    assert.deepEqual(getAvailableToolLocales(translations), [...TOOL_LOCALES], slug);
    TOOL_LOCALES.forEach((locale) => {
      const copy = translations[locale];
      assert.ok(copy && copy.detail.length > 450, `${slug}/${locale}`);
      assert.ok(copy.detail.includes('https://'), `${slug}/${locale}: official source`);
    });
  });
});
