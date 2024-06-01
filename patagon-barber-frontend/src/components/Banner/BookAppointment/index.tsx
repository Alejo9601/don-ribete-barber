import Button from '../../Button'
import HeadingText from '../HeadingText'
import ReservationModal from '../../ReservationModal'
import { useState } from 'react'

export default function BookAppointment() {
  const [showModal, setShowModal] = useState(false)

  function handleOnClick() {
    setShowModal(!showModal)
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
