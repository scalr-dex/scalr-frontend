import DotsLoader from 'components/DotsLoader'
import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { Header2 } from 'components/icons/Text'

export default function ({ amount }: { amount?: number | undefined }) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <ScalrCoin size={28} />
      <Header2>{typeof amount === 'number' ? amount : <DotsLoader />}</Header2>
    </div>
  )
}
