'use client'

import { useEffect, useRef } from 'react'

// Sine wave path across 1440px viewport width, amplitude ±22px centered at 40px
const WAVE_MAIN =
  'M0,40 C50,10 100,70 150,40 C200,10 250,70 300,40 ' +
  'C350,10 400,70 450,40 C500,10 550,70 600,40 ' +
  'C650,10 700,70 750,40 C800,10 850,70 900,40 ' +
  'C950,10 1000,70 1050,40 C1100,10 1150,70 1200,40 ' +
  'C1250,10 1300,70 1350,40 C1400,10 1440,40 1440,40'

// Wider, shallower ghost wave offset slightly
const WAVE_GHOST =
  'M0,40 C72,18 144,62 216,40 C288,18 360,62 432,40 ' +
  'C504,18 576,62 648,40 C720,18 792,62 864,40 ' +
  'C936,18 1008,62 1080,40 C1152,18 1224,62 1296,40 ' +
  'C1368,18 1440,40 1440,40'

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
        <path className="htrans__path htrans__path--ghost" d={WAVE_GHOST} />
        <path className="htrans__path htrans__path--main"  d={WAVE_MAIN}  />
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
