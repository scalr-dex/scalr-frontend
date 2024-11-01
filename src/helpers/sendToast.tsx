import BalanceChangeToast from 'components/Toast/BalanceChangeToast'
import { toast } from 'react-toastify'
import { sadConfetti, successConfetti } from 'helpers/shootConfetti'
import { initHapticFeedback } from '@telegram-apps/sdk-react'
import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import { showZeroEnergyModal } from 'helpers/atoms/UserStates'

export default function balanceChangeToast(delta: number, lost: boolean) {
  const haptic = initHapticFeedback()
  haptic.notificationOccurred(lost ? 'error' : 'success')

  toast(() => <BalanceChangeToast delta={delta} lost={lost} />)

  if (!readAtom(UserAtom)?.betEnergy) {
    writeAtom(showZeroEnergyModal, true)
  }

  if (lost) {
    void sadConfetti()
  } else {
    void successConfetti()
  }
}
