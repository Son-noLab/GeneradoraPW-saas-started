'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/portal')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--header-h) var(--pad-x) var(--s-lg)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s-lg)' }}>
          <Link href="/" style={{ display: 'inline-block' }} aria-label="CateonCook — Inicio">
            <svg viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ height: 40, color: 'var(--c-navy)' }}>
              <circle cx="40" cy="40" r="37" stroke="currentColor" strokeWidth="3.5"/>
              <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="36" y="16" width="8" height="7" rx="3" fill="currentColor"/>
              <path d="M20 27 Q20 24 40 24 Q60 24 60 27 Q60 31 40 31 Q20 31 20 27Z" fill="currentColor"/>
              <path d="M22 31 L22 52 Q22 61 40 61 Q58 61 58 52 L58 31 Z" fill="currentColor"/>
              <path d="M22 36 Q13 36 13 44 Q13 52 22 49" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M58 36 Q67 36 67 44 Q67 52 58 49" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
              <text x="90" y="38" fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="900" letterSpacing="2.5" fill="currentColor">CATEON</text>
              <text x="92" y="63" fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="900" letterSpacing="6" fill="currentColor">COOK</text>
            </svg>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-cormorant),Georgia,serif', fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: 'var(--c-navy)', fontWeight: 400, marginTop: 'var(--s-sm)' }}>
            Nueva contraseña
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-text-muted)', marginTop: '0.35rem' }}>
            Panel de administración · Territorio CateonCook
          </p>
        </div>

        <div style={{ background: 'var(--c-white)', border: '1px solid var(--c-border)', padding: 'var(--s-lg)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-sm)' }}>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Nueva contraseña</label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm" className="form-label">Confirmar contraseña</label>
              <input
                id="confirm"
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="form-input"
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div style={{ fontSize: '0.85rem', color: '#b91c1c', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', lineHeight: 1.5 }}>
                <p style={{ margin: 0 }}>{error}</p>
                <Link href="/forgot-password" style={{ display: 'inline-block', marginTop: '0.4rem', color: '#b91c1c', fontWeight: 600, textDecoration: 'underline' }}>
                  Solicitar nuevo enlace →
                </Link>
              </div>
            )}

            <button type="submit" className="modal__submit" disabled={loading} style={{ marginTop: '0.25rem' }}>
              {loading ? 'Actualizando…' : 'Actualizar contraseña'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 'var(--s-md)' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  )
}
