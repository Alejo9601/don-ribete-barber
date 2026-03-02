import CreatorsLogo from '../SVGIcons/CreatorsLogo'
import SocialNetworks from '../SocialNetworks'

const Footer = () => {
  return (
    <footer className="w-full h-80 flex flex-col items-center justify-center bg-slate-900">
      <SocialNetworks onHeader={false}></SocialNetworks>
      <div className="flex flex-col">
        <p className="text-white pb-3 pt-5">Designed and built by</p>
        <CreatorsLogo></CreatorsLogo>
      </div>
    </footer>
  )
}

export default Footer
