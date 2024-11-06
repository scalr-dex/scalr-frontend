import Button from 'components/Button'
import StonksArrow from 'components/icons/StonksArrow'
import ButtonTypes from 'type/Button'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import UserAtom, { userBalanceAtom, userBetAtom } from 'helpers/atoms/UserAtom'
import placeBet from 'helpers/api/placeBet'
import BetDirection from 'type/BetDirection'
import { BodyText } from 'components/Text'
import { roundDurationMs } from 'helpers/atoms/priceHistoryAtom'
import Timer from 'components/Main/Timer'
import { GraphTokenValue } from 'type/TokenState'
import Points from 'components/Main/Points'
import BetEnergy from 'components/Main/BetEnergy'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import LevelUpgrade from 'components/Main/LevelUpgrade'
import DailyClaim from 'components/Main/DailyClaim'

export default function ({
  loading,
  roundStart,
}: {
  loading?: boolean
  roundStart: GraphTokenValue | undefined
}) {
  const [user, setUser] = useAtom(UserAtom)
  const userBalance = useAtomValue(userBalanceAtom)
  const [userBet, setUserBet] = useAtom(userBetAtom)
  const [processingBet, setProcessingBet] = useState(false)
  const setModal = useSetAtom(modalsAtom)

  const disabled = loading || processingBet || !userBalance

  useEffect(() => {
    // in case app reloads and timeout vanishes
    if (userBet && userBet.endTime < Date.now()) setUserBet(null)
  }, [setUserBet, userBet])

  const onBet = useCallback(
    async (direction: BetDirection) => {
      if (!roundStart || !user || !userBalance) return
      if (!user.betEnergy) {
        setModal(AvailableModals.betEnergyZero)
        return
      }

      setProcessingBet(true)

      const success = await placeBet({ direction })

      setProcessingBet(false)
      if (!success) {
        setUserBet(null)
        return
      }

      setUser({ ...user, betEnergy: user.betEnergy - 1 })
      setUserBet({
        direction,
        value: roundStart,
        endTime: roundStart[0] + roundDurationMs,
      })
      setTimeout(() => setUserBet(null), roundDurationMs)
    },
    [roundStart, user, userBalance, setUser, setUserBet, setModal]
  )

  return (
    <div className="flex flex-col h-28 gap-y-5 px-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-x-2">
          <Points amount={userBalance} />
          <LevelUpgrade />
          <BetEnergy betEnergy={user?.betEnergy} />
        </div>

        <DailyClaim />
      </div>
      {userBet ? (
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <BodyText>
              You bet{' '}
              {userBet.direction ? (
                <b className="text-error">DOWN</b>
              ) : (
                <b className="text-success">UP</b>
              )}
            </BodyText>
            <Timer endTime={userBet.endTime} className="w-16" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-x-3 w-full">
          <Button
            buttonType={ButtonTypes.success}
            iconLeft={<StonksArrow size={10} />}
            disabled={disabled || !!userBet}
            onClick={() => onBet(BetDirection.long)}
            className="border-2 border-white/50 py-2"
          >
            Higher
          </Button>
          <Button
            buttonType={ButtonTypes.error}
            iconLeft={<StonksArrow rotate={90} size={10} />}
            disabled={disabled || !!userBet}
            onClick={() => onBet(BetDirection.short)}
            className="border-2 border-white/50 py-2"
          >
            Lower
          </Button>
        </div>
      )}
    </div>
  )
}
