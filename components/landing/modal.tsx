'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Modal() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('modal:open', handler)
    return () => window.removeEventListener('modal:open', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const payload = {
      nombre:   (form.elements.namedItem('nombre')   as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      correo:   (form.elements.namedItem('correo')   as HTMLInputElement).value,
      ciudad:   (form.elements.namedItem('ciudad')   as HTMLInputElement).value || null,
      como_supo:(form.elements.namedItem('comoSupo') as HTMLSelectElement).value || null,
    }

    const supabase = createClient()
    const { error: dbError } = await supabase.from('solicitudes').insert(payload)

    if (dbError) {
      setError('Hubo un error al enviar tu solicitud. Por favor inténtalo de nuevo.')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="modal">
        <button className="modal__close" aria-label="Cerrar" onClick={() => setOpen(false)}>×</button>

        <p className="modal__label label">Territorio CateonCook</p>
        <h2 className="modal__title" id="modal-title">Sé parte de<br />la fábrica</h2>
        <p className="modal__subtitle">
          Déjanos tus datos y un miembro de nuestro equipo se pondrá en contacto contigo para darte todos los detalles de esta gran oportunidad.
        </p>

        {!submitted ? (
          <form className="modal__form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="reg-nombre" className="form-label">Nombre completo</label>
              <input type="text" id="reg-nombre" name="nombre" className="form-input"
                     placeholder="Tu nombre completo" autoComplete="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="reg-telefono" className="form-label">Teléfono</label>
              <input type="tel" id="reg-telefono" name="telefono" className="form-input"
                     placeholder="+593 99 000 0000" autoComplete="tel" required />
            </div>

            <div className="form-group">
              <label htmlFor="reg-correo" className="form-label">Correo electrónico</label>
              <input type="email" id="reg-correo" name="correo" className="form-input"
                     placeholder="tu@correo.com" autoComplete="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="reg-ciudad" className="form-label">
                Ciudad <span style={{ color: 'var(--c-text-muted)', fontWeight: 400 }}>(opcional)</span>
              </label>
              <input type="text" id="reg-ciudad" name="ciudad" className="form-input"
                     placeholder="Quito, Guayaquil, Cuenca…" autoComplete="address-level2" />
            </div>

            <div className="form-group">
              <label htmlFor="reg-como" className="form-label">
                ¿Cómo supiste de CateonCook? <span style={{ color: 'var(--c-text-muted)', fontWeight: 400 }}>(opcional)</span>
              </label>
              <select id="reg-como" name="comoSupo" className="form-input" style={{ cursor: 'pointer' }}>
                <option value="">Selecciona una opción</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Un amigo o familiar">Un amigo o familiar</option>
                <option value="Google / búsqueda web">Google / búsqueda web</option>
                <option value="Evento o demostración">Evento o demostración</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {error && (
              <p style={{ color: '#f87171', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>{error}</p>
            )}

            <button type="submit" className="modal__submit" disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar mi solicitud'}
            </button>

            <p className="modal__privacy">
              Al enviar aceptas nuestra <a href="#" style={{ textDecoration: 'underline' }}>política de privacidad</a>.
              Tus datos solo se usarán para contactarte sobre esta oportunidad.
            </p>
          </form>
        ) : (
          <div className="modal__success">
            <div className="modal__success-icon">✓</div>
            <h3 className="modal__success-title">¡Solicitud recibida!</h3>
            <p className="modal__success-text">
              Gracias por tu interés en CateonCook. Un miembro de nuestro equipo te contactará pronto para contarte todos los detalles de la oportunidad.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
