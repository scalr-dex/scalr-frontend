import { dataMaxLength } from 'helpers/atoms/priceHistoryAtom'
import { GraphTokenData } from 'type/TokenState'

export default function (prev: GraphTokenData[], direction: boolean) {
  const lastIndex = prev.length - 1
  const last = prev[lastIndex]

  prev.splice(lastIndex, 1, {
    name: last.name,
    value: last.value,
    userBet: Number(direction),
  })
  return prev.slice(-dataMaxLength)
}
