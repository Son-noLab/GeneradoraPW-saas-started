/* CateonCook — Oportunidad page
   PageHero → Split (Emprendedor vs Distribuidor) → Niveles del plan → Testimoniales → CTA */

const { useEffect: oUseEffect } = React;

const TWEAK_DEFAULTS_OPORT = /*EDITMODE-BEGIN*/{
  "accent": "#E6C77A"
}/*EDITMODE-END*/;

/* ── Split (Emprendedor / Distribuidor) ── */
function SplitFull() {
  const tiers = [
    {
      badge: "Emprendedor",
      icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
      title: <>Construye tu negocio<br /><em>a tu propio ritmo</em></>,
      desc: "Empieza a generar ingresos desde el primer día con el respaldo de un equipo comprometido. Un modelo probado y sostenible.",
      features: [
        "Inversión inicial accesible · plan de pagos",
        "Acompañamiento de un sponsor durante 90 días",
        "Comisiones del 25–35% desde tu primera venta",
        "Capacitaciones semanales (online + presencial)",
        "Acceso a la comunidad activa de socios",
      ],
      cta: "QUIERO SER EMPRENDEDOR",
      tone: "premium",
    },
    {
      badge: "Distribuidor",
      icon: <path d="M17 3H7L2 12l10 9 10-9-5-9z" />,
      title: <>Expande tu red<br /><em>y tus ganancias</em></>,
      desc: "Lleva CateonCook más lejos. Condiciones preferenciales, mayor margen y la posibilidad de abrir nuevos territorios.",
      features: [
        "Todo lo incluido en el plan de Emprendedor",
        "Compras al por mayor con precio preferencial",
        "Bonos por volumen y por estructura",
        "Apertura de nuevos territorios y eventos",
        "Acceso a viajes de incentivos internacionales",
      ],
      cta: "QUIERO SER DISTRIBUIDOR",
      tone: "master",
    },
  ];
  return (
    <section className="split" aria-label="Modelo de socios">
      {tiers.map((t, i) => (
        <div key={i} className={`split__half split__half--${t.tone}`}>
          <div className="split__content">
            <span className="split__badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">{t.icon}</svg>
              {t.badge}
            </span>
            <h2 className="split__title">{t.title}</h2>
            <p className="split__desc">{t.desc}</p>
            <ul className="split__features">
              {t.features.map((f) => (
                <li key={f} className="split__feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`btn btn--lg btn--${t.tone}`}>{t.cta}</button>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── Niveles del plan de mercadeo ── */
function LevelsSection() {
  const levels = [
    { n: "I",   name: "Anfitrión",     title: <>Tu primer <em>círculo</em></>,
      desc: "Comparte el producto con tu círculo cercano. Sin metas mensuales obligatorias.",
      bonus: "25 % comisión directa" },
    { n: "II",  name: "Líder",         title: <>Tu primer <em>equipo</em></>,
      desc: "Sumas a tres socios activos. Empiezas a recibir bonos de equipo.",
      bonus: "+ 5 % bono de equipo" },
    { n: "III", name: "Mentor",        title: <>Tu primera <em>red</em></>,
      desc: "Una estructura de quince personas activas. Acceso a capacitación avanzada.",
      bonus: "+ 8 % bono de estructura" },
    { n: "IV",  name: "Director",      title: <>Tu propio <em>territorio</em></>,
      desc: "Abres un territorio con apoyo institucional, oficinas y eventos propios.",
      bonus: "+ 12 % bono de territorio" },
  ];
  return (
    <section className="section section--dark" aria-label="Plan de mercadeo">
      <span className="section__corner-fig">Fig. 01 · Plan</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Plan de mercadeo
            </span>
            <h2 className="section__title">
              Cuatro niveles,<br />
              <em>un solo camino.</em>
            </h2>
          </div>
          <p className="section__lede">
            Cada rango se construye desde lo cotidiano. Sin saltos imposibles, sin promesas
            irreales. Lo que ves abajo es lo mismo que firma cada socio el día que entra.
          </p>
        </div>

        <div className="levels">
          {levels.map((l) => (
            <article key={l.n} className="level">
              <div className="level__num">{l.n}</div>
              <div className="level__name">Nivel {l.n} · {l.name}</div>
              <h3 className="level__title">{l.title}</h3>
              <p className="level__desc">{l.desc}</p>
              <div className="level__bonus">{l.bonus}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimoniales ── */
function TestimonialsSection() {
  const items = [
    {
      fig: "Fig. 02·a",
      quote: "Empecé vendiendo a tres amigas. Hoy mi equipo de 40 socias cocina por todo el austro.",
      name: "Verónica P.",
      meta: "Distribuidora · Cuenca · 6 años",
    },
    {
      fig: "Fig. 02·b",
      quote: "Lo que me sostuvo no fueron las comisiones — fue saber que mi sponsor estaba a un mensaje.",
      name: "Andrés M.",
      meta: "Emprendedor · Quito · 2 años",
    },
    {
      fig: "Fig. 02·c",
      quote: "Llegué buscando un ingreso extra. Encontré una segunda profesión y una segunda familia.",
      name: "Luisa T.",
      meta: "Mentora · Guayaquil · 4 años",
    },
  ];
  return (
    <section className="section section--cream" aria-label="Testimoniales">
      <span className="section__corner-fig">Fig. 02 · Voces</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Lo que dicen los socios
            </span>
            <h2 className="section__title">
              Tres voces,<br />
              <em>una sola fábrica.</em>
            </h2>
          </div>
          <p className="section__lede">
            No publicamos lo que no podemos sostener. Cada testimonio aquí presente acepta que lo
            llames y le hagas todas las preguntas que quieras antes de unirte.
          </p>
        </div>

        <div className="testis">
          {items.map((t, i) => (
            <article key={i} className="testi">
              <span className="testi__fig">{t.fig}</span>
              <p className="testi__quote">"{t.quote}"</p>
              <div className="testi__attr">
                <span className="testi__avatar" aria-hidden="true" />
                <span><strong>{t.name}</strong><br />{t.meta}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-band">
          <div className="cta-band__text">
            <h3 className="cta-band__title">¿Listo para escribir <em>tu propio capítulo</em>?</h3>
            <p className="cta-band__desc">
              Un sponsor te contactará en menos de 24 horas hábiles para coordinar tu primera
              conversación. Sin compromiso.
            </p>
          </div>
          <div className="cta-band__actions">
            <a className="btn btn--lg btn--dark" href="CateonCook Unete.html">Empezar mi camino →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── App ── */
function App() {
  oUseEffect(() => {
    document.documentElement.style.setProperty("--accent", TWEAK_DEFAULTS_OPORT.accent);
  }, []);

  return (
    <>
      <Header currentPage="oportunidad" alwaysSolid />
      <main>
        <PageHero
          variant="dark"
          chapter="Capítulo I"
          current="Oportunidad"
          cornerFig="Cap. I · Oportunidad"
          title={<>La <em>oportunidad</em><br />de cambiar<br />tu mesa.</>}
          lede="No es un negocio que te sumas. Es una fábrica que te recibe. Dos modelos, cuatro niveles, una sola promesa: que aquí encuentres lo que viniste a buscar."
          meta={[
            { value: "+500", label: "FAMILIAS SOCIAS" },
            { value: "24", label: "PROVINCIAS" },
            { value: "20+", label: "AÑOS DE MARCA" },
          ]}
        />
        <SplitFull />
        <SectionDivider direction="cream-to-dark" targetSelector=".levels" />
        <LevelsSection />
        <SectionDivider direction="dark-to-cream" targetSelector=".testis" />
        <TestimonialsSection />
      </main>
      <FooterSection />
      <WhatsAppFab />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
