/* CateonCook — refined home. Hero + Split preview only.
   Header / Footer / SectionDivider / WhatsApp are in cc-shell.jsx
   Producto / Únete / Nosotros are now full pages, not sections. */

const { useState, useEffect, useRef } = React;

const C = window.CC;

/* ════════════════ TweakDefaults ════════════════ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E6C77A",
  "showGrid": false,
  "panel0bg": "deep",
  "audioOn": true
}/*EDITMODE-END*/;

/* ════════════════ Title Cube (preserved effect) ════════════════ */
const PANELS = [
  { type: "title" },
  { type: "image", label: "hero-1 · década 2010", src: "img/hero-1.jpg", pos: "center 45%", href: "CateonCook Nosotros.html#decada-2010" },
  { type: "image", label: "hero-2 · lustro 2015",  src: "img/hero-2.jpg", pos: "center 40%", href: "CateonCook Nosotros.html#lustro-2015" },
  { type: "image", label: "hero-3 · año 2020",     src: "img/hero-3.jpg", pos: "center 30%", href: "CateonCook Nosotros.html#ano-2020"    },
  { type: "image", label: "hero-4 · año 2023",     src: "img/hero-4.jpg", pos: "center 40%", href: "CateonCook Nosotros.html#ano-2023"    },
];
const CYCLE = [0, 1, 2, 0, 3, 4];
const randomMs = (i, first) => {
  if (first) return 5500;
  return i === 0 ? Math.random() * 2000 + 3500 : Math.random() * 3000 + 2200;
};

function TitleCube({ accent, onActiveChange }) {
  const [active, setActive] = useState(CYCLE[0]);
  const [glare, setGlare] = useState(false);
  const cycleRef = useRef(0);
  const timerRef = useRef(null);
  const glareTimerRef = useRef(null);

  useEffect(() => {
    if (onActiveChange) onActiveChange(CYCLE[0] === 0);
  }, []);

  useEffect(() => {
    if (onActiveChange) onActiveChange(active === 0);
  }, [active]);

  useEffect(() => {
    let first = true;
    function schedule() {
      const currentPanel = CYCLE[cycleRef.current];
      timerRef.current = setTimeout(() => {
        const nextPos = (cycleRef.current + 1) % CYCLE.length;
        cycleRef.current = nextPos;
        setActive(CYCLE[nextPos]);
        first = false;
        schedule();
      }, randomMs(currentPanel, first));
    }
    schedule();
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (glareTimerRef.current) clearTimeout(glareTimerRef.current);
    if (active !== 0) return;
    function fire() {
      setGlare(true);
      glareTimerRef.current = setTimeout(() => {
        setGlare(false);
        glareTimerRef.current = setTimeout(fire, Math.random() * 3000 + 1800);
      }, 1050);
    }
    glareTimerRef.current = setTimeout(fire, Math.random() * 1200 + 600);
    return () => clearTimeout(glareTimerRef.current);
  }, [active]);

  const isTitle = active === 0;
  return (
    <div className={`tcube${isTitle ? " tcube--title" : ""}`}>
      {PANELS.map((panel, i) => (
        <div key={i} className={`tcube-panel${i === active ? " is-active" : ""}`}>
          {panel.type === "title" ? (
            <h1 className="hero-title">
              Fábrica de<br />
              <em className={glare ? "glare" : ""} style={{ "--accent": accent }}>Sueños</em>
            </h1>
          ) : (
            <>
              <a
                href={panel.href}
                className="tcube-image"
                tabIndex={i === active ? 0 : -1}
                aria-label="Ver historia"
              >
                <img src={panel.src} alt={panel.label} className="tcube-image__photo" style={{ objectPosition: panel.pos }} />
                <div className="tcube-image__grain" />
              </a>
              <div className="tcube-panel__bars" aria-hidden="true" />
              <div className="tcube-image__nav" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10L10 2" /><path d="M5 2h5v5" />
                </svg>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════ HeroTransition ════════════════ */
function HeroTransition({ audioOn }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const wrap = wrapRef.current;
    if (!hero || !wrap) return;
    let prevRatio = 1;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        if (prevRatio >= 1 && ratio < 1) fire(wrap, audioOn);
        if (prevRatio < 0.5 && ratio >= 0.5) fire(wrap, audioOn);
        prevRatio = ratio;
      },
      { threshold: [0, 0.5, 1.0] }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [audioOn]);
  function fire(wrap, audioOn) {
    wrap.classList.remove("htrans--on");
    void wrap.offsetWidth;
    wrap.classList.add("htrans--on");
    if (audioOn) playChord();
  }
  function playChord() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [[261.63, 0], [329.63, 0.07], [392.0, 0.14]].forEach(([freq, delay]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine"; osc.frequency.value = freq;
        const t = ctx.currentTime + delay;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.34, t + 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);
        osc.start(t); osc.stop(t + 0.85);
      });
    } catch {}
  }
  return (
    <div ref={wrapRef} className="htrans" aria-hidden="true">
      <svg className="htrans__svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path className="htrans__path htrans__path--thin" d="M0,44 L1440,44" />
        <path className="htrans__path htrans__path--thick" d="M0,37 L1440,37" />
      </svg>
    </div>
  );
}

/* ════════════════ Hero ════════════════ */
function Hero({ accent, bgVariant }) {
  const [isTitle, setIsTitle] = useState(true);
  return (
    <section className={`hero hero--${bgVariant}${isTitle ? "" : " hero--img-active"}`} id="inicio">
      <div className="hero__bg" />
      <div className="hero__vignette" />

      <div className="hero__stage">
        <div className="hero__corner-tag">
          <span className="dot" /> DISTRIBUIDOR AUTORIZADO ROYAL PRESTIGE · ECUADOR
        </div>
        <div className="hero__logo-mark">
          <CCLogoMark size={56} color="rgba(255,255,255,0.85)" />
        </div>
        <TitleCube accent={accent} onActiveChange={setIsTitle} />
        <p className="hero__subtitle">
          <span className="hero__subtitle-rule" />
          Comunidad que nutre
          <span className="hero__subtitle-rule" />
        </p>
        <div className="hero__cta-row">
          <a className="btn btn--lg btn--primary" href="CateonCook Unete.html">Sé parte de la fábrica</a>
          <a className="btn btn--lg btn--ghost-light" href="CateonCook Producto.html">Conoce el producto</a>
        </div>
      </div>

      <a className="hero__scroll" href="#oportunidad" aria-label="Bajar a oportunidad">
        <span className="hero__scroll-label">DESCUBRE</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </a>
    </section>
  );
}

/* ════════════════ Split preview (Emprendedor / Distribuidor) ════════════════ */
function SplitPreview() {
  const tiers = [
    {
      badge: "Emprendedor",
      icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
      title: <>Construye tu negocio<br /><em>a tu propio ritmo</em></>,
      desc: "Empieza a generar ingresos desde el primer día con el respaldo de un equipo comprometido. Un modelo probado y sostenible.",
      features: [
        "Capacitaciones y actividades programadas",
        "Acompañamiento continuo de tu sponsor",
        "Comisiones desde el inicio",
        "Comunidad activa de crecimiento personal",
      ],
      cta: "EXPLORAR OPORTUNIDAD",
      href: "CateonCook Oportunidad.html",
      tone: "premium",
    },
    {
      badge: "Distribuidor",
      icon: <path d="M17 3H7L2 12l10 9 10-9-5-9z" />,
      title: <>Expande tu red<br /><em>y tus ganancias</em></>,
      desc: "Lleva CateonCook más lejos. Condiciones preferenciales, mayor margen y la posibilidad de abrir nuevos territorios.",
      features: [
        "Todo lo incluido como Emprendedor",
        "Compras al por mayor preferenciales",
        "Mayor margen y bonos por volumen",
        "Apertura de nuevos territorios",
      ],
      cta: "EXPLORAR OPORTUNIDAD",
      href: "CateonCook Oportunidad.html",
      tone: "master",
    },
  ];

  return (
    <section className="split" id="oportunidad" aria-label="La Oportunidad">
      {tiers.map((t, i) => (
        <div key={i} className={`split__half split__half--${t.tone}`}>
          <div className={`split__content reveal reveal-delay-${i + 1}`}>
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
            <a className={`btn btn--lg btn--${t.tone}`} href={t.href}>{t.cta}</a>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ════════════════ Voces — editorial featured testimonial ════════════════ */
const VOCES = [
  {
    fig: "Fig. 03·a",
    name: <>María <em>Fernanda</em></>,
    role: "Distribuidora",
    city: "Loja",
    years: "8",
    yearsLabel: "AÑOS · CC",
    quote: <>Aquí no encontré un negocio. Encontré una <span className="em-gold">familia</span> que me empujó a convertirme en la mejor versión de mí misma.</>,
    portrait: "linear-gradient(135deg, #5a3a18 0%, #2a1a08 60%, #1a0e04 100%)",
    initial: "M",
  },
  {
    fig: "Fig. 03·b",
    name: <>Verónica <em>Pacheco</em></>,
    role: "Distribuidora",
    city: "Cuenca",
    years: "6",
    yearsLabel: "AÑOS · CC",
    quote: <>Empecé vendiendo a tres amigas. Hoy mi equipo de cuarenta socias cocina por <span className="em-gold">todo el austro.</span></>,
    portrait: "linear-gradient(135deg, #3a4a6e 0%, #142d70 55%, #0d1a2e 100%)",
    initial: "V",
  },
  {
    fig: "Fig. 03·c",
    name: <>Andrés <em>Maldonado</em></>,
    role: "Emprendedor",
    city: "Quito",
    years: "2",
    yearsLabel: "AÑOS · CC",
    quote: <>Lo que me sostuvo no fueron las comisiones — fue saber que mi sponsor estaba <span className="em-gold">a un mensaje.</span></>,
    portrait: "linear-gradient(135deg, #3a5a4a 0%, #1a3a2a 60%, #0d1f15 100%)",
    initial: "A",
  },
  {
    fig: "Fig. 03·d",
    name: <>Luisa <em>Terán</em></>,
    role: "Mentora",
    city: "Guayaquil",
    years: "4",
    yearsLabel: "AÑOS · CC",
    quote: <>Llegué buscando un ingreso extra. Encontré una <span className="em-gold">segunda profesión</span> y una segunda familia.</>,
    portrait: "linear-gradient(135deg, #7a6024 0%, #4a3a14 55%, #2a1f0a 100%)",
    initial: "L",
  },
  {
    fig: "Fig. 03·e",
    name: <>Carolina <em>Ávila</em></>,
    role: "Directora",
    city: "Ambato",
    years: "12",
    yearsLabel: "AÑOS · CC",
    quote: <>Construí mi propia oficina, mi propio equipo y, sobre todo, <span className="em-gold">mi propia voz.</span></>,
    portrait: "linear-gradient(135deg, #4a2a4a 0%, #2a1a3a 60%, #0d0a1f 100%)",
    initial: "C",
  },
];

const CALLOUT_IMGS = [
  "img/hero-1.jpg",
  "img/hero-2.jpg",
  "img/hero-3.jpg",
  "img/hero-4.jpg",
];

function VocesSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % VOCES.length);
    }, 7000);
    return () => clearTimeout(timerRef.current);
  }, [idx, paused]);

  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % CALLOUT_IMGS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const current = VOCES[idx];
  const total = VOCES.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const advanceImg = () => setImgIdx(i => (i + 1) % CALLOUT_IMGS.length);

  return (
    <section
      className="section section--cream voces"
      id="voces"
      aria-label="Voces de la comunidad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="section__corner-fig">Fig. 03 · Voces</span>
      <div className="section__inner">
        <div className="section__header reveal">
          <div>
            <span className="section__eyebrow">
              <span className="section__eyebrow-rule" />
              Comunidad
            </span>
            <h2 className="section__title">
              Quinientas voces,<br />
              <em>un mismo eco.</em>
            </h2>
          </div>
          <p className="section__lede">
            Cada socio que se suma a CateonCook acepta que lo llames y le hagas todas las
            preguntas que quieras antes de unirte. Estas son cinco voces que ya pasaron por
            esta misma página.
          </p>
        </div>

        <div className="voces__product">
          <div className="voces__product-strip">
            <div
              className="voces__product-imgs"
              onClick={advanceImg}
              role="button"
              tabIndex={0}
              aria-label="Ver siguiente imagen del producto"
              onKeyDown={e => e.key === "Enter" && advanceImg()}
            >
              {CALLOUT_IMGS.map((src, i) => (
                <img key={i} src={src} alt="" className={`voces__product-img${i === imgIdx ? " is-active" : ""}`} />
              ))}
              <div className="voces__product-dots" aria-hidden="true">
                {CALLOUT_IMGS.map((_, i) => (
                  <span key={i} className={`voces__product-dot${i === imgIdx ? " is-active" : ""}`} />
                ))}
              </div>
            </div>
            <div className="voces__product-text">
              <span className="section__eyebrow">
                <span className="section__eyebrow-rule" />
                El producto
              </span>
              <h3 className="voces__product-title">
                Cocina sin agua, <em>sin grasa,</em> sin dolor.
              </h3>
            </div>
            <div className="voces__product-specs">
              <div className="voces__product-spec">
                <span className="voces__product-num">9<em>+</em></span>
                <span className="voces__product-label">capas de acero</span>
              </div>
              <div className="voces__product-spec">
                <span className="voces__product-num">50<em>%</em></span>
                <span className="voces__product-label">menos energía</span>
              </div>
              <div className="voces__product-spec">
                <span className="voces__product-num">∞</span>
                <span className="voces__product-label">garantía vitalicia</span>
              </div>
            </div>
            <a className="btn btn--primary" href="CateonCook Producto.html">
              Conoce el producto →
            </a>
          </div>
        </div>

        <div className="voces__feature">
          <div className="voces__portrait">
            <span className="voces__portrait-fig">{current.fig}</span>
            {VOCES.map((v, i) => (
              <div
                key={i}
                className={`voces__portrait-img${i === idx ? " is-active" : ""}`}
                style={{ background: v.portrait }}
                aria-hidden={i !== idx}
              />
            ))}
            <span className="voces__portrait-mark" aria-hidden="true">{current.initial}.</span>
          </div>

          <div className="voces__quote-col">
            <div>
              <div className="voces__quote-mark" aria-hidden="true">"</div>
              <p key={idx} className="voces__quote-text">
                {current.quote}"
              </p>
            </div>
            <div className="voces__strip" role="tablist" aria-label="Seleccionar testimonio">
              <div className="voces__strip-label">
                <span>Las voces</span>
                <span className="voces__counter">
                  {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
              {VOCES.map((v, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === idx}
                  className={`voces__thumb${i === idx ? " is-active" : ""}`}
                  onClick={() => setIdx(i)}
                >
                  <div className="voces__thumb-img" style={{ background: v.portrait }} />
                  <div className="voces__thumb-bar" aria-hidden="true">
                    <span className="voces__thumb-bar-fill" />
                  </div>
                  <span className="voces__thumb-name">{v.initial}. {v.role}</span>
                  <span className="voces__thumb-meta">{v.city} · {v.years} años</span>
                </button>
              ))}
            </div>
            <div className="voces__attr">
              <div>
                <div className="voces__attr-name">{current.name}</div>
                <div className="voces__attr-meta">
                  {current.role} · {current.city}
                </div>
              </div>
              <div className="voces__attr-divider" />
              <div>
                <div className="voces__attr-num">{current.years}</div>
                <div>{current.yearsLabel}</div>
              </div>
            </div>
          </div>
        </div>


        <div className="voces__nav">
          <button className="voces__nav-btn" onClick={prev} aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="voces__nav-btn" onClick={next} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <span>Cinco socios · cinco ciudades · una misma red</span>
          <div className="voces__nav-cta">
            <a className="btn btn--lg btn--premium" href="CateonCook Nosotros.html">Conoce a la familia →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════ Marquee — community ribbon ════════════════ */
function CommunityMarquee() {
  const items = [
    <>Loja <em>· 8 años</em></>,
    <>Cuenca <em>· 6 años</em></>,
    <>Quito <em>· 22 años</em></>,
    <>Guayaquil <em>· 11 años</em></>,
    <>Ambato <em>· 4 años</em></>,
    <>Manta <em>· 3 años</em></>,
    <>Riobamba <em>· 7 años</em></>,
    <>Ibarra <em>· 5 años</em></>,
    <>Machala <em>· 9 años</em></>,
    <>Esmeraldas <em>· 2 años</em></>,
  ];
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((it, i) => (
          <span key={i} className="marquee__item">
            {it}
            <span className="marquee__sep" />
          </span>
        ))}
      </div>
    </div>
  );
}


/* ════════════════ Home App ════════════════ */
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tw.accent);
    document.documentElement.classList.toggle("show-grid", !!tw.showGrid);
  }, [tw.accent, tw.showGrid]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header currentPage={null} />
      <main>
        <Hero accent={tw.accent} bgVariant={tw.panel0bg} />
        <HeroTransition audioOn={tw.audioOn} />
        <SplitPreview />
        <SectionDivider direction="dark-to-cream" targetSelector="#voces" />
        <VocesSection />
        <CommunityMarquee />
        <SectionDivider direction="cream-to-dark" targetSelector=".footer" />
      </main>
      <FooterSection />
      <WhatsAppFab />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakColor
            label="Acento (glare + CTA)"
            value={tw.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#E6C77A", "#1BA8E0", "#C9A85B", "#FFFFFF"]}
          />
          <TweakRadio
            label="Fondo del hero"
            value={tw.panel0bg}
            onChange={(v) => setTweak("panel0bg", v)}
            options={[
              { value: "deep", label: "Profundo" },
              { value: "warm", label: "Cálido" },
              { value: "studio", label: "Estudio" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Sistema">
          <TweakToggle label="Mostrar grid" value={tw.showGrid} onChange={(v) => setTweak("showGrid", v)} />
          <TweakToggle label="Audio en transición" value={tw.audioOn} onChange={(v) => setTweak("audioOn", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
