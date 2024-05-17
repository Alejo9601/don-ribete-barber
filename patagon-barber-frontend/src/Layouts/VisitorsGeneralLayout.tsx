import { ReactNode } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function VisitorsGeneralLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="bg-black">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
