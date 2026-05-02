import { Palette, Lightbulb, Smartphone, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useInView'

export default function Designers() {
  const ref = useReveal()

  return (
    <div className="pt-32 bg-cream-50 min-h-screen flex flex-col justify-center overflow-hidden" ref={ref}>
      <section className="py-12 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Pitch Side */}
          <div className="reveal d-0">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Design Collaboration</span>
            <h1 className="h1 mt-6 text-forest-800">
              Technical Precision <br />
              <span className="italic font-normal text-forest-600">for Aesthetic Vision.</span>
            </h1>
            <p className="text-base text-forest-800/60 mt-8 mb-10 leading-relaxed max-w-md">
              We partner with interior designers to translate complex lighting and automation concepts into safe, flawless engineered realities.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Lightbulb className="text-forest-600 shrink-0" size={24} />
                <p className="text-sm text-forest-800/80 font-bold">Expert Lighting Design Execution</p>
              </div>
              <div className="flex gap-4 items-start">
                <Smartphone className="text-forest-600 shrink-0" size={24} />
                <p className="text-sm text-forest-800/80 font-bold">Seamless Smart Home Integration</p>
              </div>
              <div className="flex gap-4 items-start">
                <Palette className="text-forest-600 shrink-0" size={24} />
                <p className="text-sm text-forest-800/80 font-bold">Premium Switch & Hardware Curation</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="reveal d-200 bg-white p-10 lg:p-14 shadow-2xl rounded-2xl border border-forest-800/5">
            <h2 className="font-serif text-3xl text-forest-800 mb-8">Let's Collaborate.</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name / Studio" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
                <input type="email" placeholder="Professional Email" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
              </div>
              <input type="text" placeholder="Project Description (e.g., Bandra Penthouse)" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
              <textarea rows="3" placeholder="How can we help with your technical execution?" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg resize-none"></textarea>
              <button className="w-full bg-forest-800 text-white py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-4">
                Send Collaboration Request <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}
