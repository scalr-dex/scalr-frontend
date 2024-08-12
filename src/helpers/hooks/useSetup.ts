import {
  isTMA,
  postEvent,
  retrieveLaunchParams,
} from '@telegram-apps/sdk-react'
import backendKy from 'helpers/api/backendKy'
import { ServerUser } from 'type/User'
import { useEffect, useState } from 'preact/hooks'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { setupWebSocket } from 'helpers/api/webSocket'
import AppStatus from 'type/AppStatus'

export default function () {
  const [appStatus, setAppStatus] = useState(AppStatus.loading)
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const start = async () => {
      const isMini = await isTMA()
      setAppStatus(isMini ? AppStatus.isTma : AppStatus.isElse)

      if (!isMini) return

      const user = await setupUser()
      if (user) setSocket(setupWebSocket(user.ticket))
      setupMiniApp()
    }

    void start()
  }, [])

  return { appStatus, socket }
}

async function setupUser() {
  const launchParams = retrieveLaunchParams()

  const { initData, initDataRaw } = launchParams

  if (!initData || !initDataRaw) return

  try {
    const response = await backendKy(initDataRaw).post('user', {
      searchParams: { code: initData.startParam || '' },
    })

    const user = await response.json<ServerUser>()
    const clientUser = {
      ticket: user.ticket,
      balance: user.points,
      timeToReward: user.can_claim_daily_reward,
      launchParams,
    }

    writeAtom(UserAtom, clientUser)
    return clientUser
  } catch (e) {
    handleError({ e, toastMessage: 'Unauthorized' })
  }
}

function setupMiniApp() {
  postEvent('web_app_ready')
  postEvent('web_app_set_header_color', { color: '#0e121b' })
  postEvent('web_app_set_background_color', { color: '#0e121b' })
  postEvent('web_app_expand')
}
