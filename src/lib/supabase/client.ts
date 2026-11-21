import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

let _client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function isSupabaseConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    key &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
  );
}

export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!;

  if (!_client) {
    _client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      key
    );
  }
  return _client;
}
