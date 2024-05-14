import CancelSVG from '../SVGIcons/CancelSVG'

export function ModalClosingButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="self-end cursor-pointer" onClick={onClick}>
      <CancelSVG></CancelSVG>
    </div>
  )
}
