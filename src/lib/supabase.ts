import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey && !url.includes("YOUR-PROJECT"));
}

let browserClient: SupabaseClient | null = null;

/**
 * Browser Supabase client (anon key). Returns null when the project
 * hasn't been wired up yet so the app can run in local-only mode.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!browserClient) {
    browserClient = createClient(url!, anonKey!);
  }
  return browserClient;
}
