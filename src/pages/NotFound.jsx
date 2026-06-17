import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center p-6 text-center">
      <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-forest-600 mb-4">404</span>
      <h1 className="font-serif text-5xl text-forest-800 mb-4">Page not found.</h1>
      <p className="text-forest-800/60 mb-10 max-w-sm text-sm leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-outline">Back to Home</Link>
    </div>
  )
}
