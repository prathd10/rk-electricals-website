import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { DEMO_PROJECTS } from '../lib/demoData'
import toast from 'react-hot-toast'

const TABLE = 'projects'

export function useProjects({ adminAll = false, category = null } = {}) {
  return useQuery({
    queryKey: [TABLE, { adminAll, category }],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        const base = DEMO_PROJECTS.filter((p) => p.is_active)
        return category ? base.filter((p) => p.category === category) : base
      }

      let query = supabase
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (!adminAll) query = query.eq('is_active', true)
      if (category)  query = query.eq('category', category)

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })
}

export function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { error } = await supabase.from(TABLE).insert([payload])
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Project added') },
    onError:   (err) => toast.error(err.message),
  })
}

export function useUpdateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const { error } = await supabase.from(TABLE).update(payload).eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Project updated') },
    onError:   (err) => toast.error(err.message),
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from(TABLE).delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [TABLE] }); toast.success('Project deleted') },
    onError:   (err) => toast.error(err.message),
  })
}
