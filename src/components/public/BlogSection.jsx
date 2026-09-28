import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'
import { BLOG_POSTS } from '../../data/blogData'
import { useReveal } from '../../hooks/useInView'

export default function BlogSection() {
  const ref = useReveal()
  // Show top 3 recent articles on homepage
  const featuredPosts = BLOG_POSTS.slice(0, 3)

  return (
    <section className="py-24 bg-tan-50/60 relative overflow-hidden" ref={ref}>
      <div className="max-w-site pad mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-forest-600/20 bg-forest-50/80 mb-4 reveal d-0">
              <BookOpen size={14} className="text-forest-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600">
                Insights & Guides
              </span>
            </div>
            
            <h2 className="h2 text-forest-800 reveal d-100">
              Mumbai Electrical <br />
              <span className="italic font-normal text-forest-600">Knowledge & Best Practices.</span>
            </h2>
          </div>

          <div className="reveal d-200">
            <a 
              href="/blogs" 
              className="inline-flex items-center gap-2 font-sans font-bold uppercase tracking-[0.15em] text-[11px] text-forest-800 hover:text-pastelBrown-600 transition-colors group"
            >
              <span>Explore All Guides</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 reveal d-300">
          {featuredPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-3xl overflow-hidden border border-forest-800/5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col group"
            >
              {/* Cover Image */}
              <div className="aspect-[16/10] overflow-hidden relative bg-forest-900/10">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                    <Tag size={10} className="text-pastelBrown-300" />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-forest-800/50 text-[11px] font-sans mb-3">
                    <span>{post.publishDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-forest-800 mb-3 leading-snug group-hover:text-forest-600 transition-colors">
                    <a href={`/blogs/${post.slug}`}>
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-forest-800/70 text-xs leading-relaxed line-clamp-3 mb-6 font-sans">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-forest-800/5 flex items-center justify-between">
                  <a 
                    href={`/blogs/${post.slug}`} 
                    className="btn-underline text-[10px] text-forest-800"
                  >
                    Read Article
                  </a>
                  <span className="text-[10px] text-forest-800/40 font-medium">
                    By {post.author.split(' ')[0]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
