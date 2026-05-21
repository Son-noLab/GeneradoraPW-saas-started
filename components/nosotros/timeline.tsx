'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { TIMELINE, type TimelineEntry, type MediaItem } from './timeline-data'

function NodeIcon({ g }: { g: TimelineEntry['granularity'] }) {
  if (g === 'decade')  return <span className="tl-node__icon tl-node__icon--decade">D</span>
  if (g === 'lustrum') return <span className="tl-node__icon tl-node__icon--lustrum">L</span>
  return null
}

function MediaGallery({ media, headline }: { media: MediaItem[]; headline: string }) {
  const [selected, setSelected] = useState(0)
  if (media.length === 0) return (
    <div className="tl-gallery tl-gallery--empty">
      <p>Registro multimedia próximamente</p>
    </div>
  )
  const item = media[selected]
  return (
    <div className="tl-gallery">
      <div className="tl-gallery__main">
        {item.type === 'video' ? (
          <video src={item.src} controls className="tl-gallery__media" />
        ) : (
          <div className="tl-gallery__photo">
            <Image src={item.src} alt={item.caption} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <p className="tl-gallery__caption">{item.caption}</p>
      </div>
      {media.length > 1 && (
        <div className="tl-gallery__thumbs">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`tl-gallery__thumb${i === selected ? ' tl-gallery__thumb--active' : ''}`}
              aria-label={m.caption}
            >
              <Image src={m.thumb} alt={m.caption} fill style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Timeline({ initialId }: { initialId?: string }) {
  const [activeId, setActiveId] = useState<string>(
    initialId && TIMELINE.find(e => e.id === initialId) ? initialId : TIMELINE[0].id
  )
  const railRef   = useRef<HTMLDivElement>(null)
  const nodeRefs  = useRef<Record<string, HTMLButtonElement | null>>({})

  const active = TIMELINE.find(e => e.id === activeId) ?? TIMELINE[0]

  const scrollNodeIntoView = useCallback((id: string) => {
    const node = nodeRefs.current[id]
    const rail = railRef.current
    if (!node || !rail) return
    const nodeLeft   = node.offsetLeft
    const nodeWidth  = node.offsetWidth
    const railWidth  = rail.offsetWidth
    rail.scrollTo({ left: nodeLeft - railWidth / 2 + nodeWidth / 2, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollNodeIntoView(activeId)
  }, [activeId, scrollNodeIntoView])

  // Sync hash on mount
  useEffect(() => {
    if (initialId) {
      const el = document.getElementById(initialId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [initialId])

  return (
    <section className="tl-section">

      {/* Rail */}
      <div className="tl-rail-wrap">
        <div className="tl-rail" ref={railRef} role="tablist" aria-label="Línea del tiempo">
          <div className="tl-rail__line" aria-hidden="true" />
          {TIMELINE.map(entry => (
            <button
              key={entry.id}
              id={entry.id}
              ref={el => { nodeRefs.current[entry.id] = el }}
              role="tab"
              aria-selected={entry.id === activeId}
              onClick={() => setActiveId(entry.id)}
              className={`tl-node tl-node--${entry.granularity}${entry.id === activeId ? ' tl-node--active' : ''}`}
            >
              <NodeIcon g={entry.granularity} />
              <span className="tl-node__year">{entry.label}</span>
              <span className="tl-node__dot" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="tl-detail" key={activeId} aria-live="polite">
        <div className="tl-detail__meta">
          <span className="tl-detail__label">{active.label}</span>
          <span className="tl-detail__achievement">{active.achievement}</span>
        </div>
        <h2 className="tl-detail__headline">{active.headline}</h2>
        <p className="tl-detail__description">{active.description}</p>
        <MediaGallery media={active.media} headline={active.headline} />
      </div>

    </section>
  )
}
