/* CateonCook — Producto page
   PageHero (warm) → 4 features + visual → Línea completa → Tecnología (specs) → Comparativa → CTA */

const { useEffect: pUseEffect } = React;

/* ── Hero feature list (matching home producto layout) ── */
function ProductoFeatures() {
  const features = [
  { n: "i", title: "Acero quirúrgico T304",
    desc: "Nueve capas de acero y aluminio puro que distribuyen el calor con precisión clínica. Hecho para durar generaciones." },
  { n: "ii", title: "Cocina sin agua, sin grasa",
    desc: "Sistema de sellado al vapor que conserva los nutrientes, los colores y el sabor real de cada alimento." },
  { n: "iii", title: "Termo-control inteligente",
    desc: "Indicador térmico que avisa el momento exacto. Menos energía, menos errores, más tiempo para los tuyos." },
  { n: "iv", title: "Garantía vitalicia",
    desc: "Una sola inversión. Toda una vida cocinando con la misma olla que cocinará para tus nietos." }];

  return (
    <section className="section section--dark" aria-label="Tecnología">
      <span className="section__corner-fig">Fig. 02 · Tecnología</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Anatomía del producto
            </span>
            <h2 className="section__title" style={{ width: "4px" }}>
              Diseñado para<br />
              <em>durar</em> una vida.
            </h2>
          </div>
          <p className="section__lede">
            Royal Prestige no compite por precio — compite por permanencia. Cada componente está
            pensado para sobrevivir a la cocina más exigente: la de tu propia casa.
          </p>
        </div>

        <div className="producto__grid">
          <div className="producto__visual" role="img" aria-label="Olla Royal Prestige">
            <span className="producto__visual-hint">[ producto · render hero ]</span>
            <span className="producto__visual-caption">RP · Innove™ · 9-ply T304</span>
          </div>
          <ul className="producto__features">
            {features.map((f) =>
            <li key={f.n} className="producto__feature">
                <span className="producto__feature-num">{f.n}</span>
                <div className="producto__feature-body">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </li>
            )}
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
    </section>);

}

/* ── Línea completa ── */
function ProductLine() {
  const products = [
  { fig: "RP · 01", title: <>Innove™ <em>9-ply</em></>, meta: "Ollas · 6 piezas" },
  { fig: "RP · 02", title: <>Sartén <em>Eclipse</em></>, meta: "Sartenes · 3 piezas" },
  { fig: "RP · 03", title: <>Cuchillería <em>Quintal</em></>, meta: "Cuchillería · 5 piezas" },
  { fig: "RP · 04", title: <>Sistema <em>Maxim</em></>, meta: "Filtrado de agua" },
  { fig: "RP · 05", title: <>Extractor <em>Vital</em></>, meta: "Jugos en frío" },
  { fig: "RP · 06", title: <>Línea <em>Novel</em></>, meta: "Vajilla y servicio" }];

  return (
    <section className="section section--cream" aria-label="Línea de productos">
      <span className="section__corner-fig">Fig. 01 · Catálogo</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              La línea completa
            </span>
            <h2 className="section__title">
              Una cocina<br />
              <em>completa.</em>
            </h2>
          </div>
          <p className="section__lede">
            Más de seis líneas que cubren la mesa entera: del agua que tomas hasta el filo que
            corta. Pensadas para combinarse, no para competir entre sí.
          </p>
        </div>

        <div className="pline">
          {products.map((p, i) =>
          <article key={i} className="pline__card">
              <span className="pline__card-fig">{p.fig}</span>
              <div className="pline__card-body">
                <h3 className="pline__card-title">{p.title}</h3>
                <div className="pline__card-meta">{p.meta}</div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ── Comparativa ── */
function CompareSection() {
  const Check = () =>
  <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>;

  const X = () =>
  <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M6 18l12-12" />
    </svg>;

  const rows = [
  ["CAPAS DE ACERO", "9 capas T304", "1–3 capas", "1–2 capas"],
  ["GARANTÍA", "Vitalicia", "1–5 años", "Sin garantía"],
  ["COCINA SIN AGUA / GRASA", <Check />, <X />, <X />],
  ["INDICADOR TÉRMICO", <Check />, <X />, <X />],
  ["AHORRO ENERGÉTICO", "50 %", "10–15 %", "—"],
  ["ACOMPAÑAMIENTO DE COCINA", <Check />, <X />, <X />]];

  return (
    <section className="section section--dark" aria-label="Comparativa">
      <span className="section__corner-fig">Fig. 03 · Comparativa</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Tabla de comparación
            </span>
            <h2 className="section__title">
              Por qué pesa<br />
              <em>la diferencia.</em>
            </h2>
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
              {rows.map((row, i) =>
              <tr key={i}>
                  <td>{row[0]}</td>
                  <td className="cell-us">{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="cta-band" style={{ marginTop: "clamp(60px, 8vw, 100px)" }}>
          <div className="cta-band__text">
            <h3 className="cta-band__title">Pídelo, <em>pruébalo</em>, decide después.</h3>
            <p className="cta-band__desc">
              Agenda una demostración de cocina en tu casa, sin costo. Un socio prepara una
              comida completa contigo y solo si te convence, hablamos del producto.
            </p>
          </div>
          <div className="cta-band__actions">
            <a className="btn btn--lg btn--dark" href="CateonCook Unete.html">Agendar demostración →</a>
          </div>
        </div>
      </div>
    </section>);

}

/* ── App ── */
function App() {
  pUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  return (
    <>
      <Header currentPage="producto" alwaysSolid />
      <main>
        <PageHero
          variant="warm"
          chapter="Capítulo II"
          current="Producto"
          cornerFig="Cap. II · Producto"
          title={<>Cocina sin agua,<br /><em>sin grasa</em>,<br />sin dolor.</>}
          lede="Royal Prestige no es un utensilio. Es un sistema de cocción diseñado para devolverle a cada comida su forma más honesta — la que tu familia merece probar."
          meta={[
          { value: "9+", label: "CAPAS DE ACERO" },
          { value: "∞", label: "GARANTÍA" },
          { value: "50%", label: "MENOS ENERGÍA" }]
          } />
        
        <SectionDivider direction="dark-to-cream" targetSelector=".pline" />
        <ProductLine />
        <SectionDivider direction="cream-to-dark" targetSelector=".producto__grid" />
        <ProductoFeatures />
        <CompareSection />
      </main>
      <FooterSection />
      <WhatsAppFab />
    </>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);