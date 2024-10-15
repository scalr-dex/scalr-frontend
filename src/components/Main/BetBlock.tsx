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
import priceHistoryAtom, {
  roundDurationMs,
} from 'helpers/atoms/priceHistoryAtom'
import DailyClaim from 'components/Main/DailyClaim'
import Points from 'components/Main/Points'
import Timer from 'components/Main/Timer'
import formatUSA from 'helpers/formatters/formatUSA'
import BoostPoints from 'components/Main/BoostPoints'
import { betPercent, boostStateAtom } from 'helpers/atoms/UserStates'
import BoostStates from 'type/BoostState'
import handleError from 'helpers/handleError'
import { readAtom } from 'helpers/atoms/atomStore'

export default function ({ loading }: { loading?: boolean }) {
  const user = useAtomValue(UserAtom)
  const [userBet, setUserBet] = useAtom(userBetAtom)
  const [percent, setPercent] = useAtom(betPercent)
  const [processingBet, setProcessingBet] = useState(false)
  const [betValue, setBetValue] = useState(0)
  const [boostState, setBoostState] = useAtom(boostStateAtom)

  const disabled = betValue <= 0 || loading || processingBet || !user?.balance

  useEffect(() => {
    // in case app reloads and timeout vanishes
    if (userBet && userBet.endTime < Date.now()) setUserBet(null)
  }, [setUserBet, userBet])

  useEffect(() => {
    const balance = user?.balance || 0
    setBetValue(Math.round((balance * percent) / 100))
  }, [percent, user?.balance])

  useEffect(() => {
    const balance = user?.balance
    const betPercent = balance && betValue ? (betValue / balance) * 100 : 0
    setPercent(betPercent)
  }, [betValue, setPercent, user?.balance])

  const onClick = useCallback(
    async (direction: BetDirection) => {
      if (!user || !user.balance) return

      try {
        setProcessingBet(true)
        const bet = { amount: betValue, direction }

        const shouldBoost = boostState === BoostStates.activated
        setBoostState(shouldBoost ? BoostStates.locked : BoostStates.betNoBoost)
        const { created_at } = await placeBet({
          ...bet,
          shouldBoost,
        })
        setTimeout(() => {
          const data = readAtom(priceHistoryAtom).find(
            ({ value }) => value[0] === created_at * 1000
          )

          if (!data?.value) return

          setUserBet({
            ...bet,
            value: data.value,
            endTime: data.value[0] + roundDurationMs,
          })
          setProcessingBet(false)
        }, 200)
        setTimeout(() => setUserBet(null), roundDurationMs)
      } catch (e) {
        handleError({ e, toastMessage: 'Failed to place a bet 😥' })
        setProcessingBet(false)
      }
    },
    [betValue, boostState, setBoostState, setUserBet, user]
  )

  return (
    <div className="flex flex-col px-4 gap-y-5">
      <div className="flex flex-row justify-between items-center">
        <Points amount={user?.balance} />
        <div className="flex flex-row gap-x-2 items-center">
          <BoostPoints boosts={user?.boosts} />
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
              percent={percent}
              disabled={loading || processingBet || !!userBet || !user?.balance}
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
