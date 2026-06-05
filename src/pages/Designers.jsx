import { useState } from 'react'
import { Palette, Lightbulb, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useReveal } from '../hooks/useInView'
import { useCreateLead } from '../hooks/useLeads'
import toast from 'react-hot-toast'

export default function Designers() {
  const ref = useReveal()
  const createLead = useCreateLead()
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name/studio and phone number')
      return
    }

    try {
      await createLead.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        service_type: 'Designer Collaboration Request',
        message: `Source: Architects & Designers Page\nProject Studio: ${formData.name}\nProject Scope: ${formData.project || 'N/A'}\nMessage: ${formData.message || 'N/A'}`
      })
      toast.success('Collaboration request submitted!')
      setSubmitted(true)
    } catch (err) {
      // Error handled by react-query
    }
  }

  return (
    <div className="pt-20 bg-cream-50 min-h-screen overflow-hidden" ref={ref}>
      <section className="pt-8 pb-12 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Pitch Side */}
          <div className="reveal d-0">
            <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Design Collaboration</span>
            <h1 className="h1 mt-6 text-forest-800 leading-tight">
              We hide our work <br />
              <span className="italic font-normal text-forest-600">so you can showcase yours.</span>
            </h1>
            <p className="text-base text-forest-800/60 mt-8 mb-10 leading-relaxed max-w-md">
              We partner with interior designers to translate complex lighting, automation, and smart control systems into safe, flawless, and completely invisible engineered realities.
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
            {submitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest-50 text-forest-600 mb-8 shadow-inner border border-forest-100/50 relative">
                  <span className="absolute inset-0 rounded-full bg-forest-100/30 animate-ping"></span>
                  <CheckCircle2 size={40} className="relative z-10 text-forest-800" />
                </div>
                <h2 className="font-serif text-4xl text-forest-800 mb-4 leading-tight">Request Received!</h2>
                <div className="h-[2px] w-12 bg-pastelBrown-500 mx-auto mb-6"></div>
                <p className="text-forest-800/70 max-w-sm mx-auto leading-relaxed text-sm font-sans font-medium">
                  Thank you for reaching out. We have received your collaboration request and our senior supervisor will get in touch shortly to coordinate details.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-3xl text-forest-800 mb-8">Let's Collaborate.</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name / Studio *" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" 
                    />
                    <input 
                      type="tel" 
                      required
                      placeholder="Contact Number *" 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" 
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input 
                      type="email" 
                      placeholder="Professional Email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" 
                    />
                    <input 
                      type="text" 
                      placeholder="Project (e.g. Bandra)" 
                      value={formData.project}
                      onChange={e => setFormData({ ...formData, project: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg" 
                    />
                  </div>
                  <textarea 
                    rows="3" 
                    placeholder="How can we help with your technical execution?" 
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-forest-800/10 py-3 focus:border-forest-800 outline-none font-serif text-lg resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={createLead.isPending}
                    className="w-full bg-forest-800 text-white py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-4 disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    {createLead.isPending ? 'Sending request...' : 'Send Collaboration Request'} <ArrowRight size={16} />
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
