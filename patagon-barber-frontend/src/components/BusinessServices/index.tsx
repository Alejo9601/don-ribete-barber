import ServiceContainer from './ServiceContainer'
import ServiceDescription from './ServiceDescription'
import services from '../../assets/json/services.json'

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
              descImage={service.descImage}
            ></ServiceDescription>
          </ServiceContainer>
        )
      })}
    </>
  )
}

export default BusinessServices
