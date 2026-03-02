import { useLocation } from 'wouter'
import { useUser } from '../../hooks/useUser'

const AsideAdminPanel = () => {
  const [, navigate] = useLocation()
  const { logout } = useUser()

  async function handleLogout() {
    await logout()
    navigate('/admin-panel/login', { replace: true })
  }

  return (
    <aside className="w-1/4 bg-blue-950">
      <ul className="w-full">
        <li className="w-full">
          <button className="text-white text-left p-8 font-bold w-full py-4 text-xl hover:bg-cyan-200 hover:text-black">
            Appointments
          </button>
        </li>
        <li className="w-full">
          <button className="text-white text-left p-8 font-bold w-full py-4 text-xl hover:bg-cyan-200 hover:text-black">
            Gallery
          </button>
        </li>
        <li className="w-full">
          <button className="text-white text-left p-8 font-bold w-full py-4 text-xl hover:bg-cyan-200 hover:text-black">
            Prices
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={handleLogout}
            className="text-white text-left p-8 font-bold w-full py-4 text-xl hover:bg-red-200 hover:text-black"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default AsideAdminPanel
