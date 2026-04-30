import { Home, Building2, ShoppingBag, Wrench, ArrowRight } from 'lucide-react'
import { useReveal } from '../../hooks/useInView'

const SERVICES = [
  {
    icon: Home, title: 'Residential & Commercial', 
    desc: 'End-to-end setup and wiring for luxury homes, flats, and modern offices. PWD licensed mastery.',
    bg: 'bg-white', accent: 'text-forest-600'
  },
  {
    icon: Wrench, title: 'Gadget & Appliance Repair',
    desc: 'Expert maintenance for fans, mixers, tube lights, geysers, toasters, and irons. Quick and safe repairs.',
    bg: 'bg-forest-50', accent: 'text-burnt-500'
  },
  {
    icon: ShoppingBag, title: 'Electrical Retail Shop',
    desc: 'Our Borivali showroom stocks premium switches, wires, and lighting from global brands since 1994.',
    bg: 'bg-white', accent: 'text-forest-800'
  }
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="py-32 bg-tan-tints overflow-hidden" ref={ref}>
      <div className="max-w-site pad">
        
        {/* Header */}
        <div className="max-w-2xl mb-24">
          <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Our Discipline</span>
          <h2 className="h2 mt-8 text-forest-800 reveal d-100">
            Comprehensive electrical <br />
            <span className="italic font-normal text-forest-600">solutions for Mumbai.</span>
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <div 
                key={s.title}
                className={`reveal d-${i * 100} ${s.bg} p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group`}
              >
                <div className={`mb-10 transition-colors duration-500 ${s.accent} opacity-30 group-hover:opacity-100`}>
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl mb-6 text-forest-800">{s.title}</h3>
                <p className="text-forest-800/60 leading-relaxed mb-10 text-sm">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-forest-800 group-hover:text-burnt-500 transition-colors">
                  Explore <ArrowRight size={14} />
                </a>
              </div>
            )
          })}
        </div>

        {/* Maintenance / AMC Focus */}
        <div className="mt-32 border-t border-forest-800/10 pt-20 grid md:grid-cols-2 gap-20">
          <div className="reveal d-0">
            <h3 className="font-serif text-3xl text-forest-800 mb-6">Society Maintenance (AMC)</h3>
            <p className="text-forest-800/60 leading-relaxed">
              We specialize in society electrical maintenance contracts. Our quarterly safety audits and priority support ensure that residential complexes in Borivali remain safe and efficient.
            </p>
          </div>
          <div className="reveal d-100 bg-forest-800 p-12 text-white">
            <h3 className="font-serif text-3xl mb-6">30 Years in Borivali.</h3>
            <p className="text-white/60 leading-relaxed mb-8">
              Established in 1994, our shop at Surya Kiran has been a landmark for quality electrical equipment and master craftsmanship for three decades.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Registered PWD Contractor</div>
          </div>
        </div>

      </div>
    </section>
  )
}
