import assert from 'node:assert/strict';
import test from 'node:test';

import fetchAllRows from '../../lib/fetch-all-rows';

test('continues when the server caps a range below the requested batch size', async () => {
  const rows = ['a', 'b', 'c', 'd', 'e'];
  const offsets: number[] = [];
  const result = await fetchAllRows(async (from) => {
    offsets.push(from);
    return { data: rows.slice(from, from + 2), count: rows.length, error: null };
  });
  assert.deepEqual(result, rows);
  assert.deepEqual(offsets, [0, 2, 4]);
});

test('rejects a failed later batch instead of returning a partial sitemap', async () => {
  await assert.rejects(
    fetchAllRows(async (from) =>
      from === 0
        ? { data: ['a'], count: 2, error: null }
        : { data: null, count: null, error: { message: 'unavailable' } },
    ),
    /unavailable/,
  );
});

test('rejects missing rows and changing counts instead of publishing partial data', async () => {
  await assert.rejects(
    fetchAllRows(async () => ({ data: [], count: 1, error: null })),
    /incomplete/,
  );
  await assert.rejects(
    fetchAllRows(async (from) => ({ data: ['a'], count: from === 0 ? 2 : 3, error: null })),
    /changed/,
  );
});

test('allows a genuinely empty table', async () => {
  assert.deepEqual(await fetchAllRows(async () => ({ data: [], count: 0, error: null })), []);
});
