import BattleTicketButton from 'components/BattleTicketButton'
import DotsLoader from 'components/DotsLoader'
import TonCoin from 'components/icons/coins/TonCoin'
import StonksArrow from 'components/icons/StonksArrow'
import DailyStreakButton from 'components/Tasks/DailyStreakButton'
import { Header2, Header4 } from 'components/Text'
import { userBetAtom } from 'helpers/atoms/UserAtom'
import { useAtomValue } from 'jotai'
import MotionNumber from 'motion-number'

export default function ({ price }: { price?: number }) {
  const roundStartPrice = useAtomValue(userBetAtom)
  const shouldDisplayDelta = price && roundStartPrice?.value
  const delta = shouldDisplayDelta ? price - roundStartPrice.value[1] : 0
  const isPositive = delta >= 0

  const textColor = isPositive ? 'text-success' : 'text-error'
  const deltaString = Math.abs(delta).toFixed(3)

  return (
    <div className="flex flex-row justify-between w-full px-4 pt-2">
      <div className="flex flex-col gap-y-1 justify-start h-24">
        <div className="flex flex-row gap-x-1 items-center">
          <TonCoin size={20} />
          <span className="text-white text-opacity-50">TON-USD, 10s round</span>
        </div>

        <div className="flex flex-col">
          <Header2>
            <Header4 className="inline">$</Header4>
            {price ? (
              <MotionNumber
                value={price}
                format={{ minimumFractionDigits: 4 }}
              />
            ) : (
              <DotsLoader />
            )}
          </Header2>
          {shouldDisplayDelta ? (
            <div
              className={`flex flex-row gap-x-2 items-center font-semibold ${textColor}`}
            >
              <StonksArrow size={9} rotate={isPositive ? 0 : 90} />{' '}
              {deltaString === '0.000' ? '0.001' : deltaString}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-row gap-x-2 h-8">
        <DailyStreakButton small />
        <BattleTicketButton small />
      </div>
    </div>
  )
}
