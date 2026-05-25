/* CateonCook — Únete page
   PageHero (cream) → 4 pasos → FAQ → Formulario de contacto */

const { useState: uUseState, useEffect: uUseEffect } = React;

/* ── 4 pasos ── */
function StepsSection() {
  const steps = [
    { n: "01", title: <>Agenda tu <em>conversación</em></>, desc: "Una llamada honesta de 30 minutos con un sponsor. Sin guion, sin presión.", fig: "Fig. 01·a" },
    { n: "02", title: <>Conoce el <em>plan</em></>,           desc: "Te mostramos los números reales, las cuentas reales y los socios reales detrás del modelo.", fig: "Fig. 01·b" },
    { n: "03", title: <>Recibe tu <em>kit</em></>,            desc: "Tu inventario inicial, materiales de capacitación y acceso a la comunidad de socios.", fig: "Fig. 01·c" },
    { n: "04", title: <>Empieza a <em>construir</em></>,      desc: "Acompañamiento semanal durante los primeros 90 días. Tu sponsor está a un mensaje.", fig: "Fig. 01·d" },
  ];
  return (
    <section className="section section--cream" aria-label="El camino">
      <span className="section__corner-fig">Fig. 01 · Camino</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              El proceso
            </span>
            <h2 className="section__title">
              Cuatro pasos<br />
              para <em>empezar.</em>
            </h2>
          </div>
          <p className="section__lede">
            No vendemos prisa. Acompañamos un proceso. Estos son los cuatro momentos que cada
            socio recorre antes de su primera comisión.
          </p>
        </div>

        <ol className="unete__steps">
          {steps.map((s) => (
            <li key={s.n} className="unete__step">
              <span className="unete__step-dot" />
              <span className="unete__step-num">PASO · {s.n}</span>
              <h3 className="unete__step-title">{s.title}</h3>
              <p className="unete__step-desc">{s.desc}</p>
              <span className="unete__step-fig">{s.fig}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── FAQ accordion ── */
const FAQS = [
  {
    q: <>¿Cuánto cuesta <em>empezar</em>?</>,
    a: "No cuesta un solo dólar empezar.",
  },
  {
    q: <>¿Es esto un <em>esquema piramidal</em>?</>,
    a: "No. CateonCook es un distribuidor autorizado de Royal Prestige. Las comisiones provienen exclusivamente de la venta de producto real a clientes finales, no del reclutamiento. Cada socio puede ver el plan de mercadeo completo antes de firmar.",
  },
  {
    q: <>¿Necesito <em>experiencia previa</em>?</>,
    a: "No. El 60 % de nuestros socios actuales no había vendido nunca antes de entrar. Te acompañamos con capacitación semanal y un sponsor asignado durante tus primeros 90 días.",
  },
  {
    q: <>¿En qué ciudades del Ecuador <em>operan</em>?</>,
    a: "Tenemos presencia activa en 24 provincias. Las oficinas principales están en Quito, Guayaquil y Cuenca, pero hay socios en cada capital provincial. Si estás en una zona rural, igual te asignamos un sponsor cercano.",
  },
  {
    q: <>¿Puedo hacerlo de <em>medio tiempo</em>?</>,
    a: "Sí. Cerca del 70 % de nuestros emprendedores combinan CateonCook con otro trabajo o estudios. El modelo está diseñado para acomodar tu ritmo, no para reemplazarlo de inmediato.",
  },
  {
    q: <>¿Qué pasa si <em>decido salir</em>?</>,
    a: "No hay cláusulas de permanencia. Puedes pausar o salir cuando quieras. Si te quedas con producto sin abrir y dentro de los primeros 6 meses, lo recompramos al 90 % del valor.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq__item${isOpen ? " is-open" : ""}`}>
      <button className="faq__q" onClick={onToggle} aria-expanded={isOpen}>
        <span>{q}</span>
        <span className="faq__icon" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className="faq__a">
        <div className="faq__a-inner">{a}</div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = uUseState(0);
  return (
    <section className="section section--cream" aria-label="Preguntas frecuentes">
      <span className="section__corner-fig">Fig. 02 · Preguntas</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Antes de dar el paso
            </span>
            <h2 className="section__title">
              Preguntas<br />
              <em>frecuentes.</em>
            </h2>
          </div>
          <p className="section__lede">
            Las dudas que escuchamos en cada primera conversación. Si la tuya no está aquí,
            escríbenos — preferimos contestarla en persona.
          </p>
        </div>

        <div className="faq">
          {FAQS.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact form ── */
function ContactSection() {
  const [sent, setSent] = uUseState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <section className="section section--dark" aria-label="Contacto">
      <span className="section__corner-fig">Fig. 03 · Contacto</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Tu primera conversación
            </span>
            <h2 className="section__title">
              Escríbenos<br />
              <em>en este formulario.</em>
            </h2>
          </div>
          <p className="section__lede">
            Te contactará un sponsor real, no un chatbot. Promesa de respuesta: 24 horas hábiles.
            Solo te pedimos lo necesario para encontrar quién te acompañe mejor.
          </p>
        </div>

        {sent ? (
          <div style={{
            padding: "48px",
            background: "rgba(230,199,122,0.08)",
            borderLeft: "3px solid #E6C77A",
            textAlign: "center",
            color: "#fff",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic", fontWeight: 400,
              fontSize: 40, lineHeight: 1.1,
              color: "#E6C77A",
              marginBottom: 12,
            }}>
              Recibido.
            </div>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", margin: 0 }}>
              Un sponsor te escribirá en las próximas 24 horas hábiles.<br />
              Mientras tanto, puedes seguir explorando <a href="CateonCook Nosotros.html" style={{ color: "#E6C77A", textDecoration: "underline" }}>nuestra historia</a>.
            </p>
          </div>
        ) : (
          <form className="cform" onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.04)", borderLeft: "3px solid #E6C77A", color: "#fff" }}>
            <div className="cform__field">
              <label className="cform__label" htmlFor="nombre" style={{ color: "rgba(255,255,255,0.6)" }}>Nombre</label>
              <input id="nombre" type="text" required style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} placeholder="Tu nombre completo" />
            </div>
            <div className="cform__field">
              <label className="cform__label" htmlFor="email" style={{ color: "rgba(255,255,255,0.6)" }}>Correo</label>
              <input id="email" type="email" required style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} placeholder="tu@correo.com" />
            </div>
            <div className="cform__field">
              <label className="cform__label" htmlFor="tel" style={{ color: "rgba(255,255,255,0.6)" }}>Teléfono / WhatsApp</label>
              <input id="tel" type="tel" required style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} placeholder="+593 99 ..." />
            </div>
            <div className="cform__field">
              <label className="cform__label" htmlFor="ciudad" style={{ color: "rgba(255,255,255,0.6)" }}>Ciudad</label>
              <select id="ciudad" required style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                <option value="">Seleccionar...</option>
                <option>Quito</option>
                <option>Guayaquil</option>
                <option>Cuenca</option>
                <option>Loja</option>
                <option>Ambato</option>
                <option>Otra</option>
              </select>
            </div>
            <div className="cform__field cform__field--full">
              <label className="cform__label" htmlFor="interes" style={{ color: "rgba(255,255,255,0.6)" }}>¿Qué te interesa explorar?</label>
              <select id="interes" required style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                <option value="">Seleccionar...</option>
                <option>Ser emprendedor (medio tiempo)</option>
                <option>Ser emprendedor (tiempo completo)</option>
                <option>Ser distribuidor</option>
                <option>Comprar producto solamente</option>
                <option>Aún no estoy seguro</option>
              </select>
            </div>
            <div className="cform__field cform__field--full">
              <label className="cform__label" htmlFor="mensaje" style={{ color: "rgba(255,255,255,0.6)" }}>Mensaje (opcional)</label>
              <textarea id="mensaje" rows="3" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} placeholder="Cuéntanos por dónde nos encontraste o qué te gustaría saber primero..." />
            </div>
            <div className="cform__submit">
              <span className="cform__legal" style={{ color: "rgba(255,255,255,0.5)" }}>
                AL ENVIAR ACEPTAS QUE UN SPONSOR DE CATEONCOOK TE CONTACTE. SIN COMPROMISO.
              </span>
              <button type="submit" className="btn btn--lg btn--primary">Enviar →</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── App ── */
function App() {
  uUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  return (
    <>
      <Header currentPage="unirse" alwaysSolid />
      <main>
        <PageHero
          variant="cream"
          chapter="Capítulo III"
          current="Únete"
          cornerFig="Cap. III · Únete"
          title={<>Tu <em>camino</em><br />empieza con<br />una conversación.</>}
          lede="No tienes que decidir hoy. Solo agendar 30 minutos. Lo demás, lo decides tú a tu propio ritmo, con un sponsor que ya hizo este mismo camino."
          meta={[
            { value: "30min", label: "PRIMERA LLAMADA" },
            { value: "0$", label: "COMPROMISO INICIAL" },
            { value: "24h", label: "TIEMPO DE RESPUESTA" },
          ]}
        />
        <StepsSection />
        <FAQSection />
        <SectionDivider direction="cream-to-dark" targetSelector=".cform" />
        <ContactSection />
      </main>
      <FooterSection />
      <WhatsAppFab />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
