'use client'

import { useEffect } from 'react'

export default function CursorSwitcher() {
  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return

    const update = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const inside =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      if (inside) {
        delete document.body.dataset.cursor
      } else {
        document.body.dataset.cursor = 'logo'
      }
    }

    document.addEventListener('mousemove', update, { passive: true })
    return () => {
      document.removeEventListener('mousemove', update)
      delete document.body.dataset.cursor
    }
  }, [])

  return null
}
