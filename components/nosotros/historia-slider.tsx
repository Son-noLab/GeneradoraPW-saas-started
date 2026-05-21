'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link  from 'next/link'

const HITOS = [
  {
    year: '2025',
    achievement: 'Más de 80 distribuidores reconocidos',
    headline: 'Premiación CateonCook 2025',
    desc: 'Nuestra gala anual donde se celebra a quienes más crecieron — no solo en ventas, sino en carácter, liderazgo y transformación personal.',
    img: '/img/nos-1.jpg',
    slug: 'premiacion-cateoncook-2025',
  },
  {
    year: '2024',
    achievement: 'Mejor año en toda la historia del Territorio',
    headline: 'El mejor año del Territorio',
    desc: '2024 fue el año en que todo lo que el Territorio había construido comenzó a multiplicarse de maneras que ni los más optimistas habían proyectado.',
    img: '/img/nos-2.jpg',
    slug: 'el-mejor-ano-del-territorio',
  },
  {
    year: '2024',
    achievement: '1er lugar nacional Royal Prestige',
    headline: 'Territorio del Año',
    desc: 'El reconocimiento más importante de Royal Prestige Ecuador. Resultado de un año donde cada miembro decidió dar más de lo que se esperaba.',
    img: '/img/nos-3.jpg',
    slug: 'territorio-del-ano-2024',
  },
  {
    year: '2023',
    achievement: 'Top 3% de territorios Royal Prestige',
    headline: 'Royal Prestige Top Team',
    desc: 'Una distinción que no cualquier equipo logra. Ser Top Team significa haber superado los estándares más exigentes del plan de mercadeo en todas las categorías.',
    img: '/img/nos-4.jpg',
    slug: 'royal-prestige-top-team',
  },
  {
    year: '2023',
    achievement: '100 socios activos en simultáneo',
    headline: '100 distribuidores activos',
    desc: 'Cien socios activos: cien historias distintas unidas por la misma cultura. Una prueba de que el modelo no solo funciona — inspira y multiplica.',
    img: '/img/nos-5.jpg',
    slug: '100-distribuidores-activos',
  },
  {
    year: '2022',
    achievement: 'Primera presencia nacional del Territorio',
    headline: 'Primera Convención Nacional',
    desc: 'El día en que el Territorio salió a conocer el país y el país conoció al Territorio. Una convención que redefinió lo que significa pertenecer a CateonCook.',
    img: '/img/nos-6.jpg',
    slug: 'primera-convencion-nacional',
  },
  {
    year: '2022',
    achievement: 'Primer viaje internacional del Territorio',
    headline: 'Primer viaje de incentivo',
    desc: 'El primer vuelo, el primer hotel, los primeros aplausos en tierra extranjera. El viaje que demostró que los sueños del Territorio no tienen fronteras.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85&auto=format&fit=crop',
    slug: 'primer-viaje-de-incentivo',
  },
  {
    year: '2021',
    achievement: 'Primera sede física del Territorio',
    headline: 'Apertura Centro República',
    desc: 'Nuestro espacio de trabajo, reuniones y presentaciones. Diseñado para reflejar la cultura que nos define y recibir a quienes vienen a soñar.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop',
    slug: 'apertura-centro-republica',
  },
  {
    year: '2020',
    achievement: 'Modelo digital pionero',
    headline: 'Resiliencia y transformación',
    desc: 'Cuando el mundo se detuvo, CateonCook aceleró. Fuimos de los primeros en adoptar la venta y capacitación digital sin perder el toque humano que nos define.',
    img: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=1200&q=85&auto=format&fit=crop',
  },
  {
    year: '2018',
    achievement: 'Top Royal Prestige Ecuador',
    headline: 'Reconocimiento a la excelencia',
    desc: 'Royal Prestige reconoció a CateonCook entre los distribuidores más destacados del país — por cultura organizacional e impacto real en familias ecuatorianas.',
    img: '/img/nos-7.jpg',
  },
  {
    year: '2015',
    achievement: 'Primera red de distribuidores',
    headline: 'La comunidad toma forma',
    desc: 'Lo que empezó como una visión individual se convirtió en comunidad. Decenas de emprendedores ecuatorianos encontraron en CateonCook su fábrica de sueños.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85&auto=format&fit=crop',
  },
  {
    year: '2010',
    achievement: 'Fundación del sueño',
    headline: 'La semilla del Territorio',
    desc: 'Una convicción nació en Ecuador: los mejores utensilios del mundo merecen llegar a los mejores hogares ecuatorianos. Esa convicción se llamó CateonCook.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop',
  },
]

export default function HistoriaSlider() {
  const trackRef   = useRef<HTMLDivElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const cursorRef  = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const track  = trackRef.current
    const wrap   = wrapRef.current
    const cursor = cursorRef.current
    if (!track || !wrap || !cursor) return

    /* ── Wheel: activo SOLO cuando el cursor está dentro ── */
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
      wheelCurrent   += diff * 0.11
      track.scrollLeft = wheelCurrent
      wheelRaf = requestAnimationFrame(lerpScroll)
    }

    const onWheel = (e: WheelEvent) => {
      const max  = track.scrollWidth - track.clientWidth
      const next = Math.max(0, Math.min(max, wheelTarget + e.deltaY * 1.4))
      if (next === wheelTarget) return   // en el borde: deja pasar el scroll vertical
      e.preventDefault()
      wheelTarget = next
      cancelAnimationFrame(wheelRaf)
      wheelRaf = requestAnimationFrame(lerpScroll)
    }

    /* ── Drag con inercia (mouse + touch) ──────────────── */
    let isDown      = false
    let startX      = 0
    let startScroll = 0
    let velX        = 0
    let prevX       = 0
    let prevT       = 0
    let dragRaf     = 0

    const glide = () => {
      if (Math.abs(velX) < 0.35) { velX = 0; return }
      const next = Math.max(0, Math.min(
        track.scrollWidth - track.clientWidth,
        track.scrollLeft + velX
      ))
      track.scrollLeft = next
      wheelTarget      = next
      wheelCurrent     = next
      velX *= 0.92
      dragRaf = requestAnimationFrame(glide)
    }

    const dragStart = (x: number) => {
      isDown             = true
      isDragging.current = false
      startX             = x
      startScroll        = track.scrollLeft
      prevX              = x
      prevT              = performance.now()
      velX               = 0
      cancelAnimationFrame(dragRaf)
      cancelAnimationFrame(wheelRaf)
      cursor.classList.add('hsl-cursor--press')
    }

    const dragMove = (x: number) => {
      if (!isDown) return
      if (Math.abs(x - startX) > 4) isDragging.current = true
      const now = performance.now()
      velX  = (prevX - x) / Math.max(now - prevT, 1) * 16
      prevX = x
      prevT = now
      const next = Math.max(0, Math.min(
        track.scrollWidth - track.clientWidth,
        startScroll + (startX - x)
      ))
      track.scrollLeft = next
      wheelTarget      = next
      wheelCurrent     = next
    }

    const dragEnd = () => {
      if (!isDown) return
      isDown = false
      cursor.classList.remove('hsl-cursor--press')
      dragRaf = requestAnimationFrame(glide)
    }

    /* ── Cursor: posición + visibilidad ────────────────── */
    const showCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
      cursor.classList.add('hsl-cursor--on')
    }
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
      dragMove(e.pageX)
    }
    const hideCursor = () => {
      cursor.classList.remove('hsl-cursor--on')
      cancelAnimationFrame(wheelRaf)
      wheelTarget  = track.scrollLeft
      wheelCurrent = track.scrollLeft
    }

    const onMouseDown = (e: MouseEvent) => dragStart(e.pageX)
    const onMouseUp   = () => dragEnd()

    const onTouchStart = (e: TouchEvent) => dragStart(e.touches[0].clientX)
    const onTouchMove  = (e: TouchEvent) => dragMove(e.touches[0].clientX)
    const onTouchEnd   = () => dragEnd()

    wrap.addEventListener('wheel',      onWheel,     { passive: false })
    wrap.addEventListener('mouseenter', showCursor)
    wrap.addEventListener('mouseleave', hideCursor)
    wrap.addEventListener('mousemove',  moveCursor)
    wrap.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mouseup',  onMouseUp)
    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove',  onTouchMove,  { passive: true })
    track.addEventListener('touchend',   onTouchEnd)

    return () => {
      wrap.removeEventListener('wheel',      onWheel)
      wrap.removeEventListener('mouseenter', showCursor)
      wrap.removeEventListener('mouseleave', hideCursor)
      wrap.removeEventListener('mousemove',  moveCursor)
      wrap.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',  onMouseUp)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove',  onTouchMove)
      track.removeEventListener('touchend',   onTouchEnd)
      cancelAnimationFrame(wheelRaf)
      cancelAnimationFrame(dragRaf)
    }
  }, [])

  return (
    <>
      {/* Cursor — círculo minimalista, sin texto */}
      <div ref={cursorRef} className="hsl-cursor" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>

      <section className="hsl-section" id="historia">
        <div className="container">
          <div className="hsl-header">
            <span className="label hsl-header__label">Nuestra historia</span>
            <h2 className="hsl-header__title">una historia construida con amor</h2>
            <p className="hsl-header__hint" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M15 7l5 5-5 5"/></svg>
              Desliza para explorar
            </p>
          </div>
        </div>

        <div className="hsl-wrap" ref={wrapRef}>
          <div className="hsl-track" ref={trackRef}>
            {HITOS.map((h, i) => {
              const content = (
                <>
                  <div className="hsl-card__img">
                    <Image
                      src={h.img}
                      alt={h.headline}
                      fill
                      sizes="(max-width: 768px) 80vw, 300px"
                      style={{ objectFit: 'cover' }}
                      priority={i < 3}
                      draggable={false}
                    />
                  </div>
                  <div className="hsl-card__body">
                    <span className="hsl-card__year">{h.year}</span>
                    <h3 className="hsl-card__headline">{h.headline}</h3>
                    <p className="hsl-card__desc">{h.desc}</p>
                  </div>
                </>
              )

              return h.slug ? (
                <Link
                  key={i}
                  href={`/nosotros/historia/${h.slug}`}
                  className="hsl-card hsl-card--link"
                  draggable={false}
                  onClick={(e) => { if (isDragging.current) e.preventDefault() }}
                >
                  {content}
                </Link>
              ) : (
                <div key={i} className="hsl-card">{content}</div>
              )
            })}
            <div className="hsl-track__spacer" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  )
}
