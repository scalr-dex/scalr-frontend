import {
  isTMA,
  postEvent,
  retrieveLaunchParams,
} from '@telegram-apps/sdk-react'
import backendKy from 'helpers/api/backendKy'
import { isBrowser } from 'react-device-detect'
import { ServerUser } from 'type/User'
import { useEffect, useState } from 'preact/hooks'
import { writeAtom } from 'helpers/atoms/atomStore'
import UserAtom from 'helpers/atoms/UserAtom'
import handleError from 'helpers/handleError'

export default function () {
  const [isTgMiniApp, setIsTgMiniApp] = useState(!isBrowser)

  useEffect(() => {
    void isTMA().then(setIsTgMiniApp)
  }, [])

  useEffect(() => {
    if (!isTgMiniApp) return

    void setupUser()
    void setupMiniApp()
  }, [isTgMiniApp])

  return isTgMiniApp
}

async function setupUser() {
  const launchParams = retrieveLaunchParams()

  const { initData, initDataRaw } = launchParams

  console.log(initData)
  if (!initData || !initDataRaw) return

  try {
    const response = await backendKy(initDataRaw).post('user', {
      searchParams: { code: initData.startParam || '' },
    })

    const user = await response.json<ServerUser>()

    writeAtom(UserAtom, {
      ticket: user.ticket,
      balance: user.points,
      timeToReward: user.can_claim_daily_reward,
      launchParams,
    })
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
