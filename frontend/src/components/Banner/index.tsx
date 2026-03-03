import { ReservationContextProvider } from '../../context/reservationContext'
import BookAppointment from './BookAppointment'
import Decoration from './Decoration'

export function Banner() {
  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-10 px-6 pb-16 pt-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-10 lg:pb-20">
      <ReservationContextProvider>
        <BookAppointment></BookAppointment>
      </ReservationContextProvider>
      <Decoration></Decoration>
    </div>
  )
}
