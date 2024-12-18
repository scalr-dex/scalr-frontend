import Button from 'components/Button'
import { Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import ArrowTopSquareFilled from 'components/icons/ArrowTopSquareFilled'
import StopwatchFilled from 'components/icons/StopwatchFilled'
import ChattingFilled from 'components/icons/ChattingFilled'
import IconWithTexts from 'components/IconWithTexts'
import DexInfoStonks from 'components/DexInfoStonks'
import PerpModalPinCode from 'components/PerpDex/PerpModalPinCode'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'
import { atom, useAtom, useAtomValue } from 'jotai'
import { writeAtom } from 'helpers/atoms/atomStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const showCodeInputAtom = atom(false)

const info = [
  {
    icon: <ArrowTopSquareFilled />,
    topText: 'Next x100 Memecoin Today',
    bottomText:
      'Effortlessly discover the next bluechip memecoins using Scalr discovery.',
  },
  {
    icon: <StopwatchFilled />,
    topText: 'Seamless Trading Inside',
    bottomText: 'Execute trades in under 1 second for early movers.',
  },
  {
    icon: <ChattingFilled />,
    topText: 'Community Mindset',
    bottomText:
      'Join chats, explore feeds, and discuss tokens with like-minded degens.',
  },
]

function ModalBody() {
  const [parent] = useAutoAnimate()
  const showCodeInput = useAtomValue(showCodeInputAtom)

  const glow = showCodeInput ? 'drop-shadow-bulb-glow' : ''

  return (
    <div>
      <div className="flex flex-col gap-y-6 h-[80vh]" ref={parent}>
        <div className="flex w-full items-center justify-center h-36">
          {showCodeInput ? (
            <PerpModalPinCode />
          ) : (
            <DexInfoStonks className="pr-16" />
          )}
        </div>
        <div className="flex flex-col gap-y-2 leading-5 text-center">
          <Header2
            className={`transition-all duration-500 will-change-transform ${glow}`}
          >
            Where Memecoins Meet Community
          </Header2>
          {showCodeInput ? null : (
            <span className="text-white/50">
              <p>A Telegram-first discovery app</p>
              <p>replacing countless terminals and bots.</p>
            </span>
          )}
        </div>

        {showCodeInput ? null : (
          <div className="flex flex-col gap-y-5">
            {info.map((props) => (
              <IconWithTexts {...props} key={props.topText} />
            ))}
          </div>
        )}
      </div>
      {showCodeInput ? null : <ScrollFadeOverlay />}
    </div>
  )
}

function ModalFooter() {
  const [showCodeInput, setShowCodeInput] = useAtom(showCodeInputAtom)

  if (showCodeInput) return null

  return (
    <Button
      buttonType={ButtonTypes.alt}
      onClick={() => requestAnimationFrame(() => setShowCodeInput(true))}
    >
      Join the beta
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  return (
    <DefaultModal
      {...props}
      onCloseCallback={() => {
        props.setShowModal(false)
        setTimeout(() => writeAtom(showCodeInputAtom, false), 200)
      }}
      body={ModalBody}
      footer={ModalFooter}
    />
  )
}
