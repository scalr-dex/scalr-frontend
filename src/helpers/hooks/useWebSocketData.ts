import UserAtom from 'helpers/atoms/UserAtom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import analyzeMessage from 'helpers/api/webSocket'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import balanceChangeToast from 'helpers/sendToast'

const dataMaxLength = 40

export default function (socket: WebSocket) {
  const setUser = useSetAtom(UserAtom)
  const setPrice = useSetAtom(priceHistoryAtom)

  useEffect(() => {
    if (!socket) return

    const update = (msg: { data: string }) => {
      console.log
      const { balance, lost, price, bet } = analyzeMessage(msg)

      if (balance?.balance) {
        setUser((prev) => (prev ? { ...prev, balance: balance.balance } : null))
      }
      if (balance?.event === 'BetWon') {
        balanceChangeToast(balance.delta, false)
      }
      if (lost) {
        balanceChangeToast(lost.l, true)
      }
      if (bet) {
        setPrice((prev) => {
          const lastIndex = prev.length - 1
          const last = prev[lastIndex]

          prev.splice(lastIndex, 1, {
            name: last.name,
            value: last.value,
            userBet: Number(bet.direction),
          })
          return prev.slice(-dataMaxLength)
        })
      }

      if (price) {
        const processedPrice = price.map((data) => ({
          name: String(data.t),
          value: [data.t * 1000, Number(data.p) / 10000],
        }))
        setPrice((prev) => [...prev, ...processedPrice].slice(-dataMaxLength))
      }
    }
    socket.addEventListener('message', update)
    return () => {
      socket.removeEventListener('message', update)
    }
  }, [setPrice, setUser, socket])
}
