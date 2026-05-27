'use client'

import { useState } from 'react'

const PEDIDOS = [
  { id: 'CC-2025-012', producto: 'Novel Plus Set (x2)', fecha: '20 May 2025', monto: '$320.00', estado: 'pendiente',  estadoLabel: 'Pendiente',   eta: 'Entrega est. 28 May' },
  { id: 'CC-2025-008', producto: 'Kit Nonstick Completo',  fecha: '18 May 2025', monto: '$280.00', estado: 'camino',     estadoLabel: 'En camino',   eta: 'En ruta · sale mañana' },
  { id: 'CC-2025-003', producto: 'Kit 5-Ply Premier (x1)', fecha: '03 Mar 2025', monto: '$680.00', estado: 'entregado', estadoLabel: 'Entregado',   eta: 'Entregado el 10 Mar' },
  { id: 'CC-2024-088', producto: 'Kit Innové (x1)',         fecha: '10 Ene 2025', monto: '$155.00', estado: 'entregado', estadoLabel: 'Entregado',   eta: 'Entregado el 17 Ene' },
  { id: 'CC-2024-047', producto: 'Kit Innové (x3)',         fecha: '15 Feb 2024', monto: '$450.00', estado: 'entregado', estadoLabel: 'Entregado',   eta: 'Entregado el 22 Feb' },
]

const FILTERS = [
  { key: 'todos',     label: 'Todos' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'camino',    label: 'En camino' },
  { key: 'entregado', label: 'Entregados' },
]

export default function PedidosPage() {
  const [filter, setFilter] = useState('todos')
  const visible = filter === 'todos' ? PEDIDOS : PEDIDOS.filter(p => p.estado === filter)

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <p className="portal-page-eyebrow">Portal del Socio</p>
        <h1 className="portal-page-title">Pedidos y logística</h1>
        <p className="portal-page-sub">Historial y estado de tus pedidos al por mayor.</p>
      </div>

      {/* Stats rápidas */}
      <div style={{
        display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap',
      }}>
        {[
          { label: 'Total pedidos', val: PEDIDOS.length },
          { label: 'En camino',     val: PEDIDOS.filter(p => p.estado === 'camino').length },
          { label: 'Pendientes',    val: PEDIDOS.filter(p => p.estado === 'pendiente').length },
          { label: 'Entregados',    val: PEDIDOS.filter(p => p.estado === 'entregado').length },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--c-white)', border: '1px solid var(--c-border)',
            borderRadius: '6px', padding: '1rem 1.25rem',
            display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 120,
          }}>
            <span style={{
              fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif",
              fontSize: '1.8rem', fontWeight: 300, color: 'var(--c-navy)', lineHeight: 1,
            }}>{s.val}</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="portal-filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`portal-filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr>
              <th>N.º de pedido</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(p => (
              <tr key={p.id}>
                <td><span className="portal-table__id">{p.id}</span></td>
                <td style={{ fontWeight: 500 }}>{p.producto}</td>
                <td style={{ color: 'var(--c-text-muted)', fontSize: '0.83rem' }}>{p.fecha}</td>
                <td><span className="portal-table__amount">{p.monto}</span></td>
                <td>
                  <span className={`status status--${p.estado}`}>{p.estadoLabel}</span>
                </td>
                <td style={{ color: 'var(--c-text-muted)', fontSize: '0.8rem' }}>{p.eta}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--c-text-muted)', padding: '2rem' }}>
                  No hay pedidos con este filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Aviso datos reales */}
      <p style={{
        marginTop: '1rem', fontSize: '0.75rem', color: 'var(--c-text-muted)',
        letterSpacing: '0.02em',
      }}>
        * Los datos mostrados son de demostración. La integración con el sistema de pedidos estará activa próximamente.
      </p>
    </div>
  )
}
