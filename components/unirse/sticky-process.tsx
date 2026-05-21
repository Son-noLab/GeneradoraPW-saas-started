'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const PASOS = [
  {
    num:    '001',
    titulo: 'Solicitud de Ingreso',
    desc:   'Completa el formulario digital con tus datos personales y profesionales. Adjunta tu hoja de vida y el link de tu video de presentación.',
    tag:    'Formulario · HV · Video',
    img:    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=90&auto=format&fit=crop',
  },
  {
    num:    '002',
    titulo: 'Entrevista con tu Sponsor',
    desc:   'Tu Distribuidor revisará tu perfil, validará referencias y te presentará en profundidad la oportunidad de negocio y la cultura organizacional.',
    tag:    'Presencial o virtual',
    img:    'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=1200&q=90&auto=format&fit=crop',
  },
  {
    num:    '003',
    titulo: 'Entrevista en el Territorio',
    desc:   'Evaluación final con los Territorios o Premiers en el Centro de Negocios República. Preguntas situacionales y valoración de afinidad cultural.',
    tag:    'Centro de Negocios República',
    img:    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=90&auto=format&fit=crop',
  },
  {
    num:    '004',
    titulo: '¡Bienvenido a la Fábrica!',
    desc:   'Firma de documentos, asignación de tu código de emprendedor y activación dentro del Territorio CateonCook. Tu sueño comienza aquí.',
    tag:    'Código · Activación',
    img:    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=90&auto=format&fit=crop',
  },
]

export default function StickyProcess() {
  const [active, setActive] = useState(0)
  const sectionRef          = useRef<HTMLElement>(null)
  const mediaRef            = useRef<HTMLDivElement>(null)
  const stepRefs            = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const media   = mediaRef.current
    if (!section || !media) return

    let startScroll = 0
    let endScroll   = 1

    const computeAnchors = () => {
      const sRect = section.getBoundingClientRect()
      const s0    = stepRefs.current[0]
      const sN    = stepRefs.current[PASOS.length - 1]
      if (!s0 || !sN) return
      const s0r = s0.getBoundingClientRect()
      const sNr = sN.getBoundingClientRect()
      const s0Rel = (s0r.top - sRect.top) + s0r.height / 2
      const sNRel = (sNr.top - sRect.top) + sNr.height / 2
      startScroll = s0Rel - window.innerHeight / 2
      endScroll   = sNRel - window.innerHeight / 2
    }

    computeAnchors()
    window.addEventListener('resize', computeAnchors)

    const onScroll = () => {
      // Image travel
      const sRect      = section.getBoundingClientRect()
      const scrolledIn = Math.max(0, -sRect.top)
      const range      = endScroll - startScroll
      if (range > 0) {
        const progress = Math.max(0, Math.min(1, (scrolledIn - startScroll) / range))
        media.style.transform = `translateY(${progress * window.innerHeight * 0.30}px)`
      }

      // Active step = whichever step center is closest to viewport midpoint
      const vpMid = window.innerHeight / 2
      let closest = 0
      let minDist = Infinity
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const { top, height } = el.getBoundingClientRect()
        const dist = Math.abs(top + height / 2 - vpMid)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActive(prev => prev === closest ? prev : closest)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', computeAnchors)
    }
  }, [])

  return (
    <section className="sp-section" ref={sectionRef}>

      <div className="container">
        <div className="sp-head">
          <span className="label sp-head__label">Tu camino</span>
          <h2 className="sp-head__title">Cómo funciona el proceso</h2>
          <p className="sp-head__sub">
            Cuatro pasos diseñados para que ingreses con una base sólida y un equipo que ya te espera.
          </p>
        </div>
      </div>

      <div className="sp-wrap">

        <div className="sp-sticky">
          <div className="sp-media" ref={mediaRef}>
            {PASOS.map((p, i) => (
              <div key={i} className={`sp-media__img${active === i ? ' sp-media__img--on' : ''}`}>
                <Image
                  src={p.img}
                  alt={p.titulo}
                  fill
                  sizes="50vw"
                  style={{ objectFit: 'cover' }}
                  priority={i === 0}
                />
              </div>
            ))}
            <div className="sp-frame" aria-hidden="true">
              <span className="sp-frame__c sp-frame__c--tl" />
              <span className="sp-frame__c sp-frame__c--tr" />
              <span className="sp-frame__c sp-frame__c--bl" />
              <span className="sp-frame__c sp-frame__c--br" />
            </div>
            <div className="sp-media__badge">
              <span className="sp-media__badge-num">{String(active + 1).padStart(2, '0')}</span>
              <span className="sp-media__badge-of">/ {PASOS.length}</span>
            </div>
          </div>
        </div>

        <div className="sp-steps">
          {PASOS.map((p, i) => (
            <div
              key={i}
              ref={el => { stepRefs.current[i] = el }}
              className={`sp-step${active === i ? ' sp-step--on' : ''}`}
            >
              <span className="sp-step__num">{p.num}</span>
              <h3 className="sp-step__titulo">{p.titulo}</h3>
              <p className="sp-step__desc">{p.desc}</p>
              <span className="sp-step__tag">{p.tag}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
