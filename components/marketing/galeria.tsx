'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from '@/components/lenis-provider'

interface Foto {
  src: string
  caption: string
  wide?: boolean
  tag: string
  title: string
  titleItalic: string
  story: string
}

const FOTOS: Foto[] = [
  {
    src: '/img/nos-1.jpg',
    caption: 'la familia · quito',
    wide: true,
    tag: 'Origen · Quito',
    title: 'La primera',
    titleItalic: 'mesa',
    story: 'Una tarde de enero, cuatro socios y una cocina prestada. Esa foto fue tomada antes de que supiéramos lo que Quito se volvería para la marca. El comienzo siempre se parece a esto: pequeño, real, imposible de ignorar.',
  },
  {
    src: '/img/cc-evento-001.jpg',
    caption: 'celebración · 2024',
    tag: 'Celebración · 2024',
    title: 'Cuando las metas',
    titleItalic: 'se vuelven fiesta',
    story: 'El segundo trimestre de 2024 cerró con números que nadie había prometido en voz alta. Decidimos que los logros merecen sala llena y aplausos de pie, rodeados de quienes los hicieron posibles.',
  },
  {
    src: '/img/nos-2.jpg',
    caption: 'cocina · comunidad',
    tag: 'Comunidad · Cocina',
    title: 'Donde el negocio',
    titleItalic: 'empieza',
    story: 'No en una oficina. En una cocina real, con un producto real, frente a personas reales. Así se construyó cada socio activo de CateonCook: desde el calor de una demostración que termina en cena.',
  },
  {
    src: '/img/eventos/571a0977.jpg',
    caption: 'comunidad · confianza',
    tag: 'Comunidad · Confianza',
    title: 'La bandera que',
    titleItalic: 'se levanta sola',
    story: 'Nadie tuvo que pedirles que la alzaran. Cuando un socio cree de verdad en lo que representa, el gesto sale solo: un pulgar arriba, una bandera al aire, la prueba más honesta de que aquí la confianza no se actúa, se vive.',
  },
  {
    src: '/img/nos-3.jpg',
    caption: 'capacitación · escuela cc',
    tag: 'Escuela CC · Formación',
    title: 'La escuela que',
    titleItalic: 'no tiene techo',
    story: 'Cada sesión de la Escuela CC transmite un estilo de vida: saber cocinar, saber compartir, saber liderar. El conocimiento que se enseña aquí vive hoy en las cocinas de cinco países.',
  },
  {
    src: '/img/cc-gala-001.jpg',
    caption: 'gala · aniversario',
    tag: 'Gala · Aniversario',
    title: 'Diez años',
    titleItalic: 'en una noche',
    story: 'La gala de aniversario es el momento donde la historia de la marca se vuelve visible. Trajes, medallas y la misma pregunta que siempre termina la noche: ¿qué sigue? La respuesta, como siempre, es más.',
  },
  {
    src: '/img/cc-medallas-001.jpg',
    caption: 'reconocimientos · ecuador',
    wide: true,
    tag: 'Reconocimientos · Nacional',
    title: 'Ecuador',
    titleItalic: 'de pie',
    story: 'Cuando el mapa de socios activos cubrió las cuatro regiones, organizamos la primera entrega nacional de reconocimientos. Cada medalla lleva el nombre de alguien que decidió no rendirse cuando el camino se puso difícil.',
  },
  {
    src: '/img/eventos/571a0986.jpg',
    caption: 'identidad · royal prestige',
    tag: 'Identidad · Royal Prestige',
    title: 'El símbolo que',
    titleItalic: 'todos reconocen',
    story: 'En cada evento, cientos de banderas se levantan al mismo tiempo. No es coreografía: es la señal de una red que entendió que representar la marca es también representarse a sí misma.',
  },
  {
    src: '/img/nos-4.jpg',
    caption: 'liderazgo · equipo',
    tag: 'Liderazgo · Equipo',
    title: 'El equipo que',
    titleItalic: 'forma equipos',
    story: 'Detrás de cada nueva línea de socios hay un líder que llegó primero, se equivocó primero y aprendió antes que nadie. Eso es CateonCook: una cadena de personas que eligen no crecer solos.',
  },
  {
    src: '/img/cc-star.jpg',
    caption: 'cateon star · premiación',
    tag: 'Cateon Star',
    title: 'El reconocimiento que',
    titleItalic: 'se gana dos veces',
    story: 'Cateon Star es el más aspirado de la red. No lo entrega la empresa: lo otorgan los propios socios. Para llegar aquí primero hay que ganar los números y después ganarse el respeto.',
  },
  {
    src: '/img/cc-confeti.jpg',
    caption: 'metas · 2024',
    tag: 'Metas · 2024',
    title: 'Confeti que',
    titleItalic: 'se ganó',
    story: 'Cada pieza de confeti de esta foto representa un cierre, una llamada contestada, una mesa que dijo sí. No regalamos celebraciones: las construimos juntos, y cada uno sabe exactamente qué pedazo le corresponde.',
  },
  {
    src: '/img/nos-5.jpg',
    caption: 'socios · austro',
    tag: 'Red · Austro',
    title: 'El Austro',
    titleItalic: 'también cocina',
    story: 'Cuenca y Loja escriben uno de los capítulos más sólidos de la red. Los socios del austro demostraron que la fuerza de CateonCook no depende de la capital: depende de la decisión de construir algo que dure.',
  },
  {
    src: '/img/cc-rp-team.jpg',
    caption: 'equipo · royal prestige',
    wide: true,
    tag: 'Royal Prestige · Equipo',
    title: 'Detrás del',
    titleItalic: 'mejor producto',
    story: 'El equipo Royal Prestige no vende: demuestra. Cada integrante conoce el producto de adentro hacia afuera porque lo usa en su propia cocina antes de presentarlo. No se puede transmitir lo que no se ha vivido.',
  },
  {
    src: '/img/nos-6.jpg',
    caption: 'producto · calidad',
    tag: 'Producto · Calidad',
    title: 'El estándar que',
    titleItalic: 'no se negocia',
    story: 'Royal Prestige lleva más de 75 años construyendo el mismo estándar. Lo que llevamos a cocinas ecuatorianas es exactamente eso: lo mejor que existe, para familias que merecen cocinar sin compromiso.',
  },
  {
    src: '/img/nos-7.jpg',
    caption: 'red · cinco países',
    tag: 'Red · Cinco Países',
    title: 'Una red que no',
    titleItalic: 'para en la frontera',
    story: 'Ecuador fue el comienzo. Hoy la red de socios CateonCook está activa en cinco países: la misma filosofía, distintos acentos, un solo propósito. Que cada familia tenga una cocina a la altura de sus sueños.',
  },
  {
    src: '/img/cc-mesa.jpg',
    caption: 'la mesa · todos',
    wide: true,
    tag: 'Filosofía · La Mesa',
    title: 'La mesa siempre',
    titleItalic: 'tiene espacio',
    story: 'Este es el principio que guía cada decisión de la marca: en CateonCook nadie se queda de pie. Si quieres un lugar, hay un lugar. El único requisito es llegar dispuesto a construir, no solo a sentarse.',
  },
  {
    src: '/img/cc-evento-003.jpg',
    caption: 'evento · ecuador',
    wide: true,
    tag: 'Evento · Ecuador',
    title: 'El Ecuador',
    titleItalic: 'que se mueve',
    story: 'Cuando convocamos un evento nacional, la respuesta siempre supera las expectativas. Los socios de CateonCook no solo asisten: organizan, celebran, conectan y continúan. Cada evento es el principio de algo más grande.',
  },
]

export default function GaleriaGrid() {
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
      <div className="fotos__grid">
        {FOTOS.map((f, i) => (
          <button
            key={i}
            type="button"
            className={`fotos__item${f.wide ? ' fotos__item--wide' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Ver historia: ${f.caption}`}
          >
            <Image
              src={f.src}
              alt={f.caption}
              fill
              className="fotos__img"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
            <span className="fotos__caption">
              <span className="fotos__caption-tag">{f.caption}</span>
              <span className="fotos__caption-cta">ver historia →</span>
            </span>
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
                alt={foto.caption}
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
