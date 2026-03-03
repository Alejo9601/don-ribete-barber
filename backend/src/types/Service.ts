import { Appointment } from './Appointment'

export interface Service {
  id: number
  name: string
  price: string
  appointment: Appointment | undefined
}
