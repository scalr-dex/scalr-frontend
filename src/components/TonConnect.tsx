import Button from 'components/Button'
import ButtonTypes from 'type/Button'
import { setTonAddress } from 'helpers/api/user'
import handleError from 'helpers/handleError'
import { useTonConnectUI, useTonAddress } from 'lib/@tonconnect/ui-react'
import { useEffect, useCallback, useState } from 'preact/hooks'
import Disconnect from 'components/icons/Disconnect'
import truncate from 'helpers/truncate'
import CheckMark from 'components/icons/CheckMark'
import ButtonSmall from 'components/ButtonSmall'

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

  return (
    <div className="flex flex-row items-center gap-x-1 w-full justify-end">
      <ButtonSmall
        onClick={userAddress ? onCopy : onConnect}
        className={`px-1.5 py-1.5 !rounded-full text-xs !font-accent`}
        buttonType={copied ? ButtonTypes.success : ButtonTypes.secondary}
        isLoading={loading}
        iconLeft={copied ? <CheckMark size={16} /> : null}
      >
        {copied
          ? 'Copied!'
          : userAddress
            ? truncate({ fullString: userAddress })
            : 'Connect Wallet'}
      </ButtonSmall>
      {userAddress ? (
        <Button
          buttonType={ButtonTypes.secondary}
          className="!rounded-full !w-7 !h-7 !p-1"
          onClick={onDisconnect}
        >
          <Disconnect />
        </Button>
      ) : null}
    </div>
  )
}
