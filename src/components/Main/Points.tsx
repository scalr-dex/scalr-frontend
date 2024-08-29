import ScalrCoin from 'components/icons/coins/ScalrCoin'
import { Header2 } from 'components/icons/Text'
import CountUp from 'react-countup'

export default function ({ amount }: { amount?: number | undefined }) {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <ScalrCoin size={28} />
      <Header2>
        {typeof amount === 'number' ? (
          <CountUp end={amount} preserveValue duration={1} />
        ) : (
          0
        )}
      </Header2>
    </div>
  )
}
