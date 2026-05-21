import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import ImageViewer from '@/components/producto/image-viewer'
import { PRODUCTOS, getBySlug } from '@/lib/productos'
import { createClient } from '@/lib/supabase/server'

export function generateStaticParams() {
  return PRODUCTOS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getBySlug(slug)
  if (!p) return {}
  return {
    title: `${p.nombre} — Royal Prestige · CateonCook`,
    description: p.eslogan,
  }
}

const DISP_LABEL: Record<string, string> = {
  'inmediato':   'Disponible ahora',
  '3-7-dias':    '3–7 días hábiles',
  'bajo-pedido': 'Bajo pedido',
}
const DISP_DOT: Record<string, string> = {
  'inmediato':   '#22c55e',
  '3-7-dias':    '#f59e0b',
  'bajo-pedido': '#94a3b8',
}
const DIFICULTAD_COLOR: Record<string, string> = {
  'Fácil': '#22c55e',
  'Media': '#f59e0b',
  'Alta':  '#ef4444',
}

export default async function ProductoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const producto = getBySlug(slug)
  if (!producto) notFound()

  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  return (
    <>
      <Header user={user} solid />

      <main className="pdet-main">

        {/* ── BARRA SUPERIOR ──────────────────────────────────────── */}
        <div className="pdet-bar">
          <div className="container">
            <Link href="/producto" className="pdet-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Catálogo
            </Link>
            <span className="pdet-bar__sep">·</span>
            <span className="pdet-bar__nombre">{producto.nombre}</span>
          </div>
        </div>

        {/* ── ÁREA PRINCIPAL: GALERÍA + SPECS ─────────────────────── */}
        <section className="pdet-top">
          <div className="container">
            <div className="pdet-top__inner">

              {/* Galería */}
              <div className="pdet-gallery">
                <ImageViewer imgs={producto.imgs} nombre={producto.nombre} />
              </div>

              {/* Specs compacto */}
              <aside className="pdet-specs">
                {producto.badge && (
                  <span className="pdet-specs__badge">{producto.badge}</span>
                )}
                <span className="pdet-specs__serie">{producto.serie}</span>
                <h1 className="pdet-specs__nombre">{producto.nombre}</h1>
                <p className="pdet-specs__eslogan">{producto.eslogan}</p>

                {/* Disponibilidad */}
                <div className="pdet-specs__disp">
                  <span
                    className="pdet-specs__disp-dot"
                    style={{ background: DISP_DOT[producto.disponibilidad] }}
                  />
                  <span>{DISP_LABEL[producto.disponibilidad]}</span>
                </div>

                {/* Descripción corta */}
                <p className="pdet-specs__desc">{producto.descripcion}</p>

                {/* Características principales */}
                <div className="pdet-specs__caract">
                  <h3 className="pdet-specs__h3">Características</h3>
                  <ul className="pdet-specs__list">
                    {producto.caracteristicas.map(c => (
                      <li key={c}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Especificaciones técnicas */}
                <div className="pdet-specs__tabla">
                  <h3 className="pdet-specs__h3">Especificaciones</h3>
                  <dl className="pdet-specs__dl">
                    {Object.entries(producto.especificaciones).map(([k, v]) => (
                      <>
                        <dt key={`k-${k}`}>{k}</dt>
                        <dd key={`v-${k}`}>{v}</dd>
                      </>
                    ))}
                  </dl>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/593000000000?text=${encodeURIComponent(`Hola, me interesa el producto: ${producto.nombre} (${producto.serie}). ¿Pueden darme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--sky pdet-specs__cta"
                >
                  Consultar disponibilidad
                </a>
              </aside>

            </div>
          </div>
        </section>

        {/* ── RECETAS / PREPARACIONES ─────────────────────────────── */}
        {producto.recetas.length > 0 && (
          <section className="pdet-recetas">
            <div className="container">
              <div className="pdet-recetas__header">
                <span className="label section__label" style={{ color: 'var(--c-sky)' }}>
                  Inspiración culinaria
                </span>
                <h2 className="pdet-recetas__titulo">
                  Lo que puedes preparar
                </h2>
                <p className="pdet-recetas__subtitulo">
                  {producto.nombre} en acción — preparaciones reales que demuestran
                  por qué un buen instrumento transforma el resultado en el plato.
                </p>
              </div>

              <div className="pdet-recetas__grid">
                {producto.recetas.map((r, i) => (
                  <article key={i} className="prec">
                    <div className="prec__head">
                      <span
                        className="prec__dificultad"
                        style={{ color: DIFICULTAD_COLOR[r.dificultad] }}
                      >
                        {r.dificultad}
                      </span>
                      <span className="prec__tiempo">{r.tiempo}</span>
                    </div>
                    <h3 className="prec__nombre">{r.nombre}</h3>
                    <span className="prec__tecnica">{r.tecnica}</span>
                    <p className="prec__desc">{r.descripcion}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── NAVEGAR CATÁLOGO ────────────────────────────────────── */}
        <div className="pdet-nav">
          <div className="container">
            <Link href="/producto" className="btn btn--ghost-white">
              ← Ver catálogo completo
            </Link>
            <Link href="/unirse" className="btn btn--sky">
              Convertirme en distribuidor
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}
