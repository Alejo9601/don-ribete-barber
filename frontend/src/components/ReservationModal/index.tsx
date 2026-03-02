import { useContext, useEffect, useState } from 'react'
import ReservationForm from './ReservationForm'
import { ReservationContext } from '../../context/reservationContext'
import { setAppointment } from '../../services/appointmentServices'
import { ReservationStatusModal } from '../ReservationStatusModal'
import { ModalWrapper } from '../ModalWrapper'
import { Loader } from '../Loader/Loader'

enum reservationStates {
  'STORING',
  'FINISHED',
  'COMPLETING',
  'ERROR'
}

export default function ReservationModal({
  closeModal
}: {
  closeModal: () => void
}) {
  const [showForm, setShowForm] = useState(true)
  const [status, setStatus] = useState<reservationStates | null>(
    reservationStates.COMPLETING
  )
  const reservation = useContext(ReservationContext)

  useEffect(() => {
    if (reservation?.appointment === undefined) return

    if (status === reservationStates.STORING) {
      setAppointment(reservation.appointment)
        .then(() => {
          setStatus(reservationStates.FINISHED)
          setTimeout(() => closeModal(), 1000)
        })
        .catch(() => {
          setStatus(reservationStates.ERROR)
          setShowForm(true)
        })
    }
  }, [closeModal, reservation, status])

  function onReservationFormSubmit() {
    setStatus(reservationStates.STORING)
    setShowForm(false)
  }

  return (
    <ModalWrapper>
      {showForm ? (
        <ReservationForm
          onReservationSubmit={onReservationFormSubmit}
          closeModal={closeModal}
        ></ReservationForm>
      ) : null}
      {status === reservationStates.FINISHED ? (
        <ReservationStatusModal></ReservationStatusModal>
      ) : status === reservationStates.STORING ? (
        <Loader />
      ) : status === reservationStates.ERROR ? (
        <div className="rounded-sm bg-white px-5 py-4 text-red-600">
          No se pudo guardar la reserva. Intente nuevamente.
        </div>
      ) : null}
    </ModalWrapper>
  )
}
