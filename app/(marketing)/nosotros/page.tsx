import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/marketing/page-hero'
import SectionDivider from '@/components/marketing/section-divider'

/* ── Historia ── */
function HistoriaSection() {
  const stats = [
    { n: <>+500</>,         l: 'FAMILIAS SOCIAS' },
    { n: <>24</>,           l: 'PROVINCIAS' },
    { n: <>05</>,           l: 'PAÍSES' },
    { n: <>20<em>+</em></>, l: 'AÑOS' },
  ]
  return (
    <section className="section section--dark" aria-label="Historia">
      <span className="section__corner-fig">Fig. 01 · Familia</span>
      <div className="section__inner">
        <div className="nosotros__grid">
          <div className="nosotros__photos">
            <div className="nosotros__photo">
              <Image src="/img/cc-gala-002.jpg" alt="Socios CateonCook gala" className="nosotros__photo-img" width={600} height={450} loading="lazy" />
              <span className="nosotros__photo-caption">socios · gala · 2024</span>
            </div>
            <div className="nosotros__photo">
              <Image src="/img/cc-rp-equipo.jpg" alt="Equipo Royal Prestige" className="nosotros__photo-img" width={600} height={450} loading="lazy" />
              <span className="nosotros__photo-caption">equipo · Royal Prestige</span>
            </div>
            <div className="nosotros__photo">
              <Image src="/img/cc-medallas-002.jpg" alt="Reconocimientos 2024" className="nosotros__photo-img" width={600} height={450} loading="lazy" />
              <span className="nosotros__photo-caption">reconocimientos · 2024</span>
            </div>
          </div>

          <div className="nosotros__right">
            <p className="nosotros__lede">
              Empezamos con <em>una sola olla</em> y una promesa: que la cocina volvería a ser
              el centro de la casa. Veintidós años después, cada socio que se suma extiende esa
              misma promesa a una familia más.
            </p>
            <div className="nosotros__stats">
              {stats.map((s, i) => (
                <div key={i}>
                  <span className="nosotros__stat-num">{s.n}</span>
                  <div className="nosotros__stat-label">{s.l}</div>
                </div>
              ))}
            </div>
            <blockquote className="nosotros__quote">
              <span className="nosotros__quote-fig">Fig. 01·a</span>
              <p className="nosotros__quote-text">
                "Aquí no encontré un negocio. Encontré una familia que me empujó a convertirme
                en la mejor versión de mí misma."
              </p>
              <div className="nosotros__quote-attr">
                <strong>María Fernanda · Distribuidora</strong> · Loja, 8 años con CC
              </div>
            </blockquote>
            <Link href="/unete" className="btn btn--lg btn--premium" style={{ marginTop: 'auto' }}>Empezar mi camino →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Timeline ── */
function TimelineSection() {
  const rows = [
    { year: '2003', title: <>La primera <em>olla</em></>,
      desc: 'Catalina y Eón fundan CateonCook en su propia cocina, en Quito. Una caja de Royal Prestige y diez clientes que terminaron siendo socios.' },
    { year: '2008', title: <>El primer <em>territorio</em></>,
      desc: 'Apertura de la oficina de Guayaquil. Los primeros 50 socios cruzan las cifras de Quito y demuestran que el modelo viaja.' },
    { year: '2014', title: <>Cruzamos <em>fronteras</em></>,
      desc: 'CateonCook abre operaciones en Perú y Colombia. La fábrica deja de ser un proyecto familiar y se vuelve regional.' },
    { year: '2019', title: <>La <em>escuela</em></>,
      desc: 'Lanzamos la Escuela CC: un programa de capacitación continua para socios, con cocina práctica, finanzas personales y liderazgo.' },
    { year: '2024', title: <>500 <em>familias</em></>,
      desc: 'Llegamos a la marca de quinientas familias socias activas. Una mesa que ahora se sirve en cinco países y 24 provincias del Ecuador.' },
  ]
  return (
    <section className="section section--dark" aria-label="Línea de tiempo">
      <span className="section__corner-fig">Fig. 02 · Cronología</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />Línea de tiempo</span>
            <h2 className="section__title">Veintidós años,<br /><em>una sola mesa.</em></h2>
          </div>
        </div>
        <div className="timeline">
          {rows.map(r => (
            <div key={r.year} className="timeline__row">
              <div className="timeline__year">{r.year}</div>
              <div className="timeline__content">
                <h3 className="timeline__title">{r.title}</h3>
                <p className="timeline__desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Valores ── */
function ValoresSection() {
  const values = [
    { n: 'Valor · I',   title: <>Comunidad <em>que nutre</em></>,
      desc: 'No construimos red para sumar nombres. Cada socio entra solo cuando hay alguien que se compromete a acompañarlo.' },
    { n: 'Valor · II',  title: <>Honestidad <em>radical</em></>,
      desc: 'Mostramos los números reales, los buenos y los malos. Si no funciona para ti, te ayudamos a decirlo a tiempo.' },
    { n: 'Valor · III', title: <>Crecer <em>despacio</em></>,
      desc: 'Preferimos diez socios sólidos que cien apresurados. El tiempo es lo único que el negocio no puede comprar.' },
  ]
  return (
    <section className="section section--cream nosotros__valores" aria-label="Valores">
      <span className="section__corner-fig">Fig. 03 · Valores</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />En qué creemos</span>
            <h2 className="section__title">Tres valores<br />que <em>no se negocian.</em></h2>
          </div>
        </div>
        <div className="values" style={{ background: 'rgba(11,23,56,0.12)', border: '1px solid rgba(11,23,56,0.12)' }}>
          {values.map((v, i) => (
            <article key={i} className="value" style={{ background: 'var(--c-cream)', color: 'var(--c-ink)' }}>
              <div className="value__num" style={{ color: 'var(--c-gold)' }}>{v.n}</div>
              <h3 className="value__title" style={{ color: 'var(--c-ink)' }}>{v.title}</h3>
              <p className="value__desc" style={{ color: 'var(--c-muted)' }}>{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Galería ── */
function FotoSection() {
  const fotos = [
    { src: '/img/nos-1.jpg',           caption: 'la familia · quito',          wide: true  },
    { src: '/img/cc-evento-001.jpg',   caption: 'celebración · 2024'                       },
    { src: '/img/nos-2.jpg',           caption: 'cocina · comunidad'                       },
    { src: '/img/nos-3.jpg',           caption: 'capacitación · escuela cc'                },
    { src: '/img/cc-gala-001.jpg',     caption: 'gala · aniversario'                       },
    { src: '/img/cc-medallas-001.jpg', caption: 'reconocimientos · ecuador',   wide: true  },
    { src: '/img/nos-4.jpg',           caption: 'liderazgo · equipo'                       },
    { src: '/img/cc-star.jpg',         caption: 'cateon star · premiación'                 },
    { src: '/img/cc-confeti.jpg',      caption: 'metas · 2024'                             },
    { src: '/img/nos-5.jpg',           caption: 'socios · austro'                          },
    { src: '/img/cc-rp-team.jpg',      caption: 'equipo · royal prestige',     wide: true  },
    { src: '/img/nos-6.jpg',           caption: 'producto · calidad'                       },
    { src: '/img/nos-7.jpg',           caption: 'red · cinco países'                       },
    { src: '/img/cc-mesa.jpg',         caption: 'la mesa · todos',             wide: true  },
    { src: '/img/cc-evento-003.jpg',   caption: 'evento · ecuador',            wide: true  },
  ]
  return (
    <section className="section section--dark fotos" aria-label="Galería de la familia">
      <span className="section__corner-fig">Fig. 04 · Imágenes</span>
      <div className="section__inner">
        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />La familia en imágenes</span>
            <h2 className="section__title">Quinientas mesas,<br /><em>una sola historia.</em></h2>
          </div>
        </div>
      </div>
      <div className="fotos__grid">
        {fotos.map((f, i) => (
          <div key={i} className={`fotos__item${f.wide ? ' fotos__item--wide' : ''}`}>
            <Image
              src={f.src}
              alt={f.caption}
              fill
              className="fotos__img"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
            <span className="fotos__caption">{f.caption}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Redes sociales ── */
const REDES = [
  {
    name: 'Instagram',
    handle: '@cateoncook',
    href: 'https://www.instagram.com/cateoncook',
    active: true,
    desc: 'Recetas, logros y el detrás de cámara de quinientas cocinas reales.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'CateonCook',
    href: 'https://www.facebook.com/cateoncook',
    active: true,
    desc: 'Comunidad activa. Noticias, eventos y conversaciones de socios de todo el Ecuador.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@cateoncook',
    href: null,
    active: false,
    desc: 'Cocina sin grasa, en minutos. Royal Prestige en la pantalla de tu teléfono.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9a8.22 8.22 0 0 0 4.83 1.56V7.11a4.85 4.85 0 0 1-1.06-.42z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@cateoncook',
    href: null,
    active: false,
    desc: 'Capacitaciones, testimonios y el mundo CC en video.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+593 984 909 878',
    href: 'https://wa.me/593984909878',
    active: true,
    desc: 'Una pregunta directa. Sin formularios, sin tiempos de espera. La fábrica siempre contesta.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
]

function RedesSection() {
  return (
    <section className="section section--dark redes" aria-label="Redes sociales">
      <span className="section__corner-fig">Fig. 05 · Red</span>
      <div className="section__inner">
        <div className="redes__header reveal">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />La fábrica también vive aquí</span>
            <h2 className="section__title">Entra a la<br /><em>conversación.</em></h2>
          </div>
        </div>
        <div className="redes__grid">
          {REDES.map(r => {
            const inner = (
              <>
                <div className="red__icon">{r.icon}</div>
                <div className="red__body">
                  <span className="red__name">{r.name}</span>
                  <span className="red__handle">{r.handle}</span>
                  <p className="red__desc">{r.desc}</p>
                </div>
                {r.active
                  ? <span className="red__arrow" aria-hidden="true">↗</span>
                  : <span className="red__soon" aria-label="Próximamente">Próximamente</span>
                }
              </>
            )
            return r.active
              ? <a key={r.name} href={r.href!} target="_blank" rel="noopener noreferrer" className="red">{inner}</a>
              : <div key={r.name} className="red red--pending" aria-disabled="true">{inner}</div>
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Page ── */
export default function NosotrosPage() {
  return (
    <main>
      <PageHero
        variant="dark"
        chapter="Capítulo IV"
        current="Nosotros"
        cornerFig="Cap. IV · Nosotros"
        title={<>Una familia<br /><em>que ya trazó</em><br />el camino.</>}
        lede="No somos una marca. Somos veintidós años de cocinas, decisiones y socios reales. Esta es la historia detrás de cada olla que entregamos."
        meta={[
          { value: '2003', label: 'AÑO DE FUNDACIÓN' },
          { value: 'QUITO', label: 'CASA MATRIZ' },
          { value: '5 PAÍSES', label: 'PRESENCIA' },
        ]}
      />
      <HistoriaSection />
      <TimelineSection />
      <SectionDivider direction="dark-to-cream" targetSelector=".values" />
      <ValoresSection />
      <SectionDivider direction="cream-to-dark" targetSelector=".fotos" />
      <FotoSection />
      <RedesSection />
    </main>
  )
}
