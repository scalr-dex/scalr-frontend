import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import useWebSocket from 'helpers/hooks/useWebSocket'
import { EventData, EventDataPriceChangeSingle } from 'type/WebsocketEvents'
import { TokenStates } from 'type/TokenState'

const dataMaxLength = 30

function getDateAndPrice(data: EventDataPriceChangeSingle) {
  return { x: new Date(data.t * 1000), y: Number(data.p) / 10000 }
}

function normalizeEventData(data: EventData): TokenStates {
  if (Array.isArray(data) && data[0]?._ === 'p') {
    return data.map(getDateAndPrice)
  }

  if (!Array.isArray(data) && data?._ === 'p') {
    return [getDateAndPrice(data)]
  }

  return []
}

export default function () {
  const socket = useWebSocket()
  const [data, setData] = useState<TokenStates>([])
  const queue = useMemo(() => new Set<string>(), [])

  const flush = useCallback(() => {
    for (const value of queue)
      setData((prev) =>
        [...prev, ...normalizeEventData(JSON.parse(value))].slice(
          -dataMaxLength
        )
      )
    queue.clear()
  }, [queue])

  useEffect(() => {
    if (!socket) return

    const timer = setInterval(flush, 5000)

    socket.addEventListener('message', (msg) => {
      queue.add(msg.data)
    })

    return () => {
      clearInterval(timer)
      flush()
    }
  }, [flush, queue, socket])

  return data
}
