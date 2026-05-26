/* CateonCook — Política de Privacidad */

const { useEffect: privUseEffect } = React;

function LegalSection({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 17, color: "#0a0a0e", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</h2>
      <div style={{ fontSize: 14, color: "rgba(0,0,0,0.65)", lineHeight: 1.85 }}>{children}</div>
    </div>
  );
}

function App() {
  privUseEffect(() => {
    document.documentElement.style.setProperty("--accent", "#E6C77A");
  }, []);

  return (
    <>
      <Header currentPage={null} alwaysSolid />
      <main>
        <PageHero
          variant="dark"
          chapter="Legal"
          current="Privacidad"
          cornerFig="Legal · Privacidad"
          title={<>Política de<br /><em>privacidad.</em></>}
          lede="Cómo recopilamos, usamos y protegemos tu información personal. Última actualización: mayo 2026."
          meta={[]}
        />
        <section className="section section--cream">
          <div className="section__inner" style={{ maxWidth: 760 }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 40 }}>
              CATEONCOOK · POLÍTICA DE PRIVACIDAD · ACTUALIZACIÓN: MAYO 2026
            </div>

            <LegalSection title="1. Responsable del tratamiento">
              <p>El responsable del tratamiento de datos personales es <strong>CateonCook</strong>, distribuidora autorizada de Royal Prestige en Ecuador (en adelante "la Empresa"). Para consultas sobre protección de datos puedes contactarnos en <a href="mailto:hola@cateoncook.com" style={{ color: "#0a0a0e" }}>hola@cateoncook.com</a>.</p>
            </LegalSection>

            <LegalSection title="2. Datos que recopilamos">
              <p>Recopilamos la información que nos proporcionas voluntariamente a través de nuestros formularios de contacto y registro:</p>
              <ul style={{ paddingLeft: 20, marginTop: 10 }}>
                <li style={{ marginBottom: 6 }}>Nombre completo</li>
                <li style={{ marginBottom: 6 }}>Correo electrónico</li>
                <li style={{ marginBottom: 6 }}>Número de teléfono o WhatsApp</li>
                <li style={{ marginBottom: 6 }}>Ciudad de residencia</li>
                <li style={{ marginBottom: 6 }}>Información que nos compartes voluntariamente en el campo de mensaje</li>
              </ul>
              <p style={{ marginTop: 10 }}>También podemos recopilar de forma automática: dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, con fines estadísticos y de mejora del servicio.</p>
            </LegalSection>

            <LegalSection title="3. Finalidad del tratamiento">
              <p>Utilizamos tus datos exclusivamente para:</p>
              <ul style={{ paddingLeft: 20, marginTop: 10 }}>
                <li style={{ marginBottom: 6 }}>Responderte y darte seguimiento a tu solicitud de información o de unirte como socio.</li>
                <li style={{ marginBottom: 6 }}>Asignarte un sponsor que te acompañe en el proceso.</li>
                <li style={{ marginBottom: 6 }}>Enviarte comunicaciones relacionadas con nuestros productos, eventos y capacitaciones, siempre que hayas dado tu consentimiento.</li>
                <li style={{ marginBottom: 6 }}>Cumplir con obligaciones legales y contractuales aplicables.</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Base legal">
              <p>El tratamiento de tus datos se realiza con base en: (i) tu consentimiento expreso al enviar el formulario, (ii) la ejecución de una relación comercial o de distribución contigo, y (iii) el cumplimiento de obligaciones legales, de acuerdo con la Ley Orgánica de Protección de Datos Personales (LOPDP) del Ecuador.</p>
            </LegalSection>

            <LegalSection title="5. Plazo de conservación">
              <p>Conservamos tus datos durante el tiempo necesario para cumplir con las finalidades descritas y durante los plazos de prescripción legal aplicables. Si no existe relación contractual, conservamos los datos de contacto por un máximo de 2 años desde la última interacción.</p>
            </LegalSection>

            <LegalSection title="6. Compartición de datos">
              <p>No vendemos, cedemos ni compartimos tus datos con terceros con fines comerciales. Podemos compartirlos con: (i) sponsors y distribuidores autorizados de CateonCook en Ecuador, únicamente para el seguimiento de tu solicitud; (ii) proveedores de servicios tecnológicos (formularios, correo) que actúan como encargados del tratamiento bajo nuestras instrucciones; (iii) autoridades competentes cuando sea requerido por ley.</p>
            </LegalSection>

            <LegalSection title="7. Tus derechos">
              <p>Como titular de los datos, tienes derecho a: acceder a tus datos, rectificarlos, suprimirlos, oponerte al tratamiento, solicitar la portabilidad y revocar el consentimiento en cualquier momento. Para ejercer cualquiera de estos derechos, escríbenos a <a href="mailto:hola@cateoncook.com" style={{ color: "#0a0a0e" }}>hola@cateoncook.com</a> indicando el derecho que deseas ejercer.</p>
            </LegalSection>

            <LegalSection title="8. Seguridad">
              <p>Implementamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración. Sin embargo, ninguna transmisión de datos por Internet puede garantizarse como totalmente segura.</p>
            </LegalSection>

            <LegalSection title="9. Cookies">
              <p>Este sitio es de carácter estático y no utiliza cookies de seguimiento ni sistemas de analítica de terceros en esta etapa. Si en el futuro se implementan, esta política será actualizada y se solicitará tu consentimiento.</p>
            </LegalSection>

            <LegalSection title="10. Cambios a esta política">
              <p>Nos reservamos el derecho de actualizar esta política. Las modificaciones se publicarán en esta misma página con la fecha de actualización. El uso continuado del sitio tras los cambios implica la aceptación de la política revisada.</p>
            </LegalSection>

            <LegalSection title="11. Contacto">
              <p>Para cualquier consulta sobre esta política o sobre el tratamiento de tus datos:<br />
              <strong>CateonCook</strong> · <a href="mailto:hola@cateoncook.com" style={{ color: "#0a0a0e" }}>hola@cateoncook.com</a><br />
              Quito · Guayaquil · Cuenca · Ecuador</p>
            </LegalSection>

            <div style={{ marginTop: 48, padding: "20px 24px", background: "rgba(0,0,0,0.04)", borderLeft: "3px solid #E6C77A", fontSize: 12, color: "rgba(0,0,0,0.45)", lineHeight: 1.7 }}>
              Esta política se rige por la Ley Orgánica de Protección de Datos Personales (LOPDP) del Ecuador y su reglamento de aplicación. Fecha de última actualización: mayo de 2026.
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
