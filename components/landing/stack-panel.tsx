'use client'
import { useState } from 'react'

export default function StackPanel({
  label,
  sn,
  bg,
  defaultOpen = false,
  children,
}: {
  label: string
  sn: number
  bg?: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
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
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
