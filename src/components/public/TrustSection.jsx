import { useReveal } from '../../hooks/useInView'
import { ShieldCheck } from 'lucide-react'

const LOGOS = [
  'Goldmedal', 'Panasonic', 'Havells', 'Schneider', 'Anchor', 'Polycab', 'Legrand', 'L&T'
]

export default function TrustSection() {
  const ref = useReveal()

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="max-w-site pad">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          {/* Elegant Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forest-600/20 bg-forest-50/50 reveal d-0 mb-4">
            <ShieldCheck size={11} className="text-forest-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-forest-600">Certified Quality</span>
          </div>

          {/* Heading */}
          <h3 className="h2 reveal d-100 text-forest-800">
            Certified safety <span className="italic font-normal text-forest-600">for every budget.</span>
          </h3>

          {/* Shortened Subtext */}
          <p className="text-forest-800/70 text-sm mt-3 leading-relaxed reveal d-150">
            From reliable standard setups to luxury premium custom systems, safety is never compromised. We use exclusively certified, ISI-marked products for complete peace of mind.
          </p>

          {/* Elegant Standard & Premium Capsule Tags */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 reveal d-200">
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-forest-600/30 bg-forest-50 shadow-sm hover:border-forest-600 hover:bg-forest-100/70 transition-all duration-300 cursor-default">
              <span className="text-[12px] font-bold tracking-wide text-forest-800">Standard Series</span>
              <span className="text-forest-600/30 font-light text-[11px]">|</span>
              <span className="text-[11px] text-forest-800/60 font-semibold">Certified Essentials</span>
            </div>
            <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-pastelBrown-300 bg-pastelBrown-50 shadow-sm hover:border-pastelBrown-500 hover:bg-pastelBrown-100/70 transition-all duration-300 cursor-default">
              <span className="text-[12px] font-bold tracking-wide text-forest-800">Premium Series</span>
              <span className="text-pastelBrown-300 font-light text-[11px]">|</span>
              <span className="text-[11px] text-forest-800/60 font-semibold">Luxury Selections</span>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="relative flex overflow-hidden reveal d-300 mask-fade mt-12">
          <div className="flex animate-marquee whitespace-nowrap gap-16 py-4">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div 
                key={`${logo}-${i}`}
                className="text-3xl md:text-5xl font-black text-forest-800/10 hover:text-forest-600 transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
    </section>
  )
}
