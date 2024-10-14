import { dataMaxLength } from 'helpers/atoms/priceHistoryAtom'
import { BattleBet, GraphTokenData } from 'type/TokenState'

export default function ({
  prev,
  direction,
  battleBet,
}: {
  prev: GraphTokenData[]
  direction?: boolean
  battleBet?: BattleBet
}) {
  const lastIndex = prev.length - 1
  const last = prev[lastIndex]

  prev.splice(lastIndex, 1, {
    name: last.name + '-' + battleBet?.userId,
    value: last.value,
    userBet: Number(direction),
    battleBet,
  })
  prev.slice(-dataMaxLength)
  return { last, prev }
}
