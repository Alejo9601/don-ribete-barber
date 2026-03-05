import { useEffect, useState } from 'react'
import Button from '../Button'
import ReservationModal from '../ReservationModal'
import BackgroundDotsSVG from '../SVGIcons/BackgroundDotsSVG'
import preventAppScroll from '../../utils/preventAppScroll'
import { ReservationContextProvider } from '../../context/reservationContext'

export function PreFooter() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    showModal ? preventAppScroll(true) : preventAppScroll(false)
  }, [showModal])

  function handleOnClick() {
    setShowModal(true)
  }

  function closeReservationModal() {
    setShowModal(false)
  }

  return (
    <ReservationContextProvider>
      <section className="relative my-20 overflow-hidden">
        <div className="relative flex w-full overflow-hidden border-y border-white/10 bg-gradient-to-br from-slate-600 via-slate-700 to-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]"></div>
          <div className="relative z-[2] flex w-full flex-col items-center justify-center gap-4 px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-16 lg:py-24">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-200 sm:text-sm">
              Reserva online
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Reserva tu turno ahora
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-100/90 sm:text-base md:text-lg md:leading-7">
              Agenda en pocos pasos y elige el horario que mejor te quede.
            </p>
            <Button onClick={handleOnClick} additionalProps="z-[2] mt-3 w-full sm:w-auto sm:text-base">
              Reservar
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-full items-center overflow-hidden lg:flex">
            <BackgroundDotsSVG />
          </div>
        </div>

        {showModal ? (
          <ReservationModal closeModal={closeReservationModal}></ReservationModal>
        ) : null}
      </section>
    </ReservationContextProvider>
  )
}
