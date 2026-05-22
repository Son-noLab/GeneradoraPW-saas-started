import { createClient } from '@/lib/supabase/server'
import Header      from '@/components/landing/header'
import Hero        from '@/components/landing/hero'
import Split       from '@/components/landing/split'
import Values      from '@/components/landing/values'
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

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims ? { email: data.claims.email as string } : null

  return (
    <>
      <Header user={user} minimal />
      <main>
        <Hero />
        <Split />
        <div className="stack-section" style={{'--sn':'0'} as React.CSSProperties}><Values /></div>
        <div className="stack-section" style={{'--sn':'1'} as React.CSSProperties}><Mission /></div>
        <div className="stack-section" style={{'--sn':'2'} as React.CSSProperties}><Steps /></div>
        <div className="stack-section" style={{'--sn':'3'} as React.CSSProperties}><Testimonials /></div>
        <div className="stack-section" style={{'--sn':'4'} as React.CSSProperties}><CtaStrip /></div>
      </main>
      <Footer />
      <Modal />
      <WhatsAppFab />
      <RevealObserver />
      <CursorSwitcher />
      <HeroTransition />
    </>
  )
}
