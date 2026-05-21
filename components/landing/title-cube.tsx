'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link  from 'next/link'

type Panel =
  | { type: 'title' }
  | { type: 'image'; src: string; pos: string; nosotrosId: string }

const PANELS: Panel[] = [
  { type: 'title' },
  { type: 'image', src: '/img/hero-1.jpg', pos: 'center 45%', nosotrosId: 'decada-2010' },
  { type: 'image', src: '/img/hero-2.jpg', pos: 'center 40%', nosotrosId: 'lustro-2015' },
  { type: 'image', src: '/img/hero-3.jpg', pos: 'center 30%', nosotrosId: 'ano-2020'   },
  { type: 'image', src: '/img/hero-4.jpg', pos: 'center 40%', nosotrosId: 'ano-2023'   },
]

const CYCLE = [1, 2, 0, 3, 4, 0]

function randomMs(panelIdx: number): number {
  if (panelIdx === 0) return Math.random() * 2000 + 3000
  return Math.random() * 3000 + 2000
}

export default function TitleCube() {
  const [active, setActive] = useState(CYCLE[0])
  const cycleRef  = useRef(0)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glareRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const titleRef  = useRef<HTMLHeadingElement>(null)

  function schedule() {
    const currentPanel = CYCLE[cycleRef.current]
    timerRef.current = setTimeout(() => {
      const nextPos = (cycleRef.current + 1) % CYCLE.length
      cycleRef.current = nextPos
      setActive(CYCLE[nextPos])
      schedule()
    }, randomMs(currentPanel))
  }

  useEffect(() => {
    schedule()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (glareRef.current) clearTimeout(glareRef.current)
    if (active !== 0) return

    if (Math.random() > 0.4) {
      function fireGlare() {
        const h = titleRef.current
        if (!h) return
        h.classList.add('hero__title--glare')
        glareRef.current = setTimeout(() => {
          if (!titleRef.current) return
          titleRef.current.classList.remove('hero__title--glare')
          glareRef.current = setTimeout(fireGlare, Math.random() * 3500 + 2000)
        }, 1050)
      }
      glareRef.current = setTimeout(fireGlare, Math.random() * 1400 + 700)
    }

    return () => { if (glareRef.current) clearTimeout(glareRef.current) }
  }, [active])

  const isTitle = active === 0

  return (
    <div className={`tcube${isTitle ? ' tcube--title' : ''}`}>
      {PANELS.map((panel, i) => (
        <div
          key={i}
          className={`tcube-panel${i === active ? ' tcube-panel--active' : ''}`}
        >
          {panel.type === 'title' ? (
            <h1 className="hero__title" ref={titleRef}>
              Fábrica de<br/>
              <em>Sueños</em>
            </h1>
          ) : (
            <Link
              href={`/nosotros#${panel.nosotrosId}`}
              className="tcube-panel__link"
              tabIndex={i === active ? 0 : -1}
              aria-label="Ver historia"
            >
              <Image
                src={panel.src}
                alt=""
                fill
                aria-hidden="true"
                style={{ objectFit: 'cover', objectPosition: panel.pos }}
                priority={i <= 1}
              />
              <span className="tcube-panel__hint">Ver historia</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
