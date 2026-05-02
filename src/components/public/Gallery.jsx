import { useState } from 'react'
import { X, Images } from 'lucide-react'
import { useProjects } from '../../hooks/useProjects'
import { useReveal } from '../../hooks/useInView'
import LoadingSpinner from '../ui/LoadingSpinner'
import { DEMO_PROJECTS } from '../../lib/demoData'

const CATS = [
  { v:'all',         l:'All Work'   },
  { v:'residential', l:'Residential'},
  { v:'commercial',  l:'Commercial' },
  { v:'builder',     l:'Builder'    },
  { v:'amc',         l:'AMC'        },
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
              <div 
                key={p.id} 
                onClick={() => setLightbox(p)}
                className={`reveal d-${(i%5)*100}
                  cursor-pointer group relative aspect-square
                  overflow-hidden bg-cream-50 rounded-xl shadow-sm`}
              >
                {p.image_url
                  ? <img src={p.image_url} alt={p.title}
                         className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                         loading="lazy" />
                  : <div className="w-full h-full flex items-center justify-center">
                      <Images size={28} className="text-forest-100" />
                    </div>
                }

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-forest-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-4 md:p-8">
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white/60 mb-2">{p.category}</span>
                  <div className="text-white font-serif text-sm md:text-2xl leading-tight">{p.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-[60] bg-forest-900/95 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            {lightbox.image_url && (
              <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[75vh] object-contain shadow-2xl" />
            )}
            <div className="mt-12 text-center text-white">
              <div className="font-serif text-3xl">{lightbox.title}</div>
              {lightbox.description && <div className="opacity-60 font-sans text-sm mt-4 uppercase tracking-[0.2em]">{lightbox.description}</div>}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
