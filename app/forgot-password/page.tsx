'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { BrandLogo } from '@/components/marketing/logo'

function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const linkExpired = searchParams.get('error') === 'link'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [sendError, setSendError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSendError(false)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      console.error('[forgot-password]', error.message)
      setSendError(true)
      setLoading(false)
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
              Si existe una cuenta para <strong style={{ color: 'var(--c-navy)' }}>{email}</strong>, recibirás un enlace para restablecer tu contraseña en breve.
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
            Recuperar contraseña
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--c-text-muted)', marginTop: '0.35rem' }}>
            Panel de administración · Territorio CateonCook
          </p>
        </div>

        {linkExpired && (
          <div style={{ marginBottom: 'var(--s-sm)', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', fontSize: '0.875rem', color: '#b91c1c', lineHeight: 1.5 }}>
            El enlace expiró o ya fue usado. Solicita uno nuevo a continuación.
          </div>
        )}

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

            {sendError && (
              <p style={{ fontSize: '0.85rem', color: '#b91c1c', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca' }}>
                No se pudo enviar el correo. Intenta de nuevo en unos minutos.
              </p>
            )}

            <button type="submit" className="modal__submit" disabled={loading} style={{ marginTop: '0.25rem' }}>
              {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
            </button>
          </form>

          <p style={{ marginTop: 'var(--s-md)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
            ¿Recuerdas tu contraseña?{' '}
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

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  )
}
