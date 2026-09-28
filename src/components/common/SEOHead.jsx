import { useEffect } from 'react'

export default function SEOHead({
  title = "RK Electricals | Mumbai's Trusted Electricians Since 1994",
  description = "RK Electricals | Mumbai's trusted electrical contractors since 1994. 30+ years of safe, clean, concealed wiring for homes, offices, and housing societies in Borivali.",
  keywords = "electrician Mumbai, electrical contractor Borivali, home wiring Mumbai, concealed wiring, AMC electrical, builder electrician Mumbai, RK Electricals",
  canonicalUrl = "https://rkelectricals.online",
  ogType = "website",
  ogImage = "https://rkelectricals.online/logo.png",
  schema = null
}) {
  useEffect(() => {
    // 1. Update document title
    document.title = title

    // Helper to set or create meta tag
    const setMetaTag = (nameAttr, nameValue, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${nameAttr}="${nameValue}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(nameAttr, nameValue)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', keywords)

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:url', canonicalUrl)
    setMetaTag('property', 'og:image', ogImage)
    setMetaTag('property', 'og:site_name', 'RK Electricals')

    // 4. Twitter Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', ogImage)

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // 6. JSON-LD Schema
    let scriptTag = document.getElementById('dynamic-json-ld')
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'dynamic-json-ld'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(schema)
    } else if (scriptTag) {
      scriptTag.remove()
    }
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schema])

  return null
}
