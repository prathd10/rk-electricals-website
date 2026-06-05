import { Building2, Home, Landmark, Briefcase, Store } from 'lucide-react'
import { useReveal } from '../../hooks/useInView'

const INDUSTRIES = [
  { name: 'Housing Societies', icon: Building2 },
  { name: 'Architects & Interiors', icon: Landmark },
  { name: 'Commercial Offices', icon: Briefcase },
  { name: 'Retail Showrooms', icon: Store },
  { name: 'Luxury Residential', icon: Home },
]

export default function IndustriesWeServe() {
  const ref = useReveal()

  return (
    <section className="py-20 bg-forest-900 text-white" ref={ref}>
      <div className="max-w-site pad">
        
        <div className="text-center mb-16">
          <span className="text-pastelBrown-400 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Industries We Serve</span>
          <h2 className="h2 mt-4 text-white reveal d-100">
            Tailored electrical solutions <br />
            <span className="italic font-normal text-pastelBrown-300">for every sector.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 reveal d-200">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon
            return (
              <div 
                key={ind.name}
                className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="mb-4 p-4 rounded-full bg-white/5 group-hover:bg-pastelBrown-500/20 text-white group-hover:text-pastelBrown-400 transition-colors duration-300">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-sm tracking-wide">{ind.name}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
