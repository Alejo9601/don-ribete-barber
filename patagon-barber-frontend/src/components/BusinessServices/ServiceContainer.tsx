import { WithMarginWrapper } from '../WithMarginWrapper'

const ServiceContainer = ({
  children,
  reversed
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  reversed: boolean
}) => {
  return (
    <article className="flex service opacity-0">
      <div
        className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-fit lg:h-[400px]`}
      >
        {children}
      </div>
    </article>
  )
}

export default ServiceContainer
