'use client'

import { useState } from 'react'

const TABS = [
  { key: 'guia',     label: 'Guía de ventas' },
  { key: 'terminos', label: 'Términos y condiciones' },
  { key: 'legal',    label: 'Terminología legal' },
]

function GuiaVentas() {
  return (
    <div className="recursos-content">
      <div className="recursos-section">
        <h3 className="recursos-section__title">El proceso de venta en 5 pasos</h3>
        <div className="recursos-steps">
          {[
            { n: '01', titulo: 'Prospección', desc: 'Identifica familias con interés en cocina saludable, parejas jóvenes o personas que valoran la calidad. Usa tus redes personales, grupos de WhatsApp y referidos.' },
            { n: '02', titulo: 'Invitación', desc: 'Invita a una demostración en casa. Sé claro: "Te voy a cocinar algo delicioso y te cuento sobre los productos." Sin presión, con propósito.' },
            { n: '03', titulo: 'Demostración en cocina', desc: 'Prepara un plato real usando la técnica sin agua y sin grasa. Deja que el producto hable. Habla del ahorro de energía, la limpieza fácil y la garantía vitalicia.' },
            { n: '04', titulo: 'Presentación del precio', desc: 'Presenta el valor antes del precio. Usa el comparativo de costo por año. Ofrece el plan de financiamiento cuando aplique.' },
            { n: '05', titulo: 'Cierre y seguimiento', desc: 'Confirma el pedido, registra el pago inicial y agenda la entrega. Contacta al cliente 3 días después para asegurar satisfacción y solicitar referidos.' },
          ].map(s => (
            <div key={s.n} className="recursos-step">
              <div className="recursos-step__num">{s.n}</div>
              <div>
                <div className="recursos-step__title">{s.titulo}</div>
                <div className="recursos-step__desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recursos-section">
        <h3 className="recursos-section__title">Manejo de objeciones frecuentes</h3>
        <div className="recursos-table-wrap">
          <table className="recursos-table">
            <thead>
              <tr><th>Objeción</th><th>Respuesta recomendada</th></tr>
            </thead>
            <tbody>
              {[
                ['"Es muy caro"', '"Entiendo. ¿Puedo mostrarte el costo real por año? Con la garantía vitalicia, es la última batería de cocina que comprarás."'],
                ['"Necesito consultarlo con mi pareja"', '"Perfecto. ¿Cuándo podemos hacer la demostración juntos? Los dos merecen ver el producto en acción."'],
                ['"Ya tengo un sistema de cocina"', '"Claro, y seguramente te ha servido bien. Déjame cocinarte algo con esto y comparas tú mismo."'],
                ['"No tengo tiempo"', '"La demostración toma 40 minutos y te llevo la comida lista. ¿El sábado a las 10 estaría bien?"'],
              ].map(([obj, resp]) => (
                <tr key={obj}>
                  <td style={{ fontWeight: 600, color: 'var(--c-navy)', width: '35%' }}>{obj}</td>
                  <td style={{ color: 'var(--c-text-muted)', fontSize: '0.85rem' }}>{resp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="recursos-section">
        <h3 className="recursos-section__title">Cálculo de comisiones</h3>
        <div className="recursos-grid-2">
          {[
            { label: 'Venta directa', val: '20%', desc: 'Sobre el precio de venta al público de cada kit vendido.' },
            { label: 'Bono de equipo Nivel 1', val: '5%', desc: 'Sobre las ventas de los socios que tú invitaste directamente.' },
            { label: 'Bono de equipo Nivel 2', val: '2%', desc: 'Sobre las ventas del segundo nivel de tu red.' },
            { label: 'Bono de liderazgo', val: 'Variable', desc: 'Al superar 10 socios activos en equipo. Coordinador CC define el monto.' },
          ].map(c => (
            <div key={c.label} className="recursos-commission-card">
              <div className="recursos-commission-card__val">{c.val}</div>
              <div className="recursos-commission-card__label">{c.label}</div>
              <div className="recursos-commission-card__desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Terminos() {
  return (
    <div className="recursos-content">
      <div className="recursos-section">
        <h3 className="recursos-section__title">Términos y condiciones del Socio CateonCook</h3>
        <p className="recursos-intro">Última actualización: enero 2025</p>
        {[
          {
            titulo: '1. Registro y elegibilidad',
            texto: 'Para ser Socio CateonCook debes ser mayor de 18 años, residir en Ecuador y completar el proceso de registro oficial. La activación de tu cuenta está sujeta a la verificación de datos y la aprobación del equipo CateonCook.',
          },
          {
            titulo: '2. Relación comercial',
            texto: 'El Socio es un distribuidor independiente, no un empleado de CateonCook ni de Royal Prestige. No existe relación laboral, de dependencia ni de exclusividad geográfica. El Socio actúa en nombre propio y asume plena responsabilidad por su actividad comercial.',
          },
          {
            titulo: '3. Obligaciones del Socio',
            texto: 'El Socio se compromete a: (a) representar los productos con veracidad; (b) no realizar promesas de ingresos garantizados a prospectos; (c) no vender fuera de los canales autorizados; (d) mantener confidencialidad sobre precios de costo y estrategias internas de CateonCook.',
          },
          {
            titulo: '4. Comisiones y pagos',
            texto: 'Las comisiones se calculan sobre ventas confirmadas y pagadas. El cierre de período ocurre el último día hábil de cada mes. El pago se acredita entre el 1 y el 5 del mes siguiente. CateonCook se reserva el derecho de retener el pago si existe una disputa activa relacionada con la venta.',
          },
          {
            titulo: '5. Cancelación de cuenta',
            texto: 'CateonCook puede suspender o cancelar la cuenta de un Socio por incumplimiento de estos términos, conducta inapropiada con clientes o prospectos, o inactividad superior a 6 meses sin previo aviso de pausa.',
          },
          {
            titulo: '6. Modificaciones',
            texto: 'CateonCook puede modificar estos términos con 30 días de anticipación notificando al Socio por correo electrónico. El uso continuado del portal después de esa fecha implica aceptación de los nuevos términos.',
          },
        ].map(s => (
          <div key={s.titulo} className="recursos-clause">
            <div className="recursos-clause__title">{s.titulo}</div>
            <div className="recursos-clause__text">{s.texto}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TerminologiaLegal() {
  const terminos = [
    { term: 'Distribuidor autorizado', def: 'Persona natural o jurídica habilitada por Royal Prestige para comercializar sus productos en un territorio específico, bajo los lineamientos de la marca.' },
    { term: 'Garantía vitalicia', def: 'Compromiso de Royal Prestige de reparar o reemplazar cualquier pieza del producto sin costo para el cliente final, durante toda la vida útil del producto, bajo uso doméstico normal.' },
    { term: 'Plan de compensación', def: 'Estructura que define cómo se calculan y pagan las comisiones a los socios distribuidores, incluyendo ventas directas y bonos por desempeño de equipo.' },
    { term: 'Red de distribución', def: 'Conjunto de socios activos vinculados a un distribuidor en diferentes niveles. Cada nivel genera comisiones distintas según el plan de compensación vigente.' },
    { term: 'Socio activo', def: 'Socio que ha realizado al menos una venta confirmada en los últimos 30 días o que cumple el mínimo de actividad establecido por CateonCook para el período en curso.' },
    { term: 'Contrato de distribución', def: 'Acuerdo formal entre CateonCook y el Socio que establece derechos, obligaciones, territorio de actuación y condiciones de terminación de la relación comercial.' },
    { term: 'Precio de catálogo', def: 'Precio sugerido de venta al público definido por Royal Prestige y CateonCook. El Socio no puede vender por debajo del precio mínimo autorizado.' },
    { term: 'Kit de inicio', def: 'Paquete de materiales y productos con el que el Socio comienza su actividad comercial. Incluye muestras, guías y acceso al portal.' },
    { term: 'Período de gracia', def: 'Plazo de 10 días hábiles tras la entrega de un pedido durante el cual el cliente puede reportar defectos de fabricación para gestionar reemplazo.' },
    { term: 'Devolución', def: 'Proceso formal de retorno de producto al inventario de CateonCook. Solo aplica por defecto de fabricación o error en el pedido. No aplica por cambio de opinión del cliente final.' },
    { term: 'NDA (Acuerdo de no divulgación)', def: 'Cláusula incluida en el contrato de distribución que prohíbe al Socio compartir información confidencial de precios, estrategias o datos internos de CateonCook con terceros.' },
    { term: 'Comisión retenida', def: 'Comisión calculada pero no pagada, en espera de confirmación de pago completo por parte del cliente o resolución de una disputa activa.' },
  ]

  return (
    <div className="recursos-content">
      <div className="recursos-section">
        <h3 className="recursos-section__title">Glosario de términos legales y comerciales</h3>
        <p className="recursos-intro">Referencia rápida de los términos más importantes que encontrarás en contratos, guías y comunicaciones oficiales.</p>
        <div className="recursos-glossary">
          {terminos.map(t => (
            <div key={t.term} className="recursos-glossary-item">
              <div className="recursos-glossary-item__term">{t.term}</div>
              <div className="recursos-glossary-item__def">{t.def}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RecursosPage() {
  const [tab, setTab] = useState('guia')

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <p className="portal-page-eyebrow">Portal del Socio</p>
        <h1 className="portal-page-title">Recursos y legal</h1>
        <p className="portal-page-sub">Guía de ventas, términos y terminología clave para tu actividad como socio.</p>
      </div>

      <div className="recursos-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`recursos-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'guia'     && <GuiaVentas />}
      {tab === 'terminos' && <Terminos />}
      {tab === 'legal'    && <TerminologiaLegal />}
    </div>
  )
}
