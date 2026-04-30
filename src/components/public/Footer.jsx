export default function Footer() {
  return (
    <footer className="bg-forest-900 text-cream-50 pt-32 pb-16 overflow-hidden">
      <div className="max-w-site pad grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
        
        {/* Brand */}
        <div className="space-y-10">
          <div className="flex flex-col">
            <span className="font-serif text-3xl tracking-tight">RK ELECTRICALS</span>
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mt-2">Design Led · Technically Sound</span>
          </div>
          <p className="opacity-40 text-sm leading-relaxed max-w-xs">
            Established 1994. Providing end-to-end electrical solutions and premium equipment in Borivali West.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-10">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Disciplines</h4>
          <ul className="space-y-6 text-sm">
            <li>Residential & Commercial</li>
            <li>Gadget & Appliance Repair</li>
            <li>Society Maintenance (AMC)</li>
            <li>In-House Equipment Shop</li>
          </ul>
        </div>

        {/* Contact Links */}
        <div className="space-y-10">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Quick Links</h4>
          <ul className="space-y-6 text-sm">
            <li><a href="#services" className="hover:text-burnt-400 transition-colors">Services</a></li>
            <li><a href="#gallery" className="hover:text-burnt-400 transition-colors">Portfolio</a></li>
            <li><a href="#testimonials" className="hover:text-burnt-400 transition-colors">Reviews</a></li>
            <li><a href="#contact" className="hover:text-burnt-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Borivali Studio</h4>
          <ul className="space-y-6 text-sm opacity-60">
            <li>
              Surya Kiran, Baburao Paranjape Marg,<br />
              Opp. Amazon, Borivali West,<br />
              Mumbai 400091
            </li>
            <li>022 2833 7226 (Landline)</li>
            <li>+91 87799 79519 (Mobile)</li>
          </ul>
        </div>

      </div>

      <div className="max-w-site pad pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] uppercase tracking-[0.2em] opacity-20">
        <p>© {new Date().getFullYear()} R.K. Electricals. All Rights Reserved.</p>
        <p>Curated by Antigravity</p>
      </div>
    </footer>
  )
}
