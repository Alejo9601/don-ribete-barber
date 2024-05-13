const Button = ({
  children,
  onClick
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-5 mt-8 bg-cyan-600 text-white font-bold rounded-md "
    >
      {children}
    </button>
  )
}

export default Button
