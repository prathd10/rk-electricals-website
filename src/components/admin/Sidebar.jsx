import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Quote, Images, Inbox,
  LogOut, Zap, ExternalLink, X
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const LINKS = [
  { to: '/admin',              label: 'Dashboard',    icon: LayoutDashboard, end: true  },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote,           end: false },
  { to: '/admin/projects',     label: 'Projects',     icon: Images,          end: false },
  { to: '/admin/leads',        label: 'Leads',        icon: Inbox,           end: false },
]

export default function Sidebar({ onClose }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out')
  }

  return (
    <aside className="flex flex-col h-full bg-navy-900 text-white w-64">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">RK Admin</div>
            <div className="text-white/40 text-[10px]">R.K. Electricals</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-white/60">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ExternalLink size={16} />
          View Website
        </a>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
