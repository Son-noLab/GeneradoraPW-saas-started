'use client'

import { useEffect, useRef } from 'react'
import { TIMELINE } from './timeline-data'

export default function TimelineNew() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('.tln-item')
    if (!items?.length) return

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('tln-item--in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    items.forEach(item => obs.observe(item))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="tln-section">
      <div className="container">
        <div className="tln-inner">

          <div className="tln-left">
            <span className="label tln-label">Nuestro camino</span>
            <h2 className="tln-titulo">Una historia construida logro a logro</h2>
            <p className="tln-intro">
              Desde los primeros pasos hasta el presente — cada hito es la prueba
              de que los sueños se construyen con disciplina, comunidad y propósito.
            </p>
          </div>

          <div className="tln-list" ref={listRef}>
            {TIMELINE.map((entry, i) => (
              <div
                key={entry.id}
                className={`tln-item tln-item--${entry.granularity}`}
                style={{ '--delay': i * 60 } as React.CSSProperties}
              >
                <div className="tln-item__year">{entry.label}</div>
                <div className="tln-item__body">
                  <span className="tln-item__achievement">{entry.achievement}</span>
                  <h3 className="tln-item__headline">{entry.headline}</h3>
                  <p className="tln-item__desc">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
