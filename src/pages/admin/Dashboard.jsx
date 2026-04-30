import { Quote, Images, Inbox, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import StatsCard from '../../components/admin/StatsCard'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useProjects }     from '../../hooks/useProjects'
import { useLeads }        from '../../hooks/useLeads'

const STATUS_COLOR = {
  new:       'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
  closed:    'bg-gray-100 text-gray-600',
}

export default function Dashboard() {
  const { data: testimonials = [], isLoading: tLoading } = useTestimonials({ adminAll: true })
  const { data: projects     = [], isLoading: pLoading } = useProjects({ adminAll: true })
  const { data: leads        = [], isLoading: lLoading } = useLeads()

  const newLeads       = leads.filter((l) => l.status === 'new').length
  const recentLeads    = leads.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your website content and enquiries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Inbox}  label="Total Leads"        value={leads.length}        color="blue"  loading={lLoading} />
        <StatsCard icon={AlertCircle} label="New Enquiries"  value={newLeads}            color="red"   loading={lLoading} />
        <StatsCard icon={Quote}  label="Testimonials"        value={testimonials.length} color="amber" loading={tLoading} />
        <StatsCard icon={Images} label="Projects in Gallery" value={projects.length}     color="green" loading={pLoading} />
      </div>

      {/* Recent leads */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Clock size={18} className="text-gray-400" />
            Recent Enquiries
          </h2>
          <a href="/admin/leads" className="text-amber-600 text-sm font-medium hover:text-amber-700">
            View all →
          </a>
        </div>

        {lLoading ? (
          <div className="text-gray-400 text-sm">Loading…</div>
        ) : recentLeads.length === 0 ? (
          <div className="text-gray-400 text-sm py-4 text-center">No enquiries yet</div>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{lead.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{lead.phone} · {lead.service_type}</div>
                  {lead.message && (
                    <div className="text-gray-400 text-xs mt-1 truncate max-w-xs">{lead.message}</div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLOR[lead.status] || STATUS_COLOR.new}`}>
                    {lead.status}
                  </span>
                  <span className="text-gray-400 text-[11px]">
                    {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/testimonials', label: 'Add Testimonial',  icon: Quote,  desc: 'Add a new customer review'      },
          { href: '/admin/projects',     label: 'Add Project',      icon: Images, desc: 'Upload project photo or video'  },
          { href: '/admin/leads',        label: 'Manage Leads',     icon: Inbox,  desc: `${newLeads} new enquiries waiting` },
        ].map(({ href, label, icon: Icon, desc }) => (
          <a
            key={href}
            href={href}
            className="admin-card hover:border-amber-200 border border-gray-200 group transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                <Icon size={18} className="text-amber-500" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
