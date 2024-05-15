import Button from '../Button'
import BackgroundDotsSVG from '../SVGIcons/BackgroundDotsSVG'

export function PreFooter() {
  return (
    <section className="bg-black relative my-20 overflow-hidden">
      <div className="flex flex-col gap-5 py-28 items-center justify-center bg-orange-700 z-[2]">
        <h2 className="font-extrabold text-white text-7xl z-[2]">
          Reserva tu turno ahora
        </h2>
        <p className="text-slate-950 text-2xl font-semibold z-[2]">
          ¡ Tenemos los mejores precios !
        </p>
        <Button onClick={() => {}} additionalProps="text-xl z-[2]">
          Reservar
        </Button>
      </div>
      <BackgroundDotsSVG />
      <div className="bg-slate-800 h-28 w-1/3 absolute right-0 top-0 rounded-bl-xl"></div>
    </section>
  )
}
