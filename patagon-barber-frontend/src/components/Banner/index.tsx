import { ReservationContextProvider } from '../../context/reservationContext'
import BookAppointment from './BookAppointment'
import Decoration from './Decoration'

export function Banner() {
  return (
    <div className="flex-auto flex items-center justify-between mx-14">
      <ReservationContextProvider>
        <BookAppointment></BookAppointment>
      </ReservationContextProvider>
      <Decoration></Decoration>
    </div>
  )
}
