const ServiceContainer = ({
  children,
  reversed
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  reversed: boolean
}) => {
  return (
    <article className="service flex translate-y-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 opacity-0 blur-[6px] transition-[opacity,transform,filter] duration-700 ease-out will-change-transform">
      <div
        className={`flex h-fit w-full min-w-0 flex-col gap-6 ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} lg:h-[320px] lg:items-stretch`}
      >
        {children}
      </div>
    </article>
  )
}

export default ServiceContainer
