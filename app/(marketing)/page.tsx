import type { Metadata } from 'next'
import HomeContent from './_home-content'

export const metadata: Metadata = {
  title: 'CateonCook — Fábrica de Sueños · Distribuidor Royal Prestige Ecuador',
  description: 'Únete a más de 500 familias socias. CateonCook es el distribuidor autorizado de Royal Prestige en Ecuador. Construye tu negocio con respaldo real y comunidad sólida.',
}

export default function HomePage() {
  return <HomeContent />
}
