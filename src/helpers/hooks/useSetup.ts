import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk-react'
import backendKy from 'helpers/api/backendKy'
import { ServerUser } from 'type/User'
import { useEffect, useState } from 'preact/hooks'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { setupWebSocket } from 'helpers/api/webSocket'
import AppStatus from 'type/AppStatus'
import {
  init as initAnalytics,
  identify,
  Identify,
} from '@amplitude/analytics-browser'
import { LogLevel } from '@amplitude/analytics-types'
import env from 'helpers/env'
import setupMiniApp from 'helpers/setupMiniApp'

export default function () {
  const [appStatus, setAppStatus] = useState(AppStatus.loading)
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const start = async () => {
      const isMini = await isTMA()
      setAppStatus(isMini ? AppStatus.isTma : AppStatus.isElse)

      initAnalytics(env.VITE_AMPLITUDE_API_KEY, {
        appVersion: env.DEV ? 'DEV' : 'PROD',
        logLevel: env.DEV ? LogLevel.Debug : LogLevel.None,
        serverZone: 'EU',
        autocapture: {
          attribution: false,
          pageViews: false,
          sessions: true,
          formInteractions: false,
          fileDownloads: false,
          elementInteractions: false,
        },
      })

      if (isMini) {
        const user = await setupUser()
        if (user) {
          setSocket(setupWebSocket(user.ticket))

          identify(new Identify(), {
            user_id: String(user.launchParams.initData?.user?.id),
          })
        }
        setupMiniApp()
        setAppStatus(AppStatus.isTma)
      } else {
        setAppStatus(AppStatus.isElse)
      }
    }

    void start()
  }, [setSocket])

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
