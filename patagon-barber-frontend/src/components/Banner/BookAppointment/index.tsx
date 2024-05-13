import { useState } from 'react'
import Button from '../../Button'
import ReservationModal from '../../ReservationModal'
import dayjs from 'dayjs'
import { setAppointment } from '../../../services/appointmentServices'
import { Appointment } from '../../../types/Appointment'

export default function BookAppointment() {
  const [showModal, setShowModal] = useState(false)

  function handleOnClick() {
    setShowModal(!showModal)
  }

  function handleAccept(date) {
    const dateToStore = dayjs(date).format('YYYY-MM-DD HH:00')

    const appointment: Appointment = {
      id: undefined,
      date: dateToStore.split(' ')[0],
      time: dateToStore.split(' ')[1],
      client: {
        id: undefined,
        name: 'luis',
        lastname: 'alejandro',
        email: 'alejandro96jm@gmail.com',
        phone_number: '2902484800'
      },
      service: undefined
    }

    setAppointment(appointment).then((res) => console.log(res))
  }

  function handleCancel() {
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
          handleAccept={handleAccept}
          handleCancel={handleCancel}
        ></ReservationModal>
      ) : null}
    </div>
  )
}
