import Link from 'next/link'
import { CCLogoMark } from './logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <CCLogoMark size={44} color="#E6C77A" />
            <div className="footer__brand-line">
              Una <em>fábrica de sueños</em><br />
              que nutre comunidades.
            </div>
            <div className="footer__brand-meta">
              CATEON·COOK · DIST. AUTORIZADO ROYAL PRESTIGE · EC
            </div>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Explorar</div>
            <ul>
              <li><Link href="/oportunidad">Oportunidad</Link></li>
              <li><Link href="/producto">Producto</Link></li>
              <li><Link href="/unete">Únete</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Contacto</div>
            <ul>
              <li><a href="tel:+593984909878">+593 98 490 9878</a></li>
              <li><a href="mailto:administracion@cateoncook.com">administracion@cateoncook.com</a></li>
              <li><a href="#">Quito · Guayaquil · Cuenca</a></li>
              <li><a href="#">Lun – Sáb · 09:00 – 19:00</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <div className="footer__col-title">Socios</div>
            <ul>
              <li><Link href="/portal">Portal del socio</Link></li>
              <li><Link href="/portal/pedidos">Pedidos y logística</Link></li>
              <li><Link href="/portal/capacitaciones">Capacitaciones</Link></li>
              <li><Link href="/portal/soporte">Soporte</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div>© {new Date().getFullYear()} CATEONCOOK · DERECHOS RESERVADOS</div>
          <div style={{ display: 'flex', gap: 20, fontSize: 11, letterSpacing: '0.1em', opacity: 0.6 }}>
            <Link href="/privacidad" style={{ color: 'inherit' }}>PRIVACIDAD</Link>
            <Link href="/terminos" style={{ color: 'inherit' }}>TÉRMINOS</Link>
          </div>
          <div className="footer__social" aria-label="Redes sociales">
            <a href="https://www.instagram.com/cateoncook" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.facebook.com/cateoncook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 22v-8h3l1-4h-4V7.5c0-1 .5-2 2-2h2V2h-3c-3 0-4 2-4 4v4H7v4h3v8h3z" />
              </svg>
            </a>
            <span className="footer__social-pending" aria-label="YouTube — próximamente">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16 4 12 4 12 4s-4 0-7.2.1c-.4 0-1.3.1-2 .9C2.2 5.6 2 7 2 7S2 8.6 2 10.3v1.4C2 13.4 2 15 2 15s.2 1.4.8 2c.7.8 1.7.8 2.1.9C7 18 12 18 12 18s4 0 7.2-.1c.4 0 1.3-.1 2-.9.6-.6.8-2 .8-2s0-1.7 0-3.3v-1.4C22 8.6 22 7 22 7zM10 14V8l5 3-5 3z" />
              </svg>
            </span>
            <span className="footer__social-pending" aria-label="TikTok — próximamente">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 3v3.5a4.5 4.5 0 0 0 4.5 4.5V14a7.5 7.5 0 0 1-4.5-1.5V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z" />
              </svg>
            </span>
          </div>
          <div>HECHO CON CUIDADO EN ECUADOR</div>
        </div>
      </div>
    </footer>
  )
}
