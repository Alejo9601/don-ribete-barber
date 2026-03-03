import CancelSVG from '../SVGIcons/CancelSVG'

export function ModalClosingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="absolute right-5 top-5 rounded-full border border-zinc-200 bg-white/90 p-2 text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
      onClick={onClick}
    >
      <CancelSVG></CancelSVG>
    </button>
  )
}
