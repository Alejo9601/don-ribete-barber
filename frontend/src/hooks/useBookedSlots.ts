import { useEffect, useState } from 'react'
import { BookedSlot } from '../types/BookedSlot'
import { getOccupiedAppointmentSlots } from '../services/appointmentServices'

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
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
  }, [])

  return { bookedSlots, error }
}
