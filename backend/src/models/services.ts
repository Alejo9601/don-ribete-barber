import { client } from './db_client'
import { Service } from '../types/Service'

export class ServiceDB {
  async getAll() {
    return client.execute({
      sql: 'SELECT id, service_name, price, enabled FROM services ORDER BY id ASC',
      args: []
    })
  }

  async replaceAll(services: Service[]) {
    await client.execute({
      sql: 'DELETE FROM services',
      args: []
    })

    for (const service of services) {
      await client.execute({
        sql: 'INSERT INTO services (service_name, price, enabled) VALUES (?, ?, ?)',
        args: [service.service_name, service.price, service.enabled ? 1 : 0]
      })
    }
  }
}
