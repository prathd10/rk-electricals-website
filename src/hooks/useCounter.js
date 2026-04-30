import { useEffect, useRef, useState } from 'react'

export function useCounter(end, duration = 2200, shouldStart = false) {
  const [count, setCount] = useState(0)
  const startRef = useRef(null)
  const rafRef   = useRef(null)

  useEffect(() => {
    if (!shouldStart || end === 0) return

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts
      const elapsed  = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [end, duration, shouldStart])

  return count
}
