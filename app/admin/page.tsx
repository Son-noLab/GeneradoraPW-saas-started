import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from './admin-table'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  if (!claimsData?.claims) redirect('/login')

  const { data: solicitudes, error } = await supabase
    .from('solicitudes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', paddingTop: 'var(--header-h)' }}>
      <div style={{ background: 'var(--c-navy)', padding: '2rem var(--pad-x)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-sky)', fontWeight: 600 }}>
            Territorio CateonCook
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--c-white)', fontWeight: 300, marginTop: '0.5rem' }}>
            Panel de Solicitudes
          </h1>
          <p style={{ color: 'rgba(237,241,248,0.55)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {solicitudes?.length ?? 0} solicitudes recibidas
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2rem var(--pad-x)' }}>
        {error ? (
          <p style={{ color: '#f87171' }}>Error al cargar solicitudes: {error.message}</p>
        ) : (
          <AdminTable solicitudes={solicitudes ?? []} />
        )}
      </div>
    </div>
  )
}
