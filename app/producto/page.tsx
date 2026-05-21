import { createClient } from '@/lib/supabase/server'
import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'
import CatalogClient from '@/components/producto/catalog'

export default async function ProductoPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  return (
    <>
      <Header user={user} solid />
      <CatalogClient />
      <Footer />
    </>
  )
}
