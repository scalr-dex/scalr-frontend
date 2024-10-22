import Button from 'components/Button'
import { BodyText, Header2 } from 'components/Text'
import DefaultModal from 'components/Modals/DefaultModal'
import ButtonTypes from 'type/Button'
import { DefaultModalProps } from 'type/Props'
import { useState } from 'preact/hooks'
import Box from 'components/icons/Box'
import IconWithTexts from 'components/IconWithTexts'
import Download from 'components/icons/Download'
import TimerIcon from 'components/icons/TimerIcon'
import Maximize from 'components/icons/Maximize'
import DexInfoStonks from 'components/DexInfoStonks'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const info = [
  {
    icon: <Box />,
    topText: 'Liquidity Efficiency',
    bottomText:
      'Ensures plenty of liquidity for smooth trading and less price fluctuation',
  },
  {
    icon: <Download />,
    topText: 'Low Slippage',
    bottomText: 'Reduces price impact, ensuring fair trades.',
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

function ModalBody({ showCodeInput }: { showCodeInput: boolean }) {
  const [parent] = useAutoAnimate()
  const glow = showCodeInput ? 'drop-shadow-bulb-glow' : ''

  return (
    <div className="flex flex-col gap-y-6" ref={parent}>
      <DexInfoStonks />
      <div
        className={`flex flex-col gap-y-2 leading-5 text-center transition-all ${glow}`}
      >
        <Header2>Scalr Perpetual DEX</Header2>
        {showCodeInput ? (
          <BodyText>
            Join the beta with invite code.{'\n'}Public access coming soon.
          </BodyText>
        ) : (
          <span className="text-white/50">
            A mobile-first, fast and reliable perpetual exchange designed for
            seamless trading.
          </span>
        )}
      </div>

      {showCodeInput ? null : (
        <div className="flex flex-col gap-y-5">{info.map(IconWithTexts)}</div>
      )}
    </div>
  )
}

function ModalFooter({ setShowCodeInput }: { setShowCodeInput: () => void }) {
  return (
    <Button
      buttonType={ButtonTypes.alt}
      className="!rounded-full"
      onClick={setShowCodeInput}
    >
      Join the beta
    </Button>
  )
}

export default function (props: DefaultModalProps) {
  const [showCodeInput, setShowCodeInput] = useState(false)

  const footer = showCodeInput ? null : (
    <ModalFooter setShowCodeInput={() => setShowCodeInput(true)} />
  )

  return (
    <DefaultModal
      {...props}
      body={() => <ModalBody showCodeInput={showCodeInput} />}
      footer={() => footer}
    />
  )
}
