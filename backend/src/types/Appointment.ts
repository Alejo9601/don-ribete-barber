import { Client } from './Client'

export interface Appointment {
  id: number | undefined
  client: Client | undefined
  date: string
  time: string
  status: string
}
