import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/#gallery' },
  { name: 'Society AMC', href: '/amc' },
  { name: 'Architects', href: '/designers' },
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

  // White text on: homepage scrolled, all non-homepage pages (always solid tan bg)
  // Dark text on: homepage unscrolled (glass over hero)
  const isLightText = !isHomePage || isScrolled

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 pad 
                    ${isHomePage
                      ? isScrolled
                        ? 'bg-[#B2A08F] shadow-2xl py-4'
                        : 'bg-black/20 backdrop-blur-md border-b border-white/10'
                      : 'bg-[#B2A08F] shadow-md py-4'}`}
      >
        <div className="max-w-site mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-4 group">
            <img 
              src="/rkelectricals-logo-cropped.png" 
              alt="RK Electricals" 
              className={`h-6 md:h-8 w-auto object-contain translate-y-1 transition-all duration-500 ${isLightText ? 'brightness-0 invert opacity-90' : 'opacity-100'}`}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
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
            <a 
              href="https://wa.me/919920249933?text=I%20need%20immediate%20electrical%20service.%0A%0A*Name:*%20%0A*Phone:*%20"
              className="flex items-center justify-center bg-forest-900/60 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] hover:bg-forest-900/80 transition-colors shadow-lg hover:scale-105 duration-300"
            >
              Immediate Service
            </a>
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
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-forest-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transition-transform duration-500 p-8 flex flex-col overflow-y-auto
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Top: Close & Logo */}
          <div className="flex items-center justify-between mb-12">
            <img 
              src="/rkelectricals-logo-cropped.png" 
              alt="RK Electricals" 
              className="h-6 md:h-8 w-auto object-contain translate-y-1 brightness-0 invert opacity-90"
            />
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all duration-300"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between text-2xl font-serif text-white/70 hover:text-white transition-all duration-300"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 text-pastelBrown-400 transition-all duration-300 text-sm">→</span>
              </a>
            ))}
          </nav>

          {/* Contact Info (fills empty space) */}
          <div className="mt-auto pt-10 pb-8 space-y-4">
             <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Contact Us</div>
             <a href="tel:+919920249933" className="block text-white/80 hover:text-white text-sm font-sans transition-colors">+91 99202 49933</a>
             <a href="mailto:support.rkelectricals@gmail.com" className="block text-white/80 hover:text-white text-sm font-sans transition-colors">support.rkelectricals@gmail.com</a>
          </div>

          {/* Footer CTA of Drawer */}
          <div className="pt-6 border-t border-white/10">
            <a 
              href="https://wa.me/919920249933?text=I%20need%20immediate%20electrical%20service.%0A%0A*Name:*%20%0A*Phone:*%20"
              className="flex items-center justify-center w-full bg-white text-forest-900 text-center py-4 font-extrabold uppercase tracking-[0.2em] text-[10px] shadow-xl rounded-xl hover:bg-white/90 hover:scale-[1.02] transition-all duration-300"
            >
              Request Immediate Service
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
