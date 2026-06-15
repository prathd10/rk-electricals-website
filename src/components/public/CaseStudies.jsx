import { useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useInView'
import { Activity, Zap, TrendingDown } from 'lucide-react'

export default function CaseStudies() {
  const ref = useReveal()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  
  // Swipe state
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const studies = [
    {
      client: "Surya Kiran Society",
      location: "Borivali West",
      problem: "Aging 25-year-old building wiring, frequent pump room control failures, and high maintenance costs for common areas.",
      solution: "Upgraded main distribution panels, installed synchronized pump control panels, and replaced outdated common wiring with modern fire-retardant (FRLS) cables.",
      result: "Zero breakdowns in the pump room, fully compliant with modern safety audits, and significantly reduced AMC callouts."
    },
    {
      client: "Gokuldham CHS",
      location: "Borivali East",
      problem: "Frequent staircase light failures, high electricity bills, and outdated, unsafe MCB panels in the meter room.",
      solution: "Complete building rewiring, upgrade to modern L&T MCBs, and a full LED lighting retrofit across all 12 floors and common areas.",
      result: "40% reduction in monthly electricity consumption and zero breakdown calls in the past 18 months."
    },
    {
      client: "Vasant Marvel Society",
      location: "Kandivali",
      problem: "No provision for Electric Vehicles (EVs), leading to residents creating haphazard and unsafe temporary wiring in the parking area.",
      solution: "Designed and installed a centralized EV charging electrical infrastructure with dedicated load management and individual metering.",
      result: "Safe, reliable charging for 15+ EVs simultaneously without tripping or overloading the main society grid."
    }
  ]

  // Clone the first study and append it to the end for the smooth infinite loop illusion
  const extendedStudies = [...studies, studies[0]]

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setActiveIndex((current) => current + 1)
    }, 6000)
    return () => clearInterval(timer)
  }, [isHovered])

  // Reset to real first slide after the clone slide transition completes.
  // Uses setTimeout instead of onTransitionEnd — transitionend is unreliable
  // when the element is off-screen, causing activeIndex to grow unboundedly.
  useEffect(() => {
    if (activeIndex < studies.length) return
    const id = setTimeout(() => {
      setIsTransitioning(false)
      setActiveIndex(0)
    }, 720) // slightly longer than the 700ms transition
    return () => clearTimeout(id)
  }, [activeIndex])

  const handleDotClick = (i) => {
    setIsTransitioning(true)
    setActiveIndex(i)
  }

  // --- SWIPE LOGIC ---
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches ? e.targetTouches[0].clientX : e.clientX)
  }

  const handleTouchMove = (e) => {
    if (touchStart === null) return
    setTouchEnd(e.targetTouches ? e.targetTouches[0].clientX : e.clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      // swipe left (next)
      setIsTransitioning(true)
      setActiveIndex(prev => prev + 1)
    }
    if (isRightSwipe) {
      // swipe right (prev)
      if (activeIndex === 0) {
        // Smooth backward from index 0: jump to clone (end) without transition, then slide to last item
        setIsTransitioning(false)
        setActiveIndex(studies.length)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
            setActiveIndex(studies.length - 1)
          })
        })
      } else {
        setIsTransitioning(true)
        setActiveIndex(prev => prev - 1)
      }
    }
    
    // reset
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section className="py-24 bg-pastelBrown-100" ref={ref}>
      <div className="max-w-site pad">
        
        <div className="text-center mb-16">
          <span className="text-forest-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] reveal d-0">Proven Results</span>
          <h2 className="h2 mt-4 text-forest-800 reveal d-100">
            Real problems, <br />
            <span className="italic font-normal text-forest-600">real solutions.</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          
          {/* Carousel Container */}
          <div 
            className="overflow-hidden relative rounded-3xl shadow-xl border border-forest-100/50 bg-white cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              setTouchStart(null) // cancel swipe if mouse leaves
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
          >
            <div
              className={`flex ease-in-out ${isTransitioning ? 'transition-transform duration-700' : ''}`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {extendedStudies.map((study, i) => (
                <div key={i} className="w-full shrink-0 select-none">
                  <div className="flex flex-col lg:grid lg:grid-cols-5">
                    
                    {/* Visual / Title Side */}
                    <div className="lg:col-span-2 bg-forest-900 text-white px-4 py-4 md:p-10 lg:p-12 flex flex-row lg:flex-col items-center lg:items-start lg:justify-center gap-3 relative overflow-hidden pointer-events-none">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-pastelBrown-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      
                      <div className="relative z-10">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-pastelBrown-400 mb-1 block">
                          Case Study {(i % studies.length) + 1}
                        </span>
                        <h3 className="font-serif text-lg lg:text-3xl mb-0.5 leading-tight">{study.client}</h3>
                        <p className="text-white/60 font-sans text-xs">{study.location}</p>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-3 px-4 py-4 md:p-10 lg:p-12 space-y-3 lg:space-y-8 bg-cream-50 flex flex-col justify-center pointer-events-none">
                      
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Activity size={13} className="text-forest-600" />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest text-forest-800">The Problem</h4>
                        </div>
                        <p className="text-forest-800/70 leading-relaxed font-sans text-xs">{study.problem}</p>
                      </div>

                      <div className="w-full h-[1px] bg-forest-800/10"></div>

                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Zap size={13} className="text-forest-600" />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest text-forest-800">Our Solution</h4>
                        </div>
                        <p className="text-forest-800/70 leading-relaxed font-sans text-xs">{study.solution}</p>
                      </div>

                      <div className="w-full h-[1px] bg-forest-800/10"></div>

                      <div className="bg-pastelBrown-50 border border-pastelBrown-200 p-3 lg:p-6 rounded-xl">
                        <div className="flex items-center gap-1.5 mb-1">
                          <TrendingDown size={14} className="text-pastelBrown-600" />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest text-forest-900">The Result</h4>
                        </div>
                        <p className="text-forest-900 font-serif text-sm lg:text-lg leading-snug">{study.result}</p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation (only showing original amount) */}
          <div className="flex justify-center gap-3 mt-8">
            {studies.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (activeIndex % studies.length) === i ? 'bg-forest-800 scale-125' : 'bg-forest-800/20 hover:bg-forest-800/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
