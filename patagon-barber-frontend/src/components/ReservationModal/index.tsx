import { StaticDateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

const defaultDate = dayjs()

const ReservationModal = ({
  handleAccept,
  handleCancel
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
    <div className="h-screen w-screen fixed top-0 right-0 z-[1] flex flex-col items-center justify-center bg-black">
      <div className="h-fit w-fit bg-white flex flex-col items-center justify-center py-6">
        <StaticDateTimePicker
          defaultValue={defaultDate}
          disablePast={true}
          showDaysOutsideCurrentMonth={false}
          shouldDisableDate={shouldDisableDate}
          onAccept={handleAccept}
          onClose={handleCancel}
        ></StaticDateTimePicker>
      </div>
    </div>
  )
}

export default ReservationModal
