import { Appointment } from '../types/Appointment'
import { client } from './db_client'

export class AppointmentDB {
  save(ap: Appointment, clientId: number) {
    return client.execute({
      sql: 'INSERT INTO appointments (client_id,date,time,status) VALUES(?,?,?,?) RETURNING date, time',
      args: [clientId, ap.date, ap.time, ap.status]
    })
  }

  getAll() {
    return client.execute({
      sql: 'SELECT appointments.id,date,time,status,clients.id AS client_id,name,lastname,email,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC, time ASC',
      args: []
    })
  }

  getOccupiedSlots() {
    return client.execute({
      sql: "SELECT date, time FROM appointments WHERE status != 'CANCELLED' ORDER BY date ASC, time ASC",
      args: []
    })
  }

  updateStatus(id: number, status: string) {
    return client.execute({
      sql: 'UPDATE appointments SET status = ? WHERE id = ? RETURNING id, date, time, status',
      args: [status, id]
    })
  }

  remove(id: number) {
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
