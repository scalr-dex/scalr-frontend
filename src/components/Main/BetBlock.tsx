import SelectBetRangeInput from 'components/Main/SelectBetRangeInput'
import Button from 'components/Button'
import StonksArrow from 'components/icons/StonksArrow'
import ButtonTypes from 'type/Button'
import { useCallback, useState } from 'preact/hooks'
import { useAtom, useAtomValue } from 'jotai'
import UserAtom, { userBetAtom } from 'helpers/atoms/UserAtom'
import placeBet from 'helpers/api/placeBet'
import PointsWithTimer from 'components/Main/PointsWithTimer'
import BetDirection from 'type/BetDirection'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BodyText } from 'components/icons/Text'
import BetTimer from 'components/Main/BetTimer'
import { roundDurationMs } from 'helpers/atoms/priceHistoryAtom'

export default function ({
  loading,
  lastPrice,
  roundStartTime,
}: {
  loading?: boolean
  lastPrice?: number
  roundStartTime: number | undefined
}) {
  const [parent] = useAutoAnimate()
  const user = useAtomValue(UserAtom)
  const [userBet, setUserBet] = useAtom(userBetAtom)
  const [betValue, setBetValue] = useState(Math.floor((user?.balance || 0) / 2))


  const disabled = betValue <= 0 || loading || !user?.balance

  const onClick = useCallback(
    async (direction: BetDirection) => {
      if (!lastPrice || !roundStartTime) return

      const bet = { amount: betValue, direction }
      setBetValue(0)

      const roundEndTime = roundStartTime + roundDurationMs
      const untilEnd = roundEndTime - Date.now()
      const endTime = untilEnd + Date.now() + roundDurationMs

      setUserBet({
        ...bet,
        date: new Date(),
        priceAt: lastPrice,
        endTime: new Date(endTime),
      })
      await placeBet(bet)
    },
    [betValue, lastPrice, roundStartTime, setUserBet]
  )

  return (
    <div className="flex flex-col px-4 gap-y-5" ref={parent}>
      <PointsWithTimer user={user} />

      {userBet ? (
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <BodyText>You'll get result in</BodyText>
            <BetTimer />
          </div>
          <BodyText>
            You bet <b>{userBet.amount} pts</b>
          </BodyText>
          <BodyText>
            That price will go{' '}
            <b>{userBet.direction ? 'lower 📉' : 'higher 📈'}</b> than{' '}
            <b>${userBet.priceAt}</b>
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
