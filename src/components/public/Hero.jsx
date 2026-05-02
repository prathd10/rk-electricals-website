import { useReveal } from '../../hooks/useInView'

export default function Hero() {
  const ref = useReveal()

  return (
    <section 
      className="relative min-h-screen lg:h-screen flex items-center pt-28 pb-10 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/images/hero_interior_bg.png')" }}
      ref={ref}
    >
      
      <div className="relative z-10 w-full flex justify-start">
        
        {/* Left: Content */}
        <div className="w-[70%] text-left bg-white/40 backdrop-blur-xl px-6 md:px-12 py-16 md:py-20 rounded-r-[40px] border border-l-0 border-white/60 shadow-2xl flex flex-col justify-center">
          <h1 className="font-serif text-2xl md:text-5xl text-forest-800 mb-8 reveal d-100 leading-[1.1] tracking-tight">
            Powering excellence <br />
            <span className="italic font-normal text-forest-800 drop-shadow-sm">and electrifying trust</span> <br />
            for <span className="text-pastelBrown-800 font-bold">30+ years now.</span>
          </h1>

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
              href="https://wa.me/918779979519?text=I%20need%20immediate%20electrical%20service" 
              className="inline-flex items-center gap-2 bg-pastelBrown-500 text-white px-6 py-3 font-bold uppercase tracking-widest text-[8px] hover:bg-pastelBrown-600 transition-all shadow-xl rounded-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              Request Immediate Service
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
