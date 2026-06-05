import { useReveal } from '../../hooks/useInView'
import { Building2, CheckCircle2, Zap, ShieldCheck } from 'lucide-react'

export default function SocietyServicesSection() {
  const ref = useReveal()

  const features = [
    "Common Area & Staircase Lighting",
    "Pump Room Maintenance",
    "Panel & MCB Replacement",
    "Earthing Inspection & Upgrades",
    "Energy-Saving Projects (LED retrofits)",
    "EV Charging Infrastructure",
    "DG Synchronization",
    "Comprehensive Annual Maintenance Contracts (AMC)"
  ]

  return (
    <section className="py-24 bg-cream-50" ref={ref}>
      <div className="max-w-site pad reveal">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-forest-600/20 bg-forest-50 mb-6">
          <Building2 size={14} className="text-forest-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600">Society Services</span>
        </div>
        
        {/* Headline */}
        <h2 className="h2 text-forest-800 mb-6">
          Specialized solutions for <br />
          <span className="italic font-normal text-forest-600">Housing Societies.</span>
        </h2>
        
        {/* Floated Visual (Right Side) */}
        <div className="relative float-right w-1/2 md:w-[45%] lg:w-[45%] ml-4 mb-4 md:ml-6 md:mb-6">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-forest-900/10 mix-blend-multiply z-10"></div>
            <img 
              src="/images/society_panel.png" 
              alt="Housing Society Electrical Panel" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          {/* Floating Stats Card - hidden on very small mobile to not obscure text */}
          <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-forest-100 max-w-[150px] md:max-w-[200px] z-20 hidden sm:block">
            <Zap size={24} className="text-pastelBrown-500 mb-2 md:mb-3" />
            <div className="text-2xl md:text-3xl font-serif text-forest-800 mb-1">24/7</div>
            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-forest-600/70 leading-tight">Emergency Support</div>
          </div>
        </div>

        {/* Wrapped Paragraph */}
        <p className="text-forest-800/70 leading-relaxed mb-10 max-w-none">
          Managing a housing society comes with real electrical pressure. Pump rooms trip. Meter panels fail. Common area lights go dark. We step in fast, fix it right, and keep things running. With over 30 years of on-site experience, our team is the one Mumbai societies call first.
        </p>

        {/* Features List */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-y-6">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-pastelBrown-500 shrink-0 mt-0.5" />
              <span className="text-sm font-sans text-forest-800 font-medium leading-tight">{feature}</span>
            </div>
          ))}
        </div>

          <div className="mt-12 clear-left">
            <a href="/amc" className="btn-underline text-[10px]">Explore AMC Packages</a>
          </div>

        <div className="clear-both"></div>
      </div>
    </section>
  )
}
