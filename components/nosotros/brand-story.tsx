import BrandCard from './brand-card'
import { MOMENTOS } from '@/lib/momentos'

export default function BrandStory() {
  return (
    <section className="bst-section" id="historia">
      <div className="container">

        <div className="bst-header">
          <span className="label bst-header__label">Nuestra historia</span>
          <h2 className="bst-header__title">construida con amor</h2>
        </div>

        <div className="bst-grid">
          {MOMENTOS.map(m => (
            <BrandCard
              key={m.slug}
              slug={m.slug}
              titulo={m.titulo}
              desc={m.desc}
              img={m.img}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
