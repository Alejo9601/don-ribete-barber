import Logo from '../Logo'
import Navbar from './Navbar'
import SocialNetworks from '../SocialNetworks'

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <Logo></Logo>
      <Navbar></Navbar>
      <SocialNetworks onHeader={true}></SocialNetworks>
    </header>
  )
}
