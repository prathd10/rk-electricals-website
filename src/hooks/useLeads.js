import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import toast from 'react-hot-toast'

const TABLE = 'leads'
const RATE_KEY = 'rk_last_lead'
const RATE_MS  = 60_000 // 1 minute between submissions

function checkRateLimit() {
  const last = localStorage.getItem(RATE_KEY)
  if (last && Date.now() - parseInt(last) < RATE_MS) {
    const secs = Math.ceil((RATE_MS - (Date.now() - parseInt(last))) / 1000)
    throw new Error(`Please wait ${secs} seconds before submitting again.`)
  }
  localStorage.setItem(RATE_KEY, String(Date.now()))
}

export function useLeads() {
  return useQuery({
    queryKey: [TABLE],
    queryFn: async () => {
      if (!isSupabaseConfigured) return []
      const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useCreateLead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      checkRateLimit()
      if (!isSupabaseConfigured) return
      const { error } = await supabase.from(TABLE).insert([payload])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [TABLE] }),
    onError:   (err) => toast.error(err.message),
  })
}

export function useUpdateLeadStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase.from(TABLE).update({ status }).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Status updated') },
    onError:   (err) => toast.error(err.message),
  })
}

export function useDeleteLead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from(TABLE).delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Lead deleted') },
    onError:   (err) => toast.error(err.message),
  })
}
