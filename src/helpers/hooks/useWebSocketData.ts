import UserAtom, { userBetAtom } from 'helpers/atoms/UserAtom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import analyzeMessage from 'helpers/api/webSocket'
import priceHistoryAtom, {
  previousRoundAtom,
} from 'helpers/atoms/priceHistoryAtom'
import balanceChangeToast from 'helpers/sendToast'

const dataMaxLength = 40

export default function (socket: WebSocket) {
  const setUser = useSetAtom(UserAtom)
  const setPreviousRound = useSetAtom(previousRoundAtom)
  const setPrice = useSetAtom(priceHistoryAtom)
  const setUserBet = useSetAtom(userBetAtom)

  useEffect(() => {
    if (!socket) return

    const update = (msg: { data: string }) => {
      const { balance, lost, price, claim } = analyzeMessage(msg)

      if (balance?.balance)
        setUser((prev) => (prev ? { ...prev, balance: balance.balance } : null))
      if (balance?.event === 'BetWon') {
        balanceChangeToast(balance.delta, false)
        setUserBet(null)
      }
      if (lost) {
        balanceChangeToast(lost.l, true)
        setUserBet(null)
      }
      if (claim) {
        setUser((prev) =>
          prev ? { ...prev, canClaimAmount: claim.amount } : null
        )
      }

      if (price) {
        const processedPrice = price.map((data) => ({
          name: String(data.t),
          value: [data.t * 1000, Number(data.p) / 10000],
          roundSeparator: data.r,
        }))
        setPrice((prev) => [...prev, ...processedPrice].slice(-dataMaxLength))

        const prevRound = price.findLast(({ r }) => Boolean(r))
        if (prevRound)
          setPreviousRound({
            date: prevRound.t,
            price: Number(prevRound.p),
          })
      }
    }

    socket.addEventListener('message', update)
    return () => {
      socket.removeEventListener('message', update)
    }
  }, [setPreviousRound, setPrice, setUser, setUserBet, socket])
}
