import VisitorsGeneralLayout from '../Layouts/VisitorsGeneralLayout'
import { WithMarginWrapper } from '../components/WithMarginWrapper'

const testArray = [1, 1, 1, 1, 1, 1, 1, 1, 1]

export function Gallery() {
  return (
    <VisitorsGeneralLayout>
      <WithMarginWrapper customClasses="py-20">
        <div className="grid grid-cols-3 gap-4 bg-black">
          {testArray.map((number, index) => {
            return (
              <div
                key={index}
                className="bg-white w-full h-80 rounded-xl"
              ></div>
            )
          })}
        </div>
      </WithMarginWrapper>
    </VisitorsGeneralLayout>
  )
}
