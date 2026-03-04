import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ServiceCatalog } from '../../types/ServiceCatalog'

function getActionButtonClassName(variant: 'primary' | 'secondary' | 'danger') {
  if (variant === 'primary') {
    return 'flex h-10 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-3 text-cyan-100 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40'
  }

  if (variant === 'danger') {
    return 'flex h-10 items-center justify-center rounded-2xl border border-red-500/25 px-3 text-red-100 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40'
  }

  return 'flex h-10 items-center justify-center rounded-2xl border border-white/10 px-3 text-zinc-200 transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40'
}

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

  function updateService(
    id: number,
    updater: (service: ServiceCatalog) => ServiceCatalog
  ) {
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
    const parsedPrice = Number(price.replace('$', ''))

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
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-end lg:justify-between">
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
            title="Agregar servicio"
            aria-label="Agregar servicio"
            className={`${getActionButtonClassName('secondary')} flex-1 sm:flex-none`}
          >
            <i className="fa-solid fa-plus text-[14px]"></i>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isLoading}
            title="Guardar servicios"
            aria-label="Guardar servicios"
            className={`${getActionButtonClassName('primary')} flex-1 sm:flex-none`}
          >
            <i
              className={`text-[14px] ${
                isSaving
                  ? 'fa-solid fa-spinner fa-spin'
                  : 'fa-solid fa-floppy-disk'
              }`}
            ></i>
          </button>
        </div>
      </div>

      {feedback ? (
        <p className="mb-4 text-sm text-zinc-300">{feedback}</p>
      ) : null}
      {error ? <p className="mb-4 text-sm text-amber-200">{error}</p> : null}
      {isLoading ? (
        <p className="mb-4 text-sm text-zinc-400">Cargando servicios...</p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid auto-rows-max gap-3">
          {sortedServices.map((service) => (
            <article
              key={service.id}
              className="rounded-3xl border border-white/10 bg-black/10 p-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  value={service.service_name}
                  onChange={(event) =>
                    handleNameChange(service.id, event.currentTarget.value)
                  }
                  className="h-10 flex-1 rounded-2xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-zinc-500"
                  placeholder="Nombre del servicio"
                  maxLength={45}
                />
                <input
                  type="string"
                  value={'$ ' + service.price.toString()}
                  onChange={(event) =>
                    handlePriceChange(service.id, event.currentTarget.value)
                  }
                  className="h-10 w-full rounded-2xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-zinc-500 sm:w-28"
                  placeholder="Precio"
                />
                <button
                  type="button"
                  onClick={() => handleToggleService(service.id)}
                  title={
                    service.enabled ? 'Ocultar servicio' : 'Activar servicio'
                  }
                  aria-label={
                    service.enabled ? 'Ocultar servicio' : 'Activar servicio'
                  }
                  className={getActionButtonClassName('secondary')}
                >
                  <i
                    className={`text-[14px] ${
                      service.enabled
                        ? 'fa-solid fa-eye'
                        : 'fa-solid fa-eye-slash'
                    }`}
                  ></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteService(service.id)}
                  title="Eliminar servicio"
                  aria-label="Eliminar servicio"
                  className={getActionButtonClassName('danger')}
                >
                  <i className="fa-solid fa-trash-can text-[14px]"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
