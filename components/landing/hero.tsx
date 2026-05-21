import Image        from 'next/image'
import ModalTrigger from '@/components/modal-trigger'
import TitleCube    from '@/components/landing/title-cube'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg"></div>
      <div className="hero__overlay"></div>

      <div className="hero__content">
        <div className="hero__logo-mark">
          <Image
            src="/img/logo-hero-transparent.png"
            alt="CateonCook"
            width={508}
            height={491}
            priority
            className="hero__logo-img"
          />
        </div>

        <TitleCube />

        <div className="hero__bottom">
          <p className="hero__subtitle">Comunidad que nutre</p>
          <div className="hero__cta">
            <ModalTrigger label="Sé parte de la fábrica" />
            <div className="hero__scroll-mouse" aria-hidden="true">
              <div className="hero__scroll-wheel" />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
