import Hero         from '../components/public/Hero'
import TrustSection from '../components/public/TrustSection'
import SocietyServicesSection from '../components/public/SocietyServicesSection'
import ArchitectServicesSection from '../components/public/ArchitectServicesSection'
import RetailServicesSection from '../components/public/RetailServicesSection'
import Gallery      from '../components/public/Gallery'
import CaseStudies from '../components/public/CaseStudies'
import BrandsSection from '../components/public/BrandsSection'
import BlogSection   from '../components/public/BlogSection'
import Contact      from '../components/public/Contact'
import SEOHead      from '../components/common/SEOHead'

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "name": "RK Electricals",
    "image": "https://rkelectricals.online/logo.png",
    "@id": "https://rkelectricals.online/#organization",
    "url": "https://rkelectricals.online",
    "telephone": "+919779979519",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 3, Surya Kiran Society, Jairaj Nagar, Baburao Paranjape Marg",
      "addressLocality": "Borivali West",
      "addressRegion": "Mumbai, Maharashtra",
      "postalCode": "400091",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.2307524,
      "longitude": 72.8436531
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:30",
      "closes": "19:30"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Borivali West" },
      { "@type": "AdministrativeArea", "name": "Kandivali West" },
      { "@type": "AdministrativeArea", "name": "Dahisar West" },
      { "@type": "AdministrativeArea", "name": "Malad West" },
      { "@type": "AdministrativeArea", "name": "Mumbai" }
    ],
    "sameAs": [
      "https://maps.google.com/?cid=10269094056248373710"
    ]
  }

  return (
    <>
      <SEOHead 
        title="RK Electricals | Mumbai's Trusted Electricians Since 1994"
        description="RK Electricals | Mumbai's premier electrical contractors since 1994. 30+ years of high-rise society AMC, residential concealed wiring, and architectural installations."
        keywords="electrician Mumbai, electrical contractor Borivali, housing society electrical AMC, concealed wiring Mumbai, PWD licensed contractor, RK Electricals"
        canonicalUrl="https://rkelectricals.online"
        schema={localBusinessSchema}
      />
      <Hero />
      <TrustSection />
      <SocietyServicesSection />
      <ArchitectServicesSection />
      <RetailServicesSection />
      <Gallery />
      <CaseStudies />
      <BrandsSection />
      <BlogSection />
      <Contact />
    </>
  )
}
