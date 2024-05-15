import { useEffect } from 'react'
import { Banner } from '../components/Banner'
import BusinessServices from '../components/BusinessServices'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { PreFooter } from '../components/PreFooter'

const Home = () => {
  const observer = useIntersectionObserver()

  useEffect(() => {
    const elementsToObserve = document.querySelectorAll('.service')
    elementsToObserve.forEach((entry) => {
      observer.observe(entry)
    })
    return () => {
      elementsToObserve.forEach((entry) => {
        observer.unobserve(entry)
      })
    }
  }, [])

  return (
    <>
      <section className="h-screen flex flex-col bg-black">
        <Header></Header>
        <Banner></Banner>
      </section>
      <main className="flex flex-col gap-20 py-20 bg-black overflow-x-hidden">
        <h1 className="text-center text-5xl text-white font-extrabold">
          ¿Que servicios ofrecemos?
        </h1>
        <BusinessServices></BusinessServices>
        <PreFooter></PreFooter>
      </main>
      <Footer></Footer>
    </>
  )
}

export default Home
