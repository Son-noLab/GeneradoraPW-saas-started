/* CateonCook — Capacitaciones del Socio */

const { useEffect: capUseEffect } = React;

const MODULOS = [
  { num: "01", tag: "Fundamentos", title: "Bienvenida al equipo",
    desc: "Primeros pasos, presentación de la comunidad y acceso a materiales iniciales.", dur: "45 min", done: true },
  { num: "02", tag: "Producto", title: "El producto Royal Prestige",
    desc: "Historia, tecnología 9-ply, beneficios nutricionales y cómo demostrar el producto.", dur: "60 min", done: true },
  { num: "03", tag: "Ventas", title: "Tu primera demostración",
    desc: "Metodología de cocina en casa, guion de presentación y cierre de primera venta.", dur: "90 min", done: false },
  { num: "04", tag: "Liderazgo", title: "Construye tu red",
    desc: "Cómo sumar socios, presentar el modelo y acompañar a tu primer emprendedor.", dur: "75 min", done: false },
  { num: "05", tag: "Negocio", title: "Administración básica",
    desc: "Manejo de inventario, pedidos, comisiones y facturación paso a paso.", dur: "60 min", done: false },
  { num: "06", tag: "Marketing", title: "Marketing personal",
    desc: "Redes sociales, historias de impacto y posicionamiento local en tu ciudad.", dur: "90 min", done: false },
];

const PROXIMOS = [
  { fecha: "JUN 02 · 19:00", titulo: "Técnicas de cocina en vivo", tipo: "Online · Zoom", host: "Equipo CateonCook" },
  { fecha: "JUN 14 · 20:00", titulo: "Lanzamiento nueva línea de temporada", tipo: "Online · Live IG", host: "@cateoncook" },
  { fecha: "JUN 21 · 10:00", titulo: "Taller presencial — Quito", tipo: "Presencial · Av. 10 de Agosto 1234", host: "Dir. Regional Quito" },
];

function ModuloCard({ m }) {
  const S = {
    card: { padding: "28px 28px 28px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "0 24px", alignItems: "start" },
    num: { fontFamily: "JetBrains Mono, monospace", fontSize: 22, color: m.done ? "#E6C77A" : "rgba(255,255,255,0.2)", fontWeight: 500, paddingTop: 2 },
    tag: { fontFamily: "JetBrains Mono, monospace", fontSize: 9, letterSpacing: "0.14em", color: "rgba(230,199,122,0.5)", textTransform: "uppercase", marginBottom: 6 },
    title: { fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: m.done ? "#fff" : "rgba(255,255,255,0.6)", marginBottom: 6 },
    desc: { fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 },
    dur: { fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", whiteSpace: "nowrap", paddingTop: 4 },
    badge: { display: "inline-block", padding: "3px 10px", fontSize: 10, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em", background: m.done ? "rgba(230,199,122,0.15)" : "rgba(255,255,255,0.06)", color: m.done ? "#E6C77A" : "rgba(255,255,255,0.3)", borderRadius: 2, marginTop: 10 },
  };
  return (
    <div style={S.card}>
      <div style={S.num}>{m.num}</div>
      <div>
        <div style={S.tag}>{m.tag}</div>
        <div style={S.title}>{m.title}</div>
        <div style={S.desc}>{m.desc}</div>
        <div style={S.badge}>{m.done ? "✓ COMPLETADO" : "PENDIENTE"}</div>
      </div>
      <div style={S.dur}>{m.dur}</div>
    </div>
  );
}

function App() {
  capUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  const done = MODULOS.filter(m => m.done).length;

  return (
    <>
      <Header currentPage={null} alwaysSolid />
      <main>
        <PageHero
          variant="dark"
          chapter="Portal del Socio"
          current="Capacitaciones"
          cornerFig="Portal · Capacitaciones"
          title={<>Aprende,<br /><em>crece</em>,<br />lidera.</>}
          lede="Seis módulos diseñados para llevarte del primer día al primer equipo. A tu propio ritmo, con soporte en cada paso."
          meta={[
            { value: `${done}/${MODULOS.length}`, label: "MÓDULOS COMPLETADOS" },
            { value: "6.5h", label: "CONTENIDO TOTAL" },
            { value: "3", label: "PRÓXIMOS EVENTOS" },
          ]}
        />

        <section className="section section--cream">
          <span className="section__corner-fig">Fig. 01 · Módulos</span>
          <div className="section__inner">
            <div className="section__header">
              <div>
                <span className="section__eyebrow"><span className="section__eyebrow-rule" />Tu ruta de aprendizaje</span>
                <h2 className="section__title">Seis módulos,<br /><em>un solo camino.</em></h2>
              </div>
              <p className="section__lede">
                Completa los módulos en orden. Cada uno desbloquea el siguiente. La academia completa
                con videos, guías descargables y quices estará disponible muy pronto.
              </p>
            </div>
            <div style={{ marginTop: 8 }}>
              {MODULOS.map(m => <ModuloCard key={m.num} m={m} />)}
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <span className="section__corner-fig">Fig. 02 · Agenda</span>
          <div className="section__inner">
            <div className="section__header">
              <div>
                <span className="section__eyebrow"><span className="section__eyebrow-rule" />Capacitación en vivo</span>
                <h2 className="section__title">Próximos<br /><em>eventos.</em></h2>
              </div>
              <p className="section__lede">
                Sesiones en vivo con el equipo directivo. Puedes registrarte con tu sponsor o
                escribirnos directamente para confirmar tu asistencia.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
              {PROXIMOS.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 24, padding: "20px 24px", background: "rgba(255,255,255,0.04)", borderLeft: "2px solid #E6C77A", alignItems: "center" }}>
                  <div style={{ minWidth: 130 }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#E6C77A", lineHeight: 1.4 }}>{p.fecha}</div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4, letterSpacing: "0.06em" }}>{p.tipo}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#fff", fontFamily: "Inter, sans-serif" }}>{p.titulo}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Organiza: {p.host}</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <a href="CateonCook Soporte.html" className="btn" style={{ fontSize: 12, padding: "8px 16px", background: "transparent", border: "1px solid rgba(230,199,122,0.4)", color: "#E6C77A" }}>
                      Registrarme →
                    </a>
                  </div>
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
