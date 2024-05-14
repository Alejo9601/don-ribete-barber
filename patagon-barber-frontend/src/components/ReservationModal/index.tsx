import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Client } from '../../types/Client'
import { Appointment } from '../../types/Appointment'
import { FormInput } from '../FormInput'
import { ModalWrapper } from '../ModalWrapper'
import { ModalClosingButton } from '../ModalClosingButton'

const defaultDate = dayjs()
const initialClientState: Client = {
  id: undefined,
  name: '',
  lastname: '',
  email: '',
  phone_number: ''
}
const initialAppointmentState: Appointment = {
  id: undefined,
  client: undefined,
  date: '',
  time: '',
  service: undefined
}

const ReservationModal = ({
  onReservationSubmit,
  closeModal
}: {
  onReservationSubmit: (appointment: Appointment) => void
  closeModal: () => void
}) => {
  const [clientData, setClientData] = useState<Client>(initialClientState)
  const [appointmentData, setAppointmentData] = useState<Appointment>(
    initialAppointmentState
  )

  console.log(appointmentData)

  const disabledDates = ['2024-05-15', '2024-05-11', '2024-05-19']

  function shouldDisableDate(date: Dayjs) {
    const dateString = date.toISOString().split('T')[0]
    return disabledDates.includes(dateString)
  }

  // function shouldDisableTime(time: Dayjs) {
  //   const hour = time.hour()
  //   if (hour < 0) return true
  //   return false
  // }

  function onClientNameChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setClientData((prevState) => ({
      ...prevState,
      name: newValue
    }))
  }

  function onClientLastnameChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setClientData((prevState) => ({
      ...prevState,
      lastname: newValue
    }))
  }

  function onClientEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setClientData((prevState) => ({
      ...prevState,
      email: newValue
    }))
  }

  function onClientPhoneNumberChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setClientData((prevState) => ({
      ...prevState,
      phone_number: newValue
    }))
  }

  function onDateTimeAccept(date: Dayjs | null) {
    if (date === null) return // Here must be a feedback to user

    const settledDate = dayjs(date).format('YYYY-MM-DD HH:00')
    const dateValue = settledDate.split(' ')[0]
    const timeValue = settledDate.split(' ')[1]

    setAppointmentData((prevState) => ({
      ...prevState,
      date: dateValue,
      time: timeValue,
      client: clientData
    }))
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onReservationSubmit(appointmentData)
    closeModal()
  }

  return (
    <ModalWrapper>
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
          onChange={onClientNameChange}
        />
        <FormInput
          name="client-lastname"
          label="Apellido"
          placeholder="Juarez"
          required={true}
          onChange={onClientLastnameChange}
        />
        <FormInput
          name="client-email"
          label="E-mail"
          placeholder="alejandro96@gmail.com"
          onChange={onClientEmailChange}
        />
        <FormInput
          name="client-phone-number"
          label="Telefono"
          placeholder="2966484800"
          required={true}
          onChange={onClientPhoneNumberChange}
        />
        <DateTimePicker
          defaultValue={defaultDate}
          disablePast={true}
          showDaysOutsideCurrentMonth={false}
          shouldDisableDate={shouldDisableDate}
          // shouldDisableTime={shouldDisableTime}
          onAccept={onDateTimeAccept}
          views={['year', 'month', 'day', 'hours']}
        ></DateTimePicker>
        <input
          type="submit"
          className="py-2 px-5 mt-1 bg-cyan-600 text-white font-bold rounded-md "
          value="Agendar"
        />
      </form>
    </ModalWrapper>
  )
}

export default ReservationModal
