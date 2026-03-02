import { ReactNode, createContext, useEffect, useState } from 'react'
import { Client } from '../types/Client'
import { Appointment } from '../types/Appointment'

const initialClientState: Client = {
  id: undefined,
  name: '',
  lastname: '',
  email: '',
  phone_number: ''
}
const initialAppointmentState: Appointment = {
  id: undefined,
  client: undefined,
  date: '',
  time: '',
  service: undefined
}

interface Reservation {
  client: Client
  appointment: Appointment
  updateClient: (client: Client) => void
  updateAppointment: (app: Appointment) => void
}

export const ReservationContext = createContext<Reservation | undefined>(
  undefined
)

export function ReservationContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [clientData, setClientData] = useState<Client>(initialClientState)
  const [appointmentData, setAppointmentData] = useState<Appointment>(
    initialAppointmentState
  )

  const reservationData: Reservation = {
    client: clientData,
    appointment: appointmentData,
    updateClient: (client) => {
      setClientData((prevState) => ({ ...prevState, ...client }))
    },
    updateAppointment: (app) => {
      setAppointmentData((prevState) => ({ ...prevState, ...app }))
    }
  }

  useEffect(() => {
    setAppointmentData((prevState) => ({
      ...prevState,
      client: clientData
    }))
  }, [clientData])

  return (
    <ReservationContext.Provider value={reservationData}>
      {children}
    </ReservationContext.Provider>
  )
}
