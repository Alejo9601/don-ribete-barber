import { ReactNode } from 'react'

export function WithMarginWrapper({
  children,
  customClasses = ''
}: {
  children: ReactNode
  customClasses?: string
}) {
  return (
    <section
      className={`px-5 sm:px-6 md:px-10 lg:px-12 xl:px-20 2xl:px-28 ${customClasses}`}
    >
      {children}
    </section>
  )
}
