import Hero         from '../components/public/Hero'
import Services     from '../components/public/Services'
import TrustSection from '../components/public/TrustSection'
import Testimonials from '../components/public/Testimonials'
import Gallery      from '../components/public/Gallery'
import Contact      from '../components/public/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <TrustSection />
      <Testimonials />
      <Gallery />
    </>
  )
}
