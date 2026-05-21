import ModalTrigger from '@/components/modal-trigger'

export default function CtaStrip() {
  return (
    <section style={{ background: 'var(--c-blue)', padding: 'var(--s-xl) 0', textAlign: 'center' }}>
      <div className="container">
        <span className="label reveal" style={{ color: 'rgba(255,255,255,.55)', letterSpacing: '.24em' }}>
          ¿Listo para comenzar?
        </span>
        <h2 className="reveal reveal-delay-1" style={{ color: 'var(--c-white)', margin: '1rem 0 0.5rem' }}>
          Comunidad que nutre
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: 'rgba(255,255,255,.65)', fontSize: '.95rem', marginBottom: 'var(--s-md)' }}>
          Sé parte de una fábrica de sueños que transforma vidas a través del trabajo en equipo y la determinación.
        </p>
        <ModalTrigger label="Sé parte de la fábrica" className="btn btn--light reveal reveal-delay-3" />
      </div>
    </section>
  )
}
