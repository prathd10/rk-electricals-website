import { useState } from 'react'
import { Phone, Trash2, ChevronDown, Inbox, Mail, Calendar } from 'lucide-react'
import WhatsAppIcon from '../../components/ui/WhatsAppIcon'
import { useLeads, useUpdateLeadStatus, useDeleteLead } from '../../hooks/useLeads'
import ConfirmDialog  from '../../components/ui/ConfirmDialog'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const STATUSES = ['new', 'contacted', 'converted', 'closed']

const STATUS_STYLE = {
  new:       { badge: 'bg-blue-50 text-blue-700 border-blue-100/50',   dot: 'bg-blue-500'   },
  contacted: { badge: 'bg-[#faf8f5] text-pastelBrown-600 border-pastelBrown-300/30', dot: 'bg-pastelBrown-500'  },
  converted: { badge: 'bg-forest-50 text-forest-800 border-forest-100', dot: 'bg-forest-800'  },
  closed:    { badge: 'bg-gray-50 text-gray-500 border-gray-200/50',   dot: 'bg-gray-400'   },
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

  // Smart Parser for multi-field messages (e.g. Designer or AMC inquiries)
  const renderMessageBody = (msg) => {
    if (!msg) return null;

    const keywords = [
      'Project Studio',
      'Project Scope',
      'Message',
      'Company/Society',
      'Property Type',
      'Scope'
    ];

    // Check if the message matches our custom structured format
    const hasKeywords = keywords.some(k => msg.includes(k + ':'));

    if (hasKeywords) {
      const regex = new RegExp(`(${keywords.join('|')}):`, 'gi');
      const parts = msg.split(regex);
      
      const items = [];
      for (let i = 1; i < parts.length; i += 2) {
        const label = parts[i].trim();
        const value = parts[i + 1]?.trim() || '';
        if (label && value) {
          items.push({ label, value });
        }
      }

      if (items.length > 0) {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#FAF8F5] border border-forest-800/5 border-l-4 border-l-pastelBrown-500 rounded-xl p-5 mt-3 shadow-inner">
            {items.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-forest-800/40 block">
                  {item.label}
                </span>
                <p className="text-xs font-sans font-semibold text-forest-800 leading-relaxed whitespace-pre-wrap">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        );
      }
    }

    // Fallback standard message display
    return (
      <div className="bg-[#FAF8F5] border border-forest-800/5 border-l-4 border-l-forest-800 rounded-xl p-5 mt-3">
        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-forest-800/40 block mb-1">Message</span>
        <p className="text-sm font-serif italic text-forest-800/80 leading-relaxed whitespace-pre-wrap">
          "{msg}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-forest-800/5 pb-6 gap-4">
        <div>
          <h1 className="font-serif text-3xl text-forest-800 tracking-wide">Enquiries / Leads</h1>
          <p className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-widest mt-2">
            {leads.length} total lead submissions · {counts.new || 0} unanswered
          </p>
        </div>
      </div>

      {/* ================= STATUS FILTERS ================= */}
      <div className="flex flex-wrap gap-2 select-none bg-white p-2 rounded-2xl border border-forest-800/5 shadow-sm inline-flex">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            filter === 'all' 
              ? 'bg-forest-800 text-white shadow-md shadow-forest-800/10' 
              : 'text-forest-800/60 hover:text-forest-800 hover:bg-[#FAF8F5]'
          }`}
        >
          All ({leads.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              filter === s 
                ? 'bg-pastelBrown-500 text-white shadow-md shadow-pastelBrown-500/10' 
                : 'text-forest-800/60 hover:text-forest-800 hover:bg-[#FAF8F5]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filter === s ? 'bg-white' : STATUS_STYLE[s].dot}`} />
            {s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {/* ================= LEADS LIST ================= */}
      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-card text-center py-20 text-forest-800/40 border border-dashed border-forest-800/10">
          <Inbox size={40} className="mx-auto mb-4 opacity-30 text-forest-600" />
          <p className="font-sans font-bold uppercase tracking-widest text-[11px]">No enquiries in this category</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((lead) => (
            <div key={lead.id} className="admin-card hover:border-forest-800/20 shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8">
              <div className="space-y-4">
                
                {/* 1. Header Row (Name, Statuses, Date) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-800/5 pb-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-sans font-extrabold text-forest-800 text-base tracking-wide">
                      {lead.name}
                    </span>
                    <span className="text-forest-800/20 font-light hidden sm:inline">·</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLE[lead.status]?.badge || STATUS_STYLE.new.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[lead.status]?.dot || STATUS_STYLE.new.dot}`} />
                      {lead.status}
                    </span>
                    {lead.service_type && (
                      <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-forest-800/40 bg-[#FAF8F5] border border-forest-800/5 px-2.5 py-1 rounded-lg">
                        {lead.service_type}
                      </span>
                    )}
                  </div>
                  
                  {/* Date Badge */}
                  <span className="text-forest-800/40 text-[10px] font-sans font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar size={12} className="text-forest-800/30" />
                    {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* 2. Contact Details Row (Phone & Email) */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-sans font-bold text-forest-800/50 pl-0.5">
                  <span className="flex items-center gap-2 hover:text-forest-800 transition-colors duration-300">
                    <Phone size={13} className="text-forest-600/70" />
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  </span>
                  {lead.email && (
                    <span className="flex items-center gap-2 hover:text-forest-800 transition-colors duration-300">
                      <Mail size={13} className="text-forest-600/70" />
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </span>
                  )}
                </div>

                {/* 3. Structured Message Render Area */}
                {lead.message && renderMessageBody(lead.message)}

                {/* 4. Horizontal Grid Action Panel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-forest-800/5 mt-5">
                  
                  {/* Phone CTA */}
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#FAF8F5] border border-forest-800/10 hover:border-forest-800/20 hover:bg-[#FAF8F5]/50 text-forest-800 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98]"
                  >
                    <Phone size={12} className="text-forest-600" />
                    Call
                  </a>
                  
                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#25D366]/5 border border-[#25D366]/10 hover:bg-[#25D366]/10 text-[#128C7E] text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98]"
                  >
                    <WhatsAppIcon size={12} />
                    WhatsApp
                  </a>

                  {/* Status Change Selector Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#FAF8F5] border border-forest-800/10 text-forest-800 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:border-forest-800/30 transition-all duration-300 w-full shadow-sm">
                      Status
                      <ChevronDown size={12} className="text-forest-600/70" />
                    </button>
                    <div className="absolute left-0 bottom-full sm:bottom-auto sm:top-full mt-1 w-full bg-white border border-forest-800/10 rounded-2xl shadow-xl py-2 z-20 hidden group-hover:block transition-all animate-fade-in">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus.mutateAsync({ id: lead.id, status: s })}
                          className={`w-full text-left px-4 py-2.5 text-[10px] uppercase font-bold tracking-wider hover:bg-[#FAF8F5] flex items-center gap-2.5 transition-colors ${lead.status === s ? 'text-forest-800 bg-[#FAF8F5]/60 font-black' : 'text-forest-800/50'}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[s].dot}`} />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delete Action Trigger */}
                  <button
                    onClick={() => setDeleteId(lead.id)}
                    className="flex items-center justify-center gap-2.5 px-4 py-3 bg-red-50 border border-red-100 hover:bg-red-100/70 hover:border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98]"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation popup modal */}
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
