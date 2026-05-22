'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function StackPanel({
  label,
  sn,
  bg,
  image,
  imageAlt = '',
  children,
}: {
  label: string
  sn: number
  bg?: string
  image?: string
  imageAlt?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    let stuckAtY: number | null = null

    const check = () => {
      const rect = el.getBoundingClientRect()
      const stickyTop = parseFloat(getComputedStyle(el).top) || 0
      const isStuck = rect.top <= stickyTop + 1

      if (isStuck && stuckAtY === null) {
        stuckAtY = window.scrollY
      } else if (!isStuck) {
        stuckAtY = null
        setOpen(true) // unstack: reopen when scrolling back up
      }

      // collapse only after scrolling 1 full viewport past the sticky point
      if (stuckAtY !== null && window.scrollY >= stuckAtY + window.innerHeight) {
        setOpen(false)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div
      ref={panelRef}
      className={`stack-section stack-panel${open ? ' stack-panel--open' : ''}`}
      style={{ '--sn': sn, ...(bg ? { '--panel-bg': bg } : {}) } as React.CSSProperties}
    >
      <div className="stack-panel__inner">
        <button
          className="stack-panel__cejita"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span className="stack-panel__cejita-label">{label}</span>
          <svg
            className="stack-panel__cejita-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="16"
            height="16"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div className="stack-panel__body">
          <div className="stack-panel__body-inner">
            {image ? (
              <div className="stack-panel__2col">
                <div className="stack-panel__img-wrap">
                  <Image src={image} alt={imageAlt} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="stack-panel__content">
                  {children}
                </div>
              </div>
            ) : children}
          </div>
        </div>
      </div>
    </div>
  )
}
