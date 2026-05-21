'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  user: { email: string } | null
  solid?: boolean
  minimal?: boolean
}

export default function Header({ user, solid, minimal }: HeaderProps) {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function openModal() {
    setMenuOpen(false)
    window.dispatchEvent(new CustomEvent('modal:open'))
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? '?'
  const isTransparent = !scrolled && !solid && (!menuOpen || !!minimal)
  const headerClass = `header ${isTransparent ? 'header--transparent' : 'header--solid'}${minimal && isTransparent ? ' header--minimal' : ''}`

  return (
    <>
      <header className={headerClass} id="header">
        <div className="header__inner">

          {/* Logo */}
          <Link href="/" className="header__logo" aria-label="CateonCook — Inicio">
            <Image
              src="/img/logo-cateoncook.png"
              alt="CateonCook"
              width={508}
              height={491}
              priority
              style={{ height: '48px', width: 'auto' }}
            />
          </Link>

          {/* Nav */}
          <nav className="header__nav" aria-label="Navegación principal">
            <a href="/#oportunidad"  className="nav__link">Oportunidad</a>
            <Link href="/producto"   className="nav__link">Producto</Link>
            <Link href="/unirse"     className="nav__link">Únete</Link>
            <Link href="/nosotros"   className="nav__link">Nosotros</Link>
          </nav>

          {/* Acciones */}
          <div className="header__actions">
            {user ? (
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(o => !o)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--c-sky)', color: '#fff',
                    fontSize: '0.85rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', border: 'none',
                  }}
                  aria-label="Menú de cuenta"
                >
                  {initial}
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                    width: 210, background: 'var(--c-navy)',
                    border: '1px solid rgba(192,206,232,0.15)',
                    boxShadow: '0 8px 32px rgba(8,22,64,0.5)',
                    zIndex: 300,
                  }}>
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(237,241,248,0.4)', letterSpacing: '0.08em' }}>Conectado como</p>
                      <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                    </div>
                    <Link
                      href="/admin"
                      onClick={() => setDropdownOpen(false)}
                      style={{ display: 'block', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'rgba(237,241,248,0.8)' }}
                    >
                      Panel de administración
                    </Link>
                    <button
                      onClick={() => { setDropdownOpen(false); router.push('/logout') }}
                      style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#f87171', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn--primary" onClick={openModal}>
                Sé parte de la fábrica
              </button>
            )}
          </div>

          {/* Burger */}
          <button
            className="header__burger"
            aria-label="Menú"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Menú móvil */}
      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Menú móvil">
        <button
          className="mobile-menu__close"
          aria-label="Cerrar"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>
        <a href="/#oportunidad"  className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Oportunidad</a>
        <Link href="/producto"   className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Producto</Link>
        <Link href="/unirse"     className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Únete</Link>
        <Link href="/nosotros"   className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Nosotros</Link>
        <button className="btn btn--sky" style={{ marginTop: 'auto', justifyContent: 'center' }} onClick={openModal}>
          Sé parte de la fábrica
        </button>
      </nav>
    </>
  )
}
