import { ReactNode } from 'react'

const Button = ({
  additionalProps = '',
  children,
  onClick
}: {
  additionalProps?: string
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-stone-200 ${additionalProps}`}
    >
      {children}
    </button>
  )
}

export default Button
