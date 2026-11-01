// Server-only Supabase clients. The service role key bypasses RLS, so it must
// never be given a VITE_ prefix (that would put it in the public website bundle).
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const options = { auth: { persistSession: false, autoRefreshToken: false } }

export function adminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(url, key, options)
}

export function anonClient() {
  return createClient(url, process.env.VITE_SUPABASE_ANON_KEY, options)
}
