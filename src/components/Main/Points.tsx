import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { Header2 } from 'components/icons/Text'

export default function () {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <ScalrCoin size={28} />
      <Header2>15,340</Header2>
    </div>
  )
}
