'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LogoStacked, BrandLogo } from '@/components/marketing/logo'
import SectionDivider from '@/components/marketing/section-divider'
import { useModal } from '@/components/marketing/shell'
import { useLenis } from '@/components/lenis-provider'

/* ── Title Cube ── */
// Pool of the best community/event photos — randomized per panel, never repeating
// the same photo within a 7s window. Mínimo 50 fotos, curadas a mano.
const IMAGES: { src: string; pos: string }[] = [
  '571a0852', '571a0853', '571a0880', '571a0881', '571a0882', '571a0883', '571a0886', '571a0887', '571a0896',
  '571a0913', '571a0918', '571a0922', '571a0926', '571a0930', '571a0938', '571a0944', '571a0945',
  '571a0977', '571a0979', '571a0986', '571a0991', '571a0993', '571a0995',
  '571a1006', '571a1008', '571a1011', '571a1013', '571a1016',
  '571a1023', '571a1029', '571a1030', '571a1039', '571a1042', '571a1043', '571a1045', '571a1047',
  '571a1067', '571a1069', '571a1071', '571a1078', '571a1080', '571a1083', '571a1087',
  '571a1111', '571a1112', '571a1114', '571a1115',
  '571a1121', '571a1125', '571a1130', '571a1131', '571a1142', '571a1144', '571a1146',
  '571a1165', '571a1169', '571a1171', '571a1176', '571a1180', '571a1183', '571a1188', '571a1192', '571a1195',
  '571a1196', '571a1202', '571a1205', '571a1208', '571a1210', '571a1211', '571a1213', '571a1214', '571a1215',
].map(name => ({ src: `/img/eventos/${name}.jpg`, pos: 'center 30%' })).concat(
  ['img-0149', 'img-0784', 'img-0788', 'img-0789', 'img-0790', 'img-0791', 'img-0792', 'img-0793', 'img-0794']
    .map(name => ({ src: `/img/eventos/${name}.jpg`, pos: 'center 30%' }))
)
const ROLE_CYCLE = ['title', 'image', 'image', 'title', 'image', 'image'] as const
const randomMs = () => Math.random() * 3200 + 2500
const NO_REPEAT_MS = 7000
const IMG_TRANSITION_MS = 1500

function TCubeImagePanel({ img, isActive, entering, onClick }: { img: { src: string; pos: string }; isActive: boolean; entering: boolean; onClick: () => void }) {
  return (
    <div className={`tcube-panel${isActive ? ' is-active' : ''}${entering ? ' tcube-panel--enter' : ''}`}>
      <div
        className="tcube-image"
        onClick={onClick}
        role="button"
        tabIndex={isActive ? 0 : -1}
        aria-label="Cambiar imagen"
        onKeyDown={e => e.key === 'Enter' && onClick()}
      >
        <img src={img.src} alt="comunidad · cateoncook" className="tcube-image__photo" style={{ objectPosition: img.pos }} data-pos-y={img.pos.split(' ')[1]?.replace('%', '') ?? '50'} />
        <div className="tcube-image__grain" />
      </div>
      <div className="tcube-panel__bars" aria-hidden="true" />
      <Link href="/nosotros" className="tcube-image__nav" aria-label="Ver Nosotros">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10L10 2" /><path d="M5 2h5v5" />
        </svg>
      </Link>
    </div>
  )
}

function TitleCube({ onActiveChange }: { onActiveChange: (isTitle: boolean) => void }) {
  const [isTitle, setIsTitle] = useState(true)
  const [activeImgIdx, setActiveImgIdx] = useState<number | null>(null)
  const [prevImgIdx, setPrevImgIdx] = useState<number | null>(null)
  const [glare, setGlare] = useState(false)

  const isTitleRef = useRef(true)
  const activeImgIdxRef = useRef<number | null>(null)
  const cycleRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glareRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const consecutiveImagesRef = useRef(0)
  const recentShownRef = useRef<Map<number, number>>(new Map())
  const lenis = useLenis()

  // Parallax: desplaza objectPosition-Y al scroll para efecto de profundidad
  useEffect(() => {
    if (!lenis) return
    const heroEl = document.getElementById('inicio')
    if (!heroEl) return
    const el = heroEl
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function parallax(l: any) {
      const progress = Math.min(1, Math.max(0, l.scroll / el.offsetHeight))
      el.querySelectorAll<HTMLImageElement>('.tcube-image__photo').forEach(img => {
        const base = parseFloat(img.dataset.posY ?? '50')
        img.style.objectPosition = `center ${base + progress * 20}%`
      })
    }
    lenis.on('scroll', parallax)
    return () => lenis.off('scroll', parallax)
  }, [lenis])

  useEffect(() => { onActiveChange(true) }, [])
  useEffect(() => {
    onActiveChange(isTitle)
    // keeps the click-streak counter honest whenever text shows up for any reason
    // (click, automatic cycle, or the scroll-out reset below)
    if (isTitle) consecutiveImagesRef.current = 0
  }, [isTitle])

  // Picks a random pool image, excluding the one given and anything shown in the last 7s.
  function pickPoolImage(excludeIdx: number | null): number {
    const now = Date.now()
    const all = IMAGES.map((_, i) => i).filter(i => i !== excludeIdx)
    const fresh = all.filter(i => {
      const last = recentShownRef.current.get(i)
      return last === undefined || now - last >= NO_REPEAT_MS
    })
    const pool = fresh.length > 0 ? fresh : all
    const chosen = pool[Math.floor(Math.random() * pool.length)]
    recentShownRef.current.set(chosen, now)
    return chosen
  }

  function goToImage(excludeIdx: number | null) {
    if (prevClearRef.current) clearTimeout(prevClearRef.current)
    const nextIdx = pickPoolImage(excludeIdx)
    setPrevImgIdx(activeImgIdxRef.current)
    activeImgIdxRef.current = nextIdx
    setActiveImgIdx(nextIdx)
    isTitleRef.current = false
    setIsTitle(false)
    prevClearRef.current = setTimeout(() => setPrevImgIdx(null), IMG_TRANSITION_MS)
  }

  function goToTitle() {
    if (prevClearRef.current) clearTimeout(prevClearRef.current)
    setPrevImgIdx(activeImgIdxRef.current)
    activeImgIdxRef.current = null
    setActiveImgIdx(null)
    isTitleRef.current = true
    setIsTitle(true)
    prevClearRef.current = setTimeout(() => setPrevImgIdx(null), IMG_TRANSITION_MS)
  }

  // Reset to title when hero < 50% visible; restart cycle when hero >= 85%
  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return
    let prevRatio = 1
    const obs = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        if (ratio < 0.65) {
          if (timerRef.current) clearTimeout(timerRef.current)
          if (glareRef.current) clearTimeout(glareRef.current)
          goToTitle()
          setGlare(false)
        } else if (ratio >= 0.65 && prevRatio < 0.65) {
          cycleRef.current = 0
          startCycle()
        }
        prevRatio = ratio
      },
      { threshold: [0.65] }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  const startCycle = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    function schedule() {
      timerRef.current = setTimeout(() => {
        const next = (cycleRef.current + 1) % ROLE_CYCLE.length
        cycleRef.current = next
        if (ROLE_CYCLE[next] === 'title') goToTitle()
        else goToImage(activeImgIdxRef.current)
        schedule()
      }, randomMs())
    }
    schedule()
  }

  useEffect(() => {
    startCycle()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  // Click interaction (manual override of the automatic cycle — does not alter it):
  // from the text panel, a click always jumps to a random image; from an image panel,
  // a click jumps to another random image 89% of the time, or back to text 11% of the
  // time — capped so a click never shows a 4th image in a row (forces text instead).
  const MAX_CONSECUTIVE_IMAGES = 3
  const handleCubeClick = () => {
    if (isTitleRef.current) {
      goToImage(null)
      consecutiveImagesRef.current = 1
    } else if (consecutiveImagesRef.current >= MAX_CONSECUTIVE_IMAGES || Math.random() < 0.11) {
      goToTitle()
      consecutiveImagesRef.current = 0
    } else {
      goToImage(activeImgIdxRef.current)
      consecutiveImagesRef.current++
    }
    cycleRef.current = 0
    startCycle()
  }

  useEffect(() => {
    if (glareRef.current) clearTimeout(glareRef.current)
    if (!isTitle) return
    function fire() {
      setGlare(true)
      glareRef.current = setTimeout(() => {
        setGlare(false)
        glareRef.current = setTimeout(fire, Math.random() * 3000 + 1800)
      }, 1050)
    }
    fire()
    return () => { if (glareRef.current) clearTimeout(glareRef.current) }
  }, [isTitle])

  return (
    <div className={`tcube${isTitle ? ' tcube--title' : ''}`}>
      <div className={`tcube-panel${isTitle ? ' is-active' : ''}`}>
        <h1
          className="hero-title"
          onClick={handleCubeClick}
          role="button"
          tabIndex={isTitle ? 0 : -1}
          aria-label="Ver fotos de la comunidad"
          onKeyDown={e => e.key === 'Enter' && handleCubeClick()}
        >
          Fábrica de<br />
          <em className={glare ? 'glare' : ''}>Sueños</em>
        </h1>
      </div>
      {prevImgIdx !== null && (
        <TCubeImagePanel key={`img-${prevImgIdx}`} img={IMAGES[prevImgIdx]} isActive={false} entering={false} onClick={handleCubeClick} />
      )}
      {activeImgIdx !== null && (
        <TCubeImagePanel key={`img-${activeImgIdx}`} img={IMAGES[activeImgIdx]} isActive={true} entering={true} onClick={handleCubeClick} />
      )}
    </div>
  )
}


/* ── HeroTransition ── */
let _audioCtx: AudioContext | null = null
function getAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!_audioCtx)
      _audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    return _audioCtx
  } catch { return null }
}

const SOUND_MIN_GAP_MS = 7000

const HeroTransition = React.memo(function HeroTransition() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const lastSoundAtRef = useRef(0)

  // Bake final state into inline style so CSS class toggling can't erase it
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const onEnd = (e: AnimationEvent) => {
      (e.target as SVGPathElement).style.strokeDashoffset = '0'
    }
    wrap.addEventListener('animationend', onEnd)
    return () => wrap.removeEventListener('animationend', onEnd)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const wrap = wrapRef.current
    if (!hero || !wrap) return

    const ctx = getAudioCtx()
    const unlock = () => ctx?.resume().catch(() => {})
    window.addEventListener('scroll', unlock, { once: true, passive: true })
    window.addEventListener('pointerdown', unlock, { once: true })

    let prevRatio = 1
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        if (prevRatio >= 1 && ratio < 1) fire(wrap)
        if (prevRatio < 0.5 && ratio >= 0.5) fire(wrap)
        prevRatio = ratio
      },
      { threshold: [0, 0.5, 1.0] }
    )
    observer.observe(hero)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', unlock)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [])

  function fire(wrap: HTMLDivElement) {
    wrap.querySelectorAll<SVGPathElement>('.htrans__path').forEach(p => { p.style.strokeDashoffset = '' })
    wrap.classList.remove('htrans--on')
    void wrap.offsetWidth
    wrap.classList.add('htrans--on')
    const now = Date.now()
    if (now - lastSoundAtRef.current < SOUND_MIN_GAP_MS) return
    const ctx = getAudioCtx()
    if (!ctx || ctx.state !== 'running') return
    lastSoundAtRef.current = now
    ;[[261.63, 0], [329.63, 0.07], [392.0, 0.14]].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq
      const t = ctx.currentTime + (delay as number)
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.185, t + 0.09)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85)
      osc.start(t); osc.stop(t + 0.85)
    })
  }

  return (
    <div ref={wrapRef} className="htrans" aria-hidden="true">
      <svg className="htrans__svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path className="htrans__path htrans__path--thin"  d="M0,44 L1440,44" />
        <path className="htrans__path htrans__path--thick" d="M0,37 L1440,37" />
      </svg>
    </div>
  )
})

/* ── Hero ── */
function Hero() {
  const [isTitle, setIsTitle] = useState(true)
  const { openModal } = useModal()
  return (
    <section className={`hero${isTitle ? '' : ' hero--img-active'}`} id="inicio">
      <div className="hero__bg" />
      <div className="hero__vignette" />
      {/* Anchored to .hero (fixed min-height:100vh), NOT .hero__stage — so it never
          drifts when logo/tcube margins change and recenter the stage's flex flow. */}
      <div className="hero__corner-tag">
        <span className="dot" /> DISTRIBUIDOR AUTORIZADO ROYAL PRESTIGE · ECUADOR
      </div>
      <div className="hero__stage">
        <div className="hero__logo-mark" style={{ height: isTitle ? 140 : 147, marginTop: isTitle ? 34 : -56, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'margin-top .4s ease .13s' }}>
          {isTitle ? (
            <LogoStacked key="stacked" tone="positive" height={90} priority style={{ transform: 'scale(1.87)' }} />
          ) : (
            <BrandLogo key="horizontal" tone="positive" height={40} priority style={{ transform: 'scale(1.9178125)' }} />
          )}
        </div>
        <TitleCube onActiveChange={setIsTitle} />
        <p className="hero__subtitle">
          <span className="hero__subtitle-rule" />
          Comunidad que nutre
          <span className="hero__subtitle-rule" />
        </p>
        <div className="hero__cta-row">
          <Link href="/unete" className="btn btn--lg btn--primary" onClick={() => window.scrollTo(0, 0)}>Conoce el camino</Link>
          <Link href="/producto" className="btn btn--lg btn--ghost-light" onClick={() => window.scrollTo(0, 0)}>Conoce el producto</Link>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label">DESCUBRE</span>
        <div className="hero__scroll-mouse"><div className="hero__scroll-wheel" /></div>
      </div>
    </section>
  )
}

/* ── SplitPreview ── */
function SplitPreview() {
  const [litBtn, setLitBtn] = useState(false)
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOrbClick = () => {
    if (litTimer.current) clearTimeout(litTimer.current)
    // Remove class for one frame so the animation always restarts
    setLitBtn(false)
    requestAnimationFrame(() => {
      setLitBtn(true)
      litTimer.current = setTimeout(() => setLitBtn(false), 1900)
    })
  }

  return (
    <section className="split" id="oportunidad" aria-label="La Oportunidad">

      {/* Conector central */}
      <div className="split__connector" aria-hidden="true">
        <span className="split__connector-line" />
        <div className="split__connector-orb" onClick={handleOrbClick}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        <span className="split__connector-line" />
      </div>

      {/* ── NIVEL 01 · Emprendedor ── */}
      <div className="split__half split__half--premium">
        <div className="split__content reveal reveal-delay-1">
          <span className="split__level">NIVEL · 01</span>
          <span className="split__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Emprendedor
          </span>
          <h2 className="split__title">Construye tu negocio<br /><em>a tu propio ritmo</em></h2>
          <p className="split__desc">Empieza a generar ingresos desde el primer día con el respaldo de un equipo comprometido. Un modelo probado y sostenible.</p>
          <ul className="split__features">
            {['Capacitaciones y actividades programadas', 'Acompañamiento continuo de tu sponsor', 'Comisiones desde el inicio', 'Comunidad activa de crecimiento personal'].map(f => (
              <li key={f} className="split__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>
          <Link href="/oportunidad" className={`btn btn--lg btn--premium${litBtn ? ' is-lit' : ''}`} onClick={() => window.scrollTo(0, 0)}>EXPLORAR OPORTUNIDAD →</Link>
        </div>
      </div>

      {/* ── NIVEL 02 · Distribuidor ── */}
      <div className="split__half split__half--master">
        <div className="split__content reveal reveal-delay-2">
          <span className="split__level">NIVEL · 02</span>
          <span className="split__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7L2 12l10 9 10-9-5-9z" />
            </svg>
            Distribuidor
          </span>
          <h2 className="split__title">Expande tu red<br /><em>y tus ganancias</em></h2>
          <p className="split__desc">Lleva CateonCook más lejos. Condiciones preferenciales, mayor margen y la posibilidad de abrir nuevos territorios.</p>
          <ul className="split__features">
            {['Todo lo incluido como Emprendedor', 'Compras al por mayor preferenciales', 'Mayor margen y bonos por volumen', 'Apertura de nuevos territorios'].map(f => (
              <li key={f} className="split__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>
          <p className="split__upgrade">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Continuación natural del nivel Emprendedor
          </p>
        </div>
      </div>

    </section>
  )
}

/* ── VocesSection ── */
const VOCES = [
  { fig: 'Fig. 03·a', name: <>María <em>Fernanda</em></>, role: 'Distribuidora', city: 'Loja',      years: '8',  yearsLabel: 'AÑOS · CC', quote: <>Aquí no encontré un negocio. Encontré una <span className="em-gold">familia</span> que me empujó a convertirme en la mejor versión de mí misma.</>, portrait: '/img/voces-1.jpg', initial: 'M' },
  { fig: 'Fig. 03·b', name: <>Verónica <em>Pacheco</em></>, role: 'Distribuidora', city: 'Cuenca',   years: '6',  yearsLabel: 'AÑOS · CC', quote: <>Empecé vendiendo a tres amigas. Hoy mi equipo de cuarenta socias cocina por <span className="em-gold">todo el austro.</span></>, portrait: '/img/voces-2.jpg', initial: 'V' },
  { fig: 'Fig. 03·c', name: <>Andrés <em>Maldonado</em></>, role: 'Emprendedor',  city: 'Quito',     years: '2',  yearsLabel: 'AÑOS · CC', quote: <>Lo que me sostuvo no fueron las comisiones — fue saber que mi sponsor estaba <span className="em-gold">a un mensaje.</span></>, portrait: '/img/voces-3.jpg', initial: 'A' },
  { fig: 'Fig. 03·d', name: <>Luisa <em>Terán</em></>, role: 'Mentora',      city: 'Guayaquil', years: '4',  yearsLabel: 'AÑOS · CC', quote: <>Llegué buscando un ingreso extra. Encontré una <span className="em-gold">segunda profesión</span> y una segunda familia.</>, portrait: '/img/voces-4.jpg', initial: 'L' },
  { fig: 'Fig. 03·e', name: <>Carolina <em>Ávila</em></>, role: 'Directora',   city: 'Ambato',    years: '12', yearsLabel: 'AÑOS · CC', quote: <>Construí mi propia oficina, mi propio equipo y, sobre todo, <span className="em-gold">mi propia voz.</span></>, portrait: '/img/voces-5.jpg', initial: 'C' },
]
const CALLOUT_IMGS = ['/img/prod-01-innove.jpg', '/img/prod-03-novel.jpg', '/img/prod-04-nonstick.jpg', '/img/prod-02-5ply.jpg']

function VocesSection() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(() => setIdx(i => (i + 1) % VOCES.length), 7000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [idx, paused])

  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % CALLOUT_IMGS.length), 3200)
    return () => clearInterval(t)
  }, [])

  const current = VOCES[idx]
  const total = VOCES.length
  const advanceImg = () => setImgIdx(i => (i + 1) % CALLOUT_IMGS.length)

  return (
    <section
      className="section section--cream voces"
      id="voces"
      aria-label="Voces de la comunidad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="section__corner-fig">Fig. 03 · Voces</span>
      <div className="section__inner">
        <div className="voces__product">
          <div className="voces__product-strip">
            <div className="voces__product-imgs" onClick={advanceImg} role="button" tabIndex={0} aria-label="Ver siguiente imagen del producto" onKeyDown={e => e.key === 'Enter' && advanceImg()}>
              {CALLOUT_IMGS.map((src, i) => (
                <img key={i} src={src} alt="" className={`voces__product-img${i === imgIdx ? ' is-active' : ''}`} />
              ))}
              <div className="voces__product-dots" aria-hidden="true">
                {CALLOUT_IMGS.map((_, i) => <span key={i} className={`voces__product-dot${i === imgIdx ? ' is-active' : ''}`} />)}
              </div>
            </div>
            <div className="voces__product-text">
              <span className="section__eyebrow"><span className="section__eyebrow-rule" />El producto</span>
              <h3 className="voces__product-title">Cocina sin agua, <em>sin grasa,</em> sin dolor.</h3>
            </div>
            <div className="voces__product-specs">
              <div className="voces__product-spec"><span className="voces__product-num">9<em>+</em></span><span className="voces__product-label">capas de acero</span></div>
              <div className="voces__product-spec"><span className="voces__product-num">50<em>%</em></span><span className="voces__product-label">menos energía</span></div>
              <div className="voces__product-spec"><span className="voces__product-num">∞</span><span className="voces__product-label">garantía vitalicia</span></div>
            </div>
            <Link href="/producto" className="btn btn--primary" onClick={() => window.scrollTo(0, 0)}>Conoce el producto →</Link>
          </div>
        </div>

        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />Comunidad</span>
            <h2 className="section__title">Quinientas voces,<br /><em>un mismo eco.</em></h2>
          </div>
          <p className="section__lede">
            Cada socio que se suma a CateonCook acepta que lo llames y le hagas todas las
            preguntas que quieras antes de unirte. Estas son cinco voces que ya pasaron por
            esta misma página.
          </p>
        </div>

        <div className="voces__feature">
          <div className="voces__portrait">
            <span className="voces__portrait-fig">{current.fig}</span>
            {VOCES.map((v, i) => (
              <div key={i} className={`voces__portrait-img${i === idx ? ' is-active' : ''}`} style={{ backgroundImage: `url(${v.portrait})` }} aria-hidden={i !== idx} />
            ))}
            <span className="voces__portrait-mark" aria-hidden="true">{current.initial}.</span>
          </div>
          <div className="voces__quote-col">
            <div>
              <div className="voces__quote-mark" aria-hidden="true">"</div>
              <p key={idx} className="voces__quote-text">{current.quote}"</p>
            </div>
            <div className="voces__strip" role="tablist" aria-label="Seleccionar testimonio">
              <div className="voces__strip-label">
                <span>Las voces</span>
                <span className="voces__counter">{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              </div>
              {VOCES.map((v, i) => (
                <button key={i} role="tab" aria-selected={i === idx} className={`voces__thumb${i === idx ? ' is-active' : ''}`} onClick={() => setIdx(i)}>
                  <div className="voces__thumb-img" style={{ backgroundImage: `url(${v.portrait})` }} />
                  <div className="voces__thumb-bar" aria-hidden="true"><span className="voces__thumb-bar-fill" /></div>
                  <span className="voces__thumb-name">{v.initial}. {v.role}</span>
                  <span className="voces__thumb-meta">{v.city} · {v.years} años</span>
                </button>
              ))}
            </div>
            <div className="voces__attr">
              <div>
                <div className="voces__attr-name">{current.name}</div>
                <div className="voces__attr-meta">{current.role} · {current.city}</div>
              </div>
              <div className="voces__attr-divider" />
              <div>
                <div className="voces__attr-num">{current.years}</div>
                <div>{current.yearsLabel}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="voces__nav">
          <button className="voces__nav-btn" onClick={() => setIdx(i => (i - 1 + total) % total)} aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="voces__nav-btn" onClick={() => setIdx(i => (i + 1) % total)} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
          <span>Cinco socios · cinco ciudades · una misma red</span>
          <div className="voces__nav-cta">
            <Link href="/nosotros" className="btn btn--lg btn--premium" onClick={() => window.scrollTo(0, 0)}>Conoce a la familia →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CommunityMarquee ── */
function CommunityMarquee() {
  const items = [
    <>Loja <em>· 8 años</em></>, <>Cuenca <em>· 6 años</em></>, <>Quito <em>· 22 años</em></>,
    <>Guayaquil <em>· 11 años</em></>, <>Ambato <em>· 4 años</em></>, <>Manta <em>· 3 años</em></>,
    <>Riobamba <em>· 7 años</em></>, <>Ibarra <em>· 5 años</em></>, <>Machala <em>· 9 años</em></>,
    <>Esmeraldas <em>· 2 años</em></>,
  ]
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((it, i) => (
          <span key={i} className="marquee__item">{it}<span className="marquee__sep" /></span>
        ))}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="htrans-bg">
        <HeroTransition />
      </div>
      <SplitPreview />
      <div className="htrans-bg" aria-hidden="true" />
      <VocesSection />
      <CommunityMarquee />
      <SectionDivider direction="cream-to-dark" targetSelector=".footer" />
    </main>
  )
}
