'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'

const TONES = {
  natural: { src: '/img/brand/logo-horizontal-natural.png', w: 1076, h: 453 },
  positive: { src: '/img/brand/logo-horizontal-positive.png', w: 1076, h: 453 },
} as const

/** Official CateonCook horizontal logo lockup (icon + wordmark), from brand-provided PNGs. */
export function BrandLogo({
  tone = 'natural',
  height = 40,
  priority,
  style,
}: {
  tone?: keyof typeof TONES
  height?: number
  priority?: boolean
  style?: CSSProperties
}) {
  const { src, w, h } = TONES[tone]
  return (
    <Image
      src={src}
      alt="CateonCook"
      width={w}
      height={h}
      priority={priority}
      style={{ height, width: 'auto', objectFit: 'contain', flexShrink: 0, ...style }}
    />
  )
}

const STACKED_TONES = {
  natural: { src: '/img/brand/logo-stacked-natural.png', w: 896, h: 1092 },
  positive: { src: '/img/brand/logo-stacked-positive.png', w: 896, h: 1092 },
} as const

/** Official CateonCook stacked logo lockup (icon on top, wordmark below), from brand-provided PNGs. */
export function LogoStacked({
  tone = 'natural',
  height = 56,
  priority,
  style,
}: {
  tone?: keyof typeof STACKED_TONES
  height?: number
  priority?: boolean
  style?: CSSProperties
}) {
  const { src, w, h } = STACKED_TONES[tone]
  return (
    <Image
      src={src}
      alt="CateonCook"
      width={w}
      height={h}
      priority={priority}
      style={{ height, width: 'auto', objectFit: 'contain', flexShrink: 0, ...style }}
    />
  )
}

const WORDMARK_TONES = {
  positive: { src: '/img/brand/logo-wordmark-positive.png', w: 624, h: 66 },
} as const

/** Official CateonCook compact wordmark-only lockup ("Responsive" PNG, brand-provided), for tight/inline spots. */
export function LogoWordmark({
  tone = 'positive',
  height = 32,
  priority,
  style,
}: {
  tone?: keyof typeof WORDMARK_TONES
  height?: number
  priority?: boolean
  style?: CSSProperties
}) {
  const { src, w, h } = WORDMARK_TONES[tone]
  return (
    <Image
      src={src}
      alt="CateonCook"
      width={w}
      height={h}
      priority={priority}
      style={{ height, width: 'auto', objectFit: 'contain', flexShrink: 0, ...style }}
    />
  )
}

const BADGE_TONES = {
  natural: { src: '/img/brand/logo-badge-natural.png', w: 672, h: 672 },
  positive: { src: '/img/brand/logo-badge-positive.png', w: 678, h: 662 },
} as const

/** Official circular badge lockup (brand-provided "LogoStick" PNG, unmodified), for compact spots (footer, portal nav, hero mark). */
export function LogoBadge({
  tone = 'natural',
  size = 36,
  priority,
  style,
}: {
  tone?: keyof typeof BADGE_TONES
  size?: number
  priority?: boolean
  style?: CSSProperties
}) {
  const { src, w, h } = BADGE_TONES[tone]
  return (
    <Image
      src={src}
      alt="CateonCook"
      width={w}
      height={h}
      priority={priority}
      style={{ height: size, width: size, objectFit: 'contain', flexShrink: 0, ...style }}
    />
  )
}
