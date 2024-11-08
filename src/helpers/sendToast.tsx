import BalanceChangeToast from 'components/Toast/BalanceChangeToast'
import { toast } from 'react-toastify'
import { sadConfetti, successConfetti } from 'helpers/shootConfetti'
import { hapticFeedbackNotificationOccurred } from '@telegram-apps/sdk-react'
import { readAtom, writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'

export default function balanceChangeToast(delta: number, lost: boolean) {
  hapticFeedbackNotificationOccurred(lost ? 'error' : 'success')

  toast(() => <BalanceChangeToast delta={delta} lost={lost} />)

  if (!readAtom(UserAtom)?.betEnergy) {
    writeAtom(modalsAtom, AvailableModals.betEnergyZero)
  }

  if (lost) {
    void sadConfetti()
  } else {
    void successConfetti()
  }
}
