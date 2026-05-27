export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { PortalNav } from '@/components/portal/portal-nav'
import { ProfileProvider } from '@/components/portal/profile-context'
import './portal.css'

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  if (!data?.claims) redirect('/login')

  const email = (data.claims.email as string) ?? ''
  const userId = data.claims.sub as string

  // Solo columnas que existían antes de las migraciones recientes — evita fallos por schema cache desactualizado
  const { data: p } = await supabase
    .from('profiles')
    .select('display_name, avatar_url')
    .eq('id', userId)
    .single()

  return (
    <ProfileProvider initial={{
      displayName: p?.display_name ?? null,
      avatarUrl:   p?.avatar_url   ?? null,
      level:       'junior',
      joinDate:    null,
      phone:       null,
      city:        null,
    }}>
      <div className="portal-root">
        <PortalNav email={email} />
        <main className="portal-main">{children}</main>
      </div>
    </ProfileProvider>
  )
}
