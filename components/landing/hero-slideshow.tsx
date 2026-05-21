'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/img/hero-1.jpg', pos: 'center top' },
  { src: '/img/hero-2.jpg', pos: 'center center' },
  { src: '/img/hero-3.jpg', pos: 'center top' },
  { src: '/img/hero-4.jpg', pos: 'center center' },
]

const DURATION  = 5500   // ms por imagen
const FADE_MS   = 1800   // duración del crossfade

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, DURATION)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            /* escala muy sutil al entrar — efecto Ken Burns ligero */
            transform: i === current ? 'scale(1.04)' : 'scale(1)',
            transitionProperty: 'opacity, transform',
            transitionDuration: `${FADE_MS}ms, ${DURATION + FADE_MS}ms`,
            transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), linear',
          }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            aria-hidden="true"
            priority={i === 0}
            style={{ objectFit: 'cover', objectPosition: slide.pos }}
          />
        </div>
      ))}
    </div>
  )
}
