import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { Outlet } from 'react-router-dom'
import { useAnalyticsTracker } from '../../hooks/useAnalytics'

export default function PublicLayout() {
  useAnalyticsTracker()

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
