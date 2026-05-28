import type { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/server'
import Shell from '@/components/marketing/shell'
import Header from '@/components/marketing/header'
import Footer from '@/components/marketing/footer'
import WhatsAppFab from '@/components/marketing/whatsapp'
import './marketing.css'

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()

  let initialProfile: { name: string | null; avatar: string | null } | null = null
  if (data?.claims) {
    const { data: p } = await supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('id', data.claims.sub as string)
      .single()
    if (p) initialProfile = { name: p.display_name ?? null, avatar: p.avatar_url ?? null }
  }

  return (
    <Shell>
      <Header initialLoggedIn={!!data?.claims} initialProfile={initialProfile} />
      {children}
      <Footer />
      <WhatsAppFab />
    </Shell>
  )
}
