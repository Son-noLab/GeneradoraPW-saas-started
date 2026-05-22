'use client'

import React, { useState, useRef, useEffect } from 'react'

function fmt(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export default function AudioBar({
  src = '/audio/corporativo.mp3',
  label = 'Mensaje del Territorio',
}: {
  src?: string
  label?: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrent(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onMeta = () => setDuration(audio.duration)
    const onEnd  = () => { setPlaying(false); setProgress(0); setCurrent(0) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    const track = trackRef.current
    if (!audio || !track || !duration) return
    const rect = track.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  return (
    <div className="audiobar" role="region" aria-label="Reproductor de audio">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="audiobar__inner">

        {/* Play / Pause */}
        <button className="audiobar__play" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="3" width="4" height="18" rx="1"/>
              <rect x="15" y="3" width="4" height="18" rx="1"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
          )}
        </button>

        {/* Label */}
        <span className="audiobar__label">{label}</span>

        {/* Waveform / Progress track */}
        <div className="audiobar__track" ref={trackRef} onClick={seek} role="slider"
          aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="audiobar__rail" />
          <div className="audiobar__fill" style={{ width: `${progress}%` }} />
          <div className="audiobar__thumb" style={{ left: `${progress}%` }} />
        </div>

        {/* Time */}
        <span className="audiobar__time">
          {fmt(current)}<span className="audiobar__sep">/</span>{duration ? fmt(duration) : '--:--'}
        </span>

      </div>
    </div>
  )
}
