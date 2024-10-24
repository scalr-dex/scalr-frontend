import Button from 'components/Button'
import { Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useCallback, useEffect, useState } from 'preact/hooks'
import IconWithTexts from 'components/IconWithTexts'
import CheckCircle from 'components/icons/CheckCircle'
import Percent from 'components/icons/Percent'
import Cup from 'components/icons/Cup'
import Gift from 'components/icons/Gift'
import TonConnect from 'components/TonConnect'
import { useTonConnectUI } from 'lib/ui-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const info = [
  {
    icon: <CheckCircle />,
    topText: 'Points to qualify',
    bottomText:
      'Earn points to qualify. The more active you are, the bigger your reward.',
  },
  {
    icon: <Percent />,
    topText: 'Special Rewards',
    bottomText: 'Special tasks will boost your rank. Don’t miss it!',
  },
  {
    icon: <Cup size={24} />,
    topText: 'Support from leaders',
    bottomText:
      'Backed by top advisors from Triangle Accelerator, Adsgram, hcl.finance fund, Trusted Volumes and PAKA fund.',
  },
  {
    icon: <Gift />,
    topText: 'Bonuses from Perpetual DEX',
    bottomText: 'Top users get early beta access with exclusive rewards.',
  },
]

function ModalBody({
  connectWallet,
  isConnected,
}: {
  connectWallet: boolean
  isConnected: boolean
}) {
  const [parent] = useAutoAnimate()
  const glow = connectWallet ? 'drop-shadow-bulb-glow' : ''

  return (
    <div className="flex flex-col gap-y-6 px-4" ref={parent}>
      <img
        src="img/dex-scalr-3d.png"
        className="h-32 self-center animate-fadeIn"
      />
      <div className="flex flex-col gap-y-2 leading-5 text-center">
        <Header2
          className={`transition-all duration-1000 will-change-transform ${glow}`}
        >
          Scalr Airdrop
        </Header2>
        <span className="text-white/50">
          {connectWallet
            ? isConnected
              ? "Nice, you're ready for airdrop"
              : 'Connect wallet to secure your spot'
            : 'A mobile-first, fast and reliable perpetual exchange designed for seamless trading.'}
        </span>
      </div>

      {connectWallet ? null : (
        <div className="flex flex-col gap-y-5">{info.map(IconWithTexts)}</div>
      )}
    </div>
  )
}

function ModalFooter({
  connectWallet,
  setConnectWallet,
}: {
  connectWallet: boolean
  setConnectWallet: () => void
}) {
  if (connectWallet) {
    return <TonConnect />
  }

  return (
    <Button
      buttonType={ButtonTypes.alt}
      className="!rounded-full"
      onClick={setConnectWallet}
    >
      Secure Your Spot Now
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  const [tonConnect] = useTonConnectUI()
  const [connectWallet, setConnectWallet] = useState(false)
  const [dismissible, setDismissible] = useState(true)
  const onClose = useCallback(() => {
    props.setShowModal(false)
    setTimeout(() => setConnectWallet(false), 200)
  }, [props])

  useEffect(() => {
    const unsubscribe = tonConnect.onModalStateChange((state) =>
      setDismissible(state.status === 'closed')
    )

    return () => {
      unsubscribe()
    }
  }, [tonConnect])

  return (
    <DefaultModal
      {...props}
      dismissible={dismissible}
      onCloseCallback={onClose}
      contentClassName="min-h-[70vh]"
      bodyWrapperClassName="h-full"
      footerWrapperClassName="flex-1 content-end"
      body={() => (
        <ModalBody
          isConnected={tonConnect.connected}
          connectWallet={connectWallet}
        />
      )}
      footer={() => (
        <ModalFooter
          connectWallet={connectWallet}
          setConnectWallet={() => setConnectWallet(true)}
        />
      )}
    />
  )
}
