const AsideAdminPanel = () => {
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
      </ul>
    </aside>
  )
}

export default AsideAdminPanel
