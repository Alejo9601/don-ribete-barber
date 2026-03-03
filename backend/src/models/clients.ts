import { Client } from '../types/Client'
import { client } from './db_client'

export class ClientDB {
  save(clientToSave: Client) {
    return client.execute({
      sql: 'INSERT INTO clients (name,lastname,email,phone_number) VALUES (?,?,?,?) RETURNING clients.id',
      args: [
        clientToSave.name,
        clientToSave.lastname,
        clientToSave.email,
        clientToSave.phone_number
      ]
    })
  }
}
