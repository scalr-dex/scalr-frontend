import { THEME, TonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui'
import env from 'helpers/env'
import { useEffect, useState } from 'preact/hooks'

const tonConnect = new TonConnectUI({
  manifestUrl: `${location.origin}/tonconnect-manifest.json`,
  actionsConfiguration: {
    twaReturnUrl: env.VITE_APP_BASE_LINK as `${string}://${string}`,
  },
  uiPreferences: { theme: THEME.DARK },
})

export default function () {
  const [address, setAddress] = useState('')

  useEffect(() => {
    const unsubscribe = tonConnect.onStatusChange((walletInfo) => {
      setAddress(
        walletInfo?.account.address
          ? toUserFriendlyAddress(walletInfo.account.address)
          : ''
      )
    })

    void tonConnect.connectionRestored.then(() =>
      setAddress(
        tonConnect.account?.address
          ? toUserFriendlyAddress(tonConnect.account.address)
          : ''
      )
    )

    return () => {
      unsubscribe()
    }
  })

  return { address, tonConnect }
}
