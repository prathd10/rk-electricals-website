import { Home, ShieldCheck, ShoppingBag, Wrench, ArrowRight, ClipboardCheck } from 'lucide-react'
import { useReveal } from '../../hooks/useInView'

const SERVICES = [
  {
    icon: Home, title: 'Residential', 
    desc: 'End-to-end luxury flat and bungalow wiring with PWD licensed precision.',
    bg: 'bg-white', accent: 'text-forest-600'
  },
  {
    icon: Wrench, title: 'Gadget Repair',
    desc: 'Expert repair for fans, mixers, geysers, and irons since 1994.',
    bg: 'bg-forest-50', accent: 'text-pastelBrown-500'
  },
  {
    icon: ShoppingBag, title: 'Retail Shop',
    desc: 'Premium switches and lighting from global brands in Borivali.',
    bg: 'bg-white', accent: 'text-forest-800'
  },
  {
    icon: ClipboardCheck, title: 'AMC Contracts',
    desc: 'Comprehensive electrical maintenance for residential societies and offices.',
    bg: 'bg-forest-50', accent: 'text-pastelBrown-500',
    link: '/amc'
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
