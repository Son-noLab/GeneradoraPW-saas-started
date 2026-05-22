'use client'

import { useEffect, useRef } from 'react'

// Two perfectly straight horizontal lines
const LINE_THICK = 'M0,37 L1440,37'
const LINE_THIN  = 'M0,44 L1440,44'

export default function HeroTransition() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const wrap = wrapRef.current
    if (!hero || !wrap) return

    let prevRatio = 1 // hero starts fully visible

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        // Scrolling down: hero was fully visible, now it's not → first scroll out
        if (prevRatio >= 1 && ratio < 1) fire(wrap)
        // Scrolling up: hero was less than half, now at least half → returning
        if (prevRatio < 0.5 && ratio >= 0.5) fire(wrap)
        prevRatio = ratio
      },
      { threshold: [0, 0.5, 1.0] }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="htrans" aria-hidden="true">
      <svg className="htrans__svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path className="htrans__path htrans__path--thin"  d={LINE_THIN}  />
        <path className="htrans__path htrans__path--thick" d={LINE_THICK} />
      </svg>
    </div>
  )
}

function fire(wrap: HTMLDivElement) {
  wrap.classList.remove('htrans--on')
  // Force reflow so animation restarts cleanly
  void (wrap as HTMLElement & { offsetWidth: number }).offsetWidth
  wrap.classList.add('htrans--on')
  playChord()
}

function playChord() {
  try {
    const ctx = new AudioContext()
    // Soft C-major arpeggio: C4 → E4 → G4, staggered 70ms
    ;([[261.63, 0], [329.63, 0.07], [392.0, 0.14]] as [number, number][]).forEach(
      ([freq, delay]) => {
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        const t = ctx.currentTime + delay
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.065, t + 0.09)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85)
        osc.start(t)
        osc.stop(t + 0.85)
      },
    )
  } catch { /* AudioContext unavailable or blocked */ }
}
