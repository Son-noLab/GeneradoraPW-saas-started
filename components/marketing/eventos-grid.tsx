'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from '@/components/lenis-provider'

const BATCH = 24

export default function EventosGrid({ files }: { files: string[] }) {
  const [visible, setVisible] = useState(BATCH)
  const [active, setActive] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const lenis = useLenis()

  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => setActive(null), [])
  const prev  = useCallback(() => setActive(i => (i !== null && i > 0)                ? i - 1 : i), [])
  const next  = useCallback(() => setActive(i => (i !== null && i < files.length - 1) ? i + 1 : i), [files.length])

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

  const shown = files.slice(0, visible)
  const idx = active ?? 0

  return (
    <>
      <div className="eventos__grid">
        {shown.map((f, i) => (
          <button
            key={f}
            type="button"
            className="eventos__item"
            onClick={() => setActive(i)}
            aria-label={`Ver foto ${i + 1} de ${files.length}`}
          >
            <Image
              src={`/img/eventos/${f}`}
              alt=""
              fill
              className="eventos__img"
              sizes="(max-width: 560px) 33vw, (max-width: 900px) 25vw, 16vw"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {visible < files.length ? (
        <div className="eventos__more-row">
          <button type="button" className="eventos__more" onClick={() => setVisible(v => v + BATCH)}>
            Ver más ({files.length - visible} restantes)
          </button>
        </div>
      ) : (
        <p className="eventos__count">{files.length} momentos</p>
      )}

      {mounted && active !== null && createPortal(
        <div className="mk">
          <div className="lightbox lightbox--simple" role="dialog" aria-modal="true" aria-label={`Foto ${idx + 1}`} onClick={close}>
            <button type="button" className="lightbox__close" onClick={close} aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
            <div className="lightbox__img-wrap" onClick={e => e.stopPropagation()}>
              <Image
                src={`/img/eventos/${files[idx]}`}
                alt=""
                fill
                className="lightbox__img"
                sizes="100vw"
                priority
              />
              <button type="button" className="eventos-lb__prev" onClick={prev} disabled={idx === 0} aria-label="Foto anterior">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="8,1 3,6.5 8,12" />
                </svg>
              </button>
              <button type="button" className="eventos-lb__next" onClick={next} disabled={idx === files.length - 1} aria-label="Foto siguiente">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="5,1 10,6.5 5,12" />
                </svg>
              </button>
              <span className="eventos-lb__counter">
                {String(idx + 1).padStart(3, '0')}&thinsp;/&thinsp;{String(files.length).padStart(3, '0')}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
