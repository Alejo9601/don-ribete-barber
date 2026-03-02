import Logo from '../Logo'
import Navbar from './Navbar'
import SocialNetworks from '../SocialNetworks'

export default function Header() {
  return (
    <header className="flex justify-between w-full items-center relative">
      <Logo></Logo>
      <Navbar></Navbar>
      <SocialNetworks onHeader={true}></SocialNetworks>
    </header>
  )
}
