import { useState } from 'react'
import { BookOpen, Search, Clock, Tag, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react'
import { BLOG_POSTS } from '../data/blogData'
import SEOHead from '../components/common/SEOHead'
import { useReveal } from '../hooks/useInView'

const CATEGORIES = ['All', 'Society AMC', 'Residential Wiring', 'Safety & Audits', 'Design & Lighting']

export default function BlogsPage() {
  const ref = useReveal()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "RK Electricals Knowledge Base & Mumbai Electrical Guides",
    "description": "Expert advice, safety guidelines, and electrical contracting tips for Mumbai housing societies, homeowners, and interior designers.",
    "url": "https://rkelectricals.online/blogs",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "RK Electricals",
      "logo": "https://rkelectricals.online/logo.png"
    },
    "blogPost": BLOG_POSTS.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.summary,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://rkelectricals.online/blogs/${post.slug}`,
      "image": post.coverImage
    }))
  }

  return (
    <div className="pt-28 bg-tan-50 min-h-screen" ref={ref}>
      <SEOHead 
        title="Electrical Guides & AMC Insights Mumbai | RK Electricals"
        description="Explore expert guides on housing society electrical AMC, residential concealed wiring, fire safety audits, and architectural lighting in Mumbai."
        keywords="electrical blog Mumbai, housing society AMC guide, concealed wiring tips Borivali, electrical safety audit Mumbai, RK Electricals guides"
        canonicalUrl="https://rkelectricals.online/blogs"
        schema={blogListSchema}
      />

      {/* Hero Header */}
      <section className="pt-12 pb-16 pad">
        <div className="max-w-site mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-forest-600/20 bg-forest-50 mb-6 reveal d-0">
            <BookOpen size={14} className="text-forest-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600">
              Knowledge & Insights
            </span>
          </div>

          <h1 className="h1 text-forest-800 mb-6 reveal d-100 max-w-4xl mx-auto">
            Electrical Engineering <br />
            <span className="italic font-normal text-forest-600">Guides for Modern Mumbai.</span>
          </h1>

          <p className="text-forest-800/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed reveal d-200">
            Over 30 years of field-tested contracting expertise distilled into clear, practical insights for society chairpersons, architects, and homeowners.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="max-w-3xl mx-auto space-y-6 reveal d-300">
            <div className="relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-forest-800/40" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, e.g., 'Society AMC', 'Concealed Wiring', 'RCCB'..."
                className="w-full bg-white border border-forest-800/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-forest-800 shadow-sm focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600/20 transition-all placeholder:text-forest-800/40"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-forest-800 text-white shadow-md' 
                      : 'bg-white text-forest-800/70 border border-forest-800/10 hover:border-forest-800/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="py-16 bg-white pad">
        <div className="max-w-site mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-cream-50 rounded-3xl border border-dashed border-forest-800/20">
              <h3 className="font-serif text-2xl text-forest-800 mb-2">No matching guides found</h3>
              <p className="text-forest-800/60 text-sm mb-6">Try searching for different keywords or clear your category filter.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-cream-50/60 rounded-3xl overflow-hidden border border-forest-800/5 hover:border-forest-800/15 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col group"
                >
                  <div className="aspect-[16/10] overflow-hidden relative bg-forest-900/10">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                        <Tag size={10} className="text-pastelBrown-300" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-forest-800/50 text-[11px] font-sans mb-3">
                        <span>{post.publishDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>

                      <h2 className="font-serif text-xl text-forest-800 mb-3 leading-snug group-hover:text-forest-600 transition-colors">
                        <a href={`/blogs/${post.slug}`}>
                          {post.title}
                        </a>
                      </h2>

                      <p className="text-forest-800/70 text-xs leading-relaxed line-clamp-3 mb-6 font-sans">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-forest-800/5 flex items-center justify-between">
                      <a 
                        href={`/blogs/${post.slug}`} 
                        className="btn-underline text-[10px] text-forest-800"
                      >
                        Read Full Guide
                      </a>
                      <span className="text-[10px] text-forest-800/40 font-medium">
                        {post.author.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Direct Assistance CTA Banner */}
      <section className="py-20 bg-forest-900 text-white pad">
        <div className="max-w-site mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-pastelBrown-300 text-[10px] font-bold uppercase tracking-widest mb-4">
              <ShieldCheck size={14} /> PWD-Licensed Engineers
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Need a physical electrical audit for your society or home?
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Our senior supervisors inspect meter boards, pump setups, and wiring loads across Borivali, Kandivali, and all Mumbai suburbs.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="tel:+919779979519"
              className="inline-flex items-center gap-2 bg-pastelBrown-500 hover:bg-pastelBrown-400 text-forest-950 font-bold uppercase tracking-widest text-[11px] px-8 py-4 rounded-xl transition-all shadow-lg"
            >
              <PhoneCall size={16} /> Call +91 97799 79519
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-widest text-[11px] px-8 py-4 rounded-xl transition-all"
            >
              Request Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
