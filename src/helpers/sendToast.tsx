import BalanceChangeToast from 'components/Toast/BalanceChangeToast'
import { toast } from 'react-toastify'
import { sadConfetti, successConfetti } from 'helpers/shootConfetti'
import { initHapticFeedback } from '@telegram-apps/sdk-react'
import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import { boostStateAtom, showZeroBalanceModal } from 'helpers/atoms/UserStates'
import UserAtom from 'helpers/atoms/UserAtom'
import BoostStates from 'type/BoostState'

export default function balanceChangeToast(delta: number, lost: boolean) {
  const haptic = initHapticFeedback()
  haptic.notificationOccurred(lost ? 'error' : 'success')

  toast(() => <BalanceChangeToast delta={delta} lost={lost} />)
  writeAtom(showZeroBalanceModal, true)

  if (lost) {
    if (!readAtom(UserAtom)?.balance) {
      writeAtom(showZeroBalanceModal, true)
    } else {
      void sadConfetti()
    }
  } else {
    void successConfetti()
  }

  const boostState = readAtom(boostStateAtom)
  const user = readAtom(UserAtom)
  if (user) {
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
}
