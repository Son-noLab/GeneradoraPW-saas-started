'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { BrandLogo } from '@/components/marketing/logo'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError('No se pudo crear la cuenta. Verifica los datos e intenta de nuevo.')
      setLoading(false)
      return
    }

    // Cuenta existente: Supabase devuelve identities vacío en lugar de error
    if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
      setError('__existing__')
      setLoading(false)
      return
    }

    if (data.session) {
      router.push('/portal')
      router.refresh()
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 var(--pad-x)' }}>
        <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
          <div style={{ background: 'var(--c-white)', border: '1px solid var(--c-border)', padding: 'var(--s-lg)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(27,168,224,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--s-md)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-sky)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 style={{ fontFamily: 'var(--font-cormorant),Georgia,serif', fontSize: '1.8rem', color: 'var(--c-navy)', marginBottom: '0.75rem' }}>
              Revisa tu correo
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              Enviamos un enlace de confirmación a <strong style={{ color: 'var(--c-navy)' }}>{email}</strong>.<br />
              Haz clic en el enlace para activar tu cuenta.
            </p>
            <Link href="/login" style={{ display: 'inline-block', marginTop: 'var(--s-md)', fontSize: '0.85rem', color: 'var(--c-sky)', fontWeight: 600 }}>
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--header-h) var(--pad-x) var(--s-lg)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s-lg)' }}>
          <Link href="/" style={{ display: 'inline-block' }} aria-label="CateonCook — Inicio">
            <BrandLogo tone="natural" height={40} priority />
          </Link>
          <h1 style={{ fontFamily: 'var(--font-cormorant),Georgia,serif', fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: 'var(--c-navy)', fontWeight: 400, marginTop: 'var(--s-sm)' }}>
            Crear cuenta
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-text-muted)', marginTop: '0.35rem' }}>
            Panel de administración · Territorio CateonCook
          </p>
        </div>

        <div style={{ background: 'var(--c-white)', border: '1px solid var(--c-border)', padding: 'var(--s-lg)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-sm)' }}>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                placeholder="tu@correo.com"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
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

            {error === '__existing__' ? (
              <div style={{ fontSize: '0.85rem', color: '#b91c1c', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', lineHeight: 1.6 }}>
                Ya existe una cuenta con este correo.{' '}
                <Link href="/login" style={{ color: '#b91c1c', fontWeight: 600, textDecoration: 'underline' }}>Inicia sesión</Link>
                {' '}o{' '}
                <Link href="/forgot-password" style={{ color: '#b91c1c', fontWeight: 600, textDecoration: 'underline' }}>recupera tu contraseña</Link>.
              </div>
            ) : error && (
              <p style={{ fontSize: '0.85rem', color: '#ef4444', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca' }}>
                {error}
              </p>
            )}

            <button type="submit" className="modal__submit" disabled={loading} style={{ marginTop: '0.25rem' }}>
              {loading ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </form>

          <p style={{ marginTop: 'var(--s-md)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" style={{ color: 'var(--c-sky)', fontWeight: 600 }}>
              Iniciar sesión
            </Link>
          </p>
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
