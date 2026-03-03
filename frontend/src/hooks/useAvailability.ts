import { useEffect, useState } from 'react'
import { AvailabilityDay } from '../types/Availability'
import { getAvailabilitySettings } from '../services/availabilityServices'

export function useAvailability() {
  const [availability, setAvailability] = useState<AvailabilityDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAvailabilitySettings()
      .then((response) => {
        setAvailability(response)
        setError('')
      })
      .catch(() => {
        setError('Could not load availability.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { availability, isLoading, error, setAvailability }
}
