import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react'

export default function () {
  return (
    <div>
      <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
        <TonConnectButton />
      </TonConnectUIProvider>
    </div>
  )
}
