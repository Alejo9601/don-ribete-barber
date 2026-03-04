import CancelSVG from '../SVGIcons/CancelSVG'

export function ModalClosingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="absolute right-4 top-4 rounded-full border border-zinc-200 bg-white/90 p-2 text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 sm:right-5 sm:top-5"
      onClick={onClick}
    >
      <CancelSVG></CancelSVG>
    </button>
  )
}
