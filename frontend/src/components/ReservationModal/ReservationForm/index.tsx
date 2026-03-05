import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/es'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { FormInput } from '../../FormInput'
import { ModalClosingButton } from '../../ModalClosingButton'
import { ReservationContext } from '../../../context/reservationContext'
import { useAvailability } from '../../../hooks/useAvailability'
import { useBookedSlots } from '../../../hooks/useBookedSlots'
import { useServices } from '../../../hooks/useServices'

const defaultDate = dayjs()
dayjs.locale('es')

export default function ReservationForm({
  onReservationSubmit,
  closeModal
}: {
  onReservationSubmit: () => void
  closeModal: () => void
}) {
  const reservation = useContext(ReservationContext)
  const { bookedSlots, isLoading: isBookedSlotsLoading } = useBookedSlots()
  const { availability, isLoading: isAvailabilityLoading } = useAvailability()
  const { services } = useServices()
  const [selectedDate, setSelectedDate] = useState<Dayjs>(defaultDate)
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState('')

  function shouldDisableDate(date: Dayjs) {
    if (date.day() === 0) {
      return true
    }

    return getAvailableHoursForDate(date).length === 0
  }

  // function shouldDisableTime(dateTime: Dayjs) {
  //   const hour = Number(dateTime.toISOString().split('T')[1].split(':')[0])

  //   return false
  // }

  function onClientNameChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    const { ...props } = reservation?.client
    reservation?.updateClient({
      ...props,
      name: newValue
    })
  }

  function onClientLastnameChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    const { ...props } = reservation?.client
    reservation?.updateClient({
      ...props,
      lastname: newValue
    })
  }

  function onClientEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    const { ...props } = reservation?.client
    reservation?.updateClient({
      ...props,
      email: newValue
    })
  }

  function onClientPhoneNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    const { ...props } = reservation?.client
    reservation?.updateClient({
      ...props,
      phone_number: newValue
    })
  }

  function onDateAccept(date: Dayjs | null) {
    if (date === null) return // Here must be a feedback to user

    setSelectedDate(date)
    setSelectedHour(null)
  }

  function onServiceChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextService = event.currentTarget.value
    setSelectedService(nextService)

    const { ...props } = reservation?.appointment
    reservation?.updateAppointment({
      ...props,
      service_name: nextService
    })
  }

  function onTimeSelect(hour: string) {
    setSelectedHour(hour)
    const { ...props } = reservation?.appointment
    reservation?.updateAppointment({
      ...props,
      time: hour
    })
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onReservationSubmit()
  }

  function getBookedHoursForDate(date: Dayjs) {
    const selectedDateValue = date.format('YYYY-MM-DD')

    return bookedSlots
      .filter((appointment) => appointment.date === selectedDateValue)
      .map((appointment) => appointment.time)
      .sort()
  }

  function getConfiguredHoursForDate(date: Dayjs) {
    const dayAvailability = availability.find(
      (day) => day.dayOfWeek === date.day()
    )

    if (!dayAvailability || !dayAvailability.enabled) {
      return []
    }

    return dayAvailability.hours
  }

  function getAvailableHoursForDate(date: Dayjs) {
    const bookedHours = getBookedHoursForDate(date)
    const configuredHours = getConfiguredHoursForDate(date)
    const isToday = date.isSame(dayjs(), 'day')
    const currentTime = dayjs()

    return configuredHours.filter((hour) => {
      if (bookedHours.includes(hour)) {
        return false
      }

      if (
        isToday &&
        dayjs(`${date.format('YYYY-MM-DD')} ${hour}`).isBefore(currentTime)
      ) {
        return false
      }

      return true
    })
  }

  const availableHours = getAvailableHoursForDate(selectedDate)
  const isHoursLoading = isBookedSlotsLoading || isAvailabilityLoading
  const availableServices = services.filter((service) => service.enabled)

  useEffect(() => {
    const dateValue = selectedDate.format('YYYY-MM-DD')
    const { ...props } = reservation?.appointment

    reservation?.updateAppointment({
      ...props,
      date: dateValue
    })
  }, [reservation, selectedDate])

  useEffect(() => {
    const { ...props } = reservation?.appointment
    reservation?.updateAppointment({
      ...props,
      time: selectedHour ?? ''
    })
  }, [reservation, selectedHour])
  const pickerTextFieldProps = {
    fullWidth: true,
    variant: 'outlined' as const,
    sx: {
      '& .MuiInputLabel-root': {
        color: '#71717a',
        fontSize: '0.74rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase'
      },
      '& .MuiOutlinedInput-root': {
        height: '2.25rem',
        borderRadius: '1rem',
        backgroundColor: '#fafafa',
        fontSize: '0.95rem',
        '& input': {
          paddingTop: '0.45rem',
          paddingBottom: '0.45rem',
          fontSize: '0.9rem',
          color: '#18181b'
        },
        '& fieldset': {
          borderColor: '#e4e4e7'
        },
        '&:hover fieldset': {
          borderColor: '#cbd5e1'
        },
        '&.Mui-focused fieldset': {
          borderColor: '#06b6d4'
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative flex w-full max-w-xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white p-4 text-zinc-900 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-5 md:rounded-[2rem] md:p-6"
    >
      <ModalClosingButton onClick={closeModal} />
      <div className="space-y-3 pr-10 sm:pr-12">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Reserva online
        </p>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold leading-tight text-zinc-950 sm:text-2xl md:text-[1.75rem]">
            Agenda tu turno
          </h2>
          {/* <p className="max-w-lg text-[13px] leading-5 text-zinc-500">
            Completa tus datos y elige fecha y horario. El formulario esta
            pensado para reservar rapido y sin vueltas.
          </p> */}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          name="client-name"
          label="Nombre"
          placeholder="Alejandro"
          required={true}
          maxLength={30}
          onChange={onClientNameChange}
        />
        <FormInput
          name="client-lastname"
          label="Apellido"
          placeholder="Juarez"
          required={true}
          maxLength={30}
          onChange={onClientLastnameChange}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          name="client-email"
          label="E-mail"
          placeholder="alejandro96@gmail.com"
          maxLength={40}
          onChange={onClientEmailChange}
        />
        <FormInput
          name="client-phone-number"
          label="Telefono"
          placeholder="2966484800"
          required={true}
          maxLength={40}
          onChange={onClientPhoneNumberChange}
        />
      </div>
      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Servicio
            </p>
            <select
              value={selectedService}
              onChange={onServiceChange}
              required
              className="h-9 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-800 outline-none transition focus:border-cyan-500"
            >
              <option value="">Selecciona un servicio</option>
              {availableServices.map((service) => (
                <option
                  key={`service-option-${service.id}`}
                  value={service.service_name}
                >
                  {`${service.service_name} - $${service.price}`}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Fecha
            </p>
            <DatePicker
              value={selectedDate}
              format="dddd D [de] MMMM [de] YYYY"
              onChange={(value) => {
                if (value !== null) {
                  setSelectedDate(value)
                  setSelectedHour(null)
                }
              }}
              disablePast={true}
              showDaysOutsideCurrentMonth={false}
              shouldDisableDate={shouldDisableDate}
              onAccept={onDateAccept}
              views={['year', 'month', 'day']}
              slotProps={{
                textField: pickerTextFieldProps,
                popper: {
                  sx: {
                    zIndex: 1600
                  }
                },
                mobilePaper: {
                  sx: {
                    zIndex: 1600
                  }
                }
              }}
            ></DatePicker>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Horarios disponibles
            </p>
            <div className="min-h-[5rem] overflow-y-auto pr-1">
              <div className="flex flex-wrap gap-2">
                {isHoursLoading ? (
                  <span className="text-[13px] text-zinc-500">
                    Cargando horarios...
                  </span>
                ) : availableHours.length > 0 ? (
                  availableHours.map((hour) => {
                    const isSelected = selectedHour === hour

                    return (
                      <button
                        key={`select-hour-${hour}`}
                        type="button"
                        className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${
                          isSelected
                            ? 'border-cyan-600 bg-cyan-600 text-white'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-cyan-400 hover:text-cyan-700'
                        }`}
                        onClick={() => onTimeSelect(hour)}
                      >
                        {hour}
                      </button>
                    )
                  })
                ) : (
                  <span className="text-[13px] text-zinc-500">
                    No quedan horarios libres para este dia.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <input
        type="submit"
        className="mt-1 h-11 rounded-2xl bg-cyan-600 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-cyan-500 sm:text-[13px] sm:tracking-[0.22em]"
        value="Agendar"
      />
    </form>
  )
}
