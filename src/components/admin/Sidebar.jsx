import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Quote, Images, Inbox,
  LogOut, Zap, ExternalLink, X
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const LINKS = [
  { to: '/admin/dashboard',              label: 'Dashboard',    icon: LayoutDashboard, end: true  },
  { to: '/admin/dashboard/testimonials', label: 'Testimonials', icon: Quote,           end: false },
  { to: '/admin/dashboard/projects',     label: 'Projects',     icon: Images,          end: false },
  { to: '/admin/dashboard/leads',        label: 'Leads',        icon: Inbox,           end: false },
]

export default function Sidebar({ onClose }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out')
  }

  return (
    <aside className="flex flex-col h-full bg-[#13221e] text-white w-64 border-r border-forest-800/10">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          {/* Official Brand Logo */}
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md">
            <img src="/logo.png" alt="RK Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-serif text-sm tracking-wide leading-tight">RK Admin</div>
            <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-0.5">R.K. Electricals</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-pastelBrown-500 text-white shadow-lg shadow-pastelBrown-500/20'
                  : 'text-forest-100/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-forest-100/40 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <ExternalLink size={16} />
          View Website
        </a>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-forest-100/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
