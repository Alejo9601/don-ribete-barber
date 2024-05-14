import { Appointment } from '../types/Appointment'

export async function getAppointments() {
  const options: RequestInit = {
    mode: 'cors',
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }
  return fetch('http://localhost:3000/api/appointments', options)
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

export async function setAppointment(appointment: Appointment) {
  const options: RequestInit = {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  }

  return fetch('http://localhost:3000/api/appointments', options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed creating appointment')
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Failed creating appointment')
      return error
    })
}
