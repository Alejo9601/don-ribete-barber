import { AppointmentDB } from '../models/appointments'
import { Appointment } from '../types/Appointment'
import { createClient } from './clientServices'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeAppointment(appointmentData: any) {
  const appointment: Appointment = {
    id: appointmentData.id,
    client: undefined,
    date: appointmentData.date,
    time: appointmentData.time,
    service: { id: 1, name: 'cut', price: '10', appointment: undefined }
  }
  return appointment
}

export async function getAllAppointments() {
  const appDB = new AppointmentDB()
  try {
    const result = await appDB.getAll()
    return result.rows
  } catch (error) {
    console.log(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setAppointment(appointmentData: any) {
  const clientToSave = appointmentData.client
  const savedClientId = await createClient(clientToSave)
  const appointment: Appointment = normalizeAppointment(appointmentData)
  const appDB = new AppointmentDB()

  try {
    if (savedClientId === undefined)
      throw new Error('Something gone wrong saving appointment')

    const result = await appDB.save(appointment, savedClientId)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
