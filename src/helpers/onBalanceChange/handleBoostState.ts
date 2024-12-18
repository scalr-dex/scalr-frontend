import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import { boostStateAtom } from 'helpers/atoms/UserStates'
import BoostStates from 'type/BoostStates'

export default function () {
  const boostState = readAtom(boostStateAtom)
  const user = readAtom(UserAtom)

  if (!user) return

  if (boostState === BoostStates.locked) {
    const boostsAfterBet = user.boosts ? user.boosts - 1 : 0
    writeAtom(UserAtom, { ...user, boosts: boostsAfterBet })
    writeAtom(
      boostStateAtom,
      boostsAfterBet ? BoostStates.active : BoostStates.disabled
    )
  } else {
    writeAtom(
      boostStateAtom,
      user.boosts ? BoostStates.active : BoostStates.disabled
    )
  }
}
