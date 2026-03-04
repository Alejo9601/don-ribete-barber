import CreatorsLogo from '../SVGIcons/CreatorsLogo'
import SocialNetworks from '../SocialNetworks'

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-5 bg-slate-900 px-6 py-6 text-center sm:px-8">
      <SocialNetworks onHeader={false}></SocialNetworks>
      <div className="flex flex-col items-center">
        <p className="pb-3 text-white">Diseñado y desarrollado por</p>
        <CreatorsLogo></CreatorsLogo>
      </div>
    </footer>
  )
}

export default Footer
