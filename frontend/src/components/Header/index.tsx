import { Link } from 'wouter'
import Logo from '../Logo'
import Navbar from './Navbar'
import SocialNetworks from '../SocialNetworks'

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <Logo></Logo>
      <Navbar></Navbar>
      <div className="flex items-center gap-4">
        <Link
          href="/admin-panel/home"
          className="hidden rounded-full border border-white/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-300 transition hover:border-sky-300/40 hover:text-sky-300 lg:inline-flex"
        >
          Admin
        </Link>
        <SocialNetworks onHeader={true}></SocialNetworks>
      </div>
    </header>
  )
}
