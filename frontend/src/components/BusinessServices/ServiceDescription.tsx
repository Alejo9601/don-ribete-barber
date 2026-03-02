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
      <div className="flex w-full lg:w-1/2 h-auto justify-center">
        <img
          className="object-cover object-center w-full h-full rounded-xl"
          src={descImage}
        />
      </div>
      <div
        className={`flex flex-col w-full lg:w-1/2 h-fit lg:h-full py-8 lg:py-0 text-white justify-center ${reversed ? 'items-end lg:pr-14' : 'items-start lg:pl-14'} `}
      >
        <h1 className="w-full text-center lg:text-start text-5xl font-bold">
          {descHeading}
        </h1>
        <p className="w-full text-center lg:text-start pt-5 text-xl text-slate-300">
          {descParagraph}
        </p>
      </div>
    </>
  )
}

export default ServiceDescription
