'use client'

import { useEffect, useRef, useState } from 'react'

export function PowerCounter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [progress, setProgress] = useState(0) // 0 to 1
  const [currentMw, setCurrentMw] = useState(1425)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setProgress(1)
      setCurrentMw(4000)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const duration = 1500 // 1.5 seconds
          let startTime: number | null = null

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const rawProgress = Math.min(elapsed / duration, 1)

            // Smooth easeOutCubic curve
            const eased = 1 - Math.pow(1 - rawProgress, 3)
            setProgress(eased)

            // Calculate current MW: 1425 to 4000
            const mwVal = Math.round(1425 + eased * (4000 - 1425))
            setCurrentMw(mwVal)

            if (rawProgress < 1) {
              requestAnimationFrame(step)
            } else {
              setCurrentMw(4000)
              setProgress(1)
            }
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    const el = containerRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasAnimated])

  return (
    <div
      ref={containerRef}
      className="p-6 sm:p-8 bg-charcoal text-ivory rounded-2xl border-l-4 border-gold shadow-lg my-6"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6">
        {/* Left Column: Arrival Stat */}
        <div className="flex-1 text-center sm:text-left">
          <span className="block text-2xl sm:text-3xl font-playfair font-bold text-gold-light">
            1,425 MW
          </span>
          <span className="block text-xs font-ui uppercase tracking-wider text-ivory/70 mt-1">
            Power generation when he arrived (2000)
          </span>
        </div>

        {/* Center: Live Running Counter Value */}
        <div className="text-center px-4 py-2 bg-slate/40 rounded-xl border border-gold/30">
          <span className="font-ui text-[10px] uppercase tracking-widest text-gold block">
            Grid Output
          </span>
          <span className="text-xl sm:text-2xl font-playfair font-bold text-ivory">
            {currentMw.toLocaleString()}{currentMw >= 4000 ? '+ MW' : ' MW'}
          </span>
        </div>

        {/* Right Column: Departure Stat */}
        <div className="flex-1 text-center sm:text-right">
          <span className="block text-2xl sm:text-3xl font-playfair font-bold text-gold">
            4,000+ MW
          </span>
          <span className="block text-xs font-ui uppercase tracking-wider text-ivory/70 mt-1">
            Power generation when he left (2002)
          </span>
        </div>
      </div>

      {/* Progress Bar that fills left to right over 1.5 seconds */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
          role="progressbar"
          aria-valuenow={currentMw}
          aria-valuemin={1425}
          aria-valuemax={4000}
          aria-label="National power generation increase under Dr. Agagu"
        />
      </div>

      <p className="text-xs sm:text-sm text-ivory/80 pt-4 leading-relaxed font-body">
        National transmission and distribution infrastructure was reinforced throughout his tenure,
        laying the bedrock for Nigeria&apos;s Fourth Republic energy masterplan.
      </p>
    </div>
  )
}

