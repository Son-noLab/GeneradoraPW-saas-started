import { createClient }   from '@/lib/supabase/server'
import Link               from 'next/link'
import Header             from '@/components/landing/header'
import Footer             from '@/components/landing/footer'
import HistoriaSlider     from '@/components/nosotros/historia-slider'
import VaulkSection, { type VaulkCard } from '@/components/nosotros/vaulk-section'

export const metadata = {
  title: 'Nosotros — CateonCook | Comunidad que Nutre',
  description: 'La historia detrás de Comunidad que Nutre. Acompañamiento, formación y cumplimiento de sueños en el Territorio CateonCook.',
}

const MVV: VaulkCard[] = [
  {
    titulo: 'Desarrollamos socios estratégicos',
    nombre: 'Misión',
    desc:   'Impulsar a nuestros distribuidores a alcanzar crecimiento personal, profesional y competitivo a través del plan de mercadeo más sólido de la industria Royal Prestige en Ecuador — sin techo, sin límites.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    titulo: 'El Territorio más reconocido',
    nombre: 'Visión',
    desc:   'Ser el Territorio de Royal Prestige más reconocido del Ecuador por su cultura organizacional, la calidad humana de sus miembros y el impacto real en la vida de las familias ecuatorianas.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    titulo: 'Transformar vidas',
    nombre: 'Propósito',
    desc:   'No vendemos utensilios — nutrimos proyectos de vida. Cada familia que conoce Royal Prestige y cada emprendedor que se une a nuestro equipo es un capítulo más de nuestra historia de impacto real.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
]

const VALORES: VaulkCard[] = [
  {
    nombre: 'Soy Emprendedor',
    titulo: 'Determinación sin excusas',
    desc:   'Actuamos con decisión y sin pretextos. Convertimos los obstáculos en aprendizaje y el aprendizaje en resultados. Just do it.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    nombre: 'Soy Auténtico',
    titulo: 'Honestidad radical',
    desc:   'Somos radicalmente honestos. Si algo es bueno para nosotros, lo compartimos. Agregamos valor como forma de vida — no solo de negocio.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    nombre: 'Soy Íntegro',
    titulo: 'Hacemos lo correcto',
    desc:   'Hacemos lo correcto incluso cuando nadie nos ve. La confianza se construye acción a acción — y nosotros construimos para siempre.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    nombre: 'Soy Apasionado',
    titulo: 'Amor por lo que hacemos',
    desc:   'Amamos lo que hacemos y se nota en cada interacción. Nuestra energía es contagiosa porque es genuina — y genuina porque nace del propósito.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
]

const PRINCIPIOS: VaulkCard[] = [
  {
    titulo: 'Crecemos con Propósito',
    desc:   'Cada acción está alineada con un resultado concreto. No solo trabajamos duro — trabajamos con intención, sabiendo exactamente a dónde nos dirigimos y por qué.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    titulo: 'Resistimos con Disciplina',
    desc:   'Nuestro ambiente ordenado y feliz no es un accidente — es el resultado de una cultura construida con intención, día a día, sin excusas y con determinación.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    titulo: 'Servimos con Amor',
    desc:   'Agregamos valor como forma de vida. Cada cliente, cada compañero, cada encuentro es una oportunidad para nutrir a alguien más y dejar una huella positiva.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    titulo: 'Nos Nutrimos Mutuamente',
    desc:   'La comunidad es nuestra fortaleza. Tu éxito es el éxito de todos — y el de todos, el tuyo. Nadie crece solo dentro del Territorio CateonCook.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
]

const PILARES: VaulkCard[] = [
  {
    titulo: 'Sponsor Dedicado',
    desc:   'Tu Distribuidor te acompaña desde el primer día. Guía personal, mentoría directa y comunicación constante para que nunca te sientas solo en el camino.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    titulo: 'Capacitaciones Programadas',
    desc:   'Formación continua en ventas, liderazgo, producto y gestión del negocio — presencial en el Centro de Negocios República y virtual para todo el país.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    titulo: 'Centro de Negocios República',
    desc:   'Tu espacio físico de trabajo, reuniones y presentaciones. Un ambiente profesional que refleja la cultura y los valores que nos definen como Territorio.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    titulo: 'Plan de Crecimiento Claro',
    desc:   'Un camino definido hacia cada nivel del plan de mercadeo Royal Prestige. Sabes exactamente dónde estás, qué sigue y cómo lograrlo — sin ambigüedad.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

export default async function NosotrosPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  return (
    <>
      <Header user={user} />
      <main>

        {/* ── HERO ──────────────────────────────────────── */}
        <section className="nos-hero">
          <div className="nos-hero__bg" aria-hidden="true" />
          <div className="container">
            <div className="nos-hero__inner">
              <span className="label" style={{ color: 'rgba(237,241,248,0.45)', letterSpacing: '.2em' }}>
                CateonCook · Ecuador · Desde 2010
              </span>
              <h1 className="nos-hero__title">
                La comunidad<br />
                <em>que Nutre</em>
              </h1>
              <p className="nos-hero__sub">
                Más que una empresa de venta directa — somos un territorio de emprendedores
                que se desarrollan juntos, transformando hogares, construyendo sueños y
                creciendo sin límites dentro del plan de mercadeo Royal Prestige.
              </p>
              <div className="nos-hero__actions">
                <Link href="/unirse" className="btn btn--sky">Únete al Territorio</Link>
                <a href="#historia" className="btn btn--ghost-white">Nuestra historia</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── HISTORIA + TIMELINE ───────────────────────── */}
        <HistoriaSlider />

        {/* ── MISIÓN / VISIÓN / PROPÓSITO ───────────────── */}
        <VaulkSection
          label="Nuestra identidad"
          titulo="Lo que nos mueve"
          intro="Tres pilares que definen por qué existimos, hacia dónde vamos y el impacto que queremos dejar en cada persona que toca el Territorio CateonCook."
          cards={MVV}
          dark
          cols={3}
        />

        {/* ── VALORES ───────────────────────────────────── */}
        <VaulkSection
          label="Quiénes somos"
          titulo="Nuestros valores"
          intro="Cuatro compromisos que definen cómo pensamos, cómo actuamos y cómo crecemos juntos — en el negocio y en la vida."
          cards={VALORES}
        />

        {/* ── PRINCIPIOS ────────────────────────────────── */}
        <VaulkSection
          label="Cómo operamos"
          titulo="Principios del Territorio"
          intro="Los cuatro principios que guían cada decisión, cada interacción y cada resultado dentro de CateonCook."
          cards={PRINCIPIOS}
          dark
        />

        {/* ── ACOMPAÑAMIENTO ────────────────────────────── */}
        <VaulkSection
          label="Tu red de soporte"
          titulo="Acompañamiento y Formación"
          intro="Nadie empieza solo en el Territorio. Desde el día uno cuentas con un sistema completo de respaldo diseñado para que alcances tu máximo potencial."
          cards={PILARES}
        />


        {/* ── CTA ───────────────────────────────────────── */}
        <section className="nos-cta">
          <div className="container">
            <h2 className="nos-cta__title">
              ¿Cuál será<br /><em>tu capítulo?</em>
            </h2>
            <p className="nos-cta__sub">
              Esta historia la escribimos juntos. Si sientes que hay más en ti — un sueño que
              merece ser construido con las herramientas correctas y el equipo correcto —
              este es tu momento.
            </p>
            <div className="nos-cta__actions">
              <Link href="/unirse" className="btn btn--sky">Solicitar ingreso</Link>
              <Link href="/producto" className="btn btn--ghost-white">Conocer el producto</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
