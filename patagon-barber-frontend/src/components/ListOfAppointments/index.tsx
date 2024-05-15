import { useEffect, useState } from 'react'
import { getAppointments } from '../../services/appointmentServices'
import { Appointment } from '../../types/Appointment'

const ListOfAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>()

  useEffect(() => {
    getAppointments().then((response) => {
      setAppointments(response)
    })
  }, [])

  return (
    <div className="w-3/4 overflow-y-auto flex flex-col gap-10 py-10 px-20">
      {appointments === undefined
        ? null
        : appointments.map((appointment, index: number) => {
            return (
              <div
                key={index}
                className="flex w-full items-center justify-between border-b-2 border-b-cyan-700 pb-2"
              >
                <div className="flex gap-5">
                  <span>{appointment.date}</span>
                  <span>{appointment.time}</span>
                  <span>{appointment.client?.name}</span>
                  <span>{appointment.client?.lastname}</span>
                  <span>{appointment.client?.email}</span>
                  <span>{appointment.client?.phone_number}</span>
                </div>
                <button className="bg-blue-950 text-white py-2 px-5 font-bold">
                  Confirm
                </button>
              </div>
            )
          })}
    </div>
  )
}

export default ListOfAppointments
