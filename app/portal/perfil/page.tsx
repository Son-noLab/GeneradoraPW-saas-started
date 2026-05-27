'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useProfile, monthsInNetwork, LEVEL_LABELS, LEVEL_COLORS } from '@/components/portal/profile-context'

export default function PerfilPage() {
  const { profile, updateProfile } = useProfile()
  const fileRef = useRef<HTMLInputElement>(null)

  const [displayName, setDisplayName] = useState(profile.displayName ?? '')
  const [phone, setPhone]             = useState(profile.phone ?? '')
  const [email, setEmail]             = useState('')
  const [avatarUrl, setAvatarUrl]     = useState(profile.avatarUrl ?? null)

  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)
  const [saveError, setSaveError]     = useState<string | null>(null)
  const [uploading, setUploading]     = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Solo sincroniza el avatar (se actualiza al subir imagen)
  // displayName y phone se inicializan una sola vez desde useState y se manejan localmente
  useEffect(() => {
    setAvatarUrl(profile.avatarUrl ?? null)
  }, [profile.avatarUrl])

  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? '')
    })
  }, [])

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('El archivo supera los 2 MB.')
      return
    }
    setUploading(true)
    setUploadError(null)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setUploadError('Sesión expirada.'); setUploading(false); return }

    const ext  = file.name.split('.').pop() ?? 'jpg'
    const path = `${session.user.id}/avatar.${ext}`

    const { error } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (error) {
      setUploadError('No se pudo subir la imagen. Verifica que el bucket "avatars" existe.')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
    const url = `${publicUrl}?v=${Date.now()}`

    const { error: updateErr } = await supabase
      .from('profiles')
      .upsert({
        id:         session.user.id,
        email:      session.user.email ?? '',
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })

    if (updateErr) {
      setUploadError('Imagen subida pero no se pudo guardar la URL. Intenta de nuevo.')
      setUploading(false)
      return
    }

    setAvatarUrl(url)
    updateProfile({ avatarUrl: url })
    setUploading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setSaveError(null)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setSaveError('Sesión expirada. Recarga la página.'); setSaving(false); return }

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id:           session.user.id,
        email:        session.user.email ?? '',
        display_name: displayName.trim() || null,
        phone:        phone.trim() || null,
        updated_at:   new Date().toISOString(),
      }, { onConflict: 'id' })

    if (error) {
      setSaveError(`Error al guardar: ${error.message}`)
      setSaving(false)
      return
    }

    setSaving(false)
    setSaved(true)
    updateProfile({
      displayName: displayName.trim() || null,
      phone:       phone.trim() || null,
    })
    setTimeout(() => setSaved(false), 3000)
  }

  const initials  = (displayName || email).slice(0, 2).toUpperCase()
  const months    = monthsInNetwork(profile.joinDate)
  const levelLabel = LEVEL_LABELS[profile.level] ?? profile.level
  const levelClass = LEVEL_COLORS[profile.level] ?? 'status--progreso'

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <p className="portal-page-eyebrow">Portal del Socio</p>
        <h1 className="portal-page-title">Mi perfil</h1>
        <p className="portal-page-sub">Gestiona tu información y foto de perfil.</p>
      </div>

      <div className="perfil-grid">
        {/* ── Lado izquierdo ── */}
        <div className="perfil-card perfil-card--side">
          <div className="perfil-avatar-wrap">
            {avatarUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={avatarUrl} alt="Foto de perfil" className="perfil-avatar-img" />
              : <div className="perfil-avatar-lg">{initials}</div>
            }
            <button
              className="perfil-avatar-overlay"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label="Cambiar foto"
            >
              {uploading
                ? <span className="perfil-avatar-overlay__spinner" />
                : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                )
              }
            </button>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }} onChange={handleAvatarChange} />
          </div>

          <div className="perfil-card__name">{displayName || email.split('@')[0]}</div>
          <div className="perfil-card__email">{email}</div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}>
            <span className={`status ${levelClass}`}>{levelLabel}</span>
          </div>

          {/* Meses en la red */}
          <div className="perfil-months-badge">
            <div className="perfil-months-badge__val">{months}</div>
            <div className="perfil-months-badge__label">
              {months === 1 ? 'mes en la red' : 'meses en la red'}
            </div>
          </div>

          {uploadError && (
            <p style={{ fontSize: '0.75rem', color: '#ef4444', textAlign: 'center', marginTop: '0.5rem', lineHeight: 1.4 }}>{uploadError}</p>
          )}
          <p style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.5 }}>
            Haz clic en la foto para cambiarla.<br />JPG, PNG o WebP · máx. 2 MB
          </p>
        </div>

        {/* ── Formulario ── */}
        <div className="perfil-card">
          <h2 className="perfil-section-title">Información personal</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            <div className="perfil-field">
              <label className="perfil-label">Nombre para mostrar</label>
              <input type="text" className="perfil-input" placeholder="Ej. María García"
                value={displayName} onChange={e => setDisplayName(e.target.value)} maxLength={60} />
              <span className="perfil-hint">Aparece en el header y en el sitio principal cuando estás conectado.</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="perfil-field">
                <label className="perfil-label">Teléfono / WhatsApp</label>
                <input type="tel" className="perfil-input" placeholder="+593 99 000 0000"
                  value={phone} onChange={e => setPhone(e.target.value)} maxLength={20} />
              </div>
              <div className="perfil-field">
                <label className="perfil-label">Ciudad</label>
                <input type="text" className="perfil-input perfil-input--readonly"
                  value={profile.city ?? '—'} readOnly />
                <span className="perfil-hint">Asignada en la inscripción.</span>
              </div>
            </div>

            <div className="perfil-field">
              <label className="perfil-label">Correo electrónico</label>
              <input type="email" className="perfil-input perfil-input--readonly" value={email} readOnly />
              <span className="perfil-hint">El correo no puede modificarse desde aquí.</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="perfil-field">
                <label className="perfil-label">Nivel</label>
                <input type="text" className="perfil-input perfil-input--readonly"
                  value={levelLabel} readOnly />
                <span className="perfil-hint">Lo asigna tu coordinador CC.</span>
              </div>
              <div className="perfil-field">
                <label className="perfil-label">Fecha de ingreso</label>
                <input type="text" className="perfil-input perfil-input--readonly"
                  value={profile.joinDate ? new Date(profile.joinDate).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                  readOnly />
              </div>
            </div>

            {saveError && (
              <p style={{ fontSize: '0.82rem', color: '#ef4444', padding: '0.6rem 0.9rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px' }}>
                {saveError}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.25rem' }}>
              <button type="submit" className="perfil-btn" disabled={saving}>
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
              {saved && <span style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 600 }}>✓ Guardado</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
