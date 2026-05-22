'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const PHOTOS = [
  {
    img: '/img/nos-1.jpg', name: 'María José Andrade', role: 'Distribuidora Premium · Quito',
    quote: 'Encontré aquí una comunidad que realmente te impulsa a crecer cada día.',
  },
  {
    img: '/img/nos-2.jpg', name: 'Carlos Mejía', role: 'Distribuidor Master · Guayaquil',
    quote: 'El ambiente ordenado y feliz del territorio lo cambia todo. Somos equipo.',
  },
  {
    img: '/img/nos-3.jpg', name: 'Ana Lucía Torres', role: 'Distribuidora Premium · Cuenca',
    quote: 'La flexibilidad y los ingresos transformaron completamente mi calidad de vida.',
  },
  {
    img: '/img/nos-4.jpg', name: 'Diego Ramírez', role: 'Distribuidor Premier · Quito',
    quote: 'No solo crecí en ventas — crecí como persona. Eso no tiene precio.',
  },
  {
    img: '/img/nos-5.jpg', name: 'Valeria Suárez', role: 'Distribuidora · Guayaquil',
    quote: 'Desde el primer día tuve apoyo real. Nunca me sentí sola en el camino.',
  },
  {
    img: '/img/nos-6.jpg', name: 'Sebastián Mora', role: 'Distribuidor Premium · Cuenca',
    quote: 'Royal Prestige y CateonCook me dieron las herramientas para construir mi sueño.',
  },
  {
    img: '/img/nos-7.jpg', name: 'Lorena Castro', role: 'Distribuidora Master · Quito',
    quote: 'El plan de mercadeo es sólido, pero la cultura del territorio es lo que te mantiene.',
  },
]

export default function Testimonials() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const wrap  = wrapRef.current
    if (!track || !wrap) return

    let wheelTarget  = 0
    let wheelCurrent = 0
    let wheelRaf     = 0

    const lerpScroll = () => {
      const diff = wheelTarget - wheelCurrent
      if (Math.abs(diff) < 0.5) {
        wheelCurrent   = wheelTarget
        track.scrollLeft = wheelTarget
        return
      }
      wheelCurrent += diff * 0.11
      track.scrollLeft = wheelCurrent
      wheelRaf = requestAnimationFrame(lerpScroll)
    }

    const onWheel = (e: WheelEvent) => {
      const max  = track.scrollWidth - track.clientWidth
      const next = Math.max(0, Math.min(max, wheelTarget + e.deltaY * 1.4))
      if (next === wheelTarget) return
      e.preventDefault()
      wheelTarget = next
      cancelAnimationFrame(wheelRaf)
      wheelRaf = requestAnimationFrame(lerpScroll)
    }

    let isDown = false, startX = 0, startScroll = 0, velX = 0, prevX = 0, prevT = 0, dragRaf = 0

    const glide = () => {
      if (Math.abs(velX) < 0.35) { velX = 0; return }
      const next = Math.max(0, Math.min(track.scrollWidth - track.clientWidth, track.scrollLeft + velX))
      track.scrollLeft = next
      wheelTarget = next
      wheelCurrent = next
      velX *= 0.92
      dragRaf = requestAnimationFrame(glide)
    }

    const dragStart = (x: number) => {
      isDown = true; isDragging.current = false
      startX = x; startScroll = track.scrollLeft
      prevX = x; prevT = performance.now(); velX = 0
      cancelAnimationFrame(dragRaf); cancelAnimationFrame(wheelRaf)
    }
    const dragMove = (x: number) => {
      if (!isDown) return
      if (Math.abs(x - startX) > 4) isDragging.current = true
      const now = performance.now()
      velX = (prevX - x) / Math.max(now - prevT, 1) * 16
      prevX = x; prevT = now
      const next = Math.max(0, Math.min(track.scrollWidth - track.clientWidth, startScroll + (startX - x)))
      track.scrollLeft = next; wheelTarget = next; wheelCurrent = next
    }
    const dragEnd = () => { if (!isDown) return; isDown = false; dragRaf = requestAnimationFrame(glide) }

    wrap.addEventListener('wheel',      onWheel,     { passive: false })
    wrap.addEventListener('mousedown',  (e) => dragStart(e.pageX))
    wrap.addEventListener('mousemove',  (e) => dragMove(e.pageX))
    window.addEventListener('mouseup',  dragEnd)
    track.addEventListener('touchstart', (e) => dragStart(e.touches[0].clientX), { passive: true })
    track.addEventListener('touchmove',  (e) => dragMove(e.touches[0].clientX),  { passive: true })
    track.addEventListener('touchend',   dragEnd)

    return () => {
      wrap.removeEventListener('wheel',     onWheel)
      window.removeEventListener('mouseup', dragEnd)
      cancelAnimationFrame(wheelRaf)
      cancelAnimationFrame(dragRaf)
    }
  }, [])

  return (
    <section className="tst-section">
      <div className="container">
        <div className="tst-header">
          <span className="label tst-header__label">Testimonios</span>
          <h2 className="tst-header__title">Lo que dice nuestra comunidad</h2>
          <p className="tst-header__hint" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M15 7l5 5-5 5"/></svg>
            Desliza para ver
          </p>
        </div>
      </div>

      <div className="tst-wrap" ref={wrapRef}>
        <div className="tst-track" ref={trackRef}>
          {PHOTOS.map((p, i) => (
            <div key={i} className="tst-card" draggable={false}>
              <div className="tst-card__img">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 70vw, 280px"
                  style={{ objectFit: 'cover', pointerEvents: 'none' }}
                  draggable={false}
                />
              </div>
              <div className="tst-card__caption">
                <p className="tst-card__quote">{p.quote}</p>
                <p className="tst-card__name">{p.name}</p>
                <p className="tst-card__role">{p.role}</p>
              </div>
            </div>
          ))}
          <div style={{ flexShrink: 0, width: 'var(--pad-x)' }} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
