import type { ReactNode } from 'react'

interface PageHeroProps {
  variant: 'dark' | 'cream' | 'warm'
  chapter: string
  current: string
  cornerFig: string
  title: ReactNode
  lede: string
  meta?: { value: string; label: string }[]
}

export default function PageHero({ variant, chapter, current, cornerFig, title, lede, meta }: PageHeroProps) {
  return (
    <section className={`phero phero--${variant}`}>
      <div className="phero__vignette" />
      <span className="section__corner-fig">{cornerFig}</span>
      <div className="phero__inner">
        <div>
          <div className="phero__crumb">
            <span className="phero__crumb-rule" />
            {chapter && <span>{chapter}</span>}
            {current && (
              <>
                <span style={{ opacity: 0.4 }}>/</span>
                <span className="phero__crumb-current">{current}</span>
              </>
            )}
          </div>
          <h1 className="phero__title">{title}</h1>
        </div>
        <div className="phero__right">
          <p className="phero__lede">{lede}</p>
          {meta && meta.length > 0 && (
            <div className="phero__meta">
              {meta.map((m, i) => (
                <div key={i} className="phero__meta-item">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
