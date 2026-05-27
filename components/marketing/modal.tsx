'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

const PROVINCIAS = [
  'Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi',
  'El Oro','Esmeraldas','Galápagos','Guayas','Imbabura','Loja',
  'Los Ríos','Manabí','Morona Santiago','Napo','Orellana','Pastaza',
  'Pichincha','Santa Elena','Santo Domingo de los Tsáchilas',
  'Sucumbíos','Tungurahua','Zamora Chinchipe',
]

const COMO = [
  'Redes sociales (Instagram / Facebook)',
  'Un amigo o familiar',
  'Evento o activación',
  'Google / búsqueda web',
  'Referido de un distribuidor',
  'Otro',
]

function DarkSelect({ name, required = false, placeholder, options }: {
  name: string; required?: boolean; placeholder: string; options: string[]
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const btn: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    background: 'rgba(255,255,255,0.08)', border: `1px solid ${open ? '#E6C77A' : 'rgba(255,255,255,0.15)'}`,
    color: value ? '#fff' : 'rgba(255,255,255,0.35)',
    fontFamily: 'var(--font-sans)', fontSize: 14, borderRadius: 2,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    cursor: 'pointer', transition: 'border-color .2s',
  }

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <input type="hidden" name={name} value={value} required={required} />
      <button type="button" onClick={() => setOpen(v => !v)} style={btn}>
        <span>{value || placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ flexShrink: 0, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', zIndex: 200, top: 'calc(100% + 3px)', left: 0, right: 0,
          maxHeight: 220, overflowY: 'auto', background: '#0d1a2e',
          border: '1px solid rgba(230,199,122,0.35)', borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          {options.map(opt => (
            <button key={opt} type="button"
              onClick={() => { setValue(opt); setOpen(false) }}
              style={{
                width: '100%', padding: '10px 14px', background: opt === value ? 'rgba(230,199,122,0.12)' : 'none',
                border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: opt === value ? '#E6C77A' : 'rgba(255,255,255,0.8)',
                fontFamily: 'var(--font-sans)', fontSize: 13, textAlign: 'left', cursor: 'pointer',
              }}
              onMouseEnter={e => { if (opt !== value) (e.currentTarget.style.background = 'rgba(255,255,255,0.07)') }}
              onMouseLeave={e => { if (opt !== value) (e.currentTarget.style.background = 'none') }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const lS: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 6, display: 'block',
}
const iS: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff', width: '100%', padding: '12px 14px',
  fontFamily: 'var(--font-sans)', fontSize: 14, borderRadius: 2,
  transition: 'border-color .2s, background .2s',
}
const field: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6 }

export default function FormModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(false)
    const t = e.currentTarget
    const _nombre    = (t.elements.namedItem('m_nombre')    as HTMLInputElement).value.trim()
    const _tel       = (t.elements.namedItem('m_tel')       as HTMLInputElement).value.trim()
    const _email     = (t.elements.namedItem('m_email')     as HTMLInputElement).value.trim()
    const _ciudad    = (t.elements.namedItem('m_ciudad')    as HTMLInputElement).value.trim()
    const _provincia = (t.elements.namedItem('m_provincia') as HTMLInputElement).value
    const _como      = (t.elements.namedItem('m_como')      as HTMLInputElement).value
    const _motiv     = (t.elements.namedItem('m_motivacion') as HTMLTextAreaElement).value.trim()
    const notas = [
      _provincia && `Provincia: ${_provincia}`,
      _motiv     && `Motivación: ${_motiv}`,
    ].filter(Boolean).join('\n') || null

    setNombre(_nombre)
    setTelefono(_tel)

    try {
      const sb = createClient()
      const { error: sbErr } = await sb.from('solicitudes').insert({
        nombre: _nombre, telefono: _tel, correo: _email,
        ciudad: _ciudad, como_supo: _como || null, notas,
      })
      setSending(false)
      if (!sbErr) { setSent(true); scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }
      else setError(true)
    } catch {
      setSending(false)
      setError(true)
    }
  }

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 9000,
    background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px',
  }
  const card: React.CSSProperties = {
    background: '#0d0d11', border: '1px solid rgba(230,199,122,0.25)',
    width: '100%', maxWidth: 560, maxHeight: '90vh',
    display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: 3,
  }

  if (sent) return (
    <div style={overlay} onClick={onClose}>
      <div style={{ ...card, padding: 'clamp(40px,6vw,64px) 40px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #E6C77A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E6C77A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,4vw,42px)', fontStyle: 'italic', color: '#E6C77A', lineHeight: 1.1 }}>
          Solicitud recibida,
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,4vw,42px)', fontStyle: 'italic', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
          {nombre.split(' ')[0]}.
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.8 }}>
          Nuestro equipo revisará tu perfil y te escribirá en 24–48 horas al número{' '}
          <strong style={{ color: '#fff' }}>{telefono}</strong>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <a
            href={`https://wa.me/593984909878?text=${encodeURIComponent('Hola, acabo de enviar mi solicitud de ingreso a CateonCook. Me llamo ' + nombre + '.')}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
          >
            Escribir por WhatsApp →
          </a>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={overlay} onClick={onClose}>
      <div style={card} ref={scrollRef} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '24px 28px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(230,199,122,0.7)', marginBottom: 6 }}>
                SOLICITUD DE INGRESO
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 300, color: '#fff', fontStyle: 'italic', lineHeight: 1.2, margin: 0 }}>
                Sé parte de la <em style={{ color: '#E6C77A' }}>Fábrica de Sueños.</em>
              </h2>
            </div>
            <button onClick={onClose} aria-label="Cerrar"
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: 32, height: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, borderRadius: 2 }}>
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '24px 28px 32px', flexGrow: 1 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', color: 'rgba(230,199,122,0.6)', marginBottom: 14, display: 'block' }}>
                DATOS PERSONALES
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
                <div style={field}>
                  <label style={lS} htmlFor="m_nombre">Nombre completo *</label>
                  <input id="m_nombre" name="m_nombre" type="text" required placeholder="Ej. María García" style={iS} />
                </div>
                <div style={field}>
                  <label style={lS} htmlFor="m_tel">WhatsApp *</label>
                  <input id="m_tel" name="m_tel" type="tel" required placeholder="+593 99 000 0000" style={iS} />
                </div>
              </div>
              <div style={{ ...field, marginTop: 12 }}>
                <label style={lS} htmlFor="m_email">Correo electrónico *</label>
                <input id="m_email" name="m_email" type="email" required placeholder="tu@correo.com" style={iS} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginTop: 12 }}>
                <div style={field}>
                  <label style={lS} htmlFor="m_ciudad">Ciudad</label>
                  <input id="m_ciudad" name="m_ciudad" type="text" placeholder="Ej. Quito" style={iS} />
                </div>
                <div style={field}>
                  <label style={lS}>Provincia *</label>
                  <DarkSelect name="m_provincia" required placeholder="Selecciona..." options={PROVINCIAS} />
                </div>
              </div>
            </fieldset>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', color: 'rgba(230,199,122,0.6)', marginBottom: 14, display: 'block' }}>
                PERFIL RÁPIDO
              </legend>
              <div style={field}>
                <label style={lS}>¿Cómo nos conociste?</label>
                <DarkSelect name="m_como" placeholder="Selecciona una opción" options={COMO} />
              </div>
            </fieldset>

            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', color: 'rgba(230,199,122,0.6)', marginBottom: 14, display: 'block' }}>
                TU MOTIVACIÓN
              </legend>
              <div style={field}>
                <label style={lS} htmlFor="m_motivacion">¿Por qué quieres ser parte de la Fábrica de Sueños? *</label>
                <textarea
                  id="m_motivacion" name="m_motivacion" rows={3} required
                  placeholder="Cuéntanos brevemente tu historia y qué buscas lograr..."
                  style={{ ...iS, resize: 'vertical', minHeight: 85 }}
                />
              </div>
            </fieldset>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
              {error && (
                <div style={{ fontSize: 13, color: '#ff6b6b' }}>
                  Error al enviar. Escríbenos a{' '}
                  <a href="mailto:administracion@cateoncook.com" style={{ color: '#E6C77A' }}>
                    administracion@cateoncook.com
                  </a>
                </div>
              )}
              <button type="submit" className="btn btn--lg btn--primary"
                disabled={sending} style={{ justifyContent: 'center', opacity: sending ? 0.6 : 1 }}>
                {sending ? 'Enviando…' : 'Enviar solicitud →'}
              </button>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                AL ENVIAR AUTORIZAS EL TRATAMIENTO DE TUS DATOS ·{' '}
                <a href="/privacidad" target="_blank" style={{ color: 'rgba(230,199,122,0.6)' }}>VER POLÍTICA</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
