import { useReveal } from '../../hooks/useInView'

export default function Hero() {
  const ref = useReveal()

  return (
    <section 
      className="relative min-h-screen lg:h-screen flex items-center pt-28 pb-10 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/images/hero_interior_bg.png')" }}
      ref={ref}
    >
      {/* Top Shadow for Navbar Visibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 w-full flex justify-start">
        
        {/* Left: Content */}
        <div className="w-[70%] text-left bg-white/40 backdrop-blur-xl px-6 md:px-12 py-16 md:py-20 rounded-r-[40px] border border-l-0 border-white/60 shadow-2xl flex flex-col justify-center">
          <h1 className="font-serif text-3xl md:text-6xl text-forest-800 mb-6 reveal d-100 leading-[1.1] tracking-tight">
            Electrical Contracting
            <span className="block italic font-normal text-forest-800 drop-shadow-sm">& Maintenance Solutions</span>
          </h1>
          <p className="text-forest-800/80 text-sm md:text-base font-sans mb-8 reveal d-200 max-w-lg leading-relaxed">
            Serving Mumbai with <strong className="text-pastelBrown-800 text-lg">30+ years of experience</strong>. Trusted by housing societies, architects, and commercial properties across the city.
          </p>

          <div className="flex flex-wrap justify-start gap-4 reveal d-300">
            <a href="/contact" className="btn-underline text-[9px]">
              Book a Service
            </a>
            <a 
              href="https://www.google.com/maps/search/Surya+Kiran+Baburao+Paranjape+Marg+Borivali+West+Mumbai+400092" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-underline text-pastelBrown-800 after:bg-pastelBrown-800 text-[9px]"
            >
              Visit Our Shop
            </a>
          </div>

          <div className="mt-8 reveal d-400">
            <a 
              href="https://wa.me/919920249933?text=I%20need%20immediate%20electrical%20service.%0A%0A*Name:*%20%0A*Phone:*%20" 
              className="inline-flex items-center justify-center bg-forest-900/70 backdrop-blur-md border border-white/20 text-white px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-forest-900/80 hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-full"
            >
              Request Immediate Service
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
