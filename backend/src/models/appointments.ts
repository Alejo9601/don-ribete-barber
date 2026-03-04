import { Appointment } from '../types/Appointment'
import { client } from './db_client'

export class AppointmentDB {
  async save(ap: Appointment, clientId: number) {
    return client.execute({
      sql: 'INSERT INTO appointments (client_id,date,time,status,service_name) VALUES(?,?,?,?,?) RETURNING id, date, time, status, service_name',
      args: [clientId, ap.date, ap.time, ap.status, ap.service_name]
    })
  }

  async getAll() {
    return client.execute({
      sql: 'SELECT appointments.id,date,time,status,service_name,clients.id AS client_id,name,lastname,email,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC, time ASC',
      args: []
    })
  }

  async getOccupiedSlots() {
    return client.execute({
      sql: "SELECT date, time FROM appointments WHERE status != 'CANCELLED' ORDER BY date ASC, time ASC",
      args: []
    })
  }

  async getById(id: number) {
    return client.execute({
      sql: 'SELECT appointments.id,date,time,status,service_name,clients.id AS client_id,name,lastname,email,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id WHERE appointments.id = ?',
      args: [id]
    })
  }

  async updateStatus(id: number, status: string) {
    return client.execute({
      sql: 'UPDATE appointments SET status = ? WHERE id = ? RETURNING id',
      args: [status, id]
    })
  }

  async remove(id: number) {
    return client.execute({
      sql: 'DELETE FROM appointments WHERE id = ? RETURNING id',
      args: [id]
    })
  }
}
// export function createAppointment(ap: Appointment, clientId: number) {
//   return client.execute({
//     sql: 'INSERT INTO appointments (client_id,date,time) VALUES(?,?,?)',
//     args: [clientId, ap.date, ap.time]
//   })
// }

// export function getAppointments() {
//   return client.execute({
//     sql: 'SELECT appointments.id,date,time,name,lastname,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC',
//     args: []
//   })
// }
