import { Appointment } from '../types/Appointment'
import { client } from './db_client'

export class AppointmentDB {
  save(ap: Appointment, clientId: number) {
    return client.execute({
      sql: 'INSERT INTO appointments (client_id,date,time) VALUES(?,?,?) RETURNING date, time',
      args: [clientId, ap.date, ap.time]
    })
  }

  getAll() {
    return client.execute({
      sql: 'SELECT appointments.id,date,time,name,lastname,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC',
      args: []
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
