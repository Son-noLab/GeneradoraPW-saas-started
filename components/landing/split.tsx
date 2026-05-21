import ModalTrigger from '@/components/modal-trigger'

const checkIcon = (
  <svg className="split__feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

export default function Split() {
  return (
    <section className="split" id="oportunidad" aria-label="La Oportunidad — niveles de distribuidor">

      {/* PREMIUM */}
      <div className="split__half split__half--premium">
        <div className="split__content">

          <span className="split__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Nivel Premium
          </span>

          <h2 className="split__title">
            Crece con<br />
            <em>disciplina y propósito</em>
          </h2>

          <p className="split__desc">
            Desarrolla tu negocio dentro del territorio con el respaldo de un equipo comprometido, herramientas probadas y un plan de mercadeo exitoso y sostenible en el tiempo.
          </p>

          <ul className="split__features">
            {[
              'Capacitaciones y actividades programadas',
              'Apoyo constante de tu sponsor y equipo',
              'Código de emprendedor y acceso a comisiones',
              'Ambiente ordenado, feliz y orientado a resultados',
              'Certificado digital de nivel Premium',
            ].map(f => (
              <li key={f} className="split__feature">
                {checkIcon}
                {f}
              </li>
            ))}
          </ul>

          <ModalTrigger label="Quiero ser Premium" className="btn btn--premium" />
        </div>
      </div>

      {/* MASTER */}
      <div className="split__half split__half--master">
        <div className="split__content">

          <span className="split__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7L2 12l10 9 10-9-5-9z"/>
            </svg>
            Nivel Master
          </span>

          <h2 className="split__title">
            Lidera el territorio<br />
            <em>con excelencia</em>
          </h2>

          <p className="split__desc">
            El nivel de mayor impacto dentro de CateonCook. Lideras tu propio equipo de emprendedores, accedes a los mejores bonos del plan y trasciendes como referente del territorio.
          </p>

          <ul className="split__features">
            {[
              'Todo lo incluido en Nivel Premium',
              'Liderazgo de tu propio equipo de socios',
              'Acceso a los mejores bonos e incentivos',
              'Mentoría directa con Territorios y Premiers',
              'Expansión hacia nuevas provincias y ciudades',
            ].map(f => (
              <li key={f} className="split__feature">
                {checkIcon}
                {f}
              </li>
            ))}
          </ul>

          <ModalTrigger label="Quiero ser Master" className="btn btn--master" />
        </div>
      </div>

    </section>
  )
}
