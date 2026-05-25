/* CateonCook — shared brand primitives for wireframes */

// brand palette (lifted from tailwind.config.ts + hero-cube color cues)
window.CC = {
  navy950: "#081640",
  navy900: "#0D2158",
  navy800: "#142D70",
  navy700: "#0E1E50",
  navy600: "#1454A8",
  sky:     "#1BA8E0",
  muted:   "#4A618C",
  border:  "#C0CEE8",
  bgLight: "#EDF1F8",
  bgAlt:   "#E2E8F4",
  cream:   "#F6F1E8",
  paper:   "#FAF6EE",
  gold:    "#C9A85B",
  goldHi:  "#E6C77A",
  ink:     "#0B1738",
};

const C = window.CC;

/* ─────────── Logo mark (the Royal Prestige cooker, from hero-cube.tsx) ─────────── */
function CCLogoMark({ size = 36, color = "currentColor", style }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" style={style} aria-hidden="true">
      <circle cx="40" cy="40" r="37" stroke={color} strokeWidth="3.5" />
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="1.2" />
      <rect x="36" y="16" width="8" height="7" rx="3" fill={color} />
      <path d="M20 27 Q20 24 40 24 Q60 24 60 27 Q60 31 40 31 Q20 31 20 27Z" fill={color} />
      <path d="M22 31 L22 52 Q22 61 40 61 Q58 61 58 52 L58 31 Z" fill={color} />
      <path d="M22 36 Q13 36 13 44 Q13 52 22 49" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M58 36 Q67 36 67 44 Q67 52 58 49" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function CCLogo({ color = C.ink, mark = true, size = 18 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color }}>
      {mark && <CCLogoMark size={size + 14} color={color} />}
      <div style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "0.18em",
        lineHeight: 1,
      }}>
        CATEON<span style={{ letterSpacing: "0.28em" }}>COOK</span>
      </div>
    </div>
  );
}

/* ─────────── Type helpers ─────────── */
function Eyebrow({ children, color = C.sky, style }) {
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color,
      ...style,
    }}>
      {children}
    </span>
  );
}

function Serif({ children, italic, size = 48, color = C.ink, weight = 300, style }) {
  return (
    <span style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontStyle: italic ? "italic" : "normal",
      fontWeight: weight,
      fontSize: size,
      lineHeight: 0.98,
      letterSpacing: "-0.01em",
      color,
      ...style,
    }}>
      {children}
    </span>
  );
}

function Body({ children, size = 14, color = C.muted, style }) {
  return (
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: size,
      lineHeight: 1.6,
      color,
      margin: 0,
      ...style,
    }}>
      {children}
    </p>
  );
}

/* ─────────── Buttons ─────────── */
function Btn({ label, variant = "primary", size = "md", style, accent }) {
  const pad = size === "sm" ? "8px 16px" : size === "lg" ? "16px 32px" : "12px 24px";
  const fs  = size === "sm" ? 12 : size === "lg" ? 14 : 13;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: pad,
    fontFamily: "'Inter', sans-serif",
    fontSize: fs,
    fontWeight: 600,
    letterSpacing: "0.05em",
    borderRadius: 2,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
  const variants = {
    primary: { background: accent || C.sky, color: "#fff", boxShadow: "0 8px 24px rgba(27,168,224,0.25)" },
    dark:    { background: C.ink, color: "#fff" },
    outline: { background: "transparent", color: C.ink, border: `1.5px solid ${C.ink}` },
    outlineLight: { background: "transparent", color: "#fff", border: `1.5px solid rgba(255,255,255,0.6)` },
    gold:    { background: C.gold, color: C.ink, boxShadow: "0 8px 24px rgba(201,168,91,0.3)" },
    ghost:   { background: "transparent", color: C.ink },
  };
  return <div style={{ ...base, ...variants[variant], ...style }}>{label}</div>;
}

/* ─────────── Photo placeholder ─────────── */
function Photo({ label, w = "100%", h = 240, dark, gold, style, children }) {
  const bg = dark
    ? `linear-gradient(135deg, ${C.navy900}, ${C.navy800})`
    : gold
    ? `linear-gradient(135deg, #8a6a2a, #5a4520)`
    : `${C.bgAlt}`;
  const hatch = dark
    ? "repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.04) 14px 15px)"
    : "repeating-linear-gradient(135deg, transparent 0 14px, rgba(13,33,88,0.06) 14px 15px)";
  return (
    <div style={{
      position: "relative",
      width: w,
      height: h,
      background: bg,
      overflow: "hidden",
      ...style,
    }}>
      <div style={{ position: "absolute", inset: 0, background: hatch }} />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: dark || gold ? 0.18 : 0.35 }}>
        <line x1="0" y1="0" x2="100" y2="100" stroke={dark || gold ? "#fff" : C.navy900} strokeWidth="0.25" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={dark || gold ? "#fff" : C.navy900} strokeWidth="0.25" />
      </svg>
      {label && (
        <div style={{
          position: "absolute",
          left: 12, bottom: 12,
          padding: "4px 10px",
          background: dark || gold ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.85)",
          color: dark || gold ? "#fff" : C.ink,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.05em",
        }}>
          [ {label} ]
        </div>
      )}
      {children}
    </div>
  );
}

/* ─────────── Misc bits ─────────── */
function Pill({ children, color = C.ink, bg = "transparent", border: bd, style }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 10px",
      borderRadius: 999,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.04em",
      color,
      background: bg,
      border: bd || `1px solid ${C.border}`,
      ...style,
    }}>
      {children}
    </span>
  );
}

function Divider({ color = C.border, style }) {
  return <div style={{ height: 1, width: "100%", background: color, ...style }} />;
}

function Annotation({ children, style }) {
  return (
    <div data-annot style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      letterSpacing: "0.03em",
      color: C.muted,
      opacity: 0.7,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* expose to other babel scripts */
Object.assign(window, {
  CCLogoMark, CCLogo, Eyebrow, Serif, Body, Btn, Photo, Pill, Divider, Annotation,
});
