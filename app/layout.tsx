import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import LenisProvider from '@/components/lenis-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CateonCook — Fábrica de Sueños',
  description: 'Territorio CateonCook. Distribuidor Autorizado Royal Prestige en Ecuador. Únete a nuestra fábrica de sueños.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
