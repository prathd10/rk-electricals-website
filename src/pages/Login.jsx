import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Login() {
  const { session, loading } = useAuth()
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  if (loading) return null
  if (session)  return <Navigate to="/admin" replace />

  const onSubmit = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message === 'Invalid login credentials'
        ? 'Incorrect email or password'
        : error.message
      )
    } else {
      toast.success('Welcome back, Admin!')
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6 relative">
      
      {/* ================= OFFICIAL BRAND LOGO AREA ================= */}
      <div className="flex flex-col items-center mb-10 select-none">
        {/* Official Brand Lightning Bolt SVG from favicon.svg */}
        <div className="w-16 h-16 bg-[#faf8f5] border border-forest-100 text-forest-800 rounded-2xl flex items-center justify-center shadow-[0_4px_12px_rgba(45,74,67,0.05)] mb-4">
          <svg className="w-7 h-7 fill-current text-forest-800" viewBox="0 0 32 32">
            <path d="M18 4L10 18h8l-4 10 12-14h-8l4-10z" />
          </svg>
        </div>
        <span className="font-serif text-2xl tracking-tight text-forest-800 uppercase">
          RK ELECTRICALS
        </span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-forest-800/40 font-bold mt-2">
          Design Led · Technically Sound
        </span>
      </div>

      {/* ================= THE MAIN WHITE CARD ================= */}
      <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(45,74,67,0.04)] border border-forest-800/5 p-10 md:p-12 w-full max-w-[460px]">
        
        {/* Card Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl text-forest-800 tracking-wide">
            Admin Panel
          </h2>
          <p className="text-forest-800/40 text-[10px] font-sans font-bold uppercase tracking-[0.1em] mt-2">
            Sign in to manage your website
          </p>
        </div>

        {/* ================= FORM CONSOLE ================= */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Email Address */}
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

          {/* Password */}
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
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-800/30 hover:text-forest-800 transition-colors duration-300"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-burnt-500 text-xs mt-1 block pl-0.5 font-sans">{errors.password.message}</p>}
          </div>

          {/* Submit Button (Sign In) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-forest-800 hover:bg-forest-900 active:scale-[0.98] text-white font-sans font-bold uppercase tracking-[0.25em] text-[11px] py-4 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-3 disabled:opacity-55 disabled:cursor-not-allowed mt-8"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>

      {/* ================= BACK LINK ================= */}
      <div className="mt-8 select-none">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-forest-800/40 hover:text-forest-800 text-xs font-bold uppercase tracking-widest transition-all duration-300"
        >
          ← Back to website
        </a>
      </div>

    </div>
  )
}
