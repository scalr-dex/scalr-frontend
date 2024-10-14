import { GraphTokenData } from 'type/TokenState'

export default function ({
  prev,
  direction,
  userIndex,
}: {
  prev: GraphTokenData[]
  direction: boolean
  userIndex?: number
}) {
  const lastIndex = prev.length - 1
  const last = prev[lastIndex]

  prev.splice(lastIndex, 1, {
    name: last.name + '-' + userIndex,
    value: last.value,
    userBet: Number(direction),
    userIndex,
  })
  return { last, prev }
}
