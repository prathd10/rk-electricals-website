import { createClient } from '@supabase/supabase-js'

const supabaseUrl    = import.meta.env.VITE_SUPABASE_URL    || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// True when credentials are not yet configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Safe client — won't throw even with empty strings
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key-for-demo-mode')
