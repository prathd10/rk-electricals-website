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
            <li><a href="/#services" className="hover:text-pastelBrown-400 transition-colors">Services</a></li>
            <li><a href="/#gallery" className="hover:text-pastelBrown-400 transition-colors">Portfolio</a></li>
            <li><a href="/about" className="hover:text-pastelBrown-400 transition-colors">About Us</a></li>
            <li><a href="/amc" className="hover:text-pastelBrown-400 transition-colors">AMC Services</a></li>
            <li><a href="/designers" className="hover:text-pastelBrown-400 transition-colors">Interior Designers</a></li>
            <li><a href="/contact" className="hover:text-pastelBrown-400 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">
          <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-30">Borivali Studio</h4>
          <ul className="space-y-4 text-sm opacity-60">
            <li>
              Shop No. 3, Surya Kiran Society,<br />
              Jairaj Nagar, Baburao Paranjape Marg,<br />
              Borivali West, Mumbai 400091
            </li>
            <li>
              <span className="text-[9px] uppercase tracking-wider block opacity-40">Contact</span>
              <a href="tel:+919779979519" className="hover:text-pastelBrown-400 transition-colors font-bold">+91 97799 79519</a>
            </li>
            <li>
              <span className="text-[9px] uppercase tracking-wider block opacity-40">WhatsApp</span>
              <a href="https://wa.me/919920249933" target="_blank" rel="noopener noreferrer" className="hover:text-pastelBrown-400 transition-colors font-bold">+91 99202 49933</a>
            </li>
            <li>
              <span className="text-[9px] uppercase tracking-wider block opacity-40">Landline & Email</span>
              <span>022 2833 7226</span><br />
              <a href="mailto:support.rkelectricals@gmail.com" className="hover:text-pastelBrown-400 transition-colors font-semibold">support.rkelectricals@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-site pad pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 text-[10px] uppercase tracking-[0.2em] opacity-20">
        <p>© {new Date().getFullYear()} R.K. Electricals. All Rights Reserved.</p>
        <p>Website Developed by Synex AI</p>
      </div>
    </footer>
  )
}
