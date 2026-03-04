const ServiceDescription = ({
  descHeading,
  descParagraph,
  reversed,
  descImage
}: {
  descHeading: string
  descParagraph: string
  reversed?: boolean
  descImage: string
}) => {
  return (
    <>
      <div className="flex h-[14rem] w-full shrink-0 overflow-hidden rounded-[1.35rem] sm:h-[16rem] sm:rounded-[1.5rem] lg:h-full lg:w-[24rem]">
        <img
          className="h-full w-full object-cover object-center"
          src={descImage}
          alt={descHeading}
        />
      </div>
      <div
        className={`flex h-full w-full min-w-0 flex-col justify-center px-2 py-4 text-white lg:flex-1 lg:px-6 lg:py-0 ${reversed ? 'items-start lg:pr-14' : 'items-start lg:pl-14'} `}
      >
        <h1 className="w-full max-w-xl text-start text-2xl font-semibold sm:text-3xl md:text-4xl">
          {descHeading}
        </h1>
        <p className="w-full max-w-xl pt-3 text-sm leading-6 text-stone-400 sm:pt-4 sm:text-base md:text-lg md:leading-7">
          {descParagraph}
        </p>
      </div>
    </>
  )
}

export default ServiceDescription
