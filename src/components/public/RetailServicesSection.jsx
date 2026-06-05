import { useReveal } from '../../hooks/useInView'
import { Store, Wrench, ShoppingBag, MapPin, Lightbulb } from 'lucide-react'

export default function RetailServicesSection() {
  const ref = useReveal()

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-site pad text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-forest-600/20 bg-forest-50 mb-6 reveal d-0">
          <Store size={14} className="text-forest-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-600">Retail & Repairs</span>
        </div>
        
        <h2 className="h2 text-forest-800 mb-4 reveal d-100">
          Visit our <span className="italic font-normal text-forest-600">Borivali shop.</span>
        </h2>
        
        <p className="text-forest-800/70 text-sm max-w-2xl mx-auto mb-16 reveal d-200">
          While we specialize in large-scale contracting, our roots remain in our local community. Visit our retail counter for everyday electrical needs, premium switches, and trusted appliance repairs.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto reveal d-300">
          <div className="p-6 rounded-2xl bg-cream-50 border border-forest-100/50 hover:shadow-lg transition-shadow">
            <ShoppingBag size={28} strokeWidth={1.5} className="text-pastelBrown-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-forest-800 mb-2">Premium Goods</h3>
            <p className="text-[12px] text-forest-800/60 leading-relaxed">
              Genuine switches, lighting, and wires from top global brands.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cream-50 border border-forest-100/50 hover:shadow-lg transition-shadow">
            <Wrench size={28} strokeWidth={1.5} className="text-pastelBrown-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-forest-800 mb-2">Expert Repairs</h3>
            <p className="text-[12px] text-forest-800/60 leading-relaxed">
              Same-day repairs for fans, mixers, geysers, and home appliances.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cream-50 border border-forest-100/50 hover:shadow-lg transition-shadow">
            <Lightbulb size={28} strokeWidth={1.5} className="text-pastelBrown-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-forest-800 mb-2">Home Wiring</h3>
            <p className="text-[12px] text-forest-800/60 leading-relaxed">
              Point-to-point wiring, new outlets, and switchboard replacements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cream-50 border border-forest-100/50 hover:shadow-lg transition-shadow">
            <MapPin size={28} strokeWidth={1.5} className="text-pastelBrown-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-forest-800 mb-2">Local Support</h3>
            <p className="text-[12px] text-forest-800/60 leading-relaxed">
              Quick residential fixes dispatched directly from our Borivali base.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
