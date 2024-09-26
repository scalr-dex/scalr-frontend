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

  if (lost) {
    if (!readAtom(UserAtom)?.balance) {
      writeAtom(showZeroBalanceModal, true)
    } else {
      void sadConfetti()
    }
    writeAtom(UserAtom, (prev) =>
      prev ? { ...prev, boosts: prev.boosts - 1 } : null
    )
  } else {
    void successConfetti()
  }
  writeAtom(boostStateAtom, BoostStates.active)
}
