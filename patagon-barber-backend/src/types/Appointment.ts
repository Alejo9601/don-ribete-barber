import { Client } from './Client'

export interface Appointment {
  id: number
  client: Client | undefined
  date: string
  time: string
  status: string
}
