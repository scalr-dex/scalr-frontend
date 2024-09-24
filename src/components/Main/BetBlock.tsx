import SelectBetRangeInput from 'components/Main/SelectBetRangeInput'
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
import DailyClaim from 'components/Main/DailyClaim'
import Points from 'components/Main/Points'
import Timer from 'components/Main/Timer'
import { GraphTokenValue } from 'type/TokenState'
import formatUSA from 'helpers/formatters/formatUSA'
import BoostPoints from 'components/Main/BoostPoints'

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

  const disabled = betValue <= 0 || loading || processingBet || !user?.balance

  useEffect(() => {
    // in case app reloads and timeout vanishes
    if (userBet && userBet.endTime < Date.now()) setUserBet(null)
  }, [setUserBet, userBet])

  useEffect(() => {
    setBetValue(Math.round((user?.balance || 0) / 2))
  }, [user?.balance])

  const onClick = useCallback(
    async (direction: BetDirection) => {
      if (!roundStart || !user || user.balance === undefined) return

      setProcessingBet(true)
      const bet = { amount: betValue, direction }

      setUserBet({
        ...bet,
        value: roundStart,
        endTime: roundStart[0] + roundDurationMs,
      })

      const success = await placeBet(bet)
      setProcessingBet(false)
      if (!success) setUserBet(null)
      setTimeout(() => setUserBet(null), roundDurationMs)
    },
    [betValue, roundStart, setUserBet, user]
  )

  return (
    <div className="flex flex-col px-4 gap-y-5">
      <div className="flex flex-row justify-between items-center">
        <Points amount={user?.balance} />
        <div className="flex flex-row gap-x-2 items-center">
          <BoostPoints />
          <DailyClaim claimAmount={user?.canClaimAmount} />
        </div>
      </div>

      <div className="h-28">
        {userBet ? (
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center justify-between">
              <BodyText>You'll get result in</BodyText>
              <Timer endTime={userBet.endTime} />
            </div>
            <BodyText>
              You bet <b>{formatUSA(userBet.amount)} pts</b>
            </BodyText>
            <BodyText>
              That price will go{' '}
              <b>{userBet.direction ? 'lower 📉' : 'higher 📈'}</b>
            </BodyText>
          </div>
        ) : (
          <div className="flex flex-col gap-y-5">
            <SelectBetRangeInput
              userBalance={user?.balance}
              value={betValue}
              setValue={setBetValue}
              disabled={loading || !!userBet || !user?.balance}
            />
            <div className="flex flex-row gap-x-1">
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
          </div>
        )}
      </div>
    </div>
  )
}
