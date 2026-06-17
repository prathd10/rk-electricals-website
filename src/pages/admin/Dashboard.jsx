import { Quote, Images, Inbox, Clock, AlertCircle, Eye, Users, TrendingUp, Globe } from 'lucide-react'
import StatsCard from '../../components/admin/StatsCard'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useProjects }     from '../../hooks/useProjects'
import { useLeads }        from '../../hooks/useLeads'
import { useAnalytics }    from '../../hooks/useAnalytics'

const STATUS_STYLE = {
  new:       'bg-blue-50 text-blue-700 border-blue-100',
  contacted: 'bg-pastelBrown-50 text-pastelBrown-800 border-pastelBrown-200/50',
  converted: 'bg-forest-50 text-forest-800 border-forest-100',
  closed:    'bg-gray-50 text-gray-500 border-gray-200/50',
}

export default function Dashboard() {
  const { data: testimonials = [], isLoading: tLoading } = useTestimonials({ adminAll: true })
  const { data: projects     = [], isLoading: pLoading } = useProjects({ adminAll: true })
  const { data: leads        = [], isLoading: lLoading } = useLeads()
  const { data: analytics = { totalViews: 0, uniqueVisitors: 0, viewsByPath: [] }, isLoading: aLoading } = useAnalytics()

  const newLeads       = leads.filter((l) => l.status === 'new').length
  const recentLeads    = leads.slice(0, 5)

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-forest-800/5 pb-6 gap-4">
        <div>
          <h1 className="font-serif text-3xl text-forest-800 tracking-wide">Dashboard</h1>
          <p className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-widest mt-2">
            Overview of your website content and enquiries
          </p>
        </div>
        <div className="text-[11px] text-forest-800/60 font-sans font-bold bg-white border border-forest-800/5 px-4 py-2 rounded-xl shadow-sm self-start">
          System Status: <span className="text-forest-800">Online</span>
        </div>
      </div>

      {/* ================= STATS SECTION ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        <StatsCard icon={Inbox}  label="Total Leads"        value={leads.length}        color="blue"  loading={lLoading} />
        <StatsCard icon={AlertCircle} label="New Enquiries"  value={newLeads}            color="red"   loading={lLoading} />
        <StatsCard icon={Quote}  label="Testimonials"        value={testimonials.length} color="amber" loading={tLoading} />
        <StatsCard icon={Images} label="Projects in Gallery" value={projects.length}     color="green" loading={pLoading} />
        <StatsCard icon={Eye}    label="Total Views"        value={analytics.totalViews} color="blue"  loading={aLoading} />
        <StatsCard icon={Users}  label="Unique Visitors"     value={analytics.uniqueVisitors} color="green" loading={aLoading} />
      </div>

      {/* ================= RECENT ENQUIRIES & QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Recent Leads List */}
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-forest-800 flex items-center gap-3">
              <Clock size={18} className="text-forest-600" />
              Recent Enquiries
            </h2>
            <a 
              href="/admin/dashboard/leads"
              className="text-pastelBrown-500 text-xs font-bold uppercase tracking-widest hover:text-pastelBrown-600 transition-colors"
            >
              View all →
            </a>
          </div>

          {lLoading ? (
            <div className="text-forest-800/40 text-sm font-sans font-medium py-8 text-center animate-pulse">Loading enquiries...</div>
          ) : recentLeads.length === 0 ? (
            <div className="text-forest-800/40 text-sm font-sans font-medium py-12 text-center border border-dashed border-forest-800/10 rounded-xl">
              No enquiries received yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#faf8f5] border border-forest-800/5 hover:border-forest-800/10 transition-all duration-300 gap-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-sans font-bold text-forest-800 text-sm">{lead.name}</span>
                      <span className="text-forest-800/20 font-light text-xs">·</span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-forest-800/50 bg-white border border-forest-800/5 px-2 py-0.5 rounded-md">
                        {lead.service_type || 'General Inquiry'}
                      </span>
                    </div>
                    <div className="text-forest-800/60 text-xs font-sans font-medium">
                      {lead.phone} {lead.email && `· ${lead.email}`}
                    </div>
                    {lead.message && (
                      <div className="text-forest-800/50 text-xs font-serif italic mt-2 truncate max-w-lg">
                        "{lead.message}"
                      </div>
                    )}
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLE[lead.status] || STATUS_STYLE.new}`}>
                      {lead.status}
                    </span>
                    <span className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-wider">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Quick Action Links */}
        <div className="space-y-6">
          <div className="admin-card bg-forest-900 text-white border-none relative overflow-hidden">
            {/* Soft Ambient Light Glow Inside Card */}
            <div className="absolute top-[-40%] right-[-30%] w-44 h-44 bg-pastelBrown-500/20 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-serif text-lg tracking-wide mb-2 text-cream-50">Quick Actions</h3>
            <p className="text-forest-100/50 text-xs leading-relaxed mb-6 font-sans">
              Update and manage your website gallery, client testimonials, and response status pipelines.
            </p>

            <div className="space-y-4 relative z-10">
              {[
                { href: '/admin/dashboard/testimonials', label: 'Add Testimonial',  icon: Quote,  desc: 'Create customer reviews' },
                { href: '/admin/dashboard/projects',     label: 'Add Project',      icon: Images, desc: 'Upload gallery items'   },
                { href: '/admin/dashboard/leads',        label: 'Manage Leads',     icon: Inbox,  desc: `${newLeads} pending responses` },
              ].map(({ href, label, icon: Icon, desc }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-9 h-9 bg-pastelBrown-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-cream-50 text-xs tracking-wide">{label}</div>
                    <div className="text-forest-100/40 text-[10px] font-sans font-semibold mt-0.5">{desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Internal Security Badge */}
          <div className="admin-card text-center p-6 bg-[#faf8f5]">
            <p className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-forest-800/40">R.K. Electricals</p>
            <p className="text-[8px] font-sans font-bold uppercase tracking-[0.15em] text-forest-800/30 mt-1">Authorized Admin Node</p>
          </div>
        </div>

      </div>

      {/* ================= TRAFFIC & ANALYTICS SECTION ================= */}
      <div className="space-y-6 pt-4 border-t border-forest-800/5">
        <h2 className="font-serif text-2xl text-forest-800 tracking-wide flex items-center gap-3">
          <TrendingUp size={22} className="text-forest-600" />
          Website Traffic Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Middle: Popular Pages */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Popular Pages Card */}
            <div className="admin-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg text-forest-800 flex items-center gap-2.5">
                  <Globe size={18} className="text-forest-600" />
                  Most Visited Pages
                </h3>
              </div>
              
              {aLoading ? (
                <div className="text-forest-800/40 text-sm font-sans font-medium py-8 text-center animate-pulse">Loading views...</div>
              ) : analytics.viewsByPath.length === 0 ? (
                <div className="text-forest-800/40 text-sm font-sans font-medium py-8 text-center">No traffic logged yet.</div>
              ) : (
                <div className="space-y-4">
                  {analytics.viewsByPath.slice(0, 5).map((vp) => {
                    const percentage = analytics.totalViews > 0 ? Math.round((vp.count / analytics.totalViews) * 100) : 0
                    return (
                      <div key={vp.path} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-sans font-bold text-forest-800/70">
                          <span className="font-mono bg-[#FAF8F5] border border-forest-800/5 px-2 py-0.5 rounded-md text-[11px] text-forest-800">{vp.path}</span>
                          <span>{vp.count} views ({percentage}%)</span>
                        </div>
                        {/* Custom progress bar */}
                        <div className="w-full bg-[#FAF8F5] border border-forest-800/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-forest-600 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Right side: Security context or analytics summary */}
          <div className="admin-card bg-[#faf8f5] flex flex-col justify-between p-6">
            <div className="space-y-3">
              <h3 className="font-serif text-lg text-forest-800">Traffic Summary</h3>
              <p className="text-forest-800/60 text-xs leading-relaxed font-medium">
                Views and visitor counts are tracked using lightweight local session storage. This data helps monitor website engagement and response rates for marketing optimization.
              </p>
            </div>
            <div className="pt-6 border-t border-forest-800/5 mt-6 text-[10px] font-sans font-bold text-forest-800/40 uppercase tracking-widest">
              Realtime Tracking active
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
