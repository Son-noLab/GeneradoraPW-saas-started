'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Estado = 'pendiente' | 'contactado' | 'aprobado' | 'rechazado'

interface Solicitud {
  id: string
  nombre: string
  telefono: string
  correo: string
  ciudad: string | null
  como_supo: string | null
  estado: Estado
  notas: string | null
  created_at: string
}

const estadoColors: Record<Estado, string> = {
  pendiente:  '#F59E0B',
  contactado: '#3B82F6',
  aprobado:   '#10B981',
  rechazado:  '#EF4444',
}

export default function AdminTable({ solicitudes: initial }: { solicitudes: Solicitud[] }) {
  const [solicitudes, setSolicitudes] = useState(initial)
  const [updating, setUpdating] = useState<string | null>(null)

  async function updateEstado(id: string, estado: Estado) {
    setUpdating(id)
    const supabase = createClient()
    const { error } = await supabase
      .from('solicitudes')
      .update({ estado })
      .eq('id', id)

    if (!error) {
      setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado } : s))
    }
    setUpdating(null)
  }

  if (solicitudes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--c-text-muted)' }}>
        <p style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif", fontSize: '1.6rem', color: 'var(--c-navy)' }}>No hay solicitudes aún</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Las solicitudes enviadas desde el sitio aparecerán aquí.</p>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--c-border)', textAlign: 'left' }}>
            {['Nombre', 'Teléfono', 'Correo', 'Ciudad', 'Cómo supo', 'Fecha', 'Estado', 'Acción'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--c-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid var(--c-border)' }}>
              <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: 'var(--c-navy)' }}>{s.nombre}</td>
              <td style={{ padding: '0.9rem 1rem', color: 'var(--c-text-muted)' }}>
                <a href={`tel:${s.telefono}`} style={{ color: 'var(--c-blue)' }}>{s.telefono}</a>
              </td>
              <td style={{ padding: '0.9rem 1rem', color: 'var(--c-text-muted)' }}>
                <a href={`mailto:${s.correo}`} style={{ color: 'var(--c-blue)' }}>{s.correo}</a>
              </td>
              <td style={{ padding: '0.9rem 1rem', color: 'var(--c-text-muted)' }}>{s.ciudad ?? '—'}</td>
              <td style={{ padding: '0.9rem 1rem', color: 'var(--c-text-muted)' }}>{s.como_supo ?? '—'}</td>
              <td style={{ padding: '0.9rem 1rem', color: 'var(--c-text-muted)', whiteSpace: 'nowrap' }}>
                {new Date(s.created_at).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
              <td style={{ padding: '0.9rem 1rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '2px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: estadoColors[s.estado],
                  background: estadoColors[s.estado] + '18',
                  border: `1px solid ${estadoColors[s.estado]}44`,
                }}>
                  {s.estado}
                </span>
              </td>
              <td style={{ padding: '0.9rem 1rem' }}>
                <select
                  value={s.estado}
                  disabled={updating === s.id}
                  onChange={e => updateEstado(s.id, e.target.value as Estado)}
                  style={{
                    padding: '0.4rem 0.6rem',
                    border: '1px solid var(--c-border)',
                    background: 'var(--c-white)',
                    fontSize: '0.8rem',
                    color: 'var(--c-text)',
                    cursor: 'pointer',
                    opacity: updating === s.id ? 0.5 : 1,
                  }}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="contactado">Contactado</option>
                  <option value="aprobado">Aprobado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
