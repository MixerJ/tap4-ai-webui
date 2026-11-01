import assert from 'node:assert/strict';

// Run against a started production build; HTTP only, never loads advertising scripts.
const base = process.argv[2] || 'http://localhost:3000';
async function read(path) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' });
  return { response, html: await response.text() };
}
const noindex = (html) => /<meta\s+name="robots"\s+content="[^"]*noindex/.test(html);

await Promise.all(
  ['', '/cn', '/tw', '/jp', '/de', '/es', '/fr', '/pt', '/ru'].map(async (locale) => {
    const { response, html } = await read(`${locale}/explore`);
    assert.equal(response.status, 200, `${locale} explore status`);
    assert.ok(!html.includes('<title>Metadata.'), `${locale} translated title`);
    assert.ok(!noindex(html), `${locale} explore indexable`);
    assert.ok(html.includes(`href="${locale}/explore/page/2"`), `${locale} canonical pagination link`);
    assert.ok(html.includes('hrefLang="zh-CN"') || html.includes('hreflang="zh-CN"'), 'standard language tag');
    assert.ok(!/hreflang="(?:cn|tw|jp)"/.test(response.headers.get('link') || ''), 'no invalid HTTP language tags');
  }),
);

for (const path of ['/explore', '/blog', '/category/text-writing']) {
  for (const locale of ['', '/en', '/cn']) {
    const { response } = await read(`${locale}${path}/page/1?ref=check`);
    assert.equal(response.status, 308, `${locale}${path}/page/1 status`);
    const destination = new URL(response.headers.get('location'), base);
    assert.equal(destination.pathname, `${locale === '/en' ? '' : locale}${path}`);
    assert.equal(destination.searchParams.get('ref'), 'check');
  }
}

for (const path of [
  '/explore/page/999999',
  '/category/text-writing/page/999999',
  '/blog/page/999999',
  '/explore/page/0',
]) {
  const { response, html } = await read(path);
  assert.ok([200, 404].includes(response.status), `${path} not an operational error`);
  assert.ok(noindex(html), `${path} not indexable, including Next.js streamed not-found`);
}
const valid = await read('/cn/explore/page/2');
assert.equal(valid.response.status, 200);
assert.ok(!noindex(valid.html));
assert.ok(valid.html.includes('/cn/explore/page/2'));
const sitemap = await read('/sitemap.xml');
assert.equal(sitemap.response.status, 200);
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, 'no duplicate sitemap URLs');
assert.ok(
  urls.some((url) => url.includes('/ai/')),
  'tool URLs present',
);
assert.ok(!urls.some((url) => /\/page\/1$/.test(url)), 'no redirecting page-one URLs');
console.log(
  `PASS: 9 locales, 9 permanent redirects, 4 non-indexable invalid pages, valid page and ${urls.length} sitemap URLs`,
);
