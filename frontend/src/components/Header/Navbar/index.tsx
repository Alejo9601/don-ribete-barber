import { Link } from 'wouter'
import { useState } from 'react'
import SectionLink from './SectionLink'
import BurgerButtonSVG from '../../SVGIcons/BurgerButtonSVG'

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)

  function handleBurgerButton() {
    setShowNav((prev) => !prev)
  }

  return (
    <nav className="flex w-fit items-center">
      <button className="lg:hidden" onClick={handleBurgerButton}>
        <BurgerButtonSVG></BurgerButtonSVG>
      </button>
      <ul
        className={`${!showNav ? 'hidden' : 'flex'} absolute right-0 top-0 z-[4] h-screen w-dvw flex-col items-center justify-center bg-stone-950/95 lg:relative lg:flex lg:h-fit lg:w-fit lg:flex-row lg:gap-10 lg:bg-transparent`}
      >
        <SectionLink refTo="/home">Inicio</SectionLink>
        <SectionLink refTo="/gallery">Nuestro trabajo</SectionLink>
        <SectionLink>Contacto</SectionLink>
        <li className="mt-4 lg:hidden">
          <Link
            href="/admin-panel/home"
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-200 transition hover:border-sky-300/40 hover:text-sky-300"
          >
            Admin
          </Link>
        </li>
        {/* <SectionLink>Acerca de</SectionLink> */}
      </ul>
    </nav>
  )
}

export default Navbar
