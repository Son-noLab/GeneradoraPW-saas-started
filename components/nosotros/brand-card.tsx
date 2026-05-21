'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link  from 'next/link'

type Props = {
  slug:   string
  titulo: string
  desc:   string
  img:    string
}

export default function BrandCard({ slug, titulo, desc, img }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bst-card">
      <Link href={`/nosotros/historia/${slug}`} className="bst-card__img-wrap">
        <Image
          src={img}
          alt={titulo}
          fill
          sizes="(max-width: 1100px) 50vw, 25vw"
          style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
          className="bst-card__img-el"
        />
      </Link>
      <div className="bst-card__text">
        <Link href={`/nosotros/historia/${slug}`} className="bst-card__titulo-link">
          <h3 className="bst-card__titulo">{titulo}</h3>
        </Link>
        <p className={`bst-card__desc${open ? ' bst-card__desc--open' : ''}`}>{desc}</p>
        <button className="bst-card__more" onClick={() => setOpen(o => !o)}>
          {open ? 'Leer menos ↑' : 'Leer más →'}
        </button>
      </div>
    </div>
  )
}
