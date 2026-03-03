import ClickableListItem from '../ClickableListItem'
import Facebook from '../SVGIcons/Facebook'
import Instagram from '../SVGIcons/Instagram'
import WhatsApp from '../SVGIcons/WhatsApp'

export default function SocialNetworks({ onHeader }: { onHeader: boolean }) {
  return (
    <ul
      className={`${onHeader ? 'hidden lg:flex' : 'flex'} h-7 w-fit gap-4 text-stone-400`}
    >
      <ClickableListItem>
        <a href="" target="_blank">
          <Facebook></Facebook>
        </a>
      </ClickableListItem>
      <ClickableListItem>
        <a
          href="https://www.instagram.com/barberia_chicosdelbarrio28_/"
          target="_blank"
        >
          <Instagram></Instagram>
        </a>
      </ClickableListItem>
      <ClickableListItem>
        <a href="https://wa.me/5492966384685" target="_blank">
          <WhatsApp></WhatsApp>
        </a>
      </ClickableListItem>
    </ul>
  )
}
