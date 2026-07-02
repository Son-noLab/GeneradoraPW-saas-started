import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">

          {/* Marca */}
          <div className="footer__brand">
            <div className="footer__logo">
              <Image
                src="/img/brand/logo-stacked-natural.png"
                alt="CateonCook"
                width={896}
                height={1092}
                style={{ width: '110px', height: 'auto' }}
              />
            </div>
            <p className="footer__tagline">
              Territorio CateonCook Cía. Ltda.<br />
              Fábrica de Sueños — Distribuidor Autorizado Royal Prestige en Ecuador.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Oportunidad</p>
            <ul className="footer__links">
              <li><a href="#oportunidad"  className="footer__link">La Oportunidad</a></li>
              <li><a href="#oportunidad"  className="footer__link">Nivel Premium</a></li>
              <li><a href="#oportunidad"  className="footer__link">Nivel Master</a></li>
              <li><a href="#como-unirme" className="footer__link">¿Cómo unirme?</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Producto</p>
            <ul className="footer__links">
              <li><a href="/producto"         className="footer__link">Catálogo completo</a></li>
              <li><a href="/producto#cocina"  className="footer__link">Nutre tu Cocina</a></li>
              <li><a href="/producto#agua"    className="footer__link">Nutre tu Agua</a></li>
              <li><a href="/producto#aire"    className="footer__link">Nutre tu Aire</a></li>
              <li><a href="/unirse"           className="footer__link">Únete al Territorio</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Territorio</p>
            <ul className="footer__links">
              <li><a href="#nosotros" className="footer__link">Nosotros</a></li>
              <li><a href="#nosotros" className="footer__link">Misión y Visión</a></li>
              <li><a href="#nosotros" className="footer__link">Nuestros valores</a></li>
              <li><a href="#"         className="footer__link">Contacto</a></li>
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Contacto</p>
            <ul className="footer__links">
              <li><a href="mailto:administracion@cateoncook.com" className="footer__link">administracion@cateoncook.com</a></li>
              <li><a href="#"  className="footer__link">Formulario de contacto</a></li>
              <li><a href="#"  className="footer__link">Política de privacidad</a></li>
            </ul>
          </div>

        </div>

        <div className="footer__bottom">
          <p>© 2026 CateonCook Cía. Ltda. Todos los derechos reservados.</p>
          <div className="footer__legal-links">
            <a href="#" className="footer__legal-link">Privacidad</a>
            <a href="#" className="footer__legal-link">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
