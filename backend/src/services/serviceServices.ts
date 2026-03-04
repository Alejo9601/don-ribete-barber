import { ServiceDB } from '../models/services'
import { Service } from '../types/Service'

interface ServiceRecord {
  id?: number
  service_name: string
  price: number | string
  enabled: number | boolean
}

function normalizeService(serviceData: ServiceRecord): Service {
  return {
    id: Number(serviceData.id ?? 0),
    service_name: serviceData.service_name,
    price: Number(serviceData.price),
    enabled: Boolean(Number(serviceData.enabled))
  }
}

export async function getAllServices() {
  const serviceDB = new ServiceDB()
  const result = await serviceDB.getAll()

  return result.rows.map((service) =>
    normalizeService(service as unknown as ServiceRecord)
  )
}

export async function saveServices(services: Service[]) {
  const normalizedServices = services
    .map((service) => ({
      id: Number(service.id ?? 0),
      service_name: service.service_name.trim(),
      price: Number(service.price),
      enabled: Boolean(service.enabled)
    }))
    .filter(
      (service) =>
        service.service_name.length > 0 &&
        !Number.isNaN(service.price) &&
        service.price >= 0
    )

  const uniqueNames = new Set(
    normalizedServices.map((service) => service.service_name.toLowerCase())
  )

  if (uniqueNames.size !== normalizedServices.length) {
    throw new Error('Service names must be unique')
  }

  if (normalizedServices.length === 0) {
    throw new Error('At least one service is required')
  }

  const serviceDB = new ServiceDB()
  await serviceDB.replaceAll(normalizedServices)

  return getAllServices()
}
