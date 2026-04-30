import { useReveal } from '../../hooks/useInView'

export default function Hero() {
  const ref = useReveal()

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-tan-tints" ref={ref}>
      
      <div className="max-w-site pad grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Content */}
        <div className="max-w-xl">
          <div className="flex items-center gap-4 text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] mb-12 reveal d-0">
            <span>Est. 1994</span>
            <span className="w-1 h-1 rounded-full bg-burnt-500" />
            <span>30+ Years of Excellence</span>
          </div>

          <h1 className="h1 text-forest-800 mb-10 reveal d-100">
            Lighting up homes <br />
            <span className="italic font-normal text-forest-600">and building trust</span> <br />
            for <span className="text-burnt-500">30+ years now.</span>
          </h1>

          <p className="text-lg text-forest-800/70 mb-14 leading-relaxed reveal d-200">
            From bespoke residential wiring to commercial fit-outs and our curated in-house shop. We unify technical discipline with three decades of mastery in Mumbai.
          </p>

          <div className="flex flex-wrap gap-8 reveal d-300">
            <a href="#contact" className="btn-underline">
              Start Your Project
            </a>
            <a href="#services" className="btn-underline text-burnt-500 after:bg-burnt-500">
              Our Shop & Services
            </a>
          </div>
        </div>

        {/* Right: Arched Image */}
        <div className="relative reveal d-200 lg:pl-10">
          <div className="relative z-10 arch-frame overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/4]">
            <img 
              src="/images/hero_inspiration.png" 
              alt="Premium Interior Lighting" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating Quote */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 py-6 shadow-xl reveal d-400 min-w-[280px] text-center">
            <span className="font-serif italic text-forest-800 text-lg">
              "Engineering trust since 1994."
            </span>
          </div>

          {/* Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-burnt-400/20 rounded-full -z-10 blur-3xl" />
        </div>

      </div>
    </section>
  )
}
