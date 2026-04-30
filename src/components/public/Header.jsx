import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 pad 
                  ${isScrolled ? 'bg-[#B2A08F] shadow-2xl py-4' : 'bg-transparent'}`}
    >
      <div className="max-w-site mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-4 group">
          <span className={`font-serif text-2xl tracking-tight transition-colors duration-500 
                            ${isScrolled ? 'text-white' : 'text-forest-800'}`}>
            RK ELECTRICALS
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500
                        ${isScrolled ? 'text-white/80 hover:text-white' : 'text-forest-800/60 hover:text-forest-800'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className={`inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest text-[10px] 
                       border px-7 py-3.5 transition-all duration-500 
                       ${isScrolled 
                         ? 'border-white text-white hover:bg-white hover:text-[#B2A08F] shadow-lg shadow-black/10' 
                         : 'border-[#2D4A43] text-forest-800 hover:bg-forest-800 hover:text-white'}`}
          >
            Book Consultation
          </a>
        </div>

      </div>
    </header>
  )
}
