import type { ReactNode } from 'react'
import Shell from '@/components/marketing/shell'
import Header from '@/components/marketing/header'
import Footer from '@/components/marketing/footer'
import WhatsAppFab from '@/components/marketing/whatsapp'
import './marketing.css'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <Shell>
      <Header />
      {children}
      <Footer />
      <WhatsAppFab />
    </Shell>
  )
}
