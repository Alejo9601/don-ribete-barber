import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ServiceCatalog } from '../../types/ServiceCatalog'

export function ServiceCatalogEditor({
  services,
  setServices,
  isLoading,
  isSaving,
  error,
  onSave
}: {
  services: ServiceCatalog[]
  setServices: Dispatch<SetStateAction<ServiceCatalog[]>>
  isLoading: boolean
  isSaving: boolean
  error: string
  onSave: (services: ServiceCatalog[]) => Promise<unknown>
}) {
  const [feedback, setFeedback] = useState('')

  const sortedServices = useMemo(
    () => [...services].sort((a, b) => a.id - b.id),
    [services]
  )

  function updateService(id: number, updater: (service: ServiceCatalog) => ServiceCatalog) {
    setServices((currentServices) =>
      currentServices.map((service) =>
        service.id === id ? updater(service) : service
      )
    )
  }

  function handleToggleService(id: number) {
    updateService(id, (service) => ({
      ...service,
      enabled: !service.enabled
    }))
  }

  function handleNameChange(id: number, name: string) {
    updateService(id, (service) => ({
      ...service,
      service_name: name
    }))
  }

  function handlePriceChange(id: number, price: string) {
    const parsedPrice = Number(price)

    updateService(id, (service) => ({
      ...service,
      price: Number.isNaN(parsedPrice) ? 0 : parsedPrice
    }))
  }

  function handleDeleteService(id: number) {
    setServices((currentServices) =>
      currentServices.filter((service) => service.id !== id)
    )
  }

  function handleAddService() {
    setServices((currentServices) => {
      const maxId = currentServices.reduce(
        (currentMax, service) => Math.max(currentMax, service.id),
        0
      )

      return [
        ...currentServices,
        {
          id: maxId + 1,
          service_name: '',
          price: 0,
          enabled: true
        }
      ]
    })
  }

  async function handleSave() {
    const normalizedServices = sortedServices.filter(
      (service) =>
        service.service_name.trim().length > 0 &&
        Number.isFinite(service.price) &&
        service.price >= 0
    )

    if (normalizedServices.length === 0) {
      setFeedback('Agrega al menos un servicio para guardar.')
      return
    }

    try {
      await onSave(normalizedServices)
      setFeedback('Servicios actualizados.')
    } catch {
      setFeedback('No se pudieron guardar los servicios.')
    }
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Servicios</h3>
          <p className="text-sm text-zinc-400">
            Define los servicios disponibles para reservar desde la web.
          </p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            onClick={handleAddService}
            className="h-11 flex-1 rounded-2xl border border-white/10 px-4 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/5 sm:flex-none"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="h-11 flex-1 rounded-2xl bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-800/60 sm:flex-none"
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {feedback ? <p className="mb-4 text-sm text-zinc-300">{feedback}</p> : null}
      {error ? <p className="mb-4 text-sm text-amber-200">{error}</p> : null}
      {isLoading ? (
        <p className="mb-4 text-sm text-zinc-400">Cargando servicios...</p>
      ) : null}

      <div className="grid gap-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
        {sortedServices.map((service) => (
          <article
            key={service.id}
            className="rounded-3xl border border-white/10 bg-black/10 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={service.service_name}
                onChange={(event) => handleNameChange(service.id, event.currentTarget.value)}
                className="h-11 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-zinc-500"
                placeholder="Nombre del servicio"
                maxLength={45}
              />
              <input
                type="number"
                min={0}
                value={service.price}
                onChange={(event) => handlePriceChange(service.id, event.currentTarget.value)}
                className="h-11 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-zinc-500 sm:w-32"
                placeholder="Precio"
              />
              <button
                type="button"
                onClick={() => handleToggleService(service.id)}
                className={`h-11 rounded-2xl px-4 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  service.enabled
                    ? 'bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                {service.enabled ? 'Activo' : 'Oculto'}
              </button>
              <button
                type="button"
                onClick={() => handleDeleteService(service.id)}
                className="h-11 rounded-2xl border border-red-500/30 px-4 text-sm font-medium text-red-100 transition hover:bg-red-500/10"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
