import Logo from 'components/icons/Logo'
import { BodyText, Header1, Header3, Header4 } from 'components/Text'
import { setTonAddress } from 'helpers/api/user'
import env from 'helpers/env'
import handleError from 'helpers/handleError'
import {
  TonConnectButton,
  TonConnectUIProvider,
  useTonAddress,
  useTonConnectUI,
} from 'lib/@tonconnect/ui-react'
import { useEffect } from 'preact/hooks'

function AirDropInner() {
  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()

  useEffect(() => {
    const setAddress = async () => {
      try {
        if (userAddress) await setTonAddress(userAddress)
      } catch (e) {
        handleError({
          e,
          toastMessage:
            'Failed to update your ton address, please try again 😥',
        })
        await tonConnectUI.disconnect()
      }
    }

    void setAddress()
  }, [tonConnectUI, userAddress])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4 text-center px-4">
      <Header1>Scalr Airdrop</Header1>
      <Header3>
        Connect wallet to take part in <span className="underline">$SCR</span>{' '}
        tokens distribution
      </Header3>
      <Logo size={100} withBackground />
      <TonConnectButton style={{ width: '100%' }} />
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
