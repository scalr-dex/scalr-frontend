import ButtonSmall from 'components/ButtonSmall'
import Rocket from 'components/icons/Rocket'
import BoostModal from 'components/Modals/BoostModal'
import { useCallback, useEffect, useState } from 'preact/hooks'
import ButtonTypes from 'type/Button'
import { ClassName } from 'type/Props'
import BoostTooltip from 'components/Main/BoostTooltip'
import BoostStates from 'type/BoostState'
import { useAtom } from 'jotai'
import { boostStateAtom } from 'helpers/atoms/UserStates'

const stateToStyle: Record<BoostStates, ClassName> = {
  [BoostStates.active]: 'border-1.5 border-metal-gray rounded-3xl',
  [BoostStates.activated]: 'text-accent-dimmed',
  [BoostStates.disabled]: 'border-1.5 border-metal-gray rounded-3xl opacity-60',
  [BoostStates.betNoBoost]:
    'border-1.5 border-metal-gray rounded-3xl opacity-60',
  [BoostStates.locked]: 'text-accent-dimmed',
}

export default function ({ boosts = 0 }: { boosts: number | undefined }) {
  const [state, setBoostState] = useAtom(boostStateAtom)
  const [showModal, setShowModal] = useState(false)

  const activatedOrLocked =
    state === BoostStates.locked || state === BoostStates.activated

  useEffect(() => {
    if (activatedOrLocked || state === BoostStates.betNoBoost) return

    setBoostState(boosts ? BoostStates.active : BoostStates.disabled)
  }, [activatedOrLocked, boosts, setBoostState, state])

  const onClick = useCallback(() => {
    if (
      !boosts ||
      state === BoostStates.disabled ||
      state === BoostStates.locked ||
      state === BoostStates.betNoBoost
    ) {
      setShowModal(true)
      return
    }
    if (state === BoostStates.active) {
      setBoostState(BoostStates.activated)
    }
    if (state === BoostStates.activated) {
      setBoostState(BoostStates.active)
    }
  }, [boosts, setBoostState, state])

  const wrapper = activatedOrLocked
    ? 'silver-outline rounded-3xl shadow-accent -mr-px'
    : '-mr-px'

  return (
    <>
      <div className={wrapper}>
        <ButtonSmall
          buttonType={ButtonTypes.neutral}
          className={`relative transition-all h-8 !min-w-12 ${stateToStyle[state]} m-1.5 z-10`}
          onClick={onClick}
        >
          {state === BoostStates.active ? (
            <BoostTooltip boosts={boosts} />
          ) : null}
          <Rocket />
        </ButtonSmall>
      </div>
      <BoostModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
