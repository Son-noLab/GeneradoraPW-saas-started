'use client'

import type { CSSProperties } from 'react'

export function CCLogoMark({
  size = 36,
  color = 'currentColor',
  style,
}: {
  size?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" style={style} aria-hidden="true">
      <circle cx="40" cy="40" r="37" stroke={color} strokeWidth="3.5" />
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="1.2" />
      <rect x="36" y="16" width="8" height="7" rx="3" fill={color} />
      <path d="M20 27 Q20 24 40 24 Q60 24 60 27 Q60 31 40 31 Q20 31 20 27Z" fill={color} />
      <path d="M22 31 L22 52 Q22 61 40 61 Q58 61 58 52 L58 31 Z" fill={color} />
      <path d="M22 36 Q13 36 13 44 Q13 52 22 49" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M58 36 Q67 36 67 44 Q67 52 58 49" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}
