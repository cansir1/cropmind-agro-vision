import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Support Lovable's injected globals first, then Vite-style envs as a fallback
const supabaseUrl = (window as any)?.__SUPABASE_URL__ || (import.meta as any)?.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (window as any)?.__SUPABASE_ANON_KEY__ || (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

// Only create client if both URL and key are available
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
  } catch (error) {
    console.error("Failed to create Supabase client:", error);
  }
}

export { supabase };

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};
