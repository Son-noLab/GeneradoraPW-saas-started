export default function Features() {
  return (
    <section className="section section--white" id="oportunidad">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="label section__label reveal">La Oportunidad</span>
          <h2 className="reveal reveal-delay-1">
            Por qué elegir<br />CateonCook
          </h2>
          <p className="lead section__lead reveal reveal-delay-2">
            Un territorio que desarrolla socios estratégicos impulsándolos a alcanzar crecimiento personal, profesional y competitivo a través de un plan de mercadeo exitoso.
          </p>
        </div>

        <div className="values-grid">

          <div className="value-card reveal">
            <svg className="value-card__icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="26" cy="26" r="22"/>
              <path d="M26 14 L26 26 L34 34"/>
              <circle cx="26" cy="26" r="4" fill="currentColor" stroke="none"/>
            </svg>
            <span className="label value-card__label">Tiempo</span>
            <h3 className="value-card__title">Flexibilidad real</h3>
            <p className="value-card__desc">Tú decides cuándo y cómo trabajar. Construyes tu negocio a tu ritmo, sin horarios fijos ni jefes, con el respaldo total del territorio.</p>
          </div>

          <div className="value-card reveal reveal-delay-1">
            <svg className="value-card__icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M26 6 L32 18 L46 20 L36 30 L38 44 L26 38 L14 44 L16 30 L6 20 L20 18 Z"/>
            </svg>
            <span className="label value-card__label">Productos</span>
            <h3 className="value-card__title">Royal Prestige</h3>
            <p className="value-card__desc">Distribuyes una de las marcas de cocina de mayor prestigio del mundo. Productos de alta demanda que se venden solos por su calidad y reputación.</p>
          </div>

          <div className="value-card reveal reveal-delay-2">
            <svg className="value-card__icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="20" cy="18" r="8"/>
              <circle cx="36" cy="26" r="6"/>
              <path d="M10 42 C10 34 14 30 20 30 C26 30 32 34 32 42"/>
              <path d="M32 34 C34 32 38 30 42 34 C44 36 44 40 44 42"/>
            </svg>
            <span className="label value-card__label">Comunidad</span>
            <h3 className="value-card__title">Equipo que impulsa</h3>
            <p className="value-card__desc">Una comunidad que nutre. Rodeado de emprendedores apasionados, con capacitaciones constantes y un ambiente ordenado y feliz que potencia tu éxito.</p>
          </div>

          <div className="value-card reveal reveal-delay-3">
            <svg className="value-card__icon" viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 42 L10 28 L26 14 L42 28 L42 42 Z"/>
              <path d="M20 42 L20 32 L32 32 L32 42"/>
              <line x1="10" y1="28" x2="42" y2="28"/>
            </svg>
            <span className="label value-card__label">Crecimiento</span>
            <h3 className="value-card__title">Negocio sostenible</h3>
            <p className="value-card__desc">Un plan de mercadeo probado y sostenible en el tiempo. Tu negocio crece contigo y se expande hacia nuevas provincias y países de Suramérica.</p>
          </div>

        </div>
      </div>
    </section>
  )
}
