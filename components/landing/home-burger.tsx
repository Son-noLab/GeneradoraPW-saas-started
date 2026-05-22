'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomeBurger() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function openModal() {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('modal:open'))
  }

  return (
    <>
      <button
        className="home-burger"
        aria-label="Menú"
        onClick={() => setOpen(o => !o)}
      >
        <span></span><span></span><span></span>
      </button>

      <div
        className={`mobile-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
      />

      <nav className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Menú móvil">
        <button
          className="mobile-menu__close"
          aria-label="Cerrar"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <a href="/#oportunidad"  className="mobile-menu__link" onClick={() => setOpen(false)}>Oportunidad</a>
        <Link href="/producto"   className="mobile-menu__link" onClick={() => setOpen(false)}>Producto</Link>
        <Link href="/unirse"     className="mobile-menu__link" onClick={() => setOpen(false)}>Únete</Link>
        <Link href="/nosotros"   className="mobile-menu__link" onClick={() => setOpen(false)}>Nosotros</Link>
        <button className="btn btn--sky" style={{ marginTop: 'auto', justifyContent: 'center' }} onClick={openModal}>
          Sé parte de la fábrica
        </button>
      </nav>
    </>
  )
}
