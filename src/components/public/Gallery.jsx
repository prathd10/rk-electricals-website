import { useState, useRef } from 'react'
import { X, Images, Play } from 'lucide-react'
import { useProjects } from '../../hooks/useProjects'
import { useReveal } from '../../hooks/useInView'
import LoadingSpinner from '../ui/LoadingSpinner'
import { DEMO_PROJECTS } from '../../lib/demoData'

const CATS = [
  { v:'all',         l:'All Work'   },
  { v:'residential', l:'Residential'},
  { v:'commercial',  l:'Commercial' },
  { v:'builder',     l:'Builder'    },
  { v:'designer',    l:'Designer'   },
]

export default function Gallery() {
  const { data = [], isLoading } = useProjects()
  const [active,   setActive]   = useState('all')
  const [lightbox, setLightbox] = useState(null)
  
  // Fallback to demo data if the fetched projects array is empty
  const displayData = data && data.length > 0 ? data : DEMO_PROJECTS
  const filtered = active === 'all' ? displayData : displayData.filter(p => p.category === active)

  const ref = useReveal([filtered])

  if (isLoading) return (
    <section id="gallery" className="py-32 flex justify-center bg-white"><LoadingSpinner /></section>
  )

  return (
    <section id="gallery" className="pt-20 pb-32 bg-white" ref={ref}>
      <div className="max-w-site pad">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
          <div className="max-w-xl text-left">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Technical Mastery</span>
            <h2 className="h2 mt-8 text-forest-800">
              Engineered for <br />
              <span className="italic font-normal text-forest-600">safety and reliability.</span>
            </h2>
          </div>
          <div className="w-full lg:w-auto overflow-x-auto">
            <div className="flex gap-6 border-b border-forest-800/10 pb-4 min-w-max">
              {CATS.map(({ v, l }) => (
                <button 
                  key={v} 
                  onClick={() => setActive(v)}
                  className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative pb-4
                    ${active === v ? 'text-forest-800 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-forest-800' : 'text-forest-800/40 hover:text-forest-800'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid display: 2 columns on mobile, 3 on lg */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20 font-serif italic text-xl">No projects in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filtered.map((p, i) => (
              <VideoGridItem 
                key={p.id}
                p={p}
                index={i}
                onClick={() => setLightbox(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-[60] bg-forest-900/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-10"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
          
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            
            {/* Conditional Image or Video Player rendering based on source */}
            {lightbox.video_url ? (
              <video 
                src={lightbox.video_url} 
                controls 
                autoPlay 
                playsInline
                loop
                className="w-full max-h-[70vh] object-contain shadow-2xl rounded-2xl bg-black" 
              />
            ) : lightbox.image_url ? (
              <img 
                src={lightbox.image_url} 
                alt={lightbox.title} 
                className="w-full max-h-[70vh] object-contain shadow-2xl rounded-2xl" 
              />
            ) : null}

            <div className="mt-8 text-center text-white">
              <div className="font-serif text-2xl md:text-4xl tracking-wide">{lightbox.title}</div>
              {lightbox.description && (
                <div className="opacity-50 font-sans text-xs md:text-sm mt-3 uppercase tracking-[0.25em]">
                  {lightbox.description}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  )
}

/**
 * Premium self-contained grid item component handling butter-smooth hover-to-play preview animations
 */
function VideoGridItem({ p, index, onClick }) {
  const videoRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`reveal d-${(index % 5) * 100}
        cursor-pointer group relative aspect-square
        overflow-hidden bg-cream-50 rounded-xl shadow-sm`}
    >
      {/* 1. Static Image Thumbnail */}
      {p.image_url ? (
        <img 
          src={p.image_url} 
          alt={p.title}
          className={`w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[800ms] ease-out ${
            hovered && p.video_url ? 'opacity-0 scale-95' : 'opacity-100'
          }`}
          loading="lazy" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#FAF8F5]">
          <Images size={28} className="text-forest-100" />
        </div>
      )}

      {/* 2. Hover-to-Play Video Element */}
      {p.video_url && (
        <video
          ref={videoRef}
          src={p.video_url}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-out pointer-events-none ${
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}

      {/* 3. Play Icon overlay (fades out cleanly on hover when playing) */}
      {p.video_url && (
        <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white z-10 shadow-md border border-white/5 transition-all duration-500 ease-out ${
          hovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
        }`}>
          <Play size={12} fill="currentColor" className="ml-0.5 sm:w-3.5 sm:h-3.5" />
        </div>
      )}

      {/* 4. Hover details overlay (fades in above video) */}
      <div className="absolute inset-0 bg-forest-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-4 md:p-8 z-10">
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white/60 mb-2">{p.category}</span>
        <div className="text-white font-serif text-sm md:text-2xl leading-tight">{p.title}</div>
      </div>
    </div>
  )
}
