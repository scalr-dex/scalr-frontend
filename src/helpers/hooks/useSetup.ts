import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk-react'
import backendKy from 'helpers/api/backendKy'
import { ClientUser, ServerUser } from 'type/User'
import { useEffect, useState } from 'react'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom, {
  timeToRewardAtom,
  userBalanceAtom,
} from 'helpers/atoms/UserAtom'
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
import { setSentryUser } from 'helpers/api/sentry'
import setupMiniApp from 'helpers/setupMiniApp'

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
        const user = await setupUser()
        if (user) {
          const userId = String(user.launchParams.initData?.user?.id)
          setSocket(setupWebSocket(user.ticket))

          identify(new Identify(), {
            user_id: String(userId),
          })
          setupMiniApp()
          setSentryUser(userId)
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

    const { initData, initDataRaw } = launchParams

    if (!initData || !initDataRaw || !initData.user) return

    const response = await backendKy({ initDataRaw }).post('user', {
      searchParams: { code: initData.startParam || '' },
    })

    const {
      ticket,
      claim_amount,
      telegram_id,
      ton_address,
      invite_limit,
      invited_users,
      remaining_ads,
      tasks_remaining,
      login_days,
      last_login_date,
      nickname_claim_available,
      bet_energy_left,
      bet_level,
      bet_loss,
      bet_size,
      bet_upgrade_price,
      bet_win,
      can_claim_daily_reward,
      points,
    } = await response.json<ServerUser>()

    const clientUser: ClientUser = {
      ticket,
      canClaimAmount: claim_amount,
      launchParams,
      username: initData.user.username || initData.user.firstName,
      firstName: initData.user.firstName,
      lastName: initData.user.lastName,
      telegramId: telegram_id,
      tonAddress: ton_address,
      inviteLimit: invite_limit,
      invitedUsers: invited_users,
      remainingAds: remaining_ads,
      remainingTasks: tasks_remaining,
      loginDays: login_days,
      lastLoginDate: new Date(last_login_date),
      nicknameClaimAvailable: nickname_claim_available,
      betEnergy: bet_energy_left,
      level: {
        current: bet_level,
        betSize: bet_size,
        betWin: bet_win,
        betLoss: bet_loss,
        betUpgradePrice: bet_upgrade_price,
      },
    }

    writeAtom(timeToRewardAtom, can_claim_daily_reward)
    writeAtom(UserAtom, clientUser)
    writeAtom(userBalanceAtom, points)
    return clientUser
  } catch (e) {
    handleError({ e })
  }
}
