import { useReveal } from '../../hooks/useInView'
import { ShieldCheck, Star, Quote } from 'lucide-react'
import { useTestimonials } from '../../hooks/useTestimonials'

const STATIC_REVIEWS = [
  { name: 'Sunny Gaud',    role: 'Verified Client', text: 'Staff knowledgeable, soft spoken. Excellent service and technical expertise.', rating: 5 },
  { name: 'Jigar Raval',   role: 'Verified Client', text: 'Really happy with service. They handled our office wiring with absolute precision.', rating: 5 },
  { name: 'Moksh',         role: 'Verified Client', text: 'Very good experience. Highly professional team and honest pricing.', rating: 5 },
  { name: 'Anjali Desai',  role: 'Verified Client', text: 'The transition to smart lighting was seamless. Master craftsmanship at its best.', rating: 5 },
  { name: 'Sameer Mehra',  role: 'Architect',       text: 'Unmatched technical precision in concealed wiring. Best in Mumbai.', rating: 5 },
]

export default function TrustSection() {
  const ref = useReveal()
  const { data: dbReviews = [] } = useTestimonials()

  const reviews = dbReviews.length > 0
    ? dbReviews.map(t => ({ name: t.name, role: t.location || 'Verified Client', text: t.review, rating: t.rating }))
    : STATIC_REVIEWS

  const displayList = [...reviews, ...reviews]

  return (
    <section className="py-16 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-site pad">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forest-600/20 bg-forest-50/50 reveal d-0 mb-4">
            <ShieldCheck size={11} className="text-forest-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-forest-600">30+ Years Experience</span>
          </div>

          <h3 className="h2 reveal d-100 text-forest-800">
            Trusted by 100+ <br /><span className="italic font-normal text-forest-600">Housing Societies & Builders.</span>
          </h3>

          <p className="text-forest-800/70 text-sm mt-3 leading-relaxed reveal d-150">
            We are the preferred electrical contracting and AMC partner for housing societies, architects, and commercial properties across Mumbai, delivering zero-compromise safety since 1993.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8 reveal d-200">
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-forest-600/30 bg-forest-50 shadow-sm hover:border-forest-600 hover:bg-forest-100/70 transition-all duration-300 cursor-default">
              <span className="text-[12px] font-bold tracking-wide text-forest-800">Society AMC</span>
              <span className="text-forest-600/30 font-light text-[11px]">|</span>
              <span className="text-[11px] text-forest-800/60 font-semibold">Priority Maintenance</span>
            </div>
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-pastelBrown-300 bg-pastelBrown-50 shadow-sm hover:border-pastelBrown-500 hover:bg-pastelBrown-100/70 transition-all duration-300 cursor-default">
              <span className="text-[12px] font-bold tracking-wide text-forest-800">Architects</span>
              <span className="text-pastelBrown-300 font-light text-[11px]">|</span>
              <span className="text-[11px] text-forest-800/60 font-semibold">Premium Execution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews marquee */}
      <div className="relative overflow-hidden trust-mask mt-4 py-2">
        <div className="flex w-max trust-marquee">
          {displayList.map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              className="shrink-0 w-[280px] md:w-[340px] bg-cream-50 border border-pastelBrown-100 rounded-2xl p-6 mx-4 relative"
            >
              <Quote className="absolute top-5 right-5 text-pastelBrown-200" size={20} strokeWidth={1} />
              <div className="flex gap-1 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={11} fill="#2D4A43" className="text-forest-800" />
                ))}
              </div>
              <p className="font-serif text-sm text-forest-800/75 leading-relaxed mb-4 italic">"{r.text}"</p>
              <div>
                <div className="font-sans font-bold text-[10px] uppercase tracking-widest text-forest-800">{r.name}</div>
                <div className="text-[9px] uppercase tracking-widest text-forest-600/70 font-medium">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-marquee {
          animation: trust-scroll 35s linear infinite;
          will-change: transform;
        }
        @keyframes trust-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .trust-mask {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  )
}
