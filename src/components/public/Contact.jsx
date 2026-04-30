import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useReveal } from '../../hooks/useInView'

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="py-32 bg-cream-100" ref={ref}>
      <div className="max-w-site pad grid lg:grid-cols-2 gap-24 items-start">
        
        {/* Info */}
        <div>
          <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Connect</span>
          <h2 className="h2 mt-8 text-forest-800 reveal d-100">Let's discuss <br /><span className="italic font-normal text-forest-600">your requirements.</span></h2>
          <p className="text-lg text-forest-800/60 mt-12 mb-20 leading-relaxed reveal d-200">
            Visit our shop in Borivali West or call us for a site audit. We provide same-day response for local repair inquiries.
          </p>

          <div className="space-y-12 reveal d-300">
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><Phone size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">Call Us</div>
                <div className="text-xl font-serif text-forest-800">022 2833 7226</div>
                <div className="text-sm font-sans text-forest-600 mt-1">+91 87799 79519 (WhatsApp)</div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><Mail size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">Email</div>
                <div className="text-xl font-serif text-forest-800">rkelectricals.mumbai@gmail.com</div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><MapPin size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">Our Shop</div>
                <div className="text-xl font-serif text-forest-800">
                  Surya Kiran, Baburao Paranjape Marg,<br />
                  Opp. Amazon, Borivali West, Mumbai 91
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="reveal d-200 bg-white p-12 lg:p-16 shadow-2xl">
          <form className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Full Name</label>
              <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-forest-800/10 py-4 focus:border-forest-800 transition-colors outline-none font-serif text-xl placeholder:text-forest-100" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Contact Number</label>
              <input type="tel" placeholder="Mobile number" className="w-full bg-transparent border-b border-forest-800/10 py-4 focus:border-forest-800 transition-colors outline-none font-serif text-xl placeholder:text-forest-100" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Service Required</label>
              <select className="w-full bg-transparent border-b border-forest-800/10 py-4 focus:border-forest-800 transition-colors outline-none font-serif text-xl appearance-none">
                <option>New Wiring / Setup</option>
                <option>Society AMC Contract</option>
                <option>Gadget / Appliance Repair</option>
                <option>Equipment Inquiry</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Message</label>
              <textarea rows="4" placeholder="Briefly describe your work" className="w-full bg-transparent border-b border-forest-800/10 py-4 focus:border-forest-800 transition-colors outline-none font-serif text-xl placeholder:text-forest-100 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-forest-800 text-white font-sans font-bold uppercase tracking-[0.2em] text-[12px] py-6 hover:bg-burnt-500 transition-all duration-500 flex items-center justify-center gap-4 group">
              Submit Request
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
