import ServiceContainer from './ServiceContainer'
import ServiceDescription from './ServiceDescription'
import services from '../../assets/json/services.json'
import Beard from '../../assets/images/beard.webp'
import Haircut from '../../assets/images/haircut.webp'
import Eyebrow from '../../assets/images/eyebrow.webp'

const descImages = [Haircut, Beard, Eyebrow]

function isOddIndex(index: number) {
  return index % 2 !== 0
}

const BusinessServices = () => {
  return (
    <>
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
    </>
  )
}

export default BusinessServices
