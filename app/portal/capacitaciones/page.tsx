const MODULOS = [
  {
    id: 1, tag: 'Producto', titulo: 'Introducción a Royal Prestige',
    desc: 'Historia de la marca, tecnología de cocción sin agua y sin grasa, y diferenciadores frente a la competencia.',
    duracion: '45 min', estado: 'completado', estadoLabel: 'Completado', progreso: 100,
  },
  {
    id: 2, tag: 'Ventas', titulo: 'Demostración en cocina: paso a paso',
    desc: 'Cómo preparar y conducir una demostración en casa que convierta. Materiales, guión y manejo del tiempo.',
    duracion: '60 min', estado: 'completado', estadoLabel: 'Completado', progreso: 100,
  },
  {
    id: 3, tag: 'Ventas', titulo: 'Manejo de objeciones',
    desc: 'Las 12 objeciones más frecuentes y cómo responderlas con honestidad y confianza. Rol-plays incluidos.',
    duracion: '45 min', estado: 'progreso', estadoLabel: 'En progreso', progreso: 65,
  },
  {
    id: 4, tag: 'Liderazgo', titulo: 'Construcción de equipo',
    desc: 'Cómo identificar, invitar y acompañar a nuevos socios. El rol del sponsor en los primeros 90 días.',
    duracion: '90 min', estado: 'bloqueado', estadoLabel: 'No iniciado', progreso: 0,
  },
  {
    id: 5, tag: 'Finanzas', titulo: 'Finanzas personales para socios',
    desc: 'Presupuesto, manejo de comisiones, ahorro e inversión. Pensado para quien empieza a generar ingresos variables.',
    duracion: '60 min', estado: 'bloqueado', estadoLabel: 'No iniciado', progreso: 0,
  },
  {
    id: 6, tag: 'Herramientas', titulo: 'Herramientas digitales CC',
    desc: 'Portal del socio, gestión de pedidos, recursos de marketing y cómo usar las redes sociales de manera efectiva.',
    duracion: '30 min', estado: 'bloqueado', estadoLabel: 'No iniciado', progreso: 0,
  },
]

export default function CapacitacionesPage() {
  const completados = MODULOS.filter(m => m.estado === 'completado').length
  const total = MODULOS.length
  const minutosTotales = MODULOS.reduce((a, m) => a + parseInt(m.duracion), 0)
  const minutosCompletados = MODULOS.filter(m => m.estado === 'completado').reduce((a, m) => a + parseInt(m.duracion), 0)

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <p className="portal-page-eyebrow">Portal del Socio</p>
        <h1 className="portal-page-title">Capacitaciones</h1>
        <p className="portal-page-sub">Formación continua para crecer como socio CateonCook.</p>
      </div>

      {/* Resumen de progreso */}
      <div className="cap-resume-bar">
        <div className="cap-resume-item">
          <strong>{completados}/{total}</strong>
          <span>Módulos completados</span>
        </div>
        <div className="cap-resume-divider" />
        <div className="cap-resume-item">
          <strong>{minutosCompletados} min</strong>
          <span>Tiempo completado</span>
        </div>
        <div className="cap-resume-divider" />
        <div className="cap-resume-item">
          <strong>{minutosTotales} min</strong>
          <span>Tiempo total</span>
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>
            <span>Progreso general</span>
            <span>{Math.round((minutosCompletados / minutosTotales) * 100)}%</span>
          </div>
          <div className="cap-card__progress-bar" style={{ height: '6px' }}>
            <div
              className="cap-card__progress-fill"
              style={{ width: `${(minutosCompletados / minutosTotales) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid de módulos */}
      <div className="cap-grid">
        {MODULOS.map(m => (
          <div key={m.id} className="cap-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span className="cap-card__tag">{m.tag}</span>
              <span className={`status status--${m.estado}`}>{m.estadoLabel}</span>
            </div>
            <div className="cap-card__title">{m.titulo}</div>
            <div className="cap-card__meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              {m.duracion}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>{m.desc}</div>
            {m.progreso > 0 && m.progreso < 100 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--c-text-muted)', marginBottom: '4px' }}>
                  <span>Progreso</span><span>{m.progreso}%</span>
                </div>
                <div className="cap-card__progress-bar">
                  <div className="cap-card__progress-fill" style={{ width: `${m.progreso}%` }} />
                </div>
              </div>
            )}
            <div className="cap-card__footer">
              <span style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)' }}>
                Módulo {m.id} de {total}
              </span>
              <span className={`cap-card__btn${m.estado === 'bloqueado' ? ' cap-card__btn--disabled' : ''}`}>
                {m.estado === 'completado' ? 'Repasar' : m.estado === 'progreso' ? 'Continuar' : 'Próximamente'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>
        * El contenido de video estará disponible en la plataforma de capacitaciones al lanzamiento.
      </p>
    </div>
  )
}
