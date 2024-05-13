import ClickableListItem from '../ClickableListItem'
import Facebook from '../SVGIcons/Facebook'
import Instagram from '../SVGIcons/Instagram'
import WhatsApp from '../SVGIcons/WhatsApp'

export default function SocialNetworks({ onHeader }: { onHeader: boolean }) {
  return (
    <ul
      className={`${onHeader ? 'hidden lg:flex' : 'flex'} h-7 gap-5 w-fit px-14`}
    >
      <ClickableListItem>
        <Facebook></Facebook>
      </ClickableListItem>
      <ClickableListItem>
        <Instagram></Instagram>
      </ClickableListItem>
      <ClickableListItem>
        <WhatsApp></WhatsApp>
      </ClickableListItem>
    </ul>
  )
}
