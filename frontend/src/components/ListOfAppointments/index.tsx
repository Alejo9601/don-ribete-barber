import { Appointment } from '../../types/Appointment'
import {
  deleteAppointment,
  updateAppointmentStatus
} from '../../services/appointmentServices'
import { Dispatch, SetStateAction, useState } from 'react'

const statusStyles: Record<string, string> = {
  PENDING: 'border-amber-500/20 bg-amber-500/10 text-amber-100',
  CONFIRMED: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-100',
  COMPLETED: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100',
  CANCELLED: 'border-red-500/20 bg-red-500/10 text-red-100'
}

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
}

function formatAppointmentDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function getClientDisplayName(appointment: Appointment) {
  const firstName = appointment.client?.name ?? ''
  const lastName = appointment.client?.lastname ?? ''

  return `${firstName} ${lastName}`.trim() || 'No client name'
}

const ListOfAppointments = ({
  appointments,
  setAppointments,
  isLoading,
  error
}: {
  appointments: Appointment[]
  setAppointments: Dispatch<SetStateAction<Appointment[]>>
  isLoading: boolean
  error: string
}) => {
  const [pendingActionId, setPendingActionId] = useState<number | null>(null)
  const [actionError, setActionError] = useState('')

  async function handleStatusUpdate(id: number | undefined, status: string) {
    if (id === undefined) {
      return
    }

    try {
      setPendingActionId(id)
      setActionError('')
      const updatedAppointment = await updateAppointmentStatus(id, status)

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === id ? updatedAppointment : appointment
        )
      )
    } catch {
      setActionError('Could not update appointment status.')
    } finally {
      setPendingActionId(null)
    }
  }

  async function handleDelete(id: number | undefined) {
    if (id === undefined) {
      return
    }

    try {
      setPendingActionId(id)
      setActionError('')
      await deleteAppointment(id)
      setAppointments((currentAppointments) =>
        currentAppointments.filter((appointment) => appointment.id !== id)
      )
    } catch {
      setActionError('Could not delete appointment.')
    } finally {
      setPendingActionId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:h-full">
        <p className="text-sm text-zinc-400">Loading appointments...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-100 lg:h-full">
        {error}
      </section>
    )
  }

  if (appointments.length === 0) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:h-full">
        <h3 className="text-lg font-semibold text-white">Appointments</h3>
        <p className="mt-3 text-sm text-zinc-400">
          There are no appointments scheduled yet.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Appointments</h3>
          <p className="text-sm text-zinc-400">
            Upcoming bookings and client details.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-zinc-500">
          {appointments.length} scheduled
        </span>
      </div>

      {actionError ? (
        <p className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {actionError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
        {appointments.map((appointment) => (
          <article
            key={`${appointment.id ?? 'appointment'}-${appointment.date}-${appointment.time}`}
            className="rounded-3xl border border-white/10 bg-black/10 p-4 transition hover:border-white/20 hover:bg-black/20"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-base font-semibold text-white">
                    {getClientDisplayName(appointment)}
                  </p>
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${
                      statusStyles[appointment.status] ?? statusStyles.PENDING
                    }`}
                  >
                    {statusLabels[appointment.status] ?? appointment.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                  <span>{formatAppointmentDate(appointment.date)}</span>
                  <span>{appointment.time}</span>
                  <span>{appointment.client?.email || 'No email'}</span>
                  <span>{appointment.client?.phone_number || 'No phone'}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-[18rem] lg:justify-end">
                <button
                  type="button"
                  disabled={
                    pendingActionId === appointment.id ||
                    appointment.status === 'CONFIRMED'
                  }
                  onClick={() =>
                    handleStatusUpdate(appointment.id, 'CONFIRMED')
                  }
                  className="h-10 rounded-2xl border border-cyan-500/30 px-4 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  disabled={
                    pendingActionId === appointment.id ||
                    appointment.status === 'COMPLETED'
                  }
                  onClick={() =>
                    handleStatusUpdate(appointment.id, 'COMPLETED')
                  }
                  className="h-10 rounded-2xl border border-emerald-500/30 px-4 text-sm font-medium text-emerald-100 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Complete
                </button>
                <button
                  type="button"
                  disabled={
                    pendingActionId === appointment.id ||
                    appointment.status === 'CANCELLED'
                  }
                  onClick={() =>
                    handleStatusUpdate(appointment.id, 'CANCELLED')
                  }
                  className="h-10 rounded-2xl border border-amber-500/30 px-4 text-sm font-medium text-amber-100 transition hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={pendingActionId === appointment.id}
                  onClick={() => handleDelete(appointment.id)}
                  className="h-10 rounded-2xl border border-red-500/30 px-4 text-sm font-medium text-red-100 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ListOfAppointments
