import Logo from 'components/icons/Logo'
import {
  BodyText,
  Header1,
  Header2,
  Header3,
  Header4,
} from 'components/icons/Text'
import env from 'helpers/env'
import {
  TonConnectButton,
  TonConnectUIProvider,
} from 'lib/@tonconnect/ui-react'

export default function () {
  return (
    <TonConnectUIProvider
      manifestUrl={`${location.origin}/tonconnect-manifest.json`}
      actionsConfiguration={{
        twaReturnUrl: env.VITE_APP_BASE_LINK,
      }}
      uiPreferences={{ theme: 'DARK' }}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 text-center px-4">
        <Header1>Scalr Airdrop</Header1>
        <Header3>
          Connect wallet to take part in <span className="underline">$SCR</span>{' '}
          tokens distribution
        </Header3>
        <Logo size={100} withBackground />
        <TonConnectButton style={{ width: '100%' }} />
        <span>
          <Header3>Tokens will be distributed for:</Header3>
          <Header3 className="font-normal">
            <ul>
              <li>- Bet volumes</li>
              <li>- Invited friends</li>
            </ul>
          </Header3>
        </span>
      </div>
    </TonConnectUIProvider>
  )
}
