import { useInvoice } from '@telegram-apps/sdk-react'
import Button from 'components/Button'
import Coin3D from 'components/Coin3D'
import FooterSafeArea from 'components/FooterSafeArea'
import { BodyText, Header1, Header3, Header4 } from 'components/Text'
import TonConnect from 'components/TonConnect'
import payments from 'helpers/api/payments'
import env from 'helpers/env'
import handleError from 'helpers/handleError'
import { TonConnectUIProvider } from 'lib/@tonconnect/ui-react'
import { useCallback, useState } from 'preact/hooks'
import { toast } from 'react-toastify'

function AirDropInner() {
  const [loading, setLoading] = useState(false)
  const invoiceHandler = useInvoice()

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      const { invoiceLink } = await payments(500)
      void invoiceHandler
        .open(invoiceLink, 'url')
        .then((status) => {
          if (status === 'paid')
            toast.success('Nice, you paid, party is proud of you!')
          if (status === 'failed') throw new Error('Payment failed :(')
        })
        .catch((e) => {
          handleError({ e, toastMessage: 'Failed to process your payment 😥' })
        })
    } catch (e) {
      handleError({ e, toastMessage: 'Failed to process your payment 😥' })
    } finally {
      setLoading(false)
    }
  }, [invoiceHandler])
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-y-4 text-center px-4">
      <Header1>Scalr Airdrop</Header1>
      <Header3 className="italic !font-semibold">
        Connect wallet to take part in $SCR tokens distribution
      </Header3>
      <Coin3D />
      <TonConnect />
      <span>
        <Header4>Tokens will be distributed for:</Header4>
        <BodyText className="font-normal text-controls-tertiary-focus">
          <ul>
            <li>- Bet volumes</li>
            <li>- Invited friends</li>
            <li>- More info soon 👀</li>
          </ul>
        </BodyText>
      </span>
      <Button onClick={onClick} isLoading={loading}>
        Autobuy for 24hrs - 500 ⭐
      </Button>
      <FooterSafeArea />
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
