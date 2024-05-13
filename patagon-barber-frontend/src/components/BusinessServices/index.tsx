import ServiceContainer from './ServiceContainer'
import ServiceDescription from './ServiceDescription'
import cut1 from '../../assets/images/cut1.webp'
import cut2 from '../../assets/images/cut2.webp'
import cut3 from '../../assets/images/cut3.webp'

const cutImages = [cut1, cut2, cut3]

function isOddIndex(index: number) {
  return index % 2 !== 0
}

const BusinessServices = () => {
  return (
    <>
      {cutImages.map((cutImage, index) => {
        return (
          <ServiceContainer reversed={isOddIndex(index)} key={index}>
            <ServiceDescription
              reversed={isOddIndex(index)}
              descImage={cutImage}
            ></ServiceDescription>
          </ServiceContainer>
        )
      })}
    </>
  )
}

export default BusinessServices
