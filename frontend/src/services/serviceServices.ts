import { ServiceCatalog } from '../types/ServiceCatalog'
import { getApiUrl } from '../utils/api'

export async function getServiceCatalog() {
  return fetch(getApiUrl('/api/services'), {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error('No se pudo obtener el catálogo de servicios')
    }

    return response.json() as Promise<ServiceCatalog[]>
  })
}

export async function updateServiceCatalog(services: ServiceCatalog[]) {
  return fetch(getApiUrl('/api/services'), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(services)
  }).then((response) => {
    if (!response.ok) {
      throw new Error('No se pudo actualizar el catálogo de servicios')
    }

    return response.json() as Promise<ServiceCatalog[]>
  })
}
