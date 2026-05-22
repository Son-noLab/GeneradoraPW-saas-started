import ModalTrigger from '@/components/modal-trigger'

const checkIcon = (
  <svg className="split__feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

export default function Split() {
  return (
    <section className="split" id="oportunidad" aria-label="La Oportunidad — niveles de distribuidor">

      {/* EMPRENDEDOR */}
      <div className="split__half split__half--premium">
        <div className="split__content">

          <span className="split__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Emprendedor
          </span>

          <h2 className="split__title">
            Construye tu negocio<br />
            <em>a tu propio ritmo</em>
          </h2>

          <p className="split__desc">
            Empieza a generar ingresos desde el primer día con el respaldo de un equipo comprometido. Desarrolla habilidades comerciales reales y crece dentro de un modelo probado y sostenible.
          </p>

          <ul className="split__features">
            {[
              'Capacitaciones y actividades programadas',
              'Acompañamiento continuo de tu sponsor',
              'Código de emprendedor y comisiones desde el inicio',
              'Comunidad activa orientada al crecimiento personal',
              'Certificado digital de Emprendedor CateonCook',
            ].map(f => (
              <li key={f} className="split__feature">
                {checkIcon}
                {f}
              </li>
            ))}
          </ul>

          <ModalTrigger label="QUIERO SER EMPRENDEDOR" className="btn btn--premium" />
        </div>
      </div>

      {/* DISTRIBUIDOR */}
      <div className="split__half split__half--master">
        <div className="split__content">

          <span className="split__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7L2 12l10 9 10-9-5-9z"/>
            </svg>
            Distribuidor
          </span>

          <h2 className="split__title">
            Expande tu red<br />
            <em>y tus ganancias</em>
          </h2>

          <p className="split__desc">
            Lleva CateonCook más lejos. Accede a condiciones preferenciales de compra, mayor margen de ganancia y la posibilidad de abrir nuevos territorios con el respaldo de la marca.
          </p>

          <ul className="split__features">
            {[
              'Todo lo incluido como Emprendedor',
              'Compras al por mayor con condiciones preferenciales',
              'Mayor margen de ganancia y bonos por volumen',
              'Apertura de nuevos territorios y zonas de expansión',
              'Soporte directo del equipo de distribución nacional',
            ].map(f => (
              <li key={f} className="split__feature">
                {checkIcon}
                {f}
              </li>
            ))}
          </ul>

          <ModalTrigger label="QUIERO SER DISTRIBUIDOR" className="btn btn--master" />
        </div>
      </div>

    </section>
  )
}
