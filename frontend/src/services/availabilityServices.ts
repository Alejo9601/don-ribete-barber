import { AvailabilityDay } from '../types/Availability'
import { getApiUrl } from '../utils/api'

export function getAvailabilitySettings() {
  return fetch(getApiUrl('/api/availability'), {
    method: 'GET',
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch availability settings')
    }

    return response.json() as Promise<AvailabilityDay[]>
  })
}

export function updateAvailabilitySettings(days: AvailabilityDay[]) {
  return fetch(getApiUrl('/api/availability'), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(days)
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to update availability settings')
    }

    return response.json() as Promise<AvailabilityDay[]>
  })
}
