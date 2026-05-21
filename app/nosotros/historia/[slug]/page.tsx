import { notFound }  from 'next/navigation'
import Link          from 'next/link'
import Image         from 'next/image'
import Header        from '@/components/landing/header'
import Footer        from '@/components/landing/footer'
import { MOMENTOS, getBySlug } from '@/lib/momentos'
import { createClient } from '@/lib/supabase/server'

export function generateStaticParams() {
  return MOMENTOS.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m = getBySlug(slug)
  if (!m) return {}
  return {
    title:       `${m.titulo} — CateonCook`,
    description: m.desc,
  }
}

export default async function MomentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const momento  = getBySlug(slug)
  if (!momento) notFound()

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  const parrafos = momento.detalle.split('\n\n')

  return (
    <>
      <Header user={user} solid />

      <main className="mdet-main">

        {/* ── BARRA NAV ──────────────────────────────────────── */}
        <div className="mdet-bar">
          <div className="container">
            <Link href="/nosotros#historia" className="mdet-back">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Nuestra historia
            </Link>
            <span className="mdet-bar__sep">·</span>
            <span className="mdet-bar__title">{momento.titulo}</span>
          </div>
        </div>

        {/* ── HERO: imagen + contenido ────────────────────────── */}
        <section className="mdet-hero">
          <div className="mdet-hero__bg" aria-hidden="true" />
          <div className="container">
            <div className="mdet-hero__inner">

              {/* Imagen */}
              <div className="mdet-hero__img-wrap">
                <Image
                  src={momento.img}
                  alt={momento.titulo}
                  fill
                  priority
                  sizes="(max-width: 860px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Contenido */}
              <div className="mdet-hero__content">
                <span className="label mdet-hero__label">{momento.fecha}</span>
                <h1 className="mdet-hero__titulo">{momento.titulo}</h1>
                <div className="mdet-hero__logro">{momento.logro}</div>
                <div className="mdet-hero__detalle">
                  {parrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mdet-hero__actions">
                  <Link href="/nosotros#historia" className="btn btn--ghost-white">
                    ← Ver todos los momentos
                  </Link>
                  <Link href="/unirse" className="btn btn--sky">
                    Únete al Territorio
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
