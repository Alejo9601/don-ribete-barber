import { useContext, useState } from 'react'
import Button from '../../Button'
import ReservationModal from '../../ReservationModal'
import { setAppointment } from '../../../services/appointmentServices'
import { ReservationStatusModal } from '../../ReservationStatusModal'
import { ReservationContext } from '../../../context/reservationContext'
import { Loader } from '../../Loader/Loader'

enum reservationStates {
  'STORING',
  'FINISHED'
}

export default function BookAppointment() {
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<reservationStates | null>(null)
  const reservation = useContext(ReservationContext)

  function handleOnClick() {
    setShowModal(!showModal)
  }

  function onReservationFormSubmit() {
    if (reservation?.appointment === undefined) return

    setStatus(reservationStates.STORING)
    setAppointment(reservation.appointment).then(() => {
      setStatus(reservationStates.FINISHED)
      setTimeout(() => setStatus(null), 1000) // This could be removed and let user to handle close
    })
  }

  function closeReservationModal() {
    setShowModal(false)
  }

  return (
    <div className="z-[1] w-full lg:w-1/2">
      <h1 className="text-white text-5xl md:text-7xl font-extrabold">
        Reserva tu cita online
      </h1>
      <p className="text-gray-300 text-sm md:text-xl mt-8">
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
      ) : status === null ? null : (
        <Loader />
      )}
    </div>
  )
}
