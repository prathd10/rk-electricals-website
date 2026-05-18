import { useState } from 'react'
import { ShieldCheck, Zap, Phone, ArrowRight, Building, ClipboardCheck, Clock } from 'lucide-react'
import { useReveal } from '../hooks/useInView'
import { useCreateLead } from '../hooks/useLeads'
import toast from 'react-hot-toast'

export default function Amc() {
  const ref = useReveal()
  const createLead = useCreateLead()

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    propertyType: 'Society',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.contactName || !formData.phone) {
      toast.error('Please enter contact name and phone number')
      return
    }

    try {
      await createLead.mutateAsync({
        name: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        service_type: 'Society AMC Contract',
        message: `Company/Society: ${formData.companyName}\nProperty Type: ${formData.propertyType}\nScope: ${formData.message}`
      })
      toast.success('AMC inquiry submitted successfully!')
      setSubmitted(true)
    } catch (err) {
      // Error is handled by react-query / useCreateLead
    }
  }

  return (
    <div className="pt-20 bg-tan-50 min-h-screen overflow-hidden animate-fade-in" ref={ref}>
      <section className="pt-8 pb-20 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Pitch Side */}
          <div className="reveal d-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forest-600/20 bg-forest-50/50 mb-6">
              <ClipboardCheck size={11} className="text-forest-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-forest-600">Annual Maintenance Contracts</span>
            </div>
            
            <h1 className="h1 text-forest-800 leading-tight">
              Uninterrupted Power, <br />
              <span className="italic font-normal text-forest-600">Guaranteed Safety.</span>
            </h1>
            
            <p className="text-base text-forest-800/60 mt-6 mb-8 leading-relaxed max-w-lg">
              As PWD Licensed contractors with a 30-year legacy, we provide comprehensive AMC contracts for residential societies, high-rises, showrooms, and commercial spaces across Mumbai.
            </p>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3.5 items-start p-4 bg-white/40 rounded-xl border border-forest-800/5 shadow-sm">
                <ShieldCheck className="text-forest-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800">Preventive Audits</h4>
                  <p className="text-[11px] text-forest-800/60 mt-1 leading-relaxed">Periodic earth testing, load balancing, and thorough panel dressing.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-4 bg-white/40 rounded-xl border border-forest-800/5 shadow-sm">
                <Clock className="text-forest-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800">Priority Response</h4>
                  <p className="text-[11px] text-forest-800/60 mt-1 leading-relaxed">Fast-tracked technician dispatch to handle local emergencies.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-4 bg-white/40 rounded-xl border border-forest-800/5 shadow-sm">
                <Zap className="text-forest-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800">Certified Spares Only</h4>
                  <p className="text-[11px] text-forest-800/60 mt-1 leading-relaxed">100% authentic, certified, ISI-marked premium switchgear and cables.</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-start p-4 bg-white/40 rounded-xl border border-forest-800/5 shadow-sm">
                <Building className="text-forest-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800">PWD Certified</h4>
                  <p className="text-[11px] text-forest-800/60 mt-1 leading-relaxed">Direct engineering supervision by licensed PWD supervisors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="reveal d-200 bg-white p-10 lg:p-14 shadow-2xl rounded-2xl border border-forest-800/5">
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-50 text-forest-600 mb-6">
                  <ShieldCheck size={36} />
                </div>
                <h2 className="font-serif text-3xl text-forest-800 mb-4">Thank You!</h2>
                <p className="text-forest-800/60 max-w-sm mx-auto leading-relaxed text-sm">
                  We have received your AMC inquiry. Our senior supervisor will contact you shortly to coordinate a site visit and layout assessment.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl md:text-3xl text-forest-800 mb-2">Request an AMC Quote</h2>
                <p className="text-forest-800/50 text-xs mb-8">Get a customized electrical maintenance layout for your property.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-forest-600">Society / Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Surya Kiran CHS" 
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base transition-colors" 
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-forest-600">Contact Person *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Your Name" 
                        value={formData.contactName}
                        onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base transition-colors" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-forest-600">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Mobile Number" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-forest-600">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="name@domain.com" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base transition-colors" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-forest-600">Property Type</label>
                      <select 
                        value={formData.propertyType}
                        onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base transition-colors cursor-pointer appearance-none"
                      >
                        <option value="Society">Housing Society</option>
                        <option value="Commercial">Commercial Office</option>
                        <option value="Retail">Retail Showroom</option>
                        <option value="Bungalow">Bungalow / Villa</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-forest-600">Maintenance Scope / Message</label>
                    <textarea 
                      rows="3" 
                      placeholder="Describe wings, flats, or office square footage..." 
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={createLead.isPending}
                    className="w-full bg-forest-800 text-white py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-4 disabled:opacity-55 disabled:cursor-not-allowed shadow-lg rounded-sm"
                  >
                    {createLead.isPending ? 'Submitting...' : 'Submit AMC Inquiry'} <ArrowRight size={16} />
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}
