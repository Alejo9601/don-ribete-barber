import { ClientDB } from '../models/clients'
import { Client } from '../types/Client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeClient(clientData: any) {
  const client: Client = {
    id: undefined,
    name: clientData.name,
    lastname: clientData.lastname,
    email: clientData.email,
    phone_number: clientData.phone_number
  }
  return client
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createClient(clientData: any) {
  const clientToSave: Client = normalizeClient(clientData)
  const clientDB = new ClientDB()
  try {
    const savedClientId = Number((await clientDB.save(clientToSave)).rows[0].id)
    return savedClientId
  } catch (error) {
    console.log(error)
  }
}
