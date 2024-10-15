import { useEffect } from 'preact/hooks'
import analyzeChartGameMessage from 'helpers/api/ws/analyzeChartGameMessage'
import analyzeBattleGameMessage from 'helpers/api/ws/analyzeBattleGameMessage'

export default function (socket: WebSocket) {
  useEffect(() => {
    if (!socket) return

    const update = (msg: { data: string }) => {
      const parsed = JSON.parse(msg.data)

      // I use `return true` OR `return` to process stuff faster
      if (analyzeChartGameMessage(parsed)) return
      if (analyzeBattleGameMessage(parsed)) return
    }
    socket.addEventListener('message', update)
    return () => {
      socket.removeEventListener('message', update)
    }
  }, [socket])
}
