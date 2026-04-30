import { useReveal } from '../../hooks/useInView'

const LOGOS = [
  'Goldmedal', 'Panasonic', 'Havells', 'Schneider', 'Anchor', 'Polycab', 'Legrand', 'L&T'
]

export default function TrustSection() {
  const ref = useReveal()

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-site pad">
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 opacity-40 reveal d-0">Preferred Partners</span>
          <h3 className="text-xl font-bold mt-2 reveal d-100 text-green-800 opacity-60">We use only certified, high-quality components</h3>
        </div>

        {/* Ticker */}
        <div className="relative flex overflow-hidden reveal d-200 mask-fade">
          <div className="flex animate-marquee whitespace-nowrap gap-16 py-4">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div 
                key={`${logo}-${i}`}
                className="text-4xl md:text-5xl font-black text-green-800/10 hover:text-green-500 transition-colors cursor-default"
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
