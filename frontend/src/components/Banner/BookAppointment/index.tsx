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
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button additionalProps="mt-0 w-full sm:w-auto" onClick={handleOnClick}>
          Agendar cita
        </Button>
        <span className="text-xs uppercase tracking-[0.28em] text-stone-500 sm:text-sm">
          DON RIBETE
        </span>
      </div>

      {showModal ? (
        <ReservationModal closeModal={closeReservationModal}></ReservationModal>
      ) : null}
    </div>
  )
}
