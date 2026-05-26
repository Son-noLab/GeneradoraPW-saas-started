/* CateonCook — shared shell components reused across all pages.
   Header, MobileMenu, WhatsApp FAB, Footer, SectionDivider, PageHero.
   The `currentPage` prop drives the underlined active nav link. */

const { useState: useStateSH, useEffect: useEffectSH, useRef: useRefSH } = React;

const NAV_ITEMS = [
  { id: "oportunidad", label: "Oportunidad", href: "CateonCook Oportunidad.html" },
  { id: "producto",    label: "Producto",    href: "CateonCook Producto.html" },
  { id: "unirse",      label: "Únete",       href: "CateonCook Unete.html" },
  { id: "nosotros",    label: "Nosotros",    href: "CateonCook Nosotros.html" },
];

/* ════════════════ Header ════════════════ */
function Header({ currentPage = null, alwaysSolid = false }) {
  const [scrolled, setScrolled] = useStateSH(false);
  const [menuOpen, setMenuOpen] = useStateSH(false);

  useEffectSH(() => {
    if (alwaysSolid) { setScrolled(true); return; }
    const hero = document.getElementById("inicio");
    if (!hero) { setScrolled(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [alwaysSolid]);

  useEffectSH(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkColor = scrolled ? window.CC.ink : "#fff";

  return (
    <>
      <header className={`header${scrolled ? " is-solid" : ""}`}>
        <div className="header__inner">
          <a className="header__logo" href="CateonCook Home Refined.html">
            <CCLogoMark size={36} color={linkColor} />
            <span className="header__wordmark" style={{ color: linkColor }}>
              CATEON<span style={{ letterSpacing: "0.28em" }}>COOK</span>
            </span>
          </a>
          <nav className="header__nav">
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={n.href} className={currentPage === n.id ? "is-active" : ""}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="header__cta">
            <a className="btn btn--ghost-light" href="CateonCook Portal.html">Iniciar sesión</a>
            <a className="btn btn--primary" href="CateonCook Unete.html">Sé parte de la fábrica</a>
          </div>
          <button
            className="header__burger"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`header__burger-bar${menuOpen ? " is-open-1" : ""}`} />
            <span className={`header__burger-bar${menuOpen ? " is-open-2" : ""}`} />
            <span className={`header__burger-bar${menuOpen ? " is-open-3" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-overlay${menuOpen ? " is-open" : ""}`} onClick={() => setMenuOpen(false)} />
      <nav className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-label="Menú móvil">
        <div className="mobile-menu__brand">
          <CCLogoMark size={36} color="#fff" />
          <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.2em", color: "#fff" }}>
            CATEON<span style={{ letterSpacing: "0.28em" }}>COOK</span>
          </span>
        </div>
        {NAV_ITEMS.map((n) => (
          <a key={n.id} href={n.href} className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            {n.label}
          </a>
        ))}
        <div className="mobile-menu__cta">
          <a className="btn btn--ghost-light" href="CateonCook Portal.html" onClick={() => setMenuOpen(false)}>Iniciar sesión</a>
          <a className="btn btn--primary" href="CateonCook Unete.html" onClick={() => setMenuOpen(false)}>
            Sé parte de la fábrica
          </a>
        </div>
      </nav>
    </>
  );
}

/* ════════════════ WhatsApp FAB ════════════════ */
function WhatsAppFab({ phone = "593999999999", message = "Hola, quiero más información sobre CateonCook" }) {
  const [hover, setHover] = useStateSH(false);
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Escríbenos por WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className={`whatsapp-fab__tooltip${hover ? " is-visible" : ""}`}>Escríbenos</span>
      <span className="whatsapp-fab__pulse" aria-hidden="true" />
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 1C7.715 1 1 7.715 1 16c0 2.64.687 5.116 1.88 7.265L1 31l8.02-1.847A14.93 14.93 0 0016 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm0 27.5a12.44 12.44 0 01-6.348-1.73l-.453-.27-4.762 1.096 1.128-4.632-.296-.474A12.44 12.44 0 013.5 16C3.5 9.1 9.1 3.5 16 3.5S28.5 9.1 28.5 16 22.9 28.5 16 28.5zm6.864-9.406c-.375-.188-2.22-1.095-2.564-1.22-.344-.125-.594-.188-.844.188-.25.375-.97 1.22-1.188 1.47-.219.25-.438.281-.813.094-.375-.188-1.582-.582-3.014-1.858-1.113-.992-1.864-2.217-2.083-2.592-.219-.375-.023-.577.164-.765.17-.169.375-.438.563-.657.188-.219.25-.375.375-.625.125-.25.063-.469-.031-.657-.094-.188-.844-2.031-1.157-2.78-.305-.729-.614-.63-.844-.642l-.718-.013c-.25 0-.657.094-.999.469-.344.375-1.313 1.282-1.313 3.125s1.344 3.625 1.531 3.875c.188.25 2.648 4.044 6.414 5.674.897.387 1.596.619 2.14.793.899.286 1.717.246 2.364.149.72-.108 2.22-.907 2.532-1.783.312-.876.312-1.626.219-1.783-.094-.156-.344-.25-.719-.438z" />
      </svg>
    </a>
  );
}

/* ════════════════ SectionDivider ════════════════ */
function SectionDivider({ direction = "dark-to-cream", targetSelector }) {
  const wrapRef = useRefSH(null);
  useEffectSH(() => {
    const wrap = wrapRef.current;
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    if (!wrap || !target) return;
    let fired = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.15 && !fired) {
          fired = true;
          wrap.classList.remove("is-on");
          void wrap.offsetWidth;
          wrap.classList.add("is-on");
        }
      },
      { threshold: [0, 0.15, 0.5] }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetSelector]);

  return (
    <div ref={wrapRef} className={`sdiv sdiv--${direction} is-on`} aria-hidden="true">
      <svg className="sdiv__svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path className="sdiv__path sdiv__path--thin"  d="M0,44 L1440,44" />
        <path className="sdiv__path sdiv__path--thick" d="M0,37 L1440,37" />
      </svg>
    </div>
  );
}

/* ════════════════ PageHero — compact hero for inner pages ════════════════ */
function PageHero({
  variant = "dark",          // "dark" | "cream" | "warm"
  chapter,                   // e.g. "Capítulo I"
  current,                   // e.g. "Oportunidad"
  title,                     // JSX
  lede,                      // string
  meta = [],                 // [{label, value}]
  cornerFig,                 // e.g. "Cap. I · 2026"
}) {
  return (
    <section className={`phero phero--${variant}`}>
      <div className="phero__vignette" />
      {cornerFig && <span className="section__corner-fig" style={{ position: "absolute" }}>{cornerFig}</span>}
      <div className="phero__inner">
        <div>
          <div className="phero__crumb">
            <span className="phero__crumb-rule" />
            {chapter && <span>{chapter}</span>}
            {current && (
              <>
                <span style={{ opacity: 0.4 }}>/</span>
                <span className="phero__crumb-current">{current}</span>
              </>
            )}
          </div>
          <h1 className="phero__title">{title}</h1>
        </div>
        <div className="phero__right">
          {lede && <p className="phero__lede">{lede}</p>}
          {meta.length > 0 && (
            <div className="phero__meta">
              {meta.map((m, i) => (
                <div key={i} className="phero__meta-item">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════ Footer ════════════════ */
function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <CCLogoMark size={44} color="#E6C77A" />
            <div className="footer__brand-line">
              Una <em>fábrica de sueños</em><br />
              que nutre comunidades.
            </div>
            <div className="footer__brand-meta">
              CATEON·COOK · DIST. AUTORIZADO ROYAL PRESTIGE · EC
            </div>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Explorar</div>
            <ul>
              {NAV_ITEMS.map((n) => (
                <li key={n.id}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Contacto</div>
            <ul>
              <li><a href="tel:+593999999999">+593 99 999 9999</a></li>
              <li><a href="mailto:administracion@cateoncook.com">administracion@cateoncook.com</a></li>
              <li><a href="#">Quito · Guayaquil · Cuenca</a></li>
              <li><a href="#">Lun – Sáb · 09:00 – 19:00</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Socios</div>
            <ul>
              <li><a href="CateonCook Portal.html">Portal del socio</a></li>
              <li><a href="CateonCook Pedidos.html">Pedidos y logística</a></li>
              <li><a href="CateonCook Capacitaciones.html">Capacitaciones</a></li>
              <li><a href="CateonCook Soporte.html">Soporte</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div>© 2026 CATEONCOOK · DERECHOS RESERVADOS</div>
          <div style={{ display: "flex", gap: 20, fontSize: 11, letterSpacing: "0.1em", opacity: 0.6 }}>
            <a href="CateonCook Privacidad.html" style={{ color: "inherit" }}>PRIVACIDAD</a>
            <a href="CateonCook Terminos.html" style={{ color: "inherit" }}>TÉRMINOS</a>
          </div>
          <div className="footer__social" aria-label="Redes sociales">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 22v-8h3l1-4h-4V7.5c0-1 .5-2 2-2h2V2h-3c-3 0-4 2-4 4v4H7v4h3v8h3z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16 4 12 4 12 4s-4 0-7.2.1c-.4 0-1.3.1-2 .9C2.2 5.6 2 7 2 7S2 8.6 2 10.3v1.4C2 13.4 2 15 2 15s.2 1.4.8 2c.7.8 1.7.8 2.1.9C7 18 12 18 12 18s4 0 7.2-.1c.4 0 1.3-.1 2-.9.6-.6.8-2 .8-2s0-1.7 0-3.3v-1.4C22 8.6 22 7 22 7zM10 14V8l5 3-5 3z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 3v3.5a4.5 4.5 0 0 0 4.5 4.5V14a7.5 7.5 0 0 1-4.5-1.5V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z" />
              </svg>
            </a>
          </div>
          <div>HECHO CON CUIDADO EN ECUADOR</div>
        </div>
      </div>
    </footer>
  );
}

/* expose */
Object.assign(window, { Header, WhatsAppFab, SectionDivider, PageHero, FooterSection, NAV_ITEMS });
