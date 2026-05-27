import type { Metadata } from 'next'
import UneteContent from './_content'

export const metadata: Metadata = {
  title: 'Únete · CateonCook — Fábrica de Sueños',
  description: 'Empieza con una conversación de 30 minutos. Sin compromiso inicial. Un sponsor real te acompaña desde el primer día para construir tu negocio con CateonCook.',
}

export default function UnetePage() {
  return <UneteContent />
}
