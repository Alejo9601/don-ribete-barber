import logo from '../../../public/logo.png'

export default function Logo() {
  return (
    <div className="flex items-center">
      <img className="h-auto w-14 lg:w-20" src={logo} alt="Page logo" />
    </div>
  )
}
