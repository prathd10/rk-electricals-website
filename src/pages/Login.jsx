import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Login() {
  const { session, loading } = useAuth()
  const [step, setStep]                 = useState('credentials') // 'credentials' | 'otp'
  const [pendingToken, setPendingToken] = useState(null)
  const [pendingEmail, setPendingEmail] = useState('')
  const [showPass, setShowPass]         = useState(false)
  const [otp, setOtp]                   = useState(['', '', '', '', '', ''])
  const [otpLoading, setOtpLoading]     = useState(false)
  const [countdown, setCountdown]       = useState(300) // 5 min in seconds
  const otpRefs = useRef([])
  const timerRef = useRef(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    if (step === 'otp') {
      setCountdown(300)
      timerRef.current = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) { clearInterval(timerRef.current); return 0 }
          return c - 1
        })
      }, 1000)
      // Focus first OTP box
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }
    return () => clearInterval(timerRef.current)
  }, [step])

  if (loading) return null
  if (session) return <Navigate to="/admin/dashboard" replace />

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Step 1: Verify credentials → trigger OTP email
  const onCredentials = async ({ email, password }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-admin-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Login failed')
        return
      }
      setPendingToken(data.token)
      setPendingEmail(email)
      setStep('otp')
      toast.success('Code sent to your email')
    } catch {
      toast.error('Could not connect. Please try again.')
    }
  }

  // OTP digit input handling
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) otpRefs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      otpRefs.current[5]?.focus()
    }
  }

  // Step 2: Verify OTP → get real session tokens
  const onVerifyOtp = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { toast.error('Enter the 6-digit code'); return }
    if (countdown === 0) { toast.error('Code expired. Please log in again.'); return }

    setOtpLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-admin-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ token: pendingToken, otp: code }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Verification failed')
        if (res.status === 401 && data.error?.includes('log in again')) {
          setStep('credentials')
          setPendingToken(null)
          setOtp(['', '', '', '', '', ''])
        }
        return
      }

      // Set the real Supabase session — admin is now authenticated
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })
      if (sessionError) { toast.error('Session error. Please try again.'); return }

      toast.success('Welcome back, Admin!')
      // useAuth will pick up the new session and trigger the Navigate above
    } catch {
      toast.error('Could not connect. Please try again.')
    } finally {
      setOtpLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6 relative">

      {/* Brand */}
      <div className="flex flex-col items-center mb-10 select-none">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(45,74,67,0.05)] mb-4">
          <img src="/logo.png" alt="RK Electricals Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-serif text-2xl tracking-tight text-forest-800 uppercase">RK ELECTRICALS</span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-forest-800/40 font-bold mt-2">Design Led · Technically Sound</span>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(45,74,67,0.04)] border border-forest-800/5 p-10 md:p-12 w-full max-w-[460px]">

        {/* ── STEP 1: Credentials ── */}
        {step === 'credentials' && (
          <>
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl text-forest-800 tracking-wide">Admin Panel</h2>
              <p className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-[0.1em] mt-2">Sign in to manage your website</p>
            </div>

            <form onSubmit={handleSubmit(onCredentials)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-800 font-sans block pl-0.5">Email</label>
                <div className="relative rounded-xl bg-white border border-forest-800/10 focus-within:border-forest-600 focus-within:ring-1 focus-within:ring-forest-600/20 transition-all duration-300">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full bg-transparent text-forest-800 rounded-xl py-3.5 px-4 outline-none font-sans text-sm placeholder:text-forest-800/20"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                </div>
                {errors.email && <p className="text-burnt-500 text-xs mt-1 block pl-0.5 font-sans">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-800 font-sans block pl-0.5">Password</label>
                <div className="relative rounded-xl bg-white border border-forest-800/10 focus-within:border-forest-600 focus-within:ring-1 focus-within:ring-forest-600/20 transition-all duration-300">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="Password"
                    className="w-full bg-transparent text-forest-800 rounded-xl py-3.5 pl-4 pr-12 outline-none font-sans text-sm placeholder:text-forest-800/20"
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-800/30 hover:text-forest-800 transition-colors duration-300">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-burnt-500 text-xs mt-1 block pl-0.5 font-sans">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-forest-800 hover:bg-forest-900 active:scale-[0.98] text-white font-sans font-bold uppercase tracking-[0.25em] text-[11px] py-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-3 disabled:opacity-55 disabled:cursor-not-allowed mt-8"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Code...
                  </span>
                ) : 'Continue'}
              </button>
            </form>
          </>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 'otp' && (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-forest-50 text-forest-800 mb-5">
                <Mail size={22} />
              </div>
              <h2 className="font-serif text-2xl text-forest-800 tracking-wide">Check your email</h2>
              <p className="text-forest-800/50 text-sm font-sans mt-3 leading-relaxed">
                We sent a 6-digit code to<br />
                <span className="font-bold text-forest-800">{pendingEmail}</span>
              </p>
            </div>

            <form onSubmit={onVerifyOtp} className="space-y-8">
              {/* OTP digit boxes */}
              <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 text-center text-2xl font-bold font-sans text-forest-800 border-2 border-forest-800/15 rounded-xl outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15 transition-all duration-200 bg-cream-50"
                  />
                ))}
              </div>

              {/* Countdown */}
              <p className="text-center text-xs font-sans font-bold text-forest-800/40 uppercase tracking-widest">
                {countdown > 0 ? (
                  <>Code expires in <span className="text-forest-800">{formatCountdown(countdown)}</span></>
                ) : (
                  <span className="text-red-500">Code expired — please log in again</span>
                )}
              </p>

              <button
                type="submit"
                disabled={otpLoading || otp.join('').length < 6 || countdown === 0}
                className="w-full bg-forest-800 hover:bg-forest-900 active:scale-[0.98] text-white font-sans font-bold uppercase tracking-[0.25em] text-[11px] py-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-3 disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {otpLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : 'Verify & Sign In'}
              </button>

              <button
                type="button"
                onClick={() => { setStep('credentials'); setPendingToken(null); setOtp(['', '', '', '', '', '']) }}
                className="w-full flex items-center justify-center gap-2 text-forest-800/40 hover:text-forest-800 text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                <ArrowLeft size={12} /> Back to login
              </button>
            </form>
          </>
        )}
      </div>

      <div className="mt-8 select-none">
        <a href="/" className="inline-flex items-center gap-2 text-forest-800/40 hover:text-forest-800 text-xs font-bold uppercase tracking-widest transition-all duration-300">
          ← Back to website
        </a>
      </div>
    </div>
  )
}
