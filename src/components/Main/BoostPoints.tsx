import ButtonSmall from 'components/ButtonSmall'
import Rocket from 'components/icons/Rocket'
import BoostModal from 'components/Modals/BoostModal'
import { useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { ClassName } from 'type/Props'

type States = 'active' | 'activated' | 'disabled'

const stateToStyle: Record<States, ClassName> = {
  active: '',
  activated: '',
  disabled: '',
}

export default function () {
  const [showModal, setShowModal] = useState(false)
  const state: States = 'activated'

  return (
    <>
      <ButtonSmall
        buttonType={ButtonTypes.neutral}
        className={`w-12 h-9 border border-metal-gray ${stateToStyle[state]}`}
        onClick={() => setShowModal(true)}
      >
        <Rocket />
      </ButtonSmall>
      <BoostModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
