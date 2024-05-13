import { Client } from './Client'
import { Service } from './Services'

export interface Appointment {
  id: number | undefined
  client: Client
  date: string
  time: string
  service: Service | undefined
}
