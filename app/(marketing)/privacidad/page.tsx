import type { Metadata } from 'next'
import PageHero from '@/components/marketing/page-hero'

export const metadata: Metadata = { title: 'Política de Privacidad — CateonCook' }

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, color: '#0a0a0e', marginBottom: 14, letterSpacing: '-0.01em' }}>{title}</h2>
      <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

export default function PrivacidadPage() {
  return (
    <main>
      <PageHero
        variant="dark"
        chapter="Legal"
        current="Privacidad"
        cornerFig="Legal · Privacidad"
        title={<>Política de<br /><em>privacidad.</em></>}
        lede="Cómo recopilamos, usamos y protegemos tus datos personales de acuerdo con la LOPDP de Ecuador. Última actualización: mayo 2026."
      />
      <section className="section section--cream">
        <div className="section__inner" style={{ maxWidth: 760 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.35)', marginBottom: 40 }}>
            CATEONCOOK · POLÍTICA DE PRIVACIDAD · ACTUALIZACIÓN: MAYO 2026
          </div>
          <LegalSection title="1. Responsable del tratamiento">
            <p>CateonCook, distribuidora autorizada de Royal Prestige en Ecuador, es responsable del tratamiento de los datos personales recabados a través de este sitio web y de los formularios de contacto.</p>
          </LegalSection>
          <LegalSection title="2. Datos que recopilamos">
            <p>Nombre completo, número de teléfono/WhatsApp, correo electrónico, ciudad y provincia, profesión y motivación para unirse. Estos datos son proporcionados voluntariamente a través de los formularios del sitio.</p>
          </LegalSection>
          <LegalSection title="3. Finalidad del tratamiento">
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 6 }}>Gestionar solicitudes de ingreso al equipo CateonCook.</li>
              <li style={{ marginBottom: 6 }}>Responder consultas a través de los canales indicados.</li>
              <li style={{ marginBottom: 6 }}>Enviar información relevante sobre productos, eventos y capacitaciones (con consentimiento previo).</li>
            </ul>
          </LegalSection>
          <LegalSection title="4. Base legal">
            <p>El tratamiento se fundamenta en el consentimiento libre e informado del titular, conforme a los artículos 6 y 7 de la Ley Orgánica de Protección de Datos Personales (LOPDP) del Ecuador.</p>
          </LegalSection>
          <LegalSection title="5. Conservación de datos">
            <p>Los datos se conservarán mientras exista una relación comercial activa o mientras el titular no solicite su eliminación. Una vez finalizada la relación, se eliminarán en un plazo máximo de 12 meses.</p>
          </LegalSection>
          <LegalSection title="6. Destinatarios">
            <p>Los datos no serán cedidos a terceros, salvo obligación legal. Royal Prestige Internacional podría acceder a datos estadísticos agregados sin identificación personal.</p>
          </LegalSection>
          <LegalSection title="7. Derechos del titular">
            <p>Puedes ejercer tus derechos de acceso, rectificación, cancelación, oposición y portabilidad enviando un correo a <a href="mailto:administracion@cateoncook.com" style={{ color: '#0a0a0e' }}>administracion@cateoncook.com</a>. Responderemos en un plazo máximo de 15 días hábiles.</p>
          </LegalSection>
          <LegalSection title="8. Seguridad">
            <p>CateonCook aplica medidas técnicas y organizativas para garantizar la seguridad de tus datos: cifrado en tránsito (HTTPS/TLS), control de acceso por roles y almacenamiento en infraestructura certificada (Supabase — ISO 27001).</p>
          </LegalSection>
          <LegalSection title="9. Cookies">
            <p>Este sitio utiliza únicamente cookies técnicas necesarias para el funcionamiento. No utiliza cookies de seguimiento ni publicidad de terceros.</p>
          </LegalSection>
          <LegalSection title="10. Contacto">
            <p><strong>CateonCook</strong> · <a href="mailto:administracion@cateoncook.com" style={{ color: '#0a0a0e' }}>administracion@cateoncook.com</a><br />Quito · Guayaquil · Cuenca · Ecuador</p>
          </LegalSection>
          <div style={{ marginTop: 48, padding: '20px 24px', background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid #E6C77A', fontSize: 12, color: 'rgba(0,0,0,0.45)', lineHeight: 1.7 }}>
            Fecha de última actualización: mayo de 2026. Versión 1.0. Ley aplicable: LOPDP Ecuador (R.O. 459, 26-may-2021).
          </div>
        </div>
      </section>
    </main>
  )
}
