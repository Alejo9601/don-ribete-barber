import logo from '../../assets/images/logo.png'

export default function Logo() {
  return (
    <div className="flex  items-center px-14 py-2">
      <img className="w-20 h-auto" src={logo} alt="Page logo" />
      {/* <h1 className="text-white text-xl font-bold leading-none">
        Patagon Barber
      </h1> */}
    </div>
  )
}
