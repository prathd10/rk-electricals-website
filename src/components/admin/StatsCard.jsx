import LoadingSpinner from '../ui/LoadingSpinner'

export default function StatsCard({ icon: Icon, label, value, color = 'amber', loading }) {
  const colors = {
    amber: { bg: 'bg-amber-50', icon: 'text-amber-500', border: 'border-amber-100' },
    blue:  { bg: 'bg-blue-50',  icon: 'text-blue-500',  border: 'border-blue-100'  },
    green: { bg: 'bg-green-50', icon: 'text-green-500', border: 'border-green-100' },
    red:   { bg: 'bg-red-50',   icon: 'text-red-500',   border: 'border-red-100'   },
  }
  const c = colors[color]

  return (
    <div className={`admin-card border ${c.border}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          {loading ? (
            <LoadingSpinner size="sm" className="mt-2" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">{value ?? '—'}</p>
          )}
        </div>
        <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center`}>
          <Icon size={22} className={c.icon} />
        </div>
      </div>
    </div>
  )
}
