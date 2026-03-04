import { AppointmentDB } from '../models/appointments'
import { Appointment } from '../types/Appointment'
import { createClient } from './clientServices'

interface AppointmentRecord {
  id?: number
  date: string
  time: string
  client_id?: number
  name?: string
  lastname?: string
  email?: string
  phone_number?: string
  client?: Appointment['client']
  status?: string
}

const allowedStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

function normalizeAppointment(appointmentData: AppointmentRecord) {
  const appointment: Appointment = {
    id: appointmentData.id,
    date: appointmentData.date,
    time: appointmentData.time,
    client: {
      id: appointmentData.client_id || undefined,
      name: appointmentData.name ?? '',
      lastname: appointmentData.lastname ?? '',
      email: appointmentData.email ?? '',
      phone_number: appointmentData.phone_number ?? ''
    },
    status: appointmentData.status ?? 'PENDING'
  }
  return appointment
}

export async function getAllAppointments() {
  const appDB = new AppointmentDB()
  const result = await appDB.getAll()

  return result.rows.map((appointment) =>
    normalizeAppointment(appointment as unknown as AppointmentRecord)
  )
}

export async function getOccupiedAppointmentSlots() {
  const appDB = new AppointmentDB()
  const result = await appDB.getOccupiedSlots()

  return result.rows.map((appointment) => {
    const row = appointment as unknown as AppointmentRecord

    return {
      date: row.date,
      time: row.time
    }
  })
}

export async function setAppointment(appointmentData: AppointmentRecord) {
  const clientToSave = appointmentData.client
  const savedClientId = await createClient(clientToSave)
  const appointment: Appointment = normalizeAppointment(appointmentData)
  const appDB = new AppointmentDB()

  if (savedClientId === undefined) {
    throw new Error('Something went wrong saving the appointment client')
  }

  const result = await appDB.save(appointment, savedClientId)
  return result.rows[0]
}

export async function updateAppointmentStatus(id: number, status: string) {
  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid appointment status')
  }

  const appDB = new AppointmentDB()
  const result = await appDB.updateStatus(id, status)
  const row = result.rows[0]

  if (!row) {
    return null
  }

  return normalizeAppointment(row as unknown as AppointmentRecord)
}

export async function deleteAppointment(id: number) {
  const appDB = new AppointmentDB()
  const result = await appDB.remove(id)

  return result.rows[0] ?? null
}
