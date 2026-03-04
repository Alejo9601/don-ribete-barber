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
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado'
}

function getActionButtonClassName(variant: 'primary' | 'secondary' | 'danger') {
  if (variant === 'primary') {
    return 'flex h-11 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 text-cyan-100 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40'
  }

  if (variant === 'danger') {
    return 'flex h-10 items-center justify-center rounded-2xl border border-red-500/25 px-4 text-red-100 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40'
  }

  return 'flex h-10 items-center justify-center rounded-2xl border border-white/10 px-4 text-zinc-200 transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40'
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

  return `${firstName} ${lastName}`.trim() || 'Sin nombre'
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
      setActionError('No se pudo actualizar el estado del turno.')
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
      setActionError('No se pudo eliminar el turno.')
    } finally {
      setPendingActionId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:h-full">
        <p className="text-sm text-zinc-400">Cargando turnos...</p>
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
        <h3 className="text-lg font-semibold text-white">Turnos</h3>
        <p className="mt-3 text-sm text-zinc-400">
          Aún no hay turnos agendados.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Turnos</h3>
          <p className="text-sm text-zinc-400">
            Reservas próximas y datos del cliente.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-zinc-500">
          {appointments.length} agendados
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

              <div className="w-full overflow-x-auto lg:w-auto">
                <div className="flex min-w-max items-center gap-2 lg:justify-end">
                  <button
                    type="button"
                    title="Confirmar"
                    aria-label="Confirmar turno"
                    disabled={
                      pendingActionId === appointment.id ||
                      appointment.status === 'CONFIRMED'
                    }
                    onClick={() =>
                      handleStatusUpdate(appointment.id, 'CONFIRMED')
                    }
                    className={getActionButtonClassName('primary')}
                  >
                    <i className="fa-solid fa-check-double text-[16px]"></i>
                  </button>
                  <button
                    type="button"
                    title="Completar"
                    aria-label="Marcar turno como completado"
                    disabled={
                      pendingActionId === appointment.id ||
                      appointment.status === 'COMPLETED'
                    }
                    onClick={() =>
                      handleStatusUpdate(appointment.id, 'COMPLETED')
                    }
                    className={getActionButtonClassName('secondary')}
                  >
                    <i className="fa-solid fa-circle-check text-[16px]"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    aria-label="Cancelar turno"
                    disabled={
                      pendingActionId === appointment.id ||
                      appointment.status === 'CANCELLED'
                    }
                    onClick={() =>
                      handleStatusUpdate(appointment.id, 'CANCELLED')
                    }
                    className={getActionButtonClassName('secondary')}
                  >
                    <i className="fa-regular fa-calendar-xmark text-[16px]"></i>
                  </button>
                  <button
                    type="button"
                    title="Eliminar"
                    aria-label="Eliminar turno"
                    disabled={pendingActionId === appointment.id}
                    onClick={() => handleDelete(appointment.id)}
                    className={getActionButtonClassName('danger')}
                  >
                    <i className="fa-solid fa-trash-can text-[16px]"></i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ListOfAppointments
