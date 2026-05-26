/* CateonCook — Términos y Condiciones */

const { useEffect: termUseEffect } = React;

function LegalSection({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 17, color: "#0a0a0e", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</h2>
      <div style={{ fontSize: 14, color: "rgba(0,0,0,0.65)", lineHeight: 1.85 }}>{children}</div>
    </div>
  );
}

function App() {
  termUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  return (
    <>
      <Header currentPage={null} alwaysSolid />
      <main>
        <PageHero
          variant="dark"
          chapter="Legal"
          current="Términos"
          cornerFig="Legal · Términos"
          title={<>Términos y<br /><em>condiciones.</em></>}
          lede="Condiciones de uso del sitio web y de la relación comercial con CateonCook. Última actualización: mayo 2026."
          meta={[]}
        />
        <section className="section section--cream">
          <div className="section__inner" style={{ maxWidth: 760 }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 40 }}>
              CATEONCOOK · TÉRMINOS Y CONDICIONES · ACTUALIZACIÓN: MAYO 2026
            </div>

            <LegalSection title="1. Aceptación de los términos">
              <p>El acceso y uso de este sitio web implica la aceptación plena de estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos que no utilices el sitio. CateonCook se reserva el derecho de modificar estos términos en cualquier momento, siendo responsabilidad del usuario revisarlos periódicamente.</p>
            </LegalSection>

            <LegalSection title="2. Sobre CateonCook">
              <p>CateonCook es una distribuidora autorizada de productos Royal Prestige en Ecuador. Opera bajo las normas y código de ética de Royal Prestige Internacional y las leyes comerciales vigentes en la República del Ecuador.</p>
            </LegalSection>

            <LegalSection title="3. Uso del sitio web">
              <p>Este sitio tiene carácter informativo y comercial. Queda expresamente prohibido:</p>
              <ul style={{ paddingLeft: 20, marginTop: 10 }}>
                <li style={{ marginBottom: 6 }}>Utilizar el sitio para fines ilegales o no autorizados.</li>
                <li style={{ marginBottom: 6 }}>Reproducir, distribuir o modificar el contenido sin autorización escrita de CateonCook.</li>
                <li style={{ marginBottom: 6 }}>Intentar acceder de forma no autorizada a sistemas, datos o áreas restringidas del sitio.</li>
                <li style={{ marginBottom: 6 }}>Enviar comunicaciones no solicitadas (spam) a través de los formularios del sitio.</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Productos y precios">
              <p>La información sobre productos, características y precios publicada en este sitio es de carácter orientativo y puede estar sujeta a cambios sin previo aviso. Los precios finales de venta se confirman con el asesor o sponsor asignado. CateonCook no se responsabiliza de errores tipográficos en precios o descripciones de productos.</p>
            </LegalSection>

            <LegalSection title="5. Relación comercial con socios">
              <p>La relación entre CateonCook y sus socios (emprendedores y distribuidores) se rige por un contrato de distribución independiente firmado por ambas partes. Los socios son contratistas independientes y no empleados de CateonCook ni de Royal Prestige. Las comisiones, bonos y rangos descritos en el sitio web son referenciales; los términos exactos constan en el contrato y en el plan de mercadeo oficial.</p>
            </LegalSection>

            <LegalSection title="6. Formulario de contacto">
              <p>Al enviar el formulario de contacto, el usuario consiente que un sponsor de CateonCook se comunique con él por teléfono, WhatsApp o correo electrónico para responder a su solicitud. Este contacto no implica ningún compromiso de compra o adhesión al negocio. El usuario puede solicitar en cualquier momento que se deje de contactarle.</p>
            </LegalSection>

            <LegalSection title="7. Garantía de productos">
              <p>Los productos Royal Prestige cuentan con garantía vitalicia contra defectos de fabricación, sujeta a condiciones de uso normal. El proceso de garantía se gestiona a través del distribuidor asignado. Esta garantía no cubre daños por uso inadecuado, accidentes o modificaciones no autorizadas.</p>
            </LegalSection>

            <LegalSection title="8. Devoluciones">
              <p>Los socios que deseen devolver producto no vendido dentro de los primeros 6 meses de suscripción recibirán el 90% del valor de compra en crédito o reembolso, conforme a la política de recompra de CateonCook. El cliente final puede solicitar la devolución dentro de los primeros 30 días, en condiciones normales de uso.</p>
            </LegalSection>

            <LegalSection title="9. Propiedad intelectual">
              <p>Todo el contenido de este sitio (textos, imágenes, logotipos, diseño) es propiedad de CateonCook o de Royal Prestige Internacional, y está protegido por las leyes de propiedad intelectual aplicables. El logotipo de Royal Prestige es marca registrada de su titular. Queda prohibida su reproducción sin autorización escrita.</p>
            </LegalSection>

            <LegalSection title="10. Limitación de responsabilidad">
              <p>CateonCook no garantiza la disponibilidad continua del sitio ni que esté libre de errores. En la máxima medida permitida por la ley, CateonCook no será responsable de daños directos, indirectos o consecuentes derivados del uso o imposibilidad de uso del sitio.</p>
            </LegalSection>

            <LegalSection title="11. Ley aplicable y jurisdicción">
              <p>Estos términos se rigen por las leyes de la República del Ecuador. Para cualquier controversia derivada de su interpretación o aplicación, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Quito, Ecuador, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
            </LegalSection>

            <LegalSection title="12. Contacto">
              <p>Para cualquier consulta sobre estos términos:<br />
              <strong>CateonCook</strong> · <a href="mailto:hola@cateoncook.com" style={{ color: "#0a0a0e" }}>hola@cateoncook.com</a><br />
              Quito · Guayaquil · Cuenca · Ecuador</p>
            </LegalSection>

            <div style={{ marginTop: 48, padding: "20px 24px", background: "rgba(0,0,0,0.04)", borderLeft: "3px solid #E6C77A", fontSize: 12, color: "rgba(0,0,0,0.45)", lineHeight: 1.7 }}>
              Fecha de última actualización: mayo de 2026. Versión 1.0.
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <WhatsAppFab />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
