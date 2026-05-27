'use client'

import Lenis from 'lenis'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export const LenisCtx = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisCtx)

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })
    setLenis(l)

    let id: number
    function raf(time: number) {
      l.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      l.destroy()
    }
  }, [])

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>
}
