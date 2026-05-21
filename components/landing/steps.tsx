import ModalTrigger from '@/components/modal-trigger'

const steps = [
  {
    n: '1',
    title: 'Llena tu solicitud',
    desc: 'Completa el formulario con tu nombre, teléfono y correo. Asegúrate de brindar información precisa y verídica.',
  },
  {
    n: '2',
    title: 'Entrevista con tu Sponsor',
    desc: 'Presentación del candidato, revisión de hoja de vida y evaluación de afinidad con la cultura organizacional.',
  },
  {
    n: '3',
    title: 'Entrevista en el Territorio',
    desc: 'Evaluación final con Territorios o Premiers. Preguntas situacionales y valoración de competencias clave.',
  },
  {
    n: '4',
    title: '¡Bienvenido a la Fábrica!',
    desc: 'Firma de documentos, asignación de tu código de emprendedor y activación dentro del Territorio CateonCook.',
  },
]

export default function Steps() {
  return (
    <section className="section section--dark-mid" id="como-unirme">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="label section__label reveal">Tu camino</span>
          <h2 className="reveal reveal-delay-1" style={{ color: 'var(--c-white)' }}>
            ¿Cómo unirme a<br />la fábrica?
          </h2>
          <p className="lead reveal reveal-delay-2">
            Cuatro pasos hacia tu nueva oportunidad de negocio dentro del Territorio CateonCook.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={s.n} className={`step-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <div className="step-card__number">{s.n}</div>
              <h4 className="step-card__title">{s.title}</h4>
              <p className="step-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--s-lg)' }} className="reveal">
          <ModalTrigger label="Sé parte de la fábrica" />
        </div>
      </div>
    </section>
  )
}
