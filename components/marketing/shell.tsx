'use client'

import { createContext, useContext, useState, useEffect, useLayoutEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

interface ModalCtx { openModal: () => void }
const ModalContext = createContext<ModalCtx>({ openModal: () => {} })
export const useModal = () => useContext(ModalContext)

const FormModal = dynamic(() => import('./modal'), { ssr: false })

export default function Shell({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false)
  const pathname = usePathname()

  // Intercept every internal link click in the capture phase — earliest
  // possible moment — and freeze overflow so the compositor thread drops
  // any pending momentum frames before navigation begins.
  useEffect(() => {
    const freeze = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href]')
      if (!a) return
      const href = a.getAttribute('href') ?? ''
      if (href.startsWith('/') && !href.includes('#'))
        document.documentElement.style.overflow = 'hidden'
    }
    window.addEventListener('click', freeze, true)
    return () => window.removeEventListener('click', freeze, true)
  }, [])

  // After the new page renders: place at 0, then release overflow.
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (window.location.hash) return
    window.scrollTo(0, 0)
    const t = setTimeout(() => { document.documentElement.style.overflow = '' }, 32)
    return () => { document.documentElement.style.overflow = ''; clearTimeout(t) }
  }, [pathname])

  useEffect(() => {
    // Re-scan after each navigation so new .reveal elements get observed
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)')
      if (!els.length) return
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.08 }
      )
      els.forEach(el => obs.observe(el))
      return () => obs.disconnect()
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <ModalContext.Provider value={{ openModal: () => setModalOpen(true) }}>
      <div className="mk">
        {children}
        {modalOpen && <FormModal onClose={() => setModalOpen(false)} />}
      </div>
    </ModalContext.Provider>
  )
}
