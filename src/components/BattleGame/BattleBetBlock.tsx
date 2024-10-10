import Button from 'components/Button'
import StonksArrow from 'components/icons/StonksArrow'
import ButtonTypes from 'type/Button'
import { useCallback, useState } from 'preact/hooks'
import BetDirection from 'type/BetDirection'
import { placeBattleBet } from 'helpers/api/battles'

export default function ({
  loading,
  lobbyId,
  onBetSuccess,
}: {
  onBetSuccess: () => void
  lobbyId: string
  loading?: boolean
}) {
  const [processingBet, setProcessingBet] = useState(false)

  const disabled = loading || processingBet

  const onClick = useCallback(
    async (direction: BetDirection) => {
      setProcessingBet(true)

      const success = await placeBattleBet({ direction, lobbyId })

      setProcessingBet(false)
      if (!success) return

      onBetSuccess()
    },
    [lobbyId, onBetSuccess]
  )

  return (
    <div className="flex flex-row gap-x-1">
      <Button
        buttonType={ButtonTypes.success}
        iconRight={<StonksArrow size={16} />}
        disabled={disabled}
        onClick={() => onClick(BetDirection.long)}
      >
        Higher
      </Button>
      <Button
        buttonType={ButtonTypes.error}
        iconRight={<StonksArrow rotate={90} size={16} />}
        disabled={disabled}
        onClick={() => onClick(BetDirection.short)}
      >
        Lower
      </Button>
    </div>
  )
}
