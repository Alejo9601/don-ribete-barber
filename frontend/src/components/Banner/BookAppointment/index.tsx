import Button from '../../Button'
import HeadingText from '../HeadingText'
import ReservationModal from '../../ReservationModal'
import { useEffect, useState } from 'react'
import preventAppScroll from '../../../utils/preventAppScroll'

export default function BookAppointment() {
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
    <div className="z-[1] w-full max-w-[28rem]">
      <HeadingText />
      <div className="mt-8 flex items-center gap-4">
        <Button additionalProps="mt-0" onClick={handleOnClick}>
          Agendar cita
        </Button>
        <span className="text-sm uppercase tracking-[0.28em] text-stone-500">
          Patagon Barber
        </span>
      </div>

      {showModal ? (
        <ReservationModal closeModal={closeReservationModal}></ReservationModal>
      ) : null}
    </div>
  )
}
