import BalanceChangeToast from 'components/Toast/BalanceChangeToast'
import { toast } from 'react-toastify'
import { sadConfetti, successConfetti } from 'helpers/shootConfetti'
import { initHapticFeedback } from '@telegram-apps/sdk-react'
import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import { showZeroBalanceModal } from 'helpers/atoms/UserStates'
import UserAtom from 'helpers/atoms/UserAtom'

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
  } else {
    void successConfetti()
  }
}
