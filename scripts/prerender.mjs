// Runs after `vite build` + the SSR build. Writes one real HTML file per public page
// so search engines see each page's own content, title and description without running JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const { render, ROUTES } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildHead(head) {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<meta name="keywords" content="${esc(head.keywords)}" />`,
    `<link rel="canonical" href="${esc(head.canonicalUrl)}" />`,
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    `<meta property="og:type" content="${esc(head.ogType)}" />`,
    `<meta property="og:url" content="${esc(head.canonicalUrl)}" />`,
    `<meta property="og:image" content="${esc(head.ogImage)}" />`,
    `<meta property="og:site_name" content="R K Electricals" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(head.title)}" />`,
    `<meta name="twitter:description" content="${esc(head.description)}" />`,
    `<meta name="twitter:image" content="${esc(head.ogImage)}" />`,
  ]
  if (head.schema) {
    // JSON-LD is data, not executable script, so the CSP does not block search engines reading it
    const json = JSON.stringify(head.schema).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json" id="dynamic-json-ld">${json}</script>`)
  }
  return tags.join('\n    ')
}

// Remove the generic tags from index.html that each page replaces with its own
function stripGenericHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="(description|keywords|twitter:[^"]+)"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
}

function page(url, noindex = false) {
  const { html, head } = render(url)
  if (!head && !noindex) throw new Error(`No SEOHead rendered for ${url}`)
  let out = stripGenericHead(template)
  const headTags = head ? buildHead(head) : '<title>Page Not Found | R K Electricals</title>'
  const robots = noindex ? '\n    <meta name="robots" content="noindex" />' : ''
  out = out.replace('</head>', `    ${headTags}${robots}\n  </head>`)
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  return out
}

// Keep an untouched copy of the app shell for the admin area (client-only pages)
fs.writeFileSync(path.join(dist, 'spa.html'), template)

let count = 0
for (const url of ROUTES) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(url))
  count++
}

// Real 404 page (served with a 404 status by Vercel for unknown URLs)
fs.writeFileSync(path.join(dist, '404.html'), page('/this-page-does-not-exist', true))

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${count} pages + 404.html`)
