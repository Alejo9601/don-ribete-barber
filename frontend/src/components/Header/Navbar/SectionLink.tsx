import { Link } from 'wouter'

const SectionLink = ({
  children,
  refTo = ''
}: {
  children: string
  refTo?: string
}) => {
  return (
    <li className="cursor-pointer p-5 text-xl text-stone-200 transition hover:text-white lg:p-0 lg:text-sm lg:uppercase lg:tracking-[0.18em]">
      <Link href={refTo}>{children}</Link>
    </li>
  )
}

export default SectionLink
