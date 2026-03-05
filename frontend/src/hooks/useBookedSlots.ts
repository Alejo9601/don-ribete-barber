import { useEffect, useState } from 'react'
import { BookedSlot } from '../types/BookedSlot'
import { getOccupiedAppointmentSlots } from '../services/appointmentServices'

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getOccupiedAppointmentSlots()
      .then((response) => {
        setBookedSlots(response)
        setError('')
      })
      .catch(() => {
        setError('No se pudieron cargar los horarios ocupados.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { bookedSlots, isLoading, error }
}
