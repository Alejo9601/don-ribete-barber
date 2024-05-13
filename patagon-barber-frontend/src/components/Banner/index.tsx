import BookAppointment from './BookAppointment'
import Decoration from './Decoration'

export function Banner() {
  return (
    <div className="flex-auto flex items-center justify-between mx-14">
      <BookAppointment></BookAppointment>
      <Decoration></Decoration>
    </div>
  )
}
