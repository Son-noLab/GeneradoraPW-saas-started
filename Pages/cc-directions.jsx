/* CateonCook — 4 redesign directions for the home page */

const D = window.CC;

/* ═══════════════════════════════════════════════════════════════════
   DIRECTION A — Editorial Serif
   Cream paper, italic Cormorant, asymmetric, Hermès/Aesop influence
   ═══════════════════════════════════════════════════════════════════ */
function DirEditorial() {
  return (
    <div style={{ width: "100%", height: "100%", background: D.cream, color: D.ink, fontFamily: "'Inter', sans-serif", overflow: "hidden", position: "relative" }}>

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 56px", borderBottom: `1px solid ${D.ink}10` }}>
        <CCLogo size={14} />
        <nav style={{ display: "flex", gap: 36, fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span>Oportunidad</span><span>Producto</span><span>Únete</span><span>Nosotros</span>
        </nav>
        <Btn label="Sé parte de la fábrica" variant="outline" size="sm" />
      </div>

      {/* hero — asymmetric */}
      <div style={{ padding: "60px 56px 40px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "end" }}>
        <div>
          <Eyebrow color={D.muted}>Distribuidor Autorizado Royal Prestige · Ecuador</Eyebrow>
          <div style={{ marginTop: 18 }}>
            <Serif size={132} weight={300}>Fábrica de</Serif>
            <div style={{ marginTop: -8 }}>
              <Serif italic size={148} weight={400} color={D.ink}>Sueños.</Serif>
            </div>
          </div>
          <div style={{ marginTop: 28, maxWidth: 380 }}>
            <Body size={15}>
              Un territorio que desarrolla socios estratégicos a través de un plan de mercadeo probado, sostenible, y profundamente humano.
            </Body>
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center" }}>
            <Btn label="Sé parte de la fábrica →" variant="dark" />
            <Btn label="Conoce el producto" variant="ghost" />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Photo label="retrato · socia en cocina · luz cálida" h={460} />
          <div style={{ position: "absolute", bottom: -18, left: -18, padding: "10px 14px", background: D.cream, border: `1px solid ${D.ink}20`, maxWidth: 220 }}>
            <Eyebrow color={D.muted} style={{ fontSize: 9 }}>Fig. 01</Eyebrow>
            <div style={{ fontSize: 12, marginTop: 4, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>"Aquí encontré una comunidad que nutre."</div>
          </div>
        </div>
      </div>

      {/* numerical band */}
      <div style={{ padding: "28px 56px", borderTop: `1px solid ${D.ink}15`, borderBottom: `1px solid ${D.ink}15`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {[
          ["+500", "familias"],
          ["24", "provincias"],
          ["05", "países en suramérica"],
          ["20+", "años de marca"],
        ].map(([n, l], i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <Serif size={44} weight={300}>{n}</Serif>
            <div style={{ fontSize: 11, color: D.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* mission — asymmetric two-line */}
      <div style={{ padding: "60px 56px 24px", display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: 56 }}>
        <div>
          <Eyebrow color={D.gold}>I. Misión</Eyebrow>
          <div style={{ marginTop: 12 }}>
            <Photo label="bodegón · olla Royal Prestige" h={260} gold />
          </div>
        </div>
        <div style={{ paddingTop: 12 }}>
          <Serif size={48} weight={300} style={{ display: "block", maxWidth: 560 }}>
            Desarrollamos socios estratégicos que <Serif italic size={48} weight={400}>transforman</Serif> su vida.
          </Serif>
          <div style={{ marginTop: 22, maxWidth: 500 }}>
            <Body size={14}>
              Impulsamos a cada socio a alcanzar un crecimiento personal, profesional y competitivo a través de la oportunidad de negocio que brinda un plan de mercadeo exitoso y sostenible en el tiempo.
            </Body>
          </div>
        </div>
      </div>

      <Annotation style={{ position: "absolute", top: 100, right: 24 }}>↑ italic Cormorant carries the brand</Annotation>
      <Annotation style={{ position: "absolute", left: 56, bottom: 14 }}>scroll continues — testimonios · CTA</Annotation>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DIRECTION B — Conversion-Focused
   Navy + sky, structured value grid, multi-CTA, social proof
   ═══════════════════════════════════════════════════════════════════ */
function DirConversion() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", color: D.ink, fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>

      {/* utility bar */}
      <div style={{ background: D.navy950, color: "#fff", padding: "8px 56px", display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.04em" }}>
        <span>★ Distribuidor Autorizado Royal Prestige · Ecuador</span>
        <span style={{ opacity: 0.7 }}>Atención socios → WhatsApp +593 · · ·</span>
      </div>

      {/* header */}
      <div style={{ padding: "16px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${D.border}` }}>
        <CCLogo size={14} />
        <nav style={{ display: "flex", gap: 28, fontSize: 13, fontWeight: 500 }}>
          <span>Oportunidad</span><span>Producto</span><span>Cómo unirse</span><span>Nosotros</span>
        </nav>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn label="Iniciar sesión" variant="ghost" size="sm" />
          <Btn label="Sé parte →" variant="primary" size="sm" />
        </div>
      </div>

      {/* hero — split */}
      <div style={{ padding: "56px 56px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <Pill bg={D.bgLight} border={`1px solid ${D.border}`} style={{ color: D.navy800 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: D.sky }} /> Reclutamos socios estratégicos en Ecuador
          </Pill>
          <div style={{ marginTop: 18 }}>
            <Serif size={64} weight={400} color={D.ink}>
              Construye un negocio<br />
              <Serif italic size={64} weight={400} color={D.navy600}>a tu ritmo,</Serif>{" "}
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em" }}>sin techo.</span>
            </Serif>
          </div>
          <div style={{ marginTop: 20, maxWidth: 460 }}>
            <Body size={15} color={D.muted}>
              Únete a CateonCook — el territorio Royal Prestige que ha desarrollado a más de 500 familias en 24 provincias del Ecuador.
            </Body>
          </div>
          <div style={{ marginTop: 26, display: "flex", gap: 12, alignItems: "center" }}>
            <Btn label="Aplicar en 2 minutos →" variant="primary" size="lg" />
            <Btn label="Ver el producto" variant="outline" size="lg" />
          </div>
          <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex" }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 999, background: D.bgAlt, border: "2px solid #fff", marginLeft: i === 0 ? 0 : -8 }} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: D.muted }}>
              <span style={{ color: D.gold }}>★★★★★</span> · 500+ socios activos hoy
            </div>
          </div>
        </div>
        <div>
          <Photo label="producto + socio · cocina iluminada" h={420} />
        </div>
      </div>

      {/* value grid — 4 up from features.tsx */}
      <div style={{ padding: "32px 56px 24px", background: D.bgLight }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <Eyebrow>La Oportunidad</Eyebrow>
            <div style={{ marginTop: 6 }}>
              <Serif size={36} weight={400}>Por qué elegir <Serif italic size={36} weight={400}>CateonCook</Serif></Serif>
            </div>
          </div>
          <Annotation>↑ 4 pilares de la oferta</Annotation>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { l: "Tiempo",      t: "Flexibilidad real",      d: "Tú decides cuándo y cómo trabajar. Sin horarios fijos." },
            { l: "Productos",   t: "Royal Prestige",          d: "Distribuyes una de las marcas de cocina de mayor prestigio del mundo." },
            { l: "Comunidad",   t: "Equipo que impulsa",      d: "Capacitaciones constantes y una comunidad que nutre." },
            { l: "Crecimiento", t: "Negocio sostenible",      d: "Un plan de mercadeo probado, expansible a toda Suramérica." },
          ].map((f, i) => (
            <div key={i} style={{ background: "#fff", padding: 22, border: `1px solid ${D.border}` }}>
              <div style={{ width: 36, height: 36, border: `1px solid ${D.navy600}`, color: D.navy600, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 16, height: 16, border: `1.5px solid ${D.navy600}` }} />
              </div>
              <Eyebrow style={{ marginTop: 14, display: "block" }}>{f.l}</Eyebrow>
              <div style={{ marginTop: 6 }}>
                <Serif size={22} weight={400}>{f.t}</Serif>
              </div>
              <Body size={12} style={{ marginTop: 8 }}>{f.d}</Body>
            </div>
          ))}
        </div>
      </div>

      {/* how it works strip */}
      <div style={{ padding: "32px 56px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, alignItems: "start" }}>
        {[
          ["01", "Aplica",      "Llena el formulario en 2 minutos."],
          ["02", "Conversamos", "Un líder del territorio te llama en 24h."],
          ["03", "Empiezas",    "Onboarding + tu primer kit Royal Prestige."],
        ].map(([n, t, d], i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <Serif size={32} weight={300} color={D.sky}>{n}</Serif>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{t}</div>
            </div>
            <Body size={13} style={{ marginTop: 6 }}>{d}</Body>
          </div>
        ))}
      </div>

      {/* sticky CTA banner */}
      <div style={{ margin: "8px 56px 24px", padding: "24px 32px", background: D.navy900, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: D.sky, letterSpacing: "0.1em" }}>¿LISTO PARA COMENZAR?</div>
          <div style={{ marginTop: 4 }}>
            <Serif size={28} weight={400} color="#fff">Tu próximo capítulo empieza con una conversación.</Serif>
          </div>
        </div>
        <Btn label="Sé parte de la fábrica →" variant="primary" size="lg" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DIRECTION C — Cinematic Scroll
   Full-bleed stacked chapters, big imagery, narrative pacing
   ═══════════════════════════════════════════════════════════════════ */
function DirCinematic() {
  return (
    <div style={{ width: "100%", height: "100%", background: D.navy950, color: "#fff", fontFamily: "'Inter', sans-serif", overflow: "hidden", position: "relative" }}>

      {/* floating header */}
      <div style={{ position: "absolute", inset: "0 0 auto 0", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 5 }}>
        <CCLogo color="#fff" size={13} />
        <nav style={{ display: "flex", gap: 24, fontSize: 12, color: "rgba(255,255,255,0.85)", letterSpacing: "0.08em" }}>
          <span>OPORTUNIDAD</span><span>PRODUCTO</span><span>ÚNETE</span><span>NOSOTROS</span>
        </nav>
        <Btn label="Sé parte →" variant="outlineLight" size="sm" />
      </div>

      {/* CHAPTER 00 — hero scene */}
      <div style={{ position: "relative", height: 520 }}>
        <Photo label="video loop · cocina + manos + vapor · 12s" w="100%" h="100%" dark />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${D.navy950}cc 0%, transparent 40%, ${D.navy950}f0 100%)` }} />
        <div style={{ position: "absolute", left: 56, bottom: 56, right: 56, display: "flex", alignItems: "end", justifyContent: "space-between" }}>
          <div>
            <Eyebrow color={D.sky}>Capítulo 00 — Bienvenida</Eyebrow>
            <div style={{ marginTop: 14 }}>
              <Serif size={120} weight={300} color="#fff">Fábrica de</Serif>
              <div style={{ marginTop: -12 }}>
                <Serif italic size={140} weight={400} color={D.goldHi}>Sueños.</Serif>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 320, paddingBottom: 12 }}>
            <Body size={14} color="rgba(255,255,255,0.7)">
              Una historia en cuatro capítulos sobre el territorio, los productos, la comunidad y tu lugar en ella.
            </Body>
            <div style={{ marginTop: 16 }}>
              <Btn label="Empezar el recorrido ↓" variant="gold" />
            </div>
          </div>
        </div>
        {/* corner ticker */}
        <div style={{ position: "absolute", right: 56, top: 76, padding: "6px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 10, letterSpacing: "0.12em" }}>
          DISTRIBUIDOR · ROYAL PRESTIGE · ECUADOR
        </div>
      </div>

      {/* CHAPTER 01 — el territorio */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 320 }}>
        <div style={{ padding: "48px 56px", background: D.navy900, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Eyebrow color={D.sky}>Capítulo 01 — El territorio</Eyebrow>
          <div style={{ marginTop: 14 }}>
            <Serif size={56} weight={300} color="#fff">No vendemos ollas.<br /></Serif>
            <Serif italic size={56} weight={400} color={D.goldHi}>Construimos territorios.</Serif>
          </div>
          <Body size={14} color="rgba(255,255,255,0.65)" style={{ marginTop: 16, maxWidth: 420 }}>
            Cateon Cook es un territorio que desarrolla socios estratégicos — desde Guayaquil hasta toda Suramérica.
          </Body>
        </div>
        <Photo label="paisaje Ecuador · andes al atardecer" w="100%" h="100%" dark />
      </div>

      {/* CHAPTER 02 — el producto */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", height: 280 }}>
        <Photo label="bodegón producto · acero pulido · oro" w="100%" h="100%" gold />
        <div style={{ padding: "40px 48px", background: "#11192d", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Eyebrow color={D.goldHi}>Capítulo 02 — El producto</Eyebrow>
          <div style={{ marginTop: 14 }}>
            <Serif size={44} weight={400} color="#fff">Royal Prestige.</Serif>
            <Serif italic size={44} weight={400} color={D.goldHi}>Cocina por generaciones.</Serif>
          </div>
          <Body size={13} color="rgba(255,255,255,0.6)" style={{ marginTop: 14 }}>
            Una de las marcas de cocina de mayor prestigio del mundo. De alta demanda, alta retención, alto margen.
          </Body>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <Pill color={D.goldHi} bg="transparent" border={`1px solid ${D.goldHi}50`}>+60 años</Pill>
            <Pill color={D.goldHi} bg="transparent" border={`1px solid ${D.goldHi}50`}>30+ países</Pill>
            <Pill color={D.goldHi} bg="transparent" border={`1px solid ${D.goldHi}50`}>Garantía vitalicia</Pill>
          </div>
        </div>
      </div>

      <Annotation style={{ position: "absolute", left: 56, bottom: 12, color: "rgba(255,255,255,0.5)" }}>
        ↓ scroll continues — Cap.03 La comunidad · Cap.04 Tu lugar
      </Annotation>
      <Annotation style={{ position: "absolute", right: 24, top: 540, color: "rgba(255,255,255,0.5)" }}>
        ← chapters reveal on scroll, sticky text columns
      </Annotation>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DIRECTION D — Local / Documentary
   Photo mosaic, Ecuador map, quote-driven, grounded and human
   ═══════════════════════════════════════════════════════════════════ */
function DirLocal() {
  return (
    <div style={{ width: "100%", height: "100%", background: D.paper, color: D.ink, fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>

      {/* slim header */}
      <div style={{ padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${D.ink}15` }}>
        <CCLogo size={14} />
        <nav style={{ display: "flex", gap: 24, fontSize: 12, letterSpacing: "0.1em" }}>
          <span>OPORTUNIDAD</span><span>PRODUCTO</span><span>ÚNETE</span><span>NOSOTROS</span>
        </nav>
        <Btn label="WhatsApp →" variant="outline" size="sm" />
      </div>

      {/* hero — half-half, headline + portrait */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 380 }}>
        <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Eyebrow color={D.muted}>Ecuador · 24 provincias · 500 familias</Eyebrow>
          <div style={{ marginTop: 16 }}>
            <Serif size={68} weight={300}>Una comunidad</Serif>
            <Serif italic size={72} weight={400} style={{ display: "block", marginTop: -4 }}>que nutre.</Serif>
          </div>
          <Body size={14} style={{ marginTop: 18, maxWidth: 420 }}>
            Detrás de cada socio CateonCook hay una historia real. Conoce las personas, las cocinas y las ciudades que forman este territorio.
          </Body>
          <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
            <Btn label="Conoce a los socios →" variant="dark" />
            <Btn label="Postular" variant="ghost" />
          </div>
        </div>
        <div style={{ position: "relative", padding: 24, background: D.bgAlt }}>
          <Photo label="retrato Maria · 41 · Cuenca · 3 años" w="100%" h="100%" />
          <div style={{ position: "absolute", top: 36, left: 0, padding: "6px 14px", background: D.ink, color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em" }}>
            EP. 12 — MARIA EN CUENCA
          </div>
        </div>
      </div>

      {/* photo mosaic + map */}
      <div style={{ padding: "32px 48px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "120px 120px", gap: 8 }}>
        <Photo label="cocina · Quito" h="100%" />
        <Photo label="reunión equipo" h="100%" />
        <div style={{ gridRow: "span 2", padding: 18, background: D.bgLight, position: "relative" }}>
          <Eyebrow color={D.sky}>Mapa del territorio</Eyebrow>
          <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600 }}>Ecuador, provincia por provincia</div>
          {/* simplified Ecuador outline */}
          <svg viewBox="0 0 200 240" style={{ width: "100%", height: 180, marginTop: 8 }}>
            <path
              d="M40 30 L100 20 L150 35 L170 60 L175 100 L165 140 L150 170 L130 200 L100 220 L70 215 L45 195 L30 165 L25 130 L30 90 L35 55 Z"
              fill="none"
              stroke={D.navy600}
              strokeWidth="1.5"
            />
            {[
              [80, 60], [110, 80], [60, 100], [120, 120], [90, 145], [140, 95], [70, 175], [115, 165],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill={D.sky} />
            ))}
          </svg>
          <div style={{ fontSize: 11, color: D.muted, marginTop: 4 }}>● socios activos · actualizado mensual</div>
        </div>
        <Photo label="producto entrega" h="100%" />
        <Photo label="capacitación" h="100%" />
        <Photo label="familia · Loja" h="100%" />
        <Photo label="evento anual" h="100%" />
      </div>

      {/* quote band */}
      <div style={{ padding: "30px 48px", borderTop: `1px solid ${D.ink}15`, borderBottom: `1px solid ${D.ink}15`, background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
          {[
            { q: "Pasé de cocinar para mi familia a tener mi propio equipo de 18 socias.", n: "Maria E.", c: "Cuenca · 3 años" },
            { q: "Aquí encontré horarios reales, capacitación real, y una marca que se vende sola.", n: "Andrés P.", c: "Guayaquil · 5 años" },
            { q: "El plan funciona si tú funcionas. Yo decidí funcionar.", n: "Lucía R.", c: "Quito · 2 años" },
          ].map((t, i) => (
            <div key={i}>
              <Serif italic size={22} weight={400} style={{ display: "block", lineHeight: 1.2 }}>
                "{t.q}"
              </Serif>
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: D.bgAlt }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{t.n}</div>
                  <div style={{ fontSize: 11, color: D.muted }}>{t.c}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer cta */}
      <div style={{ padding: "22px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Body size={13} color={D.ink}>¿Quieres aparecer aquí el próximo año?</Body>
        <Btn label="Postular como socio →" variant="primary" />
      </div>
    </div>
  );
}

/* expose */
Object.assign(window, { DirEditorial, DirConversion, DirCinematic, DirLocal });
