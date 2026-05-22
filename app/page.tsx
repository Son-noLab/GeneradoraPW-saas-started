import Hero        from '@/components/landing/hero'
import Split       from '@/components/landing/split'
import Mission     from '@/components/landing/mission'
import Testimonials from '@/components/landing/testimonials'
import CtaStrip    from '@/components/landing/cta'
import Footer      from '@/components/landing/footer'
import Modal       from '@/components/landing/modal'
import WhatsAppFab from '@/components/landing/whatsapp'
import HomeBurger     from '@/components/landing/home-burger'
import RevealObserver  from '@/components/reveal-observer'
import CursorSwitcher  from '@/components/landing/cursor-switcher'
import HeroTransition  from '@/components/landing/hero-transition'
import StackPanel      from '@/components/landing/stack-panel'

export default function Home() {
  return (
    <>
      <HomeBurger />
      <main>
        <Hero />
        <HeroTransition />
        <Split />
        <div className="stack-zone">
          <StackPanel label="Misión" sn={0} image="/img/nos-1.jpg" imageAlt="Equipo CateonCook"><Mission /></StackPanel>
          <StackPanel label="Testimonios" sn={1} bg="var(--c-bg-dark)"><Testimonials /></StackPanel>
          <StackPanel label="¿Listo para comenzar?" sn={2} bg="var(--c-blue)"><CtaStrip /></StackPanel>
        </div>
      </main>
      <Footer />
      <Modal />
      <WhatsAppFab />
      <RevealObserver />
      <CursorSwitcher />
    </>
  )
}
