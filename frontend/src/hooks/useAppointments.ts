import { useEffect, useState } from 'react'
import { Appointment } from '../types/Appointment'
import { getAppointments } from '../services/appointmentServices'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>()

  useEffect(() => {
    getAppointments().then((response) => {
      setAppointments(response)
    })
  }, [])

  return appointments
}
