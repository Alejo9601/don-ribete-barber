import { useEffect } from 'react'
import BusinessServices from '../components/BusinessServices'
import VisitorsHomeLayout from '../Layouts/VisitorsHomeLayout'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { PreFooter } from '../components/PreFooter'
import { EmbeddedMap } from '../components/EmbeddedMap'

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
    <VisitorsHomeLayout>
      <main className="flex flex-col gap-20 py-20 bg-black ">
        <h1 className="text-center text-5xl text-white font-extrabold">
          ¿Que servicios ofrecemos?
        </h1>
        <BusinessServices></BusinessServices>
        <PreFooter></PreFooter>
        <EmbeddedMap />
      </main>
    </VisitorsHomeLayout>
  )
}

export default Home
