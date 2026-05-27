import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/marketing/page-hero'
import SectionDivider from '@/components/marketing/section-divider'

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
              <Image
                src="/img/cc-gala-002.jpg"
                alt="Socios CateonCook gala"
                className="nosotros__photo-img"
                width={600} height={450}
                loading="lazy"
              />
              <span className="nosotros__photo-caption">socios · gala · 2024</span>
            </div>
            <div className="nosotros__photo">
              <Image
                src="/img/cc-rp-equipo.jpg"
                alt="Equipo Royal Prestige"
                className="nosotros__photo-img"
                width={600} height={450}
                loading="lazy"
              />
              <span className="nosotros__photo-caption">equipo · Royal Prestige</span>
            </div>
            <div className="nosotros__photo">
              <Image
                src="/img/cc-medallas-002.jpg"
                alt="Reconocimientos 2024"
                className="nosotros__photo-img"
                width={600} height={450}
                loading="lazy"
              />
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
          </div>
        </div>
      </div>
    </section>
  )
}

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
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Línea de tiempo
            </span>
            <h2 className="section__title">
              Veintidós años,<br />
              <em>una sola mesa.</em>
            </h2>
          </div>
          <p className="section__lede">
            No nos volvimos grandes de un día para el otro. Cada paso fue una decisión deliberada
            de crecer despacio para crecer bien.
          </p>
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
    <section className="section section--cream" aria-label="Valores">
      <span className="section__corner-fig">Fig. 03 · Valores</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              En qué creemos
            </span>
            <h2 className="section__title">
              Tres valores<br />
              que <em>no se negocian.</em>
            </h2>
          </div>
          <p className="section__lede">
            Si tienes que escoger entre lo que vende más rápido y lo que cuida mejor, en
            CateonCook escogemos lo segundo. Siempre.
          </p>
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
        <div className="cta-band">
          <div className="cta-band__text">
            <h3 className="cta-band__title">¿Te gustaría que tu nombre <em>esté en la próxima década</em>?</h3>
            <p className="cta-band__desc">
              La fábrica sigue abierta. Una conversación de 30 minutos basta para saber si este
              es tu lugar.
            </p>
          </div>
          <div className="cta-band__actions">
            <Link href="/unete" className="btn btn--lg btn--dark">Empezar mi camino →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

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
    </main>
  )
}
