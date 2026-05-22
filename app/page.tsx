import { createClient } from '@/lib/supabase/server'
import Header      from '@/components/landing/header'
import Hero        from '@/components/landing/hero'
import Split       from '@/components/landing/split'
import Mission     from '@/components/landing/mission'
import Steps       from '@/components/landing/steps'
import Testimonials from '@/components/landing/testimonials'
import CtaStrip    from '@/components/landing/cta'
import Footer      from '@/components/landing/footer'
import Modal       from '@/components/landing/modal'
import WhatsAppFab from '@/components/landing/whatsapp'
import RevealObserver  from '@/components/reveal-observer'
import CursorSwitcher  from '@/components/landing/cursor-switcher'
import HeroTransition  from '@/components/landing/hero-transition'
import StackPanel      from '@/components/landing/stack-panel'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  return (
    <>
      <Header user={user} />
      <main>
        <Hero />
        <HeroTransition />
        <Split />
        <div className="stack-section" style={{'--sn':'0'} as React.CSSProperties}><Mission /></div>
        <StackPanel label="Cómo unirme" sn={1} bg="var(--c-bg-dark-mid)" defaultOpen><Steps /></StackPanel>
        <StackPanel label="Testimonios" sn={2} bg="var(--c-bg-dark)" defaultOpen><Testimonials /></StackPanel>
        <StackPanel label="¿Listo para comenzar?" sn={3} bg="var(--c-blue)" defaultOpen><CtaStrip /></StackPanel>
      </main>
      <Footer />
      <Modal />
      <WhatsAppFab />
      <RevealObserver />
      <CursorSwitcher />
    </>
  )
}
