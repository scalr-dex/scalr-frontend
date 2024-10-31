import Button from 'components/Button'
import StonksArrow from 'components/icons/StonksArrow'
import ButtonTypes from 'type/Button'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { useAtom, useAtomValue } from 'jotai'
import UserAtom, { userBetAtom } from 'helpers/atoms/UserAtom'
import placeBet from 'helpers/api/placeBet'
import BetDirection from 'type/BetDirection'
import { BodyText } from 'components/Text'
import { roundDurationMs } from 'helpers/atoms/priceHistoryAtom'
import Timer from 'components/Main/Timer'
import { GraphTokenValue } from 'type/TokenState'
import Points from 'components/Main/Points'
import ButtonSmall from 'components/ButtonSmall'
import Logo from 'components/icons/Logo'
import { navigate } from 'wouter-preact/use-hash-location'
import BetEnergy from 'components/Main/BetEnergy'

export default function ({
  loading,
  roundStart,
}: {
  loading?: boolean
  roundStart: GraphTokenValue | undefined
}) {
  const user = useAtomValue(UserAtom)
  const [userBet, setUserBet] = useAtom(userBetAtom)
  const [processingBet, setProcessingBet] = useState(false)
  const [betValue, setBetValue] = useState(0)

  const disabled =
    betValue <= 0 ||
    loading ||
    processingBet ||
    !user?.balance ||
    !user.betEnergy

  useEffect(() => {
    // in case app reloads and timeout vanishes
    if (userBet && userBet.endTime < Date.now()) setUserBet(null)
  }, [setUserBet, userBet])

  useEffect(() => {
    setBetValue(Math.round((user?.balance || 0) / 2))
  }, [user?.balance])

  const onClick = useCallback(
    async (direction: BetDirection) => {
      if (!roundStart || !user || !user.balance || !user.betEnergy) return

      setProcessingBet(true)
      const bet = { amount: betValue, direction }

      const success = await placeBet(bet)

      setProcessingBet(false)
      if (!success) {
        setUserBet(null)
        return
      }

      setUserBet({
        ...bet,
        value: roundStart,
        endTime: roundStart[0] + roundDurationMs,
      })
      setTimeout(() => setUserBet(null), roundDurationMs)
    },
    [betValue, roundStart, setUserBet, user]
  )

  return (
    <div className="flex flex-col h-28 gap-y-5 px-4">
      <div className="flex flex-row items-center justify-between">
        <Points amount={user?.balance} />

        <div className="flex flex-row gap-x-2.5 items-center">
          <BetEnergy betEnergy={user?.betEnergy} />
          <ButtonSmall
            buttonType={ButtonTypes.secondary}
            iconRight={<Logo size={20} />}
            className="pr-2 pl-3 py-1"
            onClick={() => navigate('/tasks')}
          >
            Get
          </ButtonSmall>
        </div>
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
        <div className="flex flex-row gap-x-1 w-full">
          <Button
            buttonType={ButtonTypes.success}
            iconRight={<StonksArrow size={16} />}
            disabled={disabled || !!userBet}
            onClick={() => onClick(BetDirection.long)}
          >
            Higher
          </Button>
          <Button
            buttonType={ButtonTypes.error}
            iconRight={<StonksArrow rotate={90} size={16} />}
            disabled={disabled || !!userBet}
            onClick={() => onClick(BetDirection.short)}
          >
            Lower
          </Button>
        </div>
      )}
    </div>
  )
}
