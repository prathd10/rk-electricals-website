// Build-time renderer: turns a URL into static HTML for the prerender script.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from './App.jsx'
import { ssrHead } from './components/common/SEOHead.jsx'
import { BLOG_POSTS } from './data/blogData.js'
import { AREAS } from './data/areaData.js'

export const ROUTES = [
  '/',
  '/services',
  '/amc',
  '/designers',
  '/about',
  '/contact',
  '/blogs',
  ...BLOG_POSTS.map(p => `/blogs/${p.slug}`),
  ...AREAS.map(a => `/${a.slug}`),
]

export function render(url) {
  ssrHead.current = null
  const queryClient = new QueryClient()
  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </QueryClientProvider>
  )
  return { html, head: ssrHead.current }
}
