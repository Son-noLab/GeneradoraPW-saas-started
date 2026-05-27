'use client'

import { useEffect, useRef } from 'react'

interface Props {
  direction: 'dark-to-cream' | 'cream-to-dark'
  targetSelector?: string
}

export default function SectionDivider({ direction, targetSelector }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { el.classList.add('is-on'); obs.disconnect() }
        })
      },
      { threshold: 0.3 }
    )
    const target = targetSelector ? document.querySelector(targetSelector) ?? el : el
    obs.observe(target as Element)
    return () => obs.disconnect()
  }, [targetSelector])

  return (
    <div ref={ref} className={`sdiv sdiv--${direction}`}>
      <svg className="sdiv__svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        {/* Fills follow the exact wave curve — no linear gradient mismatch */}
        <path className="sdiv__fill sdiv__fill--top"    d="M0,40 Q360,10 720,40 Q1080,70 1440,40 L1440,0 L0,0 Z" />
        <path className="sdiv__fill sdiv__fill--bottom" d="M0,40 Q360,10 720,40 Q1080,70 1440,40 L1440,80 L0,80 Z" />
        <path className="sdiv__path sdiv__path--thin"   d="M0,40 Q360,10 720,40 Q1080,70 1440,40" />
        <path className="sdiv__path sdiv__path--thick"  d="M0,40 Q360,10 720,40 Q1080,70 1440,40" />
      </svg>
    </div>
  )
}
