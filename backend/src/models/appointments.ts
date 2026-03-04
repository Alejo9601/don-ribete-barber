import { Appointment } from '../types/Appointment'
import { client } from './db_client'

const shouldAutoSchema = process.env.DB_AUTO_SCHEMA === 'true'

export class AppointmentDB {
  async ensureSchema() {
    const columns = await client.execute({
      sql: 'PRAGMA table_info(appointments)',
      args: []
    })

    const hasServiceName = columns.rows.some(
      (column) => String(column.name) === 'service_name'
    )

    if (!hasServiceName) {
      await client.execute(`
        ALTER TABLE appointments
        ADD COLUMN service_name TEXT NOT NULL DEFAULT ''
      `)
    }
  }

  async save(ap: Appointment, clientId: number) {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

    return client.execute({
      sql: 'INSERT INTO appointments (client_id,date,time,status,service_name) VALUES(?,?,?,?,?) RETURNING id, date, time, status, service_name',
      args: [clientId, ap.date, ap.time, ap.status, ap.service_name]
    })
  }

  async getAll() {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

    return client.execute({
      sql: 'SELECT appointments.id,date,time,status,service_name,clients.id AS client_id,name,lastname,email,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id ORDER BY date ASC, time ASC',
      args: []
    })
  }

  async getOccupiedSlots() {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

    return client.execute({
      sql: "SELECT date, time FROM appointments WHERE status != 'CANCELLED' ORDER BY date ASC, time ASC",
      args: []
    })
  }

  async getById(id: number) {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

    return client.execute({
      sql: 'SELECT appointments.id,date,time,status,service_name,clients.id AS client_id,name,lastname,email,phone_number FROM appointments JOIN clients ON appointments.client_id = clients.id WHERE appointments.id = ?',
      args: [id]
    })
  }

  async updateStatus(id: number, status: string) {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

    return client.execute({
      sql: 'UPDATE appointments SET status = ? WHERE id = ? RETURNING id',
      args: [status, id]
    })
  }

  async remove(id: number) {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

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
