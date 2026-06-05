import Hero         from '../components/public/Hero'
import TrustSection from '../components/public/TrustSection'
import SocietyServicesSection from '../components/public/SocietyServicesSection'
import ArchitectServicesSection from '../components/public/ArchitectServicesSection'
import RetailServicesSection from '../components/public/RetailServicesSection'
import Gallery      from '../components/public/Gallery'
import Testimonials from '../components/public/Testimonials'
import CaseStudies from '../components/public/CaseStudies'
import BrandsSection from '../components/public/BrandsSection'
import Contact      from '../components/public/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <SocietyServicesSection />
      <ArchitectServicesSection />
      <RetailServicesSection />
      <Gallery />
      <Testimonials />
      <CaseStudies />
      <BrandsSection />
      <Contact />
    </>
  )
}
