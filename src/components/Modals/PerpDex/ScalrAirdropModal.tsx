import Button from 'components/Button'
import { Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useEffect } from 'react'
import IconWithTexts from 'components/IconWithTexts'
import CheckCircle from 'components/icons/CheckCircle'
import Percent from 'components/icons/Percent'
import Cup from 'components/icons/Cup'
import Gift from 'components/icons/Gift'
import TonConnect from 'components/TonConnect'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ImageAnimatedOnLoad from 'components/ImageAnimatedOnLoad'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { writeAtom } from 'helpers/atoms/atomStore'
import { modalDismissibleAtom } from 'helpers/atoms/modalsAtom'

const connectStepAtom = atom(false)

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
    bottomText: 'Special tasks will boost your rank.\nDon’t miss it!',
  },
  {
    icon: <Cup size={32} />,
    topText: 'Support from leaders',
    bottomText:
      'Backed by top advisors from Triangle Accelerator, Adsgram, Trusted Volumes and hcl.finance fund.',
  },
  {
    icon: <Gift size={32} />,
    topText: 'Bonuses from Perpetual DEX',
    bottomText: 'Top users get early beta access\nwith exclusive rewards.',
  },
]

function ModalBody() {
  const connectStep = useAtomValue(connectStepAtom)
  const [tonConnect] = useTonConnectUI()
  const [parent] = useAutoAnimate()

  const glow = connectStep ? 'drop-shadow-bulb-glow' : ''

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={parent}>
        <ImageAnimatedOnLoad
          src="img/dex-scalr-3d.png"
          className="h-32 self-center"
        />
        <div className="flex flex-col gap-y-2 leading-5 text-center">
          <Header2
            className={`transition-all duration-1000 will-change-transform ${glow}`}
          >
            Scalr Airdrop
          </Header2>
          <span className="text-white/50">
            {connectStep
              ? tonConnect.connected
                ? "Nice, you're ready for airdrop"
                : 'Connect wallet to secure your spot'
              : 'A mobile-first, fast and reliable perpetual exchange designed for seamless trading.'}
          </span>
        </div>

        {connectStep ? null : (
          <div className="flex flex-col gap-y-5">
            {info.map((props) => (
              <IconWithTexts {...props} key={props.topText} />
            ))}
          </div>
        )}
      </div>
      {connectStep ? null : <ScrollFadeOverlay />}
    </>
  )
}

function ModalFooter() {
  const setModalDismissible = useSetAtom(modalDismissibleAtom)
  const [connectStep, setConnectStep] = useAtom(connectStepAtom)
  const [tonConnect] = useTonConnectUI()

  useEffect(() => {
    const unsubscribe = tonConnect.onModalStateChange((state) =>
      setModalDismissible(state.status === 'closed')
    )

    return () => {
      unsubscribe()
    }
  }, [setModalDismissible, tonConnect])

  if (connectStep) {
    return <TonConnect />
  }

  return (
    <Button
      buttonType={ButtonTypes.alt}
      className="!rounded-full"
      onClick={() => setConnectStep(true)}
    >
      Secure Your Spot Now
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      onCloseCallback={() => {
        props.setShowModal(false)
        setTimeout(() => writeAtom(connectStepAtom, false), 200)
      }}
      contentClassName="h-[98vh]"
      footerWrapperClassName="flex-1 content-end"
      body={ModalBody}
      footer={ModalFooter}
    />
  )
}
