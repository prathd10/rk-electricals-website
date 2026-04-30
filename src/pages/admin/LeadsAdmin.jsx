import { useState } from 'react'
import { Phone, MessageCircle, Trash2, ChevronDown, Inbox, Filter } from 'lucide-react'
import { useLeads, useUpdateLeadStatus, useDeleteLead } from '../../hooks/useLeads'
import ConfirmDialog  from '../../components/ui/ConfirmDialog'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const STATUSES = ['new', 'contacted', 'converted', 'closed']

const STATUS_STYLE = {
  new:       { badge: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500'   },
  contacted: { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500'  },
  converted: { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500'  },
  closed:    { badge: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400'   },
}

const WA_MSG = encodeURIComponent("Hi! This is R.K. Electricals. We received your enquiry. How can we help you?")

export default function LeadsAdmin() {
  const { data: leads = [], isLoading } = useLeads()
  const updateStatus = useUpdateLeadStatus()
  const deleteLead   = useDeleteLead()

  const [filter,   setFilter]   = useState('all')
  const [deleteId, setDeleteId] = useState(null)

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries / Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total · {counts.new || 0} new</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All ({leads.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === s ? `${STATUS_STYLE[s].badge} ring-2 ring-offset-1 ring-current` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {/* Leads list */}
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-card text-center py-16 text-gray-400">
          <Inbox size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No enquiries in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <div key={lead.id} className="admin-card border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-semibold text-gray-900">{lead.name}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[lead.status]?.badge || STATUS_STYLE.new.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[lead.status]?.dot || STATUS_STYLE.new.dot}`} />
                      {lead.status}
                    </span>
                    <span className="text-gray-400 text-xs ml-auto">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-gray-400" />
                      <a href={`tel:${lead.phone}`} className="hover:text-navy-900">{lead.phone}</a>
                    </span>
                    {lead.email && <span className="text-gray-500">{lead.email}</span>}
                    {lead.service_type && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{lead.service_type}</span>
                    )}
                  </div>

                  {lead.message && (
                    <p className="text-gray-500 text-sm bg-gray-50 rounded-lg p-2.5 mt-1">{lead.message}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <Phone size={13} />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#128C7E] text-xs font-medium rounded-lg hover:bg-[#25D366]/20 transition-colors"
                  >
                    <MessageCircle size={13} />
                    WhatsApp
                  </a>

                  {/* Status dropdown */}
                  <div className="relative group">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors w-full justify-between">
                      Status
                      <ChevronDown size={12} />
                    </button>
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-10 hidden group-hover:block">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus.mutateAsync({ id: lead.id, status: s })}
                          className={`w-full text-left px-3 py-1.5 text-xs capitalize hover:bg-gray-50 flex items-center gap-2 ${lead.status === s ? 'font-semibold text-navy-900' : 'text-gray-600'}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${STATUS_STYLE[s].dot}`} />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setDeleteId(lead.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteLead.mutateAsync(deleteId); setDeleteId(null) }}
        loading={deleteLead.isPending}
        title="Delete Lead"
        message="This enquiry will be permanently deleted."
      />
    </div>
  )
}
