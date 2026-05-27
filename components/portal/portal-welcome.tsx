'use client'

import { useProfile, monthsInNetwork, LEVEL_LABELS } from './profile-context'

export function PortalWelcome({ email }: { email: string }) {
  const { profile } = useProfile()
  const name    = profile.displayName || email.split('@')[0]
  const level   = LEVEL_LABELS[profile.level] ?? profile.level
  const months  = monthsInNetwork(profile.joinDate)

  return (
    <div className="portal-welcome">
      <div className="portal-welcome__left">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt={name} className="portal-welcome__avatar" />
        ) : (
          <div className="portal-welcome__avatar portal-welcome__avatar--initials">
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="portal-welcome__text">
          <span className="portal-welcome__greeting">Bienvenido de regreso</span>
          <div className="portal-welcome__name">{name}</div>
          <div className="portal-welcome__meta">{email} · Socio activo</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="portal-welcome__badge">
          <span className="portal-welcome__badge-val">{level}</span>
          <span className="portal-welcome__badge-label">Nivel actual</span>
        </div>
        <div className="portal-welcome__badge">
          <span className="portal-welcome__badge-val">{months}</span>
          <span className="portal-welcome__badge-label">
            {months === 1 ? 'Mes en la red' : 'Meses en la red'}
          </span>
        </div>
      </div>
    </div>
  )
}
