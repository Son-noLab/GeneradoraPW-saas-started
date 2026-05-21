'use client'

import { useState } from 'react'

const PROVINCIAS = [
  'Azuay','Bolívar','Cañar','Carchi','Chimborazo','Cotopaxi',
  'El Oro','Esmeraldas','Galápagos','Guayas','Imbabura','Loja',
  'Los Ríos','Manabí','Morona Santiago','Napo','Orellana','Pastaza',
  'Pichincha','Santa Elena','Santo Domingo de los Tsáchilas',
  'Sucumbíos','Tungurahua','Zamora Chinchipe',
]

interface F {
  nombre: string; email: string; telefono: string
  ciudad: string; provincia: string; comoConocio: string
  profesion: string; tieneRuc: string; motivacion: string
  videoUrl: string; acepta: boolean
}

const INIT: F = {
  nombre:'', email:'', telefono:'', ciudad:'', provincia:'',
  comoConocio:'', profesion:'', tieneRuc:'', motivacion:'',
  videoUrl:'', acepta: false,
}

function Input({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="uform__field">
      <label className="uform__label">{label}{required && <span className="uform__req">*</span>}</label>
      {children}
    </div>
  )
}

export default function UnirseForm() {
  const [f, setF] = useState<F>(INIT)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState('')

  function set(k: keyof F, v: string | boolean) {
    setF(prev => ({ ...prev, [k]: v }))
    if (err) setErr('')
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!f.nombre || !f.email || !f.telefono || !f.provincia) {
      setErr('Por favor completa todos los campos obligatorios.')
      return
    }
    if (!f.acepta) {
      setErr('Debes aceptar los términos para continuar.')
      return
    }
    setLoading(true)
    setErr('')
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (success) {
    return (
      <div className="uform__success">
        <div className="uform__success-icon">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" stroke="var(--c-sky)" strokeWidth="2.5"/>
            <path d="M18 30l9 9 15-18" stroke="var(--c-sky)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>¡Solicitud enviada!</h3>
        <p>
          Gracias, <strong>{f.nombre.split(' ')[0]}</strong>. Hemos recibido tu solicitud de ingreso
          al Territorio CateonCook. Un miembro de nuestro equipo revisará tu perfil y se comunicará
          contigo en las próximas 24–48 horas al número {f.telefono}.
        </p>
        <div className="uform__success-steps">
          <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', marginBottom: '1rem' }}>
            Mientras tanto, prepara tu documentación:
          </p>
          {['Hoja de vida actualizada', 'Copia de cédula de identidad', 'Referencias laborales', 'RUC activo o en trámite'].map(d => (
            <div key={d} className="uform__success-step">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-sky)" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              {d}
            </div>
          ))}
        </div>
        <a
          href={`https://wa.me/593000000000?text=${encodeURIComponent(`Hola, acabo de enviar mi solicitud de ingreso al Territorio CateonCook. Mi nombre es ${f.nombre} y mi email es ${f.email}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--sky"
          style={{ marginTop: '1.5rem', justifyContent: 'center' }}
        >
          Escribir por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form className="uform" onSubmit={onSubmit} noValidate>

      {/* DATOS PERSONALES */}
      <fieldset className="uform__group">
        <legend className="uform__legend">Datos Personales</legend>
        <div className="uform__row uform__row--2">
          <Input label="Nombre completo" required>
            <input className="uform__input" type="text" placeholder="Ej. María García López"
              value={f.nombre} onChange={e => set('nombre', e.target.value)} required />
          </Input>
          <Input label="Teléfono / WhatsApp" required>
            <input className="uform__input" type="tel" placeholder="+593 99 000 0000"
              value={f.telefono} onChange={e => set('telefono', e.target.value)} required />
          </Input>
        </div>
        <Input label="Correo electrónico" required>
          <input className="uform__input" type="email" placeholder="tu@correo.com"
            value={f.email} onChange={e => set('email', e.target.value)} required />
        </Input>
        <div className="uform__row uform__row--2">
          <Input label="Ciudad" required>
            <input className="uform__input" type="text" placeholder="Ej. Quito"
              value={f.ciudad} onChange={e => set('ciudad', e.target.value)} />
          </Input>
          <Input label="Provincia" required>
            <select className="uform__select" value={f.provincia} onChange={e => set('provincia', e.target.value)} required>
              <option value="">Selecciona tu provincia</option>
              {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Input>
        </div>
      </fieldset>

      {/* PERFIL PROFESIONAL */}
      <fieldset className="uform__group">
        <legend className="uform__legend">Perfil Profesional</legend>
        <Input label="Profesión / Ocupación actual">
          <input className="uform__input" type="text" placeholder="Ej. Ingeniera comercial, emprendedora"
            value={f.profesion} onChange={e => set('profesion', e.target.value)} />
        </Input>
        <Input label="¿Tienes RUC activo?">
          <div className="uform__radio-group">
            {['Sí, tengo RUC activo', 'No aún, pero puedo tramitarlo', 'No lo tengo y no sé cómo obtenerlo'].map(op => (
              <label key={op} className="uform__radio">
                <input type="radio" name="ruc" value={op} checked={f.tieneRuc === op}
                  onChange={() => set('tieneRuc', op)} />
                {op}
              </label>
            ))}
          </div>
        </Input>
        <Input label="¿Cómo nos conociste?">
          <select className="uform__select" value={f.comoConocio} onChange={e => set('comoConocio', e.target.value)}>
            <option value="">Selecciona una opción</option>
            {['Redes sociales (Instagram/Facebook)','Un amigo o familiar','Evento o activación','Google / búsqueda web','Referido de un distribuidor','Otro'].map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Input>
      </fieldset>

      {/* MOTIVACIÓN */}
      <fieldset className="uform__group">
        <legend className="uform__legend">Tu Motivación</legend>
        <Input label="¿Por qué quieres ser parte de la Fábrica de Sueños?" required>
          <textarea
            className="uform__textarea"
            rows={5}
            placeholder="Cuéntanos tu historia, tu sueño y por qué CateonCook es el camino para lograrlo..."
            value={f.motivacion}
            onChange={e => set('motivacion', e.target.value)}
          />
        </Input>
        <Input label="Link de tu video de presentación (recomendado)">
          <input className="uform__input" type="url"
            placeholder="https://youtube.com/... o https://drive.google.com/..."
            value={f.videoUrl} onChange={e => set('videoUrl', e.target.value)} />
          <span className="uform__hint">YouTube (no listado) o Google Drive. Duración recomendada: 1–3 min.</span>
        </Input>
      </fieldset>

      {/* ACEPTACIÓN */}
      <div className="uform__acepta">
        <label className="uform__check">
          <input type="checkbox" checked={f.acepta} onChange={e => set('acepta', e.target.checked)} />
          <span>
            Autorizo el tratamiento de mis datos personales para el proceso de selección del
            Territorio CateonCook Cía. Ltda. y confirmo que la información proporcionada es verídica.
          </span>
        </label>
      </div>

      {err && <p className="uform__error">{err}</p>}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={loading}
        style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Enviando solicitud…' : 'Enviar solicitud de ingreso'}
      </button>

    </form>
  )
}
