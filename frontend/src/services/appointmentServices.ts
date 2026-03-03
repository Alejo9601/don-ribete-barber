import { Appointment } from '../types/Appointment'
import { BookedSlot } from '../types/BookedSlot'
import { getApiUrl } from '../utils/api'

// function normalizeAppointment(appointmentData: any) {
//   const appointment: Appointment = {
//     id: appointmentData.id,
//     client: undefined,
//     date: appointmentData.date,
//     time: appointmentData.time,
//     service: undefined
//   }
//   return appointment
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function normalizeClient(clientData: any) {
//   const client: Client = {
//     id: undefined,
//     name: clientData.name,
//     lastname: clientData.lastname,
//     email: clientData.email,
//     phone_number: clientData.phone_number
//   }
//   return client
// }

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
