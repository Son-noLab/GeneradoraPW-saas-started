export default function Values() {
  return (
    <section className="section section--dark" id="nosotros">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="label section__label reveal">Nuestra cultura</span>
          <h2 className="reveal reveal-delay-1" style={{ color: 'var(--c-white)' }}>
            Vivimos estos valores
          </h2>
          <p className="lead reveal reveal-delay-2" style={{ textAlign: 'center', margin: '0 auto' }}>
            El territorio CateonCook se define por principios que guían cada acción, cada decisión y cada resultado.
          </p>
        </div>

        <div className="values-culture-grid">

          <div className="culture-card reveal">
            <div className="culture-card__number">01</div>
            <h4 className="culture-card__title">Soy Emprendedor</h4>
            <p className="culture-card__desc">Actuamos con determinación y sin excusas. <em style={{ color: 'rgba(237,241,248,0.8)' }}>Just do it.</em> Resistimos con disciplina y nos movemos hacia nuestras metas con pasión.</p>
          </div>

          <div className="culture-card reveal reveal-delay-1">
            <div className="culture-card__number">02</div>
            <h4 className="culture-card__title">Soy Auténtico</h4>
            <p className="culture-card__desc">Somos radicalmente honestos. Cuidamos lo que pensamos y expresamos. Si algo es bueno para nosotros, lo compartimos con los demás.</p>
          </div>

          <div className="culture-card reveal reveal-delay-2">
            <div className="culture-card__number">03</div>
            <h4 className="culture-card__title">Soy Íntegro</h4>
            <p className="culture-card__desc">Vivimos en agradecimiento, anulamos la queja. La honra: si estoy donde estoy, es porque me paré sobre hombros de gigantes.</p>
          </div>

          <div className="culture-card reveal reveal-delay-3">
            <div className="culture-card__number">04</div>
            <h4 className="culture-card__title">Soy Apasionado</h4>
            <p className="culture-card__desc">Servimos con amor y agregamos valor a los demás. Somos eternos aprendices en humildad. Vivimos intensamente un ambiente ordenado y feliz.</p>
          </div>

        </div>
      </div>
    </section>
  )
}
