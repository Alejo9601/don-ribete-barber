import { ReactNode } from 'react'

export function WithMarginWrapper({
  children,
  customClasses = ''
}: {
  children: ReactNode
  customClasses?: string
}) {
  return (
    <section className={`px-14 md:px-40 lg:px-32 xl:px-52 ${customClasses}`}>
      {children}
    </section>
  )
}
