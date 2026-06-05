import { Home, ShieldCheck, ShoppingBag, Wrench, ArrowRight, ClipboardCheck, Building } from 'lucide-react'
import { useReveal } from '../../hooks/useInView'

const SERVICES = [
  {
    icon: ClipboardCheck, title: 'Society AMC',
    desc: 'Comprehensive electrical maintenance, pump rooms, and common area lighting for housing societies.',
    bg: 'bg-forest-50', accent: 'text-pastelBrown-500',
    link: '/amc'
  },
  {
    icon: Building, title: 'Contracting',
    desc: 'Large-scale building rewiring, meter room upgrades, and commercial setups with PWD licensed precision.',
    bg: 'bg-white', accent: 'text-forest-600'
  },
  {
    icon: Home, title: 'Architect Projects',
    desc: 'BOQ support, site coordination, and premium lighting execution for interior designers and architects.',
    bg: 'bg-forest-50', accent: 'text-forest-800',
    link: '/designers'
  },
  {
    icon: ShoppingBag, title: 'Retail & Repair',
    desc: 'Everyday electrical goods, premium switches, and expert gadget repairs at our Borivali shop.',
    bg: 'bg-white', accent: 'text-pastelBrown-500'
  }
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="py-20 min-h-screen flex flex-col justify-center bg-tan-tints overflow-hidden" ref={ref}>
      <div className="max-w-site pad">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Our Expertise</span>
          <h2 className="h2 mt-4 text-forest-800 reveal d-100">
            Professional electrical <br />
            <span className="italic font-normal text-forest-600">solutions for Mumbai.</span>
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <div 
                key={s.title}
                className={`reveal d-${i * 100} ${s.bg} p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 group`}
              >
                <div className={`mb-4 md:mb-6 transition-colors duration-500 ${s.accent} opacity-30 group-hover:opacity-100`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-4 text-forest-800">{s.title}</h3>
                <p className="text-forest-800/60 leading-relaxed mb-4 md:mb-6 text-[11px] md:text-[13px]">{s.desc}</p>
                <a href={s.link || "/contact"} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-forest-800 group-hover:text-pastelBrown-500 transition-colors">
                  Explore <ArrowRight size={12} />
                </a>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
