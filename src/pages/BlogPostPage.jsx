import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Clock, Tag, User, ShieldCheck, ChevronDown, CheckCircle2, Share2, Phone, MessageCircle } from 'lucide-react'
import { BLOG_POSTS } from '../data/blogData'
import SEOHead from '../components/common/SEOHead'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)
  const [openFaq, setOpenFaq] = useState(null)
  const [copied, setCopied] = useState(false)

  if (!post) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-tan-50 text-center pad">
        <h1 className="font-serif text-3xl text-forest-800 mb-4">Article Not Found</h1>
        <p className="text-forest-800/60 mb-8">The guide you are looking for does not exist or has been moved.</p>
        <Link to="/blogs" className="btn-primary">
          Back to All Guides
        </Link>
      </div>
    )
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // Article JSON-LD Schema + FAQPage Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.metaDescription,
        "image": post.coverImage,
        "datePublished": post.publishDate,
        "dateModified": post.publishDate,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "LocalBusiness",
          "name": "RK Electricals",
          "logo": {
            "@type": "ImageObject",
            "url": "https://rkelectricals.online/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://rkelectricals.online/blogs/${post.slug}`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rkelectricals.online/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides & Insights",
            "item": "https://rkelectricals.online/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://rkelectricals.online/blogs/${post.slug}`
          }
        ]
      },
      ...(post.faqs && post.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": post.faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }] : [])
    ]
  }

  return (
    <div className="pt-28 bg-tan-50 min-h-screen">
      <SEOHead 
        title={`${post.metaTitle} | RK Electricals Mumbai`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        canonicalUrl={`https://rkelectricals.online/blogs/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage}
        schema={articleSchema}
      />

      {/* Breadcrumb Navigation */}
      <nav className="max-w-4xl mx-auto px-6 pt-6 pb-2 text-xs font-sans text-forest-800/60 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-forest-800 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/blogs" className="hover:text-forest-800 transition-colors">Insights & Guides</Link>
        <span>/</span>
        <span className="text-forest-800 font-semibold truncate max-w-[280px] sm:max-w-none">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-white text-[10px] font-bold tracking-wider uppercase">
            <Tag size={10} className="text-pastelBrown-300" />
            {post.category}
          </span>
          <span className="text-forest-800/50 text-xs flex items-center gap-1">
            <Clock size={12} /> {post.readTime}
          </span>
          <span className="text-forest-800/30">•</span>
          <span className="text-forest-800/60 text-xs">
            {post.publishDate}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-800 leading-[1.2] mb-6">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-4 border-y border-forest-800/10 text-xs text-forest-800/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center font-serif text-sm">
              <User size={14} />
            </div>
            <div>
              <div className="font-bold text-forest-800">{post.author}</div>
              <div className="text-[10px] text-forest-800/50">PWD-Licensed Electrical Contractor</div>
            </div>
          </div>

          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-forest-800/15 hover:border-forest-800/40 text-forest-800 text-[11px] font-bold uppercase tracking-wider transition-all"
          >
            <Share2 size={13} />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* Article Cover Image */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-forest-800/5 bg-forest-900/10">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Main Article Body */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        
        {/* Key Takeaways Box */}
        {post.keyTakeaways && (
          <div className="bg-cream-100 border-l-4 border-forest-800 rounded-r-2xl p-6 sm:p-8 mb-12 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-forest-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-forest-600" /> Key Technical Takeaways
            </h2>
            <ul className="space-y-3">
              {post.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-forest-800/80 leading-relaxed">
                  <CheckCircle2 size={16} className="text-pastelBrown-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content Paragraphs & Subheadings */}
        <div className="space-y-10 text-forest-800/85 leading-relaxed font-sans text-base">
          {post.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-forest-800 mt-8 first:mt-0 leading-snug">
                {section.heading}
              </h2>
              <p className="text-forest-800/80 text-base leading-relaxed">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        {/* Interactive FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-forest-800/10">
            <h2 className="font-serif text-2xl md:text-3xl text-forest-800 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden transition-shadow hover:shadow-md"
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-serif text-lg text-forest-800"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-forest-600 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-5 text-sm text-forest-800/75 leading-relaxed font-sans border-t border-forest-800/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio Card */}
        <div className="mt-16 p-8 bg-white rounded-3xl border border-forest-800/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-forest-900 text-pastelBrown-300 flex items-center justify-center font-serif text-2xl shrink-0 shadow-md">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-serif text-xl text-forest-800">{post.author}</h3>
              <span className="px-2 py-0.5 rounded bg-forest-50 text-forest-600 font-bold text-[9px] uppercase tracking-wider">
                PWD Licensed
              </span>
            </div>
            <p className="text-xs text-forest-800/70 leading-relaxed font-sans mb-4">
              RK Electricals has provided uninterrupted electrical contracting, society AMC services, and precision concealed wiring across Mumbai since 1994. Authorized for major residential, commercial, and builder infrastructure projects.
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider text-forest-800">
              <a href="tel:+919779979519" className="hover:text-pastelBrown-600 flex items-center gap-1.5">
                <Phone size={12} /> Call Direct
              </a>
              <span>•</span>
              <a href="/contact" className="hover:text-pastelBrown-600">
                Book On-Site Consultation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 p-8 md:p-10 rounded-3xl bg-forest-900 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">
              Have questions about your electrical setup?
            </h3>
            <p className="text-white/70 text-xs md:text-sm mb-6 leading-relaxed">
              Speak directly with our senior technicians for site audits, society AMC quotes, or renovation advice in Mumbai.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href={`https://wa.me/919920249933?text=${encodeURIComponent(`Hi! I was reading your guide on "${post.title}" and would like to inquire about your electrical services.`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold uppercase tracking-wider text-[11px] px-6 py-3.5 rounded-xl transition-all shadow-lg"
              >
                <WhatsAppIcon size={16} /> WhatsApp Inquiry
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-[11px] px-6 py-3.5 rounded-xl transition-all"
              >
                Request Site Audit
              </a>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-800 hover:text-pastelBrown-600 transition-colors">
            <ArrowLeft size={14} /> Back to All Guides & Insights
          </Link>
        </div>

      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white pad border-t border-forest-800/10">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl text-forest-800 mb-8">Related Mumbai Electrical Guides</h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {relatedPosts.map(related => (
                <Link 
                  key={related.id}
                  to={`/blogs/${related.slug}`}
                  className="p-6 bg-tan-50 rounded-2xl border border-forest-800/5 hover:border-forest-800/20 hover:shadow-lg transition-all group block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 mb-2 block">
                    {related.category}
                  </span>
                  <h4 className="font-serif text-lg text-forest-800 group-hover:text-forest-600 transition-colors mb-2 leading-snug">
                    {related.title}
                  </h4>
                  <p className="text-xs text-forest-800/60 line-clamp-2 leading-relaxed">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
