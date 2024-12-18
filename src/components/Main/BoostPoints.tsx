import ButtonSmall from 'components/ButtonSmall'
import { useCallback, useEffect } from 'react'
import ButtonTypes from 'type/Button'
import { ClassName } from 'type/Props'
import BoostStates from 'type/BoostStates'
import { useAtom, useSetAtom } from 'jotai'
import modalsAtom, { AvailableModals } from 'helpers/atoms/modalsAtom'
import Rocket from 'components/icons/Rocket'
import { boostStateAtom } from 'helpers/atoms/UserStates'
import BoostTooltip from 'components/Main/BoostTooltip'

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
  const setShowModal = useSetAtom(modalsAtom)

  const activatedOrLocked =
    state === BoostStates.locked || state === BoostStates.activated

  useEffect(() => {
    if (activatedOrLocked || state === BoostStates.betNoBoost) return

    setBoostState(boosts ? BoostStates.active : BoostStates.disabled)
  }, [activatedOrLocked, boosts, setBoostState, state])

  const onClick = useCallback(() => {
    if (state === BoostStates.locked || state === BoostStates.betNoBoost) return
    if (!boosts || state === BoostStates.disabled) {
      setShowModal(AvailableModals.boostModal)
      return
    }
    if (state === BoostStates.active) {
      setBoostState(BoostStates.activated)
    }
    if (state === BoostStates.activated) {
      setBoostState(BoostStates.active)
    }
  }, [boosts, setBoostState, setShowModal, state])

  const wrapper = activatedOrLocked
    ? 'silver-outline rounded-3xl shadow-accent -mr-px'
    : '-mr-px'

  return (
    <div className={wrapper}>
      <ButtonSmall
        buttonType={ButtonTypes.neutral}
        className={`relative transition-all h-8 !min-w-8 ${stateToStyle[state]} m-1.5 z-10`}
        onClick={onClick}
      >
        {state === BoostStates.active ? <BoostTooltip boosts={boosts} /> : null}
        <Rocket />
      </ButtonSmall>
    </div>
  )
}
