import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { DEMO_TESTIMONIALS } from '../lib/demoData'
import toast from 'react-hot-toast'

const TABLE = 'testimonials'

export function useTestimonials({ adminAll = false } = {}) {
  return useQuery({
    queryKey: [TABLE, { adminAll }],
    queryFn: async () => {
      if (!isSupabaseConfigured) return DEMO_TESTIMONIALS

      let query = supabase
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (!adminAll) query = query.eq('is_active', true)

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })
}

export function useCreateTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { error } = await supabase.from(TABLE).insert([payload])
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Testimonial added') },
    onError:   (err) => toast.error(err.message),
  })
}

export function useUpdateTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const { error } = await supabase.from(TABLE).update(payload).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Testimonial updated') },
    onError:   (err) => toast.error(err.message),
  })
}

export function useDeleteTestimonial() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from(TABLE).delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Testimonial deleted') },
    onError:   (err) => toast.error(err.message),
  })
}
