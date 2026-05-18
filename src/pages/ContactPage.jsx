import { Phone, Mail, MapPin, Clock, Send, ArrowRight, MessageCircle } from 'lucide-react'
import { useReveal } from '../hooks/useInView'

export default function ContactPage() {
  const ref = useReveal()

  return (
    <div className="pt-20 bg-tan-50 min-h-screen" ref={ref}>
      <section className="pt-8 pb-20 pad">
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
              {/* Calls */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Phone size={12} /> Call Us
                </h4>
                <p className="font-serif text-xl text-forest-800">
                  <a href="tel:+919779979519" className="hover:text-forest-600 transition-colors">+91 97799 79519</a>
                </p>
                <p className="text-sm text-forest-800/60">022 2833 7226 (Shop Landline)</p>
              </div>

              {/* WhatsApp */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <MessageCircle size={12} /> WhatsApp
                </h4>
                <p className="font-serif text-xl text-forest-800">
                  <a href="https://wa.me/919920249933" target="_blank" rel="noopener noreferrer" className="hover:text-forest-600 transition-colors">+91 99202 49933</a>
                </p>
                <p className="text-sm text-forest-800/60">Jasmine Sheth (Official Inquiries)</p>
              </div>

              {/* Email */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Mail size={12} /> Email
                </h4>
                <p className="font-serif text-xl text-forest-800">
                  <a href="mailto:rkelectricals707@gmail.com" className="hover:text-forest-600 transition-colors">rkelectricals707@gmail.com</a>
                </p>
              </div>

              {/* Shop Hours */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Clock size={12} /> Shop Hours
                </h4>
                <p className="font-serif text-xl text-forest-800">10 AM — 8 PM</p>
                <p className="text-sm text-forest-800/60">Monday to Saturday</p>
              </div>

              {/* Location */}
              <div className="sm:col-span-2 space-y-4 pt-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <MapPin size={12} /> Our Location
                </h4>
                <p className="font-serif text-xl text-forest-800 leading-snug">
                  Shop No. 3, Surya Kiran Society,<br />
                  Jairaj Nagar, Baburao Paranjape Marg,<br />
                  Borivali West, Mumbai 400091
                </p>
              </div>

              {/* Payment & Banking Details */}
              <div className="sm:col-span-2 space-y-4 pt-6 border-t border-forest-800/10">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  Bank Transfer Details (NEFT/RTGS)
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs bg-white/40 p-4 rounded-xl border border-forest-800/5 shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase text-forest-600 font-bold">Bank Name</span>
                    <p className="font-semibold text-forest-800">Karur Vysya Bank</p>
                    <span className="text-[9px] text-forest-800/40">MUMBAI BORIVALI</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-forest-600 font-bold">IFSC Code</span>
                    <p className="font-semibold text-forest-800">KVBL0002106</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-forest-600 font-bold">Account Name</span>
                    <p className="font-semibold text-forest-800 font-serif">R K ELECTRICALS</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-forest-600 font-bold">Account No.</span>
                    <p className="font-semibold text-forest-800">2106115000001458</p>
                  </div>
                  <div className="col-span-2 border-t border-forest-800/5 pt-2 mt-1 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase text-forest-600 font-bold">Official UPI ID</span>
                      <p className="font-semibold text-forest-800">rkelectricals@kvb</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] bg-forest-800/10 text-forest-800 px-2 py-0.5 rounded-full font-bold uppercase">GPAY NO</span>
                      <p className="font-semibold text-forest-800 text-xs mt-0.5">9920249933</p>
                    </div>
                  </div>
                </div>
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
