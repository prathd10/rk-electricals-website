import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useInView'

export default function ContactPage() {
  const ref = useReveal()

  return (
    <div className="pt-32 bg-tan-50 min-h-screen flex flex-col justify-center" ref={ref}>
      <section className="py-20 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Info Side */}
          <div className="reveal d-0">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Get in Touch</span>
            <h1 className="h1 mt-8 text-forest-800">
              Let's power your <br />
              <span className="italic font-normal text-forest-600">next project.</span>
            </h1>
            <p className="text-lg text-forest-800/60 mt-12 mb-16 leading-relaxed max-w-md">
              Whether you need an emergency repair or a large-scale infrastructure consultation, our team is ready to help.
            </p>

            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Phone size={12} /> Call Us
                </h4>
                <p className="font-serif text-xl text-forest-800">+91 87799 79519</p>
                <p className="text-sm text-forest-800/60">022 2833 7226 (Shop)</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Clock size={12} /> Shop Hours
                </h4>
                <p className="font-serif text-xl text-forest-800">10 AM — 8 PM</p>
                <p className="text-sm text-forest-800/60">Monday to Saturday</p>
              </div>
              <div className="sm:col-span-2 space-y-4 pt-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <MapPin size={12} /> Our Location
                </h4>
                <p className="font-serif text-xl text-forest-800 leading-snug">
                  Surya Kiran, Baburao Paranjape Marg,<br />
                  Borivali West, Mumbai 400091
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="reveal d-200 bg-white p-12 lg:p-16 shadow-2xl rounded-3xl border border-forest-800/5">
            <h2 className="font-serif text-3xl text-forest-800 mb-10">Send a Message.</h2>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Service Required</label>
                <select className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg cursor-pointer">
                  <option>General Repair</option>
                  <option>New Installation</option>
                  <option>AMC / Maintenance</option>
                  <option>Shop Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Message</label>
                <textarea rows="3" placeholder="How can we help?" className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg resize-none"></textarea>
              </div>
              <button className="w-full bg-forest-800 text-white py-6 font-bold uppercase tracking-widest text-[12px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-4">
                Send Request <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-site pad mx-auto">
          <div className="aspect-[21/9] w-full grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 rounded-3xl overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.123456789!2d72.8456789!3d19.2345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1234567890!2sR+K+Electricals!5e0!3m2!1sen!2sin!4v1234567890123" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
