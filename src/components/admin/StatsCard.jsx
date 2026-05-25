import LoadingSpinner from '../ui/LoadingSpinner'

export default function StatsCard({ icon: Icon, label, value, color = 'amber', loading }) {
  const colors = {
    amber: { bg: 'bg-[#faf8f5]', icon: 'text-pastelBrown-500', border: 'border-pastelBrown-500/10' },
    blue:  { bg: 'bg-[#f4f7f6]', icon: 'text-forest-800', border: 'border-forest-800/10'  },
    green: { bg: 'bg-[#eff5f3]', icon: 'text-forest-600', border: 'border-forest-600/10' },
    red:   { bg: 'bg-[#fdf5f2]', icon: 'text-burnt-500', border: 'border-burnt-500/10'   },
  }
  const c = colors[color] || colors.amber

  return (
    <div className={`admin-card !p-4 md:!p-5 border ${c.border} transition-all duration-300`}>
      <div className="space-y-1">
        <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-forest-800/40">
          {label}
        </p>
        {loading ? (
          <LoadingSpinner size="sm" className="mt-1" />
        ) : (
          <p className="text-3xl font-serif text-forest-800 tracking-tight">{value ?? '—'}</p>
        )}
      </div>
    </div>
  )
}
