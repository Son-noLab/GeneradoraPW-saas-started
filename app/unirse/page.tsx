import { createClient } from '@/lib/supabase/server'
import Header        from '@/components/landing/header'
import Footer        from '@/components/landing/footer'
import UnirseForm    from '@/components/unirse/form'
import StickyProcess from '@/components/unirse/sticky-process'
import DocsGrid      from '@/components/unirse/docs-grid'

export default async function UnirsePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  return (
    <>
      <Header user={user} />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="unirse-hero">
          <div className="unirse-hero__bg" aria-hidden="true" />
          <div className="container">
            <div className="unirse-hero__inner">
              <span className="label" style={{ color: 'rgba(237,241,248,0.5)', letterSpacing: '.2em' }}>
                Comunidad que Nutre · Ecuador
              </span>
              <h1 className="unirse-hero__title">
                Únete a la<br />
                <em>Fábrica de Sueños</em>
              </h1>
              <p className="unirse-hero__subtitle">
                Cateon Cook es un territorio que desarrolla socios estratégicos — impulsándolos a alcanzar
                crecimiento personal, profesional y competitivo a través del plan de mercadeo más sólido
                de la industria Royal Prestige en Ecuador.
              </p>
              <a href="#formulario" className="btn btn--sky" style={{ alignSelf: 'flex-start' }}>
                Llenar solicitud
              </a>
            </div>
          </div>
        </section>

        {/* ── PROCESO (sticky scroll) ───────────────────────────────── */}
        <StickyProcess />

        {/* ── VIDEO CASTING ─────────────────────────────────────────── */}
        <section className="unirse-casting">
          <div className="container">
            <div className="unirse-casting__inner">
              <div className="unirse-casting__text">
                <span className="label" style={{ color: 'var(--c-sky)', letterSpacing: '.15em' }}>Paso adicional recomendado</span>
                <h2 className="unirse-casting__title">Video Casting</h2>
                <p className="unirse-casting__desc">
                  Tu video de presentación nos permite conocerte antes de la entrevista — tu energía,
                  tu motivación y tu alineación con la cultura CateonCook. No necesitas producción
                  profesional: solo autenticidad.
                </p>
                <div className="unirse-casting__instrucciones">
                  <h4>¿Qué incluir en tu video?</h4>
                  <ul>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      Preséntate: nombre, ciudad, a qué te dedicas actualmente
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      ¿Por qué quieres ser parte de la Fábrica de Sueños?
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      ¿Qué sueño quieres construir dentro del Territorio?
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      Duración recomendada: 1 a 3 minutos
                    </li>
                  </ul>
                  <div className="unirse-casting__plataformas">
                    <span>Sube tu video a YouTube (no listado) o Google Drive y pega el link en el formulario.</span>
                  </div>
                </div>
              </div>
              <div className="unirse-casting__preview" aria-hidden="true">
                <div className="unirse-casting__cam">
                  <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="8" width="60" height="44" rx="4" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M62 22l16-10v36l-16-10V22z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                    <circle cx="32" cy="30" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="32" cy="30" r="4" fill="currentColor" opacity="0.3"/>
                  </svg>
                </div>
                <div className="unirse-casting__tip">
                  <strong>Tip</strong>: Graba en un lugar bien iluminado con fondo limpio. La primera impresión cuenta.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FORMULARIO ────────────────────────────────────────────── */}
        <section className="unirse-form-section" id="formulario">
          <div className="container">
            <div className="unirse-form-wrap">
              <div className="unirse-form-header">
                <span className="label" style={{ color: 'var(--c-sky)', letterSpacing: '.15em' }}>Solicitud de ingreso</span>
                <h2>Completa tu solicitud</h2>
                <p>
                  Todos los datos son tratados con confidencialidad. Después de enviar tu solicitud,
                  un miembro del equipo se comunicará contigo en un plazo de 24–48 horas.
                </p>
              </div>
              <UnirseForm />
            </div>
          </div>
        </section>

        {/* ── DOCUMENTACIÓN ─────────────────────────────────────────── */}
        <section className="unirse-docs">
          <div className="container">
            <div className="unirse-docs__inner">
              <h3 className="unirse-docs__titulo">Documentación requerida</h3>
              <p className="unirse-docs__intro">
                Para agilizar tu proceso, prepara estos documentos antes de tu entrevista con el Sponsor.
              </p>
              <DocsGrid />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
