import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const TABLE = 'analytics_views'

// Helper to generate UUID if crypto.randomUUID isn't available
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'visitor-' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

// 1. Hook to track page views on public pages
export function useAnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const trackView = async () => {
      if (!isSupabaseConfigured) return

      let visitorId = localStorage.getItem('rk_visitor_id')
      if (!visitorId) {
        visitorId = generateUUID()
        localStorage.setItem('rk_visitor_id', visitorId)
      }

      try {
        await supabase.from(TABLE).insert([
          {
            visitor_id: visitorId,
            path: location.pathname,
          }
        ])
      } catch (err) {
        console.error('Failed to log page view:', err)
      }
    }

    trackView()
  }, [location.pathname])
}

// 2. Hook to fetch analytics statistics for the admin dashboard
export function useAnalytics() {
  return useQuery({
    queryKey: [TABLE],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        // Return dummy data for demo mode
        return {
          totalViews: 1420,
          uniqueVisitors: 320,
          viewsByPath: [
            { path: '/', count: 850 },
            { path: '/amc', count: 240 },
            { path: '/designers', count: 180 },
            { path: '/about', count: 100 },
            { path: '/contact', count: 50 },
          ]
        }
      }

      const { data, error } = await supabase
        .from(TABLE)
        .select('visitor_id, path')

      if (error) throw error

      const totalViews = data.length
      const uniqueVisitors = new Set(data.map(v => v.visitor_id)).size

      // Count by path
      const pathCounts = data.reduce((acc, curr) => {
        acc[curr.path] = (acc[curr.path] || 0) + 1
        return acc
      }, {})

      const viewsByPath = Object.entries(pathCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)

      return {
        totalViews,
        uniqueVisitors,
        viewsByPath
      }
    }
  })
}
