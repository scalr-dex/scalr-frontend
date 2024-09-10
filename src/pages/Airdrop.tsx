import Coin3D from 'components/Coin3D'
import { BodyText, Header1, Header3, Header4 } from 'components/Text'
import TonConnect from 'components/TonConnect'
import env from 'helpers/env'
import { TonConnectUIProvider } from 'lib/@tonconnect/ui-react'

function AirDropInner() {
  return (
    <div className="flex flex-col min-h-[90dvh] w-full items-center justify-center gap-y-4 text-center px-4">
      <Header1>Scalr Airdrop</Header1>
      <Header3>
        Connect wallet to take part in <span className="underline">$SCR</span>{' '}
        tokens distribution
      </Header3>
      <Coin3D />
      <TonConnect />
      <span>
        <Header4>Tokens will be distributed for:</Header4>
        <BodyText className="font-normal">
          <ul>
            <li>- Bet volumes</li>
            <li>- Invited friends</li>
            <li>- More info soon 👀</li>
          </ul>
        </BodyText>
      </span>
    </div>
  )
}

export default function () {
  return (
    <TonConnectUIProvider
      manifestUrl={`${location.origin}/tonconnect-manifest.json`}
      actionsConfiguration={{
        twaReturnUrl: env.VITE_APP_BASE_LINK,
      }}
      uiPreferences={{ theme: 'DARK' }}
    >
      <AirDropInner />
    </TonConnectUIProvider>
  )
}
