import type { Metadata } from 'next'
import PageHero from '@/components/marketing/page-hero'

export const metadata: Metadata = { title: 'Términos y Condiciones — CateonCook' }

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, color: '#0a0a0e', marginBottom: 14, letterSpacing: '-0.01em' }}>{title}</h2>
      <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

export default function TerminosPage() {
  return (
    <main>
      <PageHero
        variant="dark"
        chapter="Legal"
        current="Términos"
        cornerFig="Legal · Términos"
        title={<>Términos y<br /><em>condiciones.</em></>}
        lede="Condiciones de uso del sitio web y de la relación comercial con CateonCook. Última actualización: mayo 2026."
      />
      <section className="section section--cream">
        <div className="section__inner" style={{ maxWidth: 760 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.35)', marginBottom: 40 }}>
            CATEONCOOK · TÉRMINOS Y CONDICIONES · ACTUALIZACIÓN: MAYO 2026
          </div>
          <LegalSection title="1. Aceptación de los términos">
            <p>El acceso y uso de este sitio web implica la aceptación plena de estos Términos y Condiciones. CateonCook se reserva el derecho de modificarlos en cualquier momento.</p>
          </LegalSection>
          <LegalSection title="2. Sobre CateonCook">
            <p>CateonCook es una distribuidora autorizada de productos Royal Prestige en Ecuador. Opera bajo las normas y código de ética de Royal Prestige Internacional y las leyes comerciales vigentes en la República del Ecuador.</p>
          </LegalSection>
          <LegalSection title="3. Uso del sitio web">
            <p>Este sitio tiene carácter informativo y comercial. Queda expresamente prohibido:</p>
            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 6 }}>Utilizar el sitio para fines ilegales o no autorizados.</li>
              <li style={{ marginBottom: 6 }}>Reproducir, distribuir o modificar el contenido sin autorización escrita de CateonCook.</li>
              <li style={{ marginBottom: 6 }}>Intentar acceder de forma no autorizada a sistemas o áreas restringidas del sitio.</li>
              <li style={{ marginBottom: 6 }}>Enviar comunicaciones no solicitadas (spam) a través de los formularios del sitio.</li>
            </ul>
          </LegalSection>
          <LegalSection title="4. Productos y precios">
            <p>La información sobre productos y precios publicada es orientativa y puede estar sujeta a cambios. Los precios finales se confirman con el asesor o sponsor asignado.</p>
          </LegalSection>
          <LegalSection title="5. Relación comercial con socios">
            <p>La relación entre CateonCook y sus socios se rige por un contrato de distribución independiente firmado por ambas partes. Los socios son contratistas independientes. Las comisiones descritas en el sitio son referenciales; los términos exactos constan en el contrato y el plan de mercadeo oficial.</p>
          </LegalSection>
          <LegalSection title="6. Formulario de contacto">
            <p>Al enviar el formulario, el usuario consiente que un sponsor de CateonCook se comunique con él para responder a su solicitud. Este contacto no implica ningún compromiso de compra o adhesión al negocio.</p>
          </LegalSection>
          <LegalSection title="7. Garantía de productos">
            <p>Los productos Royal Prestige cuentan con garantía vitalicia contra defectos de fabricación, sujeta a condiciones de uso normal. El proceso de garantía se gestiona a través del distribuidor asignado.</p>
          </LegalSection>
          <LegalSection title="8. Devoluciones">
            <p>Los socios que deseen devolver producto no vendido dentro de los primeros 6 meses recibirán el 90% del valor de compra. El cliente final puede solicitar la devolución dentro de los primeros 30 días, en condiciones normales de uso.</p>
          </LegalSection>
          <LegalSection title="9. Propiedad intelectual">
            <p>Todo el contenido de este sitio (textos, imágenes, logotipos, diseño) es propiedad de CateonCook o de Royal Prestige Internacional, y está protegido por las leyes de propiedad intelectual aplicables.</p>
          </LegalSection>
          <LegalSection title="10. Limitación de responsabilidad">
            <p>CateonCook no garantiza la disponibilidad continua del sitio. En la máxima medida permitida por la ley, no será responsable de daños derivados del uso o imposibilidad de uso del sitio.</p>
          </LegalSection>
          <LegalSection title="11. Ley aplicable y jurisdicción">
            <p>Estos términos se rigen por las leyes de la República del Ecuador. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Quito, Ecuador.</p>
          </LegalSection>
          <LegalSection title="12. Contacto">
            <p><strong>CateonCook</strong> · <a href="mailto:administracion@cateoncook.com" style={{ color: '#0a0a0e' }}>administracion@cateoncook.com</a><br />Quito · Guayaquil · Cuenca · Ecuador</p>
          </LegalSection>
          <div style={{ marginTop: 48, padding: '20px 24px', background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid #E6C77A', fontSize: 12, color: 'rgba(0,0,0,0.45)', lineHeight: 1.7 }}>
            Fecha de última actualización: mayo de 2026. Versión 1.0.
          </div>
        </div>
      </section>
    </main>
  )
}
