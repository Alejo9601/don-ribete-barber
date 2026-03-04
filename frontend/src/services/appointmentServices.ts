import { Appointment } from '../types/Appointment'
import { BookedSlot } from '../types/BookedSlot'
import { getApiUrl } from '../utils/api'

export async function getAppointments() {
  const options: RequestInit = {
    mode: 'cors',
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  }
  return fetch(getApiUrl('/api/appointments'), options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Error fetching appointments:', error)
      throw error
    })
}

export async function updateAppointmentStatus(id: number, status: string) {
  const options: RequestInit = {
    mode: 'cors',
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ status })
  }

  return fetch(getApiUrl(`/api/appointments/${id}/status`), options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update appointment status')
      }

      return response.json() as Promise<Appointment>
    })
}

export async function deleteAppointment(id: number) {
  const options: RequestInit = {
    mode: 'cors',
    method: 'DELETE',
    credentials: 'include'
  }

  return fetch(getApiUrl(`/api/appointments/${id}`), options).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to delete appointment')
    }
  })
}

export async function getOccupiedAppointmentSlots() {
  const options: RequestInit = {
    mode: 'cors',
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }

  return fetch(getApiUrl('/api/appointments/occupied'), options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch occupied appointment slots')
      }

      return response.json() as Promise<BookedSlot[]>
    })
    .catch((error) => {
      console.error('Error fetching occupied appointment slots:', error)
      throw error
    })
}

export async function setAppointment(appointment: Appointment) {
  const options: RequestInit = {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  }

  return fetch(getApiUrl('/api/appointments'), options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed creating appointment')
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Failed creating appointment')
      throw error
    })
}
