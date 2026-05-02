import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
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
