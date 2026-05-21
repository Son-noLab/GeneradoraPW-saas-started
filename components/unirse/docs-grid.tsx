'use client'

import { useEffect, useRef } from 'react'

const DOCS = [
  {
    titulo: 'Hoja de vida actualizada',
    desc: 'Con experiencia laboral y cualquier certificación relevante.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    titulo: 'Cédula de identidad',
    desc: 'Copia de tu documento de identidad vigente.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
        <circle cx="7" cy="15" r="2"/>
        <path d="M12 13h6M12 17h6"/>
      </svg>
    ),
  },
  {
    titulo: 'Referencias laborales',
    desc: 'Al menos 2 referencias verificables de empleos anteriores.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    titulo: 'RUC activo',
    desc: 'Indispensable para emitir facturas y recibir comisiones. Si no lo tienes aún, puedes tramitarlo en paralelo.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
]

export default function DocsGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.unirse-doc')
    if (!cards?.length) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('unirse-doc--in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    cards.forEach(card => obs.observe(card))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="unirse-docs__grid" ref={gridRef}>
      {DOCS.map((d, i) => (
        <div
          key={d.titulo}
          className="unirse-doc"
          style={{ '--delay': i * 100 } as React.CSSProperties}
        >
          <div className="unirse-doc__icon">{d.icon}</div>
          <h4 className="unirse-doc__titulo">{d.titulo}</h4>
          <p className="unirse-doc__desc">{d.desc}</p>
        </div>
      ))}
    </div>
  )
}
