import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#gallery' },
  { name: 'Designers', href: '/designers' },
  { name: 'AMC Services', href: '/amc' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLightText = isScrolled || isHomePage

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 pad 
                    ${isScrolled ? 'bg-[#B2A08F] shadow-2xl py-4' : 'bg-transparent'}`}
      >
        <div className="max-w-site mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-4 group">
            <span className={`font-serif text-2xl tracking-tight transition-colors duration-500 ${isLightText ? 'text-white' : 'text-forest-800'}`}>
              RK ELECTRICALS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500
                ${isLightText ? 'text-white/80 hover:text-white' : 'text-forest-800/60 hover:text-forest-800'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={isLightText ? 'text-white' : 'text-forest-800'} size={24} />
            ) : (
              <Menu className={isLightText ? 'text-white' : 'text-forest-800'} size={24} />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-[#B2A08F] shadow-2xl transition-transform duration-500 p-6 flex flex-col overflow-y-auto
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Top: Close */}
          <div className="flex justify-end mb-6">
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link, i) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-serif text-white hover:text-forest-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Footer of Drawer */}
          <div className="mt-auto pt-6">
            <a 
              href="https://wa.me/919920249933"
              className="block w-full bg-white text-[#B2A08F] border-2 border-[#B2A08F] text-center py-3 font-bold uppercase tracking-widest text-[10px] shadow-xl"
            >
              Request Immediate Service
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
