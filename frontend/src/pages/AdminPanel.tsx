import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import { useUser } from '../hooks/useUser'
import AsideAdminPanel, {
  AdminSection
} from '../components/AsideAdminPanel'
import ListOfAppointments from '../components/ListOfAppointments'
import { useAppointments } from '../hooks/useAppointments'
import { useAvailability } from '../hooks/useAvailability'
import { AvailabilityEditor } from '../components/AvailabilityEditor'
import { useServices } from '../hooks/useServices'
import { ServiceCatalogEditor } from '../components/ServiceCatalogEditor'

const bypassAdminAuth = import.meta.env.VITE_BYPASS_ADMIN_AUTH === 'true'

const AdminPanel = () => {
  const [, navigate] = useLocation()
  const { user, isAuthResolved, refreshSession } = useUser()
  const {
    appointments,
    setAppointments,
    isLoading,
    error
  } = useAppointments()
  const [activeSection, setActiveSection] =
    useState<AdminSection>('appointments')
  const hasRetriedSession = useRef(false)
  const {
    availability,
    isLoading: isAvailabilityLoading,
    error: availabilityError
  } = useAvailability()
  const {
    services,
    setServices,
    isLoading: isServicesLoading,
    isSaving: isServicesSaving,
    error: servicesError,
    saveServices
  } = useServices()
  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === new Date().toISOString().split('T')[0]
  ).length

  useEffect(() => {
    if (bypassAdminAuth) {
      return
    }

    if (!isAuthResolved || user !== undefined) {
      return
    }

    if (hasRetriedSession.current) {
      navigate('/admin-panel/login', { replace: true })
      return
    }

    hasRetriedSession.current = true

    refreshSession().then((currentUser) => {
      if (currentUser === null) {
        navigate('/admin-panel/login', { replace: true })
      }
    })
  }, [isAuthResolved, navigate, refreshSession, user])

  function renderActiveSection() {
    if (activeSection === 'availability') {
      return (
        <AvailabilityEditor
          initialAvailability={availability}
          isLoading={isAvailabilityLoading}
          error={availabilityError}
        />
      )
    }

    if (activeSection === 'services') {
      return (
        <ServiceCatalogEditor
          services={services}
          setServices={setServices}
          isLoading={isServicesLoading}
          isSaving={isServicesSaving}
          error={servicesError}
          onSave={saveServices}
        />
      )
    }

    return (
      <ListOfAppointments
        appointments={appointments}
        setAppointments={setAppointments}
        isLoading={isLoading}
        error={error}
      />
    )
  }

  if (bypassAdminAuth) {
    return (
      <section className="min-h-dvh bg-zinc-950 px-4 py-4 text-white sm:px-6 sm:py-5 lg:h-dvh lg:overflow-hidden lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(255,255,255,0.04),transparent_24%)]"></div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 lg:h-full lg:flex-row">
          <AsideAdminPanel
            totalAppointments={appointments.length}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <main className="flex-1 space-y-5 lg:flex lg:min-h-0 lg:flex-col">
            <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                    Resumen
                  </span>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-white">
                      Panel de administracion
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-zinc-400">
                      Controla turnos diarios y solicitudes de clientes desde
                      una interfaz clara.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:min-w-[280px] sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Hoy
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      {todayAppointments}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Estado
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {isLoading
                        ? 'Sincronizando'
                        : error
                          ? 'Atencion'
                          : 'Listo'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="lg:min-h-0 lg:flex-1">{renderActiveSection()}</div>
          </main>
        </div>
      </section>
    )
  }

  if (!isAuthResolved) {
    return (
      <section className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Cargando sesión...
      </section>
    )
  }

  return user === undefined ? null : (
    <section className="min-h-dvh bg-zinc-950 px-4 py-4 text-white sm:px-6 sm:py-5 lg:h-dvh lg:overflow-hidden lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(255,255,255,0.04),transparent_24%)]"></div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 lg:h-full lg:flex-row">
        <AsideAdminPanel
          totalAppointments={appointments.length}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 space-y-5 lg:flex lg:min-h-0 lg:flex-col">
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                  Resumen
                </span>
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold text-white">
                    Panel de administracion
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-zinc-400">
                    Controla turnos diarios y solicitudes de clientes desde una
                    interfaz clara.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:min-w-[280px] sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                    Hoy
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {todayAppointments}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                    Estado
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {isLoading
                      ? 'Sincronizando'
                      : error
                        ? 'Atencion'
                        : 'Listo'}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="lg:min-h-0 lg:flex-1">{renderActiveSection()}</div>
        </main>
      </div>
    </section>
  )
}

export default AdminPanel
