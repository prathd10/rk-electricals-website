import { MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { useReveal } from '../hooks/useInView'
import SEOHead from '../components/common/SEOHead'
import { AREAS, AREA_SERVICES } from '../data/areaData'

const SITE = 'https://rkelectricals.online'
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=R+K+Electricals&query_place_id=ChIJrfSciiWx5zsR2Ktjso6Q7D0'

export default function AreaPage({ area }) {
  const ref = useReveal()
  const otherAreas = AREAS.filter(a => a.slug !== area.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Electrician in ${area.name}`,
        serviceType: 'Electrician',
        areaServed: { '@type': 'Place', name: `${area.name}, Mumbai` },
        provider: { '@id': `${SITE}/#organization` },
        url: `${SITE}/${area.slug}`
      },
      {
        '@type': 'Electrician',
        '@id': `${SITE}/#organization`,
        name: 'R K Electricals',
        url: SITE,
        telephone: '+919779979519',
        hasMap: MAPS_URL,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No. 3, Surya Kiran Society, Jairaj Nagar, Baburao Paranjape Marg, Vazira, Borivali West',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          postalCode: '400091',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: area.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      }
    ]
  }

  return (
    <div className="pt-24 bg-tan-50 min-h-screen" ref={ref}>
      <SEOHead
        title={area.metaTitle}
        description={area.metaDescription}
        keywords={area.keywords}
        canonicalUrl={`${SITE}/${area.slug}`}
        schema={schema}
      />

      {/* Hero */}
      <section className="pt-12 pb-20 pad">
        <div className="max-w-site mx-auto">
          <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">
            Serving {area.name}, Mumbai
          </span>
          <h1 className="h1 mt-8 text-forest-800 reveal d-100">
            Electrician in <br />
            <span className="italic font-normal text-forest-600">{area.name}.</span>
          </h1>
          <p className="text-lg text-forest-800/60 mt-12 leading-relaxed max-w-3xl reveal d-200">{area.intro}</p>
          <div className="flex flex-wrap gap-4 mt-12 reveal d-300">
            <a href="tel:+919779979519" className="inline-flex items-center gap-3 bg-forest-800 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-pastelBrown-500 transition-all duration-500">
              <Phone size={14} /> Call +91 97799 79519
            </a>
            <a href="/contact" className="inline-flex items-center gap-3 border border-forest-800 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-forest-800 hover:bg-forest-800 hover:text-white transition-all duration-500">
              Book a Visit
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-site pad mx-auto">
          <h2 className="h2 text-forest-800 mb-16 reveal d-0">
            Electrical Services in <span className="italic font-normal text-forest-600">{area.name}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {AREA_SERVICES.map(s => (
              <div key={s.title} className="bg-tan-50 p-8 rounded-2xl reveal d-100">
                <CheckCircle2 className="text-forest-600 mb-5" size={26} strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-forest-800 mb-3">{s.title}</h3>
                <p className="text-forest-800/60 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local note + localities */}
      <section className="py-24 pad">
        <div className="max-w-site mx-auto grid lg:grid-cols-2 gap-20">
          <div className="reveal d-0">
            <h2 className="h2 text-forest-800 mb-8">{area.localNote.heading}</h2>
            <p className="text-forest-800/70 leading-relaxed">{area.localNote.text}</p>
          </div>
          <div className="reveal d-200">
            <h3 className="font-serif text-2xl text-forest-800 mb-6">Areas We Cover in {area.name}</h3>
            <ul className="flex flex-wrap gap-3 mb-10">
              {area.localities.map(l => (
                <li key={l} className="bg-white px-4 py-2 rounded-full text-sm text-forest-800/80">{l}</li>
              ))}
            </ul>
            <div className="bg-forest-800 text-white p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <MapPin className="text-pastelBrown-500 shrink-0 mt-1" size={22} />
                <div>
                  <div className="font-serif text-xl mb-2">R K Electricals — Borivali West Shop</div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Shop No. 3, Surya Kiran Society, Jairaj Nagar,<br />
                    Baburao Paranjape Marg, Borivali West, Mumbai 400091
                  </p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-pastelBrown-400 hover:text-white">
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-site pad mx-auto max-w-3xl">
          <h2 className="h2 text-forest-800 mb-12 reveal d-0">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {area.faqs.map(f => (
              <div key={f.question} className="border-b border-forest-800/10 pb-8 reveal d-100">
                <h3 className="font-serif text-xl text-forest-800 mb-3">{f.question}</h3>
                <p className="text-forest-800/60 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other areas */}
      <section className="py-20 pad">
        <div className="max-w-site mx-auto">
          <h2 className="font-serif text-2xl text-forest-800 mb-8">We Also Serve</h2>
          <div className="flex flex-wrap gap-4">
            {otherAreas.map(a => (
              <a key={a.slug} href={`/${a.slug}`} className="border border-forest-800/20 px-6 py-3 rounded-full text-sm text-forest-800 hover:bg-forest-800 hover:text-white transition-colors">
                Electrician in {a.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
