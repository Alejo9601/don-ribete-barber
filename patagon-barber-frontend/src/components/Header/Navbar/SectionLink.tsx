// import { Link } from 'wouter';

const SectionLink = ({ children }: { children: string }) => {
  return (
    <a className="text-white text-2xl lg:text-lg p-5 cursor-pointer">
      {children}
    </a>
  )
}

export default SectionLink
