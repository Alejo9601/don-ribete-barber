import VisitorsGeneralLayout from '../Layouts/VisitorsGeneralLayout'
import { WithMarginWrapper } from '../components/WithMarginWrapper'
import haircutImage from '../assets/images/haircut.webp'
import beardImage from '../assets/images/beard.webp'
import eyebrowImage from '../assets/images/eyebrow.webp'
import coverImage from '../assets/images/cover.webp'

const featuredCuts = [
  {
    title: 'Fade prolijo',
    description: 'Laterales limpios, textura arriba y un acabado sobrio.',
    image: haircutImage,
    imageClassName: 'md:col-span-2 md:row-span-2'
  },
  {
    title: 'Barba perfilada',
    description: 'Definicion corta y contornos precisos para cerrar el look.',
    image: beardImage,
    imageClassName: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Detalle final',
    description: 'Cejas y terminacion para que el corte quede completo.',
    image: eyebrowImage,
    imageClassName: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Ambiente',
    description: 'Una estetica de barrio, oscura y directa.',
    image: coverImage,
    imageClassName: 'md:col-span-2 md:row-span-1'
  }
]

export function Gallery() {
  return (
    <VisitorsGeneralLayout>
      <main className="bg-black py-16 text-white md:py-24">
        <WithMarginWrapper customClasses="space-y-12">
          <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] md:p-10">
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                Galeria
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Cortes reales, sin maqueta.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-300 md:text-lg">
                Una seleccion corta de estilos y terminaciones para mostrar el
                tipo de trabajo que sale del local: limpio, contrastado y bien
                definido.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm uppercase tracking-[0.18em] text-zinc-400">
                <span className="rounded-full border border-white/10 px-4 py-2">
                  Fade
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2">
                  Barba
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2">
                  Perfilado
                </span>
              </div>
            </div>
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-white/10">
              <img
                src={coverImage}
                alt="Interior de la barberia"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
                  Patagon Barber
                </p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-200">
                  El mismo tono del local llevado a la galeria: oscuro, simple y
                  sin ruido visual.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:auto-rows-[15rem] md:grid-cols-3">
            {featuredCuts.map((item) => {
              return (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 ${item.imageClassName}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h2 className="text-2xl font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-zinc-200">
                      {item.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </section>
        </WithMarginWrapper>
      </main>
    </VisitorsGeneralLayout>
  )
}
