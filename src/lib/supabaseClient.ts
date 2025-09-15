import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Support Lovable's injected globals first, then Vite-style envs as a fallback
const supabaseUrl = (window as any)?.__SUPABASE_URL__ || (import.meta as any)?.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (window as any)?.__SUPABASE_ANON_KEY__ || (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
} else {
  console.warn(
    "Supabase is not configured. Please connect the Supabase integration or provide URL and anon key."
  );
}

export { supabase };
