import BalanceChangeToast from 'components/Toast/BalanceChangeToast'
import { toast } from 'react-toastify'
import { sadConfetti, successConfetti } from 'helpers/shootConfetti'

export default function balanceChangeToast(delta: number) {
  toast(() => <BalanceChangeToast delta={delta} />)
  delta > 0 ? void successConfetti() : void sadConfetti()
}
