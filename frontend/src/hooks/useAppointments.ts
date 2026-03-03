import { useEffect, useState } from 'react'
import { Appointment } from '../types/Appointment'
import { getAppointments } from '../services/appointmentServices'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAppointments()
      .then((response) => {
        setAppointments(response)
        setError('')
      })
      .catch(() => {
        setError('Could not load appointments.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { appointments, isLoading, error }
}
