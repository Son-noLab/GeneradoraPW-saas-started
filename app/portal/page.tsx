import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PortalWelcome } from '@/components/portal/portal-welcome'

export default async function PortalPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const email = (data?.claims?.email as string) ?? ''

  const cards = [
    {
      href: '/portal/pedidos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      title: 'Pedidos y logística',
      desc: 'Consulta el estado de tus pedidos, fechas estimadas de entrega y tu historial de compras al por mayor.',
      cta: 'Ver pedidos →',
      stat: '2 pedidos activos',
    },
    {
      href: '/portal/capacitaciones',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      title: 'Capacitaciones',
      desc: 'Accede a los módulos formativos: producto, técnicas de venta, liderazgo y herramientas digitales.',
      cta: 'Ver módulos →',
      stat: '65 % completado',
    },
    {
      href: '/portal/soporte',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: 'Soporte',
      desc: 'Encuentra respuestas rápidas, revisa el estado de tus tickets y contacta directamente al equipo CC.',
      cta: 'Ir a soporte →',
      stat: '1 ticket abierto',
    },
  ]

  return (
    <div className="portal-page">
      <PortalWelcome email={email} />

      {/* Section header */}
      <div className="portal-page-header">
        <p className="portal-page-eyebrow">Tu espacio</p>
        <h1 className="portal-page-title">¿Qué necesitas hoy?</h1>
        <p className="portal-page-sub">
          Acceso rápido a tus herramientas como socio CateonCook.
        </p>
      </div>

      {/* Hub cards */}
      <div className="portal-hub">
        {cards.map(c => (
          <Link key={c.href} href={c.href} className="portal-hub-card">
            <div className="portal-hub-card__icon">{c.icon}</div>
            <div className="portal-hub-card__title">{c.title}</div>
            <div className="portal-hub-card__desc">{c.desc}</div>
            <div style={{
              marginTop: '0.5rem', padding: '8px 12px',
              background: 'var(--c-bg)', borderRadius: '4px',
              fontSize: '0.75rem', color: 'var(--c-text-muted)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>{c.stat}</span>
              <span style={{ color: 'var(--c-sky)', fontWeight: 600, letterSpacing: '0.04em' }}>{c.cta}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Links rápidos */}
      <div style={{
        background: 'var(--c-white)', border: '1px solid var(--c-border)',
        borderRadius: '6px', padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--c-navy)', marginBottom: '0.2rem' }}>
            ¿Necesitas agregar un nuevo socio a tu red?
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>
            Comparte el enlace de registro con tu prospecto.
          </div>
        </div>
        <Link href="/unete" style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '8px 18px',
          background: 'var(--c-navy)', color: '#fff',
          borderRadius: '3px', textDecoration: 'none',
        }}>
          Invitar socio →
        </Link>
      </div>
    </div>
  )
}
