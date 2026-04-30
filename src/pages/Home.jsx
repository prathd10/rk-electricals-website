import Header       from '../components/public/Header'
import Hero         from '../components/public/Hero'
import Services     from '../components/public/Services'
import TrustSection from '../components/public/TrustSection'
import Testimonials from '../components/public/Testimonials'
import Gallery      from '../components/public/Gallery'
import Contact      from '../components/public/Contact'
import Footer       from '../components/public/Footer'
import WhatsAppButton from '../components/public/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <TrustSection />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
