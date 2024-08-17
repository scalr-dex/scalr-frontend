import BalanceChangeToast from 'components/Toast/BalanceChangeToast'
import { toast } from 'react-toastify'
import { sadConfetti, successConfetti } from 'helpers/shootConfetti'
import { initHapticFeedback } from '@telegram-apps/sdk-react'

export default function balanceChangeToast(delta: number, lost: boolean) {
  const haptic = initHapticFeedback()
  haptic.notificationOccurred(lost ? 'error' : 'success')

  toast(() => <BalanceChangeToast delta={delta} lost={lost} />)
  lost ? void sadConfetti() : void successConfetti()
}
