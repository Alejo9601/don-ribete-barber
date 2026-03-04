import { useEffect, useState } from 'react'
import { AvailabilityDay } from '../../types/Availability'
import { updateAvailabilitySettings } from '../../services/availabilityServices'

const weekdayLabels = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
const supportedHours = ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
const defaultAvailability: AvailabilityDay[] = weekdayLabels.map((_, dayOfWeek) => ({
  dayOfWeek,
  enabled: dayOfWeek !== 0,
  hours: dayOfWeek === 0 ? [] : supportedHours
}))

function normalizeAvailability(days: AvailabilityDay[]) {
  const sourceDays = days.length > 0 ? days : defaultAvailability
  return [...sourceDays].sort((firstDay, secondDay) => firstDay.dayOfWeek - secondDay.dayOfWeek)
}

export function AvailabilityEditor({
  initialAvailability,
  isLoading,
  error = ''
}: {
  initialAvailability: AvailabilityDay[]
  isLoading: boolean
  error?: string
}) {
  const [availability, setAvailability] = useState<AvailabilityDay[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setAvailability(normalizeAvailability(initialAvailability))
  }, [initialAvailability])

  function updateDay(dayOfWeek: number, updater: (day: AvailabilityDay) => AvailabilityDay) {
    setAvailability((currentAvailability) =>
      currentAvailability.map((day) =>
        day.dayOfWeek === dayOfWeek ? updater(day) : day
      )
    )
  }

  function handleToggleDay(dayOfWeek: number) {
    updateDay(dayOfWeek, (day) => ({
      ...day,
      enabled: !day.enabled
    }))
  }

  function handleToggleHour(dayOfWeek: number, hour: string) {
    updateDay(dayOfWeek, (day) => {
      const hasHour = day.hours.includes(hour)
      const hours = hasHour
        ? day.hours.filter((currentHour) => currentHour !== hour)
        : [...day.hours, hour].sort()

      return {
        ...day,
        hours
      }
    })
  }

  async function handleSave() {
    try {
      setIsSaving(true)
      const updatedAvailability = await updateAvailabilitySettings(availability)
      setAvailability(normalizeAvailability(updatedAvailability))
      setFeedback('Disponibilidad actualizada.')
    } catch {
      setFeedback('No se pudo actualizar la disponibilidad.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Availability</h3>
          <p className="text-sm text-zinc-400">
            Define qué dias y horarios se pueden reservar desde la web.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className="h-11 w-full rounded-2xl bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-800/60 sm:w-auto"
        >
          {isSaving ? 'Saving...' : 'Save availability'}
        </button>
      </div>

      {feedback ? (
        <p className="mb-4 text-sm text-zinc-300">{feedback}</p>
      ) : null}
      {error ? (
        <p className="mb-4 text-sm text-amber-200">
          No se pudo cargar la disponibilidad guardada. Se muestran valores por
          defecto hasta que guardes una configuracion nueva.
        </p>
      ) : null}
      {isLoading && availability.length === 0 ? (
        <p className="mb-4 text-sm text-zinc-400">Cargando disponibilidad...</p>
      ) : null}

      <div className="grid gap-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2 xl:grid-cols-2">
        {availability.map((day) => (
          <article
            key={day.dayOfWeek}
            className="rounded-3xl border border-white/10 bg-black/10 p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-white">
                  {weekdayLabels[day.dayOfWeek]}
                </p>
                <p className="text-sm text-zinc-500">
                  {day.enabled ? 'Disponible' : 'No disponible'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleDay(day.dayOfWeek)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  day.enabled
                    ? 'bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                {day.enabled ? 'Activo' : 'Cerrado'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportedHours.map((hour) => {
                const isSelected = day.hours.includes(hour)
                return (
                  <button
                    key={`${day.dayOfWeek}-${hour}`}
                    type="button"
                    disabled={!day.enabled}
                    onClick={() => handleToggleHour(day.dayOfWeek, hour)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      isSelected
                        ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-100'
                        : 'border-white/10 bg-transparent text-zinc-400'
                    } ${day.enabled ? 'hover:border-cyan-400/40 hover:text-white' : 'cursor-not-allowed opacity-40'}`}
                  >
                    {hour}
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
