'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  PRODUCTOS,
  CATEGORIAS,
  USOS_TAGS,
  DISPONIBILIDAD_TAGS,
  type Categoria,
  type UsoTag,
  type Disponibilidad,
} from '@/lib/productos'

const DISP_LABEL: Record<string, string> = {
  'inmediato':   'Disponible',
  '3-7-dias':    '3–7 días',
  'bajo-pedido': 'Bajo pedido',
}
const DISP_COLOR: Record<string, string> = {
  'inmediato':   '#22c55e',
  '3-7-dias':    '#f59e0b',
  'bajo-pedido': '#94a3b8',
}

const QUICK_USOS: { id: UsoTag | 'todo'; label: string }[] = [
  { id: 'todo',            label: 'Todos' },
  { id: 'gastronomia-pro', label: 'Profesional' },
  { id: 'familiar',        label: 'Familiar' },
  { id: 'reposteria',      label: 'Repostería' },
  { id: 'vapor',           label: 'Cocción al Vapor' },
  { id: 'bebidas',         label: 'Bebidas' },
]

function CardImg({ src, nombre }: { src: string; nombre: string }) {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
    e.currentTarget.style.setProperty('--mx', `${x}px`)
    e.currentTarget.style.setProperty('--my', `${y}px`)
  }
  function onLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty('--mx', '0px')
    e.currentTarget.style.setProperty('--my', '0px')
  }
  return (
    <div className="ccat-img" onMouseMove={onMove} onMouseLeave={onLeave}>
      <Image
        className="ccat-img__el"
        src={src}
        alt={nombre}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

export default function CatalogClient() {
  const [cat,     setCat]     = useState<Categoria | 'todo'>('todo')
  const [uso,     setUso]     = useState<UsoTag | 'todo'>('todo')
  const [disp,    setDisp]    = useState<Disponibilidad | 'todo'>('todo')
  const [advOpen, setAdvOpen] = useState(false)

  /* ── Loader state ── */
  const [count,       setCount]       = useState(0)
  const [loaderOut,   setLoaderOut]   = useState(false)
  const [loaderDone,  setLoaderDone]  = useState(false)
  const [cardsReady,  setCardsReady]  = useState(false)

  useEffect(() => {
    const DURATION = 900 // ms for 0→100
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(eased * 100))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(() => setLoaderOut(true),  180)  // brief pause then wipe
        setTimeout(() => setCardsReady(true), 380)  // cards start as curtain lifts
        setTimeout(() => setLoaderDone(true), 1050) // remove overlay from DOM
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ── Filter logic ── */
  const visibles = useMemo(() => PRODUCTOS.filter(p => {
    if (cat  !== 'todo' && p.categoria      !== cat)         return false
    if (uso  !== 'todo' && !p.usos.includes(uso as UsoTag)) return false
    if (disp !== 'todo' && p.disponibilidad !== disp)        return false
    return true
  }), [cat, uso, disp])

  const hasFilters = cat !== 'todo' || uso !== 'todo' || disp !== 'todo'
  function clearFilters() { setCat('todo'); setUso('todo'); setDisp('todo') }

  return (
    <main className="ccat-main">

      {/* ── Loader overlay ── */}
      {!loaderDone && (
        <div className={`ccat-loader${loaderOut ? ' ccat-loader--out' : ''}`} aria-hidden="true">
          <div className="ccat-loader__bar" style={{ width: `${count}%` }} />
          <span className="ccat-loader__label">Royal Prestige · Catálogo</span>
          <span className="ccat-loader__count">{count}</span>
        </div>
      )}

      {/* ── Cabecera ── */}
      <div className="ccat-head">
        <div className="container">
          <div className="ccat-head__inner">
            <div>
              <span className="label" style={{ color: 'var(--c-sky)', letterSpacing: '.18em' }}>
                Distribuidor Autorizado · Ecuador
              </span>
              <h1 className="ccat-head__title">Catálogo Royal Prestige</h1>
            </div>
            <p className="ccat-head__count">
              {visibles.length} {visibles.length === 1 ? 'producto' : 'productos'}
              {hasFilters && (
                <button className="ccat-head__clear" onClick={clearFilters}>
                  Limpiar filtros ×
                </button>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="ccat-filters">
        <div className="container">

          <div className="ccat-quick-row">
            {!advOpen && (
              <div className="ccat-fgroup ccat-fgroup--row">
                <span className="ccat-flabel">Uso</span>
                <div className="ccat-fbtn-row">
                  {QUICK_USOS.map(u => (
                    <button
                      key={u.id}
                      className={`ccat-fbtn${uso === u.id ? ' ccat-fbtn--on' : ''}`}
                      onClick={() => setUso(u.id)}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              className={`ccat-adv-toggle${advOpen ? ' ccat-adv-toggle--open' : ''}`}
              onClick={() => setAdvOpen(o => !o)}
              aria-expanded={advOpen}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="16" y2="12"/>
                <line x1="4" y1="18" x2="12" y2="18"/>
              </svg>
              Menú avanzado
              <svg className="ccat-adv-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          {advOpen && (
            <div className="ccat-adv-panel">
              <div className="ccat-fgroup">
                <span className="ccat-flabel">Categoría</span>
                <div className="ccat-fbtn-row">
                  {CATEGORIAS.map(c => (
                    <button
                      key={c.id}
                      className={`ccat-fbtn${cat === c.id ? ' ccat-fbtn--on' : ''}`}
                      onClick={() => setCat(c.id as Categoria | 'todo')}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ccat-fgroup">
                <span className="ccat-flabel">Uso</span>
                <div className="ccat-fbtn-row">
                  {USOS_TAGS.map(u => (
                    <button
                      key={u.id}
                      className={`ccat-fbtn${uso === u.id ? ' ccat-fbtn--on' : ''}`}
                      onClick={() => setUso(u.id as UsoTag | 'todo')}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ccat-fgroup">
                <span className="ccat-flabel">Disponibilidad</span>
                <div className="ccat-fbtn-row">
                  {DISPONIBILIDAD_TAGS.map(d => (
                    <button
                      key={d.id}
                      className={`ccat-fbtn${disp === d.id ? ' ccat-fbtn--on' : ''}`}
                      onClick={() => setDisp(d.id as Disponibilidad | 'todo')}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Grid ── */}
      <div className="ccat-grid-wrap">
        <div className="container">
          {visibles.length === 0 ? (
            <div className="ccat-empty">
              <p>No hay productos con esa combinación de filtros.</p>
              <button className="btn btn--sky" onClick={clearFilters}>Ver todos</button>
            </div>
          ) : (
            <div className={`ccat-grid${cardsReady ? ' ccat-grid--ready' : ''}`}>
              {visibles.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.slug}`}
                  className="ccat-card"
                  style={{ '--card-i': i } as React.CSSProperties}
                >
                  <CardImg src={p.img} nombre={p.nombre} />
                  <div className="ccat-card__body">
                    {p.badge && <span className="ccat-card__badge">{p.badge}</span>}
                    <span className="ccat-card__serie">{p.serie}</span>
                    <h2 className="ccat-card__name">{p.nombre}</h2>
                    <p className="ccat-card__eslogan">{p.eslogan}</p>
                    <div className="ccat-card__footer">
                      <span className="ccat-card__disp" style={{ color: DISP_COLOR[p.disponibilidad] }}>
                        <span className="ccat-card__disp-dot" style={{ background: DISP_COLOR[p.disponibilidad] }} />
                        {DISP_LABEL[p.disponibilidad]}
                      </span>
                      <span className="ccat-card__garantia">· {p.garantia} garantía</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </main>
  )
}
