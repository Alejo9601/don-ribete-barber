import { useLocation } from 'wouter'
import { useUser } from '../hooks/useUser'
import AsideAdminPanel from '../components/AsideAdminPanel'
import ListOfAppointments from '../components/ListOfAppointments'

const AdminPanel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, navigate] = useLocation()
  const { user } = useUser()

  return (
    <>
      {user === undefined ? (
        navigate('/admin-panel/login', { replace: true })
      ) : (
        <section className="flex flex-col h-screen">
          <header className="w-full flex items-center bg-slate-950">
            <h1 className="w-full text-3xl text-white text-right px-8 py-5">
              Admin Panel
            </h1>
          </header>
          <main className="flex-auto flex overflow-hidden">
            <AsideAdminPanel></AsideAdminPanel>
            <ListOfAppointments></ListOfAppointments>
          </main>
        </section>
      )}
    </>
  )
}

export default AdminPanel
