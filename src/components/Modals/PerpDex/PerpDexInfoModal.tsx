import Button from 'components/Button'
import { Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import Box from 'components/icons/Box'
import IconWithTexts from 'components/IconWithTexts'
import TimerIcon from 'components/icons/TimerIcon'
import Maximize from 'components/icons/Maximize'
import DexInfoStonks from 'components/DexInfoStonks'
import PerpModalPinCode from 'components/PerpDex/PerpModalPinCode'
import ScrollFadeOverlay from 'components/ScrollFadeOverlay'
import { atom, useAtomValue } from 'jotai'
import { writeAtom } from 'helpers/atoms/atomStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const showCodeInputAtom = atom(false)

const info = [
  {
    icon: <Box />,
    topText: 'Liquidity Efficiency',
    bottomText:
      'Ensures plenty of liquidity for smooth trading and less price fluctuation',
  },
  {
    icon: <TimerIcon />,
    topText: 'Instant Orders',
    bottomText: 'Trade execution in under 1 second.',
  },
  {
    icon: <Maximize />,
    topText: 'L1 Scaling',
    bottomText:
      'Lower fees and better liquidity than other platforms, thanks to L1 scaling.',
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
            Scalr Perpetual DEX
          </Header2>
          {showCodeInput ? null : (
            <span className="text-white/50">
              A mobile-first, fast and reliable perpetual exchange designed for
              seamless trading.
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
  return (
    <Button
      buttonType={ButtonTypes.alt}
      className="!rounded-full"
      onClick={() =>
        requestAnimationFrame(() => writeAtom(showCodeInputAtom, true))
      }
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
