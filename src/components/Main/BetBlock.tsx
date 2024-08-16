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
import Timer from 'components/Main/Timer'
import { BodyText } from 'components/icons/Text'

export default function ({ loading }: { loading?: boolean }) {
  const [parent] = useAutoAnimate()
  const [betValue, setBetValue] = useState(0)
  const user = useAtomValue(UserAtom)
  const [userBet, setUserBet] = useAtom(userBetAtom)

  const disabled = betValue <= 0 || loading

  const onClick = useCallback(
    async (direction: BetDirection) => {
      const bet = { amount: betValue, direction }
      setBetValue(0)
      setUserBet({ ...bet, date: new Date() })
      await placeBet(bet)
    },
    [betValue, setUserBet]
  )

  return (
    <div className="flex flex-col px-4 gap-y-5" ref={parent}>
      <PointsWithTimer user={user} />

      {userBet ? (
        <div className="flex flex-row items-center justify-between">
          <BodyText>You'll get result in</BodyText>
          <Timer extra={30000} />
        </div>
      ) : (
        <>
          <SelectBetRangeInput
            userBalance={user?.balance}
            value={betValue}
            setValue={setBetValue}
            disabled={loading || !!userBet}
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
