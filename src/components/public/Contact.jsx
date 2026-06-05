import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import { useReveal } from '../../hooks/useInView'
import { useCreateLead } from '../../hooks/useLeads'
import toast from 'react-hot-toast'

export default function Contact() {
  const ref = useReveal()
  const createLead = useCreateLead()
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    serviceType: 'Society AMC Contract',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and contact number')
      return
    }

    try {
      await createLead.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        service_type: formData.serviceType,
        message: `Source: Homepage Contact Form\n` + (formData.company ? `Company/Society: ${formData.company}\n\n${formData.message || 'N/A'}` : (formData.message || 'N/A'))
      })
      toast.success('Request submitted successfully!')
      setSubmitted(true)
    } catch (err) {
      // Error handled by react-query
    }
  }

  return (
    <section id="contact" className="py-16 md:py-32 bg-cream-100" ref={ref}>
      <div className="max-w-site pad grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
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
              <div className="text-forest-800 opacity-30 group-hover:opacity-100 transition-opacity"><WhatsAppIcon size={24} /></div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-forest-600 mb-2">WhatsApp</div>
                <div className="text-xl font-serif text-forest-800">
                  <a href="https://wa.me/919920249933?text=Hi!%20I%20found%20your%20website%20and%20need%20electrical%20work%20done.%0A%0A*Name%3A*%20%0A*Phone%3A*%20" target="_blank" rel="noopener noreferrer" className="hover:text-forest-600 transition-colors">+91 99202 49933</a>
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
                  <a href="mailto:support.rkelectricals@gmail.com" className="hover:text-forest-600 transition-colors">support.rkelectricals@gmail.com</a>
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
        <div className="reveal d-200 bg-white p-6 md:p-12 lg:p-16 shadow-2xl">
          {submitted ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest-50 text-forest-600 mb-8 shadow-inner border border-forest-100/50 relative">
                <span className="absolute inset-0 rounded-full bg-forest-100/30 animate-ping"></span>
                <CheckCircle2 size={40} className="relative z-10 text-forest-800" />
              </div>
              <h3 className="font-serif text-4xl text-forest-800 mb-4 leading-tight">Request Submitted!</h3>
              <div className="h-[2px] w-12 bg-pastelBrown-500 mx-auto mb-6"></div>
              <p className="text-forest-800/70 max-w-sm mx-auto leading-relaxed text-sm font-sans font-medium">
                Thank you. We have received your query and a team member will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 transition-colors outline-none font-serif text-base placeholder:text-forest-100" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Contact Number *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Mobile number" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 transition-colors outline-none font-serif text-base placeholder:text-forest-100" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Society Name / Architect Firm</label>
                <input 
                  type="text" 
                  placeholder="Optional but recommended for B2B" 
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 transition-colors outline-none font-serif text-base placeholder:text-forest-100" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Service Required</label>
                <select 
                  value={formData.serviceType}
                  onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 transition-colors outline-none font-serif text-base cursor-pointer"
                >
                  <option value="Society AMC Contract">Society AMC Contract</option>
                  <option value="Architect Project / Building Rewiring">Architect Project / Building Rewiring</option>
                  <option value="Commercial / Office Setup">Commercial / Office Setup</option>
                  <option value="Individual Residential / Retail Repair">Individual Residential / Retail Repair</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600 font-sans">Message</label>
                <textarea 
                  rows="3" 
                  placeholder="Briefly describe your work" 
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 transition-colors outline-none font-serif text-base placeholder:text-forest-100 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={createLead.isPending}
                className="w-full bg-forest-800 text-white font-sans font-bold uppercase tracking-[0.2em] text-[12px] py-4 hover:bg-pastelBrown-500 transition-all duration-500 flex items-center justify-center gap-4 group disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {createLead.isPending ? 'Submitting...' : 'Submit Request'}
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Map Full Width */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 mt-24 reveal d-300">
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-forest-100/50 relative bg-gray-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9252329868735!2d72.8436531!3d19.2307524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b12db71593ef%3A0x8e8334863c87f1ce!2sR.K.%20Electricals!5e0!3m2!1sen!2sin!4v1716382092147!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="RK Electricals Shop Location"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
