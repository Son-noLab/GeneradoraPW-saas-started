'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export type VaulkCard = {
  icon?:   ReactNode
  nombre?: string
  titulo:  string
  desc:    string
}

type Props = {
  label:  string
  titulo: string
  intro?: string
  cards:  VaulkCard[]
  dark?:  boolean
  cols?:  2 | 3
}

export default function VaulkSection({ label, titulo, intro, cards, dark, cols = 2 }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cells = gridRef.current?.querySelectorAll<HTMLElement>('.vlk-cell')
    if (!cells?.length) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('vlk-cell--in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    cells.forEach(cell => obs.observe(cell))
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`vlk-section${dark ? ' vlk-section--dark' : ''}`}>
      <div className="container">
        <div className="vlk-inner">

          <div className="vlk-left">
            <span className="label vlk-label">{label}</span>
            <h2 className="vlk-titulo">{titulo}</h2>
            {intro && <p className="vlk-intro">{intro}</p>}
          </div>

          <div
            ref={gridRef}
            className={`vlk-grid${cols === 3 ? ' vlk-grid--3' : ''}`}
          >
            {cards.map((c, i) => (
              <div
                key={i}
                className="vlk-cell"
                style={{ '--delay': i * 90 } as React.CSSProperties}
              >
                {c.icon && <div className="vlk-cell__icon">{c.icon}</div>}
                {c.nombre && <span className="vlk-cell__nombre">{c.nombre}</span>}
                <h3 className="vlk-cell__titulo">{c.titulo}</h3>
                <p className="vlk-cell__desc">{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
