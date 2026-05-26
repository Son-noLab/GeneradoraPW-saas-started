/* CateonCook — Pedidos y Logística del Socio */

const { useEffect: pedUseEffect } = React;

const PEDIDOS_EJEMPLO = [
  { id: "CC-2026-0001", fecha: "15 MAY 2026", producto: "Innove™ 9-ply · Set 6 piezas", estado: "Entregado", monto: "$285.00" },
  { id: "CC-2026-0002", fecha: "22 MAY 2026", producto: "Sartén Eclipse · 2 piezas + Acc.", estado: "En tránsito", monto: "$148.00" },
  { id: "CC-2026-0003", fecha: "28 MAY 2026", producto: "Cafetera Alma · 1 unidad", estado: "Procesando", monto: "$89.00" },
];

const ESTADO_COLOR = {
  "Entregado": "#4caf50",
  "En tránsito": "#E6C77A",
  "Procesando": "rgba(255,255,255,0.4)",
};

function PedidoRow({ p }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr", gap: 16, padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", alignItems: "center", fontFamily: "Inter, sans-serif" }}>
      <div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#E6C77A" }}>{p.id}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{p.fecha}</div>
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{p.producto}</div>
      <div>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.08em", color: ESTADO_COLOR[p.estado] || "#fff" }}>
          {p.estado.toUpperCase()}
        </span>
      </div>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#fff", textAlign: "right" }}>{p.monto}</div>
    </div>
  );
}

function App() {
  pedUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  return (
    <>
      <Header currentPage={null} alwaysSolid />
      <main>
        <PageHero
          variant="dark"
          chapter="Portal del Socio"
          current="Pedidos"
          cornerFig="Portal · Pedidos"
          title={<>Tus pedidos,<br /><em>en orden.</em></>}
          lede="Historial de compras, estado de envíos y gestión de inventario. El sistema completo de pedidos en línea está en construcción — por ahora gestiona todo con tu sponsor."
          meta={[
            { value: "3", label: "PEDIDOS ACTIVOS" },
            { value: "$522", label: "VOLUMEN DEL MES" },
            { value: "24h", label: "TIEMPO DE ENTREGA" },
          ]}
        />

        <section className="section section--cream">
          <span className="section__corner-fig">Fig. 01 · Historial</span>
          <div className="section__inner">
            <div className="section__header">
              <div>
                <span className="section__eyebrow"><span className="section__eyebrow-rule" />Historial de pedidos</span>
                <h2 className="section__title">Últimos<br /><em>movimientos.</em></h2>
              </div>
              <p className="section__lede">
                Datos de ejemplo — el historial real se mostrará aquí cuando el portal esté
                activo. Para pedidos urgentes, contacta a tu supervisor de zona.
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", marginTop: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr", gap: 16, padding: "12px 24px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {["ID · FECHA","PRODUCTO","ESTADO","MONTO"].map(h => (
                  <div key={h} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>{h}</div>
                ))}
              </div>
              {PEDIDOS_EJEMPLO.map(p => <PedidoRow key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <span className="section__corner-fig">Fig. 02 · Proceso</span>
          <div className="section__inner">
            <div className="section__header">
              <div>
                <span className="section__eyebrow"><span className="section__eyebrow-rule" />Cómo hacer un pedido</span>
                <h2 className="section__title">Proceso<br /><em>actual.</em></h2>
              </div>
              <p className="section__lede">
                Mientras el sistema de pedidos en línea se finaliza, este es el flujo actual
                para solicitar inventario.
              </p>
            </div>

            <ol className="unete__steps" style={{ marginTop: 8 }}>
              {[
                { n: "01", t: "Contacta a tu supervisor", d: "Escribe a tu supervisor de zona por WhatsApp con el listado de productos y cantidades." },
                { n: "02", t: "Recibe la cotización", d: "En menos de 2 horas hábiles recibirás la cotización con precio y disponibilidad." },
                { n: "03", t: "Confirma y paga", d: "Confirma el pedido y realiza el pago mediante transferencia o efectivo según convenga." },
                { n: "04", t: "Recibe en 24–48h", d: "Tu pedido llega a tu dirección o punto de retiro en Quito, Guayaquil o Cuenca en 24–48 horas hábiles." },
              ].map(s => (
                <li key={s.n} className="unete__step">
                  <span className="unete__step-dot" />
                  <span className="unete__step-num">PASO · {s.n}</span>
                  <h3 className="unete__step-title">{s.t}</h3>
                  <p className="unete__step-desc">{s.d}</p>
                </li>
              ))}
            </ol>

            <div className="cta-band" style={{ marginTop: "clamp(48px,6vw,80px)" }}>
              <div className="cta-band__text">
                <h3 className="cta-band__title">¿Listo para tu <em>próximo pedido</em>?</h3>
                <p className="cta-band__desc">Escríbenos por WhatsApp y un asesor te ayuda en minutos.</p>
              </div>
              <div className="cta-band__actions">
                <a className="btn btn--lg btn--dark" href="CateonCook Soporte.html">Solicitar pedido →</a>
              </div>
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
