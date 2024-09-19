import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk-react'
import backendKy from 'helpers/api/backendKy'
import { ServerUser } from 'type/User'
import { useEffect, useState } from 'preact/hooks'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom, { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { getWebsocketTicket, setupWebSocket } from 'helpers/api/webSocket'
import AppStatus from 'type/AppStatus'
import {
  init as initAnalytics,
  identify,
  Identify,
} from '@amplitude/analytics-browser'
import { LogLevel } from '@amplitude/analytics-types'
import env from 'helpers/env'
import setupMiniApp from 'helpers/setupMiniApp'
import { setSentryUser } from 'helpers/api/sentry'

export default function () {
  const [appStatus, setAppStatus] = useState(AppStatus.loading)
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    if (!socket) return

    const reconnect = async () => {
      try {
        const { ticket } = await getWebsocketTicket()
        setSocket(setupWebSocket(ticket))
      } catch (e) {
        handleError({ e, toastMessage: 'Failed to reconnect :(' })
      }
    }

    socket.onerror = (e) => {
      handleError({ e })
      setTimeout(reconnect, 1000)
    }
  }, [socket])

  useEffect(() => {
    const start = async () => {
      const isMini = await isTMA()
      setAppStatus(isMini ? AppStatus.isTma : AppStatus.isElse)

      initAnalytics(env.VITE_AMPLITUDE_API_KEY, {
        appVersion: env.DEV ? 'DEV' : 'PROD',
        logLevel: LogLevel.None,
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
          const userId = String(user.launchParams.initData?.user?.id)
          setSocket(setupWebSocket(user.ticket))

          identify(new Identify(), {
            user_id: String(userId),
          })
          setSentryUser(userId)
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
  try {
    const launchParams = retrieveLaunchParams()

    const { initData, initDataRaw } = launchParams

    if (!initData || !initDataRaw || !initData.user) return

    const response = await backendKy(initDataRaw).post('user', {
      searchParams: { code: initData.startParam || '' },
    })

    const user = await response.json<ServerUser>()
    const clientUser = {
      ticket: user.ticket,
      balance: user.points,
      canClaimAmount: user.claim_amount,
      launchParams,
      username: initData.user.username || initData.user.firstName,
      telegramId: user.telegram_id,
      tonAddress: user.ton_address,
      inviteLimit: user.invite_limit,
      invitedUsers: user.invited_users,
    }

    writeAtom(timeToRewardAtom, user.can_claim_daily_reward)
    writeAtom(UserAtom, clientUser)
    return clientUser
  } catch (e) {
    handleError({ e })
  }
}
