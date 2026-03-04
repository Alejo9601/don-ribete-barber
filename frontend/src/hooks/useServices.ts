import { useEffect, useState } from 'react'
import { ServiceCatalog } from '../types/ServiceCatalog'
import {
  getServiceCatalog,
  updateServiceCatalog
} from '../services/serviceServices'

export function useServices() {
  const [services, setServices] = useState<ServiceCatalog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  function refreshServices() {
    setIsLoading(true)

    return getServiceCatalog()
      .then((response) => {
        setServices(response)
        setError('')
      })
      .catch(() => {
        setError('No se pudo cargar el catálogo de servicios.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    refreshServices()
  }, [])

  async function saveServices(nextServices: ServiceCatalog[]) {
    setIsSaving(true)

    try {
      const updatedServices = await updateServiceCatalog(nextServices)
      setServices(updatedServices)
      setError('')
      return updatedServices
    } finally {
      setIsSaving(false)
    }
  }

  return {
    services,
    setServices,
    isLoading,
    isSaving,
    error,
    refreshServices,
    saveServices
  }
}
