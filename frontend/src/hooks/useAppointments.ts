import { useEffect, useState } from 'react'
import { Appointment } from '../types/Appointment'
import { getAppointments } from '../services/appointmentServices'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  function loadAppointments() {
    setIsLoading(true)

    return getAppointments()
      .then((response) => {
        setAppointments(response)
        setError('')
      })
      .catch(() => {
        setError('No se pudieron cargar los turnos.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  return {
    appointments,
    setAppointments,
    isLoading,
    error,
    refreshAppointments: loadAppointments
  }
}
