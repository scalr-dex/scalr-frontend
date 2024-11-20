import BattleTicketButton from 'components/BattleTicketButton'
import DotsLoader from 'components/DotsLoader'
import TonCoin from 'components/icons/coins/TonCoin'
import DocumentPaper from 'components/icons/DocumentPaper'
import StonksArrow from 'components/icons/StonksArrow'
import DailyStreakButton from 'components/Tasks/DailyStreakButton'
import { Header2, Header4 } from 'components/Text'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import { specialOfferDisabledAtom, userBetAtom } from 'helpers/atoms/UserAtom'
import { useAtomValue, useSetAtom } from 'jotai'
import MotionNumber from '@number-flow/react'
import SpecialOffer from 'components/icons/SpecialOffer'

export default function ({ price }: { price?: number }) {
  const { expired, userBoughtExpired } = useAtomValue(specialOfferDisabledAtom)
  const setModal = useSetAtom(modalsAtom)
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
          <span>
            <Header4 className="inline">$</Header4>
            <Header2 className="inline">
              {price ? (
                <MotionNumber
                  value={price}
                  format={{ minimumFractionDigits: 4 }}
                />
              ) : (
                <DotsLoader />
              )}
            </Header2>
          </span>
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

      <div className="flex flex-col items-end">
        <div className="flex flex-row items-center gap-x-2 h-8">
          <DocumentPaper
            size={20}
            onClick={() => setModal(AvailableModals.season1stats)}
          />
          <DailyStreakButton small />
          <BattleTicketButton small />
        </div>
        {expired && userBoughtExpired ? null : (
          <SpecialOffer
            onClick={() => setModal(AvailableModals.specialOffer)}
          />
        )}
      </div>
    </div>
  )
}
