import DotsLoader from 'components/DotsLoader'
import TonCoin from 'components/icons/coins/TonCoin'
import StonksArrow from 'components/icons/StonksArrow'
import { Header2, Header4 } from 'components/icons/Text'
import Timer from 'components/Main/Timer'
import CountUp from 'react-countup'

export default function ({
  price,
  roundStartPrice,
}: {
  price?: number
  roundStartPrice?: number | undefined
}) {
  const delta = price && roundStartPrice ? price - roundStartPrice : 0
  const isPositive = delta >= 0

  const textColor = isPositive ? 'text-success' : 'text-error'

  return (
    <div className="flex flex-col gap-y-1 justify-start w-full px-4 pt-2">
      <div className="flex flex-row gap-x-1 items-center">
        <TonCoin size={20} />
        <span className="text-white text-opacity-50">TON-USD, 30s round</span>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Header2>
            <Header4 className="inline">$</Header4>
            {price ? (
              <CountUp
                end={price}
                decimal="."
                decimals={4}
                preserveValue
                duration={0.5}
              />
            ) : (
              <DotsLoader />
            )}
          </Header2>
          <div
            className={`flex flex-row gap-x-2 items-center font-semibold ${textColor}`}
          >
            <StonksArrow size={9} rotate={isPositive ? 0 : 90} />{' '}
            {Math.abs(delta).toFixed(3)}
          </div>
        </div>

        <Timer />
      </div>
    </div>
  )
}
