import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { Header2 } from 'components/Text'
import CountUp from 'react-countup'

export default function ({ amount = 0 }: { amount?: number | undefined }) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <ScalrCoin size={28} />
      <Header2>
        <CountUp end={amount} preserveValue duration={1} />
      </Header2>
    </div>
  )
}
