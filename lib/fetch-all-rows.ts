type BatchResult<T> = {
  data: T[] | null;
  count: number | null;
  error: { message: string } | null;
};

// Advance by the returned length: Supabase can cap responses below our requested range.
export default async function fetchAllRows<T>(
  fetchBatch: (from: number, to: number) => PromiseLike<BatchResult<T>>,
): Promise<T[]> {
  const rows: T[] = [];
  let expectedCount: number | undefined;

  do {
    // Each offset depends on the previous response, so batches must be sequential.
    // eslint-disable-next-line no-await-in-loop
    const { data, count, error } = await fetchBatch(rows.length, rows.length + 499);
    if (error) throw new Error(`Sitemap query failed: ${error.message}`);
    if (!data || count === null) throw new Error('Sitemap query returned incomplete data');
    if (expectedCount !== undefined && expectedCount !== count) {
      throw new Error('Sitemap row count changed during pagination');
    }
    expectedCount = count;
    if (!data.length && rows.length < count) throw new Error('Sitemap query returned incomplete data');
    rows.push(...data);
  } while (rows.length < expectedCount);

  return rows;
}
