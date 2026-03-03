import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useUser } from '../hooks/useUser'
import AsideAdminPanel from '../components/AsideAdminPanel'
import ListOfAppointments from '../components/ListOfAppointments'
import { useAppointments } from '../hooks/useAppointments'

const bypassAdminAuth = import.meta.env.VITE_BYPASS_ADMIN_AUTH === 'true'

const AdminPanel = () => {
  const [, navigate] = useLocation()
  const { user, isAuthResolved } = useUser()
  const { appointments, isLoading, error } = useAppointments()
  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === new Date().toISOString().split('T')[0]
  ).length

  useEffect(() => {
    if (bypassAdminAuth) {
      return
    }

    if (isAuthResolved && user === undefined) {
      navigate('/admin-panel/login', { replace: true })
    }
  }, [isAuthResolved, navigate, user])

  if (bypassAdminAuth) {
    return (
      <section className="min-h-dvh bg-zinc-950 px-5 py-5 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(255,255,255,0.04),transparent_24%)]"></div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row">
          <AsideAdminPanel totalAppointments={appointments.length} />
          <main className="flex-1 space-y-5">
            <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                    Overview
                  </span>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-white">
                      Minimal admin dashboard
                    </h1>
                    <p className="max-w-2xl text-sm leading-6 text-zinc-400">
                      Keep track of daily bookings and client requests with a
                      quieter interface.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                  <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Today
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      {todayAppointments}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                      Status
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      {isLoading ? 'Syncing' : error ? 'Attention' : 'Ready'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <ListOfAppointments
              appointments={appointments}
              isLoading={isLoading}
              error={error}
            />
          </main>
        </div>
      </section>
    )
  }

  if (!isAuthResolved) {
    return (
      <section className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading session...
      </section>
    )
  }

  return user === undefined ? null : (
    <section className="min-h-dvh bg-zinc-950 px-5 py-5 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(255,255,255,0.04),transparent_24%)]"></div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row">
        <AsideAdminPanel totalAppointments={appointments.length} />
        <main className="flex-1 space-y-5">
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                  Overview
                </span>
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold text-white">
                    Minimal admin dashboard
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-zinc-400">
                    Keep track of daily bookings and client requests with a
                    quieter interface.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                    Today
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {todayAppointments}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                    Status
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {isLoading ? 'Syncing' : error ? 'Attention' : 'Ready'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ListOfAppointments
            appointments={appointments}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </section>
  )
}

export default AdminPanel
