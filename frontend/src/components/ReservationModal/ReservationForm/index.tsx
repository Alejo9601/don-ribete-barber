import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { ChangeEvent, FormEvent, useContext } from 'react'
import { FormInput } from '../../FormInput'
import { ModalClosingButton } from '../../ModalClosingButton'
import { ReservationContext } from '../../../context/reservationContext'

const defaultDate = dayjs().hour(15).minute(0)

// const initialClientState: Client = {
//   id: undefined,
//   name: '',
//   lastname: '',
//   email: '',
//   phone_number: ''
// }
// const initialAppointmentState: Appointment = {
//   id: undefined,
//   client: undefined,
//   date: '',
//   time: '',
//   service: undefined
// }

export default function ReservationForm({
  onReservationSubmit,
  closeModal
}: {
  onReservationSubmit: () => void
  closeModal: () => void
}) {
  // const [clientData, setClientData] = useState<Client>(initialClientState)
  // const [appointmentData, setAppointmentData] = useState<Appointment>(
  //   initialAppointmentState
  // )

  const reservation = useContext(ReservationContext)

  const disabledDates = ['2024-05-15', '2024-05-11', '2024-05-19']

  function shouldDisableDate(date: Dayjs) {
    const dateString = date.toISOString().split('T')[0]
    return disabledDates.includes(dateString)
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

    const settledDate = dayjs(date).format('YYYY-MM-DD HH:00')
    const dateValue = settledDate.split(' ')[0]

    const { ...props } = reservation?.appointment
    reservation?.updateAppointment({
      ...props,
      date: dateValue
    })
  }

  function onTimeAccept(time: Dayjs | null) {
    if (time === null) return // Here must be a feedback to user

    const settledDate = dayjs(time).format('YYYY-MM-DD HH:00')
    const timeValue = settledDate.split(' ')[1]

    const { ...props } = reservation?.appointment
    reservation?.updateAppointment({
      ...props,
      time: timeValue
    })
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onReservationSubmit()
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white flex flex-col gap-4 min-w-80 p-5 rounded-sm"
    >
      <ModalClosingButton onClick={closeModal} />
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
      <DatePicker
        defaultValue={defaultDate}
        disablePast={true}
        showDaysOutsideCurrentMonth={false}
        shouldDisableDate={shouldDisableDate}
        onAccept={onDateAccept}
        views={['year', 'month', 'day']}
        maxDate={defaultDate.endOf('month')}
        minDate={defaultDate.startOf('month')}
      ></DatePicker>
      <TimePicker
        defaultValue={defaultDate}
        disablePast={true}
        maxTime={dayjs().set('hour', 20)}
        minTime={dayjs().set('hour', 15)}
        ampm={false}
        ampmInClock={false}
        minutesStep={60}
        onAccept={onTimeAccept}
      ></TimePicker>
      <input
        type="submit"
        className="py-2 px-5 mt-1 bg-cyan-600 text-white font-bold rounded-md "
        value="Agendar"
      />
    </form>
  )
}
