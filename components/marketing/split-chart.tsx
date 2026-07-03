interface Props {
  level: 1 | 2
}

// One continuous 8-step ascending sequence — Nivel 01 renders steps 0-3,
// Nivel 02 renders steps 4-7, picking up exactly where Nivel 01 left off.
const X_POS = [176, 266, 356, 446]
const BAR_W = 64
const BASE_Y = 280
const MAX_H = 190
const FRACTIONS = [0.12, 0.20, 0.30, 0.42, 0.55, 0.68, 0.82, 1.0]

const SHADES = {
  1: ['#EBD9A0', '#E0C179', '#C9A85B', '#A8863F'],
  2: ['#8FD3F0', '#57BEE8', '#1BA8E0', '#0E6C93'],
} as const

export default function SplitChart({ level }: Props) {
  const shades = SHADES[level]
  const offset = level === 1 ? 0 : 4

  return (
    <svg className={`split__chart split__chart--lvl${level}`} viewBox="0 0 520 320" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
      <defs>
        {X_POS.map((_, i) => (
          <linearGradient key={i} id={`split-beam-${level}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={shades[i]} stopOpacity="0.4" />
            <stop offset="100%" stopColor={shades[i]} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      <line x1="150" y1={BASE_Y} x2="520" y2={BASE_Y} className="split__chart-base" />
      {X_POS.map((x, i) => {
        const h = MAX_H * FRACTIONS[offset + i]
        const y = BASE_Y - h
        return (
          <g key={i}>
            <rect x={x} y={BASE_Y} width={BAR_W} height="30" fill={`url(#split-beam-${level}-${i})`} />
            <rect x={x} y={y} width={BAR_W} height={h} rx="6" fill={shades[i]} />
          </g>
        )
      })}
    </svg>
  )
}
