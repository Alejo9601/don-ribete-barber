import { Link } from 'wouter'

const SectionLink = ({
  children,
  refTo = ''
}: {
  children: string
  refTo?: string
}) => {
  return (
    <li className="text-white text-2xl lg:text-lg p-5 cursor-pointer hover:text-cyan-600 transition">
      <Link href={refTo}>{children}</Link>
    </li>
  )
}

export default SectionLink
