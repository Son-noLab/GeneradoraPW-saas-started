/* CateonCook — Portal del Socio
   Login → Dashboard preview con métricas y agenda */

const { useState: porUseState, useEffect: porUseEffect } = React;

/* ── Login ── */
function LoginView({ onEnter }) {
  const [loading, setLoading] = porUseState(false);
  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onEnter(); }, 1000);
  }
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0e", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <CCLogoMark size={52} color="#E6C77A" />
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, letterSpacing: "0.2em", color: "#fff", fontSize: 13, marginTop: 14 }}>
            CATEON<span style={{ letterSpacing: "0.28em" }}>COOK</span>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontStyle: "italic", color: "#E6C77A", marginTop: 8, lineHeight: 1.1 }}>
            Portal del Socio
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(230,199,122,0.2)", padding: "40px 36px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="cform__field">
            <label className="cform__label" htmlFor="pemail" style={{ color: "rgba(255,255,255,0.6)" }}>Correo electrónico</label>
            <input id="pemail" type="email" required placeholder="tu@correo.com"
              style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} />
          </div>
          <div className="cform__field">
            <label className="cform__label" htmlFor="ppass" style={{ color: "rgba(255,255,255,0.6)" }}>Contraseña</label>
            <input id="ppass" type="password" required placeholder="••••••••"
              style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} />
          </div>
          <button type="submit" className="btn btn--lg btn--primary" disabled={loading} style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Ingresando..." : "Ingresar →"}
          </button>
          <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
            ¿Aún no eres socio?{" "}
            <a href="CateonCook Unete.html" style={{ color: "#E6C77A", textDecoration: "none" }}>Únete aquí</a>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", fontFamily: "JetBrains Mono, monospace" }}>
          CATEONCOOK · PORTAL DEL SOCIO · 2026
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function DashboardView() {
  const stats = [
    { value: "0", label: "VENTAS ESTE MES" },
    { value: "$0.00", label: "COMISIONES PENDIENTES" },
    { value: "Anfitrión", label: "NIVEL ACTUAL" },
    { value: "0", label: "SOCIOS EN TU RED" },
  ];
  const agenda = [
    { date: "JUN 02", title: "Capacitación: Técnicas de cocina en vivo", sub: "Online · Zoom · 19:00" },
    { date: "JUN 07", title: "Reunión de equipo — Quito norte", sub: "Presencial · Av. 10 de Agosto 1234 · 19:00" },
    { date: "JUN 14", title: "Lanzamiento nueva línea de temporada", sub: "Online · Live Instagram · 20:00" },
  ];

  const S = {
    root: { minHeight: "100vh", background: "#0a0a0e", paddingTop: 80, fontFamily: "Inter, sans-serif" },
    hdr: { background: "rgba(10,10,14,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, display: "flex", alignItems: "center", padding: "0 clamp(20px,4vw,60px)" },
    hdrInner: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1200, margin: "0 auto" },
    main: { maxWidth: 1200, margin: "0 auto", padding: "48px clamp(20px,4vw,60px) 80px" },
    label: { fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em", color: "rgba(230,199,122,0.6)", display: "block" },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(230,199,122,0.15)", padding: "28px 24px" },
  };

  return (
    <div style={S.root}>
      <div style={S.hdr}>
        <div style={S.hdrInner}>
          <a href="CateonCook Home Refined.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <CCLogoMark size={32} color="#E6C77A" />
            <span style={{ fontFamily: "Inter,sans-serif", fontWeight: 900, letterSpacing: "0.2em", color: "#fff", fontSize: 12 }}>
              CATEON<span style={{ letterSpacing: "0.28em" }}>COOK</span>
            </span>
          </a>
          <nav style={{ display: "flex", gap: 32 }}>
            {[["CateonCook Pedidos.html","Pedidos"],["CateonCook Capacitaciones.html","Capacitaciones"],["CateonCook Soporte.html","Soporte"]].map(([h,l]) => (
              <a key={l} href={h} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, fontFamily: "Inter, sans-serif" }}>{l}</a>
            ))}
          </nav>
          <a href="CateonCook Portal.html" className="btn btn--ghost-light" style={{ fontSize: 13 }}>Salir</a>
        </div>
      </div>

      <main style={S.main}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ ...S.label, marginBottom: 10 }}>PANEL DEL SOCIO · 2026</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 300, color: "#fff", fontStyle: "italic", lineHeight: 1.1, margin: 0 }}>
            Tu <em style={{ color: "#E6C77A" }}>fábrica</em>,<br />de un vistazo.
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 56 }}>
          {stats.map((s, i) => (
            <div key={i} style={S.card}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 44, fontWeight: 300, color: "#E6C77A", lineHeight: 1 }}>{s.value}</div>
              <span style={{ ...S.label, marginTop: 8 }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40, marginBottom: 56 }}>
          <span style={{ ...S.label, marginBottom: 20 }}>PRÓXIMOS EVENTOS</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {agenda.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, padding: "18px 24px", background: "rgba(255,255,255,0.03)", borderLeft: "2px solid #E6C77A" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#E6C77A", minWidth: 54 }}>{a.date}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{a.title}</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginTop: 4 }}>{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...S.card, borderColor: "rgba(230,199,122,0.2)", textAlign: "center", padding: "44px 40px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontStyle: "italic", color: "#E6C77A", marginBottom: 12 }}>
            El portal completo está en construcción.
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 auto", maxWidth: 480, lineHeight: 1.8 }}>
            Pedidos con historial, comisiones detalladas, rankings y capacitaciones completas estarán
            disponibles muy pronto. Tu sponsor es tu punto de contacto para todo lo que necesites hoy.
          </p>
          <div style={{ marginTop: 28 }}>
            <a className="btn btn--primary" href="CateonCook Soporte.html">Contactar soporte →</a>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [view, setView] = porUseState("login");
  porUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);
  if (view === "dashboard") return <DashboardView />;
  return <LoginView onEnter={() => setView("dashboard")} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
