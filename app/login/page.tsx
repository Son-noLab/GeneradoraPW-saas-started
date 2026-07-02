'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { BrandLogo } from '@/components/marketing/logo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos.')
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
            <BrandLogo tone="natural" height={40} priority />
          </Link>
          <h1 style={{ fontFamily: 'var(--font-cormorant),Georgia,serif', fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: 'var(--c-navy)', fontWeight: 400, marginTop: 'var(--s-sm)' }}>
            Iniciar sesión
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label htmlFor="password" className="form-label" style={{ margin: 0 }}>Contraseña</label>
                <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--c-sky)' }}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p style={{ fontSize: '0.85rem', color: '#ef4444', padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca' }}>
                {error}
              </p>
            )}

            <button type="submit" className="modal__submit" disabled={loading} style={{ marginTop: '0.25rem' }}>
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>

          <p style={{ marginTop: 'var(--s-md)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
            ¿No tienes cuenta?{' '}
            <Link href="/signup" style={{ color: 'var(--c-sky)', fontWeight: 600 }}>
              Crear cuenta
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
