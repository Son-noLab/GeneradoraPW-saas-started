'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from '@/components/lenis-provider'

interface HFoto {
  src: string
  alt: string
  caption: string
  tag: string
  title: string
  titleItalic: string
  story: string
}

const FOTOS: HFoto[] = [
  {
    src: '/img/cc-gala-002.jpg',
    alt: 'Socios CateonCook gala 2024',
    caption: 'socios · gala · 2024',
    tag: 'Gala · Socios 2024',
    title: 'Una noche de',
    titleItalic: 'muchos años',
    story: 'La gala 2024 reunió a socios de cinco países en un solo salón. No fue solo una celebración: fue la prueba visible de que cuando una red se construye con paciencia y comunidad, termina siendo capaz de llenarlo.',
  },
  {
    src: '/img/cc-rp-equipo.jpg',
    alt: 'Equipo Royal Prestige Ecuador',
    caption: 'equipo · Royal Prestige',
    tag: 'Equipo · Royal Prestige',
    title: 'Los que hacen',
    titleItalic: 'posible el producto',
    story: 'Cada integrante del equipo Royal Prestige conoce el producto de adentro hacia afuera porque lo usa en su propia cocina antes de presentarlo. No se puede transmitir lo que no se ha vivido, y eso es lo que distingue a CateonCook.',
  },
  {
    src: '/img/cc-medallas-002.jpg',
    alt: 'Reconocimientos socios 2024',
    caption: 'reconocimientos · 2024',
    tag: 'Reconocimientos · 2024',
    title: 'Cada medalla',
    titleItalic: 'tiene nombre propio',
    story: 'Los reconocimientos de CateonCook no los entrega la empresa a sus mejores vendedores. Los construye la comunidad para quienes eligieron crecer sin abandonar a nadie en el camino.',
  },
]

export default function HistoriaPhotos() {
  const [active, setActive] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const lenis = useLenis()

  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => setActive(null), [])
  const prev  = useCallback(() => setActive(i => (i !== null && i > 0)                ? i - 1 : i), [])
  const next  = useCallback(() => setActive(i => (i !== null && i < FOTOS.length - 1) ? i + 1 : i), [])

  useEffect(() => {
    if (active === null) return
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => {
      if      (e.key === 'Escape')     close()
      else if (e.key === 'ArrowLeft')  prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
    }
  }, [active, lenis, close, prev, next])

  const foto = active !== null ? FOTOS[active] : null
  const idx  = active ?? 0

  return (
    <>
      <div className="nosotros__photos">
        {FOTOS.map((f, i) => (
          <button
            key={i}
            type="button"
            className="nosotros__photo"
            onClick={() => setActive(i)}
            aria-label={`Ver historia: ${f.caption}`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              className="nosotros__photo-img"
              sizes="(max-width: 960px) 50vw, 30vw"
              {...(i === 0 ? { priority: true } : { loading: 'lazy' as const })}
            />
            <span className="nosotros__photo-caption">{f.caption}</span>
          </button>
        ))}
      </div>

      {mounted && foto !== null && createPortal(
        <div className="mk">
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={foto.caption} onClick={close}>
            <button type="button" className="lightbox__close" onClick={close} aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>

            <div className="lightbox__img-wrap">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="lightbox__img"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            <div className="lightbox__story" onClick={e => e.stopPropagation()}>
              <p className="lightbox__counter">
                {String(idx + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(FOTOS.length).padStart(2, '0')}
              </p>
              <p className="lightbox__tag">{foto.tag}</p>
              <h2 className="lightbox__title">
                {foto.title}<br /><em>{foto.titleItalic}</em>
              </h2>
              <p className="lightbox__text">{foto.story}</p>
              <nav className="lightbox__nav" aria-label="Navegar galería">
                <button type="button" className="lightbox__btn" onClick={prev} disabled={active === 0} aria-label="Imagen anterior">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="8,1 3,6.5 8,12" />
                  </svg>
                </button>
                <button type="button" className="lightbox__btn" onClick={next} disabled={active === FOTOS.length - 1} aria-label="Imagen siguiente">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5,1 10,6.5 5,12" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
