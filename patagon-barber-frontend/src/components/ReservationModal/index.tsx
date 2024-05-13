import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import CancelSVG from '../SVGIcons/CancelSVG'

const defaultDate = dayjs()

const ReservationModal = ({
  handleAccept,
  handleCancel: closeReservationModal
}: {
  handleAccept: (date) => void
  handleCancel: () => void
}) => {
  const disabledDates = ['2024-05-15', '2024-05-11', '2024-05-19']

  function shouldDisableDate(date) {
    const dateString = date.toISOString().split('T')[0]
    return disabledDates.includes(dateString)
  }

  return (
    <div className="h-screen w-screen fixed top-0 right-0 z-[1] flex flex-col items-center justify-center bg-black bg-opacity-75">
      <form className="bg-white flex flex-col gap-4 min-w-80 p-5 rounded-sm">
        <div
          className="self-end cursor-pointer"
          onClick={closeReservationModal}
        >
          <CancelSVG></CancelSVG>
        </div>
        <label className="flex flex-col" htmlFor="client-name">
          Nombre
          <input
            className="bg-blue-300 p-2 rounded-lg text-black font-semibold"
            name="client-name"
            placeholder="Alejandro"
            required={true}
          />
        </label>
        <label className="flex flex-col" htmlFor="client-lastname">
          Apellido
          <input
            className="bg-blue-300 p-2 rounded-lg text-black font-semibold"
            name="client-lastname"
            placeholder="Juarez"
            required={true}
          />
        </label>
        <label className="flex flex-col" htmlFor="client-email">
          E-mail
          <input
            className="bg-blue-300 p-2 rounded-lg text-black font-semibold"
            name="client-email"
            placeholder="aleajandro96@gmail.com"
          />
        </label>
        <label className="flex flex-col" htmlFor="client-phone-number">
          Nro. Telefono
          <input
            className="bg-blue-300 p-2 rounded-lg text-black font-semibold"
            name="client-phone-number"
            placeholder="2966484800"
            required={true}
          />
        </label>
        <DateTimePicker
          defaultValue={defaultDate}
          disablePast={true}
          showDaysOutsideCurrentMonth={false}
          shouldDisableDate={shouldDisableDate}
          onAccept={handleAccept}
        ></DateTimePicker>
        <input
          type="submit"
          className="py-2 px-5 mt-1 bg-cyan-600 text-white font-bold rounded-md "
          value="Agendar"
        />
      </form>
    </div>
  )
}

export default ReservationModal
