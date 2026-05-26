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

/* ── Contact form — Sé parte de la fábrica ── */

const PROVINCIAS_EC = [
  'Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi',
  'El Oro','Esmeraldas','Galápagos','Guayas','Imbabura','Loja',
  'Los Ríos','Manabí','Morona Santiago','Napo','Orellana','Pastaza',
  'Pichincha','Santa Elena','Santo Domingo de los Tsáchilas',
  'Sucumbíos','Tungurahua','Zamora Chinchipe',
];

const COMO_SUPO_OPS = [
  'Redes sociales (Instagram / Facebook)',
  'Un amigo o familiar',
  'Evento o activación',
  'Google / búsqueda web',
  'Referido de un distribuidor',
  'Otro',
];

const SB_URL = 'https://ejdrtjutjcnqmxpvbmwa.supabase.co';
const SB_KEY = 'sb_publishable_q1bkVlBleed6x8GhB2B41w_Xh17ozXh';

function ContactSection() {
  const [sent, setSent] = uUseState(false);
  const [error, setError] = uUseState(false);
  const [sending, setSending] = uUseState(false);
  const [nombreEnviado, setNombreEnviado] = uUseState('');
  const [telefonoEnviado, setTelefonoEnviado] = uUseState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(false);
    const t = e.target;
    const nombre    = t.nombre.value.trim();
    const telefono  = t.tel.value.trim();
    const correo    = t.email.value.trim();
    const ciudad    = t.ciudad.value.trim();
    const provincia = t.provincia.value;
    const comoSupo  = t.como_supo.value;
    const notas = [
      provincia  && `Provincia: ${provincia}`,
      t.profesion.value.trim()  && `Profesión: ${t.profesion.value.trim()}`,
      t.tiene_ruc.value         && `RUC: ${t.tiene_ruc.value}`,
      t.motivacion.value.trim() && `Motivación: ${t.motivacion.value.trim()}`,
      t.video_url.value.trim()  && `Video: ${t.video_url.value.trim()}`,
    ].filter(Boolean).join('\n') || null;

    setNombreEnviado(nombre);
    setTelefonoEnviado(telefono);

    let ok = false;
    if (window.supabase) {
      try {
        const { createClient } = window.supabase;
        const sb = createClient(SB_URL, SB_KEY);
        const { error: sbErr } = await sb.from('solicitudes').insert({
          nombre, telefono, correo, ciudad,
          como_supo: comoSupo || null,
          notas,
        });
        if (!sbErr) ok = true;
      } catch (_) {}
    }
    setSending(false);
    if (ok) { setSent(true); } else { setError(true); }
  }

  if (sent) {
    return (
      <section className="section section--dark" aria-label="Solicitud enviada">
        <div className="section__inner">
          <div style={{ textAlign: "center", padding: "clamp(48px,8vw,100px) 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #E6C77A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E6C77A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(30px,5vw,50px)", fontStyle: "italic", color: "#E6C77A", lineHeight: 1.1, marginBottom: 16 }}>
              Solicitud recibida,
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(30px,5vw,50px)", fontStyle: "italic", color: "#fff", lineHeight: 1.1, marginBottom: 28 }}>
              {nombreEnviado.split(" ")[0]}.
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.8 }}>
              Un miembro de nuestro equipo revisará tu perfil y se comunicará contigo
              en las próximas 24–48 horas al número <strong style={{ color: "#fff" }}>{telefonoEnviado}</strong>.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/593999999999?text=${encodeURIComponent("Hola, acabo de enviar mi solicitud de ingreso a CateonCook. Me llamo " + nombreEnviado + ".")}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn--lg btn--primary">
                Escribir por WhatsApp →
              </a>
              <a href="CateonCook Nosotros.html" className="btn btn--lg btn--ghost-light">
                Conoce nuestra historia
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const iS = { background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" };
  const lS = { color: "rgba(255,255,255,0.6)" };
  const flegend = { fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.14em", color: "rgba(230,199,122,0.6)", marginBottom: 20, display: "block" };
  const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 };

  return (
    <section className="section section--dark" aria-label="Únete">
      <span className="section__corner-fig">Fig. 03 · Solicitud</span>
      <div className="section__inner">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Sé parte de la fábrica
            </span>
            <h2 className="section__title">
              Tu solicitud<br />
              <em>de ingreso.</em>
            </h2>
          </div>
          <p className="section__lede">
            Te contactará un miembro real de nuestro equipo, no un chatbot. Promesa de respuesta:
            24–48 horas. Solo pedimos lo necesario para acompañarte bien desde el primer día.
          </p>
        </div>

        <form className="cform" onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.04)", borderLeft: "3px solid #E6C77A", color: "#fff" }}>

          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend style={flegend}>DATOS PERSONALES</legend>
            <div style={grid2}>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_nombre" style={lS}>Nombre completo *</label>
                <input id="u_nombre" name="nombre" type="text" required placeholder="Ej. María García López" style={iS} />
              </div>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_tel" style={lS}>Teléfono / WhatsApp *</label>
                <input id="u_tel" name="tel" type="tel" required placeholder="+593 99 000 0000" style={iS} />
              </div>
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" htmlFor="u_email" style={lS}>Correo electrónico *</label>
              <input id="u_email" name="email" type="email" required placeholder="tu@correo.com" style={iS} />
            </div>
            <div style={{ ...grid2, marginTop: 16 }}>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_ciudad" style={lS}>Ciudad</label>
                <input id="u_ciudad" name="ciudad" type="text" placeholder="Ej. Quito" style={iS} />
              </div>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_provincia" style={lS}>Provincia *</label>
                <select id="u_provincia" name="provincia" required style={iS}>
                  <option value="">Selecciona tu provincia</option>
                  {PROVINCIAS_EC.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset style={{ border: "none", padding: 0, margin: "28px 0 0" }}>
            <legend style={flegend}>PERFIL PROFESIONAL</legend>
            <div className="cform__field">
              <label className="cform__label" htmlFor="u_prof" style={lS}>Profesión / Ocupación actual</label>
              <input id="u_prof" name="profesion" type="text" placeholder="Ej. Ingeniera comercial, emprendedora" style={iS} />
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" style={lS}>¿Tienes RUC activo?</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {['Sí, tengo RUC activo','No aún, pero puedo tramitarlo','No lo tengo y no sé cómo obtenerlo'].map(op => (
                  <label key={op} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                    <input type="radio" name="tiene_ruc" value={op} style={{ accentColor: "#E6C77A" }} />
                    {op}
                  </label>
                ))}
              </div>
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" htmlFor="u_como" style={lS}>¿Cómo nos conociste?</label>
              <select id="u_como" name="como_supo" style={iS}>
                <option value="">Selecciona una opción</option>
                {COMO_SUPO_OPS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </fieldset>

          <fieldset style={{ border: "none", padding: 0, margin: "28px 0 0" }}>
            <legend style={flegend}>TU MOTIVACIÓN</legend>
            <div className="cform__field">
              <label className="cform__label" htmlFor="u_motiv" style={lS}>¿Por qué quieres ser parte de la Fábrica de Sueños? *</label>
              <textarea id="u_motiv" name="motivacion" rows="4" required
                placeholder="Cuéntanos tu historia, tu sueño y por qué CateonCook es el camino para lograrlo..."
                style={{ ...iS, resize: "vertical" }} />
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" htmlFor="u_video" style={lS}>Link de tu video de presentación (recomendado)</label>
              <input id="u_video" name="video_url" type="url"
                placeholder="https://youtube.com/... o https://drive.google.com/..." style={iS} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4, display: "block" }}>
                YouTube (no listado) o Google Drive. Duración recomendada: 1–3 min.
              </span>
            </div>
          </fieldset>

          <div className="cform__submit" style={{ marginTop: 28 }}>
            <span className="cform__legal" style={{ color: "rgba(255,255,255,0.5)" }}>
              AL ENVIAR AUTORIZAS EL TRATAMIENTO DE TUS DATOS PARA EL PROCESO DE SELECCIÓN ·{" "}
              <a href="CateonCook Privacidad.html" style={{ color: "rgba(230,199,122,0.7)" }}>VER POLÍTICA</a>
            </span>
            {error && (
              <div style={{ color: "#ff6b6b", fontSize: 13, padding: "8px 0" }}>
                Error al enviar. Escríbenos a{" "}
                <a href="mailto:administracion@cateoncook.com" style={{ color: "#E6C77A" }}>administracion@cateoncook.com</a>
              </div>
            )}
            <button type="submit" className="btn btn--lg btn--primary" disabled={sending} style={sending ? { opacity: 0.6 } : {}}>
              {sending ? "Enviando solicitud…" : "Enviar solicitud de ingreso →"}
            </button>
          </div>
        </form>
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
