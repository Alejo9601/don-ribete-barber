const Button = ({
  additionalProps = '',
  children,
  onClick
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalProps?: string
  children: any
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
