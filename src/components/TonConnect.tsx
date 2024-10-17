import Button from 'components/Button'
import ButtonTypes from 'type/Button'
import TonCoin from 'components/icons/coins/TonCoin'
import { setTonAddress } from 'helpers/api/user'
import handleError from 'helpers/handleError'
import { useEffect, useCallback, useState } from 'preact/hooks'
import Disconnect from 'components/icons/Disconnect'
import Copy from 'components/icons/Copy'
import truncate from 'helpers/truncate'
import CheckMark from 'components/icons/CheckMark'
import useTonConnect from 'helpers/hooks/useTonConnect'

export default function () {
  const { address, tonConnect } = useTonConnect()
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void tonConnect.connectionRestored.finally(() => setLoading(false))
  }, [tonConnect.connectionRestored])

  useEffect(() => {
    const setAddress = async () => {
      try {
        if (address) await setTonAddress(address)
      } catch (e) {
        handleError({
          e,
          toastMessage:
            'Failed to update your ton address, please try again 😥',
        })
        await tonConnect.disconnect()
      }
    }

    void setAddress()
  }, [address, tonConnect])

  const onConnect = useCallback(async () => {
    await tonConnect.openModal()
  }, [tonConnect])

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }, [address])

  const onDisconnect = useCallback(async () => {
    await tonConnect.disconnect()
  }, [tonConnect])

  const padding = address ? '!px-16' : ''

  return (
    <div className="flex flex-row items-center gap-x-4 w-full">
      <Button
        onClick={address ? onCopy : onConnect}
        className={`!w-full !px-2 !rounded-full !font-bold !font-accent ${padding}`}
        buttonType={copied ? ButtonTypes.success : ButtonTypes.accent}
        isLoading={loading}
        iconLeft={
          address ? (
            copied ? (
              <CheckMark />
            ) : (
              <Copy size={20} />
            )
          ) : (
            <TonCoin size={36} />
          )
        }
      >
        {address ? truncate({ fullString: address }) : 'Connect Wallet'}
      </Button>
      {address ? (
        <Button className="!rounded-full !w-16" onClick={onDisconnect}>
          <Disconnect />
        </Button>
      ) : null}
    </div>
  )
}
