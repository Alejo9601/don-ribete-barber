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
    <div className="bg-black">
      <section className="h-screen flex flex-col">
        <Header />
        <Banner />
      </section>
      {children}
      <Footer />
    </div>
  )
}
