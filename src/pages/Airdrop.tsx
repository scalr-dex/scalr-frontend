import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react'
import env from 'helpers/env'

export default function () {
  return (
    <TonConnectUIProvider
      manifestUrl="tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: env.VITE_APP_BASE_LINK,
      }}
    >
      <TonConnectButton />
    </TonConnectUIProvider>
  )
}
