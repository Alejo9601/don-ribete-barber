import { useEffect } from 'react'
import BusinessServices from '../components/BusinessServices'
import VisitorsHomeLayout from '../Layouts/VisitorsHomeLayout'
import { PreFooter } from '../components/PreFooter'
import { EmbeddedMap } from '../components/EmbeddedMap'

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0')
            const entryChild = entry.target.firstElementChild

            if (entryChild?.classList.contains('lg:flex-row-reverse')) {
              entry.target.classList.add('animate-slide_right')
            } else {
              entry.target.classList.add('animate-slide_left')
            }

            currentObserver.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
      }
    )

    const elementsToObserve = document.querySelectorAll('.service')
    elementsToObserve.forEach((entry) => {
      observer.observe(entry)
    })
    return () => {
      elementsToObserve.forEach((entry) => {
        observer.unobserve(entry)
      })
      observer.disconnect()
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
