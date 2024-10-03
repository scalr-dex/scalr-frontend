import Button from 'components/Button'
import StonksArrow from 'components/icons/StonksArrow'
import ButtonTypes from 'type/Button'
import { useCallback, useState } from 'preact/hooks'
import { useAtom } from 'jotai'
import BetDirection from 'type/BetDirection'
import { BodyText } from 'components/Text'
import { roundDurationMs } from 'helpers/atoms/priceHistoryAtom'
import { GraphTokenValue } from 'type/TokenState'
import RoundCounter from 'components/BattleGame/RoundCounter'
import { battleBetAtom } from 'helpers/atoms/battleGameAtom'
import { placeBattleBet } from 'helpers/api/battles'

export default function ({
  loading,
  roundStart,
  currentRound,
}: {
  currentRound: number
  loading?: boolean
  roundStart: GraphTokenValue | undefined
}) {
  const [userBet, setUserBet] = useAtom(battleBetAtom)
  const [processingBet, setProcessingBet] = useState(false)

  const disabled = loading || processingBet

  const onClick = useCallback(
    async (direction: BetDirection) => {
      if (!roundStart) return

      setProcessingBet(true)
      const bet = { direction }

      const success = await placeBattleBet(bet)

      setProcessingBet(false)
      if (!success) {
        setUserBet(null)
        return
      }

      setUserBet(bet)
      setTimeout(() => setUserBet(null), roundDurationMs)
    },
    [roundStart, setUserBet]
  )

  return (
    <div className="flex flex-col px-4 gap-y-5">
      <div className="h-28">
        {userBet ? (
          <div className="flex flex-col gap-y-2">
            <RoundCounter currentRound={currentRound} />
            <BodyText>
              You bet that price will go
              <b>{userBet?.direction ? 'DOWN 📉' : 'UP 📈'}</b>
            </BodyText>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
