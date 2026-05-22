import ModalTrigger from '@/components/modal-trigger'
import TitleCube    from '@/components/landing/title-cube'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg"></div>
      <div className="hero__overlay"></div>

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

    </section>
  )
}
