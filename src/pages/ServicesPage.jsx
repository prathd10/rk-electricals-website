import { useState } from 'react'
import { useReveal } from '../hooks/useInView'
import { ClipboardCheck, Building2, Paintbrush, ShoppingBag, ArrowRight, Send, CheckCircle2, Images } from 'lucide-react'
import { useCreateLead } from '../hooks/useLeads'
import toast from 'react-hot-toast'

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: 'Society AMC',
    desc: 'Annual maintenance for housing societies — pump rooms, panels, common area lighting, and 24/7 emergency support.',
    link: '/amc',
  },
  {
    icon: Building2,
    title: 'Electrical Contracting',
    desc: 'Large-scale building rewiring, meter room upgrades, and commercial setups. PWD-licensed and fully insured.',
    link: '/contact',
  },
  {
    icon: Paintbrush,
    title: 'Architect Projects',
    desc: 'BOQ support, concealed wiring, premium lighting execution — working directly with architects and designers.',
    link: '/designers',
  },
  {
    icon: ShoppingBag,
    title: 'Retail & Repairs',
    desc: 'Genuine switches, LED lighting, cables, and same-day appliance repairs at our Borivali West shop.',
    link: '/contact',
  },
]

export default function ServicesPage() {
  const ref = useReveal()
  const createLead = useCreateLead()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', serviceType: 'Society AMC Contract' })

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
        message: `Source: Services Page\nMessage: Inquiry from Services page`
      })
      toast.success('Request submitted!')
      setSubmitted(true)
    } catch (err) {}
  }

  return (
    <div className="bg-cream-50 min-h-screen pt-28 pb-20" ref={ref}>
      <div className="max-w-site pad">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Our Services</span>
          <h1 className="font-serif text-4xl md:text-5xl text-forest-800 mt-4 reveal d-100">
            30+ years of electrical
            <span className="block italic font-normal text-forest-600">expertise in Mumbai.</span>
          </h1>
          <p className="text-forest-800/60 text-sm max-w-xl mx-auto mt-5 leading-relaxed reveal d-200">
            Trusted by housing societies, architects, and businesses across Mumbai for contracting, AMC, and retail electrical needs.
          </p>
        </div>

        {/* ── Services Grid (Badges) ── */}
        <div className="grid grid-cols-2 gap-3 mb-12 reveal d-200">
          {SERVICES.map((svc) => {
            const Icon = svc.icon
            return (
              <a
                key={svc.title}
                href={svc.link}
                className="group bg-white border border-forest-100/60 rounded-2xl p-5 hover:shadow-md hover:border-pastelBrown-300 transition-all duration-300 flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-forest-50 flex items-center justify-center group-hover:bg-pastelBrown-100 transition-colors">
                  <Icon size={18} strokeWidth={1.5} className="text-pastelBrown-500" />
                </div>
                <div>
                  <h2 className="font-serif text-base text-forest-800 leading-tight mb-1">{svc.title}</h2>
                  <p className="text-forest-800/50 text-[11px] leading-relaxed hidden sm:block">{svc.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-pastelBrown-500 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={10} />
                </span>
              </a>
            )
          })}
        </div>

        {/* ── Portfolio Link Banner ── */}
        <a
          href="/#gallery"
          className="group flex items-center justify-between bg-forest-900 text-white rounded-2xl px-8 py-6 mb-12 hover:bg-forest-800 transition-colors duration-300 reveal d-300"
        >
          <div className="flex items-center gap-4">
            <Images size={24} className="text-pastelBrown-400" strokeWidth={1.5} />
            <div>
              <div className="font-serif text-lg">View Our Portfolio</div>
              <div className="text-white/50 text-xs">Past projects across Mumbai: societies, offices, bungalows and more.</div>
            </div>
          </div>
          <ArrowRight size={18} className="text-pastelBrown-400 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* ── Quick Contact Form ── */}
        <div className="bg-white border border-forest-100/50 rounded-3xl p-6 md:p-10 shadow-sm reveal d-300">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 size={40} className="text-forest-700 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-forest-800 mb-2">We'll be in touch!</h3>
              <p className="text-forest-800/60 text-sm">Our team will call you back shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-forest-800">Get a Quick Quote</h2>
                <p className="text-forest-800/50 text-xs mt-1">We'll call you back within a few hours.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Full Name *</label>
                    <input
                      type="text" required placeholder="Your Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Phone Number *</label>
                    <input
                      type="tel" required placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-forest-600">Service Required</label>
                  <select
                    value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-transparent border-b border-forest-800/10 py-2.5 focus:border-forest-800 outline-none font-serif text-base cursor-pointer"
                  >
                    <option>Society AMC Contract</option>
                    <option>Electrical Contracting</option>
                    <option>Architect / Designer Project</option>
                    <option>Retail / Repair</option>
                    <option>Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={createLead.isPending}
                  className="w-full bg-forest-800 text-white py-3.5 font-bold uppercase tracking-widest text-[11px] hover:bg-pastelBrown-500 transition-all flex items-center justify-center gap-3 rounded-sm disabled:opacity-50"
                >
                  {createLead.isPending ? 'Submitting...' : 'Request a Callback'} <Send size={14} />
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
