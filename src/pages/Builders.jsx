import { ShieldCheck, Zap, Phone, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useInView'

export default function Builders() {
  const ref = useReveal()

  return (
    <div className="pt-20 bg-tan-50 min-h-screen overflow-hidden" ref={ref}>
      <section className="pt-8 pb-12 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Pitch Side */}
          <div className="reveal d-0">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Strategic Partnerships</span>
            <h1 className="h1 mt-6 text-forest-800">
              Electrical Infrastructure <br />
              <span className="italic font-normal text-forest-600">for Modern Landmarks.</span>
            </h1>
            <p className="text-base text-forest-800/60 mt-8 mb-10 leading-relaxed max-w-md">
              As a PWD Licensed contractor with 30 years of experience, we provide end-to-end bulk electrical support for residential colonies and high-rises.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="text-forest-600 shrink-0" size={24} />
                <p className="text-sm text-forest-800/80 font-bold">PWD Licensed & Safety Certified</p>
              </div>
              <div className="flex gap-4 items-start">
                <Zap className="text-forest-600 shrink-0" size={24} />
                <p className="text-sm text-forest-800/80 font-bold">Timely Project Completion</p>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="text-forest-600 shrink-0" size={24} />
                <p className="text-sm text-forest-800/80 font-bold">Direct Hotline: +91 87799 79519</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="reveal d-200 bg-white p-10 lg:p-14 shadow-2xl rounded-2xl border border-forest-800/5">
            <h2 className="font-serif text-3xl text-forest-800 mb-8">Discuss Your Project.</h2>
            <form className="space-y-6">
              <input type="text" placeholder="Builder / Company Name" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Project Location" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
                <input type="email" placeholder="Professional Email" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
              </div>
              <textarea rows="3" placeholder="Brief project scope (e.g., 50 Flat Wiring)" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg resize-none"></textarea>
              <button className="w-full bg-forest-800 text-white py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-4">
                Submit Partnership Request <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}
