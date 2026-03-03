import { ReactNode } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Banner } from '../components/Banner'

export default function VisitorsHomeLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <section className="flex min-h-[85vh] flex-col border-b border-white/10">
        <Header />
        <Banner />
      </section>
      {children}
      <Footer />
    </div>
  )
}
