import { init, isTMA, retrieveLaunchParams } from '@telegram-apps/sdk-react'
import backendKy from 'helpers/api/backendKy'
import { ServerUser } from 'type/User'
import { useEffect, useState } from 'preact/hooks'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom, { timeToRewardAtom } from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'
import { getWebsocketTicket, setupWebSocket } from 'helpers/api/ws'
import AppStatus from 'type/AppStatus'
import {
  init as initAnalytics,
  identify,
  Identify,
} from '@amplitude/analytics-browser'
import { LogLevel } from '@amplitude/analytics-types'
import env from 'helpers/env'
import { setSentryUser } from 'helpers/api/sentry'
import setupMiniApp from 'helpers/setupMiniApp'
import { navigate } from 'wouter-preact/use-hash-location'

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

      initAnalytics(env.VITE_AMPLITUDE_API_KEY, {
        appVersion: env.DEV ? 'DEV' : 'PROD',
        logLevel: LogLevel.None,
        serverZone: 'EU',
      })

      if (isMini) {
        init()
        const user = await setupUser()
        if (user) {
          const userId = String(user.launchParams.initData?.user?.id)
          setSocket(setupWebSocket(user.ticket))

          identify(new Identify(), {
            user_id: String(userId),
          })
          setupMiniApp()
          setSentryUser(userId)
          parseStartupParams(user.startParam)
        }
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

    const { initData, initDataRaw, startParam } = launchParams

    if (!initData || !initDataRaw || !initData.user) return

    const response = await backendKy({ initDataRaw }).post('user', {
      searchParams: { code: initData.startParam || '' },
    })

    const user = await response.json<ServerUser>()
    console.log(user)
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
      boosts: user.multiplier_count,
      remainingAds: user.remaining_ads,
      startParam,
    }

    writeAtom(timeToRewardAtom, user.can_claim_daily_reward)
    writeAtom(UserAtom, clientUser)
    return clientUser
  } catch (e) {
    handleError({ e })
  }
}

function parseStartupParams(params?: string) {
  if (!params) return

  if (params.match('code-')) {
    const code = params.split('-')[1]
    if (code.length !== 4) return

    navigate(`battle/lobby/${code}`)
  }
}
