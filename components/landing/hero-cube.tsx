'use client'

import { useState, useEffect, useRef } from 'react'
import ModalTrigger from '@/components/modal-trigger'

type Dir = 'right' | 'left'
const TOTAL = 3
const AUTO_MS = 7000
const ANIM_MS = 750

export default function HeroCube() {
  const [active, setActive]   = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [dir, setDir]         = useState<Dir>('right')
  const lockRef   = useRef(false)
  const activeRef = useRef(0)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchXRef = useRef<number | null>(null)

  function go(to: number, d: Dir) {
    if (lockRef.current) return
    lockRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
    const from = activeRef.current
    activeRef.current = to
    setDir(d)
    setExiting(from)
    setActive(to)
    setTimeout(() => {
      setExiting(null)
      lockRef.current = false
      scheduleAuto()
    }, ANIM_MS)
  }

  function advance(d: Dir) {
    const from = activeRef.current
    const to = d === 'right'
      ? (from + 1) % TOTAL
      : (from - 1 + TOTAL) % TOTAL
    go(to, d)
  }

  function goTo(idx: number) {
    if (idx === activeRef.current || lockRef.current) return
    const from = activeRef.current
    const rightDist = ((idx - from) + TOTAL) % TOTAL
    const leftDist  = ((from - idx) + TOTAL) % TOTAL
    go(idx, rightDist <= leftDist ? 'right' : 'left')
  }

  function scheduleAuto() {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => advance('right'), AUTO_MS)
  }

  useEffect(() => {
    scheduleAuto()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function panelCls(i: number) {
    const b = 'hero-cube-panel'
    if (i === active && exiting === null) return `${b} ${b}--active`
    if (i === active)  return `${b} ${b}--enter-${dir}`
    if (i === exiting) return `${b} ${b}--exit-${dir}`
    return b
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchXRef.current = e.touches[0].clientX
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchXRef.current === null) return
    const delta = e.changedTouches[0].clientX - touchXRef.current
    touchXRef.current = null
    if (Math.abs(delta) < 50) return
    advance(delta < 0 ? 'right' : 'left')
  }

  return (
    <div
      className="hero-cube-scene"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Galería de presentación"
    >
      <div className={panelCls(0)} aria-hidden={active !== 0 ? true : undefined}>
        <PanelHero />
      </div>
      <div className={panelCls(1)} aria-hidden={active !== 1 ? true : undefined}>
        <PanelBrand1 />
      </div>
      <div className={panelCls(2)} aria-hidden={active !== 2 ? true : undefined}>
        <PanelBrand2 />
      </div>

      <button
        className="hero-cube-arrow hero-cube-arrow--left"
        onClick={() => advance('left')}
        aria-label="Panel anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        className="hero-cube-arrow hero-cube-arrow--right"
        onClick={() => advance('right')}
        aria-label="Panel siguiente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <div className="hero-cube-dots" role="tablist">
        {[0, 1, 2].map(i => (
          <button
            key={i}
            className={`hero-cube-dot${i === active ? ' hero-cube-dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === active}
            aria-label={`Panel ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Panel 0: Hero original con título ─── */
function PanelHero() {
  return (
    <section className="hero" id="inicio" style={{ height: '100%' }}>
      <div className="hero__bg"></div>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <div className="hero__logo-mark">
          <svg viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="40" cy="40" r="37" stroke="currentColor" strokeWidth="3.5"/>
            <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="36" y="16" width="8" height="7" rx="3" fill="currentColor"/>
            <path d="M20 27 Q20 24 40 24 Q60 24 60 27 Q60 31 40 31 Q20 31 20 27Z" fill="currentColor"/>
            <path d="M22 31 L22 52 Q22 61 40 61 Q58 61 58 52 L58 31 Z" fill="currentColor"/>
            <path d="M22 36 Q13 36 13 44 Q13 52 22 49" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M58 36 Q67 36 67 44 Q67 52 58 49" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            <text x="90" y="38" fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="900" letterSpacing="2.5" fill="currentColor">CATEON</text>
            <text x="92" y="63" fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="900" letterSpacing="6" fill="currentColor">COOK</text>
          </svg>
        </div>
        <span className="hero__eyebrow">Distribuidor Autorizado Royal Prestige · Ecuador</span>
        <h1 className="hero__title">
          Fábrica de<br/>
          <em>Sueños</em>
        </h1>
        <p className="hero__subtitle">Comunidad que nutre</p>
        <div className="hero__cta">
          <ModalTrigger label="Sé parte de la fábrica" />
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label">Descubre</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}

/* ─── Panel 1: Visual de marca — Fábrica de Sueños ─── */
function PanelBrand1() {
  return (
    <div className="hero-panel-brand">
      {/*
        Para agregar video: descomenta la línea de abajo y apunta a tu archivo.
        <video className="hero-panel-brand__video" src="/video/fabrica.mp4" autoPlay muted loop playsInline poster="/img/fabrica-poster.jpg" />
      */}
      <div className="hero-panel-brand__bg hero-panel-brand__bg--teal"></div>
      <div className="hero-panel-brand__overlay"></div>
      <div className="hero-panel-brand__watermark" aria-hidden="true">Sueños</div>

      <div className="hero-panel-brand__content">
        <div className="hero-panel-brand__pot">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5"/>
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.8"/>
            <rect x="45" y="18" width="10" height="9" rx="4" fill="currentColor"/>
            <path d="M25 33 Q25 30 50 30 Q75 30 75 33 Q75 39 50 39 Q25 39 25 33Z" fill="currentColor"/>
            <path d="M27 39 L27 65 Q27 76 50 76 Q73 76 73 65 L73 39 Z" fill="currentColor"/>
            <path d="M27 45 Q16 45 16 55 Q16 65 27 61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M73 45 Q84 45 84 55 Q84 65 73 61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <span className="hero-panel-brand__label" style={{ color: 'var(--c-sky)' }}>
          Distribuidor Autorizado Royal Prestige · Ecuador
        </span>

        <p className="hero-panel-brand__tagline">
          Fábrica de<br/>
          <em style={{ color: 'var(--c-sky)' }}>Sueños</em>
        </p>

        <ModalTrigger label="Únete a la fábrica" />
      </div>
    </div>
  )
}

/* ─── Panel 2: Comunidad / Royal Prestige ─── */
function PanelBrand2() {
  return (
    <div className="hero-panel-brand">
      {/*
        Para agregar video: descomenta la línea de abajo y apunta a tu archivo.
        <video className="hero-panel-brand__video" src="/video/comunidad.mp4" autoPlay muted loop playsInline poster="/img/comunidad-poster.jpg" />
      */}
      <div className="hero-panel-brand__bg hero-panel-brand__bg--gold"></div>
      <div className="hero-panel-brand__overlay"></div>
      <div className="hero-panel-brand__watermark" aria-hidden="true">Nutre</div>

      <div className="hero-panel-brand__content">
        <span className="hero-panel-brand__label" style={{ color: 'rgba(255,215,0,0.8)' }}>
          Royal Prestige · Ecuador
        </span>

        <p className="hero-panel-brand__tagline" style={{ color: 'rgba(255,248,220,0.95)' }}>
          Comunidad<br/>
          <em style={{ color: '#FFD700', fontStyle: 'italic' }}>que nutre</em>
        </p>

        <p style={{
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          color: 'rgba(255,240,200,0.65)',
          maxWidth: 460,
          lineHeight: 1.85,
          textAlign: 'center',
        }}>
          Más de 500 familias construyendo su negocio<br/>
          con los mejores productos del mundo.
        </p>

        <ModalTrigger
          label="Sé parte de la historia"
          style={{
            background: 'rgba(255,215,0,0.12)',
            borderColor: 'rgba(255,215,0,0.55)',
            color: '#FFD700',
            boxShadow: '0 8px 32px rgba(255,215,0,0.18)',
          }}
        />
      </div>
    </div>
  )
}
