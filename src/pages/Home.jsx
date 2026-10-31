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
    "name": "R K Electricals",
    "image": "https://rkelectricals.online/logo.png",
    "@id": "https://rkelectricals.online/#organization",
    "url": "https://rkelectricals.online",
    "telephone": "+919779979519",
    "priceRange": "₹₹",
    "hasMap": "https://www.google.com/maps/search/?api=1&query=R+K+Electricals&query_place_id=ChIJrfSciiWx5zsR2Ktjso6Q7D0",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 3, Surya Kiran Society, Jairaj Nagar, Baburao Paranjape Marg, Vazira, Borivali West",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400091",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.2328239,
      "longitude": 72.843016
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
      "https://maps.google.com/?cid=4462100273369951192"
    ]
  }

  return (
    <>
      <SEOHead 
        title="R K Electricals | Mumbai's Trusted Electricians Since 1994"
        description="R K Electricals | Mumbai's premier electrical contractors since 1994. 30+ years of high-rise society AMC, residential concealed wiring, and architectural installations."
        keywords="electrician Mumbai, electrical contractor Borivali, housing society electrical AMC, concealed wiring Mumbai, PWD licensed contractor, R K Electricals"
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
