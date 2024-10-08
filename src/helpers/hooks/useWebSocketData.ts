import UserAtom, { userBetAtom } from 'helpers/atoms/UserAtom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import analyzeMessage from 'helpers/api/webSocket'
import priceHistoryAtom from 'helpers/atoms/priceHistoryAtom'
import balanceChangeToast from 'helpers/sendToast'

const dataMaxLength = 40

export default function (socket: WebSocket) {
  const setUserBet = useSetAtom(userBetAtom)
  const setUser = useSetAtom(UserAtom)
  const setPrice = useSetAtom(priceHistoryAtom)

  useEffect(() => {
    if (!socket) return

    const update = (msg: { data: string }) => {
      const { balance, lost, price, claim, bet } = analyzeMessage(msg)

      if (balance) {
        if (balance.balance !== undefined) {
          setUser((prev) =>
            prev ? { ...prev, balance: balance.balance } : null
          )
        }

        if (balance.event === 'BetWon') {
          balanceChangeToast(balance.delta, false)
          setUserBet(null)
        }
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
      if (bet) {
        // include bet in chart data to keep it smooth
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
  }, [setPrice, setUser, setUserBet, socket])
}
