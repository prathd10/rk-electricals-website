import { Star } from 'lucide-react'

export default function StarRating({ rating = 5, size = 'sm' }) {
  const px = size === 'sm' ? 14 : 18
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={px}
          className={n <= rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  )
}
