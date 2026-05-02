import { Star, Quote, ExternalLink } from 'lucide-react'
import { useReveal } from '../../hooks/useInView'

const REVIEWS = [
  {
    name: 'Sunny Gaud', role: 'Verified Client',
    text: 'Staff knowledgeable, soft spoken. Excellent service and technical expertise.',
    rating: 5
  },
  {
    name: 'Jigar Raval', role: 'Verified Client',
    text: 'Really happy with service. They handled our office wiring with absolute precision.',
    rating: 5
  },
  {
    name: 'Moksh', role: 'Verified Client',
    text: 'Very good experience. Highly professional team and honest pricing.',
    rating: 5
  },
  {
    name: 'Anjali Desai', role: 'Verified Client',
    text: 'The transition to smart lighting was seamless. Master craftsmanship at its best.',
    rating: 5
  },
  {
    name: 'Sameer Mehra', role: 'Architect',
    text: 'Unmatched technical precision in concealed wiring. Best in Mumbai.',
    rating: 5
  }
]

export default function Testimonials() {
  const ref = useReveal()

  return (
    <section id="testimonials" className="py-32 bg-cream-50 overflow-hidden" ref={ref}>
      <div className="max-w-site pad mb-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-xl">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Voices of Trust</span>
            <h2 className="h2 mt-8 text-forest-800 reveal d-100">
              Trusted by Mumbai <br />
              <span className="italic font-normal text-forest-600">since 1994.</span>
            </h2>
            <div className="mt-6 flex items-center gap-3 reveal d-200">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <Star key={i} size={16} fill="#B2A08F" className="text-pastelBrown-500" />)}
                <Star size={16} fill="#B2A08F" className="text-pastelBrown-500 opacity-50" />
              </div>
              <span className="font-bold text-forest-800">4.5 / 5.0</span>
              <span className="text-forest-600 text-sm">(22 Google Reviews)</span>
            </div>
          </div>
          <div className="reveal d-200 text-center md:text-right">
            <p className="text-forest-800 font-bold mb-4 italic text-lg">"Your feedback powers our excellence."</p>
            <a 
              href="https://www.google.com/search?q=R+K+Electricals+Borivali+West" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-forest-800 px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-pastelBrown-500 transition-all duration-500 shadow-xl shadow-forest-800/20"
            >
              Drop a Review on Google <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Marquee - Left to Right */}
      <div className="relative flex overflow-hidden mask-fade-side py-10">
        <div className="flex animate-marquee-reverse whitespace-nowrap gap-8">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div 
              key={`${r.name}-${i}`} 
              className="inline-block w-[320px] md:w-[400px] bg-white p-8 md:p-12 shadow-sm border border-pastelBrown-100 relative group shrink-0"
            >
              <Quote className="absolute top-10 right-10 text-pastelBrown-100" size={32} strokeWidth={1} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="#2D4A43" className="text-forest-800" />
                ))}
              </div>

              <p className="font-serif text-lg text-forest-800/80 leading-relaxed mb-8 whitespace-normal italic">
                "{r.text}"
              </p>

              <div>
                <div className="font-sans font-bold text-[11px] uppercase tracking-widest text-forest-800">{r.name}</div>
                <div className="text-[9px] uppercase tracking-widest text-forest-600 font-medium">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .mask-fade-side {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  )
}
