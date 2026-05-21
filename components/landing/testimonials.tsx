const testimonials = [
  {
    quote: 'Unirme a CateonCook cambió mi perspectiva de vida. No solo tengo un negocio propio, sino una comunidad que me impulsa todos los días a dar lo mejor de mí.',
    initial: 'M',
    name: 'María José Andrade',
    role: 'Distribuidora Premium · Quito',
  },
  {
    quote: 'Lo que más valoro del territorio es el ambiente ordenado y feliz que se vive. Aquí no solo se vende, se crece como persona y como profesional. ¡Somos un equipo!',
    initial: 'C',
    name: 'Carlos Mejía',
    role: 'Distribuidor Master · Guayaquil',
  },
  {
    quote: 'La flexibilidad que me da CateonCook para manejar mis tiempos y los ingresos que genero con Royal Prestige han transformado completamente mi calidad de vida.',
    initial: 'A',
    name: 'Ana Lucía Torres',
    role: 'Distribuidora Premium · Cuenca',
  },
]

export default function Testimonials() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="label section__label reveal">Testimonios</span>
          <h2 className="reveal reveal-delay-1" style={{ color: 'var(--c-white)' }}>
            Lo que dice nuestra<br />comunidad
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testimonial-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <p className="testimonial-card__quote">{t.quote}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initial}</div>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
