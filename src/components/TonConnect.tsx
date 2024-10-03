import Button from 'components/Button'
import ButtonTypes from 'type/Button'
import TonCoin from 'components/icons/coins/TonCoin'
import { setTonAddress } from 'helpers/api/user'
import handleError from 'helpers/handleError'
import { useTonConnectUI, useTonAddress } from 'lib/@tonconnect/ui-react'
import { useEffect, useCallback, useState } from 'preact/hooks'
import Disconnect from 'components/icons/Disconnect'
import Copy from 'components/icons/Copy'
import truncate from 'helpers/truncate'
import CheckMark from 'components/icons/CheckMark'

export default function () {
  const [tonConnectUI] = useTonConnectUI()
  const userAddress = useTonAddress()
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void tonConnectUI.connectionRestored.finally(() => setLoading(false))
  }, [tonConnectUI.connectionRestored])

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

  const onConnect = useCallback(async () => {
    await tonConnectUI.openModal()
  }, [tonConnectUI])

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(userAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }, [userAddress])

  const onDisconnect = useCallback(async () => {
    await tonConnectUI.disconnect()
  }, [tonConnectUI])

  const padding = userAddress ? '!px-16' : ''

  return (
    <div className="flex flex-row items-center gap-x-4 w-full">
      <Button
        onClick={userAddress ? onCopy : onConnect}
        className={`!w-full font-bold !font-accent ${padding}`}
        buttonType={copied ? ButtonTypes.success : ButtonTypes.accent}
        isLoading={loading}
        rounded="rounded-full"
        iconLeft={
          userAddress ? (
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
        {userAddress ? truncate({ fullString: userAddress }) : 'Connect Wallet'}
      </Button>
      {userAddress ? (
        <Button className="!rounded-full !w-16" onClick={onDisconnect}>
          <Disconnect />
        </Button>
      ) : null}
    </div>
  )
}
