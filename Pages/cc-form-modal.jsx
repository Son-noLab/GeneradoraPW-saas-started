/* CateonCook — Modal "Sé parte de la Fábrica"
   React root independiente montado en <body>.
   Expone window.openCCModal() y window.closeCCModal(). */

const { useState: mUseState, useEffect: mUseEffect, useRef: mUseRef } = React;

const PROVINCIAS_M = [
  'Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi',
  'El Oro','Esmeraldas','Galápagos','Guayas','Imbabura','Loja',
  'Los Ríos','Manabí','Morona Santiago','Napo','Orellana','Pastaza',
  'Pichincha','Santa Elena','Santo Domingo de los Tsáchilas',
  'Sucumbíos','Tungurahua','Zamora Chinchipe',
];

const COMO_M = [
  'Redes sociales (Instagram / Facebook)',
  'Un amigo o familiar',
  'Evento o activación',
  'Google / búsqueda web',
  'Referido de un distribuidor',
  'Otro',
];

const SB_URL_M = 'https://ejdrtjutjcnqmxpvbmwa.supabase.co';
const SB_KEY_M = 'sb_publishable_q1bkVlBleed6x8GhB2B41w_Xh17ozXh';

function FormModal({ onClose }) {
  const [sent,     setSent]     = mUseState(false);
  const [sending,  setSending]  = mUseState(false);
  const [error,    setError]    = mUseState(false);
  const [nombre,   setNombre]   = mUseState('');
  const [telefono, setTelefono] = mUseState('');
  const scrollRef = mUseRef(null);

  /* lock body scroll while open */
  mUseEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* close on Escape */
  mUseEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(false);
    const t  = e.target;
    const _nombre   = t.m_nombre.value.trim();
    const _telefono = t.m_tel.value.trim();
    const _correo   = t.m_email.value.trim();
    const _ciudad   = t.m_ciudad.value.trim();
    const _provincia= t.m_provincia.value;
    const _como     = t.m_como.value;
    const _motivacion = t.m_motivacion.value.trim();
    const notas = [
      _provincia  && `Provincia: ${_provincia}`,
      _motivacion && `Motivación: ${_motivacion}`,
    ].filter(Boolean).join('\n') || null;

    setNombre(_nombre);
    setTelefono(_telefono);

    let ok = false;
    if (window.supabase) {
      try {
        const { createClient } = window.supabase;
        const sb = createClient(SB_URL_M, SB_KEY_M);
        const { error: sbErr } = await sb.from('solicitudes').insert({
          nombre: _nombre, telefono: _telefono, correo: _correo,
          ciudad: _ciudad, como_supo: _como || null, notas,
        });
        if (!sbErr) ok = true;
      } catch (_) {}
    }
    setSending(false);
    if (ok) { setSent(true); scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }
    else setError(true);
  }

  /* ── styles ── */
  const overlay = {
    position: 'fixed', inset: 0, zIndex: 9000,
    background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px 16px',
  };
  const card = {
    background: '#0d0d11', border: '1px solid rgba(230,199,122,0.25)',
    width: '100%', maxWidth: 600, maxHeight: '90vh',
    display: 'flex', flexDirection: 'column',
    position: 'relative',
  };
  const head = {
    padding: '28px 32px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)',
    flexShrink: 0,
  };
  const body = {
    overflowY: 'auto', padding: '28px 32px 36px', flexGrow: 1,
  };
  const iS = { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' };
  const lS = { color: 'rgba(255,255,255,0.6)' };
  const leg = {
    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
    letterSpacing: '0.14em', color: 'rgba(230,199,122,0.6)',
    marginBottom: 16, display: 'block',
  };
  const g2  = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 };

  /* ── success ── */
  if (sent) return (
    <div style={overlay} onClick={onClose}>
      <div style={{ ...card, padding: 'clamp(40px,6vw,64px) 40px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #E6C77A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E6C77A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(28px,4vw,44px)', fontStyle: 'italic', color: '#E6C77A', lineHeight: 1.1 }}>
          Solicitud recibida,
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(28px,4vw,44px)', fontStyle: 'italic', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
          {nombre.split(' ')[0]}.
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.8 }}>
          Nuestro equipo revisará tu perfil y te escribirá en 24–48 horas
          al número <strong style={{ color: '#fff' }}>{telefono}</strong>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <a href={`https://wa.me/593999999999?text=${encodeURIComponent('Hola, acabo de enviar mi solicitud de ingreso a CateonCook. Me llamo ' + nombre + '.')}`}
            target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
            Escribir por WhatsApp →
          </a>
          <button onClick={onClose} className="btn btn--ghost-light" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  /* ── form ── */
  return (
    <div style={overlay} onClick={onClose}>
      <div style={card} onClick={e => e.stopPropagation()}>

        {/* header */}
        <div style={head}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(230,199,122,0.7)', marginBottom: 6 }}>
                SOLICITUD DE INGRESO
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 300, color: '#fff', fontStyle: 'italic', lineHeight: 1.15, margin: 0 }}>
                Sé parte de la <em style={{ color: '#E6C77A' }}>Fábrica de Sueños.</em>
              </h2>
            </div>
            <button onClick={onClose} aria-label="Cerrar" style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
              width: 36, height: 36, flexShrink: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 18, lineHeight: 1,
            }}>×</button>
          </div>
        </div>

        {/* scrollable body */}
        <div style={body} ref={scrollRef}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={leg}>DATOS PERSONALES</legend>
              <div style={g2}>
                <div className="cform__field">
                  <label className="cform__label" htmlFor="m_nombre" style={lS}>Nombre completo *</label>
                  <input id="m_nombre" name="m_nombre" type="text" required
                    placeholder="Ej. María García" style={iS} />
                </div>
                <div className="cform__field">
                  <label className="cform__label" htmlFor="m_tel" style={lS}>WhatsApp *</label>
                  <input id="m_tel" name="m_tel" type="tel" required
                    placeholder="+593 99 000 0000" style={iS} />
                </div>
              </div>
              <div className="cform__field" style={{ marginTop: 14 }}>
                <label className="cform__label" htmlFor="m_email" style={lS}>Correo electrónico *</label>
                <input id="m_email" name="m_email" type="email" required
                  placeholder="tu@correo.com" style={iS} />
              </div>
              <div style={{ ...g2, marginTop: 14 }}>
                <div className="cform__field">
                  <label className="cform__label" htmlFor="m_ciudad" style={lS}>Ciudad</label>
                  <input id="m_ciudad" name="m_ciudad" type="text"
                    placeholder="Ej. Quito" style={iS} />
                </div>
                <div className="cform__field">
                  <label className="cform__label" htmlFor="m_provincia" style={lS}>Provincia *</label>
                  <select id="m_provincia" name="m_provincia" required style={iS}>
                    <option value="">Selecciona...</option>
                    {PROVINCIAS_M.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset style={{ border: 'none', padding: 0, margin: '22px 0 0' }}>
              <legend style={leg}>PERFIL RÁPIDO</legend>
              <div className="cform__field">
                <label className="cform__label" htmlFor="m_como" style={lS}>¿Cómo nos conociste?</label>
                <select id="m_como" name="m_como" style={iS}>
                  <option value="">Selecciona una opción</option>
                  {COMO_M.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </fieldset>

            <fieldset style={{ border: 'none', padding: 0, margin: '22px 0 0' }}>
              <legend style={leg}>TU MOTIVACIÓN</legend>
              <div className="cform__field">
                <label className="cform__label" htmlFor="m_motivacion" style={lS}>
                  ¿Por qué quieres ser parte de la Fábrica de Sueños? *
                </label>
                <textarea id="m_motivacion" name="m_motivacion" rows="3" required
                  placeholder="Cuéntanos brevemente tu historia y qué buscas lograr..."
                  style={{ ...iS, resize: 'vertical' }} />
              </div>
            </fieldset>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {error && (
                <div style={{ fontSize: 13, color: '#ff6b6b', padding: '8px 0' }}>
                  Error al enviar. Escríbenos a{' '}
                  <a href="mailto:administracion@cateoncook.com" style={{ color: '#E6C77A' }}>
                    administracion@cateoncook.com
                  </a>
                </div>
              )}
              <button type="submit" className="btn btn--lg btn--primary"
                disabled={sending} style={{ justifyContent: 'center', opacity: sending ? 0.6 : 1 }}>
                {sending ? 'Enviando solicitud…' : 'Enviar solicitud de ingreso →'}
              </button>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, textAlign: 'center' }}>
                AL ENVIAR AUTORIZAS EL TRATAMIENTO DE TUS DATOS ·{' '}
                <a href="CateonCook Privacidad.html" target="_blank"
                  style={{ color: 'rgba(230,199,122,0.6)' }}>VER POLÍTICA</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Global modal controller ── */
function ModalApp() {
  const [open, setOpen] = mUseState(false);

  mUseEffect(() => {
    window.openCCModal  = () => setOpen(true);
    window.closeCCModal = () => setOpen(false);
  }, []);

  if (!open) return null;
  return <FormModal onClose={() => setOpen(false)} />;
}

const _mDiv = document.createElement('div');
_mDiv.id = 'cc-modal-root';
document.body.appendChild(_mDiv);
ReactDOM.createRoot(_mDiv).render(<ModalApp />);
