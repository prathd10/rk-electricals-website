import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export function useAuth() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSession(null) // No credentials → not logged in, resolve immediately
      return
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { session, loading: session === undefined }
}
