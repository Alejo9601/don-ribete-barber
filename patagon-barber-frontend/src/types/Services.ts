import { Appointment } from './Appointment'

export interface Service {
  id: number
  name: string
  price: number
  appointment: Appointment | undefined
}
