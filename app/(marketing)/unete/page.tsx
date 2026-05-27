'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PageHero from '@/components/marketing/page-hero'
import SectionDivider from '@/components/marketing/section-divider'
import { createClient } from '@/lib/supabase/client'

const PROVINCIAS = [
  'Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi',
  'El Oro','Esmeraldas','Galápagos','Guayas','Imbabura','Loja',
  'Los Ríos','Manabí','Morona Santiago','Napo','Orellana','Pastaza',
  'Pichincha','Santa Elena','Santo Domingo de los Tsáchilas',
  'Sucumbíos','Tungurahua','Zamora Chinchipe',
]
const COMO_SUPO_OPS = [
  'Redes sociales (Instagram / Facebook)',
  'Un amigo o familiar',
  'Evento o activación',
  'Google / búsqueda web',
  'Referido de un distribuidor',
  'Otro',
]

function StepsSection() {
  const steps = [
    { n: '01', title: <>Agenda tu <em>conversación</em></>, desc: 'Una llamada honesta de 30 minutos con un sponsor. Sin guion, sin presión.', fig: 'Fig. 01·a' },
    { n: '02', title: <>Conoce el <em>plan</em></>,          desc: 'Te mostramos los números reales, las cuentas reales y los socios reales detrás del modelo.', fig: 'Fig. 01·b' },
    { n: '03', title: <>Recibe tu <em>kit</em></>,           desc: 'Tu inventario inicial, materiales de capacitación y acceso a la comunidad de socios.', fig: 'Fig. 01·c' },
    { n: '04', title: <>Empieza a <em>construir</em></>,     desc: 'Acompañamiento semanal durante los primeros 90 días. Tu sponsor está a un mensaje.', fig: 'Fig. 01·d' },
  ]
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
          {steps.map(s => (
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
  )
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0)
  const faqs = [
    {
      q: <>¿Cuánto cuesta <em>empezar</em>?</>,
      a: 'No cuesta un solo dólar empezar.',
    },
    {
      q: <>¿Es esto un <em>esquema piramidal</em>?</>,
      a: 'No. CateonCook es un distribuidor autorizado de Royal Prestige. Las comisiones provienen exclusivamente de la venta de producto real a clientes finales, no del reclutamiento. Cada socio puede ver el plan de mercadeo completo antes de firmar.',
    },
    {
      q: <>¿Necesito <em>experiencia previa</em>?</>,
      a: 'No. El 60 % de nuestros socios actuales no había vendido nunca antes de entrar. Te acompañamos con capacitación semanal y un sponsor asignado durante tus primeros 90 días.',
    },
    {
      q: <>¿En qué ciudades del Ecuador <em>operan</em>?</>,
      a: 'Tenemos presencia activa en 24 provincias. Las oficinas principales están en Quito, Guayaquil y Cuenca, pero hay socios en cada capital provincial. Si estás en una zona rural, igual te asignamos un sponsor cercano.',
    },
    {
      q: <>¿Puedo hacerlo de <em>medio tiempo</em>?</>,
      a: 'Sí. Cerca del 70 % de nuestros emprendedores combinan CateonCook con otro trabajo o estudios. El modelo está diseñado para acomodar tu ritmo, no para reemplazarlo de inmediato.',
    },
    {
      q: <>¿Qué pasa si <em>decido salir</em>?</>,
      a: 'No hay cláusulas de permanencia. Puedes pausar o salir cuando quieras. Si te quedas con producto sin abrir y dentro de los primeros 6 meses, lo recompramos al 90 % del valor.',
    },
  ]
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
          {faqs.map((f, i) => (
            <div key={i} className={`faq__item${openIdx === i ? ' is-open' : ''}`}>
              <button className="faq__q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)} aria-expanded={openIdx === i}>
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div className="faq__a">
                <div className="faq__a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [nombreEnviado, setNombreEnviado] = useState('')
  const [telefonoEnviado, setTelefonoEnviado] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true); setError(false)
    const t = e.currentTarget
    const get = (name: string) => (t.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() ?? ''
    const nombre = get('nombre'); const telefono = get('tel')
    const notas = [
      get('provincia')   && `Provincia: ${get('provincia')}`,
      get('profesion')   && `Profesión: ${get('profesion')}`,
      get('tiene_ruc')   && `RUC: ${get('tiene_ruc')}`,
      get('motivacion')  && `Motivación: ${get('motivacion')}`,
      get('video_url')   && `Video: ${get('video_url')}`,
    ].filter(Boolean).join('\n') || null

    setNombreEnviado(nombre)
    setTelefonoEnviado(telefono)

    try {
      const sb = createClient()
      const { error: sbErr } = await sb.from('solicitudes').insert({
        nombre, telefono, correo: get('email'), ciudad: get('ciudad'),
        como_supo: get('como_supo') || null, notas,
      })
      setSending(false)
      if (!sbErr) setSent(true)
      else setError(true)
    } catch {
      setSending(false); setError(true)
    }
  }

  if (sent) return (
    <section id="formulario" className="section section--dark" aria-label="Solicitud enviada">
      <div className="section__inner">
        <div style={{ textAlign: 'center', padding: 'clamp(48px,8vw,100px) 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid #E6C77A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E6C77A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(30px,5vw,50px)', fontStyle: 'italic', color: '#E6C77A', lineHeight: 1.1, marginBottom: 16 }}>
            Solicitud recibida,
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(30px,5vw,50px)', fontStyle: 'italic', color: '#fff', lineHeight: 1.1, marginBottom: 28 }}>
            {nombreEnviado.split(' ')[0]}.
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Un miembro de nuestro equipo revisará tu perfil y se comunicará contigo
            en las próximas 24–48 horas al número <strong style={{ color: '#fff' }}>{telefonoEnviado}</strong>.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/593984909878?text=${encodeURIComponent('Hola, acabo de enviar mi solicitud de ingreso a CateonCook. Me llamo ' + nombreEnviado + '.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn--lg btn--primary">
              Escribir por WhatsApp →
            </a>
            <Link href="/nosotros" className="btn btn--lg btn--ghost-light">Conoce nuestra historia</Link>
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <section id="formulario" className="section section--dark" aria-label="Únete">
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

        <form className="cform cform--dark" onSubmit={handleSubmit}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0, gridColumn: '1 / -1' }}>
            <legend>DATOS PERSONALES</legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_nombre">Nombre completo *</label>
                <input id="u_nombre" name="nombre" type="text" required placeholder="Ej. María García López" />
              </div>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_tel">Teléfono / WhatsApp *</label>
                <input id="u_tel" name="tel" type="tel" required placeholder="+593 99 000 0000" />
              </div>
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" htmlFor="u_email">Correo electrónico *</label>
              <input id="u_email" name="email" type="email" required placeholder="tu@correo.com" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginTop: 16 }}>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_ciudad">Ciudad</label>
                <input id="u_ciudad" name="ciudad" type="text" placeholder="Ej. Quito" />
              </div>
              <div className="cform__field">
                <label className="cform__label" htmlFor="u_provincia">Provincia *</label>
                <select id="u_provincia" name="provincia" required>
                  <option value="">Selecciona tu provincia</option>
                  {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset style={{ border: 'none', padding: 0, margin: '28px 0 0', gridColumn: '1 / -1' }}>
            <legend>PERFIL PROFESIONAL</legend>
            <div className="cform__field">
              <label className="cform__label" htmlFor="u_prof">Profesión / Ocupación actual</label>
              <input id="u_prof" name="profesion" type="text" placeholder="Ej. Ingeniera comercial, emprendedora" />
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label">¿Tienes RUC activo?</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                {['Sí, tengo RUC activo', 'No aún, pero puedo tramitarlo', 'No lo tengo y no sé cómo obtenerlo'].map(op => (
                  <label key={op} className="cform__radio-label">
                    <input type="radio" name="tiene_ruc" value={op} />
                    {op}
                  </label>
                ))}
              </div>
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" htmlFor="u_como">¿Cómo nos conociste?</label>
              <select id="u_como" name="como_supo">
                <option value="">Selecciona una opción</option>
                {COMO_SUPO_OPS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </fieldset>

          <fieldset style={{ border: 'none', padding: 0, margin: '28px 0 0', gridColumn: '1 / -1' }}>
            <legend>TU MOTIVACIÓN</legend>
            <div className="cform__field">
              <label className="cform__label" htmlFor="u_motiv">¿Por qué quieres ser parte de la Fábrica de Sueños? *</label>
              <textarea id="u_motiv" name="motivacion" rows={4} required
                placeholder="Cuéntanos tu historia, tu sueño y por qué CateonCook es el camino para lograrlo..." />
            </div>
            <div className="cform__field" style={{ marginTop: 16 }}>
              <label className="cform__label" htmlFor="u_video">Link de tu video de presentación (recomendado)</label>
              <input id="u_video" name="video_url" type="url"
                placeholder="https://youtube.com/... o https://drive.google.com/..." />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, display: 'block' }}>
                YouTube (no listado) o Google Drive. Duración recomendada: 1–3 min.
              </span>
            </div>
          </fieldset>

          <div className="cform__submit" style={{ gridColumn: '1 / -1', marginTop: 28 }}>
            <span className="cform__legal">
              AL ENVIAR AUTORIZAS EL TRATAMIENTO DE TUS DATOS PARA EL PROCESO DE SELECCIÓN ·{' '}
              <Link href="/privacidad" style={{ color: 'rgba(230,199,122,0.7)' }}>VER POLÍTICA</Link>
            </span>
            {error && (
              <div style={{ color: '#ff6b6b', fontSize: 13, padding: '8px 0' }}>
                Error al enviar. Escríbenos a{' '}
                <a href="mailto:administracion@cateoncook.com" style={{ color: '#E6C77A' }}>administracion@cateoncook.com</a>
              </div>
            )}
            <button type="submit" className="btn btn--lg btn--primary" disabled={sending} style={sending ? { opacity: 0.6 } : {}}>
              {sending ? 'Enviando solicitud…' : 'Enviar solicitud de ingreso →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default function UnetePage() {
  useEffect(() => {
    if (window.location.hash !== '#formulario') return
    const el = document.getElementById('formulario')
    if (!el) return
    const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main>
      <PageHero
        variant="cream"
        chapter="Capítulo III"
        current="Únete"
        cornerFig="Cap. III · Únete"
        title={<>Tu <em>camino</em><br />empieza con<br />una conversación.</>}
        lede="No tienes que decidir hoy. Solo agendar 30 minutos. Lo demás, lo decides tú a tu propio ritmo, con un sponsor que ya hizo este mismo camino."
        meta={[
          { value: '30min', label: 'PRIMERA LLAMADA' },
          { value: '0$',    label: 'COMPROMISO INICIAL' },
          { value: '24h',   label: 'TIEMPO DE RESPUESTA' },
        ]}
      />
      <StepsSection />
      <FAQSection />
      <SectionDivider direction="cream-to-dark" targetSelector=".cform" />
      <ContactSection />
    </main>
  )
}
