import type { Metadata } from 'next'
import ProductoContent from './_content'

export const metadata: Metadata = {
  title: 'Producto · CateonCook — Royal Prestige Ecuador',
  description: 'Conoce la línea completa Royal Prestige: ollas 9-ply T304, garantía vitalicia, cocción sin agua ni grasa. El estándar que no se negocia, ahora en Ecuador.',
}

export default function ProductoPage() {
  return <ProductoContent />
}
