import { useEffect, useState } from 'react'
import VisitorsGeneralLayout from '../Layouts/VisitorsGeneralLayout'
import { WithMarginWrapper } from '../components/WithMarginWrapper'
import haircutImage from '../assets/images/haircut.webp'
import beardImage from '../assets/images/beard.webp'
import eyebrowImage from '../assets/images/eyebrow.webp'
import coverImage from '../assets/images/cover.webp'

const galleryItems = [
  {
    title: 'Fade',
    subtitle: 'Laterales limpios y transicion marcada',
    image: haircutImage,
    mediaHeightClassName: 'h-[28rem] md:h-[34rem]',
    imageClassName: 'object-center'
  },
  {
    title: 'Textura',
    subtitle: 'Trabajo arriba con peso y forma',
    image: coverImage,
    mediaHeightClassName: 'h-[16rem] md:h-[18rem]',
    imageClassName: 'object-center'
  },
  {
    title: 'Barba',
    subtitle: 'Perfilado corto y definicion precisa',
    image: beardImage,
    mediaHeightClassName: 'h-[22rem] md:h-[26rem]',
    imageClassName: 'object-center'
  },
  {
    title: 'Detalle',
    subtitle: 'Terminacion fina para cerrar el corte',
    image: eyebrowImage,
    mediaHeightClassName: 'h-[15rem] md:h-[17rem]',
    imageClassName: 'object-center'
  },
  {
    title: 'Perfil',
    subtitle: 'Volumen controlado y contorno prolijo',
    image: haircutImage,
    mediaHeightClassName: 'h-[18rem] md:h-[20rem]',
    imageClassName: 'object-top'
  },
  {
    title: 'Acabado',
    subtitle: 'Un resultado limpio, sobrio y definido',
    image: beardImage,
    mediaHeightClassName: 'h-[26rem] md:h-[31rem]',
    imageClassName: 'object-center'
  }
]

export function Gallery() {
  const [previewItem, setPreviewItem] = useState<(typeof galleryItems)[number] | null>(
    null
  )

  useEffect(() => {
    if (previewItem === null) {
      return
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setPreviewItem(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [previewItem])

  return (
    <VisitorsGeneralLayout>
      <main className="bg-stone-100 py-8 text-zinc-900 md:py-14">
        <WithMarginWrapper customClasses="space-y-8">
          <section className="border-b border-zinc-300 pb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.38em] text-zinc-500">
                  Nuestro trabajo
                </p>
                <h1 className="mt-3 text-3xl font-semibold uppercase tracking-[0.05em] md:text-5xl">
                  Galeria de ribetes
                </h1>
              </div>
              <p className="max-w-md text-sm leading-6 text-zinc-600 md:text-right">
                Una seleccion visual enfocada en mostrar nuestros mejores
                cortes.
              </p>
            </div>
          </section>

          <section className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {galleryItems.map((item) => {
              return (
                <article
                  key={`${item.title}-${item.subtitle}`}
                  className="group mb-4 break-inside-avoid overflow-hidden bg-white p-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
                >
                  <div className="flex flex-col">
                    <div
                      className={`overflow-hidden bg-zinc-200 ${item.mediaHeightClassName}`}
                    >
                      <button
                        type="button"
                        className="block h-full w-full cursor-pointer"
                        onClick={() => setPreviewItem(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`h-full w-full object-cover saturate-[0.85] transition duration-700 ease-out group-hover:scale-[1.06] group-hover:-translate-y-1 group-hover:saturate-100 group-hover:contrast-105 ${item.imageClassName}`}
                        />
                      </button>
                    </div>
                    <div className="border-t border-zinc-200 px-1 pb-1 pt-3">
                      <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-700">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        </WithMarginWrapper>
      </main>
      {previewItem ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-3 py-4 sm:px-4 sm:py-8 md:items-center"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden bg-white p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black sm:right-4 sm:top-4 sm:text-xs sm:tracking-[0.2em]"
              onClick={() => setPreviewItem(null)}
            >
              Cerrar
            </button>
            <div className="max-h-[78vh] overflow-hidden bg-zinc-200">
              <img
                src={previewItem.image}
                alt={previewItem.title}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>
            <div className="border-t border-zinc-200 px-2 pb-1 pt-4">
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">
                {previewItem.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                {previewItem.subtitle}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </VisitorsGeneralLayout>
  )
}
