import assert from 'node:assert/strict';
import test from 'node:test';

import fetchWithReadRetry from '../../lib/fetch-read-retry';

test('recovers one failed read without masking the final error', async () => {
  let calls = 0;
  const response = await fetchWithReadRetry('https://example.test', undefined, async () => {
    calls += 1;
    if (calls === 1) throw new TypeError('fetch failed');
    return new Response('ok');
  });
  assert.equal(await response.text(), 'ok');
  assert.equal(calls, 2);
  calls = 0;
  await assert.rejects(
    fetchWithReadRetry('https://example.test', undefined, async () => {
      calls += 1;
      throw new TypeError('fetch failed');
    }),
    /fetch failed/,
  );
  assert.equal(calls, 2);
});

test('never repeats a write even on transport failure', async () => {
  let calls = 0;
  await assert.rejects(
    fetchWithReadRetry('https://example.test', { method: 'POST' }, async () => {
      calls += 1;
      throw new TypeError('fetch failed');
    }),
  );
  assert.equal(calls, 1);
});

test('keeps valid missing and forbidden responses; retries only transient server failures', async () => {
  for (const status of [404, 403, 429]) {
    let calls = 0;
    const response = await fetchWithReadRetry('https://example.test', undefined, async () => {
      calls += 1;
      return new Response('', { status });
    });
    assert.equal(response.status, status);
    assert.equal(calls, 1);
  }
  let calls = 0;
  const response = await fetchWithReadRetry('https://example.test', { method: 'HEAD' }, async () => {
    calls += 1;
    return new Response(null, { status: calls === 1 ? 503 : 200 });
  });
  assert.equal(response.status, 200);
  assert.equal(calls, 2);
});

test('does not retry an aborted read', async () => {
  const controller = new AbortController();
  let calls = 0;
  await assert.rejects(
    fetchWithReadRetry('https://example.test', { signal: controller.signal }, async () => {
      calls += 1;
      controller.abort();
      throw new TypeError('fetch failed');
    }),
  );
  assert.equal(calls, 1);
});
