import { AvailabilityDB } from '../models/availability'
import { AvailabilityDay } from '../types/Availability'

interface AvailabilityRow {
  day_of_week: number
  enabled: number
  hours_json: string
}

function normalizeAvailabilityDay(row: AvailabilityRow): AvailabilityDay {
  return {
    dayOfWeek: row.day_of_week,
    enabled: Boolean(row.enabled),
    hours: JSON.parse(row.hours_json)
  }
}

function normalizeAvailabilityInput(days: AvailabilityDay[]) {
  return days
    .map((day) => ({
      dayOfWeek: day.dayOfWeek,
      enabled: Boolean(day.enabled),
      hours: Array.from(new Set(day.hours))
        .filter((hour) => /^\d{2}:\d{2}$/.test(hour))
        .sort()
    }))
    .sort((firstDay, secondDay) => firstDay.dayOfWeek - secondDay.dayOfWeek)
}

export async function getAvailabilitySettings() {
  const availabilityDB = new AvailabilityDB()
  const result = await availabilityDB.getAll()

  return result.rows.map((row) =>
    normalizeAvailabilityDay(row as unknown as AvailabilityRow)
  )
}

export async function updateAvailabilitySettings(days: AvailabilityDay[]) {
  const normalizedDays = normalizeAvailabilityInput(days)
  const availabilityDB = new AvailabilityDB()

  await availabilityDB.saveAll(normalizedDays)

  return getAvailabilitySettings()
}
