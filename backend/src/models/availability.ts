import { client } from './db_client'
import { AvailabilityDay } from '../types/Availability'

const defaultHours = ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

const defaultAvailability: AvailabilityDay[] = Array.from({ length: 7 }, (_, dayOfWeek) => ({
  dayOfWeek,
  enabled: dayOfWeek !== 0,
  hours: dayOfWeek === 0 ? [] : defaultHours
}))

export class AvailabilityDB {
  async ensureSchema() {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS availability_settings (
        day_of_week INTEGER PRIMARY KEY,
        enabled INTEGER NOT NULL DEFAULT 1,
        hours_json TEXT NOT NULL
      )
    `)

    for (const day of defaultAvailability) {
      await client.execute({
        sql: 'INSERT OR IGNORE INTO availability_settings (day_of_week, enabled, hours_json) VALUES (?, ?, ?)',
        args: [day.dayOfWeek, day.enabled ? 1 : 0, JSON.stringify(day.hours)]
      })
    }
  }

  async getAll() {
    await this.ensureSchema()
    return client.execute({
      sql: 'SELECT day_of_week, enabled, hours_json FROM availability_settings ORDER BY day_of_week ASC',
      args: []
    })
  }

  async saveAll(days: AvailabilityDay[]) {
    await this.ensureSchema()

    for (const day of days) {
      await client.execute({
        sql: `
          INSERT INTO availability_settings (day_of_week, enabled, hours_json)
          VALUES (?, ?, ?)
          ON CONFLICT(day_of_week) DO UPDATE SET
            enabled = excluded.enabled,
            hours_json = excluded.hours_json
        `,
        args: [day.dayOfWeek, day.enabled ? 1 : 0, JSON.stringify(day.hours)]
      })
    }
  }
}
