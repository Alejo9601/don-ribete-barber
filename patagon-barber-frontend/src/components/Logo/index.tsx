import logo from '../../../public/logo.png'

export default function Logo() {
  return (
    <div className="flex  items-center px-14 py-2 bg-black">
      <img className="w-16 lg:w-24 h-auto" src={logo} alt="Page logo" />
    </div>
  )
}
