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

export default function ({
  loading,
  roundStartTime,
}: {
  loading?: boolean
  roundStartTime: number | undefined
}) {
  const user = useAtomValue(UserAtom)
  const [userBet, setUserBet] = useAtom(userBetAtom)
  const [processingBet, setProcessingBet] = useState(false)
  const [betValue, setBetValue] = useState(0)

  const disabled = betValue <= 0 || loading || processingBet || !user?.balance

  useEffect(() => {
    if (!userBet) return
    if (userBet.endTime < Date.now()) setUserBet(null)
  }, [setUserBet, userBet])

  useEffect(() => {
    setBetValue(Math.round((user?.balance || 0) / 2))
  }, [user?.balance])

  const onClick = useCallback(
    async (direction: BetDirection) => {
      if (!roundStartTime || !user?.balance) return

      setProcessingBet(true)
      const bet = { amount: betValue, direction }

      const roundEndTime = roundStartTime + roundDurationMs
      const untilEnd = roundEndTime - Date.now()
      const endTime = untilEnd + Date.now() + roundDurationMs

      const success = await placeBet(bet)
      setProcessingBet(false)

      if (success)
        setUserBet({
          ...bet,
          startTime: roundEndTime,
          endTime,
        })
    },
    [betValue, roundStartTime, setUserBet, user?.balance]
  )

  return (
    <div className="flex flex-col px-4 gap-y-5">
      <div className="flex flex-row justify-between items-center">
        <Points amount={user?.balance} /> <DailyClaim />
      </div>
      {user?.canClaimAmount ? (
        <span className="text-right">
          Available to claim: {user.canClaimAmount}
        </span>
      ) : null}

      {userBet ? (
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <BodyText>You'll get result in</BodyText>
            <Timer endTime={userBet?.endTime} />
          </div>
          <BodyText>
            You bet <b>{userBet.amount} pts</b>
          </BodyText>
          <BodyText>
            That price will go{' '}
            <b>{userBet.direction ? 'lower 📉' : 'higher 📈'}</b>
          </BodyText>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
