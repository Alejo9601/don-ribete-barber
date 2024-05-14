import { useState } from 'react'
import Button from '../../Button'
import ReservationModal from '../../ReservationModal'
import { setAppointment } from '../../../services/appointmentServices'
import { Appointment } from '../../../types/Appointment'
import { ReservationStatusModal } from '../../ReservationStatusModal'

enum reservationStates {
  'STORING',
  'FINISHED'
}

export default function BookAppointment() {
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<reservationStates | null>(null)

  function handleOnClick() {
    setShowModal(!showModal)
  }

  function onReservationFormSubmit(appointment: Appointment) {
    setStatus(reservationStates.STORING)
    setAppointment(appointment).then(() => {
      setStatus(reservationStates.FINISHED)
      setTimeout(() => setStatus(null), 1000) // This could be removed and let user to handle close
    })
  }

  function closeReservationModal() {
    setShowModal(false)
  }

  return (
    <div className="absolute z-[1] lg:relative w-1/2">
      <h1 className="text-white text-5xl lg:text-7xl font-extrabold">
        Reserva tu cita online
      </h1>
      <p className="text-gray-300 text-sm lg:text-xl mt-8">
        ¡Agenda tu cita ahora con nuestro sistema de reservas en linea!
      </p>
      <Button onClick={handleOnClick}>Agendar cita</Button>
      {showModal ? (
        <ReservationModal
          onReservationSubmit={onReservationFormSubmit}
          closeModal={closeReservationModal}
        ></ReservationModal>
      ) : null}
      {status === reservationStates.FINISHED ? (
        <ReservationStatusModal></ReservationStatusModal>
      ) : null}
    </div>
  )
}
