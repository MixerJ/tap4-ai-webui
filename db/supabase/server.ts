/* eslint-disable import/prefer-default-export */

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import fetchWithReadRetry from '@/lib/fetch-read-retry';

import { Database } from './types';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: fetchWithReadRetry },
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // `set` can fail in some RSC contexts where response headers are immutable.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch {
            // Ignore immutable response header errors in RSC.
          }
        },
      },
    },
  );
}
