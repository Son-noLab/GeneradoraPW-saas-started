'use client'

const TICKETS = [
  {
    id: 'TKT-002', asunto: 'Demora en entrega del pedido CC-2025-008',
    fecha: '19 May 2025', estado: 'abierto', estadoLabel: 'En proceso',
    ultimo: 'Equipo CC: "Estamos coordinando con la transportista. Te informamos el 22 May."',
  },
  {
    id: 'TKT-001', asunto: '¿Cómo registro una venta directa en el portal?',
    fecha: '12 May 2025', estado: 'resuelto', estadoLabel: 'Resuelto',
    ultimo: 'Equipo CC: "Encontrarás el formulario de registro en Pedidos → Nueva venta."',
  },
]

const FAQS = [
  {
    q: '¿Cómo calculo mis comisiones del mes?',
    a: 'Tus comisiones se calculan automáticamente a partir del volumen de ventas confirmadas en el mes en curso. El cierre ocurre el último día hábil y el pago se acredita entre el 1 y el 5 del mes siguiente.',
  },
  {
    q: '¿Puedo cambiar el producto de un pedido ya realizado?',
    a: 'Puedes modificar un pedido dentro de las 24 horas siguientes a su confirmación, siempre que no haya sido despachado. Abre un ticket de soporte y el equipo CC te asistirá.',
  },
  {
    q: '¿Cómo sumo un nuevo socio a mi red?',
    a: 'Comparte el enlace /unete con tu prospecto. Una vez que complete el formulario, solicita a tu coordinador que lo vincule a tu estructura. El proceso tarda 1–2 días hábiles.',
  },
  {
    q: '¿Qué pasa si un cliente quiere devolver el producto?',
    a: 'Royal Prestige ofrece garantía vitalicia. El cliente puede contactar directamente al servicio de garantías o a través de tu número como distribuidor. Abre un ticket para guiarte en el proceso.',
  },
]

export default function SoportePage() {
  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <p className="portal-page-eyebrow">Portal del Socio</p>
        <h1 className="portal-page-title">Soporte</h1>
        <p className="portal-page-sub">Respuestas rápidas y contacto directo con el equipo CateonCook.</p>
      </div>

      <div className="soporte-grid">
        {/* Columna izquierda: tickets + nuevo ticket */}
        <div>
          {/* Tickets activos */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
              <h2 style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--c-navy)' }}>
                Mis tickets
              </h2>
              <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
                {TICKETS.filter(t => t.estado === 'abierto').length} abierto · {TICKETS.filter(t => t.estado === 'resuelto').length} resuelto
              </span>
            </div>
            <div className="soporte-tickets portal-table-wrap">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Asunto</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {TICKETS.map(t => (
                    <tr key={t.id}>
                      <td><span className="portal-table__id">{t.id}</span></td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem', marginBottom: '3px' }}>{t.asunto}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', lineHeight: 1.4 }}>{t.ultimo}</div>
                      </td>
                      <td style={{ color: 'var(--c-text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{t.fecha}</td>
                      <td><span className={`status status--${t.estado}`}>{t.estadoLabel}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nuevo ticket */}
          <div style={{
            background: 'var(--c-white)', border: '1px solid var(--c-border)',
            borderRadius: '6px', padding: '1.5rem',
          }}>
            <h2 style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--c-navy)', marginBottom: '1rem' }}>
              Abrir nuevo ticket
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
              onSubmit={e => e.preventDefault()}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>
                  Asunto
                </label>
                <input
                  type="text" placeholder="Describe brevemente tu consulta"
                  style={{
                    padding: '0.75rem 1rem', border: '1px solid var(--c-border)',
                    borderRadius: '3px', fontSize: '0.88rem', color: 'var(--c-text)',
                    background: 'var(--c-bg)', fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>
                  Detalle
                </label>
                <textarea
                  rows={4} placeholder="Cuéntanos más sobre tu consulta o problema..."
                  style={{
                    padding: '0.75rem 1rem', border: '1px solid var(--c-border)',
                    borderRadius: '3px', fontSize: '0.88rem', color: 'var(--c-text)',
                    background: 'var(--c-bg)', fontFamily: 'inherit',
                    resize: 'vertical', outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '0.75rem', background: 'var(--c-navy)', color: '#fff',
                  border: 'none', borderRadius: '3px', fontFamily: 'inherit',
                  fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Enviar ticket
              </button>
            </form>
          </div>
        </div>

        {/* Columna derecha: contacto + FAQ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Contacto directo */}
          <div className="soporte-contact">
            <div className="soporte-contact__title">Contacto directo</div>
            <a href="https://wa.me/593984909878" className="soporte-contact__item" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              WhatsApp del equipo CC
            </a>
            <a href="mailto:soporte@cateoncook.com" className="soporte-contact__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              soporte@cateoncook.com
            </a>
            <div style={{ fontSize: '0.78rem', color: 'rgba(237,241,248,0.4)', paddingTop: '0.5rem', borderTop: '1px solid rgba(210,228,255,0.1)' }}>
              Lun – Sáb · 09:00 – 19:00 · Respuesta en &lt;4 h hábiles
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--c-navy)', marginBottom: '0.9rem' }}>
              Preguntas frecuentes
            </h2>
            <div className="soporte-faq">
              {FAQS.map((f, i) => (
                <div key={i} className="soporte-faq-item">
                  <div className="soporte-faq-item__q">{f.q}</div>
                  <div className="soporte-faq-item__a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
