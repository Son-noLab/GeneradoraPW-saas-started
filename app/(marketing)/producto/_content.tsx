'use client'

import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/marketing/page-hero'
import SectionDivider from '@/components/marketing/section-divider'
import { useModal } from '@/components/marketing/shell'
import CatalogClient from '@/components/producto/catalog'

function ProductoFeatures() {
  const features = [
    { n: 'i',   title: 'Acero quirúrgico T304', desc: 'Nueve capas de acero y aluminio puro que distribuyen el calor con precisión clínica. Hecho para durar generaciones.' },
    { n: 'ii',  title: 'Cocina sin agua, sin grasa', desc: 'Sistema de sellado al vapor que conserva los nutrientes, los colores y el sabor real de cada alimento.' },
    { n: 'iii', title: 'Termo-control inteligente', desc: 'Indicador térmico que avisa el momento exacto. Menos energía, menos errores, más tiempo para los tuyos.' },
    { n: 'iv',  title: 'Garantía vitalicia', desc: 'Una sola inversión. Toda una vida cocinando con el mismo sistema de cocina que cocinará para tus nietos.' },
  ]
  return (
    <section className="section section--dark" aria-label="Tecnología">
      <span className="section__corner-fig">Fig. 02 · Tecnología</span>
      <div className="section__inner">
        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />Anatomía del producto</span>
            <h2 className="section__title">Diseñado para<br /><em>durar</em> una vida.</h2>
          </div>
          <p className="section__lede">
            Royal Prestige no compite por precio — compite por permanencia. Cada componente está
            pensado para sobrevivir a la cocina más exigente: la de tu propia casa.
          </p>
        </div>
        <div className="producto__grid">
          <div className="producto__visual" role="img" aria-label="Sistema de cocina Royal Prestige">
            <Image fill src="/img/prod-01-innove.jpg" alt="Innove 9-ply T304" sizes="(max-width: 960px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
            <span className="producto__visual-caption">RP · Innove™ · 9-ply T304</span>
          </div>
          <ul className="producto__features">
            {features.map(f => (
              <li key={f.n} className="producto__feature">
                <span className="producto__feature-num">{f.n}</span>
                <div className="producto__feature-body">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="producto__strip">
          <div className="producto__strip-item">
            <span className="producto__strip-num">9<em>+</em></span>
            <span className="producto__strip-label">capas de acero</span>
          </div>
          <div className="producto__strip-item">
            <span className="producto__strip-num">50<em>%</em></span>
            <span className="producto__strip-label">menos energía</span>
          </div>
          <div className="producto__strip-item">
            <span className="producto__strip-num">∞</span>
            <span className="producto__strip-label">garantía vitalicia</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CompareSection() {
  const { openModal } = useModal()
  const Check = () => (
    <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
  const X = () => (
    <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M6 18l12-12" />
    </svg>
  )
  const rows: (string | React.ReactNode)[][] = [
    ['CAPAS DE ACERO',            '9 capas T304', '1–3 capas',  '1–2 capas'],
    ['GARANTÍA',                  'Vitalicia',    '1–5 años',   'Sin garantía'],
    ['COCINA SIN AGUA / GRASA',   <Check />,      <X />,        <X />],
    ['INDICADOR TÉRMICO',         <Check />,      <X />,        <X />],
    ['AHORRO ENERGÉTICO',         '50 %',         '10–15 %',    '—'],
    ['ACOMPAÑAMIENTO DE COCINA',  <Check />,      <X />,        <X />],
  ]
  return (
    <section className="section section--dark" aria-label="Comparativa">
      <span className="section__corner-fig">Fig. 03 · Comparativa</span>
      <div className="section__inner">
        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow"><span className="section__eyebrow-rule" />Tabla de comparación</span>
            <h2 className="section__title">Por qué pesa<br /><em>la diferencia.</em></h2>
          </div>
          <p className="section__lede">
            La cocina convencional ahorra hoy y cuesta mañana. Royal Prestige invierte hoy y
            ahorra el resto de tu vida.
          </p>
        </div>
        <div className="compare-wrap">
          <table className="compare">
            <thead>
              <tr>
                <th>Característica</th>
                <th className="is-us">Royal Prestige</th>
                <th>Marca premium</th>
                <th>Marca económica</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  <td className="cell-us">{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cta-band" style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
          <div className="cta-band__text">
            <h3 className="cta-band__title">Pídelo, <em>pruébalo</em>, decide después.</h3>
            <p className="cta-band__desc">
              Agenda una demostración de cocina en tu casa, sin costo. Un socio prepara una
              comida completa contigo y solo si te convence, hablamos del producto.
            </p>
          </div>
          <div className="cta-band__actions">
            <button className="btn btn--lg btn--dark" onClick={openModal}>Agendar demostración →</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ProductoPage() {
  return (
    <>
      <PageHero
        variant="warm"
        chapter="Capítulo II"
        current="Producto"
        cornerFig="Cap. II · Producto"
        title={<>Cocina sin agua,<br /><em>sin grasa</em>,<br />sin dolor.</>}
        lede="Royal Prestige no es un utensilio. Es un sistema de cocción diseñado para devolverle a cada comida su forma más honesta — la que tu familia merece probar."
        meta={[
          { value: '9+', label: 'CAPAS DE ACERO' },
          { value: '∞',  label: 'GARANTÍA' },
          { value: '50%', label: 'MENOS ENERGÍA' },
        ]}
      />
      <SectionDivider direction="dark-to-cream" targetSelector=".ccat-head" />
      <CatalogClient />
      <SectionDivider direction="cream-to-dark" targetSelector=".producto__grid" />
      <ProductoFeatures />
      <CompareSection />
    </>
  )
}
