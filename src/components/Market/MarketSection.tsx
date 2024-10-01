import { useInvoice } from '@telegram-apps/sdk-react'
import { Header3, BodyText } from 'components/Text'
import payments from 'helpers/api/payments'
import handleError from 'helpers/handleError'
import { useState, useCallback } from 'preact/hooks'
import { toast } from 'react-toastify'
import AutoclaimCard from 'components/Market/AutoclaimCard'
import { AvailableAutoclaimOptions } from 'type/Market'

export default function () {
  const [loading, setLoading] = useState(false)
  const invoiceHandler = useInvoice()

  const onClick = useCallback(
    async (option: AvailableAutoclaimOptions) => {
      try {
        setLoading(true)
        const { invoiceLink } = await payments(option)
        void invoiceHandler
          .open(invoiceLink, 'url')
          .then((status) => {
            if (status === 'paid')
              toast.success('Nice, you paid, party is proud of you!')
            if (status === 'failed') throw new Error('Payment failed :(')
          })
          .catch((e) => {
            handleError({
              e,
              toastMessage: 'Failed to process your payment 😥',
            })
          })
      } catch (e) {
        handleError({ e, toastMessage: 'Failed to process your payment 😥' })
      } finally {
        setLoading(false)
      }
    },
    [invoiceHandler]
  )

  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="self-center">
        <Header3 className="w-fit bg-gradient-to-r bg-clip-text text-transparent from-accent via-[#86E2FF] to-success">
          Market
        </Header3>
      </div>
      <div className="flex flex-col gap-y-2">
        <Header3 className="text-left">
          Autoclaim <span className="text-white/75">(current: 0)</span>
        </Header3>
        <BodyText className="text-left font-semibold leading-4">
          With it you can miss up to 4 days of claiming.
          <p>Claimed amounts count toward in the airdrop.</p>
        </BodyText>
      </div>

      <div className="flex flex-row gap-x-3 mt-3">
        <AutoclaimCard option={1} onClick={onClick} loading={loading} />
        <AutoclaimCard
          option={2}
          onClick={onClick}
          loading={loading}
          isSpecialOffer
        />
        <AutoclaimCard option={3} onClick={onClick} loading={loading} />
      </div>
    </div>
  )
}
