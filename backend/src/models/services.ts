import { client } from './db_client'
import { Service } from '../types/Service'

const shouldAutoSchema = process.env.DB_AUTO_SCHEMA === 'true'

const defaultServices: Array<{ service_name: string; price: number }> = [
  { service_name: 'Corte', price: 12000 },
  { service_name: 'Perfilado', price: 9000 },
  { service_name: 'Corte y perfilado', price: 18000 }
]

export class ServiceDB {
  async ensureSchema() {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_name TEXT NOT NULL UNIQUE,
        price REAL NOT NULL DEFAULT 0,
        enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    const columns = await client.execute({
      sql: 'PRAGMA table_info(services)',
      args: []
    })

    const hasServiceName = columns.rows.some(
      (column) => String(column.name) === 'service_name'
    )
    const hasLegacyName = columns.rows.some(
      (column) => String(column.name) === 'name'
    )
    const hasPrice = columns.rows.some((column) => String(column.name) === 'price')

    if (!hasServiceName) {
      await client.execute(`
        ALTER TABLE services
        ADD COLUMN service_name TEXT NOT NULL DEFAULT ''
      `)
    }

    if (hasLegacyName) {
      await client.execute({
        sql: "UPDATE services SET service_name = name WHERE service_name = ''",
        args: []
      })
    }

    if (!hasPrice) {
      await client.execute(`
        ALTER TABLE services
        ADD COLUMN price REAL NOT NULL DEFAULT 0
      `)
    }

    const existingServices = await client.execute({
      sql: 'SELECT COUNT(*) AS total FROM services',
      args: []
    })

    const total = Number(existingServices.rows[0]?.total ?? 0)

    if (total === 0) {
      for (const service of defaultServices) {
        await client.execute({
          sql: 'INSERT INTO services (service_name, price, enabled) VALUES (?, ?, 1)',
          args: [service.service_name, service.price]
        })
      }
    }
  }

  async getAll() {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

    return client.execute({
      sql: 'SELECT id, service_name, price, enabled FROM services ORDER BY id ASC',
      args: []
    })
  }

  async replaceAll(services: Service[]) {
    if (shouldAutoSchema) {
      await this.ensureSchema()
    }

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
