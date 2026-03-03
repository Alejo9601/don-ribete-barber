import { useLocation } from 'wouter'
import { useUser } from '../../hooks/useUser'

export type AdminSection = 'appointments' | 'availability'

const navigationItems: Array<{ id: AdminSection; label: string }> = [
  { id: 'appointments', label: 'Appointments' },
  { id: 'availability', label: 'Availability' }
]

const AsideAdminPanel = ({
  totalAppointments,
  activeSection,
  onSectionChange
}: {
  totalAppointments: number
  activeSection: AdminSection
  onSectionChange: (section: AdminSection) => void
}) => {
  const [, navigate] = useLocation()
  const { logout } = useUser()

  async function handleLogout() {
    await logout()
    navigate('/admin-panel/login', { replace: true })
  }

  return (
    <aside className="flex w-full max-w-xs flex-col rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur lg:h-[calc(100dvh-2.5rem)] lg:sticky lg:top-5">
      <div className="space-y-3 border-b border-white/10 pb-5">
        <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          Patagon Barber
        </span>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">Admin dashboard</h2>
          <p className="text-sm leading-6 text-zinc-400">
            Manage appointments from a single minimalist view.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">
          Total appointments
        </p>
        <p className="mt-3 text-4xl font-semibold text-white">
          {totalAppointments}
        </p>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSectionChange(item.id)}
            className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              activeSection === item.id
                ? 'bg-white text-zinc-950'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-5">
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-medium text-zinc-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-100"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default AsideAdminPanel
