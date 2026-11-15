import assert from 'node:assert/strict';
import test from 'node:test';

import { getAvailableToolLocales, resolveToolContent } from '../../lib/tool-localization';

const original = { title: 'Source', description: 'Original summary', detail: 'Original body' };
const english = { title: 'Reviewed', description: 'Reviewed summary', detail: 'Reviewed English body' };
const chinese = { title: '中文版', description: '中文介绍', detail: '真实的中文正文' };

test('title, summary and body all use the requested complete translation', () => {
  const result = resolveToolContent(original, { en: english, cn: chinese }, 'cn');
  assert.equal(result.title, chinese.title);
  assert.equal(result.description, chinese.description);
  assert.equal(result.detail, chinese.detail);
  assert.equal(result.contentLocale, 'cn');
  assert.equal(result.canonicalLocale, 'cn');
  assert.equal(result.isFallback, false);
});

test('partial and copied English bodies are not advertised as translations', () => {
  const partial = { ...chinese, detail: '' };
  assert.deepEqual(getAvailableToolLocales({ en: english, cn: partial, de: english }), ['en']);
  const result = resolveToolContent(original, { en: english, cn: partial }, 'cn');
  assert.equal(result.detail, english.detail);
  assert.equal(result.title, english.title);
  assert.equal(result.contentLocale, 'en');
  assert.equal(result.canonicalLocale, 'en');
  assert.equal(result.isFallback, true);
});

test('unknown source language is not falsely labeled as the interface language', () => {
  const result = resolveToolContent(original, undefined, 'jp');
  assert.equal(result.detail, original.detail);
  assert.equal(result.contentLocale, undefined);
  assert.equal(result.canonicalLocale, 'en');
  assert.equal(result.isFallback, true);
  assert.deepEqual(getAvailableToolLocales(undefined), []);
});
