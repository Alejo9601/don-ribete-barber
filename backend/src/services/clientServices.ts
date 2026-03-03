import { ClientDB } from '../models/clients'
import { Client } from '../types/Client'

function normalizeClient(clientData: Client) {
  const client: Client = {
    id: undefined,
    name: clientData.name,
    lastname: clientData.lastname,
    email: clientData.email,
    phone_number: clientData.phone_number
  }
  return client
}

export async function createClient(clientData: Client | undefined) {
  if (!clientData) {
    throw new Error('Client data is required')
  }

  const clientToSave: Client = normalizeClient(clientData)
  const clientDB = new ClientDB()
  const savedClientId = Number((await clientDB.save(clientToSave)).rows[0].id)
  return savedClientId
}
