'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LogoBadge } from '@/components/marketing/logo'
import { useProfile } from './profile-context'

const NAV = [
  { href: '/portal',                label: 'Inicio' },
  { href: '/portal/pedidos',        label: 'Pedidos' },
  { href: '/portal/capacitaciones', label: 'Capacitaciones' },
  { href: '/portal/soporte',        label: 'Soporte' },
]

export function PortalNav({ email }: { email: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { profile } = useProfile()

  const { displayName, avatarUrl } = profile
  const initials = (displayName || email).slice(0, 2).toUpperCase()
  const label = displayName || email.split('@')[0]

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className="portal-header">
      <div className="portal-header__inner">
        <Link href="/" className="portal-header__back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Sitio web
        </Link>

        <div className="portal-header__divider" />

        <Link href="/portal" className="portal-header__logo">
          <LogoBadge tone="positive" size={26} />
          <span className="portal-header__wordmark">PORTAL DEL SOCIO</span>
        </Link>

        <div className="portal-header__divider" />

        <nav className="portal-header__nav">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={pathname === n.href ? 'active' : ''}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="portal-profile" ref={ref}>
          <button
            className="portal-profile__btn"
            onClick={() => setOpen(v => !v)}
            aria-label="Menú de perfil"
          >
            <span className="portal-profile__avatar">
              {avatarUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={avatarUrl} alt={label} className="portal-profile__avatar-img" />
                : initials
              }
            </span>
            <span className="portal-profile__name">{label}</span>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div className="portal-profile__dropdown">
              <div className="portal-profile__dropdown-header">
                <div className="portal-profile__dropdown-avatar">
                  {avatarUrl
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={avatarUrl} alt={label} className="portal-profile__avatar-img" />
                    : initials
                  }
                </div>
                <div>
                  <div className="portal-profile__dropdown-name">{label}</div>
                  <div className="portal-profile__dropdown-email">{email}</div>
                </div>
              </div>
              <div className="portal-profile__dropdown-sep" />
              <Link href="/portal/perfil" className="portal-profile__dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                Mi perfil
              </Link>
              <Link href="/portal/recursos" className="portal-profile__dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Recursos y legal
              </Link>
              <div className="portal-profile__dropdown-sep" />
              <Link href="/logout" className="portal-profile__dropdown-item portal-profile__dropdown-item--danger">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
