/* CateonCook — Soporte del Socio */

const { useEffect: sopUseEffect } = React;

function App() {
  sopUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  const canales = [
    {
      icon: <path d="M16 1C7.715 1 1 7.715 1 16c0 2.64.687 5.116 1.88 7.265L1 31l8.02-1.847A14.93 14.93 0 0016 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm6.864 18.594c-.375-.188-2.22-1.095-2.564-1.22-.344-.125-.594-.188-.844.188-.25.375-.97 1.22-1.188 1.47-.219.25-.438.281-.813.094-.375-.188-1.582-.582-3.014-1.858-1.113-.992-1.864-2.217-2.083-2.592-.219-.375-.023-.577.164-.765.169-.169.375-.438.563-.657.188-.219.25-.375.375-.625.125-.25.063-.469-.031-.657-.094-.188-.844-2.031-1.157-2.78-.305-.729-.614-.63-.844-.642l-.718-.013c-.25 0-.657.094-.999.469-.344.375-1.313 1.282-1.313 3.125s1.344 3.625 1.531 3.875c.188.25 2.648 4.044 6.414 5.674.897.387 1.596.619 2.14.793.899.286 1.717.246 2.364.149.72-.108 2.22-.907 2.532-1.783.312-.876.312-1.626.219-1.783-.094-.156-.344-.25-.719-.438z" />,
      viewBox: "0 0 32 32",
      label: "WhatsApp",
      title: "Escríbenos directo",
      desc: "Respuesta garantizada en menos de 2 horas hábiles, lunes a sábado de 09:00 a 19:00.",
      cta: "Abrir WhatsApp →",
      href: "https://wa.me/593999999999?text=Hola%2C+soy+socio+CateonCook+y+necesito+soporte",
      external: true,
    },
    {
      icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></>,
      viewBox: "0 0 24 24",
      label: "Email",
      title: "Correo electrónico",
      desc: "Para consultas formales, solicitudes de documentos y gestiones administrativas.",
      cta: "Enviar correo →",
      href: "mailto:hola@cateoncook.com",
      external: false,
    },
    {
      icon: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.05 10.5a19.79 19.79 0 01-3.07-8.57A2 2 0 011.94 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></>,
      viewBox: "0 0 24 24",
      label: "Teléfono",
      title: "Llámanos",
      desc: "Lunes a sábado de 09:00 a 19:00 (hora Ecuador). Para urgencias fuera de horario, WhatsApp.",
      cta: "Llamar ahora →",
      href: "tel:+593999999999",
      external: false,
    },
  ];

  const faqs = [
    { q: "¿Cómo hago para subir de nivel?", a: "Necesitas cumplir los requisitos de volumen personal y de equipo del siguiente nivel. Tu sponsor te guía en cada paso del proceso de certificación." },
    { q: "¿Cuándo se pagan las comisiones?", a: "Las comisiones del mes anterior se procesan entre el 5 y el 10 de cada mes. Recibirás un desglose detallado por correo." },
    { q: "¿Cómo solicito material de presentación?", a: "Escríbenos al WhatsApp de soporte con tu nombre y ciudad. Enviamos catálogos digitales en PDF de forma inmediata y físicos en 48–72 horas." },
    { q: "¿Qué hago si un cliente quiere devolver un producto?", a: "Royal Prestige tiene una política de satisfacción garantizada. Contacta a soporte para iniciar el proceso. Lo resolvemos en 3–5 días hábiles." },
  ];

  return (
    <>
      <Header currentPage={null} alwaysSolid />
      <main>
        <PageHero
          variant="dark"
          chapter="Portal del Socio"
          current="Soporte"
          cornerFig="Portal · Soporte"
          title={<>Estamos<br />aquí para<br /><em>ayudarte.</em></>}
          lede="Soporte real para socios reales. Sin tickets automáticos ni sistemas de espera — una persona de tu equipo responde cada mensaje."
          meta={[
            { value: "2h", label: "TIEMPO DE RESPUESTA" },
            { value: "Lun–Sáb", label: "DÍAS DE ATENCIÓN" },
            { value: "09–19h", label: "HORARIO" },
          ]}
        />

        <section className="section section--cream">
          <span className="section__corner-fig">Fig. 01 · Canales</span>
          <div className="section__inner">
            <div className="section__header">
              <div>
                <span className="section__eyebrow"><span className="section__eyebrow-rule" />Canales de contacto</span>
                <h2 className="section__title">Elige cómo<br /><em>prefieres hablar.</em></h2>
              </div>
              <p className="section__lede">
                Tres canales directos. Ningún chatbot en el camino. El primer mensaje lo
                recibe siempre una persona de tu equipo.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 8 }}>
              {canales.map((c, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", padding: "36px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(230,199,122,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox={c.viewBox} fill={c.label === "WhatsApp" ? "#25d366" : "none"} stroke={c.label === "WhatsApp" ? "none" : "#E6C77A"} strokeWidth="1.8" strokeLinecap="round">{c.icon}</svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", color: "rgba(0,0,0,0.35)", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 17, color: "#0a0a0e", marginBottom: 8 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.7 }}>{c.desc}</div>
                  </div>
                  <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined}
                    className="btn btn--dark" style={{ marginTop: "auto", textAlign: "center" }}>{c.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <span className="section__corner-fig">Fig. 02 · FAQ</span>
          <div className="section__inner">
            <div className="section__header">
              <div>
                <span className="section__eyebrow"><span className="section__eyebrow-rule" />Preguntas frecuentes</span>
                <h2 className="section__title">Las preguntas<br /><em>más comunes.</em></h2>
              </div>
              <p className="section__lede">
                Si tu pregunta no está aquí, escríbenos — respondemos siempre.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 8 }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", marginBottom: 10 }}>{f.q}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <WhatsAppFab />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
