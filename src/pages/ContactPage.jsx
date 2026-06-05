import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import { useReveal } from '../hooks/useInView'
import { useCreateLead } from '../hooks/useLeads'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const ref = useReveal()
  const createLead = useCreateLead()
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'General Repair',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number')
      return
    }

    try {
      await createLead.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        service_type: formData.serviceType,
        message: `Source: Contact Page\nMessage: ${formData.message || 'N/A'}`
      })
      toast.success('Inquiry submitted successfully!')
      setSubmitted(true)
    } catch (err) {
      // Error handled by react-query
    }
  }

  return (
    <div className="pt-20 bg-tan-50 min-h-screen" ref={ref}>
      <section className="pt-6 pb-16 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Info Side */}
          <div className="reveal d-0">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Get in Touch</span>
            <h1 className="h1 mt-8 text-forest-800">
              Let's power your <br />
              <span className="italic font-normal text-forest-600">next project.</span>
            </h1>
            <p className="text-base text-forest-800/60 mt-6 mb-10 leading-relaxed max-w-md">
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
                  <WhatsAppIcon size={12} /> WhatsApp
                </h4>
                <p className="font-serif text-xl text-forest-800">
                  <a href="https://wa.me/919920249933?text=Hi!%20I%20found%20your%20website%20and%20need%20electrical%20work%20done.%0A%0A*Name%3A*%20%0A*Phone%3A*%20" target="_blank" rel="noopener noreferrer" className="hover:text-forest-600 transition-colors">+91 99202 49933</a>
                </p>
                <p className="text-sm text-forest-800/60">Jasmine Sheth (Official Inquiries)</p>
              </div>

              {/* Email */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Mail size={12} /> Email
                </h4>
                <p className="font-serif text-xl text-forest-800">
                  <a href="mailto:support.rkelectricals@gmail.com" className="hover:text-forest-600 transition-colors">support.rkelectricals@gmail.com</a>
                </p>
              </div>

              {/* Shop Hours */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-800/40 flex items-center gap-2">
                  <Clock size={12} /> Shop Hours
                </h4>
                <p className="font-serif text-xl text-forest-800">10 AM — 7 PM</p>
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
            </div>
          </div>

          {/* Form Side */}
          <div className="reveal d-200 bg-white p-6 md:p-12 lg:p-16 shadow-2xl rounded-3xl border border-forest-800/5">
            {submitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest-50 text-forest-600 mb-8 shadow-inner border border-forest-100/50 relative">
                  <span className="absolute inset-0 rounded-full bg-forest-100/30 animate-ping"></span>
                  <CheckCircle2 size={40} className="relative z-10 text-forest-800" />
                </div>
                <h2 className="font-serif text-4xl text-forest-800 mb-4 leading-tight">Message Sent!</h2>
                <div className="h-[2px] w-12 bg-pastelBrown-500 mx-auto mb-6"></div>
                <p className="text-forest-800/70 max-w-sm mx-auto leading-relaxed text-sm font-sans font-medium">
                  Thank you for reaching out. We have received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-3xl text-forest-800 mb-10">Send a Message.</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-base" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-base" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Service Required</label>
                    <select 
                      value={formData.serviceType}
                      onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-base cursor-pointer"
                    >
                      <option value="General Repair">General Repair</option>
                      <option value="New Installation">New Installation</option>
                      <option value="AMC / Maintenance">AMC / Maintenance</option>
                      <option value="Shop Inquiry">Shop Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Message</label>
                    <textarea 
                      rows="3" 
                      placeholder="How can we help?" 
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-base resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={createLead.isPending}
                    className="w-full bg-forest-800 text-white py-4 font-bold uppercase tracking-widest text-[12px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-4 disabled:opacity-55 disabled:cursor-not-allowed shadow-lg rounded-sm"
                  >
                    {createLead.isPending ? 'Sending...' : 'Send Request'} <Send size={16} />
                  </button>
                </form>
              </>
            )}
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
