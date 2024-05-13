const ServiceContainer = ({
  children,
  reversed
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  reversed: boolean
}) => {
  return (
    <section className="flex flex-col gap-12 px-20 lg:px-40 xl:px-60 service opacity-0">
      <div
        className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-fit lg:h-[400px]`}
      >
        {children}
      </div>
    </section>
  )
}

export default ServiceContainer
