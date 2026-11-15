// A single retry for transient reads. Never repeat submissions or authentication writes.
export default async function fetchWithReadRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  const request = input instanceof Request ? input : undefined;
  const method = (init?.method || request?.method || 'GET').toUpperCase();
  const signal = init?.signal || request?.signal;
  if (method !== 'GET' && method !== 'HEAD') return fetcher(input, init);

  let response: Response;
  try {
    response = await fetcher(input, init);
  } catch (error) {
    if (signal?.aborted || !(error instanceof TypeError)) throw error;
    return fetcher(input, init);
  }
  if (response.status < 500 || signal?.aborted) return response;
  await response.body?.cancel();
  return fetcher(input, init);
}
