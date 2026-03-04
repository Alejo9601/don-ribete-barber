import { client } from './db_client'
import { AvailabilityDay } from '../types/Availability'

export class AvailabilityDB {
  async getAll() {
    return client.execute({
      sql: 'SELECT day_of_week, enabled, hours_json FROM availability_settings ORDER BY day_of_week ASC',
      args: []
    })
  }

  async saveAll(days: AvailabilityDay[]) {
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
