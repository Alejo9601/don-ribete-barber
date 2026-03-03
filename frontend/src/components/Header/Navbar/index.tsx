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
        <SectionLink>Acerca de</SectionLink>
        <SectionLink refTo="/gallery">Galeria de Cortes</SectionLink>
        <SectionLink>Contacto</SectionLink>
      </ul>
    </nav>
  )
}

export default Navbar
