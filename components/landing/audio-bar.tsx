'use client'

import React, { useState, useRef, useEffect } from 'react'

export default function AudioPill({
  src = '/audio/corporativo.mp3',
  label = 'Fábrica de Sueños',
}: {
  src?: string
  label?: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  // Play when hero exits viewport, pause when hero re-enters
  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const audio = audioRef.current
        if (!audio) return
        if (!entry.isIntersecting) {
          audio.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          audio.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  function toggle(e: React.MouseEvent) {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  return (
    <div className="audio-pill-anchor">
      <audio ref={audioRef} src={src} loop preload="none" />

      <button
        className={`audio-pill${playing ? ' audio-pill--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pausar audio' : 'Reproducir audio'}
      >
        {/* Animated waveform bars */}
        <span className="audio-pill__wave" aria-hidden="true">
          {[0, 1, 2, 3].map(i => (
            <span
              key={i}
              className="audio-pill__bar"
              style={{ '--i': i } as React.CSSProperties}
            />
          ))}
        </span>

        <span className="audio-pill__label">{label}</span>

        {/* +/× toggle */}
        <span className="audio-pill__btn" aria-hidden="true">
          {playing ? '−' : '+'}
        </span>
      </button>
    </div>
  )
}
