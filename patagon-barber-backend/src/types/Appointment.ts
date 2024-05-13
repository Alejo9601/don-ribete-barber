import { Client } from './Client'
import { Service } from './Service'

export interface Appointment {
  id: number
  client: Client | undefined
  date: string
  time: string
  service: Service | undefined
}
