import ServiceContainer from './ServiceContainer'
import ServiceDescription from './ServiceDescription'
import services from '../../assets/json/services.json'
import Beard from '../../assets/images/beard.webp'
import Haircut from '../../assets/images/haircut.webp'
import Eyebrow from '../../assets/images/eyebrow.webp'
import { WithMarginWrapper } from '../WithMarginWrapper'

const descImages = [Haircut, Beard, Eyebrow]

function isOddIndex(index: number) {
  return index % 2 !== 0
}

const BusinessServices = () => {
  return (
    <WithMarginWrapper>
      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-6 px-0 sm:mt-12 lg:mt-14 lg:gap-8">
        {services.map((service, index) => {
          return (
            <ServiceContainer reversed={isOddIndex(index)} key={index}>
              <ServiceDescription
                descHeading={service.descHeading}
                descParagraph={service.descParagraph}
                reversed={isOddIndex(index)}
                descImage={descImages[index]}
              ></ServiceDescription>
            </ServiceContainer>
          )
        })}
      </div>
    </WithMarginWrapper>
  )
}

export default BusinessServices
