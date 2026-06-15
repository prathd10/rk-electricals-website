import WhatsAppIcon from '../ui/WhatsAppIcon'

const WA    = '919653634961'
const WA_MSG = encodeURIComponent("Hi! I found your website and need electrical work done.\n\n*Name:* \n*Phone:* ")

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3 group">
      {/* Tooltip bubble */}
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0
                      bg-charcoal-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl
                      flex items-center gap-2 pointer-events-none whitespace-nowrap">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Chat with us on WhatsApp
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${WA}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-15 h-15 flex items-center justify-center"
        style={{ width: 60, height: 60 }}
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" style={{ animationDelay: '0.6s' }} />

        {/* Main button */}
        <span className="relative w-full h-full rounded-full bg-[#25D366] flex items-center justify-center
                         shadow-xl shadow-[#25D366]/40 hover:scale-110 hover:shadow-2xl
                         transition-all duration-200 z-10">
          <WhatsAppIcon size={26} className="text-white fill-white" />
        </span>
      </a>
    </div>
  )
}
