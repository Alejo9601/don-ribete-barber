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
  'COMPLETING'
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
      setAppointment(reservation.appointment).then(() => {
        setStatus(reservationStates.FINISHED)
        setTimeout(() => closeModal(), 1000) // This could be removed and let user to handle close
      })
    }
  }, [status])

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
      ) : null}
    </ModalWrapper>
  )
}
