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
          if (!entry.isIntersecting) {
            return
          }

          const target = entry.target as HTMLElement
          const delay = Number(target.dataset.index ?? '0') * 90

          window.setTimeout(() => {
            target.classList.remove('opacity-0', 'translate-y-10', 'blur-[6px]')
            target.classList.add('opacity-100', 'translate-y-0', 'blur-0')
          }, delay)

          currentObserver.unobserve(target)
        })
      },
      {
        threshold: 0.18
      }
    )

    const elementsToObserve = document.querySelectorAll('.service')
    elementsToObserve.forEach((entry, index) => {
      ;(entry as HTMLElement).dataset.index = String(index)
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
      <main className="bg-stone-950 py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:px-10">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
            Servicios
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold text-white md:text-5xl">
            Lo esencial, bien hecho.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-stone-400">
            Un menu corto, claro y pensado para reservar rapido.
          </p>
        </div>
        <BusinessServices></BusinessServices>
        <PreFooter></PreFooter>
        <EmbeddedMap />
      </main>
    </VisitorsHomeLayout>
  )
}

export default Home
