import { BodyText, Header3 } from 'components/Text'
import env from 'helpers/env'
import { TonConnectUIProvider } from 'lib/@tonconnect/ui-react'
import TonConnect from 'components/TonConnect'
import Card from 'components/Card'
import ScalrCoin from 'components/icons/coins/ScalrCoin'

export default function () {
  return (
    <TonConnectUIProvider
      manifestUrl={`${location.origin}/tonconnect-manifest.json`}
      actionsConfiguration={{
        twaReturnUrl: env.VITE_APP_BASE_LINK,
      }}
      uiPreferences={{ theme: 'DARK' }}
      restoreConnection
    >
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <Header3>Airdrop</Header3>
          <BodyText className="text-sm text-left leading-4 font-semibold">
            Connect wallet to participate in $SCR tokens distribution for
            betting volume, referrals, and more.
          </BodyText>
        </div>
        <Card className="flex-row px-3 py-5 justify-between">
          <div className="flex flex-row items-center gap-x-2 w-full">
            <ScalrCoin height={64} width={120} />
            <BodyText className="text-left text-sm font-semibold leading-4">
              Take part in $SCR{'\n'}airdrop distribution
            </BodyText>
          </div>
          <TonConnect />
        </Card>
      </div>
    </TonConnectUIProvider>
  )
}
