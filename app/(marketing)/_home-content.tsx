'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LogoStacked, BrandLogo } from '@/components/marketing/logo'
import SectionDivider from '@/components/marketing/section-divider'
import SplitChart from '@/components/marketing/split-chart'
import PageHero from '@/components/marketing/page-hero'
import { useModal } from '@/components/marketing/shell'
import { useLenis } from '@/components/lenis-provider'

/* ── Title Cube ── */
// Pool restringido únicamente a la carpeta curada "Eventos/TitleCube" (23 fotos) —
// randomizado por panel, sin repetir la misma foto dentro de una ventana de 7s.
// El contenedor es un letterbox panorámico (16/7) y las fotos son horizontales (3:2),
// así que el recorte de object-fit:cover siempre es vertical — `pos` ajusta esa banda
// por foto según dónde caen las caras (grupos cerrados vs. multitudes con brazos/banderas en alto).
const IMAGES: { src: string; pos: string }[] = [
  { name: '571a0853', pos: 'center 22%' },
  { name: '571a0886', pos: 'center 22%' },
  { name: '571a0926', pos: 'center 22%' },
  { name: '571a0986', pos: 'center 40%' },
  { name: '571a1011', pos: 'center 35%' },
  { name: '571a1082', pos: 'center 42%' },
  { name: '571a1142', pos: 'center 32%' },
  { name: '571a1146', pos: 'center 32%' },
  { name: '571a1173', pos: 'center 20%' },
  { name: '571a1180', pos: 'center 28%' },
  { name: '571a1190', pos: 'center 25%' },
  { name: '571a1210', pos: 'center 28%' },
  { name: 'img-0149', pos: 'center 42%' },
  { name: 'img-0784', pos: 'center 20%' },
  { name: 'img-0785', pos: 'center 32%' },
  { name: 'img-0787', pos: 'center 32%' },
  { name: 'img-0788', pos: 'center 20%' },
  { name: 'img-0789', pos: 'center 22%' },
  { name: 'img-0790', pos: 'center 25%' },
  { name: 'img-0791', pos: 'center 22%' },
  { name: 'img-0792', pos: 'center 20%' },
  { name: 'img-0793', pos: 'center 30%' },
  { name: 'img-0794', pos: 'center 28%' },
].map(({ name, pos }) => ({ src: `/img/eventos/${name}.jpg`, pos }))
const ROLE_CYCLE = ['title', 'image', 'image', 'title', 'image', 'image'] as const
const randomMs = () => Math.random() * 3200 + 2500
const NO_REPEAT_MS = 7000
const IMG_TRANSITION_MS = 1500

function TCubeImagePanel({ img, isActive, onClick }: { img: { src: string; pos: string }; isActive: boolean; onClick: () => void }) {
  // Stable per-mount Ken Burns offset — computed once and kept for the panel's whole
  // lifetime via useRef, so it never depends on the panel's DOM position (nth-child).
  // Previously the delay was assigned by nth-child, which reassigns itself the instant
  // a sibling panel unmounts — snapping the still-visible photo's zoom scale backwards
  // mid-animation. Tying it to the mounted instance instead makes the zoom continuous
  // for the panel's entire life, independent of any sibling mounting/unmounting.
  const kenBurnsDelay = useRef(-(Math.random() * 12)).current

  // The entrance keyframe animation only needs to run once, on mount. Left in place
  // forever, it collides with the exit fade later: when this panel eventually loses
  // `is-active`, the opacity change is meant to be handled by the plain CSS transition,
  // but a still-attached `forwards`-filled animation on the same property breaks that
  // transition's starting point, so it snaps straight to 0 instead of fading — reading
  // as a "fade to black" before the next photo appears instead of a clean crossfade.
  // Dropping the animation class the moment it actually finishes (not a guessed
  // timeout) leaves the transition as the sole owner of opacity from then on.
  const [entering, setEntering] = useState(true)
  const elRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const onEnd = (e: AnimationEvent) => { if (e.animationName === 'mk-tcubeEnter') setEntering(false) }
    el.addEventListener('animationend', onEnd)
    return () => el.removeEventListener('animationend', onEnd)
  }, [])

  return (
    <div ref={elRef} className={`tcube-panel${isActive ? ' is-active' : ''}${entering ? ' tcube-panel--enter' : ''}`}>
      <div
        className="tcube-image"
        onClick={onClick}
        role="button"
        tabIndex={isActive ? 0 : -1}
        aria-label="Cambiar imagen"
        onKeyDown={e => e.key === 'Enter' && onClick()}
      >
        <img
          src={img.src}
          alt="comunidad · cateoncook"
          className="tcube-image__photo"
          style={{ objectPosition: img.pos, animationDelay: `${kenBurnsDelay}s` }}
          data-pos-y={img.pos.split(' ')[1]?.replace('%', '') ?? '50'}
        />
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
  // `active` carries a unique instance id alongside the image index (not just the index)
  // so that when it later moves into `retiring`, it keeps the exact same React key —
  // that's what lets the same DOM node persist and its CSS opacity *transition* smoothly
  // instead of remounting fresh (which would skip straight to the end state, no fade).
  const [active, setActive] = useState<{ id: number; idx: number } | null>(null)
  // Every photo that's fading out lives here independently, each removing itself off its
  // own timer. A click must always respond immediately — it can't wait for whatever was
  // showing before to finish fading — so instead of a single "prev" slot (which forces a
  // choice between dropping the still-fading photo or delaying the click), each outgoing
  // photo gets its own slot and finishes on its own clock no matter how fast the next
  // click arrives.
  const [retiring, setRetiring] = useState<{ id: number; idx: number }[]>([])
  const [glare, setGlare] = useState(false)

  const isTitleRef = useRef(true)
  const activeRef = useRef<{ id: number; idx: number } | null>(null)
  const nextIdRef = useRef(0)
  const cycleRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glareRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

  // Moves whatever's currently active into the retiring set, on its own removal timer —
  // independent of anything that happens afterward, so it always gets to finish its fade.
  function retireCurrentImage() {
    const cur = activeRef.current
    if (!cur) return
    setRetiring(list => [...list, cur])
    setTimeout(() => {
      setRetiring(list => list.filter(r => r.id !== cur.id))
    }, IMG_TRANSITION_MS)
  }

  function goToImage() {
    retireCurrentImage()
    const nextIdx = pickPoolImage(activeRef.current?.idx ?? null)
    const next = { id: nextIdRef.current++, idx: nextIdx }
    activeRef.current = next
    setActive(next)
    isTitleRef.current = false
    setIsTitle(false)
  }

  function goToTitle() {
    retireCurrentImage()
    activeRef.current = null
    setActive(null)
    isTitleRef.current = true
    setIsTitle(true)
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
        else goToImage()
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
      goToImage()
      consecutiveImagesRef.current = 1
    } else if (consecutiveImagesRef.current >= MAX_CONSECUTIVE_IMAGES || Math.random() < 0.11) {
      goToTitle()
      consecutiveImagesRef.current = 0
    } else {
      goToImage()
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
      {/* One flat list for every image panel, retiring + active together. Splitting these
          into a mapped array plus a separate conditional element (as before) nests the
          mapped array as a single child slot, which breaks React's key-based reuse across
          the two — a panel moving from `active` into `retiring` would remount as a fresh
          DOM node instead of keeping its element, silently skipping its fade-out
          transition. One `.map()` over a combined list keeps all keys in the same flat
          array, so the same panel is always recognized as the same element. */}
      {[
        ...retiring.map(r => ({ ...r, isActive: false })),
        ...(active ? [{ ...active, isActive: true }] : []),
      ].map(p => (
        <TCubeImagePanel key={`panel-${p.id}`} img={IMAGES[p.idx]} isActive={p.isActive} onClick={handleCubeClick} />
      ))}
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

/* ── CloudCrossing ── */
// A puffy cumulus silhouette built from many overlapping circles (soft radii,
// no two the same size) so the blurred result reads as one rounded puff
// instead of a scalloped chain of hard bumps.
function CloudShape({ x, y, scale, filterId, className }: { x: number; y: number; scale: number; filterId: string; className: string }) {
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${scale})`} filter={`url(#${filterId})`}>
      <ellipse cx="60" cy="40" rx="62" ry="22" />
      <circle cx="26" cy="26" r="21" />
      <circle cx="54" cy="14" r="27" />
      <circle cx="86" cy="22" r="21" />
      <circle cx="112" cy="33" r="15" />
    </g>
  )
}

function CloudFilterDefs({ fBack, fMid, fFront }: { fBack: string; fMid: string; fFront: string }) {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id={fBack} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={fMid} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={fFront} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
    </svg>
  )
}

// Parallax shared by every cloud crossing: each `.hclouds__layer` drifts at
// its own rate as the wrapper moves through the viewport.
function useCloudParallax(wrapRef: React.RefObject<HTMLDivElement | null>) {
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return
    const wrap = wrapRef.current
    if (!wrap) return
    const layers = Array.from(wrap.querySelectorAll<HTMLElement>('.hclouds__layer'))
    const speeds = [8, 18, 32]
    function onScroll() {
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / vh))
      layers.forEach((layer, i) => {
        const speed = speeds[i] ?? 16
        layer.style.transform = `translate3d(${progress * speed}px, ${progress * speed * 0.2}px, 0)`
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lenis.on('scroll', onScroll as any)
    onScroll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => lenis.off('scroll', onScroll as any)
  }, [lenis, wrapRef])
}

// Tall variant: spans from near the top of Hero down through the seam, so
// Confined to the crossing itself — clouds only ever appear in the
// transition band, never bleeding up into Hero's own content. They stay
// undrawn while Hero fills the viewport and toggle in/out as it's scrolled
// past — invisible again the moment the visitor scrolls back up into Hero.
function CloudCrossingTall({ id }: { id: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  useCloudParallax(wrapRef)
  const fBack = `${id}-cloud-back`, fMid = `${id}-cloud-mid`, fFront = `${id}-cloud-front`

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const wrap = wrapRef.current
    if (!hero || !wrap) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        wrap.classList.toggle('is-drawn', entry.intersectionRatio < 1)
      },
      { threshold: [0, 1.0] }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="hclouds hclouds--reveal" ref={wrapRef} aria-hidden="true">
      <CloudFilterDefs fBack={fBack} fMid={fMid} fFront={fFront} />
      <svg className="hclouds__layer hclouds__layer--back" viewBox="0 0 1600 200" preserveAspectRatio="xMidYMid slice">
        <CloudShape x={60} y={80} scale={1.7} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
        <CloudShape x={540} y={40} scale={1.35} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
        <CloudShape x={1000} y={95} scale={1.9} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
        <CloudShape x={1440} y={45} scale={1.4} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
      </svg>
      <svg className="hclouds__layer hclouds__layer--mid" viewBox="0 0 1600 200" preserveAspectRatio="xMidYMid slice">
        <CloudShape x={220} y={115} scale={1.1} filterId={fMid} className="hclouds__shape hclouds__shape--mid" />
        <CloudShape x={720} y={65} scale={0.95} filterId={fMid} className="hclouds__shape hclouds__shape--mid" />
        <CloudShape x={1220} y={120} scale={1.2} filterId={fMid} className="hclouds__shape hclouds__shape--mid" />
      </svg>
      <svg className="hclouds__layer hclouds__layer--front" viewBox="0 0 1600 200" preserveAspectRatio="xMidYMid slice">
        <CloudShape x={40} y={150} scale={0.7} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
        <CloudShape x={440} y={160} scale={0.6} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
        <CloudShape x={880} y={145} scale={0.78} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
        <CloudShape x={1340} y={155} scale={0.65} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
      </svg>
    </div>
  )
}

// Compact variant: a single-screen band for a boxed crossing (e.g. below the
// split view), where the cloud field only needs to fill a short strip.
function CloudCrossingBand({ id }: { id: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  useCloudParallax(wrapRef)
  const fBack = `${id}-cloud-back`, fMid = `${id}-cloud-mid`, fFront = `${id}-cloud-front`

  return (
    <div className="hclouds" ref={wrapRef} aria-hidden="true">
      <CloudFilterDefs fBack={fBack} fMid={fMid} fFront={fFront} />
      <svg className="hclouds__layer hclouds__layer--back" viewBox="0 0 1600 260" preserveAspectRatio="xMidYMid slice">
        <CloudShape x={40} y={90} scale={1.4} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
        <CloudShape x={560} y={140} scale={1.1} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
        <CloudShape x={1040} y={70} scale={1.6} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
        <CloudShape x={1440} y={130} scale={1.3} filterId={fBack} className="hclouds__shape hclouds__shape--back" />
      </svg>
      <svg className="hclouds__layer hclouds__layer--mid" viewBox="0 0 1600 260" preserveAspectRatio="xMidYMid slice">
        <CloudShape x={260} y={170} scale={0.9} filterId={fMid} className="hclouds__shape hclouds__shape--mid" />
        <CloudShape x={780} y={120} scale={0.8} filterId={fMid} className="hclouds__shape hclouds__shape--mid" />
        <CloudShape x={1280} y={190} scale={0.95} filterId={fMid} className="hclouds__shape hclouds__shape--mid" />
      </svg>
      <svg className="hclouds__layer hclouds__layer--front" viewBox="0 0 1600 260" preserveAspectRatio="xMidYMid slice">
        <CloudShape x={120} y={200} scale={0.55} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
        <CloudShape x={640} y={215} scale={0.62} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
        <CloudShape x={1160} y={205} scale={0.5} filterId={fFront} className="hclouds__shape hclouds__shape--front" />
      </svg>
    </div>
  )
}

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
            <BrandLogo key="horizontal" tone="positive" height={40} priority style={{ transform: 'scale(1.821921875)' }} />
          )}
        </div>
        <TitleCube onActiveChange={setIsTitle} />
        <p className="hero__subtitle">
          <span className="hero__subtitle-rule" />
          Comunidad que nutre
          <span className="hero__subtitle-rule" />
        </p>
        <div className="hero__cta-row">
          <button className="btn btn--lg btn--primary" onClick={openModal}>Sé parte de la fábrica</button>
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
        <SplitChart level={1} />
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
        <SplitChart level={2} />
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
            {['Mayores responsabilidades que nivel Emprendedor', 'Compras al por mayor preferenciales', 'Mayor margen y bonos por volumen', 'Apertura de nuevos territorios'].map(f => (
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
// Retratos reales del set "Testimonios" (curado aparte de la carpeta general de eventos).
// Fotos usadas sin recorte forzado (`size: 'cover'`); en las grupales, la voz del
// testimonio es la persona central/protagonista, no todo el grupo.
const VOCES = [
  { fig: 'Fig. 03·a', name: <>Jorge <em>Villacís</em></>, role: 'Emprendedor',      city: 'Ibarra', years: '1',  yearsLabel: 'AÑOS · CC', quote: <>Nadie me dijo que esto también sería <span className="em-gold">divertido.</span> Vine por el ingreso y me quedé por la gente.</>, portrait: '/img/eventos/571a1204.jpg', pos: 'center', size: 'cover', initial: 'J' },
  { fig: 'Fig. 03·b', name: <>Gabriela <em>Andrade</em></>, role: 'Distribuidor Junior',  city: 'Riobamba',     years: '3',  yearsLabel: 'AÑOS · CC', quote: <>Ganamos este reconocimiento como pareja. Construir el negocio <span className="em-gold">juntos</span> lo cambió todo entre nosotros.</>, portrait: '/img/eventos/571a0943.jpg', pos: 'center 25%', size: 'cover', initial: 'G' },
  { fig: 'Fig. 03·c', name: <>Diego <em>Salazar</em></>, role: 'Distribuidor 3', city: 'Quito',      years: '6',  yearsLabel: 'AÑOS · CC', quote: <>Subí a ese escenario porque mi equipo me empujó. El logro nunca fue mío — fue de <span className="em-gold">todos.</span></>, portrait: '/img/eventos/571a0880.jpg', pos: 'center 20%', size: 'cover', initial: 'D' },
  { fig: 'Fig. 03·d', name: <>Fernando <em>Rivas</em></>, role: 'Royal', city: 'Manta',   years: '9',  yearsLabel: 'AÑOS · CC', quote: <>Empecé sin saber hablar en público. Hoy tomo el micrófono porque tengo algo que <span className="em-gold">vale la pena contar.</span></>, portrait: '/img/eventos/571a0908.jpg', pos: 'center 20%', size: 'cover', initial: 'F' },
  { fig: 'Fig. 03·e', name: <>Patricia <em>Noboa</em></>, role: 'Blue',   city: 'Machala',    years: '14', yearsLabel: 'AÑOS · CC', quote: <>Cada trofeo que cargo representa años de gente que creyó en mí antes que yo misma. Esto apenas <span className="em-gold">empieza.</span></>, portrait: '/img/eventos/571a1214.jpg', pos: 'center 20%', size: 'cover', initial: 'P' },
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
              <div key={i} className={`voces__portrait-img${i === idx ? ' is-active' : ''}`} style={{ backgroundImage: `url(${v.portrait})`, backgroundPosition: v.pos, backgroundSize: v.size }} aria-hidden={i !== idx} />
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
                  <div className="voces__thumb-img" style={{ backgroundImage: `url(${v.portrait})`, backgroundPosition: v.pos, backgroundSize: v.size }} />
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
      <div className="hero-continuum">
        <div className="hero-continuum__bg" aria-hidden="true" />
        <div className="hero-continuum__vignette" aria-hidden="true" />
        <Hero />
        <div className="chapter-bridge">
          <CloudCrossingTall id="hero" />
          <HeroTransition />
        </div>
        <PageHero
          variant="dark"
          cornerFig="Cap. IV · Nosotros"
          title={<>Una familia<br /><em>que ya trazó</em><br />el camino.</>}
          lede="No somos una marca. Somos veintidós años de cocinas, decisiones y socios reales. Esta es la historia detrás de cada sistema de cocina que entregamos."
          meta={[
            { value: '2003', label: 'AÑO DE FUNDACIÓN' },
            { value: 'QUITO', label: 'CASA MATRIZ' },
            { value: '5 PAÍSES', label: 'PRESENCIA' },
          ]}
        />
      </div>
      <SplitPreview />
      <div className="split-bridge" aria-hidden="true">
        <CloudCrossingBand id="split" />
      </div>
      <VocesSection />
      <CommunityMarquee />
      <SectionDivider direction="cream-to-dark" targetSelector=".footer" />
    </main>
  )
}
