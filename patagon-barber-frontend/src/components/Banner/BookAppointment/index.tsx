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
    <div className="z-[1] w-full lg:w-1/2">
      <HeadingText />
      <Button onClick={handleOnClick}>Agendar cita</Button>

      {showModal ? (
        <ReservationModal closeModal={closeReservationModal}></ReservationModal>
      ) : null}
    </div>
  )
}
