import UserAtom, { userBetAtom } from 'helpers/atoms/UserAtom'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import analyzeMessage from 'helpers/api/webSocket'
import priceHistoryAtom, {
  previousRoundAtom,
} from 'helpers/atoms/priceHistoryAtom'
import balanceChangeToast from 'helpers/sendToast'

const dataMaxLength = 65

export default function (socket: WebSocket) {
  const [user, setUser] = useAtom(UserAtom)
  const setPreviousRound = useSetAtom(previousRoundAtom)
  const setPrice = useSetAtom(priceHistoryAtom)
  const setUserBet = useSetAtom(userBetAtom)

  useEffect(() => {
    if (!socket || !user) return

    const update = (msg: { data: string }) => {
      const { balance, lost, price } = analyzeMessage(msg)

      if (balance?.balance && user)
        setUser({ ...user, balance: balance.balance })
      if (balance?.event === 'BetWon') {
        balanceChangeToast(balance.delta, false)
        setUserBet(null)
      }
      if (lost) {
        balanceChangeToast(lost.l, true)
        setUserBet(null)
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
  }, [setPreviousRound, setPrice, setUser, setUserBet, socket, user])
}
