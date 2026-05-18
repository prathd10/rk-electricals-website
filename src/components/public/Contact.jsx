import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react'
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
            {/* Phone */}
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><Phone size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">Call Us</div>
                <div className="text-xl font-serif text-forest-800">
                  <a href="tel:+919779979519" className="hover:text-forest-600 transition-colors">+91 97799 79519</a>
                </div>
                <div className="text-sm font-sans text-forest-600 mt-1">Kirit Sheth (Primary) · 022 2833 7226 (Landline)</div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><MessageCircle size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">WhatsApp</div>
                <div className="text-xl font-serif text-forest-800">
                  <a href="https://wa.me/919920249933" target="_blank" rel="noopener noreferrer" className="hover:text-forest-600 transition-colors">+91 99202 49933</a>
                </div>
                <div className="text-sm font-sans text-forest-600 mt-1">Jasmine Sheth (Official Inquiries)</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><Mail size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">Email</div>
                <div className="text-xl font-serif text-forest-800">
                  <a href="mailto:rkelectricals707@gmail.com" className="hover:text-forest-600 transition-colors">rkelectricals707@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-8 group">
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><MapPin size={24} strokeWidth={1.5} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">Our Shop</div>
                <div className="text-xl font-serif text-forest-800 leading-snug">
                  Shop No. 3, Surya Kiran Society,<br />
                  Jairaj Nagar, Baburao Paranjape Marg,<br />
                  Borivali West, Mumbai 400091
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
            <button type="submit" className="w-full bg-forest-800 text-white font-sans font-bold uppercase tracking-[0.2em] text-[12px] py-6 hover:bg-pastelBrown-500 transition-all duration-500 flex items-center justify-center gap-4 group">
              Submit Request
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
