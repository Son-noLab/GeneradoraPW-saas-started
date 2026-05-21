'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  imgs: string[]
  nombre: string
}

export default function ImageViewer({ imgs, nombre }: Props) {
  const [sel, setSel] = useState(0)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 18
    e.currentTarget.style.setProperty('--mx', `${x}px`)
    e.currentTarget.style.setProperty('--my', `${y}px`)
  }

  function onLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty('--mx', '0px')
    e.currentTarget.style.setProperty('--my', '0px')
  }

  return (
    <div className="iv">
      {/* Main image with parallax */}
      <div className="iv__main" onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="iv__inner">
          <Image
            className="iv__img"
            src={imgs[sel]}
            alt={nombre}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="iv__thumbs">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setSel(i)}
              className={`iv__thumb${i === sel ? ' iv__thumb--active' : ''}`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${nombre} ${i + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
