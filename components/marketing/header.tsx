'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CCLogoMark } from './logo'
import { useModal } from './shell'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/oportunidad', label: 'Oportunidad' },
  { href: '/producto',    label: 'Producto' },
  { href: '/unete',       label: 'Únete' },
  { href: '/nosotros',    label: 'Nosotros' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<{ name: string | null; avatar: string | null } | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { openModal } = useModal()

  useEffect(() => {
    const supabase = createClient()

    async function loadProfile(userId: string) {
      const { data } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', userId)
        .single()
      if (data) setUserProfile({ name: data.display_name, avatar: data.avatar_url })
    }

    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session)
      if (data.session) loadProfile(data.session.user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setLoggedIn(!!s)
      if (s) loadProfile(s.user.id)
      else setUserProfile(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!isHome) { setSolid(true); return }
    const hero = document.getElementById('inicio')
    if (!hero) { setSolid(true); return }
    const obs = new IntersectionObserver(
      ([e]) => setSolid(!e.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [isHome])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const syncSolid = (y: number) => {
      if (!isHome) return
      const hero = document.getElementById('inicio')
      if (hero) setSolid(hero.getBoundingClientRect().bottom <= 0)
      else setSolid(y > 0)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < 80) {
          setHidden(false)
        } else if (y > lastY + 6) {
          setHidden(true)
        } else if (y < lastY - 6) {
          setHidden(false)
          syncSolid(y)
        }
        lastY = y
        ticking = false
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 72) {
        setHidden(false)
        syncSolid(window.scrollY)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [isHome])

  const goTop = () => window.scrollTo(0, 0)

  const showFab = hidden && !menuOpen
  const cls = `header${solid ? ' is-solid' : ''}${hidden && !menuOpen ? ' is-hidden' : ''}`
  const logoColor = solid ? '#0B1738' : '#fff'
  const wordColor = solid ? '#0B1738' : '#fff'

  return (
    <>
      {showFab && (
        <button
          className="header-fab"
          aria-label="Mostrar menú"
          onClick={() => setHidden(false)}
        >
          <span /><span /><span />
        </button>
      )}
      <header className={cls}>
        <div className="header__inner">
          <Link
            href="/"
            className="header__logo"
            onClick={e => {
              if (isHome) {
                e.preventDefault()
                document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <CCLogoMark size={36} color={logoColor} />
            <span className="header__wordmark" style={{ color: wordColor }}>
              CATEON<span style={{ letterSpacing: '0.28em' }}>COOK</span>
            </span>
          </Link>

          <nav className="header__nav">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className={pathname === n.href ? 'is-active' : ''}
                onClick={goTop}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="header__cta">
            {loggedIn ? (
              <Link href="/portal" className="header__portal-btn" onClick={goTop}>
                {userProfile?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={userProfile.avatar} alt="" className="header__user-avatar" />
                ) : (
                  <span className="header__user-initials">
                    {(userProfile?.name || '·').slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span>Mi portal</span>
              </Link>
            ) : (
              <Link href="/login" className="btn btn--ghost-light" onClick={goTop}>
                Iniciar sesión
              </Link>
            )}
            <button className="btn btn--primary" onClick={openModal}>
              Sé parte de la fábrica
            </button>
          </div>

          <button
            className="header__burger"
            aria-label="Menú"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className={`header__burger-bar${menuOpen ? ' is-open-1' : ''}`} />
            <span className={`header__burger-bar${menuOpen ? ' is-open-2' : ''}`} />
            <span className={`header__burger-bar${menuOpen ? ' is-open-3' : ''}`} />
          </button>
        </div>
      </header>

      <div
        className={`mobile-overlay${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <nav className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <div className="mobile-menu__brand">
          <CCLogoMark size={36} color="#fff" />
          <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: '0.2em', color: '#fff' }}>
            CATEON<span style={{ letterSpacing: '0.28em' }}>COOK</span>
          </span>
        </div>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} className="mobile-menu__link" onClick={() => { setMenuOpen(false); goTop() }}>{n.label}</Link>
        ))}
        <div className="mobile-menu__cta">
          {loggedIn ? (
            <Link href="/portal" className="header__portal-btn" onClick={() => { setMenuOpen(false); goTop() }}>
              {userProfile?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={userProfile.avatar} alt="" className="header__user-avatar" />
              ) : (
                <span className="header__user-initials">
                  {(userProfile?.name || '·').slice(0, 1).toUpperCase()}
                </span>
              )}
              <span>Mi portal</span>
            </Link>
          ) : (
            <Link href="/login" className="btn btn--ghost-light" onClick={() => { setMenuOpen(false); goTop() }}>
              Iniciar sesión
            </Link>
          )}
          <button className="btn btn--primary" style={{ textAlign: 'center', justifyContent: 'center' }} onClick={() => { setMenuOpen(false); openModal() }}>
            Sé parte de la fábrica
          </button>
        </div>
      </nav>
    </>
  )
}
