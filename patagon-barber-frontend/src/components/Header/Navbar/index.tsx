import { useState } from 'react'
import SectionLink from './SectionLink'
import BurgerButtonSVG from '../../SVGIcons/BurgerButtonSVG'

const Navbar = () => {
  const [showNav, setShowNav] = useState<boolean>()

  function handleBurgerButton() {
    setShowNav((prev) => !prev)
  }

  return (
    <nav className="w-fit mx-14 lg:mx-0 flex items-center">
      <button onClick={handleBurgerButton}>
        <BurgerButtonSVG></BurgerButtonSVG>
      </button>
      <ul
        className={`${!showNav ? 'hidden' : 'flex'} absolute lg:relative bg-slate-900 lg:bg-transparent z-[4] lg:z-0 top-0 w-dvw lg:w-fit h-screen lg:h-fit right-0 flex-col items-center justify-center lg:flex lg:flex-row`}
      >
        <SectionLink>Acerca de</SectionLink>
        <SectionLink refTo="/gallery">Galeria de Cortes</SectionLink>
        <SectionLink>Contacto</SectionLink>
      </ul>
    </nav>
  )
}

export default Navbar
