import UserAtom from 'helpers/atoms/UserAtom'
import env from 'helpers/env'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'preact/hooks'

const io = (url: URL) => new WebSocket(url)
const url = new URL(`${env.VITE_BACKEND_URL.replace('https', 'wss')}/ws`)

export default function () {
  const user = useAtomValue(UserAtom)
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    if (!user?.ticket) return

    url.searchParams.set('ticket', user.ticket)

    setSocket(io(url))
  }, [user?.ticket])

  return socket
}
