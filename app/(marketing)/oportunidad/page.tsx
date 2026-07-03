import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/marketing/page-hero'
import SectionDivider from '@/components/marketing/section-divider'
import SplitChart from '@/components/marketing/split-chart'

export const metadata: Metadata = {
  title: 'Oportunidad · CateonCook — Fábrica de Sueños',
  description: 'Dos modelos, cuatro niveles, una sola promesa. Conoce el plan de mercadeo de CateonCook y empieza a construir tu negocio con respaldo real.',
}

function SplitFull() {
  return (
    <section className="split" aria-label="Modelo de socios">

      {/* Conector central de progresión */}
      <div className="split__connector" aria-hidden="true">
        <span className="split__connector-line" />
        <div className="split__connector-orb">
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
            {[
              'Acompañamiento de un sponsor durante 90 días',
              'Comisiones desde tu primera venta',
              'Capacitaciones semanales (online + presencial)',
              'Acceso a la comunidad activa de socios',
            ].map(f => (
              <li key={f} className="split__feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>
          <Link href="/unete#formulario" className="btn btn--lg btn--premium">UNIRME COMO EMPRENDEDOR →</Link>
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
            {[
              'Todo lo incluido en el plan de Emprendedor',
              'Compras al por mayor con precio preferencial',
              'Bonos por volumen y por estructura',
              'Apertura de nuevos territorios y eventos',
              'Acceso a viajes de incentivos internacionales',
            ].map(f => (
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

function LevelsSection() {
  const levels = [
    { n: '1', name: 'Emprendedor',         title: <>Tu primer <em>círculo</em></>, desc: 'Sin metas mensuales obligatorias.', bonus: 'Comisión directa' },
    { n: '2', name: 'Distribuidor Junior', title: <>Tu primer <em>equipo</em></>,  desc: 'Sumas a tres socios activos. Empiezas a recibir bonos de equipo.', bonus: 'Bono de equipo' },
    { n: '3', name: 'Distribuidor 1-3',    title: <>Tu primera <em>red</em></>,    desc: 'Una estructura de quince personas activas. Acceso a capacitación avanzada.', bonus: 'Bono de estructura' },
    { n: '4', name: 'Royal & Blue',        title: <>Tu propio <em>territorio</em></>, desc: 'Abres un territorio con apoyo institucional, oficinas y eventos propios.', bonus: 'Bono de territorio' },
  ]
  return (
    <section className="section section--dark" aria-label="Plan de mercadeo">
      <span className="section__corner-fig">Fig. 01 · Plan</span>
      <div className="section__inner">
        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />Plan de mercadeo</span>
            <h2 className="section__title">Cuatro niveles,<br /><em>un solo camino.</em></h2>
          </div>
          <p className="section__lede">
            Cada rango se construye desde lo cotidiano. Sin saltos imposibles, sin promesas
            irreales.
          </p>
        </div>
        <div className="levels">
          {levels.map(l => (
            <article key={l.n} className="level">
              <div className="level__num">{l.n}</div>
              <div className="level__name">Nivel {l.n} · {l.name}</div>
              <h3 className="level__title">{l.title}</h3>
              <p className="level__desc">{l.desc}</p>
              <div className="level__bonus">{l.bonus}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const items = [
    { fig: 'Fig. 02·a', quote: 'Empecé vendiendo a tres amigas. Hoy mi equipo de 40 socias cocina por todo el austro.', name: 'Verónica P.', meta: 'Distribuidora · Cuenca · 6 años' },
    { fig: 'Fig. 02·b', quote: 'Lo que me sostuvo no fueron las comisiones — fue saber que mi sponsor estaba a un mensaje.', name: 'Andrés M.', meta: 'Emprendedor · Quito · 2 años' },
    { fig: 'Fig. 02·c', quote: 'Llegué buscando un ingreso extra. Encontré una segunda profesión y una segunda familia.', name: 'Luisa T.', meta: 'Mentora · Guayaquil · 4 años' },
  ]
  return (
    <section className="section section--cream" aria-label="Testimoniales">
      <span className="section__corner-fig">Fig. 02 · Voces</span>
      <div className="section__inner">
        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Lo que dicen los socios
            </span>
            <h2 className="section__title">
              Tres voces,<br />
              <em>una sola fábrica.</em>
            </h2>
          </div>
          <p className="section__lede">
            Cada testimonio aquí presente acepta que lo
            llames y le hagas todas las preguntas que quieras antes de unirte.
          </p>
        </div>
        <div className="testis">
          {items.map((t, i) => (
            <article key={i} className="testi">
              <span className="testi__fig">{t.fig}</span>
              <p className="testi__quote">"{t.quote}"</p>
              <div className="testi__attr">
                <span className="testi__avatar" aria-hidden="true" />
                <span><strong>{t.name}</strong><br />{t.meta}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="cta-band">
          <div className="cta-band__text">
            <h3 className="cta-band__title">¿Listo para escribir <em>tu propio capítulo</em>?</h3>
            <p className="cta-band__desc">
              Un sponsor te contactará en menos de 24 horas hábiles para coordinar tu primera
              conversación. Sin compromiso.
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

export default function OportunidadPage() {
  return (
    <main>
      <PageHero
        variant="dark"
        chapter="Capítulo I"
        current="Oportunidad"
        cornerFig="Cap. I · Oportunidad"
        title={<>La <em>oportunidad</em><br />de cambiar<br />tu mesa.</>}
        lede="Una familia, una fábrica de sueños te recibe con una promesa: aquí encontrarás lo que tanto buscas."
        meta={[
          { value: '+500', label: 'FAMILIAS SOCIAS' },
          { value: '24', label: 'PROVINCIAS' },
          { value: '20+', label: 'AÑOS DE MARCA' },
        ]}
      />
      <SplitFull />
      <LevelsSection />
      <SectionDivider direction="dark-to-cream" targetSelector=".testis" />
      <TestimonialsSection />
    </main>
  )
}
