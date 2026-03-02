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
      className={`py-2 px-5 mt-8 bg-cyan-600 text-white ${additionalProps} font-bold rounded-md`}
    >
      {children}
    </button>
  )
}

export default Button
