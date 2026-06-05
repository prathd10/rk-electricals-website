import { useReveal } from '../../hooks/useInView'

const LOGOS = [
  'Goldmedal', 'Panasonic', 'Havells', 'Schneider', 'Anchor', 'Polycab', 'Legrand', 'L&T', 'Philips', 'RR Kabel'
]

export default function BrandsSection() {
  const ref = useReveal()

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-forest-100/30" ref={ref}>
      <div className="max-w-site pad">
        
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600/70 reveal d-0">Brands We Trust</span>
          <h3 className="h3 mt-2 text-forest-800 reveal d-100">
            Premium components for <span className="italic font-normal text-forest-600">premium execution.</span>
          </h3>
        </div>

        {/* Ticker */}
        <div className="relative flex overflow-hidden reveal d-200 mask-fade mt-8">
          <div className="flex animate-marquee whitespace-nowrap gap-16 py-4">
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
              <div 
                key={`${logo}-${i}`}
                className="text-2xl md:text-4xl font-black text-forest-800/10 hover:text-forest-600 transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  )
}
