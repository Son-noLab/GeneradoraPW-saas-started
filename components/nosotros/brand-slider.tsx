'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link  from 'next/link'
import { MOMENTOS } from '@/lib/momentos'

export default function BrandSlider() {
  const trackRef    = useRef<HTMLDivElement>(null)
  const wrapRef     = useRef<HTMLDivElement>(null)
  const isDragging  = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const wrap  = wrapRef.current
    if (!track || !wrap) return

    let isDown     = false
    let startX     = 0
    let startScroll = 0
    let velX       = 0
    let prevX      = 0
    let prevT      = 0
    let rafId      = 0

    const glide = () => {
      if (Math.abs(velX) < 0.35) { velX = 0; return }
      track.scrollLeft += velX
      velX *= 0.93          // fricción — 0.93 = deslizamiento largo y suave
      rafId = requestAnimationFrame(glide)
    }

    const start = (x: number) => {
      isDown          = true
      isDragging.current = false
      startX          = x
      startScroll     = track.scrollLeft
      prevX           = x
      prevT           = performance.now()
      velX            = 0
      cancelAnimationFrame(rafId)
      wrap.classList.add('bsl--dragging')
    }

    const move = (x: number) => {
      if (!isDown) return
      if (Math.abs(x - startX) > 4) isDragging.current = true
      const now = performance.now()
      const dt  = Math.max(now - prevT, 1)
      velX  = (prevX - x) / dt * 16   // px/frame a 60fps
      prevX = x
      prevT = now
      track.scrollLeft = startScroll + (startX - x)
    }

    const end = () => {
      if (!isDown) return
      isDown = false
      wrap.classList.remove('bsl--dragging')
      rafId  = requestAnimationFrame(glide)
    }

    const onMouseDown  = (e: MouseEvent) => start(e.pageX)
    const onMouseMove  = (e: MouseEvent) => move(e.pageX)
    const onMouseUp    = () => end()
    const onTouchStart = (e: TouchEvent) => start(e.touches[0].clientX)
    const onTouchMove  = (e: TouchEvent) => move(e.touches[0].clientX)
    const onTouchEnd   = () => end()

    track.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove',  onTouchMove,  { passive: true })
    track.addEventListener('touchend',   onTouchEnd)

    return () => {
      track.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove',  onTouchMove)
      track.removeEventListener('touchend',   onTouchEnd)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="bsl-section" id="historia">

      <div className="container">
        <div className="bsl-header">
          <span className="label bsl-header__label">Nuestra historia</span>
          <h2 className="bsl-header__title">construida con amor</h2>
          <p className="bsl-header__hint" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M15 7l5 5-5 5"/></svg>
            Arrastra para explorar
          </p>
        </div>
      </div>

      <div className="bsl-wrap" ref={wrapRef}>
        <div className="bsl-track" ref={trackRef}>
          {MOMENTOS.map((m, i) => (
            <Link
              key={m.slug}
              href={`/nosotros/historia/${m.slug}`}
              className="bsl-card"
              draggable={false}
              onClick={(e) => { if (isDragging.current) e.preventDefault() }}
            >
              <div className="bsl-card__img">
                <Image
                  src={m.img}
                  alt={m.titulo}
                  fill
                  sizes="(max-width: 600px) 80vw, 340px"
                  style={{ objectFit: 'cover' }}
                  priority={i < 4}
                  draggable={false}
                />
              </div>
              <div className="bsl-card__body">
                <span className="bsl-card__fecha">{m.fecha}</span>
                <h3 className="bsl-card__titulo">{m.titulo}</h3>
                <p className="bsl-card__desc">{m.desc}</p>
              </div>
            </Link>
          ))}
          {/* padding derecho visual al final del track */}
          <div className="bsl-track__spacer" aria-hidden="true" />
        </div>
      </div>

    </section>
  )
}
