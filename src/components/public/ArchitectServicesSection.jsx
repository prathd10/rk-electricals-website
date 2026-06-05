import { useReveal } from '../../hooks/useInView'
import { Landmark, PenTool, Lightbulb, Compass } from 'lucide-react'

export default function ArchitectServicesSection() {
  const ref = useReveal()

  const features = [
    {
      icon: PenTool,
      title: "BOQ & Estimation",
      desc: "Accurate material estimation and transparent costing."
    },
    {
      icon: Compass,
      title: "Site Coordination",
      desc: "Seamless integration with civil and plumbing teams."
    },
    {
      icon: Lightbulb,
      title: "Premium Lighting",
      desc: "Execution of complex profile and mood lighting setups."
    }
  ]

  return (
    <section className="py-24 bg-forest-900 text-white" ref={ref}>
      <div className="max-w-site pad reveal">
        
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pastelBrown-500/20 bg-pastelBrown-500/10 mb-6">
          <Landmark size={14} className="text-pastelBrown-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pastelBrown-400">For Architects & Designers</span>
        </div>
        
        {/* Headline */}
        <h2 className="h2 text-white mb-6">
          Your reliable <br />
          <span className="italic font-normal text-pastelBrown-300">execution partner.</span>
        </h2>

        {/* Floated Visual (Right Side) */}
        <div className="relative float-right w-[55%] md:w-[45%] lg:w-[45%] ml-4 mb-4 md:ml-6 md:mb-6">
          <div className="aspect-square rounded-full overflow-hidden shadow-2xl relative border-8 border-forest-800/50">
            <img 
              src="/images/hero_modern.png" 
              alt="Architectural Lighting" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
        
        {/* Wrapped Paragraph */}
        <p className="text-white/60 leading-relaxed mb-10 max-w-none font-sans">
          We bridge the gap between design and reality. Our team handles the technical heavy lifting, ensuring your vision is executed flawlessly, on time, and strictly adhering to safety standards.
        </p>

        {/* Features List */}
        <div className="space-y-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="flex gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-pastelBrown-500/20 transition-colors shrink-0 h-min">
                  <Icon size={20} className="text-pastelBrown-400" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">{feature.title}</h4>
                  <p className="text-sm font-sans text-white/50">{feature.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 clear-left">
          <a href="/designers" className="btn-underline text-[10px] text-white after:bg-white">Partner With Us</a>
        </div>

        <div className="clear-both"></div>
      </div>
    </section>
  )
}
