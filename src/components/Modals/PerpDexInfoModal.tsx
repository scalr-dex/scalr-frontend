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

function ModalBody() {
  return (
    <>
      <img src="img/dex-scalr-stonks.png" className="w-64 h-32 mx-auto" />
      <Header2>Scalr Perpetual DEX</Header2>
      <BodyText className="text-white/50 leading-5">
        A mobile-first, fast and reliable perpetual exchange designed for
        seamless trading.
      </BodyText>
      {info.map(IconWithTexts)}
    </>
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

  return (
    <DefaultModal
      {...props}
      body={ModalBody}
      footer={() => (
        <ModalFooter setShowCodeInput={() => setShowCodeInput(true)} />
      )}
    />
  )
}
