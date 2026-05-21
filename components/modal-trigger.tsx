'use client'

interface ModalTriggerProps {
  label: string
  className?: string
  style?: React.CSSProperties
}

export default function ModalTrigger({ label, className = 'btn btn--hero', style }: ModalTriggerProps) {
  return (
    <button
      className={className}
      style={style}
      onClick={() => window.dispatchEvent(new CustomEvent('modal:open'))}
    >
      {label}
    </button>
  )
}
